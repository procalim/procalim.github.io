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

Time every text to the generated shots, never to the prompt timecodes. Cut any shot that
breaks the book recipe, shows logos or misspelt packaging, or invents food.
Renderer: `content-studio/overlay.mjs`. ffmpeg: `python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"`.
Loudness about -14 to -16 LUFS.

## Target audience (owner's call, 2026-10-21)
The buyer is the home cook, mostly women. Composio insights (this_month, 2026-10-21): reached
audience 76% women of known gender (F 176,976 / M 54,387), engaged 79% women, ages 25-34 then
18-24, top countries SA then JO, IQ, EG, AE. This month is dominated by the Crinkle Cake reach,
so still ask for each reel's Audience tab (gender, non-followers) after 24 h and log the women %.
Per-reach shares and saves of normal reels match or beat the Crinkle Cake (e.g. Apple Tart 0.81%
shares/reach vs 0.28%); the gap is distribution, and outliers had skip rate at or under ~33%.

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
