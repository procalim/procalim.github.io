# Builds edit_shawarma_completion.py from edit_shawarma.py (v1). One variable against v1: the pace (12.5 s instead of
# 15.75 s); the same take, cards, order and sound chain. Run in this folder: python3 mk_completion.py
s = open('edit_shawarma.py').read()
head = """# Beef Shawarma, the completion cut (2026-11-15; owner: «المهم والي لازم ينعمل انو نخلي المشاهد يكمل»). Source: the v1 take
# (job 53be7e0c), the v1 cards and sound chain. v1 read: 94 / 81 / 68% at 1-3 s, -22 points at 3-5 s (the toss and the raw
# tower), then about -2 points a second to 26% at the end of 15.75 s. Here only the pace changes: raw meat never fills the
# frame for more than about 0.6 s at a time, every middle shot 0.5-0.75 s, the shave and the cut kept long, 12.5 s.
"""
s = head + s[s.index('import subprocess, re'):]
a = s.index('SEGS = ['); b = s.index(']\n', a) + 2
segs = """SEGS = [  # (first frame, end frame, speed, label[, push-in]); the v1 take's cut points
    (0, 34, 1.0, 'the cleaver', (1.0, 1.06)),   # v1's opening kept whole: 94 / 81% at 1-2 s
    (40, 64, 1.6, 'slices and spices'),
    (64, 78, 2.0, 'the lemon'),
    (82, 100, 1.0, 'the toss', (1.0, 1.05)),   # the apex and the slap only
    (110, 146, 3.0, 'the tower'),   # v1 at 1.6x: the raw tower on screen 0.92 s
    (146, 166, 1.3, 'the oven'),
    (166, 200, 2.5, 'roasting', (1.0, 1.08)),
    (200, 232, 1.8, 'out of the oven'),
    (232, 276, 1.2, 'the shave', (1.0, 1.06)),
    (276, 304, 1.6, 'the sear'),
    (304, 324, 1.3, 'the bread'),
    (324, 356, 2.0, 'the toum and the filling'),
    (356, 382, 1.8, 'the roll'),
    (382, 418, 2.6, 'the press', (1.0, 1.08)),
    (418, 442, 1.0, 'the cut'),
    (442, 468, 1.0, 'his bite', (1.0, 1.08)),
]
"""
s = s[:a] + segs + s[b:]
a = s.index('CARDS = ['); b = s.index(']\n', a) + 2
cards = """CARDS = [  # v1's cards and order, re-timed to the shorter cut
         ('ov_hook.png', 0.0, L['the tower'][0]),
         ('ov_c2.png', L['the tower'][0], L['the shave'][0]),
         ('ov_c3.png', L['the shave'][0], L['the sear'][0]),
         ('ov_c4.png', L['the sear'][0], L['the toum and the filling'][0]),
         ('ov_c5.png', L['the toum and the filling'][0], L['the cut'][0]),
         ('ov_cta.png', L['the cut'][0], TOTAL)]
"""
s = s[:a] + cards + s[b:]
assert s.count("'beef-shawarma.mp4'") == 2
s = s.replace("'beef-shawarma.mp4'", "'beef-shawarma-completion.mp4'")
open('edit_shawarma_completion.py', 'w').write(s)
