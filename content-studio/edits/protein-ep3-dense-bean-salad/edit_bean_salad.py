# Protein from the Book ep 3: The "Dense Bean Salad" N° 101 (p250; halal beef salami, apple cider vinegar), Seedance
# 2.5 20 s take 07746548 (chef-ahmet-yellow), 2026-11-18. THE MEASURED RULE (research/opening-sound-audit-2026-11-17.md):
# shot 01 whole and uncut (the bowl in colourful sections, the chickpeas poured into the last one, the herbs), about
# one cut every 2-3 s after it, the take's own sound (no dynaudnorm, no compressor, nothing lifted), -20 LUFS gain and a
# peak-only limiter; typed cards (anim-typed), no boxes. No print in the take (plain jar, plain container): no blur.
# Usage (Higgsfield sandbox, /home/user/bean with take.mp4): python3 edit_bean_salad.py [cards]
import subprocess, re, wave, json, sys, os, numpy as np
FPS, SRC, PRE = 24, 'take.mp4', 3
SHOTS = [0, 100, 128, 163, 233, 265, 286, 307, 341, 345, 357, 405, 481]   # scdet on the take
SEGS = [  # (first frame, end frame, speed, label)
    (6, 100, 1.0, 'the chickpeas'),   # one continuous shot: the sections, the cascade at f12-24 (0.25 s), the herbs
    (100, 163, 1.2, 'the shake'),     # the jar, his face above
    (163, 233, 1.25, 'the pour'),     # the golden dressing across the sections, his face behind
    (233, 307, 1.3, 'the toss'),      # top-down, the sections gone
    (307, 341, 1.0, 'packed'),        # his face, the glass container
    (341, 347, 1.0, 'the fridge'),    # the fridge's view, the door closing (v1 read: f347-356 go dark to black: cut)
    (357, 405, 1.0, 'out, cold'),     # the container on the marble, the lid lifted
    (405, 430, 1.0, 'the spoonful'),
    (430, 481, 1.0, 'the bite'),      # the bite, his face over the container
]


def run(c): subprocess.run(c, check=True)


def shot_start(f): return max(s for s in SHOTS if s <= f)


def tempo(sp): return '' if sp == 1.0 else f',atempo={sp}'


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
for f0, f1, sp, lab in SEGS:
    d = round((f1 - f0) / sp) / FPS; labels.append((t, t + d, lab)); t += d
TOTAL = t
L = {lab: (s, e) for s, e, lab in labels}

# ---- typed cards (no boxes): 6 words in 0-3 s and nothing else; the answer and the share line at the end.
CARDS = [   # y per shot: his yellow shirt above the colander (hook), the black apron under the jar (protein), his
    # black apron over the cold container (answer), his shirt under his chin (send: v1 read, the camera pushes in on
    # the bite and 780 sat on his mouth); a soft scrim under each
    ('hook', 0.12, 3.0, 200, True, [{'k': 'title', 't': 'غدا الأسبوع كله'}, {'k': 'caps', 't': 'lunch all week'}]),
    ('protein', L['the shake'][0], L['the shake'][1], 1380, True, [{'k': 'line', 't': 'حوالي 55 غ بروتين بالوعاء'}]),
    ('answer', L['out, cold'][0], L['out, cold'][1], 300, True,   # the book's step 4
     [{'k': 'line', 't': 'السر: كل ما قعدت بالبراد، بتطيب'}, {'k': 'italic', 't': 'The longer it sits, the better.'}]),
    ('send', L['the bite'][0], TOTAL, 1120, True,
     [{'k': 'kicker', 't': 'بروتين من الكتاب · حلقة ٣'}, {'k': 'line', 't': 'ابعتها لزميلك اللي بيطلب أكل كل يوم'}]),
]
CPS = {k: max(26, int(np.ceil(sum(len(x['t']) for x in it) / (0.45 * (e - s))))) for k, s, e, y, sc, it in CARDS}
spec = {'fps': FPS, 'cards': [dict(key=k, frames=round((e - s) * FPS), y=y, scrim=sc, cps=CPS[k], items=it)
                              for k, s, e, y, sc, it in CARDS]}
