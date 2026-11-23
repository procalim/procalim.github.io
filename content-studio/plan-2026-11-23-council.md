# The council plan: views that sell (2026-11-23)
The owner, 23 Nov: a council (the engineer, the devil's advocate, the dumb customer, a retention-to-revenue expert,
the maestro) on «مبيعات مشاهدات فيروسية» and «نمو حسابي وتحويلهم إلى مبيعات كتاب الطهي الرقمي». This is the
maestro's answer, built on the numbers read through the Instagram API on 23 Nov, 11:18 UTC.

## The numbers it stands on
| Reel | Age | Reach | Skip | Avg watch | Shares | Saves | Comments |
|---|---|---|---|---|---|---|---|
| Lantern v4 (23.2 s, no text) | 3.5 days | 35,731 | 23% | 11.5 s (49%) | 1 | 6 | 1 |
| Sweet Potato Flatbreads | 7 days | 5,289 | 48.2% | 5.9 s | 43 (8.1/1K) | 65 (12.3/1K) | 11 |
| Braid (13.3 s, POV line on top) | 15.5 h | 2,154 | 34.2% | 6.9 s (52%) | 0 | 0 | 1 |
| The Safe (16.4 s, no text) | 13.8 h | 1,101 | 40.5% | 7.6 s (46%) | 0 | 0 | 1 |
| Spinach crinkle | 1 h | 158 | 22.6% | 6.7 s | 0 | 2 | 1 |

## THE FORMULA, locked (the owner, 23 Nov: «هيك صح سجلها عند استراتيجية دايما بنفس البرومبت والقصة والشغل بس تغيير الوصفات»)
- Every reel: the same prompt, the same story, the same work: prompts/_template-kevin-motion-26s.txt (Kevin's motion
  as Higgsfield's video analysis read it, on his measured seconds). Only the recipe changes, word for word from the book.
- The story: a comic opening with the hero ingredient in a bright living room (0-2.04 s), pushed at the lens; the dark
  kitchen; the first big step falling into a bowl; the quick additions; the clump at the lens; the cooker's lid at the
  camera; the assembly on one base with an overlap; the throw and the slow landing; the folds; the hold-up, the cut,
  the pull-apart, the finishing touch, the cross-section; the bite.
- The work: the take carries the motion; the edit only cuts on the prompt's seconds, keeps its two overlaps, adds the
  three lines and the sound. No new effects per reel.
- A reference video is read by Higgsfield's video analysis, never by Claude's still frames (Claude does not see motion;
  eleven edits of the crunchwrap missed it, 23 Nov).

## The equation
Sales = reach x want-to-make (saves/1K) x the ask (keyword comments/1K) x delivery (DM -> link) x buy.
- The spectacle reel wins reach (lantern 35.7K) and loses every term after it (0.17 saves/1K, 0.03 comments/1K).
- The useful reel wins the middle (flatbreads 12.3 saves/1K, 2.1 comments/1K, 8.1 shares/1K) and loses reach.
- Delivery and buy are not counted per reel.

## The format: «مش متل ما بتفكر» (Not What You Think), a named series
1. Frame one: a never-seen act with 6-8 sharp hits, in motion (lantern 23% skip; the safe's still opening 40.5%).
2. A reveal every 3-5 s, a cut about every 1.5 s, the inside or the answer last (the 58M grammar); 25-30 s in one take.
3. The payoff is food a family would make: a treat for the kids, a dinner, a snack (the flatbreads' saves).
4. One send line naming a person, on screen at the payoff and in the caption.
5. The keyword sends THIS recipe and the book link (flatbreads: «the full recipe» -> 11 comments; the generic
   «8 recipes» PDF on the lantern, the braid and the safe -> 1 comment each).

## The prompt
- One take of 25-30 s; every shot changes the food or reveals something; ordinary prep goes to the caption.
- Images are references for look only, named once (rule 11); no shot tied to an image.
- prompt_check and the 5 answers before it goes to the owner.
- Invented steps (the tray, the safe mould, the clam cut) get one kitchen test before posting: a viral recipe that
  fails at home costs the book's trust.

## The edit
- The 0.5 s viewer sheet before the owner sees it; every second with no change is cut.
- A different camera move per shot, an accent every 3-4 s, no shake.

## Sales, counted per reel
- One keyword per reel; ChatPlace counts the DMs (ChatPlace must be reconnected in the claude.ai connector settings).
- The book link in the DM carries ?ref=<keyword>, so the store's referrer report shows sales per reel where it can.
- A weekly row per reel in idea-lab/ideas.md: reach, skip, avg watch %, shares/1K, saves/1K, keyword comments, DMs,
  link clicks, sales.

## The tests, one variable each (Trial Reels)
1. Ice Cubes That Aren't (prompts/w4-tanghulu-ice-cubes-30s.txt): A no text vs B the owner's three lines.
2. The next episode: the full recipe in the caption vs the recipe only in the DM.
3. The episode after: a friend send line vs a parent send line.
Read each at 24 h; the winner becomes the house rule; the step log records it.
