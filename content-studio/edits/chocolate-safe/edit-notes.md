# The Safe: the read and the cut (2026-11-21)

## The take (job 0f2b3df3, 20.06 s, 720p, seed 350694)
Settings read from the generation history (playbook step 4): the element is in, with four images (the kitchen, the
safe on the board, the remade mug, the melt). The prompt is the single 20 s version
(prompts/w4-chocolate-safe-20s.txt), the whole story in one take, not part 1 of the 20 s + 10 s.
Cuts: 2.83, 4.0, 5.29, 6.54, 8.33, 9.5, 10.67, 11.88, 13.21.
| Time | What | Read |
|---|---|---|
| 0-2.83 | the safe shaken by his face | right: the hook |
| 2.83-4.0 | the spoon coats the mould | right |
| 4.0-5.29 | the freezer | wrong: the whole finished safe is in the freezer, and it turns grey like a metal safe by 4.5 s |
| 5.29-6.54 | the front half out of the mould | right |
| 6.54-8.33 | the cocoa (to 7.2 s), then the fist | wrong from 7.25 s: the fist shows the marshmallows and the gold coins falling in, so the answer shows at 7 s |
| 8.33-9.5 | the edge rubbed on the warm plate | right |
| 9.5-10.67 | the halves pressed shut on the board | right |
| 10.67-11.88 | he sets the safe in the mug | right |
| 11.88-13.21 | the milk heating on the blue flame | right |
| 13.21-20.06 | the pour; the door opens at about 16 s; marshmallows and coins float from about 17.5 s | right; the safe and the coins are small in the frame |

## The cut: 16.46 s, media 2cf7fc25 (sandbox /home/user/short/safe/safe.json)
Out: the freezer (4.0-5.29) and the fist (7.2-8.33), so the inside shows first at about 13 s of the cut. Every other
shot kept at x1, the pour x1.3 until the door starts to open. -17.4 LUFS, true peak -0.9 dB.
Frame sheets read: no metal safe and no early inside.

## Next: part 2 for a longer payoff
The owner: longer is better. Part 2 of prompts/w4-chocolate-safe-20s-plus-10s.txt (10 s: the milk hits, the milk
rises, the door sags, the top caves in, the float) gives the melt five new angles. Its shots go between the take's
pour and the float: about 22-24 s in all.

## The strong edit: zoom in and out, and angle moves (media 2ec6be0e, 16.43 s)
The owner: «زوم إن زوم أوت. وحركات زوايا مختلفة بنفس السيستم. فيديو أقوى شوي، ستايله أحلى شوي». Our own frames from
the 16.46 s cut; edits/_tools/zoom_pro.py with edits/chocolate-safe/safe_zoom_spec.json.
- **The sound's hits:** the six rattles 0.40, 0.85, 1.35, 1.81, 2.29, 2.77; the spoon 3.29; the cocoa 5.31; the seal
  7.49; the clink in the mug 8.68; the pour 11.11; the door and the bubbles 12.59-13.76.
| Shot | Move |
|---|---|
| the shake by his face | a punch-in on every rattle, 1.0 to 1.55, swinging left and right with a 1.5° dutch tilt each way, a shake on each |
| the spoon in the mould | the overhead turns 6° while it pushes in |
| the half out of the mould | a slide from right to left at 1.35 |
| the cocoa | a punch-in on the puff, with a shake |
| the edge on the warm plate | a tilt down at 1.30 |
| the seal | a push to 1.40, a shake on the seal |
| the safe into the mug | from a -3° dutch tilt to level while it pushes in; a punch-in on the clink |
| the milk heating | a pull-out with a 3° turn |
| the pour | wide, then a punch-in on the splash, punches on the door and the bubbles to 1.60, then a pull-out reveal of the coins and marshmallows floating |
Frame sheets read: the moves show in every shot; no black corners; the food stays in frame; it ends wide on the float.
