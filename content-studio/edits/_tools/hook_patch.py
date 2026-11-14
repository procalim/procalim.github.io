# v4 re-cut for every unposted reel (owner, 2026-11-14: «بما انو شوفت الهبوط وين عدل جميع الفيديوهات ... خلي النص بنص ...
# text hook viral»). The steak read showed the drop at 1-3 s (90% -> 55%) on the raw steps. Each reel gets:
# a hook from the tested bank centred at y 860 from frame 0 to the end of the raw steps, a rehook (a second formula) over
# the shaping and the bake, the keyword over the payoff, and the raw steps in the 1-3 s window sped up.
# Usage: python3 hook_patch.py <reel> <edit script> <cards.json out>
import sys, json, re
reel, script, cards_out = sys.argv[1:4]
AR = 'font-size:50px;line-height:1.18;-webkit-text-stroke:5px #000;text-shadow:0 0 14px rgba(0,0,0,.9),0 3px 8px rgba(0,0,0,.9)'
EN = 'font-size:32px;line-height:1.2;-webkit-text-stroke:4px #000;color:#fff;text-shadow:0 0 12px rgba(0,0,0,.9),0 3px 8px rgba(0,0,0,.9)'
CFG = {
    'tostada': dict(
        speed=[("(12, 34, 1.4, 'turned in the marinade'),", "(12, 34, 1.8, 'turned in the marinade'),   # v4: faster through the 1-3 s drop"),
               ("(64, 83, 1.6, 'the crust close', (1.0, 1.08)),", "(64, 83, 2.0, 'the crust close', (1.0, 1.08)),   # v4: faster through the 1-3 s drop")],
        cards=[('hook', "0.0", "L['the rice on the paper'][0]"), ('rehook', "L['the rice on the paper'][0]", "L['cucumber and avocado'][0]"),
               ('cta', "L['the spicy mayo drizzle'][0]", 'TOTAL')],
        text={'hook': ('التونة لازم تضل<br>حمرا من جوّا', 'Tuna should stay<br>red in the middle'),   # real controversy; «دقيقة كل جهة» is on the worn-out list
              'rehook': ('الرز بيتفتّت لما يبرد.<br>اكبسه دافي', "Rice crumbles once it's cold.<br>Press it warm."),
              'cta': ('اكتب «تونة» 👇', 'Comment TUNA 👇')}),
    'tunaegg': dict(
        speed=[("(8, 29, 1.3, 'the potatoes drop'),", "(8, 29, 1.6, 'the potatoes drop'),   # v4: faster through the 1-3 s drop"),
               ("(58, 70, 1.2, 'the mash'),", "(58, 70, 1.5, 'the mash'),   # v4: faster through the 1-3 s drop")],
        cards=[('hook', "0.0", "L['the balls set down'][0]"), ('rehook', "L['the balls set down'][0]", "L['the tuna spooned in'][0]"),
               ('cta', "L['the 4 on the plate'][0]", 'TOTAL')],
        text={'hook': ('٣٧ غ بروتين<br>بكاسة بطاطا وحدة', '37 g of protein<br>in one potato cup'),   # statistic; the superlative hook goes to the 16th 10 pm
              'rehook': ('٢٥ دقيقة بالفرن<br>وتحتها بيقرمش', '25 minutes in the oven,<br>and the bottom turns crisp'),
              'cta': ('اكتب «بيضة» 👇', 'Comment EGG 👇')}),
    'falafel': dict(
        speed=[("(12, 35, 1.5, 'the chickpeas pour'),", "(12, 35, 1.8, 'the chickpeas pour'),   # v4: faster through the 1-3 s drop"),
               ("(68, 82, 1.2, 'the tahini'),", "(68, 82, 1.5, 'the tahini'),   # v4: faster through the 1-3 s drop")],
        cards=[('hook', "0.0", "L['the mixing'][0]"), ('rehook', "L['the mixing'][0]", "L['the hummus'][0]"),
               ('cta', "L['the tahini drizzle'][0]", 'TOTAL')],
        text={'hook': ('قلي الفلافل<br>هو الغلطة', 'Deep-frying falafel<br>is the mistake'),
              'rehook': ('أقرمش فلافل<br>بلا ولا نقطة زيت قلي', 'The crispiest falafel,<br>not a drop of frying oil'),
              'cta': ('اكتب «فلافل» 👇', 'Comment FALAFEL 👇')}),
}
c = CFG[reel]
s = open(script).read()
for a, b in c['speed']:
    assert a in s, a; s = s.replace(a, b)
a = s.index('CARDS = ['); b = s.index(']\n', a) + 2
cards = 'CARDS = [  # v4: hook, rehook and keyword, all centred at y 860\n' + ''.join(
    f"         ('ov_{k}.png', {t0}, {t1}),\n" for k, t0, t1 in c['cards']).rstrip(',\n') + ']\n'
s = s[:a] + cards + s[b:]
if '# v4 (owner' not in s:
    i = s.index('import subprocess, re')
    s = s[:i] + "# v4 (owner, 2026-11-14): the hook and rehook from the tested bank centred from frame 0, the raw steps faster\n# through the 1-3 s drop the steak read showed. Cards from edits/_tools/hook_patch.py.\n" + s[i:]
open(script, 'w').write(s)
json.dump({'items': {k: {'y': 860, 'ar': f'<span style="{AR}">{ar}</span>', 'en': f'<span style="{EN}">{en}</span>'}
                     for k, (ar, en) in c['text'].items()}}, open(cards_out, 'w'), ensure_ascii=False, indent=1)
print(reel, 'patched')
