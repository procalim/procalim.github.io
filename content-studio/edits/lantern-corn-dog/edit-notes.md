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
