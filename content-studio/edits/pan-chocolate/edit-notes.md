# Pan Chocolate Cake: the professional edit, no text (2026-11-11, the owner's test)
The owner's call: «اعمل ايدت بس ما تضيف كتابة على الفيديو بدي جرب بدون كتابة بس دعوة». No hook card, no rehook,
no step labels; the only text is the CTA over the bite at the end. The hook is visual: a 0.8 s cold open of the wet
piece lifted out of the pan.

Source: job f0aadc93 (Seedance 2.5 omni_reference, 20.04 s, 1080x1920 HEVC 24 fps, bitrate high, 320 credits).
Edited in the Higgsfield sandbox (`edit.py`, then `fin.py`), 0 credits.
Final: https://d2ol7oe51mr4n9.cloudfront.net/user_2x0tp0odsOo92J2AkNG46XQD8Gw/f48c9181-d141-4e8e-bf0b-56521abe72d8.mp4
(media f48c9181-d141-4e8e-bf0b-56521abe72d8), 1080x1920, H.264 24 fps, 13.5 s, AAC 192k.

## Timeline (source seconds -> speed -> output seconds)
| Source | Speed | Output | What | Edit |
|---|---|---|---|---|
| 17.30-18.08 | 1.0 | 0.00-0.79 | the piece lifted, sauce dripping (cold open) | punch-in on the tear, +10 dB |
| 0.30-1.00 | 1.0 | 0.79-1.50 | the egg crack | punch-in on the crack; the calm first 0.3 s cut |
| 1.00-2.00 | 1.3 | 1.50-2.25 | sugar onto the yolks | +8 dB (quiet in the take) |
| 2.00-2.75 | 1.2 | 2.25-2.88 | whisked pale | |
| 2.75-3.75 | 1.3 | 2.88-3.63 | milk | |
| 3.75-4.55 | 1.2 | 3.63-4.29 | cocoa | punch-in on the drop, -9 dB (the loudest sound of the take); cut before the cloud settles |
| 5.00-5.92 | 1.2 | 4.29-5.04 | flour, whisked smooth | -5 dB |
| 5.92-7.00 | 1.6 | 5.04-5.71 | hot coffee | sped (dead half second at 6.0) |
| 7.00-7.70 | 1.0 | 5.71-6.42 | the lid | punch-in on the lid, -6 dB; the static 7.7-8.3 cut |
| 8.30-9.58 | 2.4 | 6.42-6.96 | cooking through the lid | sped (dead 8.5-9.5), +10 dB |
| 9.58-10.75 | 1.3 | 6.96-7.88 | lid off, steam past his face | +11 dB after the lift |
| 10.75-12.10 | 2.2 | 7.88-8.50 | skewer holes | punch-in on the first poke |
| 12.58-13.33 | 1.0 | 8.50-9.25 | sauce whisked in the copper pan | -3 dB |
| 13.33-14.90 | 2.2 | 9.25-9.96 | the pour | slow push-in (the pour alone read as SLOW) |
| 15.25-16.75 | 1.3 | 9.96-11.13 | the spread | +8 dB, last 0.3 s at -14 dB (the beat before the money shot) |
| 16.85-18.17 | 1.2 | 11.13-12.21 | the piece lifted (money shot) | punch-in on the tear, +16 dB, the loudest moment |
| 18.17-19.00 | 1.15 | 12.21-12.92 | the bite | CTA from 12.26 s |
| 19.00-20.04 | 1.8 | 12.92-13.50 | chewing, the egg lifted for the loop | |

## The one card
- 12.26-13.50 CTA «اكتب «شوكولا» 👇» / "Comment CHOCOLATE 👇" (cards.json, ov_cta.png), pop-in 0.2 s.
- Box x 287-800, y 1176-1310: under his chin. The middle band (y 876-1010) covered his mouth during the bite, so the
  card sits just below it; face and food stay clear. No text anywhere else.

## Checks
| Check | Raw generation | Final |
|---|---|---|
| DEAD / SLOW / LONG / QUIET half seconds | 7 / 6 / 0 / 4 | 0 / 0 / 0 / 0 |
| Loudest moment | 4.0 s, the cocoa | 11.5 s, the money shot (77.4 dB) |
| Loudness | -21.2 LUFS | -15.5 LUFS, -1.3 dBTP |
| Last second | | -19.6 dB, not silent |
| Speech | none (Whisper) | none |
| Seams | | cold open to crack checked frame by frame: no stray frame |
| 390 px phone check | | CTA readable; face and food uncovered |

## Render notes
- The first render froze on the crack for 14 s (the output ran 129 s): 17 branches from one decode with the cold open
  taken from the end of the take. Fixed by rendering each segment to its own file, then joining them.
- Input seek lands about 2 frames late: the cold open ended on one frame of the bite. Each segment is now cut to its
  exact frame count, and the cold open ends at 18.08 (the cut is at 18.175).

## Known from the generation (not fixable in the edit)
- The piece is a wedge, not a square; the hole left in the pan is a wedge too (generation-log check 18).
- The pan is steel until 10.7 s of the take and black non-stick after (check 19). In the edit the change lands on the
  cut to the holes (7.9 s).
- The oil pour is missing (only the milk). The lenses are brown-tinted, not solid black.
