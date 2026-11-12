# Crispy Potato Nests: the edit, the pistachio way (2026-11-12)
Owner, after the pasta's 1 h read (skip 61.9%, the opening): «اشتغل فيديو البطاطا بنفس فكرة البستاشيو».
Source: job 8c5efdc7, 720x1280 H.264 8-bit 24 fps, 12.06 s, -24.2 LUFS (read in generation-log.md).
Final v1: https://d2ol7oe51mr4n9.cloudfront.net/user_2x0tp0odsOo92J2AkNG46XQD8Gw/397e9ec2-4a7b-4ef8-b30d-b1c428731899.mp4
(media 397e9ec2-4a7b-4ef8-b30d-b1c428731899), 1080x1920 (lanczos from 720p) H.264 High, BT.709 tags, 24 fps,
10.375 s (249 frames), about 10 Mbps; AAC stereo 256k, -14.5 LUFS, -1.0 dBTP. Build: `edit_potato.py` in the sandbox
next to raw.mp4 and the three cards.

## What the pistachio idea means here
- Frame one: his face, the bite and its crunch, with a fast push-in (1.00 to 1.25 in 0.83 s) and the hook on his chest.
- The raw prep fast: white sticks and powders 0.83-1.83 s (1.0 s), the skill's opening check.
- A near-silent beat (0.375 s at -12 dB) then the break's crunch at +10 dB, no card on it.
- The end: his face again, chewing, the nest held, a slow push-in (1.00 to 1.15), the CTA only there.

## Timeline
| Output | Source frames | Shot | Speed | Sound |
|---|---|---|---|---|
| 0.00-0.83 | 256-276 | the bite (face), push-in | 1x | as is |
| 0.83-1.17 | 0-12 | sticks drop into the black bowl | 1.5x | |
| 1.17-1.38 | 12-25 | flour, starch | 2.5x | +6 dB |
| 1.38-1.83 | 25-52 | turmeric, red pepper, salt | 2.5x | +6 dB |
| 1.83-2.12 | 66-77 | sparkling water (moved before the mix, the recipe's order) | 1.5x | |
| 2.12-2.71 | 52-66 | the mix | 1x | -4 dB |
| 2.71-3.29 | 90-104 | the first nest into the oil (the bowl lift 77-90 cut) | 1x | |
| 3.29-3.88 | 104-123 | 7 nests in the pan | 1.4x | |
| 3.88-7.04 | 123-199 | press, macro, flip, lift, sauce, stir | 1x | |
| 7.04-7.75 | 199-216 | the plate, push-in | 1x | -4 dB |
| 7.75-8.58 | 216-236 | the break | 1x | -12 dB to frame 225, then +10 dB |
| 8.58-9.42 | 236-256 | the dip | 1x | |
| 9.42-10.38 | 266-289 | chewing, the nest held (face), push-in | 1x | -3 dB |

## Cards (cards.json, overlay.mjs; Arabic 58 px, English 30 px, middle band y 854-1047, inside x 232-850)
| Output | Card | Formula (hook-log) | hookscore, full line |
|---|---|---|---|
| 0.00-1.83 | «الطريقة الوحيدة / ولادك بينسوا الشيبس» / "The only way your kids forget fries." | Superlative for the family cook (Sweet Potato 9.8x) | 84.2 "The only way your kids finish 2 whole potatoes without asking for fries." |
| 1.83-3.29 | «بلا ٤ معالق نشا… / بتطرى» / "No 4 spoons of starch? Soft nests." | Cause of a failure (Potato Rolls 4.5x), the recipe's 4 tbsp | 81.4 "Without 4 spoons of starch, your potato nests go soft." |
| 9.42-10.38 | «اكتب «بطاطا» 👇» / "Comment POTATO 👇" | CTA, keyword gets the book link | |

## Checks
| Check | Result |
|---|---|
| prepublish (pp.py) | SLOW 1 at 10.0 s (he chews under the CTA, kept so it can be read); no DEAD, LONG or QUIET. The first render had DEAD at 0.0 s (the bite is a still shot): fixed with the push-in |
| Loudest | half-second means: the first nest in the oil 74.4, the bite 74.3; the break's crunch hits the limiter (-1.7 dBFS) right after 0.375 s of near silence |
| Opening (0-3 s) | face and crunch 0-0.83, raw white 1.0 s, then water, the orange mix, the oil from 2.71 s |
| 390 px phone | every card readable; the hook over the white flour (1.2-1.8 s) is the busiest background, the Arabic still reads |
| Export vs source | 720p 8-bit source, so 1080x1920 8-bit H.264 tagged BT.709; a 4K regeneration or an upscale would raise it |
