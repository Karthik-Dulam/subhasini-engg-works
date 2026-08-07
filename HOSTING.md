# Hosting & Maintenance Guide — Subhasini Engg Works Website

## Where things live

- **Live site:** https://subhasiniengg.com
- **Source code:** `github.com/Karthik-Dulam/subhasini-engg-works` (branch: `main`)
- **Hosting:** Netlify — project name `subhasini-engg-works`
- **Netlify admin dashboard:** https://app.netlify.com/projects/subhasini-engg-works
- **Netlify login:** `sales@subhasiniengg.com` (this account owns the site — log into netlify.com with this email to access the dashboard)
- **Contact form backend:** Web3Forms, access key is hardcoded in `contact.html` (`access_key` hidden input)
- **DNS:** Managed via Squarespace Domains UI, but nameservers are still Google Cloud DNS (`ns-cloud-a*.googledomains.com`) — this is normal for domains migrated from the old Google Domains
- **Email:** Google Workspace (MX/DKIM/SPF records on the domain) — untouched by any of this, keep it that way

## How deployment works right now

There is **no CI/CD auto-deploy configured**. Pushing to GitHub does **not** update the live site — GitHub is just being used as source control/backup. Netlify was deployed via a **manual CLI upload** of the local folder, not a linked Git repo build.

### To publish a change, from this folder run:

```bash
netlify deploy --prod --dir=.
```

This uploads whatever is in this folder right now and makes it live immediately (takes ~10–15 seconds). Always test locally first (e.g. `python3 -m http.server 8000`) before running this.

If `netlify` CLI isn't logged in / linked anymore, re-link with:

```bash
netlify login          # opens browser, log in as sales@subhasiniengg.com
netlify link            # select the "subhasini-engg-works" project
```

### Optional upgrade: auto-deploy on git push

Right now, GitHub and the live site are **not connected**. If you want every `git push` to auto-deploy, that requires linking the Netlify site to the GitHub repo via the Netlify dashboard (Site settings → Build & deploy → Link repository), instead of the current CLI-only setup. Not done yet — flagged as a possible follow-up below.

## DNS records currently in place (Squarespace DNS Settings)

- `A` record, name `@`, value `75.2.60.5` (Netlify apex — do not add other A records here)
- `CNAME` record, name `www`, value `subhasini-engg-works.netlify.app`
- `MX` record, name `@`, priority `1`, value `smtp.google.com` — Google Workspace email, do not touch
- `TXT` record, name `@`, value `v=spf1 include:_spf.google.com ~all` — SPF, do not touch
- `TXT` record, name `google._domainkey`, value `v=DKIM1; k=rsa; ...` — DKIM, do not touch

SSL is a Let's Encrypt certificate auto-issued and auto-renewed by Netlify (valid ~90 days at a time, renews itself — no action needed unless it ever shows as expired/broken, in which case re-check DNS first).

## Making content changes

All pages are plain HTML/CSS/JS, no build step:

- `index.html`, `about.html`, `products.html`, `gallery.html`, `contact.html`
- `assets/style.css` — all styling
- `assets/script.js` — nav menu, scroll animations, gallery lightbox, contact form submission logic, email de-obfuscation (see below)
- `assets/images/` — all photos

Edit the relevant `.html`/`.css`/`.js` file directly, test locally, then run `netlify deploy --prod --dir=.` to publish.

## Email address handling (anti-scraping)

The email address is **not** written as plain text anywhere in the HTML source. Instead, links use:

```html
<a href="#" data-email-user="sales" data-email-domain="subhasiniengg.com" data-email-fill>Email Us</a>
```

`assets/script.js` fills in the real `href="mailto:..."` and visible text at runtime via JS. This stops basic scraper bots (the ones that just fetch raw HTML and regex for `@` patterns) from harvesting the address for spam lists, while real visitors get a fully working email link exactly as before. Phone numbers are intentionally left as plain `tel:` links — phone spam isn't really driven by website scraping, and buyers expect one-tap calling on a B2B site.

If you ever add a new email link, follow the same pattern instead of writing `mailto:sales@subhasiniengg.com` directly in HTML.

## Backing up / version control

```bash
git add -A
git commit -m "describe your change"
git push
```

This keeps GitHub in sync as a backup/history, but remember — **this alone does not update the live site**. You still need the `netlify deploy --prod` step.

---

## What's still outstanding

1. **Tube Finning Machine Tooling — no real product photos yet.** That section currently shows an honest "Product photos coming soon" placeholder (on both the homepage card and the Products page) because none of the 15 supplied photos actually show tube-finning tooling — they're all Bearing Block Assembly parts or raw materials. Send real photos of the tooling product and I'll swap them in.

2. **Image file sizes are large.** `assets/images/` is ~20MB total, several files are multi-MB phone photos. This works fine but page load will be slower, especially on mobile/weaker connections. Worth compressing/resizing at some point (I can do this — no action needed from you, just say go).

3. **No favicon or social preview image (Open Graph).** When someone shares a link to the site (WhatsApp, LinkedIn, etc.) there's currently no preview thumbnail/icon — browsers show a blank tab icon. Low priority but easy to add.

4. **No auto-deploy from GitHub.** As noted above, deploys are manual (`netlify deploy --prod`). Fine for a low-frequency-update site like this, but if you want "push to GitHub = site updates itself," that's a one-time Netlify dashboard setup away.

5. **Web3Forms — verify email delivery is consistent.** You confirmed a test submission worked. Worth periodically checking that `sales@subhasiniengg.com` keeps receiving form submissions (free-tier form services occasionally require re-verification or have submission caps).

6. **GitHub Pages leftover.** The GitHub repo still has Pages capability (serving at `karthik-dulam.github.io/subhasini-engg-works/`) but no custom domain attached anymore — it's harmless and can just be ignored, or disabled entirely in repo Settings → Pages if you want to clean it up.

7. **`image_notes.md`** in this folder — internal working notes from reviewing all 15 photos (what each shows, where it's used, corrections made). Not part of the live site (gitignored), kept here for reference only. Safe to delete once you no longer need it.
