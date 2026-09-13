<?php
// Copy to config.php (same directory) and fill in real values.
// config.php is gitignored and must never be committed (ADR-0010 §5).
// On the host, create it once via cPanel/FTP; deploys never overwrite it.

return [
  // Resend dashboard → API Keys. Use the Development key locally,
  // the Production key on the server. Never the same key in both places.
  'RESEND_API_KEY' => 're_xxxxxxxxxxxxxxxx',

  // Where enquiries land. Locally: your own inbox so testing doesn't
  // ping the stakeholder. Production: the stakeholder's inbox.
  'CONTACT_TO_EMAIL' => 'you@example.com',

  // Root domain for the sending address (hello@<CONTACT_DOMAIN>),
  // already verified in Resend.
  'CONTACT_DOMAIN' => 'softfinity.co.za',

  // Optional durable lead capture (ADR-0006). Empty string disables it.
  'DISCORD_WEBHOOK_URL' => '',

  // Origins allowed to POST the form. One environment per deployment:
  // locally keep localhost; on the server list only the production domains.
  'ALLOWED_ORIGINS' => [
    'http://localhost:5173',
    // 'https://softfinity.co.za',
    // 'https://www.softfinity.co.za',
  ],
];
