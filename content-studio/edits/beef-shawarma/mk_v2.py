# Builds edit_shawarma_v2.py and cards_v2.json from edit_shawarma.py (v1). Run in this folder: python3 mk_v2.py
import json
s = open('edit_shawarma.py').read()
head = """# Beef Shawarma v2 (2026-11-15). Source: raw.mp4 = job 051f9407 (Seedance 2.5 omni reference, 720x1280, 24 fps, 20.06 s;
# prompt prompts/w4-beef-shawarma-20s-v2.txt). v1 read: 94 / 81 / 69% at 1-3 s, -22 points at 3-5 s on the raw tower,
# 26% at the end. v2: the raw steps done by 3.0 s, a card every 2 s that enters in 4 frames (slide up and fade, ease-out),
# the cut the loudest, the end on the bite, a true-peak limit of -1.5 dBTP (master-skills/edit).
# Take errors cut: raw red beef thrown on the griddle at 8.17-9.13 s (frames 196-219); the 1.5 s still hold with the
# knife raised (13.9-15.4 s) cut to 0.5 s. Raw read: DEAD 4, SLOW 3, QUIET 6.
"""
s = head + s[s.index('import subprocess, re'):]
a = s.index('SEGS = ['); b = s.index(']\n', a) + 2
segs = """SEGS = [  # (first frame, end frame, speed, label[, push-in]); cut points from the measured source cuts
    (0, 17, 1.0, 'the cleaver', (1.0, 1.06)),
    (18, 51, 1.4, 'the bowl'),   # slices, spices, lemon, yogurt
    (52, 68, 1.0, 'the toss'),
    (68, 88, 1.3, 'the tower'),
    (88, 110, 1.1, 'the oven'),
    (110, 137, 1.8, 'roasting', (1.0, 1.08)),
    (137, 161, 1.2, 'out of the oven'),
    (161, 196, 1.05, 'the shave', (1.0, 1.06)),
    (220, 232, 1.0, 'the sear'),   # 196-219 left out: raw red beef on the griddle (the owner's catch)
    (232, 255, 1.0, 'the bread'),
    (255, 284, 1.3, 'the filling'),
    (284, 300, 1.2, 'the roll'),
    (300, 333, 1.5, 'the press'),
    (340, 358, 1.5, 'the wait', (1.0, 1.08)),   # the still hold with the knife raised, 1.5 s in the take
    (371, 409, 1.2, 'the cut'),
    (409, 440, 1.3, 'the reveal', (1.0, 1.06)),
    (440, 468, 1.0, 'his bite', (1.0, 1.08)),   # the chewing tail after 19.5 s left out
]
"""
s = s[:a] + segs + s[b:]
a = s.index('CARDS = ['); b = s.index(']\n', a) + 2
cards = """CARDS = [  # a card every 2 s, each pulling to the end; the keyword from the cut
         ('ov_hook.png', 0.0, 2.0),
         ('ov_c2.png', 2.0, 4.0),
         ('ov_c3.png', 4.0, 6.0),
         ('ov_c4.png', 6.0, 8.0),
         ('ov_c5.png', 8.0, 10.0),
         ('ov_c6.png', 10.0, L['the cut'][0]),
         ('ov_cta.png', L['the cut'][0], TOTAL)]
"""
s = s[:a] + cards + s[b:]
old = """    fc.append(f"[{last}][{k + 1}:v]overlay=0:0:enable='between(t,{s:.4f},{e - 0.001:.4f})':eof_action=pass[o{k}]"); last = f'o{k}'"""
assert s.count(old) == 1
new = """    fc.append(f"[{k + 1}:v]format=rgba,fade=t=in:st={s:.4f}:d=0.167:alpha=1[c{k}]")   # 4 frames in, ease-out slide
    fc.append(f"[{last}][c{k}]overlay=x=0:y='if(lt(t-{s:.4f},0.167),28*pow(1-(t-{s:.4f})/0.167,2),0)':eval=frame:"
              f"enable='between(t,{s:.4f},{e - 0.001:.4f})':eof_action=pass[o{k}]"); last = f'o{k}'"""
s = s.replace(old, new)
old = """SHAPE = (f"volume=6dB:enable='between(t,{L[LIFT_LABEL][0]:.3f},{L[LIFT_LABEL][0] + 0.6:.3f})',"   # the cut: the loudest
         f"volume=-4dB:enable='between(t,{L['the toss'][0]:.3f},{L['the toss'][1]:.3f})',"   # v1: the toss 77.6 dB, the cut 73
         f"volume=-3dB:enable='between(t,{L['roasting'][0]:.3f},{L['roasting'][1]:.3f})',")   # after the compressors, v2"""
assert s.count(old) == 1
s = s.replace(old, """SHAPE = (f"volume=6dB:enable='between(t,{L[LIFT_LABEL][0]:.3f},{L[LIFT_LABEL][0] + 0.8:.3f})',")   # the cut: the loudest""")
old = "'alimiter=limit=0.82:attack=2:release=60:level=disabled,aresample=48000,pan=stereo|c0=c0|c1=c0[ao]'"
assert s.count(old) == 1
s = s.replace(old, "'aresample=192000,alimiter=limit=0.841:attack=5:release=50:level=disabled,aresample=48000,pan=stereo|c0=c0|c1=c0[ao]'")
old = "LIFT_LABEL = 'the cut'   # the cleaver through the crisp roll: +6 dB after the compressors over its first 0.6 s"
assert s.count(old) == 1
s = s.replace(old, "LIFT_LABEL = 'the cut'   # the knife through the crisp roll: +6 dB after the compressors over its first 0.8 s")
assert s.count("'beef-shawarma.mp4'") == 2
s = s.replace("'beef-shawarma.mp4'", "'beef-shawarma-v2.mp4'")
open('edit_shawarma_v2.py', 'w').write(s)
AR = 'font-size:50px;line-height:1.18;-webkit-text-stroke:5px #000;text-shadow:0 0 14px rgba(0,0,0,.9),0 3px 8px rgba(0,0,0,.9)'
EN = 'font-size:32px;line-height:1.2;-webkit-text-stroke:4px #000;color:#fff;text-shadow:0 0 12px rgba(0,0,0,.9),0 3px 8px rgba(0,0,0,.9)'
T = {
 'hook': (890, 'حبيبي، ليش ما عم<br>بتعملي <b>شاورما لحمة</b>؟', "Habibi, why won't you<br>make me beef shawarma?"),
 'c2': (860, 'استنى <b>القرمشة</b><br>بالآخر 🔊', 'Wait for the crunch<br>at the end 🔊'),
 'c3': (860, 'برج بالفرن،<br>بلا <b>سيخ دوّار</b>', 'A tower in the oven,<br>no rotisserie'),
 'c4': (860, '<b>٢٢٠ درجة</b><br>وبتطلع مقرمشة', '220°C<br>and it comes out crisp'),
 'c5': (860, '<b>٥١ غ بروتين</b><br>بسندويشة وحدة', '51 g of protein<br>in one wrap'),
 'c6': (860, 'جاهز؟ 🔪', 'Ready? 🔪'),
 'cta': (300, 'اكتب <b>«شاورما»</b> 👇', 'Comment SHAWARMA 👇'),
}
items = {k: {'y': y, 'ar': f'<span style="{AR}">{a}</span>', 'en': f'<span style="{EN}">{e}</span>'} for k, (y, a, e) in T.items()}
json.dump({'items': items}, open('cards_v2.json', 'w'), ensure_ascii=False, indent=1)
