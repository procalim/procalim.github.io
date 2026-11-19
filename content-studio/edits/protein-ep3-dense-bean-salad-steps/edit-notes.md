# Dense Bean Salad, step by step (N° 101), 2026-11-19

Take: Seedance 2.5 job ceb1db96 (the owner's unlimited), prompt prompts/w4-result-first-dense-bean-salad-20s.txt (v2,
step by step). Edit on research/edit-reference-2026-11-19.md (six outside outliers).

## The read (scdet cuts 5.00, 8.96, 11.67, 13.83, 14.42, 14.92 s; 24 fps, 481 frames)
- 0-5 s top-down: all eight salad ingredients go in one by one (chickpeas, cannellini, tomatoes, pepper, onion, feta,
  salami as round slices, herbs). 5-9 s the jar: oil, vinegar, mustard, garlic, pepper, salt, oregano. 9-11.7 s the
  shake and the slow pour over the sections. 11.7-13.8 s the toss. 13.8-14.4 s a blurred toss (dropped). 14.4-14.9 s
  the fridge (a small emblem on its back wall: blurred). 14.6-14.9 s the door closes to black (dropped). 14.9-20 s the
  result, one locked shot: the container, the lid off, the spoon, the spoonful, his face from 16.2 s at the top edge,
  the bite at 18.8 s.

## The edit (edit_salad_steps.py, sandbox /home/user/salad2)
| Out | Take frames | Speed | Card |
|---|---|---|---|
| 0.00-3.50 | 360-444 the result: lid off, spoon in, spoonful | 1.0 | hook «سلطتك بتذبل تاني يوم؟» / SOGGY SALAD?, complete at frame one (typed by 0.02 s), no clicks |
| 3.50-7.50 | 0-120 the eight ingredients | 1.25 | «٨ مكوّنات بوعاء واحد» |
| 7.50-10.67 | 120-215 the dressing | 1.25 | «والصلصة: ٧ مكوّنات بمرطبان» |
| 10.67-13.38 | 215-280 shake and pour | 1.0 | «حوالي 55 غ بروتين بالوعاء» |
| 13.38-15.75 | 280-332 toss, 334-349 fridge | 1.25 / 1.0 | «30 دقيقة بالبراد عالأقل» |
| 15.75-19.79 | 384-481 the result again, the bite | 1.0 | the answer «السر: كل ما قعدت بالبراد، بتطيب» / "The longer it sits, the better."; the send «بروتين من الكتاب · حلقة ٣» / «ابعتها للي سلطته بتذبل تاني يوم» |
- 60 fps: the 24 fps cut through minterpolate (mci, aobmc, bidir, vsbmc, scene-change detection so no frame blends
  across a cut), then 1080x1920; the cards rendered at 60 fps. The cuts read clean frame by frame.
- Sound: the take's own, segment by segment with a 3-frame lead-in inside a shot, -20 LUFS gain, the peak-only limiter.

## Result (media 0fd143ba)
- 19.79 s, 1080x1920, 60 fps (1183 frames); -17.6 LUFS, -1.0 dBTP, range 25.0 dB.
- hook_check 10/10: E + B; 6 words in 0-3 s; the first line typed by 0.02 s; the answer at 15.75 of 19.79 s; longest
  text gap 0.00 s; 6 onsets in 0-3 s (0.4, 1.0, 1.6, 1.7, 2.0, 2.8 s); send type mistake; safe zone ok.
- open3: motion 0-3 s 7.9, 1-3 s 5.1.
