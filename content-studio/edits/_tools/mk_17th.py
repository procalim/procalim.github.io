# Builds the 17 Nov edit scripts (mashed potato tacos, stuffed sweet potato flatbreads) from the tostada v4 script, and
# their cards. Usage: python3 mk_17th.py <tostada edit script> <tacos dir> <stuffed dir>
import sys, json
src = open(sys.argv[1]).read()
AR = 'font-size:50px;line-height:1.18;-webkit-text-stroke:5px #000;text-shadow:0 0 14px rgba(0,0,0,.9),0 3px 8px rgba(0,0,0,.9)'
EN = 'font-size:32px;line-height:1.2;-webkit-text-stroke:4px #000;color:#fff;text-shadow:0 0 12px rgba(0,0,0,.9),0 3px 8px rgba(0,0,0,.9)'


def make(header, segs, lift, cards, outname):
    s = header + src[src.index('import subprocess, re'):]
    a = s.index('SEGS = ['); b = s.index(']\n', a) + 2
    s = s[:a] + segs + s[b:]
    s = s.replace("LIFT_LABEL = 'his bite'   # the bite's crunch: +4 dB over its first 0.6 s", lift)
    a = s.index('CARDS = ['); b = s.index(']\n', a) + 2
    s = s[:a] + cards + s[b:]
    return s.replace("'crispy-rice-tostadas.mp4'", f"'{outname}'")


def cards_json(path, text):
    json.dump({'items': {k: {'y': 860, 'ar': f'<span style="{AR}">{a}</span>', 'en': f'<span style="{EN}">{e}</span>'}
                         for k, (a, e) in text.items()}}, open(path, 'w'), ensure_ascii=False, indent=1)


tacos = make("""# Crispy Mashed Potato Flatbread Tacos (17 Nov 3 pm). Source: raw.mp4 = job 6fbfea7b (Seedance 2.5 omni reference;
# fiteat.rima's 3.47M reel DefP5cCpCSk, sped to 14 s and silent, as @Video1). Her way, no fake hook; the v4 cards.
# Cut from the measured shots; frames 0-2 (a stray first frame) and 126-130 (a marble flash) left out; the bite's still
# tail cut at 330.
""", """SEGS = [  # (first frame, end frame, speed, label[, push-in]); cut points from the measured source cuts
    (2, 24, 1.3, 'potatoes drop'),
    (24, 30, 1.0, 'three potatoes'),
    (30, 40, 1.0, 'the flour'),
    (40, 62, 1.8, 'cheese and seasoning'),   # source DEAD at 2.0 s
    (62, 70, 1.0, 'the knead'),
    (70, 76, 1.0, 'balls set down'),
    (76, 98, 1.6, 'the oil'),   # source DEAD at 3.5 s
    (98, 122, 1.3, 'the press'),
    (122, 126, 1.0, 'ridged rounds'),
    (130, 152, 1.2, 'crisp crust tapped', (1.0, 1.06)),
    (152, 172, 1.3, 'avocado cut'),
    (172, 186, 1.2, 'avocado halves'),
    (186, 206, 1.3, 'coriander'),
    (206, 216, 1.0, 'onion and lime'),
    (216, 230, 1.2, 'the guacamole'),
    (230, 250, 1.3, 'guacamole spread'),
    (250, 270, 1.4, 'the beef'),
    (270, 294, 1.6, 'pickled onions'),   # source SLOW at 11.5 s
    (294, 310, 1.2, 'the 4 on the plate', (1.0, 1.06)),
    (310, 330, 1.5, 'his bite', (1.0, 1.12)),   # source DEAD at 13.5 s: the still tail cut
]
""", "LIFT_LABEL = 'crisp crust tapped'   # the knife on the crisp crust: +4 dB over its first 0.6 s",
"""CARDS = [  # v4: hook, rehook and keyword, all centred at y 860
         ('ov_hook.png', 0.0, L['the press'][0]),   # 3.0 s to read two lines (to the knead it was 1.9 s)
         ('ov_rehook.png', L['the press'][0], L['avocado cut'][0]),
         ('ov_cta.png', L['the 4 on the plate'][0], TOTAL)]
""", 'mashed-potato-tacos.mp4')
stuffed = make("""# Cheesy Beef & Spinach Stuffed Sweet Potato Flatbreads (17 Nov 10 pm). Source: raw.mp4 = job 293d47dd (Seedance 2.5
# omni reference; fiteat.rima's 6.17M reel DeXzoDtpSVS, sped to 14 s and silent, as @Video1; the reel behind our 36K
# patties). Her way, no fake hook; the v4 cards. Left out: frames 0-8 (an empty tray), 38-44 (a blur and a marble flash),
# 48-72 (the oil poured on the baked potato: the recipe rubs it on before baking), 144-146 and 212-214 (flashes).
""", """SEGS = [  # (first frame, end frame, speed, label[, push-in]); cut points from the measured source cuts
    (9, 18, 1.2, 'the potato laid'),   # from 9: frames 0-8 are empty paper, the hand comes in at 9
    (18, 38, 1.5, 'fork pricks'),
    (44, 48, 1.0, 'baked'),
    (72, 82, 1.0, 'the peel'),
    (82, 92, 1.0, 'the flesh'),
    (92, 108, 1.3, 'the mash'),
    (108, 120, 1.0, 'the mozzarella'),
    (120, 136, 1.3, 'flour and pepper'),
    (136, 144, 1.0, 'the knead'),
    (146, 158, 1.0, 'the filling'),
    (158, 170, 1.0, 'the cheese'),
    (170, 180, 1.0, 'the film'),
    (180, 190, 1.0, 'twisted'),
    (190, 202, 1.0, 'pressed'),
    (202, 212, 1.0, 'the round'),
    (214, 234, 1.3, 'the pan'),
    (234, 250, 1.2, 'the cut'),
    (250, 280, 1.8, 'the cheese pull', (1.0, 1.10)),   # source DEAD 10.5 s, SLOW 11.0 s
    (280, 302, 1.2, 'the dip'),
    (306, 326, 1.6, 'his bite', (1.0, 1.12)),   # source DEAD 13.0-13.5 s: the still tail cut
]
""", "LIFT_LABEL = 'the cheese pull'   # the halves pulled apart: +4 dB over its first 0.6 s",
"""CARDS = [  # v4: hook, rehook and keyword, all centred at y 860
         ('ov_hook.png', 0.0, L['the filling'][0]),
         ('ov_rehook.png', L['the filling'][0], L['the pan'][0]),
         ('ov_cta.png', L['the dip'][0], TOTAL)]
""", 'stuffed-sweet-potato-flatbreads.mp4')
open(f'{sys.argv[2]}/edit_tacos.py', 'w').write(tacos)
open(f'{sys.argv[3]}/edit_stuffed.py', 'w').write(stuffed)
cards_json(f'{sys.argv[2]}/cards.json', {
    'hook': ('التاكو بلا خبز:<br>بطاطا وبس', 'Tacos with no tortilla:<br>just potato'),
    'rehook': ('الخطوط بالأصابع<br>هي اللي بتقرّمشها', 'The finger ridges<br>are what make it crunch'),
    'cta': ('اكتب «تاكو» 👇', 'Comment TACOS 👇')})
cards_json(f'{sys.argv[3]}/cards.json', {
    'hook': ('إذا بتحب الجبنة الذايبة<br>شوف للآخر', 'If you love melted cheese,<br>watch to the end'),
    'rehook': ('السر: لفّها<br>بالنايلون', 'The secret:<br>twist it in cling film'),
    'cta': ('اكتب «محشي» 👇', 'Comment STUFFED 👇')})
print('built')