json.dump(spec, open('typ.json', 'w'), ensure_ascii=False)
run(['node', '/home/user/ov/typed.mjs', 'typ.json', 'typ'])
if 'cards' in sys.argv:
    for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
    sys.exit()

SR = 48000
pieces, t = [], 0.0
for i, (f0, f1, sp, lab) in enumerate(SEGS):
    n = round((f1 - f0) / sp); d = n / FPS
    run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-vf',
         f'trim=start_frame={f0}:end_frame={f1},setpts=(PTS-STARTPTS)/{sp},fps={FPS},trim=end_frame={n},setpts=PTS-STARTPTS,'
         'scale=1080:1920:flags=lanczos,setsar=1',
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
wr('mix2.wav', np.clip(mix[:int(TOTAL * SR)], -1, 1), SR)

# the typing sound: one light key click per letter, -24 dBFS +-3 dB before the -3 dB below
rng = np.random.default_rng(7)
clicks = np.zeros(int(TOTAL * SR) + SR, np.float32)
tt = np.arange(int(0.035 * SR)) / SR
for k, s, e, y, sc, it in CARDS:
    for fr in sorted(set(json.load(open(f'typ/{k}/events.json')))):
        n0 = rng.normal(0, 1, len(tt)).astype(np.float32)
        c = np.diff(n0, prepend=0) * np.exp(-tt / 0.0025) + np.sin(2 * np.pi * rng.uniform(900, 1300) * tt) * np.exp(-tt / 0.006) * 0.6
        c = c / np.abs(c).max() * 10 ** ((-24 + rng.uniform(-3, 3)) / 20)
        p = int((s + fr / FPS) * SR); clicks[p:p + len(c)] += c
wr('clicks.wav', clicks[:int(TOTAL * SR)], SR)

open('vlist.txt', 'w').write(''.join(f"file 'seg{i:02d}.mkv'\n" for i in range(len(SEGS))))
run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-i', 'vlist.txt', '-c', 'copy', 'cut.mkv'])
# THE MEASURED RULE: the take's own dynamics, -20 LUFS gain, a peak-only limiter; nothing lifted in 0-3 s
I, P = meas('mix2.wav'); g = -20.0 - I
LIM = 'aresample=192000,alimiter=limit=0.89:attack=1:release=40:level=disabled,aresample=48000'
ins = ['-i', 'cut.mkv']; fc = ['[0:v]setsar=1,format=yuv420p[b0]']; last = 'b0'
for k, (key, s, e, y, sc, it) in enumerate(CARDS):
    ins += ['-framerate', str(FPS), '-i', f'typ/{key}/f%03d.png']
    fc.append(f"[{k + 1}:v]format=rgba,setpts=PTS-STARTPTS+{s:.4f}/TB[c{k}]")
    fc.append(f"[{last}][c{k}]overlay=0:0:eof_action=pass[o{k}]"); last = f'o{k}'
fc.append(f'[{last}]format=yuv420p[v]')
na = len(CARDS) + 1
fc.append(f'[{na}:a]volume={g:.2f}dB[sh]')
fc.append(f'[{na + 1}:a]volume={g - 3:.2f}dB[ck]')
fc.append('[sh][ck]amix=inputs=2:normalize=0:duration=first,' + LIM + ',pan=stereo|c0=c0|c1=c0[ao]')
ins += ['-i', 'mix2.wav', '-i', 'clicks.wav']
OUT = 'protein-ep3-dense-bean-salad.mp4'
run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '[ao]',
     '-frames:v', str(round(TOTAL * FPS)), '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-profile:v', 'high',
     '-pix_fmt', 'yuv420p', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv',
     '-r', str(FPS), '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', OUT])
for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
print('cards', [(c[0], round(c[1], 2), round(c[2], 2), CPS[c[0]]) for c in CARDS])
print('total', round(TOTAL, 3), 'mix', I, P, 'final', meas(OUT))
