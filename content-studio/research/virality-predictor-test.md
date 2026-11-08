# Does Higgsfield Virality Predictor rank this account's reels correctly? (test 2026-11-08)
Owner asked to test the tool on a known winner before trusting its score for the brand reel. Each reel was the file
Instagram serves through the Graph API, run through the tool once, at no credit cost. Real performance is the multiple
of the account median (3,636 views, read 2026-11-01).

| Reel | Real result | Overall | Viral potential | Hook (0-3 s) | Brain engagement |
|---|---|---|---|---|---|
| Crinkle Cake (1 Oct, original 1080p file from the owner) | 142.7x (~500K views) | 44 | 41 | 28 | 35 |
| Stuffed Sweet Potato Patties (27 Oct) | 9.8x | 42 | 40 | 27 | 32 |
| Crispy Potato Rolls (24 Sep) | 4.5x | 44 | 43 | 28 | 34 |
| Kibbeh Nests (1 Nov) | 0.3x | 43 | 40 | 28 | 33 |
| Brand reel v2 (not posted) | n/a | 50 | 52 | 33 | 42 |
| Brand reel v3 (not posted) | n/a | 49 | 48 | 33 | 42 |

- Crinkle Cake and Mansaf have no media_url in the API, most likely because of their music. The owner sent the
  Crinkle Cake file (job d473ee0f). Mansaf was not tested.
- Result: the account's best reel ever (142.7x) scored 44 overall and 28 for the hook, the same as Kibbeh Nests
  (0.3x: 43 and 28). Across the 4 reels the real results span 0.3x to 142.7x (about 475 times), and the scores
  span 42 to 44.
- The same unchanged second of the brand reel scored 0.54 in one run and 0.48 in the next, so the tool's noise is a
  few points.
- Conclusion: on this account the tool does not separate winners from flops. Its score is not a decision rule; the
  account's own Instagram numbers are.
