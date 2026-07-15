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
- 2026-07-15 (from session) — Data foundation written and `tsc` clean: additive `multisite.sql`, `app/lib/sites.ts` (Site type + hostname resolver w/ fallback to Philip Baker), and `getProjectsForSite()` in `projects.ts` alongside the untouched single-tenant path. Nothing wired to the public page or run against the DB yet — deliberate. On `redesign` branch.
