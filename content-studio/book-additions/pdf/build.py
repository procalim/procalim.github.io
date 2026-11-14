# Builds the new recipes PDF: python3 build.py && node render.mjs
# Image per recipe: ../images/<slug>.jpg (the owner's photo, 4:3) first, else frames/<slug>.jpg (a frame of the reel),
# else a placeholder panel. The build prints which one each recipe used.
import html, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from recipes import RECIPES

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.abspath(os.path.join(HERE, '..', '..', 'node_modules', '@fontsource'))
AR_DIGITS = str.maketrans('0123456789', '٠١٢٣٤٥٦٧٨٩')
e = html.escape


def font(family, path, weight, style='normal'):
    return (f"@font-face{{font-family:'{family}';src:url('file://{FONTS}/{path}') format('woff2');"
            f"font-weight:{weight};font-style:{style};}}")


FACES = ''.join([
    font('Playfair', 'playfair-display/files/playfair-display-latin-400-normal.woff2', 400),
    font('Playfair', 'playfair-display/files/playfair-display-latin-600-normal.woff2', 600),
    font('Playfair', 'playfair-display/files/playfair-display-latin-400-italic.woff2', 400, 'italic'),
    font('Amiri', 'amiri/files/amiri-arabic-400-normal.woff2', 400),
    font('Amiri', 'amiri/files/amiri-arabic-700-normal.woff2', 700),
    font('Inter', 'inter/files/inter-latin-400-normal.woff2', 400),
    font('Inter', 'inter/files/inter-latin-500-normal.woff2', 500),
    font('Inter', 'inter/files/inter-latin-600-normal.woff2', 600),
    font('Tajawal', 'tajawal/files/tajawal-arabic-400-normal.woff2', 400),
    font('Tajawal', 'tajawal/files/tajawal-arabic-500-normal.woff2', 500),
    font('Tajawal', 'tajawal/files/tajawal-arabic-700-normal.woff2', 700),
])

