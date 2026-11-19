# Lantern Corn Dog: the edit (2026-11-19)
- **Takes:** part 1 job b5647007 (20.06 s) and part 2 job d6f6963c (10.05 s, starting from part 1's last frame).
- **The edit (edit_lantern.py, Higgsfield sandbox /home/user/lcd):**
  - The two takes are joined at the oil shot.
  - No text, no trims (owner: «ما تلعب في ما فيو اشي»).
  - Only the 4.25 s batter shot is sped up, by 1.6, to 2.67 s. This follows the reference's shot length of about
    1.2 s; the other shots already run 0.5-2.9 s.
  - 24 fps, as the 58M reel (owner: «مش 60 ... الفيديو تبعو 24»), and 1080x1920 (lanczos).
  - The takes' own sound. The sped shot's sound goes through respace(). The level is -16 LUFS, the reference's level
    (it measured -15.9), with the peak-only limiter.
- **Final:** media 53d84175, 28.5 s, 1080x1920, 24 fps.
  - Sound: -15.8 LUFS, true peak -0.9 dB, range 20.2 dB (dr.py).
  - open3.py: 6 onsets in 0-3 s (the casing snaps), calm motion (4.2).
  - The join at 19.9-20.0 s: the same lantern in the oil on both sides.
- **Package:** week4/lantern-corn-dog-package.txt (keyword «فانوس»).
- **v2:** the owner's catch: «سكر باب الثلاجة والكورن دوغ لسا بايدي وبدها ببين جو الفريزر».
  - Part 1 frames 156-169 (6.5-7.0 s) show the freezer door closing while the corn dog is still in his hand.
  - The wide freezer shot now ends at frame 156: the door is open and the corn dog is in his hand. The cut goes
    straight to the inside of the freezer, where the frost grows on the corn dog.
  - 14 frames out (0.58 s).
  - v2 final: media 652052da, 27.9 s, 1080x1920, 24 fps; -15.7 LUFS, true peak -0.8 dB, range 19.0 dB; 6 onsets in
    0-3 s. Read at 4.8-7.2 s: the door opens with the corn dog in his hand, then the cut to the frost.
- **v3:** the owner: «برضو لسى موجودة ومبينة».
  - The corn dog never goes into the freezer in the take, so every open-door frame shows it still in his hand.
  - The whole open-door shot (part 1 frames 144-169) is out.
  - The order is now: the wide shot of him holding the skewer (door shut), then the frost inside the freezer.
  - Media 99852270: 27.4 s, 1080x1920, 24 fps, -15.7 LUFS, true peak -1.0 dB, range 18.9 dB.
