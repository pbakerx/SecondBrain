# Honda / Acura — Summer Service Ads (dealer name automation)

**Area:** [AI Creative](../Areas/ai-creative.md) / client work · **Status:** ✅ Done & billed (2026-07-15) — archived

## What it is
Localized summer service ads for two auto brands — same ad, every dealer's own name on it, across 6 sizes + two creative versions + retargeting. ~1,012 dealers, 18,000+ individual files. Built as a system: one spreadsheet source of truth + parallel AI/After Effects render pipeline, each output checked against a shared spec.

## Status / to-dos
- [ ] Finish Honda render — resume at range `598-722` (clean break after the failure, 125 left)
- [ ] Render two Acura outliers via `Acura_Summer_OUTLIERS.jsx` (8 movies: 2 dealers × A/B × 2 sizes) — CardinaleWay | Acura Las Vegas; Jay Wolfe Acura | of Overland Park
- [ ] Presentation/gallery package: standalone poster-grid site (relative paths, deploys to Netlify drop or double-click locally)
- [ ] LinkedIn post drafted ("We've all hated this / I built this / It's real / It's more than pictures") — ready to publish

## Notes
- 2026-07-15 (from session) — 8 AE scripts (460 lines each) verified; Honda CSV = 722 dealers, Acura = 196, both matched to source Excel. Outlier script written. Gallery package built + verified (relative paths, ~138 MB zip).
