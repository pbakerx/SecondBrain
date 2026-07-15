# Second Brain — Web View

A password-protected web version of your Second Brain, deployable to Vercel.

## View locally (no internet needed)
Open `public/index.html` in your browser.

## Deploy to Vercel (hit it from anywhere)
From this folder, run:

```bash
bash deploy.sh
```

It refreshes content from your brain, rebuilds the pages, and deploys to Vercel
using the `VERCEL_TOKEN` already in `../aechtech-voice-agents/.env`.

**Login:** set via `.deploy.env` (local) or Vercel env vars `BRAIN_USER` / `BRAIN_PASSWORD`
(change `BRAIN_PASSWORD` in `deploy.sh` and re-run to update it)

## Update after editing your brain
Just re-run `bash deploy.sh` — it always pulls your latest markdown.

## Files
- `build.js` — renders the markdown in `content/` into styled HTML in `public/`
- `middleware.js` — Vercel Edge Basic-Auth gate (keeps the site private)
- `vercel.json` — serves the `public/` folder
- `deploy.sh` — one-command refresh + build + deploy
