# Flat Crispy Croissants N° 103, cookcut 20 s take (job 8f2dbc0e), 2026-11-16. Everything measured in one reel: the
# opening strike with his face (1.4 s), the crinkle's four card beats (the mistake, the right way, the proof, a closing
# question), no ingredient bowl in 0-3 s, no glass, the snap the loudest and last before his bite, a loop seam.
# Techniques from the skewers edit: J-cuts inside a take shot, punch-ins with a 2-frame shake on impacts, a dip before
# the snap. Left out: the second-side press (a repeat of the pot shot).
import subprocess, re, wave, numpy as np
FPS, SRC, PRE = 24, 'take.mp4', 3
SHOTS = [0, 46, 79, 97, 112, 120, 128, 139, 158, 163, 208, 233, 255, 282, 317, 347, 382, 417, 436, 471, 481]
SEGS = [  # (first frame, end frame, speed, label, impact frame in the source or None, push-in or None)
    (0, 46, 1.3, 'the smash', 5, (1.02, 1.06)),           # two strikes (f5, f41), his face behind
    (46, 79, 1.6, 'rolled thin', None, None),
    (81, 97, 1.3, 'the shape', None, (1.0, 1.06)),
    (99, 112, 1.3, 'honey butter', None, None),
    (112, 139, 1.5, 'brushed and sugar', None, None),
    (139, 156, 1.2, 'the skillet', 147, None),
    (158, 163, 1.0, 'the parchment', None, None),
    (174, 192, 1.0, 'the pot', 180, None),
    (208, 233, 1.6, 'the press', None, (1.02, 1.10)),
    (233, 255, 1.0, 'the lift', 236, None),
    (255, 282, 1.2, 'the flip', 270, None),               # the amber underneath: the mid-point surprise
    (319, 340, 1.4, 'on the board', 331, None),
    (347, 380, 1.8, 'the knock', 348, (1.02, 1.10)),    # 1.3x read DEAD
    (384, 416, 2.0, 'the dip', None, (1.0, 1.06)),        # quiet: the dip before the snap
    (417, 436, 1.0, 'the snap', 420, None),               # the payoff
    (437, 466, 1.0, 'his bite', 440, None),
    (473, 481, 1.0, 'the loop', None, None),              # whole croissants, the rolling pin coming down (f477): frame 0 again
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
T = L['the snap'][0] + 3 / FPS   # the crack
S0 = 4 / FPS   # the first rolling-pin strike (f5 at 1.3x)
S1 = 40 / 1.3 / FPS   # the second strike (f40-43 at 1.3x)
R0, R1 = L['rolled thin']; H0, H1 = L['the shape']
SHAPE = (f"volume=8dB:enable='between(t,{S0 - 0.04:.3f},{S0 + 0.4:.3f})',"    # the crinkle's measured sound: the loudest
         # moment of the reel in the first 0.3 s (owner, 2026-11-16: «الكرينكل نجح من الصوت مش من الهووك»)
         f"volume=8dB:enable='between(t,{S1 - 0.04:.3f},{S1 + 0.34:.3f})',"   # v3: a second hit, as the crinkle's three
         # loudest moments were all in 0-3 s (0.25, 1.5, 2.5 s; owner: «هاذا بين بأول ثلاث ثواني»)
         f"volume=4dB:enable='between(t,{S1 + 0.35:.3f},{R1:.3f})',"          # the rolling crackle held up
         f"volume=5dB:enable='between(t,{H0:.3f},{H1:.3f})',"                  # no quiet dip before 3 s
         f"volume=-9dB:enable='between(t,{T - 0.25:.3f},{T - 0.01:.3f})',"     # the dip before the snap
         f"volume=4dB:enable='between(t,{T:.3f},{T + 0.5:.3f})',")            # the snap: second only to the opening
LIM = 'aresample=192000,alimiter=limit=0.83:attack=5:release=50:level=disabled,aresample=48000'   # -1.5 dBTP
CARDS = [('hook', 0.0, 2.75),                                   # the mistake
         ('right', L['the pot'][0], L['the flip'][0]),            # the right way
         ('proof', L['the knock'][0], L['the snap'][0]),          # the proof
         ('ask', L['his bite'][0], TOTAL)]                        # the closing question
ins = ['-i', 'cut.mkv']; fc = ['[0:v]setsar=1,format=yuv420p[b0]']; last = 'b0'
for k, (key, s, e) in enumerate(CARDS):
    ins += ['-loop', '1', '-t', f'{TOTAL:.4f}', '-r', str(FPS), '-i', f'ov_{key}.png']
    fc.append(f"[{last}][{k + 1}:v]overlay=0:0:enable='between(t,{s:.4f},{e - 0.001:.4f})':eof_action=pass[o{k}]"); last = f'o{k}'
fc.append(f'[{last}]format=yuv420p[v]')
fc.append(f'[{len(CARDS) + 1}:a]volume={g:.2f}dB,' + SHAPE + LIM + ',pan=stereo|c0=c0|c1=c0[ao]')
ins += ['-i', 'mix2.wav']
run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '[ao]',
     '-frames:v', str(round(TOTAL * FPS)), '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-profile:v', 'high',
     '-pix_fmt', 'yuv420p', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv',
     '-r', str(FPS), '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', 'flat-crispy-croissants-v3.mp4'])
for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
print('cards', [(c, round(s, 2), round(e, 2)) for c, s, e in CARDS])
print('total', round(TOTAL, 3), 'mix', I, P, 'final', meas('flat-crispy-croissants-v3.mp4'))
