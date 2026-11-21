# Short cut of one take (2026-11-21, owner: «المشكلة في الإكمال ... الإكمال فقط 8%»): chosen segments with speeds, meme
# overlays, 24 fps, 1080x1920, the take's own sound (respace() on a speed change), -16 LUFS, the peak-only limiter.
# Sandbox copy: /home/user/short/short_edit.py. Usage: python3 short_edit.py spec.json
# spec: {take, out, segs: [[t0, t1, speed]...], overlays: [[png, start, end|null]]}
import sys, json, subprocess, numpy as np
sys.path.insert(0, '/home/user/rv')
from steps_edit import respace, meas, rd, wr, LIM, SR
FPS = 24
run = lambda c: subprocess.run(c, check=True)
S = json.load(open(sys.argv[1]))
vl, pieces, t, starts = [], [], 0.0, []
for i, (a, b, sp) in enumerate(S['segs']):
    n = round((b - a) / sp * FPS); starts.append(t)
    run(['ffmpeg', '-v', 'error', '-y', '-i', S['take'], '-filter_complex',
         f'[0:v]trim={a}:{b},setpts=(PTS-STARTPTS)/{sp},fps={FPS},scale=1080:1920:flags=lanczos,setsar=1,format=yuv420p[v]',
         '-map', '[v]', '-an', '-c:v', 'libx264', '-qp', '0', '-preset', 'ultrafast', '-frames:v', str(n), '-r', str(FPS), f's{i:02d}.mkv'])
    run(['ffmpeg', '-v', 'error', '-y', '-i', S['take'], '-vn', '-af', f'atrim={a}:{b},asetpts=PTS-STARTPTS,aresample={SR},aformat=channel_layouts=mono', '-c:a', 'pcm_s16le', f's{i:02d}.wav'])
    raw, n_out = rd(f's{i:02d}.wav'), int(round(n / FPS * SR))
    x = respace(raw, sp, n_out) if sp != 1.0 else np.pad(raw, (0, max(0, n_out - len(raw))))[:n_out]
    f = int(0.008 * SR); x[:f] *= np.linspace(0, 1, f); x[-f:] *= np.linspace(1, 0, f)
    pieces.append(x); vl.append(f's{i:02d}.mkv'); t += n / FPS
    print(f'seg {i}: {a}-{b} x{sp} -> {starts[-1]:.2f}-{t:.2f}')
open('vl.txt', 'w').write(''.join(f"file '{v}'\n" for v in vl))
run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-i', 'vl.txt', '-c', 'copy', 'cut.mkv'])
wr('mix.wav', np.concatenate(pieces)); I, P = meas('mix.wav'); g = -16.0 - I
ins, fc, last = ['-i', 'cut.mkv', '-i', 'mix.wav'], [], '0:v'
for k, (png, s, e) in enumerate(S['overlays']):
    ins += ['-loop', '1', '-i', png]
    en = f"between(t,{s},{e})" if e is not None else f"gte(t,{s})"
    fc.append(f"[{last}][{k + 2}:v]overlay=0:0:enable='{en}'[o{k}]"); last = f'o{k}'
fc.append(f'[{last}]format=yuv420p[v]')
fc.append(f'[1:a]volume={g:.2f}dB,{LIM},pan=stereo|c0=c0|c1=c0[a]')
run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '[a]', '-t', f'{t:.3f}', '-r', str(FPS),
     '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-color_primaries', 'bt709',
     '-color_trc', 'bt709', '-colorspace', 'bt709', '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', S['out']])
print('total', round(t, 2), 'final', meas(S['out']), 'starts', [round(x, 2) for x in starts])
