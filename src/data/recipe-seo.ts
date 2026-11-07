import type { Localized } from "@/i18n/LanguageContext";

/**
 * The title and description each recipe page shows Google, written around
 * the words people actually type: "طريقة عمل الكبة", "banana bread recipe".
 * The page itself keeps the book's dish name; only the search result reads
 * this. Kept apart from recipes.ts so the home page never downloads it.
 *
 * العنوان والوصف اللذان يظهران في نتيجة جوجل لكل وصفة، مكتوبان بكلمات البحث
 * الأقوى. الصفحة نفسها تبقى باسم الطبق كما في الكتاب.
 */
export type RecipeSeo = { title: Localized; description: Localized };

export const recipeSeo: Record<string, RecipeSeo> = {
  "the-original-baked-feta-pasta": {
    title: { ar: "طريقة عمل باستا الفيتا بالفرن — الوصفة الأصلية من تيك توك", en: "Baked Feta Pasta — The Original TikTok Recipe (45 Min)" },
    description: {
      ar: "قالب فيتا كامل وطماطم كرزية في الفرن، تهرسهما فيصيران صلصة كريمية بدون كريمة. الوصفة الأصلية التي أشعلت تيك توك، جاهزة في ٤٥ دقيقة.",
      en: "A whole block of feta and cherry tomatoes go in the oven, get mashed, and become a creamy sauce with no cream at all. The original TikTok recipe, ready in 45 minutes.",
    },
  },
  "marry-me-chicken": {
    title: { ar: "طريقة عمل دجاج ماري مي — الطبق الذي يقولون إنه يجلب عرض زواج", en: "Marry Me Chicken — The One-Pan Dinner Worth a Proposal" },
    description: {
      ar: "صدور دجاج بصلصة كريمية بالطماطم المجففة والبارميزان، في مقلاة واحدة خلال ٣٠ دقيقة. السر: رشّة طحين قبل التحمير تعطي الصلصة قوامها.",
      en: "Chicken breasts in a creamy sun-dried tomato and parmesan sauce, one pan, 30 minutes. The secret: a light dusting of flour that gives the sauce its body.",
    },
  },
  "quesabirria-tacos": {
    title: { ar: "طريقة عمل تاكو البيريا بالجبنة (كيسابيريا) مع المرق للغمس", en: "Birria Tacos (Quesabirria) — With Red Consommé for Dipping" },
    description: {
      ar: "لحم مطهو ببطء بالفلفل المجفف حتى يتفتت، وتورتيلا مغموسة بالدهن الأحمر ومقلية بالجبنة، وكوب مرق ساخن للغمس. الطريقة كاملة خطوة بخطوة.",
      en: "Beef slow-cooked with dried chilies until it falls apart, tortillas dipped in the red fat and fried with cheese, and a cup of hot consommé for dipping. Every step.",
    },
  },
  "gigi-hadid-spicy-vodka-pasta": {
    title: { ar: "طريقة عمل باستا جيجي حديد الحارة — الصلصة الوردية في ٢٥ دقيقة", en: "Gigi Hadid Pasta — The Spicy Pink Pasta in 25 Minutes" },
    description: {
      ar: "صلصة طماطم وكريمة حارة بلون وردي، وسرّها معجون الطماطم المكرمل. من أكثر وصفات الباستا طبخاً في العالم، في ٢٥ دقيقة.",
      en: "A creamy, chili-spiked pink tomato sauce whose secret is caramelized tomato paste. One of the world's most-made pasta recipes, in 25 minutes.",
    },
  },
  "emily-mariko-salmon-rice-bowl": {
    title: { ar: "طريقة عمل بول السلمون إيميلي ماريكو — وجبة في ١٥ دقيقة", en: "Emily Mariko Salmon Bowl — The Original Viral Recipe in 15 Minutes" },
    description: {
      ar: "بقايا السلمون والأرز تصير وجبة كاملة: حيلة مكعب الثلج تعيد الأرز طرياً، ثم كيوبي وسريراتشا وورق النوري. جاهزة في ١٥ دقيقة.",
      en: "Emily Mariko's salmon bowl, step by step: leftover salmon and rice, the ice-cube trick that keeps the rice soft, then Kewpie, sriracha and nori. Ready in 15 minutes.",
    },
  },
  "green-goddess-salad": {
    title: { ar: "طريقة عمل سلطة الإلهة الخضراء — السلطة التي تؤكل كغموس", en: "Green Goddess Salad — The Viral Chopped Salad You Eat Like a Dip" },
    description: {
      ar: "ملفوف وخيار مفرومان ناعماً بصلصة سبانخ وريحان وكاجو، تغرفها برقائق التورتيلا. نباتية بالكامل وجاهزة في ٢٠ دقيقة.",
      en: "Finely chopped cabbage and cucumber in a spinach, basil and cashew dressing, scooped up with tortilla chips. Fully vegan, ready in 20 minutes.",
    },
  },
  "sushi-bake": {
    title: { ar: "طريقة عمل السوشي المخبوز — كل طعم السوشي في صينية واحدة", en: "Sushi Bake — All the Flavor of Sushi, No Rolling Needed" },
    description: {
      ar: "أرز سوشي يعلوه سلطعون أو سلمون بمايونيز الكيوبي والجبنة الكريمية، يُخبز ويُغرف بورق النوري كالتاكو. بدون لفّ، ويكفي ٦ أشخاص.",
      en: "Sushi rice topped with crab or salmon, Kewpie and cream cheese, baked and scooped into nori like a taco. No rolling, and it feeds six.",
    },
  },
  "smashed-potatoes": {
    title: { ar: "طريقة عمل البطاطا المهروسة المقرمشة بالفرن — حواف كالشيبس", en: "Crispy Smashed Potatoes — Crunchy Edges, Fluffy Inside" },
    description: {
      ar: "بطاطا صغيرة تُسلق ثم تُهرس بكوب وتُشوى بالزبدة والثوم حتى تصير حوافها كالشيبس. السر: اتركها تجف بالبخار بعد السلق.",
      en: "Baby potatoes boiled, smashed flat with a glass and roasted in butter and garlic until the edges crunch like chips. The secret: let them steam-dry first.",
    },
  },
  "bang-bang-shrimp": {
    title: { ar: "طريقة عمل روبيان بانغ بانغ — مقرمش بصلصة حلوة حارة", en: "Bang Bang Shrimp — Crispy, Creamy, Ready in 25 Minutes" },
    description: {
      ar: "روبيان مقرمش بنشا الذرة، يُقلب ساخناً في صلصة مايونيز وتشيلي حلو وسريراتشا. أول طبق يخلص على السفرة، في ٢٥ دقيقة.",
      en: "Cornstarch-crisp shrimp tossed hot in a mayo, sweet chili and sriracha sauce. The first plate to disappear, in 25 minutes.",
    },
  },
  "dalgona-coffee": {
    title: { ar: "طريقة عمل قهوة الدالغونا المخفوقة — ٣ مكوّنات فقط", en: "Dalgona Coffee — Whipped Coffee With Just 3 Ingredients" },
    description: {
      ar: "قهوة سريعة الذوبان وسكر وماء ساخن بنسبة ١:١:١، تُخفق حتى تصير رغوة كالمارينغ فوق الحليب البارد. انتبه: القهوة المطحونة لا تنفع.",
      en: "Instant coffee, sugar and hot water at 1:1:1, whipped into a meringue-like foam over cold milk. Note: ground coffee won't whip — only instant works.",
    },
  },
  "crinkle-cake": {
    title: { ar: "طريقة عمل كرينكل كيك — حلى الفيلو بالقطر بدون عجن", en: "Crinkle Cake — The Viral Phyllo Dessert With Syrup" },
    description: {
      ar: "عجينة فيلو مجعّدة بالزبدة، وكاسترد بالفانيليا، وقطر بارد على الكيكة الساخنة حتى يبقى وجهها مقرمشاً. حلى يبهر الضيوف بدون عجن.",
      en: "Scrunched phyllo baked in butter, a vanilla custard, and cold syrup on the hot cake so the top stays crisp. A showstopper with no dough to make.",
    },
  },
  "french-onion-grilled-cheese": {
    title: { ar: "طريقة عمل ساندويش الجبنة بالبصل المكرمل — شوربة البصل الفرنسية في ساندويش", en: "French Onion Grilled Cheese — French Onion Soup in a Sandwich" },
    description: {
      ar: "بصل يُكرمل ببطء ٣٠ دقيقة، وجبنة غرويير وموزاريلا، وخبز ساوردو محمّص بالزبدة. كل طعم شوربة البصل الفرنسية بين شريحتين.",
      en: "Onions caramelized low and slow for 30 minutes, Gruyère and mozzarella, butter-toasted sourdough. Everything you love about French onion soup, in a sandwich.",
    },
  },
  "whipped-feta-hot-honey-dip": {
    title: { ar: "طريقة عمل غموس الفيتا المخفوقة بالعسل الحار في ٥ دقائق", en: "Whipped Feta Dip With Hot Honey — 5 Minutes, One Blender" },
    description: {
      ar: "فيتا وزبادي يوناني يُخفقان حتى يصيرا كالكريمة، مع عسل حار وفستق مجروش. أسرع مقبلات للعزايم، تُقدّم مع خبز دافئ.",
      en: "Feta and Greek yogurt blended until cloud-light, with hot honey and crushed pistachios. The fastest party appetizer you'll make, served with warm pita.",
    },
  },
  "korean-cream-cheese-garlic-bread": {
    title: { ar: "طريقة عمل خبز الثوم الكوري بالجبنة الكريمية — أشهر أكل شوارع في سيول", en: "Korean Cream Cheese Garlic Bread — Seoul's Famous Street Food" },
    description: {
      ar: "خبز يُقطّع كالوردة ويُحشى بالجبنة الكريمية المحلاة، ثم يُغمس بزبدة الثوم والعسل ويُخبز حتى تتقرمش حوافه. أكل الشوارع الكوري في بيتك.",
      en: "Rolls cut like a flower, piped full of sweet cream cheese, dunked in honey garlic butter and baked until the edges crisp. Korea's famous street food at home.",
    },
  },
  "viral-cucumber-salad": {
    title: { ar: "طريقة عمل سلطة الخيار الفايرال (لوغان موفيت) في ١٠ دقائق", en: "Logan Moffitt Cucumber Salad — The Viral 10-Minute Recipe" },
    description: {
      ar: "سلطة لوغان موفيت الشهيرة: خيارة كاملة تُقطّع رقيقاً وتُخضّ في علبة مع الصويا وزيت السمسم والثوم، وتؤكل مباشرة من العلبة. ١٠ دقائق فقط.",
      en: "Logan Moffitt's viral cucumber salad, exactly: a whole cucumber shaken in one container with soy, sesame oil, garlic and rice vinegar. 10 minutes, eaten straight from the box.",
    },
  },
  "dubai-pistachio-kunafa-chocolate": {
    title: { ar: "طريقة عمل شوكولاتة دبي بالكنافة والفستق في البيت", en: "Pistachio Kunafa Chocolate (Dubai Chocolate Bar) — Make It at Home" },
    description: {
      ar: "لم تجدها في المحلات؟ اصنعها في البيت: كنافة محمّصة بالزبدة وكريمة فستق داخل قشرة شوكولاتة تطقطق عند الكسر، وبجزء من سعرها.",
      en: "Can't find the Dubai chocolate bar? Make it at home: butter-toasted kunafa and pistachio cream inside a snapping chocolate shell, for a fraction of the price. Full step-by-step recipe.",
    },
  },
  "onion-boil": {
    title: { ar: "طريقة عمل البصلة المشوية بالزبدة الحارة — ترند تيك توك", en: "Onion Boil — The Viral Whole Onion in Cajun Butter" },
    description: {
      ar: "بصلة كاملة مشقوقة على شكل X، مغمورة بزبدة الثوم والبهارات الكاجون، تُلف بالقصدير وتُخبز حتى تذوب. ترند تيك توك بخطوات واضحة.",
      en: "A whole onion cut into an X, drowned in garlic, Old Bay and Cajun butter, sealed in foil and baked until it practically melts. The TikTok trend, step by step.",
    },
  },
  "volcano-cheese-ramen": {
    title: { ar: "طريقة عمل رامن البركان بالجبنة — نودلز كورية حارة", en: "Volcano Cheese Ramen — Spicy Korean Noodles in 10 Minutes" },
    description: {
      ar: "نودلز كورية حارة تُكوّم كالجبل، وبيضة في القمة، وجبنتان تسيلان كالحمم. طبق بشكل المطاعم من كيس نودلز واحد، في ١٠ دقائق.",
      en: "Spicy Korean noodles piled into a mountain, an egg in the crater and two cheeses oozing down like lava. A restaurant-looking bowl from one packet, in 10 minutes.",
    },
  },
  "tanghulu-microwave": {
    title: { ar: "طريقة عمل التانغولو بالمايكرويف — بدون ميزان حرارة", en: "Tanghulu Recipe — Microwave Method, No Thermometer Needed" },
    description: {
      ar: "فواكه بقشرة سكر زجاجية تطقطق، من كوب سكر وماء في المايكرويف. اختبار عود الأكل في الماء المثلج يغنيك عن ميزان الحرارة. ١٥ دقيقة.",
      en: "Fruit in a glassy sugar shell that crackles, made with sugar and water in a mug in the microwave. A chopstick-in-ice-water test replaces the thermometer. 15 minutes.",
    },
  },
  "cheese-buldak": {
    title: { ar: "طريقة عمل البولداك بالجبنة — دجاج النار الكوري", en: "Cheese Buldak — Korean Fire Chicken Under Melted Mozzarella" },
    description: {
      ar: "دجاج متبّل بالغوتشوجانغ والفلفل الكوري، يُطهى حتى تتكرمل الصلصة ثم يُغطّى بالموزاريلا الذائبة. حار وغني بالجبنة، في ٣٠ دقيقة.",
      en: "Chicken in gochujang and Korean chili flakes, cooked until the sauce caramelizes, then buried in stretchy melted mozzarella. Fiery and cheesy in 30 minutes.",
    },
  },
  "japanese-souffle-pancakes": {
    title: { ar: "طريقة عمل البان كيك الياباني السوفليه — هش ومرتفع كالسحاب", en: "Japanese Soufflé Pancakes — Tall, Wobbly & Cloud-Soft" },
    description: {
      ar: "بان كيك يهتز من الطراوة بفضل المارينغ والنار الهادئة والبخار تحت الغطاء. كل الأسرار مشروحة خطوة بخطوة، في ٢٥ دقيقة.",
      en: "Pancakes that wobble on the plate, thanks to meringue, low heat and steam under the lid. Every secret explained step by step, in 25 minutes.",
    },
  },
  "crookie-croissant-cookie": {
    title: { ar: "طريقة عمل الكروكي — كرواسون محشو بالكوكيز في ٢٠ دقيقة", en: "Crookie — The Paris Croissant Cookie in 20 Minutes" },
    description: {
      ar: "ترند مخابز باريس: كرواسون محشو بعجينة الكوكيز يُخبز من جديد، مقرمش من الخارج وطري من الداخل. ٢٠ دقيقة بكرواسون جاهز.",
      en: "The Paris bakery trend: a croissant stuffed with cookie dough and baked again, crisp outside and gooey inside. 20 minutes with store-bought croissants.",
    },
  },
  "honeycomb-pasta-pie": {
    title: { ar: "طريقة عمل كيكة الباستا خلية النحل — باستا تُقطّع كالكيك", en: "Honeycomb Pasta Pie — Rigatoni You Slice Like a Cake" },
    description: {
      ar: "ريغاتوني واقف كخلية النحل، كل أنبوب محشو بالريكوتا ومغطى بالصلصة والموزاريلا. يُخبز ويُقطّع كالكيك، ويكفي ٨ أشخاص.",
      en: "Rigatoni stood upright like a honeycomb, each tube piped with ricotta, under sauce and mozzarella. Baked and sliced like a cake. Feeds eight.",
    },
  },
  "cornflake-chicken-tenders": {
    title: { ar: "طريقة عمل أصابع الدجاج بالكورن فليكس — مقرمشة بدون قلي", en: "Cornflake Chicken Tenders — Extra Crispy, Air Fryer or Oven" },
    description: {
      ar: "أصابع دجاج بطبقة كورن فليكس مقرمشة جداً، في القلاية الهوائية أو الفرن بدون قلي بالزيت. المفضّلة عند الأطفال، في ٣٠ دقيقة.",
      en: "Chicken tenders in a seriously crunchy cornflake coat, made in the air fryer or oven with no deep frying. A kids' favorite in 30 minutes.",
    },
  },
  "accordion-potatoes": {
    title: { ar: "طريقة عمل البطاطا الأكورديون — حيلة عيدان الأكل", en: "Accordion Potatoes — The Viral Chopstick Cutting Trick" },
    description: {
      ar: "عيدان الأكل تمنع السكين من قطع البطاطا حتى النهاية، فتنفتح كالأكورديون وتتقرمش كل حافة بزبدة الثوم. في القلاية الهوائية خلال ٣٠ دقيقة.",
      en: "The chopstick trick stops the knife going all the way through, so the potato stretches like an accordion and every edge crisps in garlic butter. Air fryer, 30 minutes.",
    },
  },
  "beet-and-pickled-ginger": {
    title: { ar: "طريقة عمل صلصة البنجر لتزيين الأطباق كالمطاعم", en: "Beetroot Sauce for Plating — Restaurant-Style Magenta Sauce" },
    description: {
      ar: "صلصة بنجر وزنجبيل مخلل بلون أرجواني لامع، بقوام مضبوط يرسم خطاً نظيفاً على الصحن. نِسب دقيقة لتزيين الأطباق كالمطاعم.",
      en: "Beetroot and pickled ginger blended into a vivid magenta sauce with the exact flow to draw clean lines on a plate. Precise ratios for restaurant-style plating.",
    },
  },
  "herb-and-chlorophyll": {
    title: { ar: "طريقة عمل صلصة الأعشاب الخضراء لتزيين الأطباق — أخضر لا يبهت", en: "Green Herb Oil for Plating — Bright Green That Doesn't Fade" },
    description: {
      ar: "بقدونس وريحان يُسلقان ١٥ ثانية ثم يُغطسان في ماء مثلج، وهي الخطوة التي تحفظ الأخضر الزاهي. زيت أعشاب صافٍ لتزيين الأطباق.",
      en: "Parsley and basil blanched for 15 seconds then shocked in ice water, the step that keeps the green vivid. A clear herb oil for plating.",
    },
  },
  "aged-balsamic-and-date": {
    title: { ar: "طريقة عمل صلصة البلسمك بالتمر — صلصة لامعة للمشاوي", en: "Balsamic Date Reduction — A Glossy Sauce for Grilled Meat" },
    description: {
      ar: "بلسمك يُختزل على نار هادئة مع اليانسون النجمي، ثم يُخلط بالتمر المجهول ودبس التمر. صلصة داكنة لامعة للمشاوي وتزيين الأطباق.",
      en: "Balsamic reduced low with star anise, blended with Medjool dates and date molasses. A dark, glossy sauce for grilled meats and plating.",
    },
  },
  "pan-banging-chocolate-chip-cookies": {
    title: { ar: "طريقة عمل الكوكيز بحيلة ضرب الصينية — حواف مقرمشة ووسط طري", en: "Pan-Banging Chocolate Chip Cookies — Rippled, Crisp & Gooey" },
    description: {
      ar: "أثناء الخبز ترفع الصينية وتتركها تسقط، فتتموّج الكوكيز بحواف مقرمشة ووسط طري. أشهر حيلة كوكيز على الإنترنت، بالزبدة البنية.",
      en: "Lift the tray and let it drop as the cookies bake, so they ripple into crisp edges and a gooey middle. The internet's most famous cookie trick, with brown butter.",
    },
  },
  "cinnamon-roll-hack": {
    title: { ar: "طريقة عمل السينابون بحيلة الكريمة — طعم سينابون من علبة جاهزة", en: "Cinnamon Roll Hack — Canned Rolls That Taste Like Cinnabon" },
    description: {
      ar: "لفائف قرفة جاهزة، وكريمة سائلة تُسكب بينها، وزبدة بالسكر البني والقرفة فوقها. تنتفخ وتصير طرية كسينابون. الحيلة التي اجتاحت تيك توك.",
      en: "Canned cinnamon rolls, heavy cream poured between them, cinnamon brown-sugar butter on top. They bake up huge, soft and gooey like Cinnabon. The TikTok hack.",
    },
  },
  "sheet-pan-pancakes": {
    title: { ar: "طريقة عمل بان كيك الصينية بالفرن — فطور العائلة بدون قلب", en: "Sheet Pan Pancakes — Feed the Whole Family, No Flipping" },
    description: {
      ar: "خليط بان كيك واحد في الصينية، وكل زاوية بطعم: توت، شوكولاتة، موز. يُخبز ١٥ دقيقة ويُقطّع مربعات، فيأكل الجميع في الوقت نفسه.",
      en: "One tray of batter, a different topping in each corner: blueberry, chocolate, banana. Baked in 15 minutes and cut into squares, so everyone eats at once.",
    },
  },
  "beef-tacos": {
    title: { ar: "طريقة عمل تاكو اللحمة المكسيكي في ٢٠ دقيقة", en: "Easy Ground Beef Tacos Recipe — Dinner in 20 Minutes" },
    description: {
      ar: "لحمة مفرومة متبّلة بتوابل التاكو، وخبز تاكو دافئ، وخس وطماطم وشيدر وصلصة وغواكامولي. عشاء العائلة في ٢٠ دقيقة.",
      en: "Seasoned ground beef, warm taco shells, lettuce, tomato, cheddar, salsa and guacamole. A family dinner on the table in 20 minutes.",
    },
  },
  kibbeh: {
    title: { ar: "طريقة عمل الكبة المقلية بالبرغل واللحمة — قشرة رقيقة مقرمشة", en: "Fried Kibbeh Recipe — Crisp Bulgur Shell, Spiced Meat Filling" },
    description: {
      ar: "قشرة برغل ولحمة رقيقة ومقرمشة، وحشوة لحمة بالصنوبر والبهار. أشهر مقبلات الشام، مع طريقة التشكيل والقلي خطوة بخطوة.",
      en: "A thin, crisp shell of bulgur and meat around a spiced lamb and pine-nut filling. The Levant's best-loved appetizer, shaped and fried step by step.",
    },
  },
  "mochi-brownies": {
    title: { ar: "طريقة عمل براونيز الموتشي — شوكولاتة بقوام مطاطي", en: "Mochi Brownies (Brochis) — Fudgy, Chewy & Bouncy" },
    description: {
      ar: "براونيز بطحين الأرز الدبق: طعم شوكولاتة غني وقوام مطاطي يرتد كالموتشي. انتبه: طحين الأرز العادي لا ينفع.",
      en: "Brownies made with glutinous rice flour: deep chocolate flavor with a bouncy, chewy mochi bite. Note: regular rice flour won't work.",
    },
  },
  maqluba: {
    title: { ar: "طريقة عمل المقلوبة بالدجاج والباذنجان — وسرّ قلبها متماسكة", en: "Maqluba Recipe — Arabic Upside-Down Rice, Flipped Without Collapsing" },
    description: {
      ar: "طبقات رز وباذنجان وبطاطا مقلية ودجاج أو لحم، تُطهى في قدر واحد ثم تُقلب أمام الجميع. الطريقة كاملة لتخرج متماسكة.",
      en: "Layers of rice, fried eggplant, potato and chicken or lamb, cooked in one pot and flipped at the table. The full method so it comes out standing tall.",
    },
  },
  "biscoff-tiramisu": {
    title: { ar: "طريقة عمل تيراميسو اللوتس — بدون قهوة وبدون فرن", en: "Biscoff Tiramisu — No Coffee, No Bake, Made a Day Ahead" },
    description: {
      ar: "بسكويت لوتس مغموس بالحليب الدافئ، وكريمة ماسكاربوني بزبدة اللوتس، ووجه لامع من اللوتس الذائب. بدون قهوة وبدون فرن، ويُحضّر قبل يوم.",
      en: "Lotus biscuits dipped in warm milk, mascarpone cream folded with Biscoff spread, and a glossy melted Biscoff top. No coffee, no oven, made the day before.",
    },
  },
  "chicken-fajitas": {
    title: { ar: "طريقة عمل فاهيتا الدجاج بالفرن — صينية واحدة في ٣٥ دقيقة", en: "Sheet Pan Chicken Fajitas Recipe — One Tray, 35 Minutes" },
    description: {
      ar: "دجاج وفلفل ملوّن وبصل بتتبيلة الفاهيتا في صينية واحدة بالفرن، ثم تورتيلا دافئة وصلصة وغواكامولي. عشاء بأقل قدر من الجلي.",
      en: "Chicken, bell peppers and onion in fajita spices on one tray in the oven, then warm tortillas, salsa and guacamole. Dinner with almost no washing up.",
    },
  },
  "kylie-jenner-ramen": {
    title: { ar: "طريقة عمل رامن كايلي جينر بالزبدة والثوم والبيض في ١٠ دقائق", en: "Kylie Jenner Ramen — The Famous Instant Ramen Hack" },
    description: {
      ar: "نودلز سريعة مع زبدة وثوم وبيضة تُحرّك مع النودلز فتصير صلصة كريمية، وفوقها بهارات الإفريثينغ بيغل. ١٠ دقائق.",
      en: "Instant noodles with butter, garlic powder and an egg stirred in until it turns into a creamy sauce, topped with everything bagel seasoning. 10 minutes.",
    },
  },
  pho: {
    title: { ar: "طريقة عمل شوربة الفو الفيتنامية باللحم في البيت", en: "Pho Recipe at Home — Vietnamese Beef Noodle Soup in 45 Minutes" },
    description: {
      ar: "مرق متبّل باليانسون النجمي والقرفة والزنجبيل، يُسكب ساخناً فيطهو شرائح اللحم الرقيقة فوق نودلز الأرز. مع الأعشاب الطازجة والليمون.",
      en: "A broth spiced with star anise, cinnamon and ginger, poured hot so it cooks the thin beef slices over rice noodles. Finished with herbs and lime.",
    },
  },
  "banana-bread": {
    title: { ar: "طريقة عمل كيكة الموز (خبز الموز) — بدون خميرة وبدون عجن", en: "Moist Banana Bread Recipe — The Best Use for Overripe Bananas" },
    description: {
      ar: "أفضل ما تصنعه بالموز الذي اسودّ: ٣ موزات وزبدة وسكر، بدون خميرة وبدون عجن. كيكة رطبة لفطور الصباح مع القهوة.",
      en: "The best thing to do with blackened bananas: three of them, butter and sugar, no yeast and no kneading. A moist loaf for breakfast with coffee.",
    },
  },
  "lasagna-al-forno": {
    title: { ar: "طريقة عمل اللازانيا باللحمة والبشاميل — الوصفة الإيطالية الأصلية", en: "Classic Lasagna Recipe (al Forno) — Bolognese, Béchamel & Parmesan" },
    description: {
      ar: "طبقات باستا وصلصة بولونيز وبشاميل وبارميزان، تُخبز حتى يصير وجهها ذهبياً ويغلي. صينية واحدة تكفي ٨ أشخاص.",
      en: "Layers of pasta, Bolognese, béchamel and Parmesan baked until golden and bubbling. The Italian original, one tray for eight.",
    },
  },
  bagels: {
    title: { ar: "طريقة عمل البيغل في البيت — يُسلق ثم يُخبز", en: "Homemade Bagels Recipe — Boiled Then Baked for a Real Chew" },
    description: {
      ar: "الخطوة التي تعطي البيغل لمعته وقوامه: يُسلق دقيقة على كل جهة ثم يُخبز. طحين خبز وخميرة، وبيغل مثل المخابز في بيتك.",
      en: "The step that gives bagels their shine and chew: a one-minute boil on each side before baking. Bread flour, yeast and bakery-style bagels at home.",
    },
  },
  "chicken-fried-rice": {
    title: { ar: "طريقة عمل الرز المقلي بالدجاج مثل المطاعم الصينية", en: "Chicken Fried Rice Recipe — Better Than Takeout in 25 Minutes" },
    description: {
      ar: "سر الرز المقلي: رز بارد من اليوم السابق، يُقلى مع الدجاج والبيض والخضار وصلصة الصويا والمحار. أطيب من الطلب الخارجي، في ٢٥ دقيقة.",
      en: "The secret is cold, day-old rice, stir-fried with chicken, egg, vegetables, soy and oyster sauce. Better than takeout, in 25 minutes.",
    },
  },
  "naan-bread": {
    title: { ar: "طريقة عمل خبز النان بالمقلاة — بدون تنور وبدون خميرة", en: "Naan Bread Recipe — Soft Skillet Naan, No Tandoor, No Yeast" },
    description: {
      ar: "خبز نان طري بالزبادي والحليب، يُخبز دقيقة على كل جهة في مقلاة حديد ساخنة ويُدهن بالزبدة. بدون تنور وبدون خميرة.",
      en: "Soft naan made with yogurt and milk, cooked a minute per side in a hot cast-iron skillet and brushed with butter. No tandoor, no yeast.",
    },
  },
  "sourdough-bread": {
    title: { ar: "طريقة عمل خبز الساوردو للمبتدئين بالخميرة الطبيعية", en: "Sourdough Bread Recipe for Beginners — Crackling Crust, Open Crumb" },
    description: {
      ar: "٤ مكوّنات فقط: خميرة طبيعية وطحين وماء وملح. طيّ وتخمير ليلة كاملة وخَبز في قدر حديد، لقشرة تطقطق ولبّ مفتوح.",
      en: "Just four ingredients: starter, flour, water and salt. Stretch and folds, an overnight rest and a Dutch oven for a crackling crust and an open crumb.",
    },
  },
  "focaccia-bread": {
    title: { ar: "طريقة عمل خبز الفوكاتشا بزيت الزيتون — أسهل خبز بالخميرة", en: "Easy Focaccia Recipe — The Simplest Yeast Bread, No Kneading" },
    description: {
      ar: "عجينة بدون عجن، وزيت زيتون في الصينية، وأصابعك تصنع الحفر، وإكليل الجبل وملح خشن فوقها. أسهل خبز بالخميرة للمبتدئين.",
      en: "A no-knead dough, olive oil in the pan, dimples pressed with your fingers, rosemary and flaky salt on top. The easiest yeast bread for beginners.",
    },
  },
  "classic-meatloaf": {
    title: { ar: "طريقة عمل رغيف اللحم (ميت لوف) بالصلصة اللامعة", en: "Classic Meatloaf Recipe — Tender, With a Sweet Ketchup Glaze" },
    description: {
      ar: "لحمة مفرومة بالبيض والبقسماط والحليب لتبقى طرية، وصلصة كاتشب وسكر بني وخردل تلمع فوقها. عشاء العائلة الكلاسيكي.",
      en: "Ground beef with egg, breadcrumbs and milk so it stays tender, under a shiny ketchup, brown sugar and mustard glaze. The family dinner classic.",
    },
  },
  "brioche-bread": {
    title: { ar: "طريقة عمل خبز البريوش الطري بالزبدة والبيض", en: "Brioche Bread Recipe — Soft, Buttery & Rich With Eggs" },
    description: {
      ar: "٤ بيضات ونصف كوب زبدة تدخل العجينة قطعة قطعة، ثم ليلة في الثلاجة. خبز فرنسي طري كالقطن، مثالي للتوست والفطور.",
      en: "Four eggs and half a cup of butter worked in piece by piece, then a night in the fridge. A French loaf soft as cotton, perfect for toast.",
    },
  },
  "beef-stew": {
    title: { ar: "طريقة عمل يخنة اللحم بالخضار — لحمة تذوب في الفم", en: "Beef Stew Recipe — Fork-Tender Beef, Potatoes & Carrots" },
    description: {
      ar: "لحم كتف محمّر يُطهى ساعتين على نار هادئة مع الجزر والبطاطا والزعتر حتى يذوب. أدفأ عشاء لليالي الشتاء.",
      en: "Seared beef chuck simmered low for about two hours with carrots, potatoes and thyme until it falls apart. The warmest dinner for winter nights.",
    },
  },
  cornbread: {
    title: { ar: "طريقة عمل خبز الذرة الأمريكي — بدون خميرة في ٣٥ دقيقة", en: "Easy Cornbread Recipe — Moist, No Yeast, Ready in 35 Minutes" },
    description: {
      ar: "طحين ذرة وطحين عادي وبيضة وحليب، يُخلط باليد ويُخبز ٢٠ دقيقة. خبز ذرة رطب بدون خميرة وبدون عجن.",
      en: "Cornmeal, flour, an egg and milk, mixed by hand and baked for 20 minutes. Moist cornbread with no yeast and no kneading.",
    },
  },
  "pad-thai": {
    title: { ar: "طريقة عمل الباد تاي التايلندي في ٣٠ دقيقة", en: "Pad Thai Recipe — Authentic Tamarind Sauce in 30 Minutes" },
    description: {
      ar: "نودلز أرز بصلصة التمر الهندي الحلوة الحامضة، مع روبيان أو دجاج وبيض وفول سوداني وليمون. طعم المطعم التايلندي في ٣٠ دقيقة.",
      en: "Rice noodles in a sweet-sour tamarind sauce with shrimp or chicken, egg, peanuts and lime. Thai-restaurant flavor in 30 minutes.",
    },
  },
  "american-potato-salad": {
    title: { ar: "طريقة عمل سلطة البطاطس بالمايونيز والبيض", en: "Classic Potato Salad Recipe — The Mayo & Egg Side for Every BBQ" },
    description: {
      ar: "بطاطا مسلوقة تُخلط وهي دافئة بالمايونيز والخردل والبيض المسلوق والكرفس، فتمتص الصلصة. تُحضّر مسبقاً وتطيب في الثلاجة.",
      en: "Potatoes folded into mayo, mustard, hard-boiled egg and celery while still warm, so they soak up the dressing. Make it ahead; it gets better chilled.",
    },
  },
  "italian-pasta-salad": {
    title: { ar: "طريقة عمل سلطة المعكرونة الإيطالية الباردة للعزايم", en: "Italian Pasta Salad Recipe — The Make-Ahead Party Salad" },
    description: {
      ar: "معكرونة باردة مع طماطم كرزية وخيار وزيتون أسود وكرات موزاريلا وصلصة إيطالية. تُحضّر قبل ساعة أو قبل يوم.",
      en: "Cold pasta with cherry tomatoes, cucumber, black olives, mozzarella balls and Italian dressing. Make it an hour or a day ahead.",
    },
  },
  "roast-chicken": {
    title: { ar: "طريقة عمل الدجاج بالفرن — دجاجة كاملة بجلد مقرمش", en: "Whole Roast Chicken Recipe — Crispy Skin, Juicy Every Time" },
    description: {
      ar: "دجاجة كاملة محشوة بالليمون والثوم والأعشاب، تُشوى حتى تصل حرارتها الداخلية ٧٤ درجة. جلد مقرمش ولحم طري في كل مرة.",
      en: "A whole chicken stuffed with lemon, garlic and herbs, roasted to 165°F (74°C) inside. Crisp skin and juicy meat, every time.",
    },
  },
  "lentil-soup": {
    title: { ar: "طريقة عمل شوربة العدس — أول طبق على سفرة رمضان", en: "Lentil Soup Recipe — Hearty, Easy & Ready in an Hour" },
    description: {
      ar: "عدس وجزر وكرفس وبصل وطماطم، تُطهى على نار هادئة حتى تطرى. شوربة مشبعة ودافئة، وأول طبق على سفرة الإفطار.",
      en: "Lentils, carrots, celery, onion and tomatoes simmered until tender. A filling, warming soup, and the first bowl on a Ramadan table.",
    },
  },
  "caesar-salad": {
    title: { ar: "طريقة عمل سلطة سيزر مع الصلصة الأصلية في البيت", en: "Caesar Salad Recipe With Real Homemade Caesar Dressing" },
    description: {
      ar: "صلصة سيزر الأصلية بصفار البيض والأنشوفة والليمون والبارميزان، تُخفق في البيت خلال دقائق. خس روماني وخبز محمّص، في ٢٠ دقيقة.",
      en: "The real Caesar dressing, egg yolk, anchovy, lemon and Parmesan, whisked at home in minutes. Romaine and croutons, in 20 minutes.",
    },
  },
  "chicken-tikka-masala": {
    title: { ar: "طريقة عمل دجاج تكا ماسالا الهندي مثل المطاعم", en: "Chicken Tikka Masala Recipe — Better Than Your Local Curry House" },
    description: {
      ar: "دجاج متبّل بالزبادي والبهارات، يُشوى ثم يُطهى بصلصة طماطم وكريمة وغرام ماسالا. طعم المطعم الهندي، مع رز أو نان.",
      en: "Chicken marinated in yogurt and spices, seared, then simmered in a tomato, cream and garam masala sauce. Curry-house flavor with rice or naan.",
    },
  },
  fattoush: {
    title: { ar: "طريقة عمل الفتوش بالسماق — والخبز يبقى مقرمشاً", en: "Fattoush Salad Recipe — Lebanese Bread Salad With Sumac Dressing" },
    description: {
      ar: "خضار ونعناع وبقدونس بصلصة السماق والليمون والثوم، والخبز المقرمش يُضاف قبل التقديم مباشرة حتى يبقى يطقطق. ٢٠ دقيقة.",
      en: "Vegetables, mint and parsley in a sumac, lemon and garlic dressing, with crisp pita added right before serving so it stays crunchy. 20 minutes.",
    },
  },
};
