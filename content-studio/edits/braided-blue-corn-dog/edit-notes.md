# Braided Blue Corn Dog: the edit (2026-11-21)
- **The take:** job 29651fd2, the whole take, no trims; 24 fps, 1080x1920; the take's own sound.
  - Level: -15.1 LUFS, true peak -0.9 dB, range 14.4 dB.
  - The opening: 6 onsets in 0-3 s.
- **The meme lines** (meme.mjs, black on a white box):
  - «POV: your daughter / braided dinner» in the middle, 0-3.5 s;
  - «Send this to the friend / who does your braids» at the top, from 15.96 s (the pull) to the end.
- **The one change from the chain** (the chain's 1 share and the lantern's 1 share): the end card is a send line naming
  a person, not the comment ask. The comment ask (BRAID) moves to the caption and the pinned comment. The full recipe
  is in the caption, because the lantern's saves doubled after its recipe went into the caption.
- **Final:** media a228aa50, 20.08 s.

## The 14 s cut (2026-11-21; the owner: «المشكلة في الإكمال ... الإكمال فقط 8%»)
- **Why:** the lantern lost about 2 points a second after 8 s, and the batter shot was its steepest drop (8.6 a
  second); the chain's average watch was 6 s of 20.
- **What goes:** the freezer and the 6-ingredient batter shot; they stay in the caption recipe.
- **Speeds:** the range x1.7, the sugar x1.5.
- **Result:** 20.1 s becomes 14.3 s; the pull starts at 10.21 s; the send card from 10.22 s. Media e7c18565.
- **Script:** edits/_tools/short_edit.py, the spec in the sandbox /home/user/short/b/braid.json.

## The top cut, 13.3 s (2026-11-21; the owner: «نفس مكان pov خاطء ... قم بتحسين مكان الهووك ... افعل ما يتطلبه بالجدول»)
- **Why:**
  - The 14 s chain trial skipped 34.3% "Higher" (2,036 viewers, average watch 6 s, 0 shares). Its POV box sat in the
    middle, over the hand and the chain, under the play button.
  - The lantern with no text: 22.9%.
- **What changed (THE TABLE in reels-director, row by row):**
  1. Skip: «POV: your daughter braided dinner» in one line, 46 px, centred on y 290 (band about 245-335), 0-3.5 s.
     A strip of 8 frames (0-3.4 s) shows it on his chin and neck, clear of the braid and the gloves.
  2. Share: «Send this to the friend / who does your braids», 2 lines, 46 px, centred on y 275, from the pull (9.21 s)
     to the end. It covers only the skewer's tip.
  3. Like: the bite before the pull is gone (COMPLETION ENGINE rule 5); the reel ends on the longest stretch.
- **Spec:** the 14 s spec with the bite segment (14.833-15.833) removed and the two new overlays (sandbox
  /home/user/short/b2/braid2.json; the overlays from edits/_tools/meme.mjs).
- **Result:** 13.33 s, 1080x1920, 24 fps, -15.2 LUFS, true peak -0.9 dB. The pull starts at 9.21 s. Media beb7bde5.
