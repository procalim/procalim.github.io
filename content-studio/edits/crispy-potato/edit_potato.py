# Crispy Potato Nests, the pistachio way (owner, 2026-11-12, after the pasta's 1 h read): his face and the bite's
# crunch at frame one with the hook on the apron, the raw prep fast (about 1.3 s of white sticks before 3 s), the
# frying in order, a near-silent beat then the break as the loudest crunch, the CTA only on the last face shot.
# Source: raw.mp4 = job 8c5efdc7 (720x1280 H.264, 24 fps). Cards: ov_hook.png, ov_rehook.png, ov_cta.png (1080x1920).
# Each segment is rendered to its own file (an out-of-order segment from one decode froze a render before), with
# exact frame counts and scaled to 1080x1920 there (lossless), then one concat and one encode.
import subprocess, re
FPS = 24
SRC = 'raw.mp4'
SEGS = [  # (first frame, end frame, speed, label, gain dB or 'break')
    (256, 276, 1.0, 'bite (face)', 0, (1.0, 1.25, 0.30)),   # (zoom from, zoom to, anchor y): the fast push-in
    (0, 12, 1.5, 'sticks drop', 0),
    (12, 25, 2.5, 'flour, starch', 6),
    (25, 52, 2.5, 'turmeric, pepper, salt', 6),
    (66, 77, 1.5, 'sparkling water', 0),
    (52, 66, 1.0, 'the mix', -4),
    (90, 104, 1.0, 'first nest into the oil', 0),
    (104, 123, 1.4, '7 nests in the pan', 0),
    (123, 199, 1.0, 'press, macro, flip, lift, sauce, stir', 0),
    (199, 216, 1.0, 'plate, push-in', -4),
    (216, 236, 1.0, 'the break', 'break'),   # 216-224 at -12 dB (the beat), the crunch from 225 at +10 dB
    (236, 256, 1.0, 'the dip', 0),
    (266, 289, 1.0, 'chewing, the nest held (face)', -3, (1.0, 1.15, 0.30)),
]
BREAK_AT = (225 - 216) / FPS


def run(c): subprocess.run(c, check=True)


def meas(f):
    e = subprocess.run(['ffmpeg', '-hide_banner', '-i', f, '-af', 'ebur128=peak=true', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    s = e[e.rindex('Summary'):]
    return float(re.search(r'I:\s+(-?[\d.]+)', s).group(1)), float(re.search(r'Peak:\s+(-?[\d.]+)', s).group(1))


def zoom(zm, n):   # every segment to 1080x1920 here; a push-in renders from 2x and keeps the anchor point still
    if not zm: return 'scale=1080:1920:flags=lanczos,setsar=1'
    z0, z1, cy = zm[0]
    return (f"scale=2160:3840:flags=lanczos,zoompan=z='{z0}+({z1}-{z0})*on/{max(n - 1, 1)}':x='(iw-iw/zoom)/2':"
            f"y='(ih-ih/zoom)*{cy}':d=1:s=1080x1920:fps={FPS},setsar=1")


def tempo(sp):
    if sp == 1.0: return ''
    if sp > 2.0: return f',atempo=2.0,atempo={sp / 2.0:.4f}'
    return f',atempo={sp}'


labels, t, lst = [], 0.0, []
for i, (f0, f1, sp, lab, g, *zm) in enumerate(SEGS):
    n = round((f1 - f0) / sp); d = n / FPS
    run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-vf',
         f'trim=start_frame={f0}:end_frame={f1},setpts=(PTS-STARTPTS)/{sp},fps={FPS},trim=end_frame={n},setpts=PTS-STARTPTS,' + zoom(zm, n),
         '-an', '-c:v', 'libx264', '-qp', '0', '-preset', 'ultrafast', '-pix_fmt', 'yuv420p', '-frames:v', str(n), f'seg{i:02d}.mkv'])
    vol = (f",volume='if(lt(t,{BREAK_AT:.4f}),0.25,3.16)':eval=frame" if g == 'break'
           else (f',volume={g}dB' if g else ''))
    run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-vn', '-af',
         f'atrim={f0 / FPS:.5f}:{f1 / FPS:.5f},asetpts=PTS-STARTPTS{tempo(sp)}{vol},aresample=48000,'
         f'aformat=channel_layouts=mono,apad,atrim=end={d:.5f},afade=t=in:d=0.008,afade=t=out:st={d - 0.008:.5f}:d=0.008',
         '-c:a', 'pcm_s16le', f'seg{i:02d}.wav'])
    lst.append(i); labels.append((t, t + d, lab)); t += d
TOTAL = t
open('vlist.txt', 'w').write(''.join(f"file 'seg{i:02d}.mkv'\n" for i in lst))
open('alist.txt', 'w').write(''.join(f"file 'seg{i:02d}.wav'\n" for i in lst))
run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-i', 'vlist.txt', '-c', 'copy', 'cut.mkv'])
run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-i', 'alist.txt', '-af',
     'acompressor=threshold=-30dB:ratio=4:attack=4:release=150:makeup=1,acompressor=threshold=-18dB:ratio=3:attack=2:release=80',
     '-c:a', 'pcm_s16le', 'mix.wav'])
I, P = meas('mix.wav'); g0 = -17.5 - I
run(['ffmpeg', '-v', 'error', '-y', '-i', 'mix.wav', '-af', f'volume={g0:.2f}dB,alimiter=limit=0.80:attack=2:release=60:level=disabled', 'mix2.wav'])
I2, P2 = meas('mix2.wav'); g = -17.5 - I2   # mono at -17.5 = stereo -14.5
L = {lab: (s, e) for s, e, lab in labels}
CARDS = [('ov_hook.png', 0.0, L['turmeric, pepper, salt'][1]),
         ('ov_rehook.png', L['sparkling water'][0], L['first nest into the oil'][1]),
         ('ov_cta.png', L['chewing, the nest held (face)'][0], TOTAL)]
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
     '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', 'crispy-potato.mp4'])
run(['ffmpeg', '-v', 'error', '-y', '-i', 'cut.mkv', '-i', 'mix2.wav', '-af', f'volume={g:.2f}dB',
     '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-shortest', 'notext.mp4'])
for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
print('cards', [(c, round(s, 2), round(e, 2)) for c, s, e in CARDS])
print('total', round(TOTAL, 3), 'mix', I, P, 'final', meas('crispy-potato.mp4'))
