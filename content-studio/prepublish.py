# Pre-publish scroll-risk check for a finished reel. Run on every video before it is delivered;
# every flag, anywhere in the reel, gets fixed, not only the first 3 s.
# Usage: python3 prepublish.py reel.mp4 [--source raw.mp4] [--band 640 830]
# Per half second it reports motion, cuts, loudness and how light the background is under the text
# band, then flags the moments where a viewer is most likely to scroll:
#   DEAD   no cut and motion under 5 (the fettuccine opening that lost half the viewers read 4.8)
#   SLOW   no cut and motion under 8 (a soft spot, fix it too)
#   LONG   inside a shot that has run more than 2 s
#   QUIET  audio more than 10 dB below the reel's median
#   EARLY  any of the above inside the first 3 s (counts double: that is where reels are lost)
# --source is the clip without text, for the background check; the band is the text's y range.
import argparse, subprocess, numpy as np, imageio_ffmpeg

ap = argparse.ArgumentParser()
ap.add_argument("video")
ap.add_argument("--source")
ap.add_argument("--band", nargs=2, type=int, default=[640, 830])
a = ap.parse_args()
F = imageio_ffmpeg.get_ffmpeg_exe()
W, H, FPS, WIN = 108, 192, 12, 0.5


def frames(path):
    raw = subprocess.run([F, "-v", "error", "-i", path, "-vf", f"fps={FPS},scale={W}:{H},format=gray",
                          "-f", "rawvideo", "-"], capture_output=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(float)


fr = frames(a.video)
diff = np.abs(np.diff(fr, axis=0)).mean(axis=(1, 2))
cuts = [(i + 1) / FPS for i, v in enumerate(diff) if v > 25]
dur = len(fr) / FPS

pcm = subprocess.run([F, "-v", "error", "-i", a.video, "-ac", "1", "-ar", "8000", "-f", "s16le", "-"],
                     capture_output=True).stdout
aud = np.frombuffer(pcm, np.int16).astype(float)

bg = frames(a.source) if a.source else fr
y0, y1 = int(a.band[0] * H / 1920), int(a.band[1] * H / 1920)

rows, n = [], int(np.ceil(dur / WIN))
for k in range(n):
    t0, t1 = k * WIN, min((k + 1) * WIN, dur)
    if t1 - t0 < 0.25:          # a sliver at the very end has no frames to compare
        continue
    s0, s1 = int(t0 * FPS), max(int(t1 * FPS), int(t0 * FPS) + 1)
    motion = diff[s0:s1].mean() if s1 <= len(diff) else diff[s0:].mean() if s0 < len(diff) else 0
    cut = any(t0 <= c < t1 for c in cuts)
    seg = aud[int(t0 * 8000):int(t1 * 8000)]
    db = 20 * np.log10(np.sqrt((seg ** 2).mean()) + 1) if len(seg) else 0
    last = max([c for c in cuts if c <= t1] or [0])
    luma = bg[s0:s1, y0:y1].mean() if s0 < len(bg) else 0
    rows.append(dict(t=t0, motion=motion, cut=cut, db=db, shot=t1 - last, luma=luma))

med_m = np.median([r["motion"] for r in rows])
med_db = np.median([r["db"] for r in rows])
print(f"duration {dur:.2f}s, {len(cuts)} cuts, median motion {med_m:.1f}, median level {med_db:.1f} dB")
risky = []
for r in rows:
    flags = []
    if r["motion"] < 5 and not r["cut"]:
        flags.append("DEAD")
    elif r["motion"] < 8 and not r["cut"]:
        flags.append("SLOW")
    if r["shot"] > 2.0 and not r["cut"]:
        flags.append("LONG")
    if r["db"] < med_db - 10:
        flags.append("QUIET")
    score = len(flags) * (2 if r["t"] < 3 else 1)
    if r["t"] < 3 and flags:
        flags.append("EARLY")
    light = "light bg" if r["luma"] > 170 else ""
    print(f"{r['t']:5.1f}s motion {r['motion']:5.1f} {'cut' if r['cut'] else '   '} "
          f"audio {r['db']:5.1f}dB shot {r['shot']:4.1f}s under-text luma {r['luma']:5.1f} {light:8s} "
          f"{'RISK ' + str(score) + ' ' + ' '.join(flags) if flags else 'ok'}")
    if flags:
        risky.append(r["t"])
print("scroll-risk moments:", ", ".join(f"{t:.1f}s" for t in risky) or "none")
