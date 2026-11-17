# Sweets from the Book ep 1: Viral Date Bark N° 111, cookcut 20 s take (job 2cf7b0ac, chef-ahmet-yellow), 2026-11-17.
# Owner: «ما أتوقع انو بدو تسريع كثير بس الديزاين الكتابة بدون ملصق وبخط كتابة مرتب ويطلع صوت الكتابة هي وخفيف على
# الشاشة زبط امورك فيديو فايرال». So: speeds near real time (1.0-1.6x), about 15 s; text with no boxes in a neat serif,
# typed letter by letter (anim-typed.mjs) with a light key click per letter; little text.
# The opening is the evidence's payoff-first shape (swipe-2026-11-17: the dish at 8.6x and 8.2x): the snap at 0.08 s.
import subprocess, re, wave, json, sys, numpy as np
FPS, SRC, PRE = 24, 'take.mp4', 3
SHOTS = [0, 23, 34, 46, 57, 67, 80, 102, 114, 133, 164, 188, 225, 249, 300, 321, 331, 341, 357, 401, 453, 481]
SEGS = [  # (first frame, end frame, speed, label, impact frame in the source or None, push-in or None)
    # v5 (2026-11-17, the crinkle rule after the 24 h curves): no payoff flash. The flash at 0-0.96 s answered the
    # picture's question, and the curve fell 90% -> 52% when the cut went back to raw dates. The crinkle (142.7x)
    # opened on an unfinished shape and showed nothing finished before 7.5 s. Now: the parchment over the dates first.
    (46, 57, 1.0, 'the parchment', 50, None),              # the sheet slapped on, his face
    (57, 80, 1.2, 'the roll', 60, None),                   # the rolling pin slam, his face
    (80, 102, 1.3, 'the peel', None, None),
    (102, 133, 1.6, 'peanut butter', None, None),
    (133, 164, 2.0, 'the pour', None, (1.0, 1.10)),        # v2: 1.3x read DEAD
    (164, 188, 2.0, 'the spread', None, (1.0, 1.08)),        # v5: 1.5x read SLOW
    (188, 222, 1.6, 'the peanuts', None, (1.0, 1.06)),     # v3: the salt end read DEAD at 1.3x
    (225, 249, 1.0, 'the freezer', 237, None),             # the drawer slam
    (249, 270, 1.2, 'out, frozen', 254, (1.02, 1.08)),     # the tray slam, mist, his face: the middle peak (v2: SLOW)
    (300, 321, 1.0, 'the knock', 312, (1.02, 1.08)),
    (321, 357, 1.0, 'the break', 323, None),
    (357, 377, 1.0, 'the snap again', 362, (1.02, 1.08)),          # the payoff: the loudest crack (v2: the held pose read DEAD)
    (401, 440, 1.5, 'his bite', 434, (1.02, 1.08)),        # v2: 1.2x read SLOW; v4: a push (1.5x alone read 7.9)
    (453, 481, 1.0, 'the loop', None, (1.0, 1.06)),        # a shard lifted to the lens: frame 0 again
]


def shot_start(f): return max(s for s in SHOTS if s <= f)


def vchain(n, imp, zm):
    if zm and imp is None:
        z0, z1 = zm; z = f"{z0}+({z1}-{z0})*on/{max(n - 1, 1)}"; x = "(iw-iw/zoom)/2"; y = "(ih-ih/zoom)/2"
    elif imp is not None:
        z0, z1 = zm or (1.02, 1.02)
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


