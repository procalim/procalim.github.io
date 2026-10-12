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
   own code block. Recipe count is always 361. Book price 9.99 USD, instant download,
   30-day refund.

## What the data proved (keep using)
- The best reel (rice paper chips, 73% avg watch) used the chips-style prompt below:
  face in motion, violent actions, cuts every 0.5-1.5 s, loop back to the start.
- Every reel with a **text box in the first 2-3 s** had a cliff at second 1-2. The same
  chips footage with a big hook box raised skip rate from 25.8% to 37.5%.
- Raw-ingredient openings and calm top-down AI footage dropped viewers at second 1-2.
- One single 18 s generation cannot follow a 37-cut reference; do not promise a 1:1 match.

## The template (fill the [brackets] for any recipe; 12 s; Seedance 2.5, 1080p, 9:16)
```
A hyper-dynamic cinematic cooking video for [RECIPE NAME], exactly 12 seconds, cut like a trailer. Every shot is 0.5 to 1.5 seconds long, hard cuts on the beat, no shot lingers, relentless forward momentum. A high-impact PUNCH moment lands at 0s, 3s, 6s and 9s, each one as strong as the opening.

CHARACTER: the man in the reference image (@Image1) is the chef, exactly his face: Middle Eastern man, early 30s, thick mustache no beard, brown aviator glasses, thin gold chain, white t-shirt under a black apron with brown leather suspenders, black nitrile gloves. His face only ever appears in motion, never in a still shot.

RECIPE (exact from the book, every step once, nothing added): [STEPS FROM THE BOOK PAGE, IN ORDER]

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
Attach the user's face photo as Image 1. Price: 12 s x 12 credits = 144 (confirm with get_cost).

## On-video texts (added in editing, after seeing the real footage)
Plain white bold text with shadow, small, slightly below centre, **no box**, Arabic line on
top and English under it, recipe name label under each text.

| time | text | length |
|---|---|---|
| 0.3-2.5 s | hook | 3 words |
| 3.0 s | rehook 1 (e.g. «شوف هلّق 👀») | 2-3 words |
| 6.0 s | share ask (e.g. «ابعته لصاحبك 😂») | 2-3 words |
| 9.0 s | rehook 2 (e.g. «اسمع 🔊») | 2-3 words |
| 10.5-12 s | keyword CTA «اكتب «…»» | 2-3 words |

Time every text to the generated shots, never to the prompt timecodes. Cut any shot that
breaks the book recipe, shows logos or misspelt packaging, or invents food.
Renderer: `content-studio/overlay.mjs`. ffmpeg: `python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"`.
Loudness about -14 to -16 LUFS.

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
   «الصلصات مجاناً 🎁» `https://whop.com/checkout/plan_yC2EH8kuwf8pi` on the recipe message.
4. Tell the user to test with a comment from another account.
