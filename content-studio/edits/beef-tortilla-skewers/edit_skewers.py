# Beef Tortilla Skewers, cookcut 20 s take (job e696653a), 2026-11-15. The shawarma v1 template (opening 1.42 s, hook
# card 2.75 s, a card on the punches, the payoff then the bite) plus the retention engine's edit techniques: J-cut audio
# (each shot's own sound 3 frames before its picture where the take shot allows), speed ramps into impacts, a punch-in
# with a 2-frame shake on each impact, a dip before the tear and the tear the loudest, a loop seam (the pepper).
# One cut, two versions: A (the Habibi hook) and B (the sound-promise hook); everything else identical.
# The take's 7.96-8.75 s (the rolls cut into pinwheels, raw faces) is left out: on the tray the rolls are whole again.
import subprocess, re, wave, numpy as np
FPS, SRC, PRE = 24, 'take.mp4', 3
SHOTS = [0, 40, 74, 97, 104, 123, 129, 142, 162, 176, 191, 210, 225, 249, 299, 342, 378, 420, 453, 469, 481]
SEGS = [  # (first frame, end frame, speed, label, impact frame in the source or None, push-in or None)
    (0, 34, 1.0, 'the cleaver', 5, (1.02, 1.06)),         # v1's opening length: two strikes, his face; punch on the strike
    (40, 72, 2.2, 'the bowl', None, None),                # raw on screen 0.6 s
    (97, 104, 1.0, 'the slap', None, None),
    (104, 114, 1.25, 'the trim', 109, None),
    (125, 142, 2.0, 'the spread', None, None),            # raw 0.35 s, then the cheese covers it
    (146, 162, 1.0, 'the cheese', None, None),
    (166, 176, 1.2, 'the roll', None, None),
    (179, 190, 1.0, 'the punch', 183, None),
    (214, 225, 1.2, 'the oil', None, None),
    (230, 238, 1.6, 'into the oven', None, None),         # ramp into the slam
    (238, 249, 1.0, 'the slam', 241, None),
    (256, 299, 1.8, 'baking', None, (1.0, 1.08)),
    (299, 341, 1.8, 'out of the oven', 301, (1.02, 1.16)),  # the mid-point surprise: his face in the steam (1.25x DEAD, 1.5x SLOW)
    (343, 373, 1.2, 'the blender', 355, None),
    (383, 418, 1.2, 'the drizzle', None, None),           # its quiet tail is the dip before the tear
    (420, 452, 1.0, 'the tear', 423, (1.02, 1.10)),       # the payoff; the push keeps the slow pull moving
    (453, 468, 1.0, 'his bite', 458, None),
    (469, 477, 1.0, 'the pepper', None, None),            # loop seam into frame 0
]


def shot_start(f): return max(s for s in SHOTS if s <= f)


def vchain(n, imp, zm):
    if zm and imp is None:
        z0, z1 = zm; z = f"{z0}+({z1}-{z0})*on/{max(n - 1, 1)}"; x = "(iw-iw/zoom)/2"; y = "(ih-ih/zoom)/2"
    elif imp is not None:
        z0, z1 = zm or (1.02, 1.02)   # a push under the impact bump, from 1.02 so the shake has room
        z = f"{z0}+({z1}-{z0})*on/{max(n - 1, 1)}+0.06*min(max(on-{imp},0)/4,1)"
        x = f"(iw-iw/zoom)/2+if(between(on,{imp},{imp + 1}),18*(1-2*mod(on-{imp},2)),0)"
        y = f"(ih-ih/zoom)/2+if(between(on,{imp},{imp + 1}),-12*(1-2*mod(on-{imp},2)),0)"
    else:
        return 'scale=1080:1920:flags=lanczos,setsar=1'
    return f"scale=2160:3840:flags=lanczos,zoompan=z='{z}':x='{x}':y='{y}':d=1:s=1080x1920:fps={FPS},setsar=1"


def tempo(sp):
    if sp == 1.0: return ''
    if sp > 2.0: return f',atempo=2.0,atempo={sp / 2.0:.4f}'
    return f',atempo={sp}'


def run(c): subprocess.run(c, check=True)


def meas(f):
    e = subprocess.run(['ffmpeg', '-hide_banner', '-i', f, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
    s = e[e.rindex('Summary'):]
    return float(re.search(r'I:\s+(-?[\d.]+)', s).group(1)), float(re.search(r'Peak:\s+(-?[\d.]+)', s).group(1))


def rd(f):
    w = wave.open(f); a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768; w.close(); return a


SR = 48000
labels, pieces, t = [], [], 0.0
for i, (f0, f1, sp, lab, imp, zm) in enumerate(SEGS):
    n = round((f1 - f0) / sp); d = n / FPS
    k = None if imp is None else round((imp - f0) / sp)
    run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-vf',
         f'trim=start_frame={f0}:end_frame={f1},setpts=(PTS-STARTPTS)/{sp},fps={FPS},trim=end_frame={n},setpts=PTS-STARTPTS,' + vchain(n, k, zm),
         '-an', '-c:v', 'libx264', '-qp', '0', '-preset', 'ultrafast', '-pix_fmt', 'yuv420p', '-frames:v', str(n), f'seg{i:02d}.mkv'])
    pre = PRE if i and f0 - PRE * sp >= shot_start(f0) else 0   # J-cut only inside the same take shot
    a0 = (f0 - pre * sp) / FPS
    run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-vn', '-af',
         f'atrim={a0:.5f}:{f1 / FPS:.5f},asetpts=PTS-STARTPTS{tempo(sp)},aresample={SR},aformat=channel_layouts=mono,'
         f'apad,atrim=end={d + pre / FPS:.5f}', '-c:a', 'pcm_s16le', f'seg{i:02d}.wav'])
    pieces.append((t - pre / FPS, pre, rd(f'seg{i:02d}.wav')))
    labels.append((t, t + d, lab)); t += d
