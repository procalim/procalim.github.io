---
name: reels-director
description: >
  House rules for Ahmet Salameh's (@ahmet_salameh, The Edible Codex) Instagram food reels.
  Use for any request about a reel, a Seedance/Higgsfield video prompt, hook text, rehook,
  CTA, caption, pinned comment, "البروتوكول", on-video texts, or a ChatPlace automation for a
  posted video ("نزل"). Holds the proven chips-style prompt template, the book-faithful
  recipe rule, the overlay timing and the posting protocol.
---

# Reels Director

## Non-negotiable rules
1. **Never generate** on Higgsfield without the user writing «ولد» or «قم بتوليد». Before that:
   show the prompt, the line-by-line match with the book page, what may not match, and the
   exact price from `generate_video` with `get_cost: true`.
2. **Recipe = the book, word for word.** Read the page from the book PDF first
   (`The-Edible-Codex.pdf`; it is not in this repo, ask the user to upload it if missing).
   Every step once, in book order, nothing added (no packaging, no extra plates, no extra
   food, no invented shots). Add the chef's note if the page has one. Show a table
   "book step -> shot" before asking for «ولد».
3. **Halal:** no pork, bacon, ham, alcohol, mirin. Write "no pork" in the prompt for meat.
4. **Identity:** black luxury kitchen, 2700 K tungsten light, black nitrile gloves, white
   t-shirt, black apron with brown leather straps, thin gold chain, brown aviators.
5. **Never blame the user.** Report numbers, not guesses. Change one variable per test.
6. Talk to the user in Levantine Arabic, minimal English words.
   Work day by day (owner, 2026-10-27): one day's tasks per message, short, no multi-page plan documents or
   PDF dumps unless he asks. The prompt and the content come first.
7. Captions: English first then Arabic, 3-5 hashtags, no em dashes, each copy item in its
   own code block. Recipe count is always 361. Book price 14.99 USD (was 9.99), instant download,
   30-day refund.
   Purchase line (owner's call, 2026-11-01): no price, emotional (home, family, the table, gathering),
   tied to the reel's dish, ending in the link in bio. Title stays `Recipe | Hook | Arabic hook`.
   No day names or dates in it (owner, 2026-11-01: "Friday lunch" read as a wrong day on a Sunday post).
   Example (Kibbeh Nests): "This one tastes like home, the whole family around one plate. I put that feeling
   into 361 recipes in my book The Edible Codex, so your table never runs out of reasons to gather. Link in bio 📕" /
   «هالأكلة إلها طعمة البيت، والعيلة كلها حوالين صحن واحد. حطيت هالإحساس بـ ٣٦١ وصفة بكتابي The Edible Codex،
   مشان سفرتك ما يخلص فيها سبب للّمّة. الرابط بالبايو 📕»

## What the data proved (keep using)
- The best reel (rice paper chips, 73% avg watch) used the chips-style prompt below:
  face in motion, violent actions, cuts every 0.5-1.5 s, loop back to the start.
- Every reel with a **text box in the first 2-3 s** had a cliff at second 1-2. The same
  chips footage with a big hook box raised skip rate from 25.8% to 37.5%.
- Raw-ingredient openings and calm top-down AI footage dropped viewers at second 1-2.
- One single 18 s generation cannot follow a 37-cut reference; do not promise a 1:1 match.
- Mala (slow macro opening) 53.1% skip; feta (wide raw-ingredient opening, Wan footage)
  51.4% skip. Both lost half the viewers by second 2. Frame one must already be action.
- Big Mac tacos (Katana, 5 clips, 608 credits, 10.75 s, action from frame one): 33.1% skip,
  7.34 s avg watch (68%), about 28% to the end, 1 share and 2 saves on 2.4K views after 3.5 h,
  91% from the Reels tab. No cliff at second 1-2 any more; the loss is a steady slide in the
  middle. Next test: arancini, one locked-camera Seedance clip, one top hook only.
- Dubai Chocolate (10 s): 7.1K views, 8.86 s avg, ~45% to the end, 0 shares 4 saves. Good
  completion alone did not spread it. Maqluba (19 s, static finished-dish first frame): 5.3K
  views, 11.23 s avg, ~30% to the end, 15 shares 17 saves (2.8 shares per 1K views, the best
  rate, above crinkle cake's 2.0). A reel needs both completion and shares. Next test: Maqluba
  again in the 12 s chicken-parm format, flip as the payoff (topic fixed, format changed).
- Mac & cheese balls (Seedance 2.5 with a competitor reel as video_references for motion only,
  book recipe p329, 9.5 s, short on-screen cards of 6 words or fewer, each line scored 85+ with
  hookscore): 28.5% skip, 7 s avg watch (74%), ~35% to the end, 1.9K views in 80 min (faster than
  the typical reel). AI rendered the inside as plain cheese with no macaroni: always ask for the
  filling to be visible ("many macaroni tubes visible in both halves") and QA the break shot.
- Completion to the end is the owner's target metric (45-60%; most reels sit at 20-35%, Crinkle
  Cake started at 56%). Hold the payoff (result, break, jiggle, cut) for the last 1.5 s and never
  show the finished food earlier: mac & cheese v3 moved the break shot to 1.2 s and ended at ~35%.
  Use a loop ending. No text on the payoff, and the share ask stays off the video.
- Recipe numbers on the site (`N° 056`) are the book's recipe numbers (cornflake tenders N° 076 =
  «رقم 076», Arabic PDF page 219 of 380), not page numbers. Find the page by that number.
