# Chicken-Crust Grid Pizza: the edit v1 (2026-11-13; healthy series day 1)
Source: job 49622891 (Seedance 2.5, 14.05 s, 720x1280, 24 fps), prompt v5 in
`../../prompts/w4-chicken-crust-grid-pizza-crinkle.txt` (the crinkle reel as the motion, no first frame), the owner's unlimited.
Final v1: https://d2ol7oe51mr4n9.cloudfront.net/user_2x0tp0odsOo92J2AkNG46XQD8Gw/ab62b251-b39b-4d08-9ad8-080668c6cfd6.mp4
(media ab62b251-b39b-4d08-9ad8-080668c6cfd6), 1080x1920 H.264, 10.08 s, -14.5 LUFS, -1.4 dBTP. Build: `edit_pizza.py`.

## The read (owner: «كل اشي صح ما عدا الفرن»)
- 0-2.75 s (0-66): the scored shredded chicken crust top-down, his hand pressing, then lifting the tray. Right.
- 2.75-5.42 s (66-130): a whip, the tray going into the oven, the oven glass with the crinkle's pale peaks. Cut.
- 5.42-14.05 s: the fingertip on the dry golden chicken crust, the passata pour, the spoon, one topping per square in
  columns (red pepper, mushrooms, spinach), the cheese, the oven glass with the cheese bubbling (the pizza, kept), the knife
  lifting a square with the cheese pull and steam. Right.
- Source sound -23.5 LUFS class: 42-74 dB per quarter second (quiet at 5.5-6.5 s and 13-14 s).

## Timeline v1
| Output | Source frames | Shot | Speed |
|---|---|---|---|
| 0.00-2.29 | 0-66 | the scored chicken crust, his hand pressing, then lifting the tray (push-in 1.0-1.1) | 1.2x |
| 2.29-3.96 | 130-170 | the fingertip on the dry golden chicken crust | 1.0x |
| 3.96-5.08 | 170-197 | the passata pour (push-in 1.0-1.08) | 1.0x |
| 5.08-6.00 | 203-225 | the spoon spreads it | 1.0x |
| 6.00-7.54 | 225-269 | one topping per square, then the cheese (push-in 1.0-1.08) | 1.2x |
| 7.54-8.21 | 269-292 | the oven glass, the cheese bubbling (push-in 1.0-1.1) | 1.4x |
| 8.21-10.08 | 292-337 | the knife, the square lifted, the cheese pull (the crunch lifted +5 dB, +6 dB at 3.5 kHz) | 1.0x |
Sound: levelled (dynaudnorm, the two compressors, the house loudness); QUIET 0.

## Cards (cards.json; the crinkle's sizes and places)
title + hook 0-2.69 "Chicken-Crust Grid Pizza" / «بيتزا قاعدتها دجاج» + "Sauce on a raw crust is the mistake" / «الصلصة عالقاعدة
النيّة هي الغلطة»; 2.69-4.46 «لسا ولا نقطة صلصة» / "Still not a drop of sauce"; 4.46-6.00 «هون بتنزل. بعد الفرن» / "Here it
goes. After the bake."; 6.00-8.51 «قرابة ٥٤ غرام بروتين. وبس» / "About 54 g protein. That is all."; 8.51-end «ابعتها لرفيقتك
بالجيم» / "Send this to your gym buddy".

## Checks
prepublish: DEAD 0, SLOW 6, LONG 0, QUIET 0 of 20; loudest 7.5 s (75.8 dB), 4.5 s (75.6), 9.5 s (74.8), the crunch 8.5 s
(74.7). The extra "cuts" pp.py lists inside shots are speed changes and the push-in starts.
Note: the raw crust reads pale pink in the first shot (cooked shredded chicken was asked).