def wr(f, a, sr):
    w = wave.open(f, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
    w.writeframes((np.clip(a, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()


labels, t = [], 0.0
for f0, f1, sp, lab, imp, zm in SEGS:
    d = round((f1 - f0) / sp) / FPS; labels.append((t, t + d, lab)); t += d
TOTAL = t
L = {lab: (s, e) for s, e, lab in labels}

# ---- typed cards: no boxes, little text, the hook alone in 0-3 s (6 words), the answer and the share line at the end
H = 3.0
CARDS = [
    ('hook', 0.12, H, 1290, False, [{'k': 'title', 't': 'رح يصير سنيكرز'}, {'k': 'caps', 't': 'becomes snickers'}]),
    ('five', H, L['the spread'][1], 880, False, [{'k': 'line', 't': '5 مكوّنات، بلا فرن'}, {'k': 'italic', 't': '5 ingredients, no oven'}]),
    ('freezer', L['the freezer'][0], L['the freezer'][1] + 0.3, 300, False, [{'k': 'line', 't': 'ساعة بالفريزر'}, {'k': 'italic', 't': '1 hour in the freezer'}]),
    ('listen', L['the knock'][0], L['the knock'][1], 560, False, [{'k': 'line', 't': 'اسمع الكسرة'}]),
    ('answer', L['the break'][0], L['the snap again'][1], 1330, True,   # v2: from the break, 2 s to read
     [{'k': 'line', 't': 'السر:'}, {'k': 'line', 't': 'تمر، زبدة فول سوداني، شوكولا'}, {'k': 'italic', 't': 'dates, peanut butter, dark chocolate'}]),
    ('send', L['his bite'][0], TOTAL, 1240, True,
     [{'k': 'kicker', 't': 'حلو من الكتاب · حلقة ١'}, {'k': 'line', 't': 'ابعتها للي ما بيقدر يترك الشوكولا'},
      {'k': 'italic', 't': 'send it to the one who can’t quit chocolate'}]),
]
# v4: every card finishes typing in the first 45% of its time, so the full line holds to be read (26 letters a second at least)
CPS = {k: max(26, int(np.ceil(sum(len(x['t']) for x in it) / (0.45 * (e - s))))) for k, s, e, y, sc, it in CARDS}
spec = {'fps': FPS, 'cards': [dict(key=k, frames=round((e - s) * FPS), y=y, scrim=sc, cps=CPS.get(k, 26), items=it)
                              for k, s, e, y, sc, it in CARDS]}
json.dump(spec, open('typ.json', 'w'), ensure_ascii=False)
run(['node', '/home/user/ov/typed.mjs', 'typ.json', 'typ'])
if 'cards' in sys.argv:
    for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
    sys.exit()

SR = 48000
pieces, t = [], 0.0
for i, (f0, f1, sp, lab, imp, zm) in enumerate(SEGS):
    n = round((f1 - f0) / sp); d = n / FPS
    k = None if imp is None else round((imp - f0) / sp)
    run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-vf',
         f'trim=start_frame={f0}:end_frame={f1},setpts=(PTS-STARTPTS)/{sp},fps={FPS},trim=end_frame={n},setpts=PTS-STARTPTS,' + vchain(n, k, zm),
         '-an', '-c:v', 'libx264', '-qp', '0', '-preset', 'ultrafast', '-pix_fmt', 'yuv420p', '-frames:v', str(n), f'seg{i:02d}.mkv'])
    pre = PRE if i and f0 - PRE * sp >= shot_start(f0) else 0
    a0 = (f0 - pre * sp) / FPS
    run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-vn', '-af',
         f'atrim={a0:.5f}:{f1 / FPS:.5f},asetpts=PTS-STARTPTS{tempo(sp)},aresample={SR},aformat=channel_layouts=mono,'
         f'apad,atrim=end={d + pre / FPS:.5f}', '-c:a', 'pcm_s16le', f'seg{i:02d}.wav'])
    pieces.append((t - pre / FPS, pre, rd(f'seg{i:02d}.wav'))); t += d
mix = np.zeros(int(TOTAL * SR) + SR, np.float32)
for j, (off, pre, a) in enumerate(pieces):
    a = a.copy(); fi = max(int(pre / FPS * SR), int(0.01 * SR)); a[:fi] *= np.linspace(0, 1, fi)
    nxt = pieces[j + 1][1] if j + 1 < len(pieces) else 0
    fo = max(int(nxt / FPS * SR), int(0.01 * SR)); a[-fo:] *= np.linspace(1, 0, fo)
    s = int(round(off * SR)); mix[s:s + len(a)] += a
mix = np.clip(mix[:int(TOTAL * SR)], -1, 1)
wr('jmix.wav', mix, SR)

