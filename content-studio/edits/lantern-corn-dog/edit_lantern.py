# Lantern Corn Dog edit (2026-11-19): the owner's two takes joined, no text, no trims; the 58M reel as the reference
# (no text, the food's own sound, a shot about every 1.2 s: only the 4.25 s batter shot is sped up, by 1.6).
# 24 fps as the reference, 1080x1920 (lanczos); the takes' own sound, a speed change by respace(), -16 LUFS (the reference's level),
# the peak-only limiter. Usage (Higgsfield sandbox, /home/user/lcd): python3 edit_lantern.py out.mp4 p1.mp4 [p2.mp4]
# Takes: p1 = job b5647007 (20 s), p2 = part 2 (10 s, prompts/w4-lantern-corn-dog-20s-plus-10s.txt).
import sys, subprocess, numpy as np
sys.path.insert(0, '/home/user/rv')
from steps_edit import respace, meas, rd, wr, LIM, FIN, SR
FPS = 24                                  # the 58M reel's own rate (owner: «مش 60 ... الفيديو تبعو 24»)
MI = 'fps=24'                             # no interpolation; a speed change drops frames
TARGET = -16.0                            # the 58M reel measured -15.9 LUFS
def run(c): subprocess.run(c, check=True)
def cuts(take):
    e = subprocess.run(['ffmpeg', '-v', 'info', '-i', take, '-vf', 'scdet=threshold=10', '-an', '-f', 'null', '-'], capture_output=True, text=True).stderr
    t = [float(x) for x in __import__('re').findall(r'lavfi.scd.time: ([\d.]+)', e)]
    n = int(subprocess.run(['ffprobe', '-v', 'error', '-count_frames', '-select_streams', 'v:0', '-show_entries', 'stream=nb_read_frames', '-of', 'csv=p=0', take], capture_output=True, text=True).stdout.strip())
    b = [0] + [round(x * FIN) for x in t] + [n]
    return list(zip(b[:-1], b[1:]))
out, takes = sys.argv[1], sys.argv[2:]
SPEED = {('p1.mp4', 199): 1.6}            # the batter shot only
END = {('p1.mp4', 144): 144}             # owner: the corn dog never goes in, the door closes on it in his hand: the open-door shot out
segs = [(tk, f0, END.get((tk, f0), f1), SPEED.get((tk, f0), 1.0)) for tk in takes for f0, f1 in cuts(tk)]
segs = [x for x in segs if x[2] > x[1]]
from concurrent.futures import ThreadPoolExecutor
import os
jobs = []
for i, (tk, f0, f1, sp) in enumerate(segs):
    n = round((f1 - f0) / sp / FIN * FPS)
    jobs.append(['ffmpeg', '-v', 'error', '-y', '-i', tk, '-filter_complex',
         f'[0:v]trim=start_frame={f0}:end_frame={f1},setpts=(PTS-STARTPTS)/{sp},{MI},scale=1080:1920:flags=lanczos,setsar=1,format=yuv420p[v]',
         '-map', '[v]', '-an', '-c:v', 'libx264', '-qp', '0', '-preset', 'ultrafast', '-frames:v', str(n), '-r', str(FPS), f'v{i:02d}.mkv'])
with ThreadPoolExecutor(os.cpu_count()) as ex: list(ex.map(run, jobs))
vl, pieces = [], []
for i, (tk, f0, f1, sp) in enumerate(segs):
    n = round((f1 - f0) / sp / FIN * FPS)
    fn = f'v{i:02d}.mkv'
    if False: run(['ffmpeg', '-v', 'error', '-y', '-i', tk, '-filter_complex',
         f'[0:v]trim=start_frame={f0}:end_frame={f1},setpts=(PTS-STARTPTS)/{sp},{MI},scale=1080:1920:flags=lanczos,setsar=1,format=yuv420p[v]',
         '-map', '[v]', '-an', '-c:v', 'libx264', '-qp', '0', '-preset', 'ultrafast', '-frames:v', str(n), '-r', str(FPS), fn])
    vl.append(fn)
    run(['ffmpeg', '-v', 'error', '-y', '-i', tk, '-vn', '-af', f'atrim={f0 / FIN:.5f}:{f1 / FIN:.5f},asetpts=PTS-STARTPTS,aresample={SR},aformat=channel_layouts=mono', '-c:a', 'pcm_s16le', f'a{i:02d}.wav'])
    raw, n_out = rd(f'a{i:02d}.wav'), int(round(n / FPS * SR))
    a = respace(raw, sp, n_out) if sp != 1.0 else np.pad(raw, (0, max(0, n_out - len(raw))))[:n_out]
    f = int(0.01 * SR); a[:f] *= np.linspace(0, 1, f); a[-f:] *= np.linspace(1, 0, f)
    pieces.append(a); print(f'{tk} {f0}-{f1} x{sp} -> {n / FPS:.2f} s')
open('vl.txt', 'w').write(''.join(f"file '{x}'\n" for x in vl))
run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-i', 'vl.txt', '-c', 'copy', 'cut.mkv'])
wr('mix.wav', np.concatenate(pieces))
I, P = meas('mix.wav'); g = TARGET - I
run(['ffmpeg', '-v', 'error', '-y', '-i', 'cut.mkv', '-i', 'mix.wav', '-filter_complex', f'[1:a]volume={g:.2f}dB,{LIM},pan=stereo|c0=c0|c1=c0[a]',
     '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
     '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-r', str(FPS), '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', '-shortest', out])
print('mix', I, P, 'final', meas(out))