- Gochujang chicken (Genjutsu Lite, motion from a reference video, 2 x 10 s): the chicken changed
  shape in almost every shot (big piece, breasts, strips, cubes, balls, flat patties) because the
  prompt said "chunks" once while the reference showed long strips. With a motion reference, pick
  the food shape the reference already has, give exact size and count, repeat it in every shot,
  and list the wrong shapes in AVOID (balls, cubes, patties, breasts, bones, empty plate).
- Fettuccine (Genjutsu Lite, 11.4 s, opened on the finished creamy pasta, hook card in the middle
  of the frame over the cream sauce): retention read off the graph ~90% at 1 s, ~60% at 2 s, ~45% at
  3 s, ~35% at 4 s, ~20% at the end; 83.9% of views from the Reels tab. The cliff is in seconds 1-3:
  a calm top-down shot of the finished dish (the payoff shown first, nothing new for 2.7 s) and white
  text on a light cream background that is hard to read at feed size. Next test, one variable: open on
  the loudest action shot and keep the finished dish for the end.
- Several variables changed per post taught nothing. One change per post, log the numbers.
- Stuffed sweet potato patties (27 Oct; Genjutsu Lite motion from a competitor reel, recipe from that reel, 11.58 s,
  1 s cheese-pull flash at the start then the reference order, 3-line hook for mothers «الطريقة الوحيدة ولادك ما
  بيحسّوا بالسبانخ», CTA «الوصفة بأول تعليق. احفظها», daily engagement round running): 23K views in 21.5 h (7x the
  median), 99.4% non-followers, skip 44%, 7.56 s average (65%), ~31% to the end, shares 8.7 and saves 13.9 per 1,000
  reach (4x the medians). Retention ~90% at 1 s, ~70% at 2.5 s, ~57% at 3.5 s: right after the flash the reference
  goes to calm raw steps (potato on a tray, fork, oil). Owner's call (2026-10-28): keep this reel's strategy as it
  is, including the engagement round; only the hook and the video get better. Next improvements: hook in 2 lines and
  6 words or fewer; after the flash, no calm raw step (cut or speed the reference's slow opening 1.5-2x) so something
  new lands every second through 0-5 s.
- Multi-clip generations (Katana plates, re-rolls) forget the food between clips: the taco
  beef was thin in plates A/B and a thick burger patty in the lid-off and topping clips.
  Every clip after the first gets a frame of the previous clip's food as an extra image
  reference, the prompt states the food's exact shape ("thin smashed beef covering the whole
  tortilla, not a patty"), and QA compares the food shape across clips before delivery.

- Account ranking (85 reels, read 2026-11-01, median 3,636 views; `content-studio/plan-week-2026-11-02.md`): hooks that
  state a food-science rule or "X is the mistake" with a number (Hollandaise Splits Above 65°C, Macarons Bake at 150°C
  Not 180°C, The Butter Between the Layers Is the Mistake) = 28 reels, median 1.6x and 8.7 s, against 0.9x and 7.8 s.
  Question hooks since October sit at 0.3-0.8x (only a real controversy worked: shawarma 3.3x). hookscore rates the
  winning lines 40-65: on this account the evidence outranks the scorer. Carousels reach followers only (116-271).
  Owner's call (2026-11-01): plan week by week on tested evidence only.

## The template (fill the [brackets] for any recipe; 12 s; Seedance 2.5, 1080p, 9:16)
```
A hyper-dynamic cinematic cooking video for [RECIPE NAME], exactly 12 seconds, cut like a trailer. Every shot is 0.5 to 1.5 seconds long, hard cuts on the beat, no shot lingers, relentless forward momentum. A high-impact PUNCH moment lands at 0s, 3s, 6s and 9s, each one as strong as the opening.

CHARACTER: the man in the reference image (@Image1) is the chef, exactly his face: Middle Eastern man, early 30s, thick mustache no beard, brown aviator glasses, thin gold chain, white t-shirt under a black apron with brown leather suspenders, black nitrile gloves. His face only ever appears in motion, never in a still shot.

RECIPE (follow exactly, every step once, in this order, nothing added):
[PASTE THE BOOK PAGE VERBATIM: title, INGREDIENTS, METHOD, CHEF'S NOTE. Do not write "from the book".]

0.0-1.0s PUNCH 1: [most violent first action of the recipe: slam / smash / drop / crack]. The camera shakes on impact.
1.0-3.0s: [next 1-2 recipe steps, fast cuts]
3.0-4.0s PUNCH 2: Extreme macro. [biggest visual transformation: oil explosion / bubbling / melt / puff], debris or oil flying toward the lens.
4.0-6.0s: [next recipe steps, fast cuts], the chef's face sharp behind the motion.
6.0-7.0s PUNCH 3: [key move: flip / toss / pour / reveal], whip-pan into it.
7.0-9.0s: [final assembly steps, fast cuts]
9.0-10.0s PUNCH 4: Extreme close-up near the lens: [loudest texture moment: crunch / snap / tear / cheese pull].
10.0-11.2s: The chef takes one big real bite, the food clearly missing a bite.
11.2-12.0s: The chef grabs [the first ingredient of PUNCH 1] again and lifts it high, ready to slam, the motion continuing into the opening shot so the video loops. No cut to black.

VISUAL STYLE: high contrast, dark black kitchen falling to pure black, hard warm tungsten key light 2700 K raking from camera left, deep shadows, macro on textures, heavy motion blur on every fast movement, handheld shake on every impact, natural colours.

SOUND: heavy bass hit on every PUNCH, real cooking sounds on every action, one loud crisp crunch as the loudest moment. No music, no voice.

AVOID: cut to black, fade out, ending on a still, slow pacing, shots longer than 1.5 seconds, a still shot of the face, gentle placing, pork, bacon, alcohol, packaging, logos, text, extra fingers, deformed hands, distorted face.
```
Attach the user's face photo as Image 1. Price (live quote 2026-10-15): 12 s 1080p = 192 credits, 12 s 720p = 84 (confirm with get_cost).
Ready prompts live in `content-studio/prompts/` (Big Mac smash tacos, baked feta pasta).

## On-video texts (added in editing, after seeing the real footage)
**No box anywhere and no recipe-name label** (the user saw a skip spike when the name
appeared twice). Big white Arabic line with a dark outline and soft shadow, one key word in
gold (`<b>`), a small English line under it, slightly below centre. The recipe name may
appear once at most (in the hook), never as a separate label.

Structure: Hook -> Question/Delay 1 -> Rehook -> Question/Delay 2 -> Answer. The hook asks
a question that only the last shot answers; a new text lands every 3 s on a PUNCH.

| time | beat | text | length |
|---|---|---|---|
| 0.3-2.8 s | Hook | a question the ending answers (e.g. «برغر ولا تاكو؟») | 3 words |
| 3.0-5.8 s | Question/Delay 1 | keep it open (e.g. «لسا ما خلصنا 👀») | 2-3 words |
| 6.0-8.8 s | Rehook | the key move (e.g. «هون السر») | 2-3 words |
| 9.0-10.4 s | Question/Delay 2 | e.g. «اسمع الصوت 🔊» | 2-3 words |
| 10.5-12 s | Answer + CTA | the answer, small line «اكتب «…»» | 2-4 words |

The share ask lives in the first caption line and the pinned comment, not on the video.
Generation stays on Seedance 2.5 with the template above (Wan and Genjutsu did not match it).

Text size and position (updated 2026-11-01, second read): the winners' own captions lead (format A above): one small
line, ~42-48 px, white, thin dark stroke, no box, on the cook's black apron in the middle of the frame. The rules
below (safe box, darkest band, overlay box check, phone check) still apply as checks; the 58 px top position came
from the kibbeh reel (0.3x) and is not tested.
Earlier rule, kept for hands-only shots: decided by the skills and a measurement, never by taste (owner, 2026-11-01).
- From ig-reel: every card inside the safe box (nothing above y 230 or below y 1440 of 1080x1920, the right 230 px
  clear), the hook up at frame 1, never where the caption sits (the bottom), 6 words or fewer per card.
- Position: the top of the safe box, card block starting at y 300 (y 230-270 is still covered on some phones),
  centred on x 540 so every line stays inside x 230-850. Kibbeh Nests measurement (luma under the text, lower is
  darker and easier to read): top y 300-480 = 47, middle y 640-850 = 89, bottom y 1060-1240 = 100 (10 of 21 half
  seconds over 100); the middle and the bottom covered the food and the reveal, the bottom also sat on the like and
  comment buttons. Food is shot in the middle and lower half, so the top is the free, dark band.
- Size: Arabic Tajawal 800 at 58 px, 10 px black stroke, dark glow (0 0 22px #000e, 0 0 44px #000d, 0 6px 18px #000e),
  line height 1.15, the key word in gold; English line 30 px, 6 px stroke. 58 px is the largest size at which a
  6-word card on 2 lines fits the 620 px safe width (Kibbeh Nests: «نفس الوصفة… / بس مش نفس الشكل» = 612 px);
  on a phone it reads at about 21 px, above the 32 px-at-1080 minimum of ig-carousel, and the block is about 200 px,
  10% of the frame. Never above 58 (it covers the food), never under 50; if a card is wider than x 230-850, shorten
  it, do not shrink it. Spec: `content-studio/edits/kibbeh-nests-cards.json`.
- Every reel: measure the three bands with prepublish.py (`--band 300 480`, `640 850`, `1060 1240`) on the no-text
  cut. Keep the top unless its luma is over 100 or a card there covers the action; then use the darkest band that
  leaves the action visible, never below y 1240. Check each overlay's box (`convert ov.png -alpha extract
  -threshold 8% -format %@ info:`) stays inside x 230-850, y 230-1440, and every card on a 390 px phone frame over
  its real background; if it is not readable at a glance, it is not done.
Time every text to the generated shots, never to the prompt timecodes. Cut any shot that
breaks the book recipe, shows logos or misspelt packaging, or invents food.
Renderer: `content-studio/overlay.mjs`. ffmpeg: `python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"`.
Loudness about -14 to -16 LUFS.

## Pre-publish check (every video, no exceptions)
The owner loses posts and days when a flaw is found after posting. Nothing is delivered until all
three parts pass, and the delivery message shows the result table.
1. **Prompt** (before generation): the reels-director template or the reference-video format;
   recipe pasted (book page, or the reference recipe the owner approved); exact food shape, size and
   count written into every shot; AVOID lists the wrong shapes; an escalation map with something new
   every second; the payoff only as a flash of 1.5 s or less at the start, the full payoff at the end.
2. **Text**: read `content-studio/hook-log.md` first. Hook and rehook use different formulas, neither
   used in the last 3 reels, and no card phrase or pattern from the last 5 reels (the owner finds the
   same hook every time boring). Then the ig-reel loop (3 hooks, 3 formulas, hookscore, classifier); every card 6 words or fewer
   and 85+; size and position by "Text size and position" above (58 px, top of the safe box from y 300,
   the three-band measurement, the overlay box check, the 390 px phone check); the food must stay uncovered.
3. **Video**: run `python3 content-studio/prepublish.py final.mp4 --source notext.mp4 --band y0 y1`.
   It flags, per half second, DEAD (no cut, little motion), LONG (shot over 2 s), QUIET (audio 10 dB
   under the median), SLOW and EARLY. Fix every flag in the whole reel, not only the first 3 s
   (speed a soft stretch up 1.25-1.6x, trim a dead tail, swap in sound from the same shot, lift a quiet
   generation with compression and a brick-wall limiter until it reads -14 LUFS), then
   re-run until it prints none. Re-check every card against its shot after any speed change: a card
   must sit on the moment it talks about (the pancake hook had to stay up until the float ended). Also: loudness -14 to -16 LUFS, loop seam checked frame by frame, no wrong food
   or bare hands in any frame.
Lesson (giant pancake): the generated clip was silent in its last 0.8 s; moving that second to the
start made the molten reveal silent at 0.5-1.0 s. The check caught it; the fix was the knife sound
from the same shot.

## The fixed strategy: the sweet potato motion (owner's call, 2026-10-28; every reel, every recipe)
Every coming video uses this same strategy, with no change between videos (owner, 2026-11-01): the sweet potato
motion, a new shape, zero errors against the book, cards by "Text size and position", the SEO caption and the
emotional purchase line below, the pre-generation and pre-publish checks.
One clear strategy that does not change from video to video (the point Raghad made). The reel that did 23K in 21.5 h
was read frame by frame; every new recipe takes only its MOTION, written step by step on Seedance 2.5 (no motion
reference), in a new shape, then the full pre-generation check. Never copy its techniques (plastic wrap, fork, tray):
each recipe keeps the book's own steps.
The motion, in order:
1. Flash, about 1 s: the pull-apart or reveal, moved from the end in the edit; the hook card sits on it.
2. Base prep: hands working in a mostly locked top-down or close 45° frame on a black surface or a white plate.
3. Base to paste, dough or batter in 0.5-1 s beats, a new action on every cut.
4. Filling or the recipe's key move in 0.5-1 s beats; the rehook sits here.
5. Exactly 3 pieces into the pan or oil, one turn each, one on the board, a knife cut, the pull-apart; the CTA sits
   here and the end runs into the flash.
Motion adjustments that raise watching and cut the skip rate (from the retention graph and the account data):
- Frame one already moving; the reveal flash is 1 s or less.
- 0.5-3.5 s is where the sweet potato lost viewers (90% -> 57%) on calm raw steps: put the most violent version of
  the base step there (a slam, an oil spit, a pour), never a still or calm raw shot.
- A new action on every cut, 0.5-1 s each; speed-ramp any action that takes longer.
- Hands always moving in frame; a short push-in on each reveal, a shake on each impact.
- Loud close-mic ASMR on every action; the loudest sound is the reveal (a crackle, a crunch, a tear).
- The end runs straight into the flash so the reel loops.
Generate 15 s with shots of 0.7-1.1 s (Seedance merges anything faster), then speed soft stretches 1.25-1.6x in the
edit to about 11-12 s. Cards: hook (2 lines, 6 words or fewer, a question the reveal answers), delay, rehook on the key
move, CTA «الوصفة بأول تعليق. / احفظها» (owner's call: same as the sweet potato). First one:
`content-studio/prompts/w1-kibbeh-nests-sp.txt`.

## Engagement round before posting (owner's call, 2026-11-01; every reel)
The problem was the audience, not the content. Same as the sweet potato: the round runs BEFORE the post, never
only after it. 30 minutes before posting (22:30), on each target account's newest reel: like, save, one specific
comment of 4+ words about their dish (no "nice", no emoji-only, no links, never the book). Target accounts are
medium food accounts in the countries we want to reach; current list: `content-studio/engage-qatar-uae.md`
(5 Qatar, 5 UAE). After 24 h log the Audience tab countries (Qatar and UAE %) next to the other numbers, so the
effect of the round is measured, not assumed.

## Caption and title SEO (claude-seo skill, owner's call 2026-11-01; every reel)
Rules taken from the claude-seo pack (seo-page, seo-content, seo-sxo, seo-geo), applied to the caption:
1. Keyword from real search, not a guess: the Google Trends picks (`content-studio/search-picks.md`) and one SERP
   check per language (seo-sxo), e.g. "fried kibbeh balls" / «طريقة عمل الكبة المقلية».
2. Title = the caption's first line: primary keyword first, 50-60 characters (seo-page title rule), then the new
   shape as the hook, e.g. "Fried Kibbeh Balls Recipe, shaped like crispy nests 👀" (53). The share ask is line 2.
   The Arabic block opens the same way with the Arabic keyword. `Recipe | Hook | Arabic hook` stays as the file label.
3. Answer-first, entity-clear body (seo-content, seo-geo): one sentence that says what the dish is and what it is
   made of in the book's words, then the one new move, then "Full recipe in the first comment".
4. Primary keyword in the first 100 words of each language, 2-3 natural variations (kibbeh balls, fried kibbeh;
   كبة مقلية), density about 3% or less, no stuffing; hashtags 3-5 = the keyword and its variants in both languages
   plus #halalrecipes.
5. The caption never restates the title and never closes on a stock CTA (seo-page): it closes on the emotional
   purchase line (rule 7: no price; home, family, the table), then the hashtags. No em dashes.
6. Every fact matches the book (Kibbeh Nests: "lamb or beef", not "lamb").
Example: `content-studio/week1/kibbeh-nests-caption.txt`.

## Every video: cookcut, 30 seconds, action (owner's call, 2026-11-02; replaces format A's length and pacing)
This is settled. Every reel is written with the cookcut skill as one 30 s Seedance 2.5 action commercial:
- 16-20 shots, omni_reference, @Image1 = his face.
- The recipe word for word from the book.
- His identity and his dark walnut kitchen.
- The shape is the only change.
Template: `content-studio/prompts/w2-dubai-pistachios-30s.txt`, with the same section order every time and the book
step -> shot table and the pre-generation check in the header.
Kept from the winners' files, inside the cookcut pace:
- His face in a medium shot at frame one, already doing the first step, and again every 8-10 s.
- The money shot as a slow-motion macro, the loudest sound.
- The cook with the result at the end: his eyes on the food, no host presenting.
- Small apron captions, added in the edit.
Price (get_cost, 2026-11-02):
- 1080p: 480 credits.
- 720p: 210 credits.
- 480p draft: 90 credits; it can be finalized at 1080p within 7 days.
Prompt length: under about 10,000 characters. The first 30 s draft was 13,294 and was cut to 9,589 with no rule dropped;
Kibbeh Nests ran at 6,950.
Untested on this account: the 30 s length and the cookcut pace. The Dubai reel's 48 h read measures them against the
decision rule in the week plan.
Format B (Genjutsu motion transfer) is only for tests with a viral reference (the pasta, 2026-11-02).
Hooks (owner, 2026-11-03): every reel gets a new hook formula, by the hook-log rules. It comes only from tested
evidence:
- the account's own winners (the Crinkle Cake mistake shape, the mistake/science-rule family);
- a documented viral reel of the same dish;
- reels the owner sends from strong accounts, ranked by the ig-viral outlier multiple (3x or more).
Instagram and YouTube are closed to this session, so fresh reels from other accounts come from the owner as links or
screenshots. Cards, title and caption for each reel are saved with it, e.g.
`content-studio/prompts/w2-dubai-pistachios-cards.txt` and `content-studio/week2/dubai-pistachios-caption.txt`.

## Tested video formats (read from the winners' own files, 2026-11-01; this outranks every untested style)
Measured on the reels themselves (src/assets/videos/*.mp4 and the API files): cuts per second, shot length, frames.
A. CHEF FORMAT, 6 of the top 8 (Eggs Benedict 6.4x, Sushi Taco 4.0x, Chicken 4.2x, Macarons 4.5x, Sushi Burger 2.9x,
   One-second Chips 73% average watch): 0.24-0.4 cuts per second, shots 2-4 s, 13-15 s long, 4-7 shots.
   - Frame one: the cook in a medium shot facing the camera, face and aviators visible, already doing the hero
     technique (painting sauce on a white plate, pressing, slicing). No hands-only opening.
   - Then a top-down or close step, then the money shot as a slow-motion macro (the sauce pour, the puff in the oil,
     the pull), then the cook presents the finished food to the camera (or one bite).
   - Dark background, dark walnut wood counter or board, warm key light from one side.
   - Text: one small line, about 42-48 px at 1080 wide, white, no box, sitting on the black apron in the middle of the
     frame (hollandaise y ~1150, chips y ~700-780), EN or EN / AR; 2-3 lines in the whole reel (hook rule, the number,
     the end ask).
B. MOTION TRANSFER, 1 of the top 8 (sweet potato 9.8x): the motion of a competitor reel that already went viral
   (Genjutsu), fast cuts copied from it. Use only when the owner has such a reference reel.
Not tested or failed: Seedance fast-cut hands-only ASMR written from scratch (kibbeh 0.3x, 1.8 cuts/s), very fast
montage (sushi speed run 0.4x, 5.4 cuts/s), one long static shot (book promo 0.5x, nashville 0.5x).
Superseded on 2026-11-02 by the cookcut 30 s rule above. Format A's face-first opening, slow-motion money shot and
apron captions live on inside it.

## Action-movie grammar (owner's call 2026-11-01; untested, so only inside format A's pacing)
Superseded on 2026-11-02: the full cookcut skill at 30 s (see "Every video: cookcut, 30 seconds, action").
Superseded on pacing by the tested format A (4-7 shots of 2-4 s, not 0.7-1.1 s cuts). Still used for: one readable
camera path per shot, physical realism, diegetic sound, one slow-motion accent on the money shot. Taken from the cookcut skill (action commercial director), cut down to 15 s:
- One readable camera path per shot, written as start -> path -> end -> action revealed (low object-level slam, overhead
  drop with a pour, whip-pan to the hero, worksurface skim, short arc, fast push-in, reverse pull-back). 2-3 big moves
  per reel, never the same one twice.
- Every cut changes at least two of: scale, height or angle, camera move, speed. Scale rhythm across the 15 shots:
  2 true 90° top-downs, 2 ultra-macros, 2 low object-level shots, 2 medium hero shots (face only in motion), the rest close.
- Speed contrast: real-time impacts, speed ramps on pours and drops, compressed time for melting, toasting, setting,
  exactly one slow-motion accent: the reveal.
- 3-4 spectacle peaks with breaths between them; the last is the reveal. No vessel in more than 2 shots in a row.
- Sound is only real sound from what is on screen (no music, no whooshes, no booms, no risers). Near silence for a
  beat before the reveal, then the reveal is the loudest sound of the video, described exactly (e.g. "a sharp, dry,
  high crack of a thick chocolate shell right at the microphone, then the crisp crackle of toasted kataifi").
- Guardrails for zero errors: one camera move and at most 2 actions per shot, the food lock and colours unchanged,
  no move that needs the model to invent geometry (no passing through objects), hands always gloved.
Test: the Dubai reel changes only this (the engagement round before posting stays as it is), so its numbers measure
the action grammar against the sweet potato and kibbeh results.

## New shapes (owner's call, 2026-10-27)
Every recipe gets a shape nobody has made, the way the Crinkle Cake (153x) looked like nothing else, with its dry
crackling sound as the loudest moment. Keep the book's ingredients and the other steps; change only the shaping
step, say so in the prompt header, and show the changed step in the pinned recipe so the owner can add it to the
book. The new shape must be physically makeable and pass the physics check.
Zero errors (owner, 2026-11-01): everything on screen matches the book's description, every ingredient, colour,
texture, step and count; the ONLY thing that differs is the shape, and it is there to win attention at the reveal at
the end. In the prompt, write the colour and texture of every component in every shot it appears in (generation-log
check 12). A generation that changes a colour or turns one food into another (Kibbeh Nests: cream dough shell,
kataifi-like strands) fails the video check; it is reported to the owner before any edit, never edited around silently. First one: Kibbeh Nests
(`content-studio/prompts/w1-kibbeh-nests.txt`).

## Before every generation (owner's rule, 2026-10-27; also when the owner generates himself)
Nothing is generated, and no prompt is handed over for generation, until this check is done and its table is
shown to the owner:
1. Read `content-studio/generation-log.md` and `content-studio/hook-log.md` first. Every check line in the
   generation log applies to the new prompt.
2. Re-read the book page; table "book step -> shot"; every step once, in order, nothing added.
3. Food lock: shape, size, count, colour and texture in every shot; AVOID lists the wrong shapes and the foods it
   could turn into (e.g. kataifi, dough, noodles); counts match between the lock and the shots; fillings stay where
   the book puts them; only the shaping step differs from the book.
4. Physics a viewer would call out (hot trays, leaking fillings, impossible moves), at most ~2 actions per
   second of a shot, the loop seam shows the same state as frame one.
5. Halal, including extracts and sauces; identity block; no text, logos or packaging in the prompt.
6. Instagram skills: ig-reel shape (motion in frame one, hook done by 3 s, no beat over 4 s, payoff in the last
   3 s, the last card echoes a word of the hook), hook loop with hookscore 85+ on every card, hook-log rules.
7. Exact price from `generate_video` with `get_cost: true` for the model, duration and resolution the owner chose.

## After every generation (success or errors)
Add a row to `content-studio/generation-log.md`: what came out right, every error with its time and frame, the
cause, and the prompt change that prevents it; a new kind of error also becomes a new check line there. After
24 h add the numbers (skip, average watch, watched to the end, shares and saves per 1,000 reach) against the
test thresholds in `content-studio/plan-30-days.md`.

## Account audit (2026-10-27, Instagram Insights via Composio)
Last 29 days: 450K reach, +438 follows (43 unfollows), 5,613 profile views, 43 link clicks: about 1 follow per
1,000 reached, 7.8% of profile visitors follow, 0.8% tap the link. That is a profile problem, not a hook problem.
Last 40 reels: top 10 skip 32% / 9.2 s, bottom 10 skip 52% / 5.9 s. Views halved from September to late October
while posting daily, so volume is not the lever. Arab dishes and trend desserts are the outliers (Crinkle 153x,
Mansaf 15x, Shawarma 3.6x; tanghulu best sends). The 30-day plan built on this is in content-studio/plan-30-days.md.

## Target audience (owner's call, 2026-10-21)
The buyer is the home cook, mostly women. Composio insights (this_month, 2026-10-21): reached
audience 76% women of known gender (F 176,976 / M 54,387), engaged 79% women, ages 25-34 then
18-24, top countries SA then JO, IQ, EG, AE. This month is dominated by the Crinkle Cake reach,
so still ask for each reel's Audience tab (gender, non-followers) after 24 h and log the women %.
Per-reach shares and saves of normal reels match or beat the Crinkle Cake (e.g. Apple Tart 0.81%
shares/reach vs 0.28%); the gap is distribution, and outliers had skip rate at or under ~33%.
Owner's call (2026-10-27): the book is international, not an Arab book, and the model is a competitor who sells
his own cookbook (Jalal Sam: one promise, the recipe count, "cookbook out now"). About half of the Arab audience
is fluent in English and the buyers come from that half. Profile and name field in English, international
positioning; Arab dishes stay in the mix because they performed, not as the identity. Cards: a big Arabic line
with a small English line under it; captions English first.

## Every delivered video comes with the full package
Download link, then in this order: SEO title, recipe verbatim from the book (English and the
Arabic edition), 3-5 hashtags, pinned comment (the recipe), ready replies for the first hour,
posting time, and the exact numbers to send back after 24 h (skip rate, average watch, shares,
saves, follows, Audience tab gender and non-follower %).

## Protocol after the edit («البروتوكول»)
Title `Recipe | Hook | Arabic hook`, English caption, Arabic caption with 3-5 hashtags, pinned
comment that asks for a mention or the keyword. Share line is also the first caption line.

## When the user says «نزل»
1. `automations_triggers_list_instagram_media` (bot `01a076fc-08cc-7020-ab74-a85f8bee06a6`),
   take the newest post.
2. `automations_quick_setup` template `checkSubscription`, trigger `commentContains`,
   unique keywords (no case duplicates), the book page in the DM, book button
   `https://ediblecodex.com/shop/the-edible-codex`, extra message after 1 day, autoAnswers.
3. Fix quick-setup quirks: remove `<code>` from the extra message with
   `automations_messages_update`, add «شوف الكتاب 📕» on it and
   «الصلصات مجاناً 🎁» `https://whop.com/the-edible-codex-five-sauces` on the recipe message.
4. Tell the user to test with a comment from another account.
