# VoiceAgent — Mass Scale Marketing

_(formerly "AechTech Voice Agents")_

**Area:** [App Development](../Areas/app-development.md) · **Status:** 🟢 Pipeline proven end-to-end
**Code:** `aechtech-voice-agents/` (this workspace)
**Sibling product:** [Voice Agent — Personal Pitch](voice-agent-personal-pitch.md)

## Where it stands
Full pipeline built & proven: scout → research → build → page → visual → outreach. Single-agent mode working. HTML email with before/after visual confirmed.

## Next actions
- [ ] Scale outreach volume
- [ ] _(add)_

## Notes
- Priority #1 venture.
- Known fixes logged in memory (Apollo auth header, single-agent key remap, ElevenLabs "audio" client event, Vercel URL persistence).
- 2026-07-15 (from session) — Landing page dossier redesign shipped: business name as display headline, 3 AI-written rotating headlines (Haiku), compact rating cards, real quote pull-outs, wow-facts grid, brand-readable blue. Generator now takes `--agent-id`; contacts run before research with an email gate. Admin got a duplicates modal + inline status editor. README + docs updated.
- Profile-building stack confirmed (in order): Google Places (scout) → Firecrawl (research/scrape) → Claude Sonnet (structure) → Apollo.io (contacts) → Hunter.io (fallback enrichment) → Claude Haiku (page copy). No "Heatwave" — that tool doesn't exist; Hunter.io is the fallback.
