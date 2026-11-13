# Spinach & Lentil Crinkle (healthy day 2), the one-angle step-by-step take. Source: raw.mp4 = job dc8fa443 (Seedance 2.5,
# 720x1280, 24 fps, 337 frames; prompt prompts/w4-spinach-lentil-crinkle-oneangle.txt, the crinkle's first frame as the start).
# The take holds the top-down angle to 6.3 s, then low close shots (the pour, the bake, the lemon, the knife).
# Owner: «اعمل ايديت قوي ... في هبوط بعد الثانية الاولى»: the first second moves (2.2x, push-in, the filling lands by 0.7 s),
# the sound levelled loud from the first frame, the knife crunch lifted.
# Cards come in as PNGs named ov_<key>.png (rendered full frame in the sandbox).
import subprocess, re, glob, os
FPS = 24
SRC = 'raw.mp4'
SEGS = [  # (first frame, end frame, speed, label[, push-in]); motion per 0.25 s measured on the source first
    (4, 39, 2.2, 'the pale phyllo ruffles, his hand pressing', (1.0, 1.1)),   # motion 2-4
    (39, 96, 1.4, 'the spinach and lentil filling spread over the ruffles'),   # motion 8-10
    (96, 126, 1.0, 'the tray out and back, baked'),
    (126, 151, 1.8, 'the fingertip on the crisp baked ruffles', (1.0, 1.08)),   # motion about 2
    (151, 206, 1.3, 'the custard pour', (1.0, 1.08)),
    (216, 232, 1.2, 'baked, the custard set and golden'),   # 206-216: a jump left out
    (232, 286, 1.5, 'the lemon squeezed over', (1.0, 1.08)),   # motion 2-5
    (286, 337, 1.0, 'the knife, the square lifted'),   # the crunch at frame 300
]
CRUNCH = (0.45, 0.95)   # seconds into the last segment (frame 300 = 0.58 s)


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
k0 = L['the knife, the square lifted'][0]
c0, c1 = k0 + CRUNCH[0], k0 + CRUNCH[1]
open('vlist.txt', 'w').write(''.join(f"file 'seg{i:02d}.mkv'\n" for i in range(len(SEGS))))
open('alist.txt', 'w').write(''.join(f"file 'seg{i:02d}.wav'\n" for i in range(len(SEGS))))
run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-i', 'vlist.txt', '-c', 'copy', 'cut.mkv'])
run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-i', 'alist.txt', '-af',
     'dynaudnorm=f=150:g=5:p=0.9:m=12,'
     f"equalizer=f=3500:t=o:w=2:g=6:enable='between(t,{c0:.3f},{c1:.3f})',volume=5dB:enable='between(t,{c0:.3f},{c1:.3f})',"
     'acompressor=threshold=-30dB:ratio=4:attack=4:release=150:makeup=1,acompressor=threshold=-18dB:ratio=3:attack=2:release=80',
     '-c:a', 'pcm_s16le', 'mix.wav'])
I, P = meas('mix.wav'); g0 = -17.5 - I
run(['ffmpeg', '-v', 'error', '-y', '-i', 'mix.wav', '-af', f'volume={g0:.2f}dB,alimiter=limit=0.80:attack=2:release=60:level=disabled', 'mix2.wav'])
I2, P2 = meas('mix2.wav'); g = -17.5 - I2   # mono at -17.5 = stereo -14.5
tf = L['the fingertip on the crisp baked ruffles'][0]
tp = L['the custard pour'][0]
tb = L['baked, the custard set and golden'][1]
tl = L['the lemon squeezed over'][0]
CARDS = [('ov_title.png', 0.0, tf),
         ('ov_hook.png', 0.0, tf),
         ('ov_proof.png', tf, tp + 0.5),
         ('ov_right.png', tp + 0.5, tb),
         ('ov_all.png', tl, k0 + 0.3),
         ('ov_q.png', k0 + 0.3, TOTAL)]
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
     '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', 'spinach-lentil-crinkle.mp4'])
for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
print('cards', [(c, round(s, 2), round(e, 2)) for c, s, e in CARDS])
print('total', round(TOTAL, 3), 'mix', I, P, 'final', meas('spinach-lentil-crinkle.mp4'))