TOTAL = t
L = {lab: (s, e) for s, e, lab in labels}
mix = np.zeros(int(TOTAL * SR) + SR, np.float32)
for j, (off, pre, a) in enumerate(pieces):
    a = a.copy(); fi = max(int(pre / FPS * SR), int(0.01 * SR)); a[:fi] *= np.linspace(0, 1, fi)
    nxt = pieces[j + 1][1] if j + 1 < len(pieces) else 0
    fo = max(int(nxt / FPS * SR), int(0.01 * SR)); a[-fo:] *= np.linspace(1, 0, fo)   # the crossfade under the J-cut
    s = int(round(off * SR)); mix[s:s + len(a)] += a
mix = np.clip(mix[:int(TOTAL * SR)], -1, 1)
w = wave.open('jmix.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype(np.int16).tobytes()); w.close()
open('vlist.txt', 'w').write(''.join(f"file 'seg{i:02d}.mkv'\n" for i in range(len(SEGS))))
run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-i', 'vlist.txt', '-c', 'copy', 'cut.mkv'])
run(['ffmpeg', '-v', 'error', '-y', '-i', 'jmix.wav', '-af',
     'dynaudnorm=f=150:g=5:p=0.9:m=12,'
     'acompressor=threshold=-30dB:ratio=4:attack=4:release=150:makeup=1,acompressor=threshold=-18dB:ratio=3:attack=2:release=80',
     '-c:a', 'pcm_s16le', 'mix.wav'])
I, P = meas('mix.wav'); g0 = -17.5 - I
run(['ffmpeg', '-v', 'error', '-y', '-i', 'mix.wav', '-af', f'volume={g0:.2f}dB,alimiter=limit=0.80:attack=2:release=60:level=disabled', 'mix2.wav'])
I2, P2 = meas('mix2.wav'); g = -17.5 - I2   # mono at -17.5 = stereo -14.5
T = L['the tear'][0] + 3 / FPS   # the crackle
SHAPE = (f"volume=2dB:enable='between(t,{TOTAL - 3:.3f},{TOTAL:.3f})',"     # the last 3 s above the rest
         f"volume=-9dB:enable='between(t,{T - 0.25:.3f},{T - 0.01:.3f})',"     # the dip before the payoff
         f"volume=6dB:enable='between(t,{T:.3f},{T + 0.5:.3f})',")            # the tear: the loudest
LIM = 'aresample=192000,alimiter=limit=0.841:attack=5:release=50:level=disabled,aresample=48000'   # -1.5 dBTP
CARDS = [('hook', 0.0, 2.75),
         ('c2', 2.75, L['the punch'][0]),
         ('c3', L['the punch'][0], L['baking'][0]),
         ('c4', L['baking'][0], L['the blender'][0]),
         ('c5', L['the blender'][0], L['the tear'][0]),
         ('cta', L['the tear'][0], TOTAL)]
for ver in ('A', 'B'):
    ins = ['-i', 'cut.mkv']; fc = ['[0:v]setsar=1,format=yuv420p[b0]']; last = 'b0'
    for k, (key, s, e) in enumerate(CARDS):
        png = f'ov_hook{ver}.png' if key == 'hook' else f'ov_{key}.png'
        ins += ['-loop', '1', '-t', f'{TOTAL:.4f}', '-r', str(FPS), '-i', png]
        fc.append(f"[{last}][{k + 1}:v]overlay=0:0:enable='between(t,{s:.4f},{e - 0.001:.4f})':eof_action=pass[o{k}]"); last = f'o{k}'
    fc.append(f'[{last}]format=yuv420p[v]')
    fc.append(f'[{len(CARDS) + 1}:a]volume={g:.2f}dB,' + SHAPE + LIM + ',pan=stereo|c0=c0|c1=c0[ao]')
    ins += ['-i', 'mix2.wav']
    run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '[ao]',
         '-frames:v', str(round(TOTAL * FPS)), '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-profile:v', 'high',
         '-pix_fmt', 'yuv420p', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv',
         '-r', str(FPS), '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', f'beef-tortilla-skewers-{ver}.mp4'])
for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
print('cards', [(c, round(s, 2), round(e, 2)) for c, s, e in CARDS])
print('total', round(TOTAL, 3), 'mix', I, P, 'A', meas('beef-tortilla-skewers-A.mp4'), 'B', meas('beef-tortilla-skewers-B.mp4'))
