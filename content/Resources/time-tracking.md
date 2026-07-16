# ⏱️ Time Tracking

Two kinds of time, both shown on the **📊 Metrics** page:

- **Billable** — time you decide counts as billable. QuickBooks doesn't expose timesheets to this system, so billable time is **logged manually**: tell Claude *"log 2h billable to Brock"* and it's recorded. Any time you actually log = billable.
- **Working** — plain working time, **auto-estimated** from your Claude sessions each morning by the 7 AM scan. Directional, not exact — it reveals where your hours actually go, even when it's not billable.

## How to log billable time
Say: **"log &lt;hours&gt;h billable to &lt;project&gt; [note]"**
Example: *"log 1.5h billable to Ruby Tuesday — Concept 7 revisions"*

## Notes
- Working time is an **estimate** (from session activity) and is marked as such; billable is what you assert.
- Both feed `time-log.json`, aggregated per project on the Metrics page (billable vs working).
