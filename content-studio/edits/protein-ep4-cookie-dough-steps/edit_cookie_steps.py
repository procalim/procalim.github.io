# High-protein Cookie Dough, STEP BY STEP (N° 105), Seedance 2.5 20 s take a547d90e (the owner's unlimited),
# 2026-11-19. edits/_tools/steps_edit.py on research/edit-reference-2026-11-19.md: the result first (both cookie dough
# outliers open on the finished dough, 8.3x and 6.1x), every step in order, the result again; 60 fps.
# Usage (Higgsfield sandbox, /home/user/cd2 with take.mp4): python3 edit_cookie_steps.py [cards]
import sys
sys.path.insert(0, '/home/user/rv')
from steps_edit import build, timing

SHOTS = [0, 90, 137, 197, 240, 288, 332, 357, 481]   # scdet: 3.75, 5.71, 8.21, 10.00, 12.00, 13.83, 14.88 s
SEGS = [
    (360, 438, 1.0, 'the result'),        # the finished dough, the spoon through it, the scoop lifted (no face yet)
    (0, 90, 1.25, 'into the blender'),    # the curds' plop, the syrup, the vanilla, the lid
    (90, 137, 1.5, 'the blend'),          # to silk
    (137, 197, 1.25, 'the pour'),         # into the glass bowl
    (197, 240, 1.0, 'flour and protein'), # the almond flour, the protein powder
    (240, 288, 1.25, 'the stir'),         # to dough
    (288, 357, 1.25, 'the chips'),        # the chips rain, the fold
    (360, 481, 1.0, 'the bite'),          # the result again, the scoop, the bite
]
n60, L, T = timing(SEGS)
H0 = L['the bite'][0]
CARDS = [  # (key, start, end, y, items)
    ('hook', 0.0, L['the result'][1], 560,        # hook bank E + B, the kids angle; complete at frame one
     [{'k': 'title', 't': 'ولادك بياكلوا العجينة نيّة؟'}, {'k': 'caps', 't': 'raw dough?'}]),
    ('blender', L['into the blender'][0], L['into the blender'][1], 470, [{'k': 'line', 't': 'جبنة قريش، قيقب، فانيلا'}]),
    ('silk', L['the blend'][0], L['the blend'][1], 250, [{'k': 'line', 't': 'لحتى تصير متل الحرير'}]),
    ('protein', L['the pour'][0], L['the pour'][1], 250, [{'k': 'line', 't': 'حوالي 70 غ بروتين بالوعاء'}]),
    ('swap', L['flour and protein'][0], L['the stir'][1], 250, [{'k': 'line', 't': 'دقيق لوز بدل الطحين'}]),
    ('best', L['the chips'][0], L['the chips'][1], 250, [{'k': 'line', 't': 'وهلق أطيب جزء'}]),
    ('answer', H0, H0 + 2.4, 560,
     [{'k': 'line', 't': 'السر: بلا طحين نيّ ولا بيض نيّ'}, {'k': 'italic', 't': 'No raw flour. No raw egg.'}]),
    ('send', H0 + 2.4, T, 1250,                    # the kids angle (8.7 and 7.8 sends per 1K)
     [{'k': 'kicker', 't': 'بروتين من الكتاب · حلقة ٤'}, {'k': 'line', 't': 'ابعتها للي ولاده بيسرقوا عجينة الكوكيز'}]),
]
META = {'hook_formula': ['E', 'B'], 'send_type': 'kids'}
build(SEGS, SHOTS, CARDS, META, 'protein-ep4-cookie-dough-steps.mp4', only_cards='cards' in sys.argv, reuse_video='reuse' in sys.argv)
