# Roast Machine — iOS App

**Area:** [App Development](../Areas/app-development.md) · **Status:** 🟡 Scoping (auto-detected — confirm)
_Related: the "Roast Machine" build under [Assist AI](assist-ai.md)._

## What it is
SwiftUI iPhone/iPad app. Single flow: snap or pick a photo → choose a mode → a vision model analyzes the image → an LLM writes the bit → TTS speaks it with a waveform → share/save the clip. Framing keeps it playful (photo "practicing standup"). One-time unlock at Apple's $0.99 minimum. Bundle would be `AechTech.RoastMachine`.

**Modes (concept):**
- Roast flavors: Classic Standup, British Dry Wit, Gordon Ramsay, Disappointed Mom, Gen Z, Shakespearean, Drill Sergeant, Diss Track, Corporate LinkedIn.
- Nice/other: You're So Beautiful, Motivational Coach, Nature Documentary, Fortune Teller, Conspiracy Theorist, Pickup-line, Dating Bio writer, Pet Translator, Party Guessers (age/job/star sign).

## To-dos
- [ ] Lock the mode list + which ship in v1
- [ ] Scaffold the Xcode project (reuse AssistAI's signing, Secrets.xcconfig, and StoreKit patterns)
- [ ] Wire vision → LLM → TTS flow with waveform + share/save

## Notes
- 2026-07-15 (from session) — Concept laid out; session in progress, awaiting a few build decisions. Plan reuses the existing AssistAI Xcode config (automatic signing, `Secrets.xcconfig` key pattern, StoreKit in-app-purchase setup) as a head start — AssistAI folder left untouched.
