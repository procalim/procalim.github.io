# The Hashbrown Crunchwrap: the take read and the Kevin-style edit (2026-11-23)
The owner: «الفيديو جاهز. اجا دورك هسه تعمل الايديتنج نفس الالماني، الهوك سلو موشن والزومينج والايديتنج».
Job 8790f4de: Seedance 2.5 Omni, 26 s, 4K (2160x3840), bitrate high, seed 971329; the element char_ahmet-salameh-codex
(fa420272); @Image1 the kitchen (325df734), @Image2 the crunchwrap (18dcc343), @Image3 the living room (a6a88ed7).

## The read (0.25 s sheets, scene cuts, the sound)
Cuts at 1.33, 2.38, 3.92, 4.67, 6.21, 7.00, 7.92, 8.67, 9.96, 11.13, 13.83, 14.96, 15.67, 16.67, 17.46, 17.50, 17.92,
19.13, 20.29, 21.88, 23.00, 25.33 s. Sound: -20.6 LUFS, the loudest the hashbrown landing (15.9 s), the knife (19.7 s)
and the skillet (17.6 s); quiet stretches at 1.0-1.7, 7.0-7.7 and 23-25 s.
| s | Read |
|---|---|
| 0-1.3 | the potato tossed and caught in the bright living room: right; he wears the apron there (the prompt said none) |
| 1.3-2.4 | the punch-in, the potato over his eyes: right |
| 2.4-3.9 | the shreds thrown into the bowl: right |
| 3.9-4.7 | the squeeze, the liquid streaming: right |
| 4.7-6.2 | the egg, the cornstarch, the spices: right |
| 6.2-7.9 | the fork; the clump lifted to the lens, his face: right, no sunglasses, mustache only |
| 7.9-9.9 | a ribbed contact grill, not a waffle iron (the hashbrown still comes out with a waffle grid at 14 s) |
| 10-13.8 | the slit, the chicken, the lettuce and tomato, the sauce, the cheese: right |
| 13.8-16.7 | the waffle hashbrown, held over his face, landing on the chicken in slow motion: right |
| 16.7-19.1 | the fold is a half-moon, then a long folded wrap, not the book's four-quarter triangle |
| 19.1-23.0 | the cut, the cheese pull, the pepper mill: right |
| 23-25.3 | the hero macro of the cut face: right, silent |
| 25.3-26.0 | the bite, his face: right, short (0.7 s) |

## The edit (our frames, no regeneration, no shake): Kevin's motion
- 29 pieces, 22.4 s (Kevin: 31 shots in 25.8 s): cuts on his rhythm; the egg/cornstarch/spices and the five fillings
  split into his 0.3-0.55 s inserts; dead frames out.
- The hook in slow motion: the potato in the air and the catch (0.55-1.30 s of the take) at 0.5x with motion
  interpolation (minterpolate, 48 fps -> 24 fps), the sound at atempo 0.5; the bite at the end the same.
