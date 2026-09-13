<?php
// Parallel implementation of api/contact.ts for PHP-only hosting (ADR-0010).
// Both files honor the same contract: POST /api/contact, JSON in,
// { ok: boolean, error?: string } out, status codes 200/400/403/405/500.
// If the contract changes, change both.

declare(strict_types=1);

// Notices/warnings must never leak into the JSON response body, whatever
// the host's php.ini says. They still reach the error log.
ini_set('display_errors', '0');

function respond(int $status, array $body): never {
  http_response_code($status);
  header('Content-Type: application/json');
  echo json_encode($body);
  exit;
}

$config = @require __DIR__ . '/config.php';
if (!is_array($config)) {
  error_log('contact: config_missing');
  respond(500, ['ok' => false, 'error' => 'Failed to send. Please try again or email us directly.']);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  respond(405, ['ok' => false]);
}

// Spam check 1: origin allowlist (lazy-bot filter). Origin is client-controlled
// so this is a low-cost filter only — not a security boundary.
$origin = $_SERVER['HTTP_ORIGIN'] ?? null;
if (!is_string($origin) || !in_array($origin, $config['ALLOWED_ORIGINS'], true)) {
  respond(403, ['ok' => false]);
}

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
  respond(400, ['ok' => false, 'error' => 'Invalid form data']);
}

// Spam check 2: honeypot — silent 200 if a bot filled the hidden field
if (isset($body['website']) && trim((string) $body['website']) !== '') {
  error_log('contact: honeypot_triggered');
  respond(200, ['ok' => true]);
}

// Spam check 3: time gate — fail closed: missing or non-numeric _t is treated
// as spam so bots that omit the field can't bypass the check.
$tRaw = $body['_t'] ?? null;
$submitTime = is_numeric($tRaw) ? (float) $tRaw : NAN;
$nowMs = microtime(true) * 1000;
if (!is_finite($submitTime) || $nowMs - $submitTime < 2000) {
  error_log('contact: time_check_failed');
  respond(200, ['ok' => true]);
}

// Validation — hand-mirrors src/lib/contactSchema.ts (Zod can't run here).
// Deliberate duplication per ADR-0010 §8: changing one means changing both.
$ALLOWED_DOMAINS = [
  'SAP', 'Microsoft', 'Oracle', 'IBM', 'AI',
  'Cloud Computing', 'Big Data & Analytics', 'Blockchain',
  'Mobile Development', 'Not sure yet',
];

$name    = is_string($body['name'] ?? null) ? trim($body['name']) : null;
$email   = is_string($body['email'] ?? null) ? trim($body['email']) : null;
$message = is_string($body['message'] ?? null) ? trim($body['message']) : null;
$domain  = $body['domain'] ?? null;
$domain  = ($domain === '' || $domain === null) ? null : $domain;

$valid =
  $name !== null && mb_strlen($name) >= 2 && mb_strlen($name) <= 100 &&
  $email !== null && mb_strlen($email) <= 254 && filter_var($email, FILTER_VALIDATE_EMAIL) !== false &&
  $message !== null && mb_strlen($message) >= 50 && mb_strlen($message) <= 1000 &&
  ($domain === null || in_array($domain, $ALLOWED_DOMAINS, true));

if (!$valid) {
  respond(400, ['ok' => false, 'error' => 'Invalid form data']);
}

error_log('contact: received');

$bodyLines = [
  'New enquiry from the Softfinity contact form.',
  '',
  "Name:    {$name}",
  "Email:   {$email}",
];
if ($domain !== null) {
  $bodyLines[] = "Area:    {$domain}";
}
$bodyLines[] = 'Message:';
$bodyLines[] = "  {$message}";
$bodyLines[] = '';
$bodyLines[] = '----';
$bodyLines[] = "Reply directly to this email to respond to {$name}.";
$bodyText = implode("\n", $bodyLines);

/**
 * POST JSON to a URL. Returns [httpStatus, transportError] where httpStatus
 * is 0 when the request never completed (DNS failure, timeout, …).
 */
function post_json(string $url, array $payload, array $headers = []): array {
  $ch = curl_init($url);
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_HTTPHEADER => array_merge(['Content-Type: application/json'], $headers),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
  ]);
  curl_exec($ch);
  $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
  $err = curl_errno($ch) !== 0 ? curl_error($ch) : null;
  return [$status, $err];
}

// Same retry policy as contact.ts: immediate → +1 s → +2 s, transient errors
// (5xx / network) only. Never retry 4xx — invalid input won't improve on retry.
function send_with_retry(array $config, array $emailPayload): array {
  $delays = [0, 1, 2];
  foreach ($delays as $attempt => $delay) {
    if ($delay > 0) {
      sleep($delay);
    }
    [$status, $err] = post_json(
      'https://api.resend.com/emails',
      $emailPayload,
      ['Authorization: Bearer ' . $config['RESEND_API_KEY']]
    );
    if ($status >= 200 && $status < 300) {
      return ['ok' => true];
    }
    if ($status >= 400 && $status < 500) {
      return ['ok' => false, 'errorName' => "resend_http_{$status}"];
    }
    if ($attempt < count($delays) - 1) {
      error_log('contact: attempt_' . ($attempt + 1) . '_failed ' . ($err !== null ? 'network_error' : "http_{$status}"));
    }
  }
  return ['ok' => false, 'errorName' => 'max_retries_exceeded'];
}

// Posts submission data to Discord as a durable secondary record. True only
// when a webhook URL is configured AND Discord accepted the payload.
function notify_discord(array $config, string $name, string $email, ?string $domain, string $message): bool {
  $webhookUrl = $config['DISCORD_WEBHOOK_URL'] ?? '';
  if ($webhookUrl === '') {
    return false;
  }
  $lines = [
    '**New enquiry from Softfinity contact form**',
    "**Name:** {$name}",
    "**Email:** {$email}",
  ];
  if ($domain !== null) {
    $lines[] = "**Area:** {$domain}";
  }
  $lines[] = "**Message:**\n{$message}";

  [$status] = post_json($webhookUrl, ['content' => implode("\n", $lines)]);
  return $status >= 200 && $status < 300;
}

// Fan out to Resend (email) then Discord (durable lead log). Sequential here —
// PHP has no Promise.allSettled — but the decision rule matches contact.ts:
// 200 if at least one destination captured the lead; 500 only if both failed.
$rootDomain = $config['CONTACT_DOMAIN'];

$emailResult = send_with_retry($config, [
  'from' => "Softfinity Contact <hello@{$rootDomain}>",
  'to' => $config['CONTACT_TO_EMAIL'],
  'reply_to' => $email,
  'subject' => "New enquiry: {$name} — Softfinity contact form",
  'text' => $bodyText,
]);
$discordOk = notify_discord($config, $name, $email, $domain, $message);

if (!$emailResult['ok']) {
  error_log('contact: send_failed ' . ($emailResult['errorName'] ?? 'unknown'));
  if (!$discordOk) {
    error_log('contact: discord_failed');
    respond(500, ['ok' => false, 'error' => 'Failed to send. Please try again or email us directly.']);
  }
  // Discord captured the lead — tell the user it worked so they don't retry
  error_log('contact: discord_fallback_ok');
  respond(200, ['ok' => true]);
}

error_log('contact: sent');
respond(200, ['ok' => true]);
