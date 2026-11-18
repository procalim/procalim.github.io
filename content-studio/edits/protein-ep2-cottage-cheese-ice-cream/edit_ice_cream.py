# Protein from the Book ep 2: Viral Cottage Cheese Ice Cream N° 083 (p230), Seedance 2.5 20 s take f6c85c84
# (chef-ahmet-yellow), 2026-11-18. The first edit built on THE MEASURED RULE (research/opening-sound-audit-2026-11-17.md):
# shot 01 whole and uncut (no cut in 0-3 s), about one cut every 2.5 s after it, the take's own sound (no dynaudnorm,
# no compressor, nothing lifted), -20 LUFS gain and a peak-only limiter; typed cards (anim-typed), no boxes.
# Usage (Higgsfield sandbox, /home/user/ice with take.mp4): python3 edit_ice_cream.py [cards]
import subprocess, re, wave, json, sys, os, numpy as np
FPS, RAW, SRC, PRE = 24, 'take.mp4', 'take_clean.mp4', 3
SHOTS = [0, 106, 169, 236, 290, 313, 360, 405, 481]   # scdet on the take (4.42, 7.04, 9.83, 12.08, 13.04, 15.0, 16.88 s)
SEGS = [  # (first frame, end frame, speed, label)
    (6, 106, 1.0, 'the tub and the honey'),   # one continuous shot: the curds drop at f18-24, the honey, the vanilla, the lid
    (106, 169, 1.4, 'the blend'),             # top-down, lumps to smooth
    (169, 236, 1.25, 'the pour'),             # back into its own tub, his face above
    (236, 313, 1.35, 'the strawberries'),     # the drop and the fold
    (313, 360, 1.0, 'the freezer'),
    (360, 405, 1.0, 'out, frozen'),           # the lid lifted: frozen, creamy, strawberries inside
    (405, 436, 1.0, 'the scoop'),
    (436, 481, 1.0, 'the bite'),              # the bite, then his face and the tub: frame one's framing (the loop)
]
# made-up print in the take, blurred before the cut (720x1280 source pixels): the processor base («Fitacuite») and the
# honey bottle's label, moving while he pours (centre keyframes), then standing at the left
BASE = (295, 1175, 135, 52, 0, 106)
LABEL_KEYS = [(32, 190, 455), (36, 185, 450), (42, 200, 460), (48, 180, 430), (54, 150, 415), (60, 140, 415), (67, 175, 405)]
LABEL_WH = (230, 160)
STAND = (0, 625, 105, 180, 66, 95)


def run(c): subprocess.run(c, check=True)


def lerp(i):   # piecewise-linear x (i=1) or y (i=2) of the label centre against the frame number n
    k = LABEL_KEYS; e = str(k[-1][i])
    for (f0, *a), (f1, *b) in reversed(list(zip(k, k[1:]))):
        e = f"if(lt(n,{f1}),{a[i - 1]}+({b[i - 1]}-{a[i - 1]})*(n-{f0})/{f1 - f0},{e})"
    return e


def feather(f=14): return f"format=yuva444p,geq=lum='lum(X,Y)':cb='cb(X,Y)':cr='cr(X,Y)':a='255*clip(min(min(X,W-1-X),min(Y,H-1-Y))/{f},0,1)'"


if not os.path.exists(SRC):
    w, h = LABEL_WH; X, Y = lerp(1), lerp(2); b = BASE; s = STAND
    fc = (f"[0:v]split=4[m][a][b][c];"
          f"[a]crop={b[2]}:{b[3]}:{b[0]}:{b[1]},boxblur=10:2,{feather(10)}[ka];"
          f"[b]crop={w}:{h}:'{X}-{w // 2}':'{Y}-{h // 2}',boxblur=12:2,{feather()}[kb];"
          f"[c]crop={s[2]}:{s[3]}:{s[0]}:{s[1]},boxblur=12:2,{feather()}[kc];"
          f"[m][ka]overlay={b[0]}:{b[1]}:enable='between(n,{b[4]},{b[5]})'[m1];"
          f"[m1][kb]overlay='{X}-{w // 2}':'{Y}-{h // 2}':enable='between(n,{LABEL_KEYS[0][0]},{LABEL_KEYS[-1][0]})'[m2];"
          f"[m2][kc]overlay={s[0]}:{s[1]}:enable='between(n,{s[4]},{s[5]})',format=yuv420p[v]")
    run(['ffmpeg', '-v', 'error', '-y', '-i', RAW, '-filter_complex', fc, '-map', '[v]', '-map', '0:a', '-c:v', 'libx264',
         '-qp', '0', '-preset', 'ultrafast', '-c:a', 'copy', SRC])


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
# y is the card's top on the 1080x1920 frame, chosen per shot: the processor under the curds (hook), his black apron
# (answer), his shirt under his face (send); a soft scrim under each
CARDS = [   # v1 read: the lid rises into the top of shot 6 (white on white), so no card over the reveal and the scoop
    ('hook', 0.12, 3.0, 1360, True, [{'k': 'title', 't': 'رح تصير بوظة'}, {'k': 'caps', 't': 'becomes ice cream'}]),
    ('answer', L['the freezer'][0], L['the freezer'][1], 640, True,   # the book's chef's note, on the freezer (his black apron)
     [{'k': 'line', 't': 'السر: جبنة قريش كاملة الدسم'}, {'k': 'italic', 't': 'Full-fat only. Low-fat turns icy.'}]),
    ('send', L['the bite'][0], TOTAL, 800, True,
     [{'k': 'kicker', 't': 'بروتين من الكتاب · حلقة ٢'}, {'k': 'line', 't': 'ابعتها للي عامل دايت وبيحب الحلو'}]),
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
OUT = 'protein-ep2-cottage-cheese-ice-cream.mp4'
run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '[ao]',
     '-frames:v', str(round(TOTAL * FPS)), '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-profile:v', 'high',
     '-pix_fmt', 'yuv420p', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv',
     '-r', str(FPS), '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', OUT])
for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
print('cards', [(c[0], round(c[1], 2), round(c[2], 2), CPS[c[0]]) for c in CARDS])
print('total', round(TOTAL, 3), 'mix', I, P, 'final', meas(OUT))