CSS = FACES + """
@page{size:A4;margin:0}
:root{--ink:#121214;--paper:#F7F3EA;--paper2:#EDE6D8;--gold:#C6A033;--gold-d:#9C7C22;--night:#0B0B0D;--muted:#6B6252}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:var(--paper)}
body{font-family:Inter,Tajawal,sans-serif;color:var(--ink);-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:210mm;height:297mm;position:relative;overflow:hidden;page-break-after:always;background:var(--paper)}
.page:last-child{page-break-after:auto}
.ar{font-family:Tajawal,sans-serif;direction:rtl;text-align:right}
.ard{font-family:Amiri,serif;direction:rtl}
.dark{background:var(--night);color:var(--paper)}
.rule{height:1px;background:var(--gold);opacity:.7}
.folio{position:absolute;bottom:9mm;left:0;right:0;display:flex;justify-content:space-between;padding:0 16mm;font-size:7.5pt;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}
.folio .ar{letter-spacing:0;text-transform:none;font-size:8.5pt}
/* cover */
.cover{display:flex;flex-direction:column;align-items:center;text-align:center;padding:20mm 18mm 16mm}
.cover .kicker{font-size:8pt;letter-spacing:.42em;text-transform:uppercase;color:var(--gold)}
.cover h1{font-family:Playfair,serif;font-weight:400;font-size:44pt;line-height:1.05;margin-top:7mm;color:var(--paper)}
.cover h1 i{color:var(--gold)}
.cover .sub{font-family:Playfair,serif;font-style:italic;font-size:15pt;color:var(--paper2);margin-top:3mm}
.cover .subar{font-family:Amiri,serif;font-size:21pt;color:var(--gold);margin-top:1mm;direction:rtl}
.cover .hero{margin-top:10mm;width:150mm;height:112.5mm;border:1px solid var(--gold);padding:3mm}
.cover .hero div{width:100%;height:100%;background-size:cover;background-position:center}
.cover .tag{margin-top:9mm;font-size:10pt;letter-spacing:.06em;color:var(--paper2)}
.cover .tagar{font-family:Tajawal;font-size:12pt;color:var(--paper2);margin-top:1.5mm;direction:rtl}
.cover .site{position:absolute;bottom:13mm;left:0;right:0;font-size:8pt;letter-spacing:.32em;text-transform:uppercase;color:var(--gold)}
/* contents and notes */
.inner{padding:22mm 18mm 20mm}
.h2{display:flex;justify-content:space-between;align-items:baseline}
.h2 .en{font-family:Playfair,serif;font-size:26pt;font-weight:400}
.h2 .ar{font-family:Amiri,serif;font-size:28pt}
.toc{margin-top:9mm}
.toc .row{display:grid;grid-template-columns:12mm 1fr 1fr 10mm;align-items:baseline;padding:4.2mm 0;border-bottom:1px solid #D9CFBb}
.toc .n{font-family:Playfair,serif;color:var(--gold-d);font-size:13pt}
.toc .t{font-family:Playfair,serif;font-size:12.5pt}
.toc .ta{font-family:Amiri,serif;font-size:14pt;direction:rtl;text-align:right;padding-right:4mm}
.toc .p{font-size:9pt;color:var(--muted);text-align:right}
.notes{margin-top:9mm;display:grid;grid-template-columns:1fr 1fr;gap:10mm}
.notes h3{font-family:Playfair,serif;font-weight:600;font-size:11pt;margin-bottom:2mm;color:var(--gold-d)}
.notes .ar h3{font-family:Amiri,serif;font-size:14pt;font-weight:700}
.notes p,.notes li{font-size:9pt;line-height:1.55;margin-bottom:2mm}
.notes .ar p,.notes .ar li{font-size:10.5pt;line-height:1.7}
.notes ul{padding-left:4mm}.notes .ar ul{padding-left:0;padding-right:5mm}
/* recipe opener */
.photo{width:210mm;height:157.5mm;background-size:cover;background-position:center;position:relative}
.ph{display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--night);color:var(--gold)}
.ph .a{font-family:Playfair,serif;font-style:italic;font-size:14pt}.ph .b{font-family:Amiri,serif;font-size:17pt;direction:rtl;margin-top:2mm}
.ph .c{font-size:7.5pt;letter-spacing:.3em;text-transform:uppercase;margin-top:5mm;color:var(--paper2);opacity:.6}
.num{position:absolute;left:16mm;bottom:-9mm;width:18mm;height:18mm;border-radius:50%;background:var(--night);color:var(--gold);display:flex;align-items:center;justify-content:center;font-family:Playfair,serif;font-size:15pt;border:1px solid var(--gold)}
.open{padding:16mm 16mm 0}
.titles{display:grid;grid-template-columns:1fr 1fr;gap:8mm;align-items:end}
.titles .en{font-family:Playfair,serif;font-size:23pt;line-height:1.12;font-weight:400}
.titles .ar{font-family:Amiri,serif;font-size:25pt;line-height:1.3}
.lines{display:grid;grid-template-columns:1fr 1fr;gap:8mm;margin-top:4mm}
.lines .en{font-family:Playfair,serif;font-style:italic;font-size:11pt;color:#3B362C;line-height:1.45}
.lines .ar{font-size:11.5pt;color:#3B362C;line-height:1.6}
.meta{margin-top:7mm;display:flex;gap:3mm;align-items:stretch}
.chip{flex:1;border:1px solid var(--gold);padding:3mm 2mm;text-align:center}
.chip b{display:block;font-family:Playfair,serif;font-weight:400;font-size:17pt;color:var(--ink)}
.chip span{display:block;font-size:6.8pt;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-top:.6mm}
.chip em{display:block;font-style:normal;font-family:Tajawal;font-size:8.5pt;color:var(--muted);direction:rtl}
.makes{margin-top:5mm;display:flex;justify-content:space-between;font-size:8.5pt;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-d)}
.makes .ar{letter-spacing:0;text-transform:none;font-size:10.5pt}
/* recipe body */
.body{display:grid;grid-template-columns:1fr 1px 1fr;gap:7mm;padding:15mm 15mm 0;height:255mm}
.vr{background:var(--gold);opacity:.5}
.col h4{font-family:Playfair,serif;font-weight:600;font-size:9.5pt;letter-spacing:.22em;text-transform:uppercase;color:var(--gold-d);margin:0 0 2.5mm}
.col.ar h4{font-family:Amiri,serif;font-size:14pt;letter-spacing:0;font-weight:700}
.col h5{font-family:Inter;font-weight:600;font-size:8pt;margin:2.4mm 0 1mm;color:var(--ink)}
.col.ar h5{font-family:Tajawal;font-weight:700;font-size:10pt}
.col ul{list-style:none}
.col li{font-size:8.3pt;line-height:1.45;padding:.5mm 0 .5mm 4mm;position:relative}
.col li:before{content:'';position:absolute;left:0;top:2.4mm;width:1.6mm;height:1.6mm;border-radius:50%;background:var(--gold)}
.col.ar li{font-size:9.3pt;line-height:1.5;padding:.4mm 4mm .4mm 0}
.col.ar li:before{left:auto;right:0;top:2.9mm}
.col ol{list-style:none;counter-reset:s;margin-top:1mm}
.col ol li{counter-increment:s;padding-left:7mm}
.col ol li:before{content:counter(s);background:none;width:auto;height:auto;top:.4mm;font-family:Playfair,serif;font-size:10pt;color:var(--gold-d)}
.col.ar ol li{padding-left:0;padding-right:7mm}
.col.ar ol li:before{content:counter(s,arabic-indic)}
.sp{height:4mm}
.note{position:absolute;left:15mm;right:15mm;bottom:17mm;display:grid;grid-template-columns:1fr 1fr;gap:10mm;border-top:1px solid var(--gold);padding-top:3mm}
.note .en{font-size:7.8pt;color:var(--muted);line-height:1.5}.note .ar{font-size:9pt;color:var(--muted);line-height:1.6}
/* back */
.back{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 24mm}
.back .big{font-family:Playfair,serif;font-size:30pt;line-height:1.15;color:var(--paper)}
.back .big i{color:var(--gold)}
.back .bigar{font-family:Amiri,serif;font-size:27pt;color:var(--gold);margin-top:5mm;direction:rtl}
.back p{margin-top:8mm;font-size:10pt;color:var(--paper2);line-height:1.6}
.back .par{font-family:Tajawal;font-size:12pt;direction:rtl;margin-top:2mm;color:var(--paper2)}
.back .url{margin-top:10mm;border:1px solid var(--gold);padding:4mm 8mm;font-size:10pt;letter-spacing:.2em;color:var(--gold);text-transform:uppercase}
"""


