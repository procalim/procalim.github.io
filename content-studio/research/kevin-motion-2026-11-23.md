# Kevin's motion, read from the owner's file (2026-11-23)
The owner: «بدي فقط الموتيشن كنترول، بدي فقط تكتب الحركات والزومينج والشغل تاعه فقط، ونشتغل على الوصف تاعنا».
File: Kevin_Leeder.mp4 (the owner's upload): 720x1280, 29.97 fps, 25.84 s, -14.2 LUFS. Sweet potato waffles with
crispy tenders, slaw and cranberry. Read with 0.25 s frame sheets, scene cuts (31 shots) and a pixel zoom/shift
estimate per shot (first vs last frame). Only the motion is taken; the food, the cook and the kitchen are ours.

## The shots
| s | Shot | Camera | Motion in the frame |
|---|---|---|---|
| 0.00-1.20 | skit, bright daylight flat, medium-wide at chest height | locked | he tosses the hero vegetable up and catches it |
| 1.20-2.04 | skit, chest-up (a punch-in cut) | push-in about 1.2x with a small tilt | he holds it over his face, a comic beat |
| 2.04-3.47 | hard cut into the dark kitchen; low at counter height, his face above | slow push-in 1.06x | two handfuls thrown down into a pot, slow-motion splash |
| 3.47-4.40 | 45 degrees from the side | push-in 1.08x | a big steam or powder cloud |
| 4.40-5.61 | three close inserts, 0.33-0.45 s each | locked | milk poured, cheese dropped, spice shaken |
| 5.61-6.31 | close, high 45 degrees | almost locked | a fork mixes |
| 6.31-7.24 | medium, frontal, his face | push-in 1.15x | he lifts a big clump toward the lens |
| 7.24-9.54 | medium at the waffle iron, his face behind | tilt down onto the iron | spread in, the lid shut |
| 9.54-10.14 | close from the side | push-in 1.02x | a mandoline slice |
| 10.14-10.98 | close, low frontal | locked | dropped from the fingers into a glass bowl |
| 10.98-12.21 | close | push-in 1.06x | a second slice, dropped in |
| 12.21-13.11 | close, frontal | push-in 1.04x | a thick pour from a cup |
| 13.11-14.28 | three inserts, 0.37-0.43 s | locked | a squeeze, a spoon, herbs |
| 14.28-15.42 | medium, his face | push-in 1.06x | he mixes, then throws the next food up into the air |
| 15.42-16.38 | low frontal at the pan, his arms up behind | push-in 1.08x | it lands in the pan, spice dust glittering in the backlight, slow motion |
| 16.38-17.62 | four inserts, 0.27-0.33 s | locked | tongs turning, sizzling macro |
| 17.62-18.89 | close, low at the plate | tilt down following the hands | the waffle held up, then set on the plate |
| 18.89-19.92 | two inserts, 0.47-0.57 s | locked | the layers stacked |
| 19.92-20.95 | close | push-in 1.02x | a spoon of topping |
| 20.95-22.06 | close from the side | pull-out 1.04x | a grater over the top |
| 22.06-23.59 | macro side profile at plate level | slow push-in, shallow focus | the hero, finished |
| 23.59-25.84 | medium, him at the counter | slow pull-out 1.04x | he eats a bite, satisfied, the end |

## The signature
- A slow push-in (2-15%) on almost every shot; one pull-out on the eating end; no shake anywhere.
- Food thrown or dropped into the frame from above, slow motion on the throws and splashes.
- Bursts of quick locked inserts (0.27-0.45 s) for the small additions, between hero shots of 0.9-2.3 s.
- Low, frontal, counter-height angles with his face soft behind the food.
- 31 shots in 25.84 s (1.2 cuts a second); the skit 2.04 s; the end is him eating in the kitchen.
- Sound: a continuous music bed under the food sounds (no gap below -33 dB; spectral flatness 0.24 against our
  foley-only 0.44), -14.2 LUFS.

## The effects (read again at 30 fps, after the owner: «شوف كيف الافكت تاعه وكيف التضخم وكيف الروحة والرجعة»)
The first read compared only each shot's first and last frame, so it missed these:
- **The swell (التضخم):** at some cuts the shot zooms fast into the lens (+2 to +3% a frame for 5-9 frames) with motion
  blur, the potato rushing at the camera before the cut to the kitchen (1.93-2.04 s), the dough at 7.10-7.24 s; the
  next shot starts zoomed in and settles out (-1.5 to -2.5% a frame for about 10 frames after 2.04 s).
- **Going and coming back (الروحة والرجعة):** the cubes fall into the pot, rise back up in reverse, fall again
  (2.13-2.80 s); the tenders' landing does the same.
- Slow motion on the throws, the spice dust glittering in the backlight.

## Side by side with our v5 (0.1 s frames, after the owner: «ههههه مش نفسو»)
The edit timing and effects now match; the gap is in the shots the generation gave us:
- **Angles:** his camera is low, at counter height, or 45 degrees from the side, often with a Dutch tilt on the throws
  (6.3-7.1 s, 14.3-15.3 s); a slow arc around the waffle iron (7.2-8.0 s). Ours is frontal, centred and symmetrical,
  and the fillings are flat top-downs.
- **Distance:** his skit is chest-up and close from the first frame, he moves toward the lens; our first shot is
  full-body and small in the frame. Our grill shot (8.0-9.4 s) is mostly dark, the face cut at the frame top.
- **Hands and face:** bare tattooed hands doing every action, his face in the frame looking at the food; ours black
  gloves, the face often cropped.
- **Light:** a deep blue-violet backlight behind him with warm food and skin, glitter dust in the backlight on the
  landing; ours black with amber bokeh.
- **The end:** three-quarter profile, the blue rim light, the plate in the foreground; ours frontal.
These are prompt (camera) changes, not edit changes. The edit can only crop tighter, tilt and push the shadows blue.
- Correction from the owner the same day: «هذا شغله كله معمول بالمونتاج». The framing, the Dutch angles and the moves
  are made in the edit (crop, keyframes, rotation), so v6 copies them as keyframes from his measured camera
  (edits/hashbrown-crunchwrap/kmotion.py, anim6.py).
