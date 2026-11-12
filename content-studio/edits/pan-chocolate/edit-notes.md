# Pan Chocolate Cake: the professional edit, no text (the owner's test)
The owner's call (2026-11-11): «اعمل ايدت بس ما تضيف كتابة على الفيديو بدي جرب بدون كتابة بس دعوة». No hook card, no
rehook, no step labels; the only text is the CTA over the bite at the end. The hook is visual: a cold open of the
sauce pour and the wet piece lifted out of the pan.

Source: job f0aadc93 (Seedance 2.5 omni_reference, 20.04 s, 1080x1920 HEVC 24 fps, bitrate high, 320 credits).
Edited in the Higgsfield sandbox (`edit.py`, then `fin.py`), 0 credits.

## Versions
- **v2 (2026-11-12, the one to post):** https://d2ol7oe51mr4n9.cloudfront.net/user_2x0tp0odsOo92J2AkNG46XQD8Gw/33967edd-b06e-41e3-84fb-52e841a96024.mp4
  (media 33967edd-b06e-41e3-84fb-52e841a96024), 1080x1920, H.264 24 fps, 12.25 s, AAC 192k.
  Why (owner «اعملها», after the Honey Cake 13 h read): v1 showed raw ingredients for 2.8 s right after the flash,
  the opening that gave honey, mala and feta 51-53% skip. v2 opens on 1.3 s of payoff (the pour, then the piece),
  holds the raw steps to 1.25 s, and crops the cocoa shot, where his face lies sideways and warped behind the cup
  (missed on the first read).
- v1 (2026-11-11, replaced): media f48c9181-d141-4e8e-bf0b-56521abe72d8, 13.5 s, 0.8 s cold open, raw steps 0.8-3.6 s.

## Timeline v2 (source seconds -> speed -> output seconds)
| Source | Speed | Output | What | Edit |
|---|---|---|---|---|
| 13.45-14.15 | 1.4 | 0.00-0.50 | the sauce pour (cold open) | slow push-in |
| 17.30-18.08 | 1.0 | 0.50-1.29 | the piece lifted, sauce dripping (cold open) | punch-in on the tear, +10 dB |
| 0.45-0.90 | 1.2 | 1.29-1.67 | the egg crack | punch-in on the crack |
| 1.10-1.90 | 2.4 | 1.67-2.00 | sugar onto the yolks | +8 dB |
| 2.05-2.65 | 2.4 | 2.00-2.25 | whisked pale | |
| 2.85-3.55 | 2.4 | 2.25-2.54 | milk | |
| 4.05-4.60 | 1.1 | 2.54-3.04 | cocoa falling into the batter | cropped 1.8x to the stream; -9 dB |
| 5.00-5.92 | 1.2 | 3.04-3.79 | flour, whisked smooth | -5 dB |
| 5.92-7.00 | 1.6 | 3.79-4.46 | hot coffee | sped |
| 7.00-7.70 | 1.0 | 4.46-5.17 | the lid | punch-in on the lid, -6 dB |
| 8.30-9.58 | 2.4 | 5.17-5.71 | cooking through the lid | sped, +10 dB |
| 9.58-10.75 | 1.3 | 5.71-6.63 | lid off, steam past his face | +11 dB after the lift |
| 10.75-12.10 | 2.2 | 6.63-7.25 | skewer holes | punch-in on the first poke |
| 12.58-13.33 | 1.0 | 7.25-8.00 | sauce whisked in the copper pan | -3 dB |
| 13.33-14.90 | 2.2 | 8.00-8.71 | the pour | slow push-in |
| 15.25-16.75 | 1.3 | 8.71-9.88 | the spread | +8 dB, last 0.3 s at -14 dB (the beat before the money shot) |
| 16.85-18.17 | 1.2 | 9.88-10.96 | the piece lifted (money shot) | punch-in on the tear, +16 dB, the loudest moment |
| 18.17-19.00 | 1.15 | 10.96-11.67 | the bite | CTA from 11.01 s |
| 19.00-20.04 | 1.8 | 11.67-12.25 | chewing, the egg lifted for the loop | |

## The one card
- 11.01-12.25 CTA «اكتب «شوكولا» 👇» / "Comment CHOCOLATE 👇" (cards.json, ov_cta.png), pop-in 0.2 s.
- Box x 287-800, y 1176-1310: under his chin. The middle band (y 876-1010) covered his mouth during the bite, so the
  card sits just below it; face and food stay clear. No text anywhere else.

## Checks (v2)
| Check | Raw generation | Final |
|---|---|---|
| Opening 0-3 s | | payoff 0-1.29 s; raw ingredients 1.29-2.54 s (1.25 s); cocoa from 2.54 s |
| DEAD / SLOW / LONG / QUIET half seconds | 7 / 6 / 0 / 4 | 0 / 0 / 0 / 0 |
| Loudest moment | 4.0 s, the cocoa | 10.5 s, the money shot (77.8 dB) |
| Loudness | -21.2 LUFS | -15.7 LUFS, -1.2 dBTP |
| Last second | | -18.3 dB, not silent |
| Speech | none (Whisper) | none |
| Seams | | each segment cut to its exact frame count; the cold open ends before the cut to the bite |
| 390 px phone check | | CTA readable; face and food uncovered |

## Render notes
- The first render froze on the crack for 14 s (the output ran 129 s): 17 branches from one decode with the cold open
  taken from the end of the take. Fixed by rendering each segment to its own file, then joining them.
- Input seek lands about 2 frames late: the cold open ended on one frame of the bite. Each segment is now cut to its
  exact frame count, and the cold open ends at 18.08 (the cut is at 18.175).

## Known from the generation
- The piece is a wedge, not a square; the hole left in the pan is a wedge too (generation-log check 18).
- The pan is steel until 10.7 s of the take and black non-stick after (check 19). In v2 the change lands on the cut
  to the holes (6.6 s).
- The cocoa shot (take 3.75-5.0 s): his face lies sideways and warped behind the cup. Cropped out in v2.
- The oil pour is missing (only the milk). The lenses are brown-tinted, not solid black.
