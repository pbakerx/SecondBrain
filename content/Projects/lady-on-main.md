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
- 2026-07-17 (from session) — Added the address/heritage eyebrow at the very top of the page, where the old eyebrow sat (under the Edison bulbs, above the headline): "ESTABLISHED 1901" in brass Deco letterspacing with "523 W MAIN STREET • PURCELL, OK 73080" in a smaller line beneath — reads like the plaque by a speakeasy door. Pushed live (`b510ffa`).
- 2026-07-18 (from session) — Mid-page "See the House Listing" CTA now opens the prospects.com listing in a new tab (`5a72972`). Added a favicon: a little brass house on a dark rounded square with one glowing amber window, matching the speakeasy palette — ships as SVG + PNG fallback + apple-touch-icon (`4493d1d`). Still open: run the end-to-end test call.
