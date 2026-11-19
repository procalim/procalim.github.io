# Dense Bean Salad, STEP BY STEP (N° 101), Seedance 2.5 20 s take ceb1db96 (the owner's unlimited), 2026-11-19.
# Owner: «فيديو السلطة ... خذ اقوى الفيديوهات بتاكست هووك والايدتينغ وحطها كمرجع ... وايضاً بالتامين هووك».
# The reference (research/edit-reference-2026-11-19.md): the result first for about 3.5 s, one shot, the hook complete
# at frame one and kept through the result; then every step in order; then the result again. THE MEASURED RULE sound
# (the take's own, -20 LUFS gain, a peak-only limiter), the hook bank, 60 fps by motion interpolation.
# Usage (Higgsfield sandbox, /home/user/salad2 with take.mp4): python3 edit_salad_steps.py [cards]
import subprocess, re, wave, json, sys, numpy as np

FIN, FPS, PRE = 24, 60, 3              # the take's 24 fps, the output's 60 fps, audio lead-in frames
SHOTS = [0, 120, 215, 280, 332, 346, 358, 481]   # scdet: 5.00, 8.96, 11.67, 13.83, 14.42, 14.92 s
SEGS = [  # (first frame, end frame, speed, label)
    (360, 444, 1.0, 'the result'),       # the opening: lid off, the spoon in, the spoonful (the take's last shot)
    (0, 120, 1.25, 'the eight'),         # top-down: chickpeas, cannellini, tomatoes, pepper, onion, feta, salami, herbs
    (120, 215, 1.25, 'the dressing'),    # the jar: oil, vinegar, mustard, garlic, salt, pepper, oregano
    (215, 280, 1.0, 'shake and pour'),   # the shake, the slow pour over the sections
    (280, 332, 1.25, 'the toss'),        # top-down toss (the blurred f332-345 dropped)
    (334, 349, 1.0, 'the fridge'),       # into the fridge (the fridge's emblem blurred; the black f350-357 dropped)
    (384, 481, 1.0, 'the bite'),         # the result again, the spoonful, the bite
]
BLUR = {5: (200, 270, 220, 230)}       # segment index: x, y, w, h in the 720x1280 source (the fridge's back emblem)


def run(c): subprocess.run(c, check=True)


def shot_start(f): return max(s for s in SHOTS if s <= f)


def tempo(sp): return '' if sp == 1.0 else f',atempo={sp}'


