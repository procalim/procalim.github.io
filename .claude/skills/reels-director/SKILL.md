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
4. **Identity:** his permanent kitchen (`content-studio/brand/kitchen.md`, photo `brand/kitchen.jpg`, sent as
   @Image2), 2700 K tungsten light, black nitrile gloves, white t-shirt, black apron with brown leather straps,
   thin gold chain, the aviators of the element photo (black lenses).
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

## THE WORKFLOW, STEP BY STEP (owner's call, 2026-11-10; read this first, every request)
The owner's words: every recipe from the first step to the last, everything shown, professional, cookcut, the same
strategy every time; no boring second or fraction of a second, never too little movement; we sell recipes, so the
food is always visible. Every request below runs through all the skills, guides and checks we have, step by step,
at the standard of an editor and director with 30 years in production.

1. **Last results first.** Read the last reel's numbers and analysis (generation-log.md results, hook-log.md, the
   owner's 24 h and 7-day insights). Write the "fix from the last results" table at the top of the new prompt
   file. Example: Dubai pistachios (owner, 2026-11-10): views good, engagement weak (0.6 shares and 1.7 saves per
   1K at 18 h), so the next reel needs a reason to save and send: every step readable, the recipe promise kept.
2. **Case study.** Read `content-studio/research/chef-transitions.md` (how cooking creators make a recipe flow) and
   pick 4-6 match pairs for this recipe's own tools.
3. **Prompt.** cookcut + the pistachio shot grammar + the permanent kitchen (@Image2) + his face (@Image1); every
   recipe step from first to last on screen, in order, his gloved hands doing it; smooth gimbal moves with hard
   impacts; something new every second, no still or empty fraction of a second; settings listed in the file
   (bitrate_mode high). Then the pre-generation check (below) and the exact price.
