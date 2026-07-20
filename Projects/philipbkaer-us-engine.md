# philipbaker.us — Engine (multi-tenant studio)

**Area:** [App Development](../Areas/app-development.md) · **Status:** 🟡 Building
_(domain confirmed as philipbaker.us)_

## What it is
A multi-tenant CMS/studio: one codebase powers multiple brand sites (philipbaker.us live now, Catapult and AechTech as tunable placeholders). Adding a new brand is now just data.

## To-dos
- [ ] Run `multisite.sql` in the Supabase SQL editor (adds `sites` + `site_projects` join, backfills existing content, seeds the 3 brands) — **your move**
- [ ] Build the studio UI: site switcher + per-project assignment to brands
- [ ] Runtime rewire: host → site → theme + content at cutover
- [ ] Point Catapult / AechTech domains at the engine and publish

## Notes
- 2026-07-17 (from session) — Search now understands "Video" honestly: the `video` medium is **derived on read** (`rowToProject`) for any piece with a primary video or video gallery item, so all existing video pieces surface immediately with no re-saving, and **persisted on save** (`projectFromBody`) going forward. Only ever added, never removed, so manual tags stick. "TV" stays deliberately curated — a web reel can't masquerade as a broadcast spot. Detection centralized in a `hasVideoContent()` helper (noted to extend when non-YouTube video lands). `tsc` clean; awaiting commit.
- 2026-07-17 (from session) — Front-end polish on the philipbaker.us site itself: step-number restyled to solid gold (dropped the outline stroke, kept the small monospace HUD size), prev/next arrows + square markers moved into a row **below** the number, and the timeline shifted left of its column center (desktop `-9vw` translateX composed with the existing lift) so it reads balanced against the nav gutter. `tsc` clean; ready to commit/eyeball from the Mac.
- 2026-07-15 (from session) — Data foundation written and `tsc` clean: additive `multisite.sql`, `app/lib/sites.ts` (Site type + hostname resolver w/ fallback to Philip Baker), and `getProjectsForSite()` in `projects.ts` alongside the untouched single-tenant path. Nothing wired to the public page or run against the DB yet — deliberate. On `redesign` branch.