def meas(f):
    e = subprocess.run(['ffmpeg', '-hide_banner', '-i', f, '-af', 'ebur128=peak=true', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    s = e[e.rindex('Summary'):]
    return float(re.search(r'I:\s+(-?[\d.]+)', s).group(1)), float(re.search(r'Peak:\s+(-?[\d.]+)', s).group(1))


def rd(f):
    w = wave.open(f); a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768; w.close(); return a


def wr(f, a, sr):
    w = wave.open(f, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
    w.writeframes((np.clip(a, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()


labels, t = [], 0.0
for f0, f1, sp, lab in SEGS:
    d = round((f1 - f0) / sp) / FIN; labels.append((t, t + d, lab)); t += d
TOTAL = t
L = {lab: (s, e) for s, e, lab in labels}

# ---- cards. The hook complete at frame one (the reference: all six outliers), kept the whole result section, no
# typing clicks on it; one typed card per step after it (no gap over 2.5 s); the answer and the send on the result.
CARDS = [  # (key, start, end, y, scrim, items)
    ('hook', 0.0, L['the result'][1], 560, True,      # hook bank E + B; 6 words in 0-3 s
     [{'k': 'title', 't': 'سلطتك بتذبل تاني يوم؟'}, {'k': 'caps', 't': 'soggy salad?'}]),
    ('eight', L['the eight'][0], L['the eight'][1], 250, True, [{'k': 'line', 't': '٨ مكوّنات بوعاء واحد'}]),
    ('dressing', L['the dressing'][0], L['the dressing'][1], 250, True, [{'k': 'line', 't': 'والصلصة: ٧ مكوّنات بمرطبان'}]),
    ('protein', L['shake and pour'][0], L['shake and pour'][1], 250, True, [{'k': 'line', 't': 'حوالي 55 غ بروتين بالوعاء'}]),
    ('fridge', L['the toss'][0], L['the fridge'][1], 250, True, [{'k': 'line', 't': '30 دقيقة بالبراد عالأقل'}]),
    ('answer', L['the bite'][0], L['the bite'][0] + 2.2, 560, True,
     [{'k': 'line', 't': 'السر: كل ما قعدت بالبراد، بتطيب'}, {'k': 'italic', 't': 'The longer it sits, the better.'}]),
    ('send', L['the bite'][0] + 2.2, TOTAL, 1250, True,   # the mistake a friend makes (11-22 sends per 1K)
     [{'k': 'kicker', 't': 'بروتين من الكتاب · حلقة ٣'}, {'k': 'line', 't': 'ابعتها للي سلطته بتذبل تاني يوم'}]),
]
META = {'hook_formula': ['E', 'B'], 'send_type': 'mistake'}
CPS = {k: (900 if k == 'hook' else max(26, int(np.ceil(sum(len(x['t']) for x in it) / (0.45 * (e - s))))))
       for k, s, e, y, sc, it in CARDS}
spec = {'fps': FPS, 'cards': [dict(key=k, frames=round((e - s) * FPS), y=y, scrim=sc, cps=CPS[k], items=it)
                              for k, s, e, y, sc, it in CARDS]}
json.dump(spec, open('typ.json', 'w'), ensure_ascii=False)
json.dump(dict(fps=FPS, total=TOTAL, **META, cards=[dict(key=k, start=s, end=e, y=y, items=it) for k, s, e, y, sc, it in CARDS]),
          open('timeline.json', 'w'), ensure_ascii=False)   # for edits/_tools/hook_check.py
run(['node', '/home/user/ov/typed.mjs', 'typ.json', 'typ'])
if 'cards' in sys.argv:
    for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
    sys.exit()

# ---- picture: the segments at 24 fps, joined, then 60 fps by motion interpolation, then 1080x1920
for i, (f0, f1, sp, lab) in enumerate(SEGS):
    n = round((f1 - f0) / sp)
    v = f'trim=start_frame={f0}:end_frame={f1},setpts=(PTS-STARTPTS)/{sp},fps={FIN},trim=end_frame={n},setpts=PTS-STARTPTS'
    if i in BLUR:
        x, y, w, h = BLUR[i]
        v = (f"[0:v]{v},split=2[m][b];[b]crop={w}:{h}:{x}:{y},boxblur=16:2[bb];[m][bb]overlay={x}:{y},format=yuv420p[v]")
        run(['ffmpeg', '-v', 'error', '-y', '-i', 'take.mp4', '-filter_complex', v, '-map', '[v]', '-an', '-c:v', 'libx264',
             '-qp', '0', '-preset', 'ultrafast', '-frames:v', str(n), f'seg{i:02d}.mkv'])
    else:
        run(['ffmpeg', '-v', 'error', '-y', '-i', 'take.mp4', '-vf', v + ',format=yuv420p', '-an', '-c:v', 'libx264',
             '-qp', '0', '-preset', 'ultrafast', '-frames:v', str(n), f'seg{i:02d}.mkv'])
open('vlist.txt', 'w').write(''.join(f"file 'seg{i:02d}.mkv'\n" for i in range(len(SEGS))))
run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-i', 'vlist.txt', '-c', 'copy', 'cut24.mkv'])
run(['ffmpeg', '-v', 'error', '-y', '-i', 'cut24.mkv', '-vf',
     f'minterpolate=fps={FPS}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1:scd=fdiff:scd_threshold=8,'
     'scale=1080:1920:flags=lanczos,setsar=1,format=yuv420p', '-c:v', 'libx264', '-qp', '0', '-preset', 'ultrafast', 'cut60.mkv'])

# ---- sound: each segment's own sound (a short lead-in inside the same shot), crossfaded, -20 LUFS gain, the limiter
SR = 48000
pieces, t = [], 0.0
for i, (f0, f1, sp, lab) in enumerate(SEGS):
    n = round((f1 - f0) / sp); d = n / FIN
    pre = PRE if i and f0 - PRE * sp >= shot_start(f0) else 0
    a0 = (f0 - pre * sp) / FIN
    run(['ffmpeg', '-v', 'error', '-y', '-i', 'take.mp4', '-vn', '-af',
         f'atrim={a0:.5f}:{f1 / FIN:.5f},asetpts=PTS-STARTPTS{tempo(sp)},aresample={SR},aformat=channel_layouts=mono,'
         f'apad,atrim=end={d + pre / FIN:.5f}', '-c:a', 'pcm_s16le', f'seg{i:02d}.wav'])
    pieces.append((t - pre / FIN, pre, rd(f'seg{i:02d}.wav'))); t += d
mix = np.zeros(int(TOTAL * SR) + SR, np.float32)
for j, (off, pre, a) in enumerate(pieces):
    a = a.copy(); fi = max(int(pre / FIN * SR), int(0.01 * SR)); a[:fi] *= np.linspace(0, 1, fi)
    nxt = pieces[j + 1][1] if j + 1 < len(pieces) else 0
    fo = max(int(nxt / FIN * SR), int(0.01 * SR)); a[-fo:] *= np.linspace(1, 0, fo)
    s = int(round(max(0, off) * SR)); mix[s:s + len(a)] += a[:len(mix) - s]
wr('mix2.wav', np.clip(mix[:int(TOTAL * SR)], -1, 1), SR)

# typing clicks: one light key click per letter on the typed cards (none on the hook, which is complete at frame one)
rng = np.random.default_rng(7)
clicks = np.zeros(int(TOTAL * SR) + SR, np.float32)
tt = np.arange(int(0.035 * SR)) / SR
for k, s, e, y, sc, it in CARDS:
    if k == 'hook': continue
    for fr in sorted(set(json.load(open(f'typ/{k}/events.json')))):
        n0 = rng.normal(0, 1, len(tt)).astype(np.float32)
        c = np.diff(n0, prepend=0) * np.exp(-tt / 0.0025) + np.sin(2 * np.pi * rng.uniform(900, 1300) * tt) * np.exp(-tt / 0.006) * 0.6
        c = c / np.abs(c).max() * 10 ** ((-24 + rng.uniform(-3, 3)) / 20)
        p = int((s + fr / FPS) * SR); clicks[p:p + len(c)] += c
wr('clicks.wav', clicks[:int(TOTAL * SR)], SR)

I, P = meas('mix2.wav'); g = -20.0 - I
LIM = 'aresample=192000,alimiter=limit=0.89:attack=1:release=40:level=disabled,aresample=48000'
ins = ['-i', 'cut60.mkv']; fc = ['[0:v]setsar=1,format=yuv420p[b0]']; last = 'b0'
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
OUT = 'protein-ep3-dense-bean-salad-steps.mp4'
run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '[ao]',
     '-frames:v', str(round(TOTAL * FPS)), '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-profile:v', 'high',
     '-pix_fmt', 'yuv420p', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv',
     '-r', str(FPS), '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', OUT])
for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
print('cards', [(c[0], round(c[1], 2), round(c[2], 2), CPS[c[0]]) for c in CARDS])
print('total', round(TOTAL, 3), 'mix', I, P, 'final', meas(OUT))
