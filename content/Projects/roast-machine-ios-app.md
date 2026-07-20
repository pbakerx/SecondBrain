# Roast Machine — iOS App

**Area:** [App Development](../Areas/app-development.md) · **Status:** 🟢 Built — v1 running (auto-detected — confirm)
_Related: the "Roast Machine" build under [Assist AI](assist-ai.md)._

## What it is
SwiftUI iPhone/iPad app. Single flow: snap or pick a photo → choose a mode → a vision model analyzes the image → an LLM writes the bit → TTS speaks it with a waveform → share/save the clip. Framing keeps it playful (photo "practicing standup"). One-time unlock at Apple's $0.99 minimum. Bundle would be `AechTech.RoastMachine`.

**Modes (concept):**
- Roast flavors: Classic Standup, British Dry Wit, Gordon Ramsay, Disappointed Mom, Gen Z, Shakespearean, Drill Sergeant, Diss Track, Corporate LinkedIn.
- Nice/other: You're So Beautiful, Motivational Coach, Nature Documentary, Fortune Teller, Conspiracy Theorist, Pickup-line, Dating Bio writer, Pet Translator, Party Guessers (age/job/star sign).

## To-dos
- [ ] Rename the stale iCloud copy to `RoastMachine 2.0 _OLD_DO_NOT_USE` so it can't be opened by accident (awaiting Philip's go)
- [ ] Lock the mode list + which ship in v1
- [ ] Scaffold the Xcode project (reuse AssistAI's signing, Secrets.xcconfig, and StoreKit patterns)
- [ ] Wire vision → LLM → TTS flow with waveform + share/save

## Notes
- 2026-07-17 (from session) — **Build gotcha found and diagnosed:** the redesign appeared to "not take" on-device because Xcode was open on the **old iCloud copy** (`Documents/Client Work/pb/RoastMachine 2.0`), not the live one at `Software Development/RoastMachine 2.0` where every redesign file lives. Both folders share a name, so Recent Projects shows two near-identical entries. Fix: open the `Software Development` project explicitly, delete the app from the phone, rebuild. Also: the earlier Xcode errors ("attach by pid failed", logging timeout) were benign debugger-attach noise, not build failures. Standing decision — Claude no longer runs any git commands on this repo (sandbox leaves `index.lock`); Philip commits from Terminal.
- 2026-07-17 (from session) — **Camera-first mechanical redesign** (compiles clean, 15 files balanced). Home opens straight into the live camera with a themed face-positioning guide; "Choose a photo" demoted to a small control-panel button. New tactile UI: brushed-metal panel with rivets/bevel, modes as a knurled dial (metal knobs that scale + glow on select), chunky beveled shutter with heavy haptic. New `ModeTheme` gives all 14 modes a full "scene" identity (Comedy Club / Kitchen / Red Carpet / Boot Camp…) — per-mode colors, positioning overlay, direction text, background motifs, vignette — and the **result screen** now carries the scene through with the roast presented big/theatrical. First pass uses procedural gradients + SF Symbol motifs; next step is real painted scene art per mode. Awaiting commit (sandbox git-lock quirk — Philip commits from Terminal).
- 2026-07-16 (from session) — **Built & running.** App compiles and runs on-device with 14 modes, live portrait camera, and the voice pipeline working end-to-end. StoreKit paywall wired (`Subscriptions.storekit`, product IDs match code) with an honest loading state + "Store unavailable / Try Again" fallback. Dev flag `devUnlockEverything = true` in `StoreManager.swift` unlocks all modes for testing (flip to `false` to restore freemium gating before ship). Signing + StoreKit hurdles cleared.
- Next options on the table: app icon (flame/mic motif), per-mode voice-preview button, export roast as a video clip (not just mp3) for social, roast history. App Store Connect product setup still to do for TestFlight/App Store.
- 2026-07-15 (from session) — Concept laid out; plan reuses the existing AssistAI Xcode config (automatic signing, `Secrets.xcconfig` key pattern, StoreKit in-app-purchase setup) as a head start — AssistAI folder left untouched.
