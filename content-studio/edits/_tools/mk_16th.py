# Builds the 16 Nov edit scripts (aubergine stacks, sweet potato flatbreads) from the tostada v4 script, and their cards.
# Usage: python3 mk_16th.py <tostada edit script> <aubergine dir> <sweet potato flatbread dir>
import sys, json
src = open(sys.argv[1]).read()
AR = 'font-size:50px;line-height:1.18;-webkit-text-stroke:5px #000;text-shadow:0 0 14px rgba(0,0,0,.9),0 3px 8px rgba(0,0,0,.9)'
EN = 'font-size:32px;line-height:1.2;-webkit-text-stroke:4px #000;color:#fff;text-shadow:0 0 12px rgba(0,0,0,.9),0 3px 8px rgba(0,0,0,.9)'


def make(header, segs, lift, cards, outname):
    s = src
    s = header + s[s.index('import subprocess, re'):]
    a = s.index('SEGS = ['); b = s.index(']\n', a) + 2
    s = s[:a] + segs + s[b:]
    s = s.replace("LIFT_LABEL = 'his bite'   # the bite's crunch: +4 dB over its first 0.6 s", lift)
    a = s.index('CARDS = ['); b = s.index(']\n', a) + 2
    s = s[:a] + cards + s[b:]
    return s.replace("'crispy-rice-tostadas.mp4'", f"'{outname}'")


def cards_json(path, text):
    json.dump({'items': {k: {'y': 860, 'ar': f'<span style="{AR}">{a}</span>', 'en': f'<span style="{EN}">{e}</span>'}
                         for k, (a, e) in text.items()}}, open(path, 'w'), ensure_ascii=False, indent=1)


aub = make("""# Baked Aubergine Chicken Stacks (16 Nov 3 pm). Source: raw.mp4 = job d9d55536 (Seedance 2.5 omni reference, prompt v2
# after v1 was refused as restricted; fiteat.rima's 3.5M reel trimmed past its first shot as @Video1). The v4 method: the hook
# centred from frame 0 over the slicing, the rehook over the build, the keyword over the plate; the raw take's 7 still
# stretches (the crumbs, the parsley, the held stack) at 2.0-2.2x with push-ins.
""", """SEGS = [  # (first frame, end frame, speed, label[, push-in]); cut points from the measured source cuts
    (0, 8, 1.0, 'the knife trims the top'),
    (8, 34, 1.4, 'the slices'),
    (36, 50, 1.2, 'the slices fan out'),
    (52, 68, 1.2, 'cheese on the rounds'),
    (76, 88, 1.0, 'the filling spooned'),
    (92, 106, 1.3, 'the filling spread'),
    (108, 118, 1.0, 'the second cheese'),
    (120, 125, 1.0, 'the round on top'),
    (128, 136, 1.0, 'the 4 stacks'),
    (140, 149, 1.0, 'the egg wash'),
    (152, 168, 2.0, 'the crumbs', (1.0, 1.08)),   # source motion 2.2: DEAD at 1.0x
    (172, 192, 1.5, 'tomatoes, garlic and oil'),
    (196, 204, 1.0, 'the ramekin on the tray'),
    (208, 220, 1.5, 'into the oven'),
    (224, 230, 1.0, 'the spatula lifts'),
    (232, 248, 1.2, 'on the plate', (1.0, 1.06)),
    (252, 264, 1.0, 'tomatoes spooned on'),
    (264, 290, 2.2, 'the parsley', (1.0, 1.08)),   # source DEAD 11-12 s
    (292, 338, 2.6, 'the layers', (1.0, 1.12)),   # source DEAD 12.5-14 s; 2.6x: SLOW at 2.0x
]
""", "LIFT_LABEL = 'the spatula lifts'   # the spatula on the crisp crust: +4 dB over its first 0.6 s",
"""CARDS = [  # v4: hook, rehook and keyword, all centred at y 860
         ('ov_hook.png', 0.0, L['the filling spooned'][0]),
         ('ov_rehook.png', L['the filling spooned'][0], L['the spatula lifts'][0]),
         ('ov_cta.png', L['on the plate'][0], TOTAL)]
""", 'aubergine-chicken-stacks.mp4')
spf = make("""# Baked Sweet Potato Flatbreads with Seasoned Chicken & Pecans (16 Nov 10 pm). Source: raw.mp4 = job fe70bbc8 (Seedance 2.5
# omni reference; fiteat.rima's 6.9M reel as @Video1). The v4 method: the hook centred from frame 0 over the peel and the
# mash, the rehook over the dough and the press, the keyword over the plate and the bite; the take's still stretches (the
# balls, the pecans, the bite) sped up with push-ins. The take is quiet (median 47 dB): the house chain levels it.
""", """SEGS = [  # (first frame, end frame, speed, label[, push-in]); cut points from the measured source cuts
    (0, 16, 1.2, 'the skin peeled'),
    (20, 31, 1.0, 'the flesh on the plate'),
    (32, 58, 1.6, 'the fork mash'),
    (60, 76, 1.4, 'the mozzarella'),
    (80, 92, 1.2, 'the flour'),
    (92, 106, 1.3, 'the mixing'),
    (106, 122, 1.3, 'the knead'),
    (128, 164, 2.0, 'the balls set down'),   # source SLOW at 6.0 s
    (164, 172, 1.0, 'pressed flat'),
    (184, 196, 1.0, 'baked'),
    (196, 210, 1.2, 'one lifted'),
    (210, 230, 1.4, 'the yogurt sauce'),
    (230, 240, 1.0, 'the spinach'),
    (240, 260, 1.4, 'the chicken laid on'),
    (260, 290, 2.0, 'pecans and cheese', (1.0, 1.08)),   # source DEAD at 11.5 s
    (290, 306, 1.0, 'the 4 on the plate', (1.0, 1.06)),
    (308, 328, 1.6, 'his bite', (1.0, 1.12)),   # source DEAD at 13.5 s; the still tail cut (SLOW at 338)
]
""", "LIFT_LABEL = 'his bite'   # the bite: +4 dB over its first 0.6 s",
"""CARDS = [  # v4: hook, rehook and keyword, all centred at y 860
         ('ov_hook.png', 0.0, L['the knead'][0]),
         ('ov_rehook.png', L['the knead'][0], L['the yogurt sauce'][0]),
         ('ov_cta.png', L['the 4 on the plate'][0], TOTAL)]
""", 'sweet-potato-flatbreads.mp4')
open(f'{sys.argv[2]}/edit_aubergine.py', 'w').write(aub)
open(f'{sys.argv[3]}/edit_spflat.py', 'w').write(spf)
cards_json(f'{sys.argv[2]}/cards.json', {
    'hook': ('الباذنجان بيطلع مي<br>إذا ما انملّح قبل', "Aubergine turns watery<br>when it isn't salted first"),
    'rehook': ('الباذنجان<br>أطيب من الخبز', 'Aubergine makes<br>a better bun than bread'),   # head to head; the falafel rehook before it is a superlative
    'cta': ('اكتب «باذنجان» 👇', 'Comment EGGPLANT 👇')})
cards_json(f'{sys.argv[3]}/cards.json', {
    'hook': ('الطريقة الوحيدة<br>ولادك بياكلوا بطاطا حلوة', 'The only way your kids<br>will eat sweet potato'),
    'rehook': ('أسمك من ٥ ملم<br>بتضل عجينة', 'Thicker than 5 mm,<br>and it stays doughy'),
    'cta': ('اكتب «بطاطا» 👇', 'Comment FLATBREAD 👇')})
print('built')
