# 2-Ingredient Bagels, STEP BY STEP (N° 019), Seedance 2.5 20 s take e22ebda2 (the owner's unlimited), 2026-11-19.
# edits/_tools/steps_edit.py on research/edit-reference-2026-11-19.md: the result first (the cloud bread outlier,
# 779x, opens on hands tearing the finished bread open, one macro shot), every step in order, the result again; 60 fps.
# The tear slowed to 0.65 by interpolation: 7 sharp onsets in 0-3 s, calm motion (open3.py on the slowed opening).
# Usage (Higgsfield sandbox, /home/user/bg2 with take.mp4): python3 edit_bagel_steps.py [cards]
import sys
sys.path.insert(0, '/home/user/rv')
from steps_edit import build, timing

SHOTS = [0, 39, 109, 131, 202, 227, 243, 281, 345, 390, 453, 481]   # scdet: 1.63 4.54 5.46 8.42 9.46 10.13 11.71 14.38 16.25 18.88
SEGS = [
    (390, 440, 0.65, 'the result'),          # the baked bagel torn open in gloved hands, slow motion (no face yet)
    (0, 39, 1.25, 'the oven'),               # the knob, the glow (375°F / 190°C)
    (39, 131, 1.3, 'flour and yogurt'),      # the flour, the yogurt, the mix
    (131, 227, 1.3, 'knead and shape'),      # the knead, 4 pieces, the rope, the ring, 4 rings
    (227, 281, 1.25, 'the egg'),             # cracked, beaten
    (281, 345, 1.15, 'wash and seeds'),      # the egg wash, the seasoning
    (345, 390, 1.25, 'the bake'),            # puffed and golden
    (390, 481, 1.0, 'the bite'),             # the result again, the tear, the bite
]
n60, L, T = timing(SEGS)
H0 = L['the bite'][0]
CARDS = [  # (key, start, end, y, items)
    ('hook', 0.0, L['the result'][1], 360,        # hook bank G: benefit + a surprising limit; complete at frame one
     [{'k': 'title', 't': 'بيغل من مكوّنين بس؟'}, {'k': 'caps', 't': 'no yeast?'}]),
    ('oven', L['the oven'][0], L['the oven'][1], 250, [{'k': 'line', 't': 'الفرن على 190°'}]),
    ('two', L['flour and yogurt'][0], L['flour and yogurt'][1], 250, [{'k': 'line', 't': 'كوب طحين + كوب زبادي يوناني'}]),
    ('four', L['knead and shape'][0], L['knead and shape'][1], 250, [{'k': 'line', 't': '4 كرات… 4 حلقات'}]),
    ('egg', L['the egg'][0], L['wash and seeds'][1], 250, [{'k': 'line', 't': 'بيضة للوجه، وسمسم فوقها'}]),
    ('bake', L['the bake'][0], L['the bake'][1], 250, [{'k': 'line', 't': '20-25 دقيقة لحتى تدهّب'}]),
    ('answer', H0, H0 + 2.0, 360,                 # the book's chef's note
     [{'k': 'line', 't': 'السر: زبادي يوناني سميك'}, {'k': 'italic', 't': 'Watery yogurt ruins the dough.'}]),
    ('send', H0 + 2.0, T, 1400,                   # a friend's mistake
     [{'k': 'kicker', 't': 'من الكتاب · الوصفة ١٩'}, {'k': 'line', 't': 'ابعتها للي مفكّر البيغل بدها خميرة'}]),
]
META = {'hook_formula': ['G'], 'send_type': 'mistake'}
build(SEGS, SHOTS, CARDS, META, 'bagels-steps.mp4', only_cards='cards' in sys.argv)