4. **Generate only on «ولد».** Then the re-read frame by frame (After every generation); errors reported first.
5. **Professional edit** (Higgsfield sandbox, 0 credits), like top food creators: cut on motion peaks and match
   frames, on-screen hits laid on the cuts, punch-in zooms on the beats, speed ramps only on calm stretches, text
   that pops in and never covers the food, a gold label or ring on the hero food where it helps, the money shot the
   loudest at -14 LUFS. Export 1080x1920. prepublish.py must print no DEAD and no SLOW anywhere (the owner's "no
   boring fraction of a second"), then the 390 px phone check. Render each segment to its own file, then join
   them: a cold open taken from the end of the take froze a one-pass render for 14 s (Pan Chocolate Cake). Check
   the last frame of every segment for a stray frame of the next shot (input seek lands about 2 frames late).
   Export at the source's quality, never below it (owner, 2026-11-12: «الفيديو مش بنفس الجودة»): a 4K 10-bit take
   stays 2160x3840 and is encoded once to HEVC Main 10 with BT.709 tags (hvc1); a 1080p take stays 1080x1920.
   Compare the export's resolution, bit depth, bitrate and colour tags with the source's before delivery.
6. **The package.** Hook text and on-video cards (hook-log rules, hookscore), SEO caption, pinned comment with the
   keyword, the engagement round and posting time, and 4-5 story frames (owner, 2026-11-11): images generated for
   the stories, not necessarily cut from the reel, in the ig-story shape (open with his face, 2 middle frames, the
   ask sticker at frame 4, the close with a countdown, then share the reel with one line). Text rendered with
   overlay.mjs inside y 250-1600; stickers added in the app. Unlimited image generations work only on higgsfield.ai,
   not through the MCP: generating here costs credits (Nano Banana Pro 2 a frame), on the site the prompts are
   free. Example: content-studio/week3/honey-cake-stories.md.
7. **Results back.** The owner sends the numbers at 24 h and 7 days; log them; compare at the same age; the
   analysis feeds step 1 of the next recipe.

On request, the same standard: hook text or a video hook; a viral content strategy for the next 30 days (the
"Go Viral With Claude" guide below); an analysis of results; a prompt with fewer errors; a professional edit and
export; the check. One step at a time, each step shown before the next.

What a prompt can and cannot promise (say it plainly, never promise zero errors): the checks prove the TEXT is right
(every step, order, food lock, identity, settings). The model's drawing is not guaranteed: every generation in
generation-log.md had at least one error, and Seedance follows a shot map only roughly. The protection is the
frame-by-frame read before any edit, a 60-credit draft when the owner wants to see the take before 320, and the
edit, which can re-cut, re-time and re-sound but cannot fix a wrong food.

### The "Go Viral With Claude" guide (Maverick AI, October 2026; the owner's PDF), in our terms
1. Strategist brief: niche, audience, why people follow, formats, tone, filming limits; ask up to 5 questions.
2. Decode the niche: 5-10 real winners (outliers against the creator's usual numbers), with hooks and transcripts;
   say when a link or video cannot be read.
3. Export the Instagram data (Meta Business Suite, one row per video); audit it before ranking.
4. Rank by follows and by follows per 1,000 views (follows / views x 1000); compare posts at the same age.
5. Study our winners next to our flops.
6. Voice: write in his voice (this skill and the hook log).
7. 30 days of scripts with a posting schedule; film a batch; log script, pattern, URL, dates, views, follows.
8. Review each batch: 3 patterns to continue, up to 3 to adapt, 1 new experiment; never drop a topic for one weak
   video: check the opening, the demo and the timing first. "A great hook, then nothing": make the demo deliver
   what the opening promised.
Bonus prompts: 50 hooks by type, one video into ten posts, trend-jack in our voice, 5 repeatable series, rewrite a
stiff script. Missing follows per video: analyse views, reach, saves, shares and watch time, never estimate follows.

## What the data proved (keep using)
- Virality Predictor (Higgsfield) does not rank this account's reels: Crinkle Cake 142.7x scored 44, sweet potato 9.8x
  42, kibbeh nests 0.3x 43 (`content-studio/research/virality-predictor-test.md`). Never use its score to judge or pick a reel.
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

- No Secrets ad film (v3, posted as a trial to non-followers, 2026-11-12): retention about 90% at 1 s, 22% at 1.9 s,
  11% from 5 s to the end (19 s); comment rate 2.6% ("higher"), reposts 0; Reels tab 90%. The cliff is exactly the
  tablet close-up with the book cover and «٣٦١ وصفة؟!» (0.7-1.7 s): the product in second 1 reads as an ad and
  three viewers in four leave; the crinkle cake first showed at 8.7 s. The 11% who stayed watched to the end and
  commented. Rule: in an organic reel the book or any product never shows before the food; open on the food or the
  reaction, the cover only at the end.
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

## No free recipes (owner's call, 2026-11-05; every reel)
The keyword never gets the recipe. It gets the ig-dm keyword delivery: the book link first
(https://ediblecodex.com/shop/the-edible-codex), one line on what is inside (the dish step by step, 360 more halal
recipes, Arabic and English, instant download, 30-day refund), one question they can answer in four words. No price.
Every promise matches what is sent: the card says only the keyword («اكتب «دبي» 👇»), and the caption and pinned
comment say "the link to the full recipe in my book", never "I'll send you the recipe". No recipe in the pinned
comment. Example: `content-studio/week2/dubai-pistachios-dm-reply.txt`.

## Engagement round before posting (owner's call, 2026-11-01; every reel)
The problem was the audience, not the content. Same as the sweet potato: the round runs BEFORE the post, never
only after it. 20 minutes right before posting (owner, 2026-11-03, ig-plan's 20-minute round), on each target
account's newest reel: like, save, one specific
comment of 4+ words about their dish (no "nice", no emoji-only, no links, never the book). Target accounts are
medium food accounts in the countries we want to reach; current list: `content-studio/engage-qatar-uae.md`
(5 Qatar, 5 UAE). After 24 h log the Audience tab countries (Qatar and UAE %) next to the other numbers, so the
effect of the round is measured, not assumed.
ig-plan, the rest of the routine:
- Every day, posting or not: 20 minutes of engagement and 3-5 story frames.
- The list shape: 5 reach, 3 peers and 2 buyers (people who could buy the book; comment for weeks, never pitch).
- Comments follow the ig-comment types.
- On reel days, a story teaser with a countdown sticker before the post.
- Right after the post: the pinned comment with the keyword.
- In the first hour, reply to every comment by ig-reply buckets: the keyword gets the recipe by hand; a question
  many people have becomes a video reply.
- At 24 h: the numbers. At 48 h: the plan's decision rule.
- Once a fortnight: an Offer in stories (the book, said plainly).

## Caption and title SEO (claude-seo skill, owner's call 2026-11-01; every reel)
Rules taken from the claude-seo pack (seo-page, seo-content, seo-sxo, seo-geo), applied to the caption:
1. Keyword from real search, not a guess: the Google Trends picks (`content-studio/search-picks.md`) and one SERP
   check per language (seo-sxo), e.g. "fried kibbeh balls" / «طريقة عمل الكبة المقلية».
2. Title = the caption's first line: primary keyword first, 50-60 characters (seo-page title rule), then the new
   shape as the hook, e.g. "Fried Kibbeh Balls Recipe, shaped like crispy nests 👀" (53). The share ask is line 2.
   The Arabic block opens the same way with the Arabic keyword. `Recipe | Hook | Arabic hook` stays as the file label.
3. Answer-first, entity-clear body (seo-content, seo-geo): one sentence that says what the dish is and what it is
   made of in the book's words, then the one new move, then the keyword line ("Comment DUBAI and I'll send you the
   link to the full recipe in my book").
4. Primary keyword in the first 100 words of each language, 2-3 natural variations (kibbeh balls, fried kibbeh;
   كبة مقلية), density about 3% or less, no stuffing; hashtags 3-5 = the keyword and its variants in both languages
   plus #halalrecipes.
5. The caption never restates the title and never closes on a stock CTA (seo-page): it closes on the emotional
   purchase line (rule 7: no price; home, family, the table), then the hashtags. No em dashes.
6. Every fact matches the book (Kibbeh Nests: "lamb or beef", not "lamb").
Example: `content-studio/week1/kibbeh-nests-caption.txt`.

## The loop for the next 30 days (owner's call, 2026-11-06; every reel, unchanged between reels)
One strategy, the same every time (Raghad's point, and the "Go Viral With Claude" guide). Only the seconds get better.
1. Prompt: the pistachio strategy (next section) plus the "seconds improved" table from the last reel's drop.
2. Generate only on «ولد», then the full check frame by frame (generation-log checks), errors reported first.
3. Professional edit on Higgsfield's sandbox, sounds and animation:
   - Sounds: the clip's own sounds cleaned and layered; the opening and the money shot lifted, the money shot the
     loudest; a beat of near silence before it; -14 to -16 LUFS, peak about -1 dBFS; no music.
   - Animation: the text pops in (scale and fade, about 0.15 s), punch-in zooms on the beats, speed ramps on the
     calm stretches.
   - Then prepublish.py until it prints none (or only the money shot, with the reason), the measured dark bands,
     and the 390 px phone check.
   - Delivery: an uploaded Higgsfield link, plus the story frames from the same clip.
4. Post with the routine:
   - 20 minutes of engagement, the story teaser with a countdown;
   - post at 22:30;
   - the pinned keyword comment, replies in the first hour, the DM with the book link.
5. The owner sends the insights at 24 h, and at 7 days: overview, "what impacts your views", the retention graph,
   sources, audience. Read the drop second by second against the edit's timeline (which shot was on screen at each
   fall), log it in generation-log.md, and write the "seconds improved" table for the next reel.
6. Weekly review (the guide's prompt 8):
   - rank by follows and by follows per 1,000 views, next to shares and saves per 1K;
   - compare every post at the same age;
   - pick 3 patterns to continue, up to 3 to adapt, and 1 new experiment.

## The pistachio strategy, what carries over (owner's correction, 2026-11-06)
- Carried over: the shot grammar of the Dubai pistachio prompt and its sections:
  - his face in a medium shot at frame one, already working, with a fast push-in;
  - a 45° close, true 90° top-downs, a low angle;
  - an extreme close-up macro in slow motion as the money shot, written as the loudest sound;
  - his face with the result brought toward the lens at the end.
- Improved every reel: the seconds, from the last reel's retention curve and prepublish flags. Example: loud motion
  and sound in 0-1 s, a short punchy shot in the 2-5 s drop zone, 2-3 actions per top-down, a 0.3 s beat before the
  money shot, a moving ending. The prompt header carries the "seconds improved" table.
- NOT carried over: the tools and the method. Every recipe keeps its own method, tools and shot count (an oven
  dish stays in the oven); never force a skillet, a mold or a snap onto a recipe that doesn't have one.
- Example: `content-studio/prompts/w3-honey-cake-fettuccine-20s.txt`.

## Length and topics (owner's call, 2026-11-06; updates the next section)
- Length: every reel is 20 seconds now (cookcut, one clip). Template: `content-studio/prompts/w3-smashed-broccoli-20s.txt`.
- Settings on every Seedance generation (owner, 2026-11-10): bitrate_mode high (same price as standard on the
  2026-11-10 quote), and the prompt file lists every setting sent. Every recipe step on screen in order, smooth
  camera moves and action; prompts are written on the system, not around the last video's errors.
- Each reel's improvement:
  - the prompt checks (generation-log 1-14);
  - the Higgsfield edit: flags fixed, money-shot sound, animated pop-in text, measured cards.
- Topics:
  - the book first;
  - then recipes of our own invention in the sweet potato family (a familiar food with a smart twist people keep
    and send);
  - each invented recipe is saved to `content-studio/book-additions/` and the owner approves it before the prompt.
- Measuring (the "Go Viral With Claude" guide): follows per 1,000 views next to shares and saves per 1K, every
  post compared at the same age (24 h and 7 days); a weekly review picks 3 patterns to continue, up to 3 to adapt,
  1 new experiment.
- Week plan: `content-studio/plan-week-2026-11-07.md`.

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
Owner's decision (2026-11-12, replaces "copy the formula, never the video" for this plan): reels from @fiteat.rima's
outliers, her reel as the motion reference, the footage always new (his face, his kitchen, our plate), our recipe
wording, our hook and cover. Rules and inputs: `content-studio/plan-reference-account.md`.
Hooks (owner, 2026-11-03): every reel gets a new hook formula, by the hook-log rules. It comes only from tested
evidence:
- the account's own winners (the Crinkle Cake mistake shape, the mistake/science-rule family);
- a documented viral reel of the same dish;
- reels the owner sends from strong accounts, ranked by the ig-viral outlier multiple (3x or more).
Instagram and YouTube are closed to this session, so fresh reels from other accounts come from the owner as links or
screenshots. Cards, title and caption for each reel are saved with it, e.g.
`content-studio/prompts/w2-dubai-pistachios-cards.txt` and `content-studio/week2/dubai-pistachios-caption.txt`.

## Hooks: only tested formulas; cards in the middle (owner's call, 2026-11-11; every reel from now on)
Every hook comes from this bank of the account's own winners (read 2026-11-01, x the account median). Same strategy,
only a formula that already worked here, written for the new dish with the book's own number or note:
| Formula | Tested on this account | Shape for a new dish |
|---|---|---|
| X is the mistake | Crinkle Cake 142.7x "The Butter Between the Layers Is the Mistake"; Dubai rehook «الغلطة: كنافة فاتحة» | «الغلطة: …» with the book's step |
| Science rule with a number | Eggs Benedict 6.4x "Hollandaise Splits Above 65°C"; Macarons 4.5x "Bake at 150°C Not 180°C"; Chicken 4.2x "Turns to Rubber Past 74°C" | the dish + what happens past the book's number |
| Cause of a failure | Potato Rolls 4.5x "Rolls Crack Because the Dough Was Hot" | «… بتتكسر لأن …» |
| Superlative for the family cook | Sweet Potato 9.8x "The Only Way Your Kids Never Notice Spinach" | «الطريقة الوحيدة …» |
| Real controversy (rare) | Shawarma 3.3x «شاورما على سيخ؟ حرام ولا عبقرية» | only with a real debate |
Never: questions (0.3-0.8x since October), «ما حدا» lines (worn out), a hook that calls the viewer wrong (Honey Cake
v5). The rehook takes a second formula from the bank. hookscore is a floor check only.
Card position (owner, 2026-11-11): the text sits in the middle of the frame, centred on y 960 (band about y 860-1060),
on the apron or the calm middle, never over the hero food; this replaces the top band (y 300). Keep the safe width
x 230-850 and the 390 px phone check.
Next week (owner): re-cut the honey cake reel with a tested hook and the cards in the middle, then post it as the test.

## Honey Cake v5 read (2026-11-11, 1 h 17 min) and the owner's read of the hook
- 996 views, skip 48.8%, avg 7.90 s of 17.0 s, 0 shares, 0 saves; retention 82% at 1 s, 55% at 2 s, 32% at 5 s, then
  it held to 17% at the end: the cliff is the opening, the edit held.
- The hook «عينك غلطانة: ٠٪ باستا» scored 77.8 on hookscore and still sat on the cliff. Owner's read: telling a food
  viewer they are wrong makes them skip. Rule: no accusatory hooks; hookscore is a floor check, never the judge.
- Also on screen in 0-2 s: a calm medium shot holding an egg, then raw ingredients (same pattern as feta and mala).
  Next opening: a payoff flash of 1 s or less showing what the hook talks about, then the most violent first step.
- 13 h read (2026-11-12): 1,762 views (9th of the last 10, about half the 3,636 median), 1,212 viewers, skip 52.8%,
  avg 8.2 s, 0 shares, 2 saves, 1 repost, 1 follow, 96.1% non-followers, 81.8% Reels tab; retention about 83% at 1 s,
  57% at 2 s, 36% at 5 s, 20% at the end.
- Not the hook text alone. The edit broke three rules already in this skill: a text box in the first 2-3 s (the chips
  test: +11.7 points of skip); raw ingredients on screen for 0-5 s (eggs, yolks, whisking, flour), the opening that
  gave mala 53.1% and feta 51.4% skip with no accusing hook, the same as this reel's 52.8%; and a card about something
  not on screen («٠٪ باستا» over raw eggs, the pasta look first seen at 8.7 s). No payoff flash at the start either.
  One reel cannot split the share of each; the no-text Pan Chocolate Cake reel tests the text.
- Opening check before delivery (every reel): look at 0-3 s frame by frame. What the card or the flash promises is on
  screen; raw ingredients never hold more than about 1 s before 3 s (compress them or let the flash cover them).

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

Re-read the generated video before any edit (owner's call, 2026-11-08, from the Honey Cake Fettuccine on). Use the
Higgsfield sandbox: frames every 0.25 s for the first 4 s, then every 0.5 s.
1. First 3-4 s (the Kevin skit format):
   - the place is the warm golden living room, not a white or empty background;
   - his face and the black-lens sunglasses are visible;
   - the beats come in order: sink, bolt upright, the jar thrust into the lens;
   - no apron or gloves on the sofa.
2. The cut into his identity at about 3.6 s:
   - the kitchen is dark: black background, walnut, warm key light;
   - apron and gloves in every kitchen shot;
   - the same white t-shirt, gold chain and sunglasses.
   - If the video stays bright or white after the cut, that is a defect: report it before any edit.
3. Checks 1-14 of generation-log.md frame by frame: shapes, colours by object, count, order, physics, halal, and
   silence in the last second.
4. Sound: measure the loudest moment; it must be the money shot.
5. Write every weak point in generation-log.md with its time and frame, then tell the owner the errors first.
Then the professional edit on the Higgsfield sandbox, built with the Shorts Studio composition engine (no credits):
- Kevin's rhythm (`content-studio/research/veganer-wandel-format.md`): cut to 0.5-0.8 cuts per second, with speed
  ramps on the calm stretches.
- Motion graphics, never in the Seedance prompt:
  - the skit line in a white box at the top for 0-3.6 s;
  - text that pops in;
  - punch-in zooms on the beats;
  - a gold ring or label on the hero food where it helps.
- Sound: the clip's own sounds layered, the money shot the loudest, -14 LUFS.
- Then prepublish.py and the 390 px phone check.
- Virality Predictor is not a check (it does not rank this account's reels).

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
Download link, then in this order: SEO title, 3-5 hashtags, pinned comment (the keyword and the book link
promise), ready replies for the first hour,
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
