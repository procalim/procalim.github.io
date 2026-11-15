# Beef Shawarma, the completion cut (2026-11-15; owner: «المهم والي لازم ينعمل انو نخلي المشاهد يكمل»). Source: the v1 take
# (job 53be7e0c), the v1 cards and sound chain. v1 read: 94 / 81 / 68% at 1-3 s, -22 points at 3-5 s (the toss and the raw
# tower), then about -2 points a second to 26% at the end of 15.75 s. Here only the pace changes: raw meat never fills the
# frame for more than about 0.6 s at a time, every middle shot 0.5-0.75 s, the shave and the cut kept long, 12.5 s.
import subprocess, re
FPS = 24
SRC = 'raw.mp4'
SEGS = [  # (first frame, end frame, speed, label[, push-in]); the v1 take's cut points
    (0, 34, 1.0, 'the cleaver', (1.0, 1.06)),   # v1's opening kept whole: 94 / 81% at 1-2 s
    (40, 64, 1.6, 'slices and spices'),
    (64, 78, 2.0, 'the lemon'),
    (82, 100, 1.0, 'the toss', (1.0, 1.05)),   # the apex and the slap only
    (110, 146, 3.0, 'the tower'),   # v1 at 1.6x: the raw tower on screen 0.92 s
    (146, 166, 1.3, 'the oven'),
    (166, 200, 2.5, 'roasting', (1.0, 1.08)),
    (200, 232, 1.8, 'out of the oven'),
    (232, 276, 1.2, 'the shave', (1.0, 1.06)),
    (276, 304, 1.6, 'the sear'),
    (304, 324, 1.3, 'the bread'),
    (324, 356, 2.0, 'the toum and the filling'),
    (356, 382, 1.8, 'the roll'),
    (382, 418, 2.6, 'the press', (1.0, 1.08)),
    (418, 442, 1.0, 'the cut'),
    (442, 468, 1.0, 'his bite', (1.0, 1.08)),
]
LIFT_LABEL = 'the cut'   # the cleaver through the crisp roll: +6 dB after the compressors over its first 0.6 s


def vchain(zm, n):
    if not zm: return 'scale=1080:1920:flags=lanczos,setsar=1'
    z0, z1 = zm[0]
    return (f"scale=2160:3840:flags=lanczos,zoompan=z='{z0}+({z1}-{z0})*on/{max(n - 1, 1)}':x='(iw-iw/zoom)/2':"
            f"y='(ih-ih/zoom)/2':d=1:s=1080x1920:fps={FPS},setsar=1")


def tempo(sp):
    if sp == 1.0: return ''
    if sp > 2.0: return f',atempo=2.0,atempo={sp / 2.0:.4f}'
    return f',atempo={sp}'


def run(c): subprocess.run(c, check=True)


def meas(f):
    e = subprocess.run(['ffmpeg', '-hide_banner', '-i', f, '-af', 'ebur128=peak=true', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    s = e[e.rindex('Summary'):]
    return float(re.search(r'I:\s+(-?[\d.]+)', s).group(1)), float(re.search(r'Peak:\s+(-?[\d.]+)', s).group(1))


labels, t = [], 0.0
for i, (f0, f1, sp, lab, *zm) in enumerate(SEGS):
    n = round((f1 - f0) / sp); d = n / FPS
    run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-vf',
         f'trim=start_frame={f0}:end_frame={f1},setpts=(PTS-STARTPTS)/{sp},fps={FPS},trim=end_frame={n},setpts=PTS-STARTPTS,'
         + vchain(zm, n),
         '-an', '-c:v', 'libx264', '-qp', '0', '-preset', 'ultrafast', '-pix_fmt', 'yuv420p', '-frames:v', str(n), f'seg{i:02d}.mkv'])
    run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-vn', '-af',
         f'atrim={f0 / FPS:.5f}:{f1 / FPS:.5f},asetpts=PTS-STARTPTS{tempo(sp)},aresample=48000,aformat=channel_layouts=mono,'
         f'apad,atrim=end={d:.5f},afade=t=in:d=0.01,afade=t=out:st={d - 0.01:.5f}:d=0.01', '-c:a', 'pcm_s16le', f'seg{i:02d}.wav'])
    labels.append((t, t + d, lab)); t += d