def ar(n):
    return str(n).translate(AR_DIGITS)


def image_for(slug):
    own = os.path.abspath(os.path.join(HERE, '..', 'images', f'{slug}.jpg'))
    if os.path.exists(own): return 'file://' + own, 'owner photo'
    fr = os.path.join(HERE, 'frames', f'{slug}.jpg')
    if os.path.exists(fr): return 'file://' + fr, 'reel frame (interim)'
    return None, 'placeholder'


def folio(n, en, arabic):
    return (f"<div class='folio'><span>{e(en)}</span><span>{n:02d}</span>"
            f"<span class='ar'>{e(arabic)}</span></div>")


pages, used = [], []
cover_img = image_for(RECIPES[0]['slug'])[0]
pages.append(f"""<section class='page dark cover'>
<div class='kicker'>The Edible Codex</div>
<h1>New <i>Recipes</i></h1>
<div class='sub'>High protein. Halal. Made to be shared.</div>
<div class='subar'>وصفات جديدة</div>
<div class='hero'><div style="background-image:url('{cover_img}')"></div></div>
<div class='tag'>{len(RECIPES)} recipes from our reels, in English and Arabic</div>
<div class='tagar'>{ar(len(RECIPES))} وصفات من فيديوهاتنا، بالعربي والإنجليزي</div>
<div class='site'>ediblecodex.com</div>
</section>""")

first_recipe_page = 4
rows = ''.join(
    f"<div class='row'><span class='n'>{i + 1:02d}</span><span class='t'>{e(r['en'])}</span>"
    f"<span class='ta'>{e(r['ar'])}</span><span class='p'>{first_recipe_page + 2 * i}</span></div>"
    for i, r in enumerate(RECIPES))
pages.append(f"""<section class='page'><div class='inner'>
<div class='h2'><span class='en'>Contents</span><span class='ar'>المحتويات</span></div>
<div class='rule' style='margin-top:4mm'></div>
<div class='toc'>{rows}</div></div>{folio(2, 'The Edible Codex', 'وصفات جديدة')}</section>""")

pages.append(f"""<section class='page'><div class='inner'>
<div class='h2'><span class='en'>Before you cook</span><span class='ar'>قبل ما تبدأ</span></div>
<div class='rule' style='margin-top:4mm'></div>
<div class='notes'>
<div><h3>Halal, checked</h3><ul>
<li>Cheese: mozzarella, ricotta and hard cheeses made with microbial or halal-certified rennet.</li>
<li>Yogurt and hummus with no gelatin.</li>
<li>No wine, no wine vinegar, no mirin. Soy sauce halal-certified with no added alcohol.</li>
<li>Halal meat and chicken in every recipe.</li></ul>
<h3 style='margin-top:6mm'>About the numbers</h3>
<p>Quantities are tested starting points: ovens differ, so trust the colour and the crunch. Calories and protein are estimates per serving, not lab values.</p>
<h3 style='margin-top:6mm'>The glass trick</h3>
<p>Many recipes here press a ball of dough into a cup with the flat bottom of a glass. Dust the glass with a little flour so it lifts clean.</p></div>
<div class='ar'><h3>حلال، ومفحوص</h3><ul>
<li>الأجبان: موزاريلا وريكوتا وأجبان صلبة بمنفحة ميكروبية أو بشهادة حلال.</li>
<li>لبن وحمص خاليان من الجيلاتين.</li>
<li>بدون نبيذ ولا خل نبيذ ولا ميرين، وصويا بشهادة حلال بدون كحول.</li>
<li>لحوم ودجاج حلال في كل الوصفات.</li></ul>
<h3 style='margin-top:6mm'>عن الأرقام</h3>
<p>المقادير نقطة بداية مجرّبة، والأفران تختلف، فاعتمد على اللون والقرمشة. السعرات والبروتين تقديرية للحصة، وليست قياس مختبر.</p>
<h3 style='margin-top:6mm'>سرّ الكأس</h3>
<p>في وصفات كثيرة هنا نكبس كرة العجين بقعر كأس لتصير كاسة. رشّ قعر الكأس بقليل من الطحين حتى يرتفع بسهولة.</p></div>
</div></div>{folio(3, 'The Edible Codex', 'وصفات جديدة')}</section>""")

