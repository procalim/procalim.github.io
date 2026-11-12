# Honeycomb Pasta Pie: the edit, the crinkle way (2026-11-12)

## v3 (the one to use): https://d2ol7oe51mr4n9.cloudfront.net/user_2x0tp0odsOo92J2AkNG46XQD8Gw/7654da47-6c43-416b-9033-53109f142838.mp4
Media 7654da47-6c43-416b-9033-53109f142838, 1080x1920 H.264, 11.875 s (285 frames), -14.6 LUFS, -1.3 dBTP. Build: `edit_pie.py`.
Owner on v2: «الفيديو صار قصير كثير وانت كاتب موتزريلاء بدلا موزريلاء». Speeds back near 1x (1.0-1.3), slow push-ins on the
calm shots (opening 1.00-1.12, ricotta macro, pour, oven, slice 1.00-1.10) instead of more speed; the card spelled «موزريلا».
prepublish: DEAD 1 (2.0 s, the face shot at 1x), SLOW 7 of 24; loudest 11.5, 11.0, 10.5 s (the slice crunch), then 0.0 s.

## v2 (replaced, 9.21 s: too short): https://d2ol7oe51mr4n9.cloudfront.net/user_2x0tp0odsOo92J2AkNG46XQD8Gw/bdb26061-544f-4324-a5de-9412eb398b84.mp4
Media bdb26061-544f-4324-a5de-9412eb398b84, 1080x1920 H.264, 9.21 s, -14.6 LUFS, -1.2 dBTP. Build: `edit_pie.py` (v1: `edit_pie_v1.py`).
Owner on v1: «عادي الوجه يضل بس أشياء بطيئة سرعها وصوت الهرش يكون قوي»; unlimited renders 720p only, higher costs credits.
| Output | Source frames | Shot | Speed | Sound |
|---|---|---|---|---|
| 0.00-1.29 | 0-47 | the honeycomb, his hand pressing, push-in 1.00-1.12 | 1.5x | |
| 1.29-2.29 | 72-105 | he pipes the ricotta (face, back in) | 1.4x | |
| 2.29-2.92 | 105-128 | ricotta in every tube | 1.5x | |
| 2.92-3.92 | 128-157 | fingertip, no sauce yet | 1.2x | |
| 3.92-4.92 | 157-205 | the marinara pour | 2.0x | |
| 4.92-5.92 | 205-229 | the spoon pushes the sauce in | 1x | |
| 5.92-7.04 | 229-264 | mozzarella falls | 1.3x | -4 dB |
| 7.04-7.83 | 264-292 | the oven glass | 1.5x | |
| 7.83-9.21 | 292-337 | the slice lifted, the crunch | 1.35x | +8 dB, +6 dB at 3.5 kHz: the loudest sound |
Cards: title 0-1.29 (off before the face shot, its y 529 is his chin), hook 0-2.29 (on his apron in the face shot),
proof 2.29-4.42, the right way 4.42-5.92, «موزريلا، وعالفرن. وبس» 5.92-7.44, the question 7.44-9.21.
prepublish: DEAD 1 (the last 0.2 s, the cheese stretch under the crunch), SLOW 5 of 19 (v1: DEAD 9, SLOW 1 of 23);
loudest 9.0, 8.5, 8.0 s (the slice crunch), then 0.0 s.

## v1 (replaced)
Source: the owner's generation on his unlimited, job 1bef36f0 (Seedance 2.5, 14 s, 720x1280 H.264 24 fps, the Crinkle
Cake reel as the only video reference, the Chef-Ahmad element), from `../../prompts/w4-honeycomb-pasta-pie-crinkle.txt`.
Final v1: https://d2ol7oe51mr4n9.cloudfront.net/user_2x0tp0odsOo92J2AkNG46XQD8Gw/f99a7649-263b-4dc0-abbb-252ae8fe7fb3.mp4
(media f99a7649-263b-4dc0-abbb-252ae8fe7fb3), 1080x1920 (lanczos from 720p) H.264 High, BT.709, 24 fps, 11.625 s
(279 frames); AAC stereo 256k, -14.5 LUFS, -1.2 dBTP. Build: `edit_pie.py` (sandbox, next to raw.mp4 and the 6 cards).

## The read (errors first)
- 1.95-3.0 s: the hand leaves the pan and a fist appears alone under it (frames 48-71). Cut at frame 47.
- 3.0-4.4 s: the piping shot came back as his medium shot (face, white t-shirt, apron, black gloves) while every other
  shot has bare hands; the pan there has a flat cream top. Cut (frames 72-105). The ricotta in every tube still shows
  in the next macro.
- 9.5-11.0 s: the mozzarella falls as fine grated cheese (it reads like parmesan). Kept: it reads as cheese.
- Right: the round black springform, the upright rigatoni honeycomb, ricotta in every tube, the fingertip on the dry
  tops, the marinara pour, the spoon pushing the sauce into the holes, the oven glass, the slice lifted on a dark
  server with the standing tubes inside and the cheese stretching; bare hands; no text; no talking.
- The take is 720p again (the setting on the site read 720p).

## Timeline (no flash, no reorder: trims only)
| Output | Source frames | Shot |
|---|---|---|
| 0.00-1.96 | 0-47 | the honeycomb, his hand pressing |
| 1.96-2.92 | 105-128 | ricotta in every tube, macro |
| 2.92-4.12 | 128-157 | fingertip, no sauce yet |
| 4.12-6.12 | 157-205 | the marinara pour |
| 6.12-7.12 | 205-229 | the spoon pushes the sauce into the tubes |
| 7.12-8.58 | 229-264 | mozzarella falls |
| 8.58-9.75 | 264-292 | the oven glass, bubbling |
| 9.75-11.62 | 292-337 | the slice lifted |

## Cards (cards.json; sizes and places measured on the crinkle reel)
The crinkle: title about 28 px at y 531-593 and the hook about 30 px at y 1238-1309 at frame one; later cards about
44 px Arabic over English at y 1342-1435; white, no box.
| Output | Card |
|---|---|
| 0.00-2.92 | title «فطيرة الباستا قرص العسل (كيكة الريغاتوني)» / "Honeycomb Pasta Pie (Rigatoni Cake)" (y 529) + hook «خلط الباستا بالصلصة هو الغلطة» / "Mixing the pasta with the sauce is the mistake" (y 1237) |
| 2.92-5.00 | «لسا ولا نقطة صلصة» / "Still not a drop of sauce" |
| 5.00-7.12 | «هون بتنزل. جوّا الأنابيب» / "Here it goes. Inside the tubes." |
| 7.12-8.90 | «موزريلا، وعالفرن. وبس» / "Mozzarella. Oven. That is all." |
| 8.90-11.62 | «بتخلط الباستا بالصلصة؟» / "Do you mix pasta and sauce?" |
Keyword CTA in the caption and the pinned comment only (RIGATONI / «ريغاتوني»), as the crinkle.

## Checks
| Check | This edit | The crinkle reel |
|---|---|---|
| prepublish flags | DEAD 9, SLOW 1 of 23 half seconds | DEAD 10, SLOW 4 of 28 (the same calm, locked shots) |
| Loudest | 0.0 s (the opening) | 2.5 s and 1.5 s, then 0.0 s |
| Cards | all inside x 251-799, readable on a 390 px phone frame | |
| Length | 11.6 s | 13.8 s |
