# Baked Aubergine Chicken Stacks (16 Nov 3 pm). Source: raw.mp4 = job d9d55536 (Seedance 2.5 omni reference, prompt v2
# after v1 was refused as restricted; fiteat.rima's 3.5M reel trimmed past its first shot as @Video1). The v4 method: the hook
# centred from frame 0 over the slicing, the rehook over the build, the keyword over the plate; the raw take's 7 still
# stretches (the crumbs, the parsley, the held stack) at 2.0-2.2x with push-ins.
import subprocess, re
FPS = 24
SRC = 'raw.mp4'
SEGS = [  # (first frame, end frame, speed, label[, push-in]); cut points from the measured source cuts
    (0, 8, 1.0, 'the knife trims the top'),
    (8, 34, 1.4, 'the slices'),
    (36, 50, 1.2, 'the slices fan out'),
    (52, 68, 1.2, 'cheese on the rounds'),
    (76, 88, 1.0, 'the filling spooned'),
    (92, 106, 1.3, 'the filling spread'),
    (108, 118, 1.0, 'the second cheese'),
    (120, 125, 1.0, 'the round on top'),
    (128, 136, 1.0, 'the 4 stacks'),
    (140, 149, 1.0, 'the egg wash'),
    (152, 168, 2.0, 'the crumbs', (1.0, 1.08)),   # source motion 2.2: DEAD at 1.0x
    (172, 192, 1.5, 'tomatoes, garlic and oil'),
    (196, 204, 1.0, 'the ramekin on the tray'),
    (208, 220, 1.5, 'into the oven'),
    (224, 230, 1.0, 'the spatula lifts'),
    (232, 248, 1.2, 'on the plate', (1.0, 1.06)),
    (252, 264, 1.0, 'tomatoes spooned on'),
    (264, 290, 2.2, 'the parsley', (1.0, 1.08)),   # source DEAD 11-12 s
    (292, 338, 2.6, 'the layers', (1.0, 1.12)),   # source DEAD 12.5-14 s; 2.6x: SLOW at 2.0x
]
LIFT_LABEL = 'the spatula lifts'   # the spatula on the crisp crust: +4 dB over its first 0.6 s


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
     f"volume=4dB:enable='between(t,{L[LIFT_LABEL][0]:.3f},{L[LIFT_LABEL][0] + 0.6:.3f})',"
     'acompressor=threshold=-30dB:ratio=4:attack=4:release=150:makeup=1,acompressor=threshold=-18dB:ratio=3:attack=2:release=80',
     '-c:a', 'pcm_s16le', 'mix.wav'])
I, P = meas('mix.wav'); g0 = -17.5 - I
run(['ffmpeg', '-v', 'error', '-y', '-i', 'mix.wav', '-af', f'volume={g0:.2f}dB,alimiter=limit=0.80:attack=2:release=60:level=disabled', 'mix2.wav'])
I2, P2 = meas('mix2.wav'); g = -17.5 - I2   # mono at -17.5 = stereo -14.5
CARDS = [  # v4: hook, rehook and keyword, all centred at y 860
         ('ov_hook.png', 0.0, L['the filling spooned'][0]),
         ('ov_rehook.png', L['the filling spooned'][0], L['the spatula lifts'][0]),
         ('ov_cta.png', L['on the plate'][0], TOTAL)]
ins = ['-i', 'cut.mkv']
fc = ['[0:v]setsar=1,format=yuv420p[b0]']
last = 'b0'
for k, (png, s, e) in enumerate(CARDS):
    ins += ['-loop', '1', '-t', f'{TOTAL:.4f}', '-r', str(FPS), '-i', png]
    fc.append(f"[{last}][{k + 1}:v]overlay=0:0:enable='between(t,{s:.4f},{e - 0.001:.4f})':eof_action=pass[o{k}]"); last = f'o{k}'
fc.append(f'[{last}]format=yuv420p[v]')
fc.append(f'[{len(CARDS) + 1}:a]volume={g:.2f}dB,alimiter=limit=0.82:attack=2:release=60:level=disabled,aresample=48000,pan=stereo|c0=c0|c1=c0[ao]')
ins += ['-i', 'mix2.wav']
run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '[ao]',
     '-frames:v', str(round(TOTAL * FPS)),
     '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
     '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv', '-r', str(FPS),
     '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', 'aubergine-chicken-stacks.mp4'])
for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
print('cards', [(c, round(s, 2), round(e, 2)) for c, s, e in CARDS])
print('total', round(TOTAL, 3), 'mix', I, P, 'final', meas('aubergine-chicken-stacks.mp4'))