for i, r in enumerate(RECIPES):
    pn = first_recipe_page + 2 * i
    src, kind = image_for(r['slug']); used.append((r['slug'], kind))
    if src:
        photo = f"<div class='photo' style=\"background-image:url('{src}')\"><div class='num'>{i + 1:02d}</div></div>"
    else:
        photo = (f"<div class='photo ph'><div class='a'>{e(r['en'])}</div><div class='b'>{e(r['ar'])}</div>"
                 f"<div class='c'>Photo coming</div><div class='num'>{i + 1:02d}</div></div>")
    kcal, p, c, f = r['macros']
    chips = ''.join(f"<div class='chip'><b>{v}{u}</b><span>{l}</span><em>{la}</em></div>" for v, u, l, la in [
        (kcal, '', 'kcal', 'سعرة'), (p, 'g', 'protein', 'بروتين'), (c, 'g', 'carbs', 'كربوهيدرات'), (f, 'g', 'fat', 'دهون')])
    pages.append(f"""<section class='page'>{photo}<div class='open'>
<div class='titles'><div class='en'>{e(r['en'])}</div><div class='ar ard'>{e(r['ar'])}</div></div>
<div class='lines'><div class='en'>{e(r['line_en'])}</div><div class='ar'>{e(r['line_ar'])}</div></div>
<div class='meta'>{chips}</div>
<div class='makes'><span>{e(r['makes_en'])} · estimates {e(r['per_en'])}</span><span class='ar'>{e(r['makes_ar'])} · القيم تقديرية {e(r['per_ar'])}</span></div>
</div>{folio(pn, r['en'], r['ar'])}</section>""")
    en_groups = ''.join(f"<h5>{e(g[0])}</h5><ul>{''.join(f'<li>{e(x)}</li>' for x in g[2])}</ul>" for g in r['groups'])
    ar_groups = ''.join(f"<h5>{e(g[1])}</h5><ul>{''.join(f'<li>{e(x)}</li>' for x in g[3])}</ul>" for g in r['groups'])
    en_method = ''.join(f'<li>{e(x)}</li>' for x in r['method_en'])
    ar_method = ''.join(f'<li>{e(x)}</li>' for x in r['method_ar'])
    pages.append(f"""<section class='page'><div class='body'>
<div class='col'><h4>Ingredients</h4>{en_groups}<div class='sp'></div><h4>Method</h4><ol>{en_method}</ol></div>
<div class='vr'></div>
<div class='col ar'><h4>المكونات</h4>{ar_groups}<div class='sp'></div><h4>الطريقة</h4><ol>{ar_method}</ol></div>
</div>
<div class='note'><div class='en'>{e(r['note_en'])}</div><div class='ar'>{e(r['note_ar'])}</div></div>
{folio(pn + 1, r['en'], r['ar'])}</section>""")

pages.append("""<section class='page dark back'>
<div class='big'>361 more halal recipes<br>in <i>The Edible Codex</i></div>
<div class='bigar'>٣٦١ وصفة حلال أخرى في كتابي</div>
<p>Arabic and English, step by step. Instant download, 30-day refund.</p>
<p class='par'>بالعربي والإنجليزي، خطوة بخطوة. تحميل فوري، واسترجاع خلال ٣٠ يوماً.</p>
<div class='url'>ediblecodex.com/shop/the-edible-codex</div>
</section>""")

doc = f"<!doctype html><html><head><meta charset='utf-8'><title>The Edible Codex: New Recipes</title><style>{CSS}</style></head><body>{''.join(pages)}</body></html>"
open(os.path.join(HERE, 'new-recipes.html'), 'w').write(doc)
for slug, kind in used: print(f'{slug:42s} {kind}')
print('pages', len(pages))
