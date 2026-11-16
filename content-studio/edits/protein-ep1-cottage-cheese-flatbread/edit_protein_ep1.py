# Protein from the Book, ep 1: The Viral Cottage Cheese Flatbread (English PDF p280), cookcut 20 s take (job 93af701e,
# the new element chef-ahmet-yellow), 2026-11-16. Owner: «هون اجى دورك بالهووك والدعوة الفيروسي غير طريقة كل شغلنا السابقة
# ... خليها مشاركة ... حتى التصميم الكتابة اشتغل على مهارة المحترفين بالكتابة والانيميشين».
# New hook (the mistake formula retired): a paradox and a number, «خبز بلا طحين» + «حوالي 37 غ بروتين» counting up, under
# the series pill; the open question (liquid -> bread?) answered at the oven door. The call is a share card over the
# payoff: «ابعتها للي بيقلّك "ما بقدر أترك الخبز"» with the paper plane. No keyword on the video (caption and pinned).
# Cards: anim-kinetic.mjs (word by word, gold marker sweep, counter, send card). Sound: the clang the loudest (0.25 s),
# the parchment slap, the plop and the lid slam in 0-3 s, as the crinkle's three hits.
# Left out of the take: the peel (a second flatbread appears under the peeled one), the wide walk away from the oven,
# most of the static clock.
import subprocess, re, wave, json, sys, numpy as np
FPS, SRC, PRE = 24, 'take.mp4', 3
SHOTS = [0, 17, 28, 45, 74, 109, 140, 163, 201, 233, 284, 309, 356, 375, 398, 411, 449, 462, 481]
SEGS = [  # (first frame, end frame, speed, label, impact frame in the source or None, push-in or None)
    (3, 17, 1.0, 'the clang', 6, (1.02, 1.05)),          # the pan slammed down, his face behind: the loudest moment (0.12 s)
    (17, 28, 1.0, 'the parchment', None, None),
    (28, 45, 1.0, 'the slap', 36, None),                   # parchment slapped on the pan, his face
    (46, 58, 1.0, 'the plop', 55, None),                   # cottage cheese into the blender
    (60, 74, 1.2, 'the eggs', None, None),
    (76, 108, 1.6, 'the roar', 79, None),                  # the lid slam, the blend to liquid, his face
    (112, 138, 2.0, 'the pour', None, (1.0, 1.12)),       # v3: 1.6x read DEAD
    (140, 162, 2.0, 'the spread', None, None),
    (164, 194, 2.0, 'the oven', 192, (1.02, 1.08)),        # the door kicked shut (v4: 1.6x read SLOW)
    (202, 214, 1.0, 'the clock', None, (1.0, 1.08)),
    (234, 282, 1.2, 'out of the oven', 240, None),         # the pan slam, steam, his face: the liquid is bread
    (284, 309, 1.2, 'the knock', 288, (1.02, 1.08)),
    (356, 375, 1.4, 'the fillings', None, None),
    (375, 398, 1.8, 'the roll', None, None),
    (398, 411, 1.0, 'the cut', 403, None),
    (411, 442, 1.2, 'the pull', None, (1.0, 1.10)),       # the payoff (f440-449 hold still: DEAD at 1.0x)
    (449, 462, 1.0, 'his bite', 452, None),
    (462, 481, 1.3, 'the chew', None, (1.0, 1.10)),       # v4: the chewing at 1.0x read SLOW
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


# v6: printed text blurred (the skill: no logos or misspelt packaging): the tub's label at the top edge in the plop,
# the dial print of the clock. Boxes in output pixels (x, y, w, h).
BLUR = {'the plop': [(300, 0, 500, 170)], 'the clock': [('c', 543, 1060, 205)]}   # v7: the clock as a soft circle


def blurs(boxes):
    if not boxes: return ''
    out = f",split={len(boxes) + 1}" + ''.join(f'[s{i}]' for i in range(len(boxes) + 1)) + ';'
    cur, parts = 's0', []
    for i, b in enumerate(boxes):
        tail = '' if i == len(boxes) - 1 else f'[o{i}]'
        if b[0] == 'c':   # a feathered circle: centre x, y and radius
            _, cx, cy, r = b; d = 2 * r + 40; x, y = cx - d // 2, cy - d // 2
            f = (f"crop={d}:{d}:{x}:{y},boxblur=14:2,format=yuva444p,"
                 f"geq=lum='lum(X,Y)':cb='cb(X,Y)':cr='cr(X,Y)':a='255*clip(({r}-hypot(X-{d // 2},Y-{d // 2}))/30,0,1)'")
        else:
            x, y, w, h = b; f = f"crop={w}:{h}:{x}:{y},boxblur=18:2"
        parts.append(f"[s{i + 1}]{f}[k{i}];[{cur}][k{i}]overlay={x}:{y}{tail}"); cur = f'o{i}'
    return out + ';'.join(parts)


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


labels, t = [], 0.0
for f0, f1, sp, lab, imp, zm in SEGS:
    d = round((f1 - f0) / sp) / FPS; labels.append((t, t + d, lab)); t += d
TOTAL = t
L = {lab: (s, e) for s, e, lab in labels}

# ---- the cards (owner, 2026-11-16: the hook and the call rewritten, the share card; pro kinetic type) ----
CARDS = [
    ('hook', 0.0, L['the plop'][1], 1130, [
        {'k': 'pill', 't': 'بروتين من الكتاب · حلقة 1'},
        {'k': 'line', 'size': 96, 'parts': [{'t': 'خبز'}, {'t': 'بلا طحين', 'hl': True}]},
        {'k': 'count', 'pre': 'حوالي', 'n': 37, 'post': 'غ بروتين'},
        {'k': 'en', 't': 'Homemade. No flour. ~37 g protein.'}]),
    ('liquid', L['the pour'][0], L['the spread'][1], 1270, [
        {'k': 'line', 'size': 80, 'parts': [{'t': 'لسّا'}, {'t': 'سائل…', 'hl': True}]},
        {'k': 'en', 't': 'Still liquid…'}]),
    ('time', L['the oven'][0], L['the clock'][1], 300, [
        {'k': 'pill', 't': '35-40 دقيقة بالفرن'},
        {'k': 'en', 't': '35-40 min in the oven'}]),
    ('bread', L['out of the oven'][0] + 0.08, L['out of the oven'][1], 700, [
        {'k': 'line', 'size': 90, 'parts': [{'t': 'وصار'}, {'t': 'خبز!', 'hl': True}]},
        {'k': 'en', 't': 'And now it’s bread!'}]),
    ('wrap', L['the roll'][0], L['the cut'][1], 640, [
        {'k': 'line', 'size': 74, 'parts': [{'t': 'بينلفّ'}, {'t': 'وما بينكسر', 'hl': True}]},
        {'k': 'en', 't': 'Rolls up. Never cracks.'}]),
    ('send', L['the pull'][0], TOTAL, 1240, [
        {'k': 'send', 'l1': 'ابعتها للي دايماً بيقلّك:', 'l2': 'ما بقدر أترك الخبز',
         'l3': 'Send it to the one who “can’t quit bread”'}]),
]
spec = {'fps': FPS, 'cards': [dict(key=k, frames=round((e - s) * FPS), y=y, items=it) for k, s, e, y, it in CARDS]}
json.dump(spec, open('kin.json', 'w'), ensure_ascii=False)
run(['node', '/home/user/ov/kinetic.mjs', 'kin.json', 'kin'])
if 'cards' in sys.argv:   # cards only, for the design check
    for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
    print('cards', [(c[0], round(c[1], 2), round(c[2], 2)) for c in CARDS]); sys.exit()

SR = 48000
pieces, t = [], 0.0
for i, (f0, f1, sp, lab, imp, zm) in enumerate(SEGS):
    n = round((f1 - f0) / sp); d = n / FPS
    k = None if imp is None else round((imp - f0) / sp)
    run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-vf',
         f'trim=start_frame={f0}:end_frame={f1},setpts=(PTS-STARTPTS)/{sp},fps={FPS},trim=end_frame={n},setpts=PTS-STARTPTS,' + vchain(n, k, zm) + blurs(BLUR.get(lab, [])),
         '-an', '-c:v', 'libx264', '-qp', '0', '-preset', 'ultrafast', '-pix_fmt', 'yuv420p', '-frames:v', str(n), f'seg{i:02d}.mkv'])
    pre = PRE if i and f0 - PRE * sp >= shot_start(f0) else 0   # J-cut only inside the same take shot
    a0 = (f0 - pre * sp) / FPS
    run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-vn', '-af',
         f'atrim={a0:.5f}:{f1 / FPS:.5f},asetpts=PTS-STARTPTS{tempo(sp)},aresample={SR},aformat=channel_layouts=mono,'
         f'apad,atrim=end={d + pre / FPS:.5f}', '-c:a', 'pcm_s16le', f'seg{i:02d}.wav'])
    pieces.append((t - pre / FPS, pre, rd(f'seg{i:02d}.wav'))); t += d
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
C0 = 3 / FPS                                   # the clang (f6, the cut starts at f3)
S1 = L['the slap'][0] + 8 / FPS                # the parchment slap (f36)
S2 = L['the plop'][0] + 9 / FPS                # the plop (f55)
S3 = L['the roar'][0] + 2 / FPS                # the lid slam (f79 at 1.6x)
B = L['his bite'][0] + 3 / FPS
SHAPE = (f"volume=8dB:enable='between(t,{C0 - 0.06:.3f},{C0 + 0.4:.3f})',"     # the loudest sound of the reel, first
         f"volume=4dB:enable='between(t,{C0 + 0.41:.3f},3.0)',"               # v2: 0-3 s held over the median (was -0.2 dB)
         f"volume=5dB:enable='between(t,{L['the plop'][0]:.3f},{S2 - 0.05:.3f})',"   # v3: the two -6 dB windows in 0-3 s
         f"volume=5dB:enable='between(t,{L['the eggs'][0] + 0.2:.3f},{S3 - 0.05:.3f})',"
         f"volume=4dB:enable='between(t,2.24,2.78)',"   # v5: the last two windows under the median in 0-3 s (-2, -3 dB)
         f"volume=5dB:enable='between(t,{S1 - 0.04:.3f},{S1 + 0.3:.3f})',"     # three more hits in 0-3 s
         f"volume=4dB:enable='between(t,{S2 - 0.04:.3f},{S2 + 0.3:.3f})',"
         f"volume=4dB:enable='between(t,{S3 - 0.04:.3f},{S3 + 0.3:.3f})',"
         f"volume=-9dB:enable='between(t,{B - 0.25:.3f},{B - 0.01:.3f})',")    # the dip before the bite (v2: no lift after it,
         # the bite's chewing was 0.1 dB over the clang)
