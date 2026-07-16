# Lady on Main — real estate landing page (voice agent)

**Area:** [AI Creative](../Areas/ai-creative.md) · **Status:** 🟢 Deployed (auto-detected — confirm)

## What it is
Real estate landing page where visitors "talk to the house" — an ElevenLabs voice agent in character. Repo: `pbakerx/ladyonmain`. Same voice-agent pattern as philipbaker.us.

## To-dos
- [ ] Confirm Vercel deploy is live and test the call end-to-end
- [ ] _(add follow-ups)_

## Notes
- 2026-07-15 (from session) — Voice ID documented in code + README. Built a `play_song` client tool: when a visitor asks the house to sing, the agent delivers one in-character goodbye line, hangs up the call, and plays the ElevenLabs song through the "Hear Me Sing" player. Agent config + page code both deployed (`main` at `c4149cf`).
- 2026-07-16 (from session) — Rewrote the voice-agent prompt (live, no deploy): "storyteller first, saleswoman never" — stories must be true and drawn only from the knowledge base but should make the listener fall for the house and want to visit. Added an *occasional* (dialed back from frequent, never twice in a row) call to action to reach Debra Penrod for a showing; phone number removed from the prompt so she won't read it aloud (points to the contact "right below on this page"). Contact email confirmed `penrod.debra@gmail.com` (already correct). Removed the top hero "See the House Listing" button so visitors hit the song player + "Talk to the House" before any exit ramp — the mid-page CTA button remains. Pushed live: commits `ce3e250` (photos/tour/config) and `b48d662` (hero button removal).
