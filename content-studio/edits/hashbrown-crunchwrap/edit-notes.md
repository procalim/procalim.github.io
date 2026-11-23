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
