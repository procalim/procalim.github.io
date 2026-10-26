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
    title: { ar: "طريقة عمل باستا الفيتا بالفرن — وصفة التيك توك الأصلية", en: "Baked Feta Pasta Recipe — The Original TikTok Pasta" },
    description: {
      ar: "طريقة عمل باستا الفيتا المخبوزة بالطماطم الكرزية في ٤٥ دقيقة: قالب فيتا كامل وزيت زيتون وثوم، الوصفة التي اجتاحت تيك توك، بمقادير دقيقة وصورة.",
      en: "How to make the original baked feta pasta in 45 minutes: a whole block of feta, cherry tomatoes, olive oil and garlic. The viral TikTok recipe with exact measurements.",
    },
  },
  "marry-me-chicken": {
    title: { ar: "طريقة عمل دجاج ماري مي بالكريمة والطماطم المجففة", en: "Marry Me Chicken Recipe — Creamy, One Pan, 30 Minutes" },
    description: {
      ar: "طريقة عمل دجاج ماري مي: صدور دجاج بصلصة كريمة وطماطم مجففة وبارميزان في مقلاة واحدة خلال ٣٠ دقيقة. عشاء سهل بطعم المطاعم.",
      en: "Easy Marry Me Chicken recipe: chicken breasts in a creamy sun-dried tomato and parmesan sauce, one pan, ready in 30 minutes. Restaurant flavour at home.",
    },
  },
  "quesabirria-tacos": {
    title: { ar: "طريقة عمل تاكو البيريا بالجبنة مع صلصة الغمس", en: "Birria Tacos Recipe (Quesabirria) with Consommé" },
    description: {
      ar: "طريقة عمل تاكو البيريا: لحم مطهو ببطء، تورتيلا مغموسة ومحمّرة بالجبنة، وصلصة غمس حمراء غنية. وصفة كاملة خطوة بخطوة.",
      en: "Quesabirria tacos recipe: slow-cooked beef, tortillas dipped and crisped with cheese, and a rich red consommé for dipping. Complete step-by-step method.",
    },
  },
  "gigi-hadid-spicy-vodka-pasta": {
    title: { ar: "طريقة عمل باستا جيجي حديد الحارة بالصلصة الوردية", en: "Gigi Hadid Pasta Recipe — Spicy Pink Pasta" },
    description: {
      ar: "طريقة عمل باستا جيجي حديد الحارة: صلصة طماطم وكريمة وردية بالشطة في ٢٥ دقيقة، من أشهر وصفات الباستا في العالم.",
      en: "Gigi Hadid's spicy pasta recipe: a creamy, chilli-spiked pink tomato sauce in 25 minutes. One of the world's most-made pasta recipes, step by step.",
    },
  },
  "emily-mariko-salmon-rice-bowl": {
    title: { ar: "طريقة عمل بول السلمون والأرز — وجبة صحية في ١٥ دقيقة", en: "Salmon Rice Bowl Recipe (Emily Mariko) in 15 Minutes" },
    description: {
      ar: "طريقة عمل بول السلمون والأرز من البقايا في ١٥ دقيقة، مع حيلة مكعب الثلج لتسخين الأرز بدون ما ينشف. وجبة صحية وسريعة.",
      en: "Emily Mariko's salmon rice bowl recipe: leftover salmon and rice turned into a full meal in 15 minutes, with the ice-cube trick for reheating rice.",
    },
  },
  "green-goddess-salad": {
    title: { ar: "طريقة عمل سلطة الإلهة الخضراء بصلصة الأعشاب", en: "Green Goddess Salad Recipe — The Viral Chopped Salad" },
    description: {
      ar: "طريقة عمل سلطة الإلهة الخضراء: خضار مفروم ناعماً بصلصة أعشاب خضراء كثيفة، تؤكل كغموس مع رقائق التورتيلا. نباتية وسهلة.",
      en: "Green goddess salad recipe: finely chopped vegetables in a thick herb dressing, eaten like a dip with tortilla chips. Vegan, fresh and easy.",
    },
  },
  "sushi-bake": {
    title: { ar: "طريقة عمل السوشي المخبوز بالفرن", en: "Sushi Bake Recipe — Easy Baked Sushi Casserole" },
    description: {
      ar: "طريقة عمل السوشي المخبوز: كل نكهات رول السوشي في صينية واحدة تُخبز وتُقدّم ساخنة مع أعشاب البحر. مثالي للعزائم.",
      en: "Sushi bake recipe: every flavour of a sushi roll layered in one dish, baked and served warm with nori. Perfect for sharing.",
    },
  },
  "smashed-potatoes": {
    title: { ar: "طريقة عمل البطاطا المهروسة المقرمشة بالفرن", en: "Crispy Smashed Potatoes Recipe" },
    description: {
      ar: "طريقة عمل البطاطا المقرمشة بالفرن: تُسلق ثم تُهرس ثم تُحمّر بالزيت حتى أقصى قرمشة. طبق جانبي سهل لكل العزائم.",
      en: "Crispy smashed potatoes recipe: boiled, smashed, then roasted in oil until shatteringly crisp. The easiest side dish for any dinner.",
    },
  },
  "bang-bang-shrimp": {
    title: { ar: "طريقة عمل روبيان بانغ بانغ المقرمش", en: "Bang Bang Shrimp Recipe — Crispy & Creamy" },
    description: {
      ar: "طريقة عمل روبيان بانغ بانغ: روبيان مقرمش بصلصة كريمية حلوة وحارة في ٢٥ دقيقة. مقبلات تختفي من الطاولة أولاً.",
      en: "Bang bang shrimp recipe: crispy shrimp tossed in a creamy sweet-and-spicy sauce in 25 minutes. The first appetizer to disappear.",
    },
  },
  "dalgona-coffee": {
    title: { ar: "طريقة عمل قهوة الدالغونا المخفوقة", en: "Dalgona Coffee Recipe — Whipped Coffee in 10 Minutes" },
    description: {
      ar: "طريقة عمل قهوة الدالغونا: قهوة سريعة وسكر وماء تُخفق حتى تصبح كريمة فوق الحليب البارد، في ١٠ دقائق.",
      en: "Dalgona coffee recipe: instant coffee, sugar and water whipped into a cream and spooned over cold milk, in 10 minutes.",
    },
  },
  "crinkle-cake": {
    title: { ar: "طريقة عمل كرينكل كيك بعجينة الفيلو والقطر", en: "Crinkle Cake Recipe (Phyllo Crinkle Cake)" },
    description: {
      ar: "طريقة عمل الكرينكل كيك: عجينة فيلو مجعّدة تُخبز بالزبدة وتُسقى بالقطر، حلى شرقي سهل يبهر الضيوف.",
      en: "Crinkle cake recipe: crinkled phyllo baked in butter and soaked in syrup. An easy Middle Eastern dessert that looks spectacular.",
    },
  },
  "french-onion-grilled-cheese": {
    title: { ar: "طريقة عمل ساندويش الجبنة بالبصل المكرمل", en: "French Onion Grilled Cheese Recipe" },
    description: {
      ar: "طريقة عمل ساندويش الجبنة بالبصل الفرنسي: بصل مكرمل ببطء وجبنة ذائبة بين خبز محمّص. أكلة شتوية دافئة.",
      en: "French onion grilled cheese recipe: slow-caramelised onions and melted cheese between crisp toasted bread. Winter comfort food.",
    },
  },
  "whipped-feta-hot-honey-dip": {
    title: { ar: "طريقة عمل غموس الفيتا المخفوقة بالعسل الحار", en: "Whipped Feta Dip with Hot Honey Recipe" },
    description: {
      ar: "طريقة عمل غموس الفيتا المخفوقة بالعسل الحار في ٥ دقائق بالخلاط. أسرع مقبلات للعزائم مع الخبز المحمّص.",
      en: "Whipped feta dip with hot honey in 5 minutes in a blender. The fastest party appetizer, served with toasted bread.",
    },
  },
  "korean-cream-cheese-garlic-bread": {
    title: { ar: "طريقة عمل خبز الثوم الكوري بالجبنة الكريمية", en: "Korean Cream Cheese Garlic Bread Recipe" },
    description: {
      ar: "طريقة عمل خبز الثوم الكوري: خبز محشو بالجبنة الكريمية الحلوة ومغموس بزبدة الثوم، طعم شوارع سيول في البيت.",
      en: "Korean cream cheese garlic bread recipe: buns stuffed with sweet cream cheese and soaked in garlic butter. Seoul street food at home.",
    },
  },
  "viral-cucumber-salad": {
    title: { ar: "طريقة عمل سلطة الخيار الفايرال في ١٠ دقائق", en: "Viral Cucumber Salad Recipe (Logan Moffitt)" },
    description: {
      ar: "طريقة عمل سلطة الخيار الفايرال من تيك توك: خيار وصلصة سريعة في برطمان واحد خلال ١٠ دقائق. خفيفة ومنعشة.",
      en: "The viral cucumber salad recipe from TikTok: cucumber and a punchy dressing shaken in one jar, in 10 minutes. Light and fresh.",
    },
  },
  "dubai-pistachio-kunafa-chocolate": {
    title: { ar: "طريقة عمل شوكولاتة دبي بالكنافة والفستق", en: "Dubai Chocolate Recipe — Pistachio Kunafa Chocolate Bar" },
    description: {
      ar: "طريقة عمل شوكولاتة دبي الأصلية: كنافة محمّصة بالزبدة وكريمة فستق داخل لوح شوكولاتة مقرمش. الوصفة كاملة خطوة بخطوة.",
      en: "How to make the viral Dubai chocolate bar: butter-toasted kunafa and pistachio cream inside a snapping chocolate shell. Full step-by-step recipe.",
    },
  },
  "onion-boil": {
    title: { ar: "طريقة عمل البصلة المشوية الكاملة بالزبدة الحارة", en: "Onion Boil Recipe — The Viral Whole Baked Onion" },
    description: {
      ar: "طريقة عمل البصلة المشوية بالزبدة الحارة: بصلة كاملة تنفتح كالزهرة في الفرن، ترند تيك توك بخطوات واضحة.",
      en: "Onion boil recipe: a whole onion baked in spicy Cajun butter until it opens like a flower. The viral TikTok side dish, step by step.",
    },
  },
  "volcano-cheese-ramen": {
    title: { ar: "طريقة عمل رامن البركان بالجبنة — نودلز كورية حارة", en: "Volcano Cheese Ramen Recipe — Instant Noodle Upgrade" },
    description: {
      ar: "طريقة عمل رامن البركان بالجبنة: نودلز كورية جاهزة تتحوّل إلى طبق مطعم حار وجبنة ذائبة في ١٠ دقائق.",
      en: "Volcano cheese ramen recipe: instant noodles turned into a spicy, cheesy restaurant bowl in 10 minutes.",
    },
  },
  "tanghulu-microwave": {
    title: { ar: "طريقة عمل التانغولو بالمايكرويف بدون ميزان حرارة", en: "Tanghulu Recipe — Microwave Method, No Thermometer" },
    description: {
      ar: "طريقة عمل التانغولو بالمايكرويف: فواكه بطبقة سكر زجاجية مقرمشة في ١٥ دقيقة، بدون ميزان حرارة.",
      en: "Tanghulu recipe, microwave method: fruit in a glassy candy shell in 15 minutes, no candy thermometer needed.",
    },
  },
  "cheese-buldak": {
    title: { ar: "طريقة عمل البولداك بالجبنة — دجاج النار الكوري", en: "Cheese Buldak Recipe (Korean Fire Chicken)" },
    description: {
      ar: "طريقة عمل البولداك بالجبنة: دجاج كوري حار بصلصة الغوتشوجانغ تحت طبقة موتزاريلا ذائبة، في ٣٠ دقيقة.",
      en: "Cheese buldak recipe: fiery Korean chicken in gochujang sauce under melted mozzarella, ready in 30 minutes.",
    },
  },
  "japanese-souffle-pancakes": {
    title: { ar: "طريقة عمل البان كيك الياباني السوفليه الهش", en: "Japanese Soufflé Pancakes Recipe — Fluffy & Tall" },
    description: {
      ar: "طريقة عمل بان كيك السوفليه الياباني المرتفع والهش: السر في المرينغ والنار الهادئة. خطوات واضحة.",
      en: "Japanese soufflé pancakes recipe: tall, wobbly and airy. The secret is the meringue and low heat, explained step by step.",
    },
  },
  "crookie-croissant-cookie": {
    title: { ar: "طريقة عمل الكروكي — كرواسون محشو بالكوكيز", en: "Crookie Recipe — Croissant Cookie in 20 Minutes" },
    description: {
      ar: "طريقة عمل الكروكي، ترند باريس: كرواسون محشو بعجينة الكوكيز ومخبوز مرة ثانية، مقرمش من الخارج وطري من الداخل.",
      en: "Crookie recipe, the Paris bakery trend: a croissant stuffed with cookie dough and baked again. Crisp outside, gooey inside.",
    },
  },
  "honeycomb-pasta-pie": {
    title: { ar: "طريقة عمل كيكة الباستا خلية النحل بالريغاتوني", en: "Honeycomb Pasta Recipe (Rigatoni Pasta Pie)" },
    description: {
      ar: "طريقة عمل كيكة الباستا خلية النحل: ريغاتوني واقفة بالصلصة والريكوتا والموتزاريلا، تُخبز وتُقطّع كالكيك.",
      en: "Honeycomb pasta pie recipe: rigatoni stood upright with sauce, ricotta and mozzarella, baked and sliced like a cake.",
    },
  },
  "cornflake-chicken-tenders": {
    title: { ar: "طريقة عمل أصابع الدجاج المقرمشة بالكورن فليكس", en: "Cornflake Chicken Tenders Recipe — Extra Crispy" },
    description: {
      ar: "طريقة عمل أصابع الدجاج بالكورن فليكس: قرمشة عالية بالفرن أو المقلاة، المفضّلة عند الأطفال وفي العزائم.",
      en: "Cornflake chicken tenders recipe: an extra-crunchy coating, baked or fried. A kids' favourite and a party staple.",
    },
  },
  "accordion-potatoes": {
    title: { ar: "طريقة عمل البطاطا الأكورديون المقرمشة", en: "Accordion Potatoes Recipe — The Viral Crispy Potatoes" },
    description: {
      ar: "طريقة عمل البطاطا الأكورديون: بطاطا مقطّعة بطريقة الأكورديون ومحمّرة حتى تتقرمش حوافها. طبق جانبي يسرق الأضواء.",
      en: "Accordion potatoes recipe: potatoes cut accordion-style and roasted until every edge crisps. The viral side dish, step by step.",
    },
  },
  "beet-and-pickled-ginger": {
    title: { ar: "طريقة عمل صلصة البنجر لتزيين الأطباق", en: "Beetroot Sauce Recipe for Plating (Beet & Pickled Ginger)" },
    description: {
      ar: "طريقة عمل صلصة البنجر والزنجبيل المخلّل: صلصة وردية لامعة لتزيين الأطباق مثل المطاعم، بنسب دقيقة.",
      en: "Beetroot and pickled ginger sauce for plating: a bright magenta sauce to dress plates like a restaurant, with exact ratios.",
    },
  },
  "herb-and-chlorophyll": {
    title: { ar: "طريقة عمل صلصة الأعشاب الخضراء لتزيين الأطباق", en: "Green Herb Oil & Sauce Recipe for Plating" },
    description: {
      ar: "طريقة عمل صلصة الأعشاب والكلوروفيل: أخضر عميق من الأعشاب الطازجة لتزيين أطباق الدجاج والخضار.",
      en: "Herb and chlorophyll sauce recipe: a deep green from fresh herbs for plating chicken and vegetable dishes.",
    },
  },
  "aged-balsamic-and-date": {
    title: { ar: "طريقة عمل صلصة البلسمك بالتمر", en: "Balsamic Date Reduction Recipe" },
    description: {
      ar: "طريقة عمل صلصة البلسمك المعتّق والتمر: صلصة داكنة لامعة للحوم المشوية وتزيين الأطباق.",
      en: "Aged balsamic and date reduction: a dark, glossy sauce for grilled meats and restaurant-style plating.",
    },
  },
  "pan-banging-chocolate-chip-cookies": {
    title: { ar: "طريقة عمل الكوكيز بالشوكولاتة — حواف مقرمشة ووسط طري", en: "Pan-Banging Chocolate Chip Cookies Recipe" },
    description: {
      ar: "طريقة عمل كوكيز الشوكولاتة بحيلة ضرب الصينية: حواف مقرمشة بحلقات ووسط طري. أشهر وصفة كوكيز على الإنترنت.",
      en: "Pan-banging chocolate chip cookies recipe: crisp rippled edges and a gooey centre. The internet's most famous cookie technique.",
    },
  },
  "cinnamon-roll-hack": {
    title: { ar: "طريقة عمل السينابون بحيلة الكريمة", en: "Cinnamon Roll Hack Recipe — Taste Like Cinnabon" },
    description: {
      ar: "طريقة عمل السينابون السهلة: لفائف قرفة جاهزة بكريمة الطبخ والسكر البني، طرية وكبيرة بطعم سينابون الأصلي.",
      en: "The viral cinnamon roll hack: canned rolls baked with heavy cream and brown sugar until they taste like Cinnabon.",
    },
  },
  "sheet-pan-pancakes": {
    title: { ar: "طريقة عمل بان كيك الصينية بالفرن", en: "Sheet Pan Pancakes Recipe — Oven Baked" },
    description: {
      ar: "طريقة عمل البان كيك بالفرن في صينية واحدة: بدون قلب، بنكهات مختلفة لكل العيلة في ٢٥ دقيقة.",
      en: "Sheet pan pancakes recipe: oven-baked pancakes for the whole family in one tray, no flipping, ready in 25 minutes.",
    },
  },
  "beef-tacos": {
    title: { ar: "طريقة عمل تاكو اللحمة المكسيكي", en: "Beef Tacos Recipe — Easy Ground Beef Tacos" },
    description: {
      ar: "طريقة عمل تاكو اللحمة المفرومة بالتتبيلة المكسيكية في ٢٠ دقيقة، مع الخس والطماطم والجبنة.",
      en: "Easy ground beef tacos recipe in 20 minutes: seasoned beef, crisp shells, lettuce, tomato and cheese.",
    },
  },
  kibbeh: {
    title: { ar: "طريقة عمل الكبة المقلية بالبرغل واللحمة", en: "Kibbeh Recipe — Fried Bulgur & Meat Croquettes" },
    description: {
      ar: "طريقة عمل الكبة المقلية خطوة بخطوة: قشرة برغل رقيقة ومقرمشة وحشوة لحمة بالصنوبر. أشهر مقبلات عربية.",
      en: "How to make fried kibbeh: a thin crisp bulgur shell with a spiced meat and pine nut filling. The classic Middle Eastern appetizer.",
    },
  },
  "mochi-brownies": {
    title: { ar: "طريقة عمل براونيز الموتشي بطحين الأرز", en: "Mochi Brownies Recipe (Brochis)" },
    description: {
      ar: "طريقة عمل براونيز الموتشي: براونيز بقوام مطاطي بطحين الأرز الدبق، ترند حلويات جديد بخطوات واضحة.",
      en: "Mochi brownies recipe: fudgy brownies with a chewy mochi bite, made with glutinous rice flour. Step by step.",
    },
  },
  maqluba: {
    title: { ar: "طريقة عمل المقلوبة بالدجاج والباذنجان", en: "Maqluba Recipe — Arabic Upside-Down Rice" },
    description: {
      ar: "طريقة عمل المقلوبة خطوة بخطوة: طبقات الرز والباذنجان والبطاطا والدجاج أو اللحم، وسر قلبها بدون ما تخرب.",
      en: "How to make maqluba: layers of rice, aubergine, potato and chicken or lamb, and the secret to flipping it without it collapsing.",
    },
  },
  "biscoff-tiramisu": {
    title: { ar: "طريقة عمل تيراميسو اللوتس بدون قهوة", en: "Biscoff Tiramisu Recipe — No Coffee, No Bake" },
    description: {
      ar: "طريقة عمل تيراميسو اللوتس بدون قهوة وبدون فرن: بسكويت لوتس وكريمة غنية، يُحضّر قبل يوم للعزائم.",
      en: "Biscoff tiramisu recipe with no coffee and no oven: Lotus biscuits and a rich cream, made the day before.",
    },
  },
  "chicken-fajitas": {
    title: { ar: "طريقة عمل فاهيتا الدجاج بالفلفل الملوّن", en: "Chicken Fajitas Recipe — Easy & Quick" },
    description: {
      ar: "طريقة عمل فاهيتا الدجاج بالتتبيلة المكسيكية والفلفل الملوّن والبصل، تُقدّم بالتورتيلا في ٣٥ دقيقة.",
      en: "Easy chicken fajitas recipe: seasoned chicken with peppers and onions, wrapped in warm tortillas in 35 minutes.",
    },
  },
  "kylie-jenner-ramen": {
    title: { ar: "طريقة عمل رامن كايلي جينر بالزبدة والثوم والبيض", en: "Kylie Jenner Ramen Recipe — Instant Ramen Hack" },
    description: {
      ar: "طريقة عمل رامن كايلي جينر: نودلز جاهزة بالزبدة والثوم والبيض في ١٠ دقائق، أشهر حيلة على الرامن.",
      en: "Kylie Jenner's ramen recipe: instant noodles with butter, garlic and egg in 10 minutes. The most famous ramen hack.",
    },
  },
  pho: {
    title: { ar: "طريقة عمل شوربة الفو الفيتنامية باللحم", en: "Pho Recipe — Vietnamese Beef Noodle Soup" },
    description: {
      ar: "طريقة عمل شوربة الفو الفيتنامية: مرق بهارات عطري ونودلز الأرز وشرائح لحم رقيقة مع الأعشاب الطازجة.",
      en: "How to make pho at home: a fragrant spiced broth, rice noodles and thin slices of beef with fresh herbs.",
    },
  },
  "banana-bread": {
    title: { ar: "طريقة عمل خبز الموز (كيكة الموز) السهلة", en: "Banana Bread Recipe — Easy & Moist" },
    description: {
      ar: "طريقة عمل خبز الموز الطري بالموز الناضج، بدون خميرة وبدون عجن. أسهل كيكة موز بمقادير دقيقة.",
      en: "Easy, moist banana bread recipe with overripe bananas, no yeast and no kneading. Exact measurements, step by step.",
    },
  },
  "lasagna-al-forno": {
    title: { ar: "طريقة عمل اللازانيا باللحمة والبشاميل بالفرن", en: "Classic Lasagna Recipe — Lasagna al Forno" },
    description: {
      ar: "طريقة عمل اللازانيا بالفرن: طبقات اللازانيا مع صلصة اللحمة والبشاميل والبارميزان حتى تتحمّر. وصفة إيطالية كلاسيكية.",
      en: "Classic baked lasagna recipe: layers of pasta, meat sauce, béchamel and parmesan baked until golden. The Italian original.",
    },
  },
  bagels: {
    title: { ar: "طريقة عمل البيغل في البيت", en: "Homemade Bagels Recipe — Boiled & Baked" },
    description: {
      ar: "طريقة عمل خبز البيغل في البيت: يُسلق ثم يُخبز للحصول على قشرة لامعة وقوام مطاطي حقيقي.",
      en: "Homemade bagels recipe: boiled then baked for a shiny crust and a properly chewy bite.",
    },
  },
  "chicken-fried-rice": {
    title: { ar: "طريقة عمل الرز المقلي بالدجاج مثل المطاعم", en: "Chicken Fried Rice Recipe — Better Than Takeout" },
    description: {
      ar: "طريقة عمل الرز المقلي بالدجاج والخضار وصلصة الصويا في ٢٥ دقيقة، والسر رز البارحة.",
      en: "Chicken fried rice recipe better than takeout: chicken, vegetables and soy sauce in 25 minutes. The secret is day-old rice.",
    },
  },
  "naan-bread": {
    title: { ar: "طريقة عمل خبز النان الهندي بالمقلاة", en: "Naan Bread Recipe — Soft, No Tandoor" },
    description: {
      ar: "طريقة عمل خبز النان الطري في البيت بالمقلاة، بدون فرن تنور، بمقادير دقيقة وخطوات واضحة.",
      en: "Soft homemade naan bread recipe cooked in a pan, no tandoor needed. Exact measurements and clear steps.",
    },
  },
  "sourdough-bread": {
    title: { ar: "طريقة عمل خبز الساوردو بالخميرة الطبيعية", en: "Sourdough Bread Recipe for Beginners" },
    description: {
      ar: "طريقة عمل خبز الساوردو في البيت بالخميرة الطبيعية: عجين، طيّ، تخمير، وخبز لقشرة مقرمشة ولبّ مفتوح.",
      en: "Sourdough bread recipe for home bakers: mix, fold, ferment and bake for a crackling crust and an open crumb.",
    },
  },
  "focaccia-bread": {
    title: { ar: "طريقة عمل خبز الفوكاتشا الإيطالي بزيت الزيتون", en: "Focaccia Bread Recipe — Easy Italian Focaccia" },
    description: {
      ar: "طريقة عمل الفوكاتشا الإيطالية بزيت الزيتون وفقاعات الهواء الكبيرة، أسهل خبز خميرة للمبتدئين.",
      en: "Easy focaccia bread recipe: olive oil, big airy bubbles and a golden crust. The easiest yeasted bread for beginners.",
    },
  },
  "classic-meatloaf": {
    title: { ar: "طريقة عمل رغيف اللحم (ميت لوف) بالصلصة", en: "Classic Meatloaf Recipe with Glaze" },
    description: {
      ar: "طريقة عمل الميت لوف: رغيف لحم مفروم طري بالفرن مع صلصة الكاتشب اللامعة. طبق عائلي كلاسيكي.",
      en: "Classic meatloaf recipe: a tender beef loaf baked with a glossy ketchup glaze. The family dinner classic.",
    },
  },
  "brioche-bread": {
    title: { ar: "طريقة عمل خبز البريوش الطري بالزبدة", en: "Brioche Bread Recipe — Soft & Buttery" },
    description: {
      ar: "طريقة عمل خبز البريوش الفرنسي الغني بالزبدة والبيض، طري كالقطن، بمقادير دقيقة وخطوات واضحة.",
      en: "Brioche bread recipe: the French loaf rich with butter and eggs, soft as cotton. Exact measurements, step by step.",
    },
  },
  "beef-stew": {
    title: { ar: "طريقة عمل يخنة اللحم بالخضار", en: "Beef Stew Recipe — Classic & Hearty" },
    description: {
      ar: "طريقة عمل يخنة اللحم الطرية بالبطاطا والجزر، مطبوخة على مهل بمرق غني. طبق شتوي دافئ.",
      en: "Classic beef stew recipe: tender beef with potatoes and carrots, slow-cooked in a rich broth. Hearty winter comfort.",
    },
  },
  cornbread: {
    title: { ar: "طريقة عمل خبز الذرة الأمريكي", en: "Cornbread Recipe — Easy & Moist" },
    description: {
      ar: "طريقة عمل خبز الذرة الأمريكي الطري، بدون خميرة، جاهز بأقل من ساعة.",
      en: "Easy, moist cornbread recipe with no yeast, ready in under an hour.",
    },
  },
  "pad-thai": {
    title: { ar: "طريقة عمل الباد تاي التايلندي", en: "Pad Thai Recipe — Authentic & Easy" },
    description: {
      ar: "طريقة عمل الباد تاي: نودلز الأرز بصلصة التمر الهندي الحامضة الحلوة مع الروبيان والفول السوداني، في ٣٠ دقيقة.",
      en: "Easy pad thai recipe: rice noodles in a sweet-sour tamarind sauce with shrimp and peanuts, in 30 minutes.",
    },
  },
  "american-potato-salad": {
    title: { ar: "طريقة عمل سلطة البطاطس بالمايونيز", en: "Classic Potato Salad Recipe" },
    description: {
      ar: "طريقة عمل سلطة البطاطس الأمريكية الكلاسيكية بالمايونيز والبيض والخردل، طبق جانبي للعزائم.",
      en: "Classic American potato salad recipe with mayo, egg and mustard. The essential side dish for gatherings.",
    },
  },
  "italian-pasta-salad": {
    title: { ar: "طريقة عمل سلطة المعكرونة الإيطالية الباردة", en: "Italian Pasta Salad Recipe — Easy Cold Pasta Salad" },
    description: {
      ar: "طريقة عمل سلطة المعكرونة الإيطالية الباردة بالخضار والجبنة والصلصة الإيطالية، مثالية للعزائم.",
      en: "Easy Italian pasta salad recipe: cold pasta with vegetables, cheese and Italian dressing. Perfect for parties.",
    },
  },
  "roast-chicken": {
    title: { ar: "طريقة عمل الدجاج بالفرن — دجاجة كاملة محمّرة", en: "Roast Chicken Recipe — Whole Roasted Chicken" },
    description: {
      ar: "طريقة عمل الدجاج المحمّر بالفرن: دجاجة كاملة بجلد مقرمش ولحم طري، مع درجة النضج الصحيحة.",
      en: "Classic whole roast chicken recipe: crisp skin, juicy meat and the right internal temperature, step by step.",
    },
  },
  "lentil-soup": {
    title: { ar: "طريقة عمل شوربة العدس", en: "Lentil Soup Recipe — Hearty & Easy" },
    description: {
      ar: "طريقة عمل شوربة العدس الكلاسيكية خطوة بخطوة، أول طبق على سفرة إفطار رمضان، بمقادير دقيقة.",
      en: "Hearty lentil soup recipe, step by step: the classic first bowl of a Ramadan iftar, with exact measurements.",
    },
  },
  "caesar-salad": {
    title: { ar: "طريقة عمل سلطة سيزر مع الصلصة", en: "Caesar Salad Recipe with Homemade Dressing" },
    description: {
      ar: "طريقة عمل سلطة سيزر الأصلية بصلصة سيزر الكريمية والبارميزان والخبز المحمّص، في ٢٠ دقيقة.",
      en: "Classic Caesar salad recipe with a homemade creamy dressing, parmesan and croutons, in 20 minutes.",
    },
  },
  "chicken-tikka-masala": {
    title: { ar: "طريقة عمل دجاج تكا ماسالا الهندي", en: "Chicken Tikka Masala Recipe" },
    description: {
      ar: "طريقة عمل دجاج تكا ماسالا: دجاج متبّل باللبن والبهارات بصلصة طماطم وكريمة هندية غنية.",
      en: "Chicken tikka masala recipe: yoghurt-marinated chicken in a rich, spiced Indian tomato and cream sauce.",
    },
  },
  fattoush: {
    title: { ar: "طريقة عمل الفتوش مع الصلصة", en: "Fattoush Salad Recipe — Lebanese Bread Salad" },
    description: {
      ar: "طريقة عمل سلطة الفتوش بالخضار والنعناع والخبز المقرمش وصلصة السماق والليمون، في ٢٠ دقيقة. سلطة إفطار رمضان الأشهر.",
      en: "Fattoush salad recipe: crisp pita, fresh vegetables and mint in a sumac-lemon dressing, in 20 minutes. The Levantine classic.",
    },
  },
};
