# Golden-Seared Herb Short Ribs, the crinkle's first angle held (owner, 2026-11-13). Source: raw.mp4 = job b8ae3a58
# (Seedance 2.5, 720x1280, 24 fps, 337 frames, first frame 0dcea38d). One locked top-down shot: the angle
# never changes (owner: «نفس أول زاوية الكرنكل ضل ثابتة لنهاية الفيديو»): speeds, and a slow push-in on the two still
# squeeze stretches only (top-down, centred; set the push-in to None to drop it), then the sound loud from the first
# frame to the last («الصوت قوي من أول لآخر الفيديو»). Cards: the crinkle's sizes and places, the hook the owner asked
# for («زي لما تكون جوعان او الساعة 3»).
# Cards come in as cropped PNGs named ov_<key>_<x>_<y>.png and are placed back on a 1080x1920 canvas here.
import subprocess, re, glob, os
FPS = 24
SRC = 'raw.mp4'
SEGS = [  # (first frame, end frame, speed, label[, push-in]); source motion per 0.25 s measured first (v1 had DEAD 11 of 23)
    (0, 12, 1.5, 'the first frame, his hand comes in'),
    (12, 60, 2.2, 'his hand grips and pulls the first bone'),   # source motion 3-5 (v2 at 1.8x still DEAD at 0.5-1.5 s)
    (60, 100, 1.1, 'the bones pulled, the clacks'),
    (100, 138, 1.5, 'the rest of the bones out'),   # 4.2-5.2 s: five bones go without a pull; faster, it passes in 1 s
    (138, 180, 1.3, 'both hands lift a block'),
    (180, 228, 1.6, 'the squeeze starts', (1.0, 1.1)),   # source motion 2-3: speed and a slow push-in, still top-down
    (228, 276, 1.0, 'the squeeze, the meat bursts'),
    (276, 337, 1.3, 'the last squeeze', (1.0, 1.15)),   # source motion 2-4 (v2 with 1.1 still DEAD at 9-10.5 s)
]

def vchain(zm, n):   # a push-in only: the camera stays top-down, centred on the tray
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


for f in glob.glob('cards/ov_*.png'):   # ov_title_338_525.png -> ov_title.png on a 1080x1920 canvas
    key, x, y = re.match(r'ov_(\w+?)_(\d+)_(\d+)\.png', os.path.basename(f)).groups()
    run(['convert', '-size', '1080x1920', 'xc:none', f, '-geometry', f'+{x}+{y}', '-composite', f'ov_{key}.png'])

labels, t = [], 0.0
for i, (f0, f1, sp, lab, *zm) in enumerate(SEGS):
    n = round((f1 - f0) / sp); d = n / FPS
    run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-vf',
         f'trim=start_frame={f0}:end_frame={f1},setpts=(PTS-STARTPTS)/{sp},fps={FPS},trim=end_frame={n},setpts=PTS-STARTPTS,'
         + vchain(zm, n),
         '-an', '-c:v', 'libx264', '-qp', '0', '-preset', 'ultrafast', '-pix_fmt', 'yuv420p', '-frames:v', str(n), f'seg{i:02d}.mkv'])
    run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-vn', '-af',
         f'atrim={f0 / FPS:.5f}:{f1 / FPS:.5f},asetpts=PTS-STARTPTS{tempo(sp)},aresample=48000,aformat=channel_layouts=mono,'
         f'apad,atrim=end={d:.5f}', '-c:a', 'pcm_s16le', f'seg{i:02d}.wav'])
    labels.append((t, t + d, lab)); t += d
TOTAL = t
open('vlist.txt', 'w').write(''.join(f"file 'seg{i:02d}.mkv'\n" for i in range(len(SEGS))))
open('alist.txt', 'w').write(''.join(f"file 'seg{i:02d}.wav'\n" for i in range(len(SEGS))))
run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-i', 'vlist.txt', '-c', 'copy', 'cut.mkv'])
# One continuous shot, so the sound is one continuous take: concat, then level it so no moment drops (the source swings
# from -18 to -43 dB per quarter second), then the two compressors, then the house loudness.
run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-i', 'alist.txt', '-af',
     'dynaudnorm=f=150:g=5:p=0.9:m=12,'
     'acompressor=threshold=-30dB:ratio=4:attack=4:release=150:makeup=1,acompressor=threshold=-18dB:ratio=3:attack=2:release=80',
     '-c:a', 'pcm_s16le', 'mix.wav'])
I, P = meas('mix.wav'); g0 = -17.5 - I
run(['ffmpeg', '-v', 'error', '-y', '-i', 'mix.wav', '-af', f'volume={g0:.2f}dB,alimiter=limit=0.80:attack=2:release=60:level=disabled', 'mix2.wav'])
I2, P2 = meas('mix2.wav'); g = -17.5 - I2   # mono at -17.5 = stereo -14.5
L = {lab: (s, e) for s, e, lab in labels}
right_end = L['both hands lift a block'][1]
all_end = min(right_end + 3.0, TOTAL - 2.0)
CARDS = [('ov_title.png', 0.0, 2.9),
         ('ov_hook.png', 0.0, 2.9),
         ('ov_right.png', 2.9, right_end),
         ('ov_all.png', right_end, all_end),
         ('ov_q.png', all_end, TOTAL)]
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
     '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', 'short-ribs.mp4'])
for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
print('cards', [(c, round(s, 2), round(e, 2)) for c, s, e in CARDS])
print('total', round(TOTAL, 3), 'mix', I, P, 'final', meas('short-ribs.mp4'))
