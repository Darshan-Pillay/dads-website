# Runbook — Deploying to the PHP host

How to build, upload, verify, and roll back the site on the stakeholder's
PHP-only shared hosting (ADR-0010). Deploys are manual: build locally,
upload the result. There is no auto-deploy and no preview environment —
the local rehearsal (§2) is the preview.

---

## 1. Build and stage

```sh
npm run stage
```

This builds the frontend and assembles a `deploy/` folder containing
everything the host needs:

```
deploy/
  index.html, assets/, …     ← the Vite build (dist/)
  .htaccess                  ← copied from public/ by the build
  api/
    contact.php              ← the backend
    config.example.php       ← template only; real config lives on the server
```

`deploy/` is gitignored and fully regenerated on every run — never edit it
by hand.

---

## 2. Local rehearsal (do this before every upload)

1. Terminal A, from the repo root: `php -S localhost:8000`
2. Terminal B: `npm run dev`
3. Submit the form at `http://localhost:5173` end to end. With a real
   Development Resend key in `api/config.php`, confirm the email lands in
   your dev inbox. Wait at least 2 s after page load before submitting —
   faster than that trips the time gate and is silently dropped.

The PHP built-in server ignores `.htaccess`; the Vite proxy performs the
same URL rewrite in dev, and `.htaccess` is exercised on the real host.

---

## 3. First-time host setup (once)

1. In cPanel/FTP, create `api/config.php` on the server by copying
   `config.example.php` and filling in:
   - the **Production** Resend key (never the Development one),
   - the stakeholder's inbox for `CONTACT_TO_EMAIL`,
   - `ALLOWED_ORIGINS` containing only the production `https://` domains
     (remove localhost).
2. Verify the host runs PHP ≥ 8.1 (cPanel → "Select PHP Version") and has
   cURL enabled (default nearly everywhere).
3. Confirm `.htaccess` overrides are allowed by loading a React Router
   deep link (e.g. `/privacy`) directly — a 404 means rewrites are off;
   ask the host to enable `AllowOverride`.

---

## 4. Upload

1. Zip the current web-root contents on the server (or download a copy)
   — this is your rollback snapshot.
2. Upload the **contents** of `deploy/` into the web root, overwriting.
   Do not delete `api/config.php` on the server; the staged folder
   deliberately doesn't contain a `config.php`, so overwriting is safe.
3. Smoke-test production:
   - Load the homepage and one deep link (`/privacy`).
   - Submit a real enquiry; confirm it reaches the stakeholder's inbox
     with Reply-To set to your test address.
   - Confirm `https://<domain>/api/config.php` returns 403, not source.

---

## 5. Rollback

Re-upload the snapshot zip from §4 step 1 into the web root. Because
`config.php` never changes during deploys, restoring files is the whole
rollback — no config or database state to unwind.

---

## 6. Where the logs are

`error_log()` output lands in the host's PHP error log — in cPanel,
usually "Errors" or a `error_log` file next to `contact.php`. The event
markers are the same as the Node version (`contact: sent`,
`contact: send_failed`, `contact: honeypot_triggered`, …), so the triage
order in [contact-form.md](contact-form.md) §1 applies unchanged — just
read this log instead of the Vercel dashboard.
