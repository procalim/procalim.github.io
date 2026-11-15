# Beef Tortilla Skewers: edit notes (2026-11-15)
Take: job e696653a (prompts/w4-beef-tortilla-skewers-20s.txt), 20.04 s, 720x1280, 24 fps, raw -21.9 LUFS.
Edit: edit_skewers.py, cards.json (Higgsfield sandbox /home/user/sk; the sandbox copy checked by md5 against this one).

## The take, read at 2-10 fps
| Take (s) | Shot | Used |
|---|---|---|
| 0.00-1.67 | the cleaver through a whole red pepper, his face behind, two strikes | 0-34 at 1.0x, a punch on the strike |
| 1.67-3.08 | top-down: raw mince in a steel bowl, pepper, onion, parsley, paprika | 40-72 at 2.2x (raw 0.6 s) |
| 3.08-4.04 | kneading, his head out of frame | left out (raw, no face) |
| 4.04-5.13 | the tortilla slapped flat, a knife cut down the middle, then a cleaver into quarters | the slap and the first cut only |
| 5.13-5.92 | the beef spread over square tortillas | 125-142 at 2.0x |
| 5.92-7.33 | the cheese avalanche, the roll | 1.0x and 1.2x |
| 7.33-7.96 | his fist punches the roll; the skewers lie under it | 179-190, a punch on f183 |
| 7.96-8.75 | the rolls cut into pinwheels with raw faces | left out: on the tray the rolls are whole again |
| 8.75-12.46 | oil, the oven seen from inside with his face, the bake | ramp into the door slam (f241), the bake at 1.8x |
| 12.46-14.25 | his face behind the golden tray, steam | 1.8x with a push (1.25x read DEAD, 1.5x SLOW) |
| 14.25-17.50 | the blender (palm f344, roar f355), the green zigzags | 1.2x each |
| 17.50-18.88 | the tear: crackle f423, the cheese pull | 1.0x, the loudest (+6 dB after the compressors) |
| 18.88-19.54 | his bite (crunch f458-463) | 1.0x, a punch on f458 |
| 19.54-20.04 | a red pepper on the board | 8 frames, the loop seam into frame 0 |

## Retention techniques used (the retention engine, CRAFT)
- J-cut: a shot's own sound starts 3 frames before its picture wherever the take shot has 3 frames before the cut point.
- Speed ramps into the door slam; real time on every impact; a 6% punch-in with a 2-frame shake on each impact.
- Sound: the drizzle's quiet tail plus a -9 dB dip for 0.25 s before the tear; the tear +6 dB; the last 3 s +2 dB;
  -1.5 dBTP with oversampling.
- Cards flat as shawarma v1 (no animated entrance: v2 had one and read worse).
- Versions A and B differ only in the hook card (0-2.75 s).