- A slow push-in (3-15%) on almost every shot; the punch-in on the potato over his eyes (1.15 -> 1.30); tilts on the
  grill and the plate; a pull-out on the pepper mill and on the bite (Kevin's end); a 2-frame blur on four cuts.
- Text in the top band (meme.mjs 46 px): the hook question to the end of the skit «Why is everyone putting hashbrowns
  in tortillas? 🥔»; the re-hook from the slit to the cheese «Wait… why cut the tortilla? ✂️»; the answer from the cut
  «The hashbrown is the crunch 🥔 / Send it to your 3 a.m. friend 😮‍💨» (the answer avoids «4 folds»: the take's fold
  is a half-moon).
- Sound: the take's own, to -14 LUFS (Kevin -14.2) with the house peak-only limiter; the music bed is the owner's
  trending Instagram sound, added in the app at low volume.

## The result
- 545 frames, 22.71 s, 1080x1920, 24 fps (from the 4K take); cuts at the bounds 0, 13, 49, 71, 105, 121, 131, 139, 149,
  163, 185, 201, 223, 240, 251, 261, 268, 281, 291, 309, 325, 348, 365, 375, 397, 423, 454, 471, 509 (frames).
- Sound: -16.9 LUFS, true peak -1.9 dB (+8.5 dB, the peak-only limiter at 0.75). Kevin's -14 includes his music bed; a
  food-only track this dynamic reaches -14 only with heavy limiting, which flattens the crunches, so it stays at -16.9
  and the owner's trending sound brings it up.
- B (the three lines): media ca0ca918. A (no text): media 8fd96945.
- The 0.25 s strip of the hook: the box sits above his head; the potato reaches the top edge at 0.5 s, above the box.

## v3 after the owner: «خربت الصوت ... التعديل مش زي الألماني، فرق شاسع»
Measured against Kevin's file (the same script on both):
| | Kevin | v2 (mine) | v3 |
|---|---|---|---|
| time below -40 dB | 3% | 25% | 0% |
| level p10 / p90 | -31 / -14.6 dB | -42.7 / -17.4 | -34.5 / -18.5 |
| cuts a second (estimate) | 2.1 | 1.9 | 1.8 |
| brightness (luma, the whole video) | 64 | 90 | 75 (the bright skit is 3 s) |
- What broke the sound in v2: the take is 55% silence between its sounds; cutting it into 0.3-0.5 s pieces with short
  fades left holes and clipped tails; the slow-motion pieces were stretched (atempo 0.5).
- v3 sound (audio2.py): every sound whole with a 0.25 s L-cut tail into the next shot, the slow-motion pieces at real
  speed on their frame, a soft room tone under everything; -17.4 LUFS, peak -0.6 dB. Kevin's continuity comes from a
  music bed: the owner's trending Instagram sound (or a generated bed, credits, on «ولد»).
- v3 look: the kitchen graded darker and richer with cool shadows (Kevin's dark kitchen and rim light); the skit stays
  bright.
- B3 (the three lines): media 001eb344. A3 (no text): media 74d3f31f.

## v4 after the owner: «شوف كيف الافكت تاعه وكيف التضخم وكيف الروحة والرجعة ... ونزلت لي جودة الفيديو من 4K ل HD»
- What the frame-by-frame read of Kevin's file showed (30 fps sheets; research/kevin-motion-2026-11-23.md, the
  effects section): the swell, a fast zoom into the lens with motion blur on the last frames of a shot and a zoom-out
  settle on the next (1.93-2.10 s, 7.10-7.30 s); the going and coming back on a throw, forward, reverse, forward
  (2.13-2.80 s), and on the tenders landing.
- v4: 4K end to end (2160x3840, crf 17); the swell out of the potato over his eyes, the clump to the lens and the
  hashbrown over his face, and the swell in on the next shots; the boomerang on the shreds throw and on the hashbrown
  landing; the slow-motion hook and bite; the v3 sound (no silence, -17.1 LUFS, peak -0.2 dB) and grade; the text at
  4K (deviceScaleFactor 2). 555 frames, 23.13 s.
- B4 (the three lines): media 43a82283. A4 (no text): media 9f34f721.

## v5 after the owner: «مش نفس الايدت» (the differences he picked: the transitions and effects, the speed and rhythm)
- Kevin's timeline slot by slot: 32 slots at his shot lengths (his 31 shots plus the hook's slow tail), 25.0 s, 600
  frames at 24 fps, 2160x3840 (build5.py, audio5.py, run5.sh).
- His transitions at his times: the swell out of the potato over his eyes ends at 2.04 s (his 2.04), the settle on the
  shreds after it, the zoom ramp into 3.46 s (his 3.47), the clump swell ends at 7.25 s (his 7.24).
  The two swells have a whoosh rising into the cut.
- The going and coming back: the shreds (forward, back, forward) and the hashbrown landing (it falls to the pile, rises
  back up before it touches, then lands; its sound plays twice). The first v5 render reversed frames after the landing,
  so nothing moved; caught on the frame sheet and rebuilt before sending.
- Slow motion (motion interpolation) where our piece is shorter than his slot: the hook tail and the bite at 0.5x, the
  squeeze, the grill, the chicken, the lettuce, the sauce, the flip at 0.58-0.85x; frames checked, no smearing.
- Measured (the same script as v3): 0% silence, p10/p90 -34.5/-18.0 dB, 1.84 cuts a second estimated (Kevin 2.1 on the
  same estimate; true count 31 cuts in 25.0 s, Kevin 31 in 25.8), luma 70.6 (Kevin 64; the bright skit is 2 s),
  -16.8 LUFS, peak -0.8 dB.
- The sandbox was replaced in the middle of the first single-file render; the build is now one file per slot,
  resumable, and zoom_kevin.py skips finished shots.
- B5 (the three lines): media a8a743b2. A5 (no text): media f30a861b.

## v6 after the owner: «هذا شغله كله معمول بالمونتاج ... اعمل زيه» (his look is the edit: keyframes, loops, framing)
- His camera measured shot by shot from his file (kmotion.py: two trackers, the whole frame and the border only): a
  push-in on every shot and a strong one on the key shots (the punch-in 21%, the first kitchen shot 24% ending in a ramp,
  the clump 14% then +30% in its last 3 frames, the waffle iron 23-36%, the landing 18%, the hero a quick 20% at its
  start), a pull-out on the skit start (16%) and the end (8%), tilts that follow the action (shifts of 9-20% of the
  height). v5 pushed 0-8%.
- His Dutch angles measured from the lines in his frames: the clump -17 to -19 degrees, the throw about -10, the
  landing -1 to -7, the end +4 to +9.
