# Honeycomb Pasta Pie v2, the crinkle way (owner, 2026-11-12: «عادي الوجه يضل بس أشياء بطيئة سرعها وصوت الهرش يكون قوي»):
# the face shot back, the slow shots sped up, the crunch of the slice the loudest sound. No flash, no reorder.
# Source: raw.mp4 = job 1bef36f0 (720x1280 H.264, 24 fps, 337 frames). Cards: ov_title, ov_hook, ov_proof, ov_right,
# ov_all, ov_q (1080x1920, cards.json). Fix: the fist that appears under the pan from frame 48 (cut at 47). The piping
# shot with his face (72-105) stays (owner). v1 (trims only, the face shot cut) is edit_pie_v1.py.
# Each segment is rendered to its own file with exact frame counts, then one concat and one encode.
import subprocess, re
FPS = 24
SRC = 'raw.mp4'
SEGS = [  # v3 (owner on v2: «الفيديو صار قصير كثير»): about 12 s, push-ins on the calm shots instead of more speed
    (0, 47, 1.25, 'the honeycomb, his hand pressing', '', (1.0, 1.12)),
    (72, 105, 1.0, 'he pipes the ricotta (face)', ''),
    (105, 128, 1.0, 'ricotta in every tube, macro', '', (1.0, 1.1)),
    (128, 157, 1.0, 'fingertip, no sauce yet', ''),
    (157, 205, 1.3, 'the marinara pour', '', (1.0, 1.1)),
    (205, 229, 1.0, 'the spoon pushes the sauce into the tubes', ''),
    (229, 264, 1.1, 'mozzarella falls', ',volume=-4dB'),
    (264, 292, 1.15, 'the oven glass, bubbling', '', (1.0, 1.1)),
    (292, 337, 1.0, 'the slice lifted', ',equalizer=f=3500:t=o:w=2:g=6,volume=8dB', (1.0, 1.08)),   # the crunch, frames 301-328
]


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
for i, (f0, f1, sp, lab, af, *zm) in enumerate(SEGS):
    n = round((f1 - f0) / sp); d = n / FPS
    run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-vf',
         f'trim=start_frame={f0}:end_frame={f1},setpts=(PTS-STARTPTS)/{sp},fps={FPS},trim=end_frame={n},setpts=PTS-STARTPTS,' + vchain(zm, n),
         '-an', '-c:v', 'libx264', '-qp', '0', '-preset', 'ultrafast', '-pix_fmt', 'yuv420p', '-frames:v', str(n), f'seg{i:02d}.mkv'])
    run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-vn', '-af',
         f'atrim={f0 / FPS:.5f}:{f1 / FPS:.5f},asetpts=PTS-STARTPTS{tempo(sp)}{af},aresample=48000,aformat=channel_layouts=mono,'
         f'apad,atrim=end={d:.5f},afade=t=in:d=0.01,afade=t=out:st={d - 0.01:.5f}:d=0.01', '-c:a', 'pcm_s16le', f'seg{i:02d}.wav'])
    labels.append((t, t + d, lab)); t += d
TOTAL = t
open('vlist.txt', 'w').write(''.join(f"file 'seg{i:02d}.mkv'\n" for i in range(len(SEGS))))
open('alist.txt', 'w').write(''.join(f"file 'seg{i:02d}.wav'\n" for i in range(len(SEGS))))
run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-i', 'vlist.txt', '-c', 'copy', 'cut.mkv'])
run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-i', 'alist.txt', '-af',
     'acompressor=threshold=-30dB:ratio=4:attack=4:release=150:makeup=1,acompressor=threshold=-18dB:ratio=3:attack=2:release=80',
     '-c:a', 'pcm_s16le', 'mix.wav'])
I, P = meas('mix.wav'); g0 = -17.5 - I
run(['ffmpeg', '-v', 'error', '-y', '-i', 'mix.wav', '-af', f'volume={g0:.2f}dB,alimiter=limit=0.80:attack=2:release=60:level=disabled', 'mix2.wav'])
I2, P2 = meas('mix2.wav'); g = -17.5 - I2   # mono at -17.5 = stereo -14.5
L = {lab: (s, e) for s, e, lab in labels}
proof_end = L['the marinara pour'][0] + 0.5
q_start = L['the oven glass, bubbling'][0] + 0.4
CARDS = [('ov_title.png', 0.0, L['the honeycomb, his hand pressing'][1]),   # off before the face shot (y 529 is his chin)
         ('ov_hook.png', 0.0, L['he pipes the ricotta (face)'][1]),
         ('ov_proof.png', L['ricotta in every tube, macro'][0], proof_end),
         ('ov_right.png', proof_end, L['the spoon pushes the sauce into the tubes'][1]),
         ('ov_all.png', L['mozzarella falls'][0], q_start),
         ('ov_q.png', q_start, TOTAL)]
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
     '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', 'honeycomb-pasta-pie-v3.mp4'])
for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
print('cards', [(c, round(s, 2), round(e, 2)) for c, s, e in CARDS])
print('total', round(TOTAL, 3), 'mix', I, P, 'final', meas('honeycomb-pasta-pie-v3.mp4'))
