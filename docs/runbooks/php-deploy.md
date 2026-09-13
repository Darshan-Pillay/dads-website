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
  _ds/                       ← Polaris design-system bundle (index.html links it — required)
  .htaccess                  ← copied from public/ by the build
  api/
    contact.php              ← the backend
    config.example.php       ← template only; real config lives on the server
```

`deploy/` is gitignored and fully regenerated on every run — never edit it
by hand.

### Why a deploy folder exists at all

No single existing folder matches what the server should receive:

- **The repo** contains things the host must never get — `src/`,
  `node_modules/`, docs, and the local `api/config.php` holding the
  Development Resend key.
- **`dist/`** is only the frontend; Vite knows nothing about the PHP
  backend.

`npm run stage` combines the two halves into one unambiguous
"this is what goes up" folder. On Vercel, `git push` did this invisibly;
on shared hosting *you* are the deploy pipeline, so the suitcase gets
packed explicitly.

Two properties are deliberate (ADR-0010 §9):

1. **It never contains `config.php`** — uploading it can therefore never
   overwrite or leak the server's secrets. The server's config is created
   once (§3) and survives every deploy untouched.
2. **It is throwaway build output** — regenerated from scratch each run.
   Any hand-edit inside `deploy/` is erased by the next `npm run stage`;
   all changes go in the repo and flow through the build.

### Zip it for the host's file manager

The host's file manager (Plesk on this host) uploads one file far more reliably than 40 — and
browser drag-and-drop tends to silently skip the hidden `.htaccess`.
So upload a single zip and extract it server-side:

```sh
cd deploy && zip -r ../softfinity-deploy.zip . && cd ..
```

Zipping from *inside* `deploy/` matters: it puts `index.html` at the top
level of the archive (not nested under a `deploy/` folder) and includes
the hidden `.htaccess`. Sanity-check before uploading:

```sh
unzip -l softfinity-deploy.zip | grep -E 'htaccess|config'
# expect: .htaccess and api/config.example.php — and NO api/config.php
```

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

1. In Plesk File Manager (or FTP), create `api/config.php` on the server by copying
   `config.example.php` and filling in:
   - the **Production** Resend key (never the Development one),
   - the stakeholder's inbox for `CONTACT_TO_EMAIL`,
   - `ALLOWED_ORIGINS` containing only the production `https://` domains
     (remove localhost).
2. Verify the host runs PHP ≥ 8.1 (Plesk → Websites & Domains → PHP Settings) and has
   cURL enabled (default nearly everywhere).
3. Confirm `.htaccess` overrides are allowed by loading a React Router
   deep link (e.g. `/privacy`) directly — a 404 means rewrites are off;
   ask the host to enable `AllowOverride`.

---

## 4. Upload

1. Zip the current web-root contents on the server (or download a copy)
   — this is your rollback snapshot. In Plesk File Manager: open the web
   root (`httpdocs/` on this host), Select All → Archive → Add to archive as e.g.
   `backup-YYYY-MM-DD.zip`, then move it *out* of the web root so it isn't
   publicly downloadable.
2. Upload `softfinity-deploy.zip` (§1) into the web root, right-click →
   **Extract**, then delete the zip. This overwrites the old files in
   place. Do not delete `api/config.php` on the server; the staged folder
   deliberately doesn't contain a `config.php`, so overwriting is safe.
   (File Manager hides dotfiles by default — Settings → "Show Hidden
   Files" to confirm `.htaccess` landed.)
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

`error_log()` output lands in the host's PHP error log — in Plesk (Logs / the `logs/` folder),
usually "Errors" or a `error_log` file next to `contact.php`. The event
markers are the same as the Node version (`contact: sent`,
`contact: send_failed`, `contact: honeypot_triggered`, …), so the triage
order in [contact-form.md](contact-form.md) §1 applies unchanged — just
read this log instead of the Vercel dashboard.
