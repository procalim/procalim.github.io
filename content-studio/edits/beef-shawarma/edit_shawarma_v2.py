# Beef Shawarma v2 (2026-11-15). Source: raw.mp4 = job 051f9407 (Seedance 2.5 omni reference, 720x1280, 24 fps, 20.06 s;
# prompt prompts/w4-beef-shawarma-20s-v2.txt). v1 read: 94 / 81 / 69% at 1-3 s, -22 points at 3-5 s on the raw tower,
# 26% at the end. v2: the raw steps done by 3.0 s, a card every 2 s that enters in 4 frames (slide up and fade, ease-out),
# the cut the loudest, the end on the bite, a true-peak limit of -1.5 dBTP (master-skills/edit).
# Take errors cut: raw red beef thrown on the griddle at 8.17-9.13 s (frames 196-219); the 1.5 s still hold with the
# knife raised (13.9-15.4 s) cut to 0.5 s. Raw read: DEAD 4, SLOW 3, QUIET 6.
import subprocess, re
FPS = 24
SRC = 'raw.mp4'
SEGS = [  # (first frame, end frame, speed, label[, push-in]); cut points from the measured source cuts
    (0, 17, 1.0, 'the cleaver', (1.0, 1.06)),
    (18, 51, 1.4, 'the bowl'),   # slices, spices, lemon, yogurt
    (52, 68, 1.0, 'the toss'),
    (68, 88, 1.3, 'the tower'),
    (88, 110, 1.1, 'the oven'),
    (110, 137, 1.8, 'roasting', (1.0, 1.08)),
    (137, 161, 1.2, 'out of the oven'),
    (161, 196, 1.05, 'the shave', (1.0, 1.06)),
    (220, 232, 1.0, 'the sear'),   # 196-219 left out: raw red beef on the griddle (the owner's catch)
    (232, 255, 1.0, 'the bread'),
    (255, 284, 1.3, 'the filling'),
    (284, 300, 1.2, 'the roll'),
    (300, 333, 1.5, 'the press'),
    (340, 358, 1.5, 'the wait', (1.0, 1.08)),   # the still hold with the knife raised, 1.5 s in the take
    (371, 409, 1.2, 'the cut'),
    (409, 440, 1.3, 'the reveal', (1.0, 1.06)),
    (440, 468, 1.0, 'his bite', (1.0, 1.08)),   # the chewing tail after 19.5 s left out
]
LIFT_LABEL = 'the cut'   # the knife through the crisp roll: +6 dB after the compressors over its first 0.8 s


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
CARDS = [  # a card every 2 s, each pulling to the end; the keyword from the cut
         ('ov_hook.png', 0.0, 2.0),
         ('ov_c2.png', 2.0, 4.0),
         ('ov_c3.png', 4.0, 6.0),
         ('ov_c4.png', 6.0, 8.0),
         ('ov_c5.png', 8.0, 10.0),
         ('ov_c6.png', 10.0, L['the cut'][0]),
         ('ov_cta.png', L['the cut'][0], TOTAL)]
ins = ['-i', 'cut.mkv']
fc = ['[0:v]setsar=1,format=yuv420p[b0]']
last = 'b0'
for k, (png, s, e) in enumerate(CARDS):
    ins += ['-loop', '1', '-t', f'{TOTAL:.4f}', '-r', str(FPS), '-i', png]
    fc.append(f"[{k + 1}:v]format=rgba,fade=t=in:st={s:.4f}:d=0.167:alpha=1[c{k}]")   # 4 frames in, ease-out slide
    fc.append(f"[{last}][c{k}]overlay=x=0:y='if(lt(t-{s:.4f},0.167),28*pow(1-(t-{s:.4f})/0.167,2),0)':eval=frame:"
              f"enable='between(t,{s:.4f},{e - 0.001:.4f})':eof_action=pass[o{k}]"); last = f'o{k}'
fc.append(f'[{last}]format=yuv420p[v]')
SHAPE = (f"volume=6dB:enable='between(t,{L[LIFT_LABEL][0]:.3f},{L[LIFT_LABEL][0] + 0.8:.3f})',")   # the cut: the loudest
fc.append(f'[{len(CARDS) + 1}:a]volume={g:.2f}dB,' + SHAPE + 'aresample=192000,alimiter=limit=0.841:attack=5:release=50:level=disabled,aresample=48000,pan=stereo|c0=c0|c1=c0[ao]')
ins += ['-i', 'mix2.wav']
run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '[ao]',
     '-frames:v', str(round(TOTAL * FPS)),
     '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
     '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv', '-r', str(FPS),
     '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', 'beef-shawarma-v2.mp4'])
for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
print('cards', [(c, round(s, 2), round(e, 2)) for c, s, e in CARDS])
print('total', round(TOTAL, 3), 'mix', I, P, 'final', meas('beef-shawarma-v2.mp4'))