LIM = 'aresample=192000,alimiter=limit=0.83:attack=5:release=50:level=disabled,aresample=48000'   # -1.5 dBTP
ins = ['-i', 'cut.mkv']; fc = ['[0:v]setsar=1,format=yuv420p[b0]']; last = 'b0'
for k, (key, s, e, y, it) in enumerate(CARDS):
    ins += ['-framerate', str(FPS), '-i', f'kin/{key}/f%03d.png']
    fc.append(f"[{k + 1}:v]format=rgba,setpts=PTS-STARTPTS+{s:.4f}/TB[c{k}]")
    fc.append(f"[{last}][c{k}]overlay=0:0:eof_action=pass[o{k}]"); last = f'o{k}'
fc.append(f'[{last}]format=yuv420p[v]')
fc.append(f'[{len(CARDS) + 1}:a]volume={g:.2f}dB,' + SHAPE + LIM + ',pan=stereo|c0=c0|c1=c0[ao]')
ins += ['-i', 'mix2.wav']
OUT = 'protein-ep1-cottage-cheese-flatbread.mp4'
run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '[ao]',
     '-frames:v', str(round(TOTAL * FPS)), '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-profile:v', 'high',
     '-pix_fmt', 'yuv420p', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv',
     '-r', str(FPS), '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', OUT])
for s, e, lab in labels: print(f'{s:6.2f}-{e:6.2f}  {lab}')
print('cards', [(c[0], round(c[1], 2), round(c[2], 2)) for c in CARDS])
print('total', round(TOTAL, 3), 'mix', I, P, 'final', meas(OUT))
