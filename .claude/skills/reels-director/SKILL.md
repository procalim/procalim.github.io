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
- Multi-clip generations (Katana plates, re-rolls) forget the food between clips: the taco
  beef was thin in plates A/B and a thick burger patty in the lid-off and topping clips.
  Every clip after the first gets a frame of the previous clip's food as an extra image
  reference, the prompt states the food's exact shape ("thin smashed beef covering the whole
  tortilla, not a patty"), and QA compares the food shape across clips before delivery.

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

Text position: test it on a frame with the Instagram UI zones drawn (top 14% y<270, bottom 35%
y>1248, right rail x>880 from y 1000). The top 230-270 band is still covered on some phones, so the
top card starts at y 300, centred; the right 230 px rule matters only beside the rail (y>1000).
Owner's call (2026-10-24): put the cards in the middle of the safe area, y ~720 (text centre ~y 750),
in the viewer's eye line, not at the top.
Readability (fettuccine lesson): in the middle the text sits on the food, often a light background.
Use the strong style there: Tajawal 800 at 64-66 px, black stroke 12 px, dark glow
(text-shadow 0 0 22px #000e, 0 0 44px #000d, 0 6px 18px #000e). Before delivery, check every card on
a frame scaled to phone width (390 px) over its real background; if it is not readable at a glance,
it is not done.
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
   and 85+; cards in the middle of the safe area, two lines if needed, the largest size that keeps
   x 227-853 (72 px Tajawal 800, 12 px stroke, dark glow); every card checked on a phone-width frame
   (390 px) over its real background.
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

## Before every generation (owner's rule, 2026-10-27; also when the owner generates himself)
Nothing is generated, and no prompt is handed over for generation, until this check is done and its table is
shown to the owner:
1. Read `content-studio/generation-log.md` and `content-studio/hook-log.md` first. Every check line in the
   generation log applies to the new prompt.
2. Re-read the book page; table "book step -> shot"; every step once, in order, nothing added.
3. Food lock: shape, size and count in every shot; AVOID lists the wrong shapes; counts match between the lock
   and the shots; fillings stay where the book puts them.
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
