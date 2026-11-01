# Kibbeh Nests edit on the sweet potato strategy: pull-apart flash first, soft stretches sped up,
# the 4-nest board shot dropped (count error), the knife at the end runs into the flash.
# Usage: python3 edit.py  -> notext.mp4 (no cards) and final.mp4 (cards, -14.5 LUFS)
import json, subprocess, os
here = os.path.dirname(os.path.abspath(__file__))
os.chdir(here)
FPS = 24
# (input index, first frame, end frame (exclusive), speed, label[, gain dB])
SEGS = [
    (1, 94, 120, 1.3, "flash: pull-apart"),
    (0, 0, 28, 1.25, "processor"),
    (0, 28, 52, 1.4, "paste slapped on the plate"),
    (0, 52, 67, 1.0, "lamb + pine nuts hit the pan"),
    (0, 67, 96, 1.5, "browning + stir"),
    (0, 96, 116, 1.3, "palm flattens the shell"),
    (0, 116, 137, 1.3, "spoon of filling", 8),
    (0, 137, 164, 1.3, "fold and seal", 8),
    (0, 164, 182, 1.5, "sealed ball in the palm"),
    (0, 182, 209, 1.35, "ricer strands"),
    (0, 209, 224, 1.0, "roll in the strands"),
    (1, 13, 43, 1.25, "3 nests into the oil"),
    (1, 43, 67, 1.25, "frying, the turn"),
    (1, 67, 86, 1.5, "knife cut (runs into the flash)"),
]

parts, labels, t = [], [], 0.0
fc = []
for i, (src, f0, f1, sp, lab, *g) in enumerate(SEGS):
    n_out = round((f1 - f0) / sp)
    d = n_out / FPS
    fc.append(f"[{src}:v]trim=start_frame={f0}:end_frame={f1},setpts=(PTS-STARTPTS)/{sp},fps={FPS},"
              f"trim=end_frame={n_out},setpts=PTS-STARTPTS[v{i}]")
    a0, a1 = f0 / FPS, f1 / FPS
    tempo = (f",atempo={sp}" if sp != 1.0 else "") + (f",volume={g[0]}dB" if g else "")
    fc.append(f"[{src}:a]atrim={a0:.5f}:{a1:.5f},asetpts=PTS-STARTPTS{tempo},apad,atrim=end={d:.5f},"
              f"afade=t=in:d=0.008,afade=t=out:st={d-0.008:.5f}:d=0.008[a{i}]")
    parts.append(f"[v{i}][a{i}]")
    labels.append((t, t + d, lab))
    t += d
total = t
fc.append("".join(parts) + f"concat=n={len(SEGS)}:v=1:a=1[cv][cc]")
# the reveal had a weak crackle: lay the knife crunch from the same nest (p2 3.00-3.45 s) on the crack
fc.append("[1:a]atrim=3.0:3.45,asetpts=PTS-STARTPTS,volume=-2dB,adelay=30|30[cr]")
fc.append("[cc][cr]amix=inputs=2:normalize=0:duration=first[ca]")
start = {lab: (s0, e0) for s0, e0, lab in labels}
ricer, oil = start["ricer strands"][0], start["3 nests into the oil"][0]
CARDS = [("c1", 0.0, 3.0), ("c2", 3.08, ricer - 0.04), ("c3", ricer, oil + 0.45), ("c4", oil + 0.5, None)]
base = ["ffmpeg", "-v", "error", "-y", "-i", "in/p1.mp4", "-i", "in/p2.mp4"]
enc = ["-c:v", "libx264", "-preset", "slow", "-crf", "16", "-pix_fmt", "yuv420p", "-profile:v", "high",
       "-r", str(FPS), "-movflags", "+faststart"]

# 1) no-text cut (for the background check), audio untouched
subprocess.run(base + ["-filter_complex", ";".join(fc), "-map", "[cv]", "-map", "[ca]"] + enc +
               ["-c:a", "pcm_s16le", "notext.mov"], check=True)

# 2) loudness: compressor + gain into a brick-wall limiter, gain solved for -14.5 LUFS
def lufs(chain):
    m = subprocess.run(["ffmpeg", "-nostats", "-i", "notext.mov", "-af", chain + ",ebur128", "-f", "null", "-"],
                       capture_output=True, text=True).stderr
    return float(m.split("Integrated loudness:")[1].split("I:")[1].split("LUFS")[0])
gain = 4.0
for _ in range(4):
    ln = f"acompressor=threshold=-24dB:ratio=3:attack=5:release=90:makeup=1,volume={gain:.2f}dB,alimiter=limit=0.79:level=false"
    got = lufs(ln)
    if abs(got + 14.5) < 0.2:
        break
    gain += -14.5 - got
print("loudness", got, "gain", round(gain, 2))

# 3) cards on top
ins = ["-i", "notext.mov"]
fc2, last = [], "[0:v]"
for k, (name, s, e) in enumerate(CARDS):
    ins += ["-loop", "1", "-i", f"{os.environ.get('OV', 'ov')}/ov_{name}.png"]
    e = total if e is None else e
    out = f"[o{k}]"
    fc2.append(f"{last}[{k+1}:v]overlay=0:0:enable='between(t,{s},{e})':shortest=1{out}")
    last = out
fc2.append(f"[0:a]{ln},aresample=48000[a]")
subprocess.run(["ffmpeg", "-v", "error", "-y"] + ins + ["-filter_complex", ";".join(fc2), "-map", last, "-map", "[a]",
               "-t", f"{total:.4f}"] + enc + ["-c:a", "aac", "-b:a", "192k", os.environ.get("OUT", "final.mp4")], check=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", "notext.mov", "-c:v", "copy", "-af", f"{ln},aresample=48000",
                "-c:a", "aac", "-b:a", "192k", "notext.mp4"], check=True)
for s, e, lab in labels:
    print(f"{s:6.2f}-{e:6.2f}  {lab}")
print("total", round(total, 3))