TOTAL = t
L = {lab: (s, e) for s, e, lab in labels}
open('vlist.txt', 'w').write(''.join(f"file 'seg{i:02d}.mkv'\n" for i in range(len(SEGS))))
open('alist.txt', 'w').write(''.join(f"file 'seg{i:02d}.wav'\n" for i in range(len(SEGS))))
run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-i', 'vlist.txt', '-c', 'copy', 'cut.mkv'])
run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-i', 'alist.txt', '-af',
     'dynaudnorm=f=150:g=5:p=0.9:m=12,'
     'acompressor=threshold=-30dB:ratio=4:attack=4:release=150:makeup=1,acompressor=threshold=-18dB:ratio=3:attack=2:release=80',
     '-c:a', 'pcm_s16le', 'mix.wav'])
I, P = meas('mix.wav'); g0 = -17.5 - I
run(['ffmpeg', '-v', 'error', '-y', '-i', 'mix.wav', '-af', f'volume={g0:.2f}dB,alimiter=limit=0.80:attack=2:release=60:level=disabled', 'mix2.wav'])
I2, P2 = meas('mix2.wav'); g = -17.5 - I2   # mono at -17.5 = stereo -14.5
CARDS = [  # v1's cards and order, re-timed to the shorter cut
         ('ov_hook.png', 0.0, L['the tower'][0]),
         ('ov_c2.png', L['the tower'][0], L['the shave'][0]),
         ('ov_c3.png', L['the shave'][0], L['the sear'][0]),
         ('ov_c4.png', L['the sear'][0], L['the toum and the filling'][0]),
         ('ov_c5.png', L['the toum and the filling'][0], L['the cut'][0]),
         ('ov_cta.png', L['the cut'][0], TOTAL)]
ins = ['-i', 'cut.mkv']
fc = ['[0:v]setsar=1,format=yuv420p[b0]']
last = 'b0'
for k, (png, s, e) in enumerate(CARDS):
    ins += ['-loop', '1', '-t', f'{TOTAL:.4f}', '-r', str(FPS), '-i', png]
    fc.append(f"[{last}][{k + 1}:v]overlay=0:0:enable='between(t,{s:.4f},{e - 0.001:.4f})':eof_action=pass[o{k}]"); last = f'o{k}'
fc.append(f'[{last}]format=yuv420p[v]')
SHAPE = (f"volume=6dB:enable='between(t,{L[LIFT_LABEL][0]:.3f},{L[LIFT_LABEL][0] + 0.6:.3f})',"   # the cut: the loudest
         f"volume=-4dB:enable='between(t,{L['the toss'][0]:.3f},{L['the toss'][1]:.3f})',"   # v1: the toss 77.6 dB, the cut 73
         f"volume=-3dB:enable='between(t,{L['roasting'][0]:.3f},{L['roasting'][1]:.3f})',")   # after the compressors, v2
fc.append(f'[{len(CARDS) + 1}:a]volume={g:.2f}dB,' + SHAPE + 'alimiter=limit=0.82:attack=2:release=60:level=disabled,aresample=48000,pan=stereo|c0=c0|c1=c0[ao]')
ins += ['-i', 'mix2.wav']
run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '[ao]',
     '-frames:v', str(round(TOTAL * FPS)),
     '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
     '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv', '-r', str(FPS),
     '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', 'beef-shawarma-completion.mp4'])
for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
print('cards', [(c, round(s, 2), round(e, 2)) for c, s, e in CARDS])
print('total', round(TOTAL, 3), 'mix', I, P, 'final', meas('beef-shawarma-completion.mp4'))