- v6 (anim6.py): his curves on our 32 slots as keyframes (zoom, rotation, shift), a base framing per slot (the skit
  waist-up, the grill on the hashbrown, the bite chest-up), his Dutch angles on the clump (-17), the throw (-10), the
  landing (-4) and the bite (+6), an automatic zoom margin so no border shows (the most: 2.1x on the clump swell, from
  the 4K take), and real motion blur on the fast frames (up to 12 sub-frames).
- His look (lut6.py): part of his tone curve, his colour per brightness zone, his blue-violet backlight in the kitchen
  shadows; the skit warmer. Our v4 grade made the mids darker than his (33 against 60); the LUT replaces it.
- Checked side by side with his file at the same second (sbs6 media 793d5d51).
- B6 (the three lines): media 05f998e0. A6 (no text): media b4bbae36.

## v7 after the owner: «انت هيك خربت الفيديو ... وين الموتيشن» (v6 rejected: the crops and Dutch angles)
- Asked which motion: he picked all four (cut on action, speed ramps, effects between the shots, camera moves inside
  the shot) on «الفيديو الأصلي كما ولّدته»: the take's own framing and colours, no crop base, no tilt, no grade.
- What Kevin's cuts showed at full frame rate (4 frames each side of all 30 cuts): almost every cut lands mid-move and
  the move carries into the next shot (the potato coming down becomes the cubes dropping at 2.04 s; the clump flying
  at the lens becomes the batter landing on the iron at 7.24 s).
- v7 (build7.py): the take's motion read per frame (optical flow); every slot starts and ends mid-move; speed ramps on
  15 slots (fast 1.2-1.4x, slow 0.4-0.6x on the toss, the drop, the squeeze, the clump, the landing, the knife, the
  pepper); slow parts from motion interpolation, fast parts with shutter blending; effects at 10 cuts (zoom-blur on the
  swells, the pull-apart and the hero; whips in the move's direction on the shreds, the fork, the grill, the waffle
  and the flip into the landing); Kevin's push/pull per shot from the full frame; a whoosh on each effect.
- The source limits the ramps: the take was generated near real speed, so the fast parts top out near 1.4x.
- Measured: 25.0 s, 2160x3840, 0% silence, -15.9 LUFS, peak -0.5 dB, motion median 13.9 (v5 9.4).
- B7 (the three lines): media d9ef39a1. A7 (no text): media cfcc2dac. Side by side with Kevin: media ed7e93d0.

## v8 after the owner: «مش نفس الإيقاع الكاميرا»
- The camera measured on both files per shot (cmpcam: two trackers; zoom, pan and rotation, the zoom in thirds of each
  shot, the fastest zoom): v7's ten effects drove the zoom at 350-700% a second on 10 cuts; Kevin's camera moves 5-160%
  a second, a calm 2-20% push on most shots, and one real camera swell (the clump, 396% a second).
- v8 (build8.py, tzoom.py): the take's own camera zoom read per frame; the added zoom is Kevin's zoom curve divided by
  the take's own (after the time map), so the net zoom per shot is his, from the full frame; the 8 effects he does not
  have removed; the potato swell at 2.04 kept (the owner's «التضخم»); cut on action and the speed ramps as v7.
- Measured after: 27 of 31 shots within 2% of his zoom, thirds included. The two shots around 2.04 differ by the
  potato swell kept on purpose (+43% in the last third against his -1%); the flip +14% against his +9%.
- 25.0 s, 2160x3840, 0% silence, -16.6 LUFS, peak -0.7 dB.
- B8 (the three lines): media ca6288f2. A8 (no text): media a5bdfa4d. Side by side with Kevin: media 6a8800db.

## v9 after the owner: «شوف التنقل بام هالفيديو»
- All 30 of Kevin's cuts read again, 4 frames each side: most of his cuts change the distance on the same action, which
  keeps going (12.21 the pour wide then close; 16.95 and 17.28 the pan wide, punch-in, closer; 18.18 the waffle; 19.45
  and 19.92 the tender; 20.95 the topping). Punch-in cuts made in the edit.
- Ours cut between slots of the same setup (the egg/cornstarch/spices bowl, the five fillings, the folds, the plate, the
  knife) with the same frame every time.
- v9 (build9.py): v8 plus a punch-in on every second slot of a shared setup (7 slots, 1.40-1.45x from the 4K), framed on
  the action (the egg to the cornstarch close-up, the slit to the chicken, the lettuce to the sauce, the lid to the
  waffle, fold 1 to fold 2, the lift to the plate, the knife to the knife going through). The camera, the ramps and the
  sound as v8.
- 25.0 s, 2160x3840, 0% silence, -16.6 LUFS, peak -0.7 dB.
- B9 (the three lines): media 95658f0e. A9 (no text): media fb74ad43. Side by side with Kevin: media 70d77e8d.
