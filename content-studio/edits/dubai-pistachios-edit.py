# Dubai Chocolate Pistachios edit (2026-11-05). Source: one 15 s Seedance 2.5 clip (job 311eee66), gen.mp4.
# Run where gen.mp4 and ov/ (overlays from dubai-pistachios-cards.json via overlay.mjs) are. Rendered on the
# Higgsfield sandbox (the local network blocks the CDN). Result: 11.125 s, -14.7 LUFS, peak -1.1 dBFS.
# prepublish.py: one SLOW at 9.5 s (the snap macro, the money shot); every other flag fixed.
import subprocess, os, json
FPS = 24
SEGS = [  # (first frame, end frame, speed, label[, gain dB])
    (6, 30, 2.5, "pour (face)"),
    (30, 69, 1.0, "brush shells (face)"),
    (69, 94, 1.0, "kataifi into the butter"),
    (94, 130, 1.0, "toasting"),
    (130, 161, 1.0, "bowl: cream + tahini"),
    (161, 177, 1.0, "mixing"),
    (177, 236, 2.2, "fill + seal + swipe"),
    (236, 285, 1.4, "mold flip, 3 standing", 6),
    (285, 304, 1.2, "the snap", 3),
    (304, 340, 2.0, "opening, green center"),
    (340, 361, 1.5, "presents the halves (face)"),
]
fc, parts, labels, t = [], [], [], 0.0
for i, (f0, f1, sp, lab, *g) in enumerate(SEGS):
    n_out = round((f1 - f0) / sp); d = n_out / FPS
    fc.append(f"[0:v]trim=start_frame={f0}:end_frame={f1},setpts=(PTS-STARTPTS)/{sp},fps={FPS},trim=end_frame={n_out},setpts=PTS-STARTPTS[v{i}]")
    tempo = (f",atempo={sp}" if sp != 1.0 else "") + (f",volume={g[0]}dB" if g else "")
    fc.append(f"[0:a]atrim={f0/FPS:.5f}:{f1/FPS:.5f},asetpts=PTS-STARTPTS{tempo},apad,atrim=end={d:.5f},afade=t=in:d=0.008,afade=t=out:st={d-0.008:.5f}:d=0.008[a{i}]")
    parts.append(f"[v{i}][a{i}]"); labels.append((t, t + d, lab)); t += d
total = t
fc.append("".join(parts) + f"concat=n={len(SEGS)}:v=1:a=1[cv][ca]")
enc = ["-c:v", "libx264", "-preset", "slow", "-crf", "16", "-pix_fmt", "yuv420p", "-profile:v", "high", "-r", str(FPS), "-movflags", "+faststart"]
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", "gen.mp4", "-filter_complex", ";".join(fc), "-map", "[cv]", "-map", "[ca]"] + enc + ["-c:a", "pcm_s16le", "notext.mov"], check=True)
def lufs(chain):
    m = subprocess.run(["ffmpeg", "-nostats", "-i", "notext.mov", "-af", chain + ",ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    return float(m.split("Integrated loudness:")[1].split("I:")[1].split("LUFS")[0])
gain = 2.0
for _ in range(5):
    ln = f"acompressor=threshold=-24dB:ratio=3:attack=5:release=90:makeup=1,volume={gain:.2f}dB,alimiter=limit=0.79:level=false"
    got = lufs(ln)
    if abs(got + 14.5) < 0.2: break
    gain += -14.5 - got
print("loudness", got, "gain", round(gain, 2))
L = {lab: (s, e) for s, e, lab in labels}
CARDS = [("c1", 0.0, L["brush shells (face)"][1]),
         ("c2", L["kataifi into the butter"][0], L["toasting"][1]),
         ("c3", L["mold flip, 3 standing"][0], L["mold flip, 3 standing"][1]),
         ("c5", L["opening, green center"][0], None)]
ins = ["-i", "notext.mov"]; fc2, last = [], "[0:v]"
for k, (name, s, e) in enumerate(CARDS):
    ins += ["-loop", "1", "-i", f"ov/ov_{name}.png"]
    e = total if e is None else e
    fc2.append(f"{last}[{k+1}:v]overlay=0:0:enable='between(t,{s:.3f},{e:.3f})':shortest=1[o{k}]"); last = f"[o{k}]"
fc2.append(f"[0:a]{ln},aresample=48000[a]")
subprocess.run(["ffmpeg", "-v", "error", "-y"] + ins + ["-filter_complex", ";".join(fc2), "-map", last, "-map", "[a]", "-t", f"{total:.4f}"] + enc + ["-c:a", "aac", "-b:a", "192k", "final.mp4"], check=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", "notext.mov", "-c:v", "copy", "-af", f"{ln},aresample=48000", "-c:a", "aac", "-b:a", "192k", "notext.mp4"], check=True)
for s, e, lab in labels: print(f"{s:6.2f}-{e:6.2f}  {lab}")
print("cards", [(n, round(s, 2), round(e, 2) if e else 'end') for n, s, e in CARDS]); print("total", round(total, 3))
