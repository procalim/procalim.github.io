# Protein from the Book ep 4: High-protein Cookie Dough, the Cottage Cheese Hack N° 105 (p254), Seedance 2.5 20 s take
# 732efcce (chef-ahmet-yellow), 2026-11-19. THE MEASURED RULE with the ep 2 read: shot 01 whole and uncut, a new sharp
# sound every 0.5-1 s in 0-3 s (the take: 6 onsets, open3.py), a calm picture, the take's own sound (no dynaudnorm, no
# compressor, nothing lifted), -20 LUFS gain and a peak-only limiter; typed cards (anim-typed), no boxes.
# Usage (Higgsfield sandbox, /home/user/cdough with take.mp4): python3 edit_cookie_dough.py [cards]
import subprocess, re, wave, json, sys, os, numpy as np
FPS, RAW, SRC, PRE = 24, 'take.mp4', 'take_clean.mp4', 3
SHOTS = [0, 107, 161, 236, 306, 368, 417, 481]   # scdet on the take (4.46, 6.71, 9.83, 12.75, 15.33, 17.38 s)
SEGS = [  # (first frame, end frame, speed, label)
    (12, 107, 1.0, 'the curds and the syrup'),   # one continuous shot from the tub over the jar: the plop at 0.2 s, the
                                                 # taps, the cap, the syrup, the spoon clinks, the lid (6+ onsets in 0-3 s)
    (107, 161, 1.3, 'the blend'),                # curds to silk
    (161, 236, 1.25, 'the pour'),                # into the glass bowl, his face above
    (236, 306, 1.25, 'the flour'),               # almond flour and protein powder, the stir, his face
    (306, 368, 1.25, 'the chips'),               # top-down, the chips rain, the fold
    (368, 417, 1.0, 'the scoop'),                # the spoon lifts one thick scoop (slow motion in the take)
    (417, 481, 1.0, 'the bite'),                 # the bite, his face, his hand reaches for the tub (the loop)
]
# made-up print in the take, blurred before the cut (720x1280 source pixels): the maple syrup bottle's label, upright
# at the jar (f47-58), then tilted over it while he pours (f62-75); centre keyframes, a feathered moving box
LABEL_KEYS = [(47, 395, 560), (52, 395, 540), (58, 395, 540), (62, 260, 450), (64, 190, 405), (72, 190, 405), (75, 150, 420)]
LABEL_WH = (240, 200)


def run(c): subprocess.run(c, check=True)


def lerp(i):   # piecewise-linear x (i=1) or y (i=2) of the label centre against the frame number n
    k = LABEL_KEYS; e = str(k[-1][i])
    for (f0, *a), (f1, *b) in reversed(list(zip(k, k[1:]))):
        e = f"if(lt(n,{f1}),{a[i - 1]}+({b[i - 1]}-{a[i - 1]})*(n-{f0})/{f1 - f0},{e})"
    return e


def feather(f=14): return f"format=yuva444p,geq=lum='lum(X,Y)':cb='cb(X,Y)':cr='cr(X,Y)':a='255*clip(min(min(X,W-1-X),min(Y,H-1-Y))/{f},0,1)'"


if not os.path.exists(SRC):
    w, h = LABEL_WH; X, Y = lerp(1), lerp(2)
    fc = (f"[0:v]split=2[m][b];"
          f"[b]crop={w}:{h}:'{X}-{w // 2}':'{Y}-{h // 2}',boxblur=14:2,{feather()}[kb];"
          f"[m][kb]overlay='{X}-{w // 2}':'{Y}-{h // 2}':enable='between(n,{LABEL_KEYS[0][0]},{LABEL_KEYS[-1][0]})',format=yuv420p[v]")
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
CARDS = [   # v2 (owner, 2026-11-19: the hook bank, no text gaps, the check; research/hook-bank.md). y per shot: the empty
    # upper jar (hook), the black lid in the blend, the dark band beside the pour, his apron (flour), the bowl's dark rim
    # (chips), the dark above the scoop (answer), his shirt under his chin (send); a soft scrim under each
    ('hook', 0.12, 3.0, 870, True,   # E question + B mistake (safety) + the kids angle; the answer comes at 12.6 s
     [{'k': 'title', 't': 'ولادك بياكلوا العجينة نيّة؟'}, {'k': 'caps', 't': 'raw dough?'}]),
    ('watch', L['the blend'][0], L['the blend'][1], 250, True, [{'k': 'line', 't': 'شوف الجبنة كيف بتختفي'}]),
    ('protein', L['the pour'][0], L['the pour'][1], 760, True, [{'k': 'line', 't': 'حوالي 70 غ بروتين بالوعاء'}]),
    ('swap', L['the flour'][0], L['the flour'][1], 700, True, [{'k': 'line', 't': 'دقيق لوز بدل الطحين'}]),
    ('best', L['the chips'][0], L['the chips'][1], 230, True, [{'k': 'line', 't': 'وهلق أطيب جزء'}]),
    ('answer', L['the scoop'][0], L['the scoop'][1], 300, True,   # the hack: safe to eat raw
     [{'k': 'line', 't': 'السر: بلا طحين نيّ ولا بيض نيّ'}, {'k': 'italic', 't': 'No raw flour. No raw egg.'}]),
    ('send', L['the bite'][0], TOTAL, 1260, True,   # the kids angle: the account's measured send driver (8.7, 7.8 per 1K)
     [{'k': 'kicker', 't': 'بروتين من الكتاب · حلقة ٤'}, {'k': 'line', 't': 'ابعتها للي ولاده بيسرقوا عجينة الكوكيز'}]),
]
META = {'hook_formula': ['E', 'B'], 'send_type': 'kids'}   # hook-bank.md formulas; the send driver
CPS = {k: max(26, int(np.ceil(sum(len(x['t']) for x in it) / (0.45 * (e - s))))) for k, s, e, y, sc, it in CARDS}
spec = {'fps': FPS, 'cards': [dict(key=k, frames=round((e - s) * FPS), y=y, scrim=sc, cps=CPS[k], items=it)
                              for k, s, e, y, sc, it in CARDS]}
json.dump(spec, open('typ.json', 'w'), ensure_ascii=False)
json.dump(dict(fps=FPS, total=TOTAL, **META, cards=[dict(key=k, start=s, end=e, y=y, items=it) for k, s, e, y, sc, it in CARDS]),
          open('timeline.json', 'w'), ensure_ascii=False)   # for edits/_tools/hook_check.py
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
OUT = 'protein-ep4-cottage-cheese-cookie-dough.mp4'   # v2
run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '[ao]',
     '-frames:v', str(round(TOTAL * FPS)), '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-profile:v', 'high',
     '-pix_fmt', 'yuv420p', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv',
     '-r', str(FPS), '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', OUT])
for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
print('cards', [(c[0], round(c[1], 2), round(c[2], 2), CPS[c[0]]) for c in CARDS])
print('total', round(TOTAL, 3), 'mix', I, P, 'final', meas(OUT))
