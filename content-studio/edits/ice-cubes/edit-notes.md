# Ice Cubes That Aren't: the take read and the edit (2026-11-23)
The owner: «الفيديو جاهز». Job 0cd8c165 (Seedance 2.5, Omni, 30 s, 1080p, bitrate high, seed 10721): the v3 prompt
(prompts/w4-tanghulu-ice-cubes-30s.txt), the element chef-ahmet-yellow, @Image1 the kitchen (325df734), @Image2
aa578427, @Image3 c5790c87, @Image4 edd34f41 (the same three images as the 20 s run a321a524 of 21 Nov).

## The read (frame sheets every 0.25 s; the sound in 50 ms frames)
Shot cuts at 3.0, 4.625, 5.75, 7.54, 8.79, 10.21, 11.42, 12.46, 14.125, 15.625, 16.79, 17.75, 18.79, 19.5, 23.96, 26.17 s.
| s | Shot | Read |
|---|---|---|
| 0-3.0 | the cubes into the glass | right: 6 cubes (not 8), 6 sharp clinks at 0.10-2.40 s |
| 3.0-4.6 | a cube lifted to the lens | right picture; silent (-41 to -49 dB) and still after 3.7 s |
| 4.6-5.75 | his face, a cube set on the glass | right: face, lenses matte black; no tap on the rim |
| 5.75-7.5 | sugar into the mug | right; quiet; the same picture after 6.75 s |
| 7.5-8.8 | water on the sugar | right |
| 8.8-10.2 | the microwave | a mug with foam, little change after 9.4 s |
| 10.2-11.4 | the chopstick | the stick in ice water; the snap and the crunch never come |
| 11.4-12.5 | a grape into the tray | one grape in the tray, then several in the next shot (continuity) |
| 12.5-14.1 | the syrup poured | right: liquid glass |
| 14.1-15.6 | the tray in ice water | brand-like text «UTENIE» on the wall behind (inside a fridge) |
| 15.6-16.8 | the cubes out | right |
| 16.8-17.75 | the cubes on the slate | right, loud clacks |
| 17.75-18.8 | sparkling water | two glasses; the cubes sink: right |
| 18.8-19.5 | the glass slid to the lens | his head out of frame; the loudest sound of the take (-11.4 dB), above the shatter |
| 19.5-24.0 | the strike | right, in sync (contact 20.25 s, sound 20.30 s); wide (the cube small); the shards settle with no change after 22 s |
| 24.0-26.2 | a cube snapped in two | right: the grape split in clear candy; still and silent after 25.1 s |
| 26.2-30.0 | the bite | right: the crunch at 27.25-28.6 s, the bitten half to the lens at 29-29.9 s; a still hold before the crunch |

## The edit (our own frames, no regeneration, no shake)
- The cut (edits/ice-cubes/cut.py): 17 pieces, only dead frames out (the holds, the silences, the settling); every
  picture kept: 503 frames, 20.96 s. The glass slide -4 dB, so the shatter is the loudest moment (15.15 s in the cut).
- The zoom edit (zoom_pro.py, edits/ice-cubes/spec.json): a different move per shot; the hook a pull-out from 1.45;
  the strike from 1.3 to 1.45, a punch to 1.6 on the contact; the ice-water shot held at 1.5-1.6 with the frame low, so
  the wall text is out of frame; 2-frame blur on the cuts at 6.46, 8.46, 12.67 and 14.33 s.
- Sound: the take's own, +5.6 dB with the house peak-only limiter: -16.7 LUFS, true peak -0.5 dB.
- A (no text): media 9e2148f0. B (the three lines, meme.mjs 46 px, the top band): media 6196f68a.
  - 0-2.92 s «Would you put these in your drink? 🧊» (y 290)
  - 12.67-15.08 s «Ice floats. Why did these sink? 🤔» (y 290)
  - 15.08 s to the end «Because it's candy 🍇 / Send it to the friend you'd prank 😈» (y 275)
- The 0.5 s viewer sheet of B: no box over the food; the strike's spoon hand at the top right touches the right edge of
  the answer box for about 1 s.
