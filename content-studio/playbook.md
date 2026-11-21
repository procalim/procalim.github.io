# The playbook «طريقنا للفيروسية» (2026-11-21)
The owner, 21 Nov: «الفكرة سارت عنا واداة ig viral موجودة والسكيب حليناها ضايل الإكمال إلى 40% وإذا حلينا المشاركة
والخفظ والمبيعات حتكون موجودة انت كخبير اي خطوة منعملها سجلها».
Every reel goes through the steps below, in order, and each step's check runs before the next. Every step is logged in
the step log at the end: what we did, what came out, the mistake caught or missed, and the rule it added.

## The numbers we chase
| Metric | Where it is read | Now | Target |
|---|---|---|---|
| Skip | the insights table, "Skip rate" | lantern v4 (no text) 22.4-22.9%: solved | under 25% |
| Completion | the end point of "How long people watched" | lantern 14% (23 s), chain 14 s about 10% | **40%** |
| Average watch | the insights summary, as a share of the length | lantern 50%, chain 14 s 44% | over 70% |
| Shares | sends per 1,000 reached | lantern 0.04, chain 0 | 8.7 (the sweet potato patties' bar) |
| Saves | saves per 1,000 reached | lantern 0.17 | 2 |
| Sales | the keyword DMs (ChatPlace), then the book link | not counted per reel yet | counted per reel |

## The steps
| # | Step | The check before the next step | Source |
|---|---|---|---|
| 1 | **The idea:** the next row of idea-lab/invention-bank.md; no base more than 3 episodes in a row | the owner's Instagram search with the row's terms (the web does not see reels); evidence from ig-viral when there is a data source | idea-lab 0, 2b |
| 2 | **The reference images:** one shape block, word for word, in every image prompt | image 1 first, then attached to images 2 and 3; the owner checks the shape is the same in all three | reels-director rule 7 |
| 3 | **The prompt** | `python3 edits/_tools/prompt_check.py <file>`: every FAIL fixed; the 5 questions answered in the file under PRE-FLIGHT; the prompt read once in Arabic | reels-director rules 1-10 |
| 4 | **The owner's run, read** | the job's settings from the generation history: the element, the images in their order, the length; then frame sheets every 0.25 s (sheets.py) before any word to the owner, with the seconds that are wrong | this playbook |
| 5 | **A fix** | only the wrong shot is made again (a 5 s take), and spliced in; never the whole take for one shot | 21 Nov, the clam |
| 6 | **The Editing Room** (angles-hf, a Seedance video edit) | on the long one-camera shots only (the opening, the payoff); only on «ولد» | 21 Nov, the owner |
| 7 | **The completion cut**, 13-15 s | THE COMPLETION ENGINE: one question from frame one, answered in the last second; a new picture every 1-1.5 s; no bite; the last frame is the peak | reels-director |
| 8 | **Text on the video** | by the braid's read: the POV line in the top band, or none | reels-director THE TABLE |
| 9 | **The caption** | THE TABLE: the full recipe (saves), a send line naming a person (shares), the keyword (comments, sales) | reels-director THE TABLE |
| 10 | **The post** | 2:30 am, no location, a Trial Reel | plan |
| 11 | **The read at 24 h** | skip, the average watch, the curve's end, sends and saves per 1,000, keyword DMs, follows: into ideas.md and the step log; the next reel changes one thing | idea-lab 4 |

## The step log
| Date | Reel | Step | What we did | What came out | Mistake: caught or missed | Rule added |
|---|---|---|---|---|---|---|
| 2026-11-21 | Spring potato | 1 | five web searches, "not found" | the owner: old and all over reels; the AI did not draw it right | missed: reels were not checked | idea-lab 2b (the owner's reel search first) |
| 2026-11-21 | Zipper corn dog | 2 | three image prompts, the teeth written differently in each | different teeth in every image | missed | reels-director rule 7 |
| 2026-11-21 | Zipper corn dog | 1 | the 4th hot dog episode in a row | the owner: change the recipe | missed | idea-lab: 3 episodes of one base in a row at most |
| 2026-11-21 | Clam and pearl | 3 | shot 01: "slices across its middle", 5 actions in 3.5 s, the finished-rib images attached | the first 3.5 s wrong: ribs before the knife, the top lifted off, ribs cut into a standing shell | missed: no check of the physical order; the checker now FAILs this prompt on "across its middle" and WARNs on the 5 actions | reels-director rules 8-10; prompt_check.py |
| 2026-11-21 | Clam and pearl | 5 | a 5 s opening: smooth roll, six taps, the cut at the edge, the hinge | the first run came without the owner's element; he is making it again | caught by reading the job's settings | step 4: the settings are read from the generation history |
| 2026-11-21 | Clam and pearl | 3 | the 5 s opening checked after it was sent | prompt_check: pork and alcohol missing from AVOID (a bread shot, no meat; kept as sent) | caught after sending | none: the check now runs before sending |