# the typing sound: one light key click per letter (a short high tick over a soft body), level -24 dBFS +-3 dB
rng = np.random.default_rng(7)
clicks = np.zeros(int(TOTAL * SR) + SR, np.float32)
tt = np.arange(int(0.035 * SR)) / SR
for k, s, e, y, sc, it in CARDS:
    for fr in sorted(set(json.load(open(f'typ/{k}/events.json')))):   # one click a frame at most (24 a second)
        n0 = rng.normal(0, 1, len(tt)).astype(np.float32)
        tick = np.diff(n0, prepend=0) * np.exp(-tt / 0.0025)                       # a dry high tick
        body = np.sin(2 * np.pi * rng.uniform(900, 1300) * tt) * np.exp(-tt / 0.006) * 0.6   # the key's soft body
        c = tick + body; c /= np.abs(c).max()
        c *= 10 ** ((-24 + rng.uniform(-3, 3)) / 20)
        p = int((s + fr / FPS) * SR); clicks[p:p + len(c)] += c
wr('clicks.wav', clicks[:int(TOTAL * SR)], SR)

open('vlist.txt', 'w').write(''.join(f"file 'seg{i:02d}.mkv'\n" for i in range(len(SEGS))))
run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-i', 'vlist.txt', '-c', 'copy', 'cut.mkv'])
run(['ffmpeg', '-v', 'error', '-y', '-i', 'jmix.wav', '-af',
     'dynaudnorm=f=150:g=5:p=0.9:m=12,'
     'acompressor=threshold=-30dB:ratio=4:attack=4:release=150:makeup=1,acompressor=threshold=-18dB:ratio=3:attack=2:release=80',
     '-c:a', 'pcm_s16le', 'mix.wav'])
I, P = meas('mix.wav'); g0 = -17.5 - I
run(['ffmpeg', '-v', 'error', '-y', '-i', 'mix.wav', '-af', f'volume={g0:.2f}dB,alimiter=limit=0.80:attack=2:release=60:level=disabled', 'mix2.wav'])
I2, P2 = meas('mix2.wav'); g = -17.5 - I2
C0 = 4 / FPS                                     # v5: the parchment slap (f50) opens the reel
S1 = L['the roll'][0] + 3 / 1.2 / FPS           # the rolling pin slam (f60)
S2 = L['the peel'][0] + 2 / FPS                  # the parchment ripped off the dates
B = L['the snap again'][0] + 5 / FPS             # the payoff crack (f362)
SHAPE = (f"volume=8dB:enable='between(t,0,{C0 + 0.4:.3f})',"                 # the loudest sound of the reel, first
         f"volume=4dB:enable='between(t,{C0 + 0.41:.3f},3.0)',"              # 0-3 s held over the median
         f"volume=3dB:enable='between(t,{S1 - 0.04:.3f},{S1 + 0.3:.3f})',"
         f"volume=3dB:enable='between(t,{S2 - 0.04:.3f},{S2 + 0.3:.3f})',"
         f"volume=-9dB:enable='between(t,{B - 0.25:.3f},{B - 0.01:.3f})',")   # the dip before the payoff crack
LIM = 'aresample=192000,alimiter=limit=0.83:attack=5:release=50:level=disabled,aresample=48000'
ins = ['-i', 'cut.mkv']; fc = ['[0:v]setsar=1,format=yuv420p[b0]']; last = 'b0'
for k, (key, s, e, y, sc, it) in enumerate(CARDS):
    ins += ['-framerate', str(FPS), '-i', f'typ/{key}/f%03d.png']
    fc.append(f"[{k + 1}:v]format=rgba,setpts=PTS-STARTPTS+{s:.4f}/TB[c{k}]")
    fc.append(f"[{last}][c{k}]overlay=0:0:eof_action=pass[o{k}]"); last = f'o{k}'
fc.append(f'[{last}]format=yuv420p[v]')
na = len(CARDS) + 1
fc.append(f'[{na}:a]volume={g:.2f}dB,' + SHAPE.rstrip(',') + '[sh]')
fc.append(f'[{na + 1}:a]volume={g:.2f}dB[ck]')
fc.append('[sh][ck]amix=inputs=2:normalize=0:duration=first,' + LIM + ',pan=stereo|c0=c0|c1=c0[ao]')
ins += ['-i', 'mix2.wav', '-i', 'clicks.wav']
OUT = 'date-snickers-bark-v5.mp4'
run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '[ao]',
     '-frames:v', str(round(TOTAL * FPS)), '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-profile:v', 'high',
     '-pix_fmt', 'yuv420p', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv',
     '-r', str(FPS), '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', OUT])
for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
print('cards', [(c[0], round(c[1], 2), round(c[2], 2)) for c in CARDS])
print('total', round(TOTAL, 3), 'mix', I, P, 'final', meas(OUT))
