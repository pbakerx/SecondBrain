# Catapult — Website

**Area:** [App Development](../Areas/app-development.md) · **Status:** 🔥 Top priority
_Brand site powered by the [philipbaker.us engine](philipbkaer-us-engine.md) (multi-tenant studio)._

## To-dos
- [ ] Define scope + content for the Catapult site
- [ ] Build / publish on the engine
- [ ] Point the Catapult domain at the engine

## Notes
- One of Philip's top-3 web priorities (with philipbaker.us and aechtech.com).
- 2026-07-16 (from session) — Active build in progress on the engine (preview at `/?site=catapult`). Polishing the hero type-on/type-off animation with synthesized typewriter SFX: clack fires every 2 characters while typing, erase fires on every character for a fast "brrrr" wipe-off, erase volume dialed down (~0.088 peak vs 0.22 typing). `tsc` clean, hot-reloads. Visual timing untouched.
- 2026-07-16 (from session) — "See the work" timeline: re-centered the rail origin to bottom-center, mounted the Catapult logo-bug as the emitter at the rail's near end, and gave it life — idle gold "breathing" halo + a surge bloom that flares with camera/scroll velocity so timeline lines visibly spring out of the mark. Fable built it, `tsc` verified clean. Work is **uncommitted** on the tree (awaiting sign-off). Open thread: the logo SVG is embedded raster PNGs (3 exports all came back as bitmaps → source art is raster), so internals can't be animated as-is; the 4 clip-mask paths ARE real vector (the petals), so plan is to rebuild the emitter as true vector — reuse the 4 petal paths verbatim, recreate the center spark/ring in brand gold — to get animatable internals (pulse ring, flare/stagger petals). Awaiting Philip's go on the vector rebuild.
- _(still to lock: full scope/content and launch/domain target)_
