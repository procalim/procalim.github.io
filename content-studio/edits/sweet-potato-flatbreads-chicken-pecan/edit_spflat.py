# Baked Sweet Potato Flatbreads with Seasoned Chicken & Pecans (16 Nov 10 pm). Source: raw.mp4 = job fe70bbc8 (Seedance 2.5
# omni reference; fiteat.rima's 6.9M reel as @Video1). The v4 method: the hook centred from frame 0 over the peel and the
# mash, the rehook over the dough and the press, the keyword over the plate and the bite; the take's still stretches (the
# balls, the pecans, the bite) sped up with push-ins. The take is quiet (median 47 dB): the house chain levels it.
import subprocess, re
FPS = 24
SRC = 'raw.mp4'
SEGS = [  # (first frame, end frame, speed, label[, push-in]); cut points from the measured source cuts
    (0, 16, 1.2, 'the skin peeled'),
    (20, 31, 1.0, 'the flesh on the plate'),
    (32, 58, 1.6, 'the fork mash'),
    (60, 76, 1.4, 'the mozzarella'),
    (80, 92, 1.2, 'the flour'),
    (92, 106, 1.3, 'the mixing'),
    (106, 122, 1.3, 'the knead'),
    (128, 164, 2.0, 'the balls set down'),   # source SLOW at 6.0 s
    (164, 172, 1.0, 'pressed flat'),
    (184, 196, 1.0, 'baked'),
    (196, 210, 1.2, 'one lifted'),
    (210, 230, 1.4, 'the yogurt sauce'),
    (230, 240, 1.0, 'the spinach'),
    (240, 260, 1.4, 'the chicken laid on'),
    (260, 290, 2.0, 'pecans and cheese', (1.0, 1.08)),   # source DEAD at 11.5 s
    (290, 306, 1.0, 'the 4 on the plate', (1.0, 1.06)),
    (308, 328, 1.6, 'his bite', (1.0, 1.12)),   # source DEAD at 13.5 s; the still tail cut (SLOW at 338)
]
LIFT_LABEL = 'his bite'   # the bite: +4 dB over its first 0.6 s


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
         ('ov_hook.png', 0.0, L['the knead'][0]),
         ('ov_rehook.png', L['the knead'][0], L['the yogurt sauce'][0]),
         ('ov_cta.png', L['the 4 on the plate'][0], TOTAL)]
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
     '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', 'sweet-potato-flatbreads.mp4'])
for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
print('cards', [(c, round(s, 2), round(e, 2)) for c, s, e in CARDS])
print('total', round(TOTAL, 3), 'mix', I, P, 'final', meas('sweet-potato-flatbreads.mp4'))
