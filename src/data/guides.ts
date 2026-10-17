import type { Localized } from "@/i18n/LanguageContext";

/**
 * Search guides: one page for each thing people type into Google — "viral
 * TikTok recipes", "easy dinner ideas", "Dubai chocolate recipe" — written
 * by the chef, each pointing at the free recipes on the site and at the
 * product that answers the search best. Arabic and English, like every page.
 *
 * أدلة البحث: صفحة لكل عبارة يكتبها الناس في جوجل، يكتبها الشيف، وتقود إلى
 * الوصفات المجانية وإلى المنتج الأنسب. بالعربية والإنجليزية.
 *
 * لإضافة دليل: انسخ أي كتلة أدناه وعدّلها. خريطة الموقع والصفحات تُبنى منها
 * تلقائياً. `recipe` يجب أن يطابق اسم وصفة موجودة في recipes.ts.
 */
export type Guide = {
  slug: string;
  /** The recipe whose photograph opens the page and stands for it in results. */
  cover: string;
  /** The product the guide sells. */
  product: "the-edible-codex" | "the-five-sauces";
  eyebrow: Localized;
  title: Localized;
  description: Localized;
  intro: Localized[];
  picks: { recipe: string; why: Localized }[];
  tips: { heading: Localized; body: Localized }[];
  faq: { q: Localized; a: Localized }[];
};

export const guides: Guide[] = [
  {
    slug: "viral-tiktok-recipes",
    cover: "the-original-baked-feta-pasta",
    product: "the-edible-codex",
    eyebrow: { ar: "دليل الترند", en: "The Viral List" },
    title: {
      ar: "أشهر وصفات تيك توك الترند — مجرّبة من شيف",
      en: "Viral TikTok Recipes Actually Worth Making — Tested by a Chef",
    },
    description: {
      ar: "أشهر وصفات تيك توك وإنستغرام التي اجتاحت العالم، مجرّبة ومضبوطة في مطبخ محترف: باستا الفيتا، دجاج ماري مي، شوكولاتة دبي، رامن البركان وغيرها — بمقادير دقيقة وخطوات واضحة.",
      en: "The viral TikTok and Instagram recipes that took over the internet, tested and fixed in a professional kitchen: baked feta pasta, Marry Me Chicken, Dubai chocolate, volcano ramen and more — exact measurements, clear steps.",
    },
    intro: [
      {
        ar: "كل أسبوع تنتشر وصفة جديدة على تيك توك، لكن أغلب المقاطع لا تتجاوز ٦٠ ثانية: مقادير تقريبية، خطوات مختصرة، ونتيجة في البيت لا تشبه ما رأيته في الفيديو. جرّبنا أشهر هذه الوصفات في مطبخ مطعم، وضبطنا المقادير بالجرام، وكتبنا ما لا يقوله الفيديو.",
        en: "A new recipe goes viral on TikTok every week, but most clips last under sixty seconds: rough amounts, skipped steps, and a result at home that looks nothing like the video. We cooked the most famous ones in a restaurant kitchen, fixed the measurements, and wrote down what the video leaves out.",
      },
      {
        ar: "هذه القائمة هي الوصفات التي تستحق وقتك فعلاً — التي تنجح في البيت وتستحق الضجة. كل وصفة لها صفحتها الكاملة مجاناً على الموقع، بالمكوّنات والخطوات ونصيحة الشيف.",
        en: "This list is the ones that genuinely deserve your time — the ones that work at home and live up to the hype. Every recipe has its own full page on the site, free, with ingredients, method and a chef's tip.",
      },
    ],
    picks: [
      { recipe: "the-original-baked-feta-pasta", why: { ar: "الوصفة التي بدأت كل شيء عام ٢٠٢١. السر: قالب فيتا كامل لا مفتّت، فيذوب كصلصة كريمية.", en: "The one that started it all in 2021. The secret: a whole block of feta, never crumbles, so it melts into a creamy sauce." } },
      { recipe: "marry-me-chicken", why: { ar: "دجاج بصلصة كريمية بالطماطم المجففة في ٣٠ دقيقة — أكثر وصفة عشاء طُلبت منا.", en: "Creamy sun-dried-tomato chicken in 30 minutes — the dinner recipe we get asked for most." } },
      { recipe: "dubai-pistachio-kunafa-chocolate", why: { ar: "ترند ٢٠٢٤ الأكبر: كنافة محمّصة وكريمة فستق داخل شوكولاتة مقرمشة.", en: "The biggest trend of 2024: toasted kunafa and pistachio cream inside a snapping chocolate shell." } },
      { recipe: "viral-cucumber-salad", why: { ar: "عشر دقائق، برطمان واحد، وسلطة تُؤكل كاملة. خفيفة ومنعشة.", en: "Ten minutes, one jar, and a salad you finish in one sitting. Light and fresh." } },
      { recipe: "onion-boil", why: { ar: "بصلة كاملة بالزبدة الحارة تنفتح كالزهرة — شكلها وحده يجعلها ترند.", en: "A whole onion in spicy butter that opens like a flower — the look alone made it viral." } },
      { recipe: "volcano-cheese-ramen", why: { ar: "نودلز إندومي تتحوّل إلى طبق مطعم في عشر دقائق.", en: "Instant noodles turned into a restaurant bowl in ten minutes." } },
      { recipe: "gigi-hadid-spicy-vodka-pasta", why: { ar: "صلصة وردية كريمية حارّة أصبحت من أشهر وصفات الباستا في العالم.", en: "A creamy, spicy pink sauce that became one of the world's most-made pastas." } },
      { recipe: "crookie-croissant-cookie", why: { ar: "كرواسون محشو بعجينة الكوكيز ومخبوز مرة ثانية — ترند المخابز الباريسية.", en: "A croissant stuffed with cookie dough and baked again — the Paris bakery trend." } },
      { recipe: "korean-cream-cheese-garlic-bread", why: { ar: "خبز محشو بالجبنة الكريمية ومغموس بزبدة الثوم — طعم الشارع الكوري.", en: "Bread stuffed with cream cheese and soaked in garlic butter — Korean street food at home." } },
      { recipe: "emily-mariko-salmon-rice-bowl", why: { ar: "وجبة كاملة من بقايا السلمون والأرز في ١٥ دقيقة.", en: "A full meal from leftover salmon and rice in 15 minutes." } },
    ],
    tips: [
      {
        heading: { ar: "لماذا لا تنجح وصفات تيك توك في البيت؟", en: "Why viral recipes fail at home" },
        body: {
          ar: "ثلاثة أسباب في الغالب: المقادير «بالعين»، حرارة الفرن التي تختلف من بيت لآخر، والخطوة التي قُصّت من الفيديو لتقصيره. لذلك كتبنا كل وصفة بالجرام والكوب، وبحرارة الفرن بالدرجتين، ولم نحذف أي خطوة.",
          en: "Usually three reasons: amounts eyeballed on camera, ovens that run hotter or colder than the creator's, and the step cut to keep the clip short. That's why every recipe here is written in grams and cups, with oven temperatures in both scales, and no step left out.",
        },
      },
      {
        heading: { ar: "ابدأ من هنا", en: "Where to start" },
        body: {
          ar: "إذا كانت هذه أول مرة: ابدأ بسلطة الخيار (عشر دقائق) ثم باستا الفيتا (وصفة لا تفشل). وإذا أردت أن تبهر ضيوفك: البصلة المشوية أو شوكولاتة دبي.",
          en: "First time? Start with the cucumber salad (ten minutes), then the baked feta pasta (it can't fail). Want to impress guests? The onion boil or the Dubai chocolate.",
        },
      },
    ],
    faq: [
      {
        q: { ar: "ما هي أشهر وصفة على تيك توك؟", en: "What is the most famous TikTok recipe?" },
        a: { ar: "باستا الفيتا المخبوزة هي الأشهر تاريخياً، إذ تسبّبت بنفاد جبن الفيتا من المتاجر عام ٢٠٢١. وفي ٢٠٢٤ تصدّرت شوكولاتة دبي بالكنافة والفستق.", en: "Baked feta pasta is the most famous of all — it emptied supermarket shelves of feta in 2021. In 2024 the Dubai pistachio kunafa chocolate took the top spot." },
      },
      {
        q: { ar: "هل الوصفات مجانية؟", en: "Are these recipes free?" },
        a: { ar: "نعم، كل وصفة في هذه القائمة منشورة كاملة ومجاناً على الموقع. وفي كتاب ذا إديبل كودكس ٣٦١ وصفة لمن يريد المزيد.", en: "Yes — every recipe on this list is published in full, free, on the site. The Edible Codex cookbook has 361 recipes for anyone who wants more." },
      },
      {
        q: { ar: "هل تحتاج هذه الوصفات أدوات خاصة؟", en: "Do I need special equipment?" },
        a: { ar: "لا. فرن عادي، مقلاة، وصينية تكفي لكل الوصفات تقريباً. التانغولو يحتاج مايكرويف فقط.", en: "No. A regular oven, a pan and a baking dish cover almost all of them. The tanghulu needs only a microwave." },
      },
    ],
  },
  {
    slug: "easy-dinner-ideas",
    cover: "marry-me-chicken",
    product: "the-edible-codex",
    eyebrow: { ar: "عشاء الليلة", en: "Tonight's Dinner" },
    title: {
      ar: "أفكار عشاء سهلة وسريعة بطعم المطاعم",
      en: "Easy Dinner Ideas — Restaurant-Quality Meals at Home",
    },
    description: {
      ar: "أفكار عشاء سهلة وسريعة من مطبخ شيف محترف: دجاج ماري مي، باستا حارّة، بول السلمون، سوشي مخبوز وتاكو بيريا — معظمها في أقل من ٤٠ دقيقة، بمقادير دقيقة وخطوات واضحة.",
      en: "Easy dinner ideas from a professional chef: Marry Me Chicken, spicy vodka pasta, salmon rice bowls, sushi bake and birria tacos — most on the table in under 40 minutes, with exact measurements and clear steps.",
    },
    intro: [
      {
        ar: "«شو نطبخ اليوم؟» أصعب سؤال في المطبخ. هذه قائمة عشاء مجرّبة: وصفات تجمع طعم المطعم وسهولة البيت، بمكوّنات تجدها في أي سوبرماركت، ومعظمها جاهز في أقل من ٤٠ دقيقة.",
        en: "\"What's for dinner?\" is the hardest question in any kitchen. This is a tested dinner list: restaurant flavour with home-cook effort, ingredients from any supermarket, and most of them ready in under 40 minutes.",
      },
      {
        ar: "رتّبناها من الأسرع إلى الأطول، مع ملاحظة عن كل طبق: متى تطبخه، ولمن يناسب.",
        en: "They're ordered from quickest to longest, with a note on each: when to make it and who it suits.",
      },
    ],
    picks: [
      { recipe: "volcano-cheese-ramen", why: { ar: "١٠ دقائق — عشاء الليالي المتعبة.", en: "10 minutes — the tired-night dinner." } },
      { recipe: "emily-mariko-salmon-rice-bowl", why: { ar: "١٥ دقيقة من البقايا، صحي ومشبع.", en: "15 minutes from leftovers, healthy and filling." } },
      { recipe: "gigi-hadid-spicy-vodka-pasta", why: { ar: "٢٥ دقيقة، باستا كريمية حارّة يحبها الجميع.", en: "25 minutes, a creamy spicy pasta everyone loves." } },
      { recipe: "marry-me-chicken", why: { ar: "٣٠ دقيقة، طبق واحد، يناسب العزائم.", en: "30 minutes, one pan, good enough for guests." } },
      { recipe: "cheese-buldak", why: { ar: "٣٠ دقيقة، دجاج كوري حار تحت طبقة جبنة ذائبة.", en: "30 minutes, fiery Korean chicken under melted cheese." } },
      { recipe: "cornflake-chicken-tenders", why: { ar: "أصابع دجاج مقرمشة بالكورن فليكس — المفضّلة عند الأطفال.", en: "Cornflake-crusted chicken tenders — the kids' favourite." } },
      { recipe: "sushi-bake", why: { ar: "٤٠ دقيقة، كل نكهات السوشي في صينية واحدة للعائلة.", en: "40 minutes, every sushi flavour in one family tray." } },
      { recipe: "the-original-baked-feta-pasta", why: { ar: "٤٥ دقيقة، والفرن يعمل عنك.", en: "45 minutes, and the oven does the work." } },
      { recipe: "quesabirria-tacos", why: { ar: "٣ ساعات — مشروع عطلة نهاية الأسبوع، ويستحق.", en: "3 hours — a weekend project, and worth it." } },
    ],
    tips: [
      {
        heading: { ar: "سرّ عشاء المطاعم في البيت", en: "The restaurant secret for home dinners" },
        body: {
          ar: "الفرق ليس في المكوّنات بل في الترتيب: جهّز كل شيء قبل أن تشعل النار، سخّن المقلاة جيداً قبل الدجاج، وتذوّق الملح في النهاية. ثلاث عادات تغيّر أي طبق.",
          en: "The difference isn't the ingredients, it's the order: prep everything before the heat goes on, get the pan properly hot before the chicken goes in, and season to taste at the end. Three habits that change any plate.",
        },
      },
      {
        heading: { ar: "عشاء أسبوع كامل", en: "A full week of dinners" },
        body: {
          ar: "اطبخ الأرز مرة واحدة واستخدمه في بول السلمون والسوشي المخبوز، واطبخ الدجاج مرة لماري مي وتشيز بولداك. هكذا يصبح الأسبوع كله أسهل.",
          en: "Cook the rice once and use it for the salmon bowl and the sushi bake; cook the chicken once for Marry Me Chicken and cheese buldak. The whole week gets easier.",
        },
      },
    ],
    faq: [
      {
        q: { ar: "ما أسرع عشاء يمكن تحضيره؟", en: "What's the quickest dinner here?" },
        a: { ar: "رامن البركان بالجبنة في ١٠ دقائق، ثم بول السلمون والأرز في ١٥ دقيقة.", en: "Volcano cheese ramen in 10 minutes, then the salmon rice bowl in 15." },
      },
      {
        q: { ar: "ما أفضل عشاء للضيوف؟", en: "What's the best dinner for guests?" },
        a: { ar: "دجاج ماري مي أو السوشي المخبوز: يُحضّران مسبقاً، يُقدّمان في طبق واحد، ويبدوان كطبق مطعم.", en: "Marry Me Chicken or the sushi bake: both can be prepped ahead, served from one dish, and look restaurant-made." },
      },
      {
        q: { ar: "أين أجد وصفات عشاء أكثر؟", en: "Where can I find more dinner recipes?" },
        a: { ar: "في كتاب ذا إديبل كودكس ٣٦١ وصفة في ٣٨٦ صفحة، منها عشرات أطباق العشاء من مطبخ المطعم.", en: "The Edible Codex has 361 recipes across 386 pages, including dozens of restaurant-kitchen dinners." },
      },
    ],
  },
  {
    slug: "dubai-chocolate-and-viral-desserts",
    cover: "dubai-pistachio-kunafa-chocolate",
    product: "the-edible-codex",
    eyebrow: { ar: "حلويات الترند", en: "Viral Desserts" },
    title: {
      ar: "شوكولاتة دبي وحلويات الترند — الوصفات الأصلية",
      en: "Dubai Chocolate & Viral Desserts — The Real Recipes",
    },
    description: {
      ar: "طريقة عمل شوكولاتة دبي بالكنافة والفستق، والكرينكل كيك، والتانغولو، وبان كيك السوفليه الياباني، والكروكي — حلويات الترند بمقادير مضبوطة وخطوات مجرّبة من شيف.",
      en: "How to make Dubai pistachio kunafa chocolate, crinkle cake, tanghulu, Japanese soufflé pancakes and the crookie — viral desserts with exact measurements and chef-tested steps.",
    },
    intro: [
      {
        ar: "شوكولاتة دبي هي أكثر حلوى بُحث عنها في العالم في السنتين الأخيرتين: لوح شوكولاتة سميك، في داخله كنافة محمّصة بالزبدة وكريمة فستق، يصدر صوت قرمشة عند كسره. نسختنا تشرح ما يجعلها تنجح فعلاً — تحميص الكنافة حتى تصبح ذهبية، وتبريد القالب بين الطبقات.",
        en: "Dubai chocolate has been the most-searched dessert in the world for two years running: a thick chocolate bar filled with butter-toasted kunafa and pistachio cream that crunches when you snap it. Our version explains what actually makes it work — toasting the kunafa until golden, and chilling the mould between layers.",
      },
      {
        ar: "ومعها أشهر حلويات الإنترنت: الكرينكل كيك بعجينة الفيلو، والتانغولو اللامع بالمايكرويف، وبان كيك السوفليه الذي يرتجف على الطبق.",
        en: "Alongside it, the internet's other great desserts: phyllo crinkle cake, glassy microwave tanghulu, and soufflé pancakes that wobble on the plate.",
      },
    ],
    picks: [
      { recipe: "dubai-pistachio-kunafa-chocolate", why: { ar: "الوصفة الأصلية خطوة بخطوة، مع سرّ القرمشة.", en: "The original, step by step, with the secret to the crunch." } },
      { recipe: "crinkle-cake", why: { ar: "عجينة فيلو مجعّدة وقطر — حلوى شرقية بشكل جديد.", en: "Crinkled phyllo soaked in syrup — a Middle Eastern sweet, reimagined." } },
      { recipe: "tanghulu-microwave", why: { ar: "فواكه بطبقة سكر زجاجية في ١٥ دقيقة، بلا ميزان حرارة.", en: "Fruit in a glassy sugar shell in 15 minutes, no thermometer." } },
      { recipe: "japanese-souffle-pancakes", why: { ar: "بان كيك هشّ ومرتفع — السر في المرينغ.", en: "Tall, airy pancakes — the secret is the meringue." } },
      { recipe: "crookie-croissant-cookie", why: { ar: "كرواسون وكوكيز في قطعة واحدة.", en: "Croissant and cookie in one bite." } },
      { recipe: "dalgona-coffee", why: { ar: "قهوة مخفوقة في ١٠ دقائق — حلوى ومشروب معاً.", en: "Whipped coffee in 10 minutes — dessert and drink in one." } },
    ],
    tips: [
      {
        heading: { ar: "كيف تجعل شوكولاتة دبي مقرمشة؟", en: "How to keep Dubai chocolate crunchy" },
        body: {
          ar: "حمّص الكنافة بالزبدة على نار متوسطة حتى تصبح ذهبية تماماً، واتركها تبرد قبل خلطها بكريمة الفستق. الكنافة الدافئة تمتص الكريمة وتفقد قرمشتها.",
          en: "Toast the kunafa in butter over medium heat until fully golden, and let it cool before mixing it with the pistachio cream. Warm kunafa soaks up the cream and loses its crunch.",
        },
      },
      {
        heading: { ar: "حلويات للعزائم", en: "Desserts for a crowd" },
        body: {
          ar: "الكرينكل كيك والكروكي يُحضّران قبل يوم. التانغولو والسوفليه يُقدّمان فوراً، فاتركهما للحظة الأخيرة.",
          en: "Crinkle cake and the crookie can be made a day ahead. Tanghulu and soufflé pancakes must be served straight away, so leave them for last.",
        },
      },
    ],
    faq: [
      {
        q: { ar: "ما مكوّنات شوكولاتة دبي؟", en: "What's inside Dubai chocolate?" },
        a: { ar: "شوكولاتة حليب أو داكنة، كنافة (شعيرية) محمّصة بالزبدة، كريمة الفستق، وقليل من الطحينة لتوازن الحلاوة.", en: "Milk or dark chocolate, kunafa (kataifi) pastry toasted in butter, pistachio cream, and a little tahini to balance the sweetness." },
      },
      {
        q: { ar: "هل يمكن عمل التانغولو بدون ميزان حرارة؟", en: "Can I make tanghulu without a thermometer?" },
        a: { ar: "نعم، طريقة المايكرويف لا تحتاج ميزان حرارة: السكر جاهز حين تصبح القطرة صلبة فوراً في الماء البارد.", en: "Yes — the microwave method needs no thermometer: the sugar is ready when a drop sets hard instantly in cold water." },
      },
      {
        q: { ar: "كم تدوم شوكولاتة دبي؟", en: "How long does Dubai chocolate keep?" },
        a: { ar: "حتى أسبوع في الثلاجة في علبة محكمة، لكن القرمشة تكون في أفضلها في أول يومين.", en: "Up to a week in the fridge in an airtight box, but the crunch is at its best in the first two days." },
      },
    ],
  },
  {
    slug: "korean-recipes-at-home",
    cover: "cheese-buldak",
    product: "the-edible-codex",
    eyebrow: { ar: "المطبخ الكوري", en: "Korean Kitchen" },
    title: {
      ar: "وصفات كورية سهلة في البيت — بولداك، رامن، وخبز الثوم",
      en: "Easy Korean Recipes at Home — Buldak, Ramen & Garlic Bread",
    },
    description: {
      ar: "أشهر الوصفات الكورية الترند بطريقة سهلة في البيت: دجاج البولداك الحار بالجبنة، رامن البركان، خبز الثوم الكوري بالجبنة الكريمية، وقهوة الدالغونا — بمكوّنات متوفرة وخطوات واضحة.",
      en: "The most popular Korean recipes made easy at home: cheese buldak fire chicken, volcano cheese ramen, Korean cream cheese garlic bread and dalgona coffee — with easy-to-find ingredients and clear steps.",
    },
    intro: [
      {
        ar: "المطبخ الكوري هو الأسرع انتشاراً على الإنترنت: حار، حلو، مقرمش، ومليء بالجبنة الذائبة. والخبر الجيد أن أشهر أطباقه لا تحتاج مكوّنات نادرة — معظمها يُصنع من الدجاج والنودلز والخبز ومعجون الفلفل الكوري (غوتشوجانغ) الموجود اليوم في أغلب المتاجر.",
        en: "Korean food is the fastest-spreading cuisine online: spicy, sweet, crispy and full of molten cheese. The good news is its most famous dishes need nothing rare — mostly chicken, noodles, bread and gochujang, which most supermarkets now stock.",
      },
    ],
    picks: [
      { recipe: "cheese-buldak", why: { ar: "دجاج النار الكوري تحت طبقة موتزاريلا — الحرارة والجبنة في توازن.", en: "Korean fire chicken under a blanket of mozzarella — heat and cheese in balance." } },
      { recipe: "volcano-cheese-ramen", why: { ar: "أشهر طريقة لترقية نودلز الإندومي، في ١٠ دقائق.", en: "The most famous way to upgrade instant noodles, in 10 minutes." } },
      { recipe: "korean-cream-cheese-garlic-bread", why: { ar: "خبز شوارع سيول: جبنة كريمية حلوة وزبدة ثوم مالحة.", en: "Seoul street bread: sweet cream cheese and salty garlic butter." } },
      { recipe: "dalgona-coffee", why: { ar: "القهوة الكورية المخفوقة التي اجتاحت العالم عام ٢٠٢٠.", en: "The Korean whipped coffee that took over the world in 2020." } },
      { recipe: "sushi-bake", why: { ar: "ليست كورية، لكنها من نفس عائلة النكهات الآسيوية التي يحبها محبّو البولداك.", en: "Not Korean, but the same family of Asian flavours buldak fans love." } },
    ],
    tips: [
      {
        heading: { ar: "كيف تتحكم بالحرارة؟", en: "How to control the heat" },
        body: {
          ar: "الحرارة في الوصفات الكورية تأتي من الغوتشوجانغ ورقائق الفلفل (غوتشوغارو). ابدأ بنصف الكمية، وأضف العسل أو السكر لتوازنها، والجبنة تخفّف الحدّة كثيراً.",
          en: "The heat in Korean recipes comes from gochujang and gochugaru flakes. Start with half, balance it with honey or sugar, and remember cheese tames it a lot.",
        },
      },
    ],
    faq: [
      {
        q: { ar: "ما هو البولداك؟", en: "What is buldak?" },
        a: { ar: "البولداك يعني «دجاج النار» بالكورية: دجاج بصلصة حارّة حلوة، يُقدّم غالباً تحت جبنة ذائبة.", en: "Buldak means \"fire chicken\" in Korean: chicken in a sweet, fiery sauce, often served under melted cheese." },
      },
      {
        q: { ar: "بماذا أستبدل الغوتشوجانغ؟", en: "What can I use instead of gochujang?" },
        a: { ar: "مزيج من معجون الفلفل الحار أو السريراتشا مع قليل من صلصة الصويا والعسل يعطي نتيجة قريبة.", en: "A mix of chilli paste or sriracha with a little soy sauce and honey gets close." },
      },
    ],
  },
  {
    slug: "party-appetizers-and-sides",
    cover: "onion-boil",
    product: "the-edible-codex",
    eyebrow: { ar: "للعزائم", en: "For Guests" },
    title: {
      ar: "مقبلات وأطباق جانبية سهلة للعزائم",
      en: "Easy Party Appetizers & Side Dishes Guests Remember",
    },
    description: {
      ar: "مقبلات وأطباق جانبية سهلة للعزائم والسهرات: بطاطا مقرمشة، بصلة مشوية بالزبدة الحارة، روبيان بانغ بانغ، غموس الفيتا بالعسل الحار وسلطات الترند — وصفات من شيف بمقادير دقيقة.",
      en: "Easy party appetizers and side dishes: crispy smashed and accordion potatoes, the onion boil, bang bang shrimp, whipped feta with hot honey and viral salads — chef recipes with exact measurements.",
    },
    intro: [
      {
        ar: "الطبق الرئيسي يُشبع، لكن المقبلات هي ما يتذكّره الضيوف. هذه أطباق تُحضّر بسرعة، تُقدّم في وسط الطاولة، ويُطلب منك سرّها في كل عزيمة.",
        en: "The main course fills people up, but the starters are what guests remember. These are quick to make, go in the middle of the table, and get you asked for the recipe every time.",
      },
    ],
    picks: [
      { recipe: "whipped-feta-hot-honey-dip", why: { ar: "٥ دقائق فقط — أسرع غموس يبهر الضيوف.", en: "Just 5 minutes — the fastest dip that wows a table." } },
      { recipe: "viral-cucumber-salad", why: { ar: "سلطة منعشة توازن الأطباق الدسمة.", en: "A fresh salad to balance the richer plates." } },
      { recipe: "green-goddess-salad", why: { ar: "تُؤكل كغموس مع رقائق التورتيلا.", en: "Eaten like a dip with tortilla chips." } },
      { recipe: "bang-bang-shrimp", why: { ar: "روبيان مقرمش بصلصة حلوة حارّة — يختفي من الطبق أولاً.", en: "Crispy shrimp in a sweet-spicy sauce — the first plate to empty." } },
      { recipe: "smashed-potatoes", why: { ar: "أقصى قرمشة ممكنة للبطاطا.", en: "The crispiest potatoes possible." } },
      { recipe: "accordion-potatoes", why: { ar: "بطاطا مقطّعة كالأكورديون — شكلها يسرق الأضواء.", en: "Potatoes cut like an accordion — they steal the show." } },
      { recipe: "onion-boil", why: { ar: "قطعة مركزية للطاولة تنفتح كالزهرة.", en: "A centrepiece that opens like a flower." } },
      { recipe: "french-onion-grilled-cheese", why: { ar: "شوربة البصل الفرنسية داخل ساندويش جبنة — مقبلات دافئة للشتاء.", en: "French onion soup inside a grilled cheese — a warm winter starter." } },
    ],
    tips: [
      {
        heading: { ar: "خطة العزيمة", en: "The party plan" },
        body: {
          ar: "حضّر الغموس والسلطات قبل ساعات واحفظها في الثلاجة. اسلق البطاطا مسبقاً، واترك التحمير والقلي للنصف ساعة الأخيرة حتى تصل مقرمشة.",
          en: "Make the dips and salads hours ahead and keep them chilled. Boil the potatoes in advance, and leave the roasting and frying for the last half hour so everything arrives crisp.",
        },
      },
    ],
    faq: [
      {
        q: { ar: "ما أسهل مقبلات للعزائم؟", en: "What's the easiest party appetizer?" },
        a: { ar: "غموس الفيتا المخفوقة بالعسل الحار: خمس دقائق في الخلاط، ويُقدّم مع الخبز المحمّص.", en: "Whipped feta with hot honey: five minutes in a blender, served with toasted bread." },
      },
      {
        q: { ar: "كيف أجعل البطاطا مقرمشة؟", en: "How do I get really crispy potatoes?" },
        a: { ar: "اسلقها أولاً، جفّفها جيداً، ثم اهرسها وحمّرها بالزيت في فرن ساخن جداً. البخار هو عدو القرمشة.", en: "Boil them first, dry them well, then smash and roast them in oil in a very hot oven. Steam is the enemy of crunch." },
      },
    ],
  },
  {
    slug: "sauces-for-plating",
    cover: "beet-and-pickled-ginger",
    product: "the-five-sauces",
    eyebrow: { ar: "سرّ الطبق", en: "The Plate's Secret" },
    title: {
      ar: "صوصات ملوّنة لتزيين الأطباق مثل المطاعم",
      en: "Colourful Sauces for Plating — Make Food Look Restaurant-Made",
    },
    description: {
      ar: "كيف تزيّن الطبق مثل مطاعم الفاين داينينغ: صوصات ملوّنة سهلة — البنجر، الأعشاب الخضراء، والبلسمك بالتمر — بنسب دقيقة وطريقة رسمها على الطبق، مع دليل الصلصات الخمس المجاني.",
      en: "How to plate like a fine-dining restaurant: easy colour sauces — beetroot, green herb and balsamic-date — with exact ratios and how to draw them on the plate, plus the free Five Signature Sauces guide.",
    },
    intro: [
      {
        ar: "لماذا تبدو أطباق المطاعم أجمل من أطباق البيت حتى لو كان الطعم نفسه؟ الجواب غالباً نقطة أو خط من صلصة ملوّنة. الصلصة تعطي الطبق لوناً، وحموضة توازن الدسم، وشكلاً يجعل الصورة تستحق النشر.",
        en: "Why does restaurant food look better than home cooking even when it tastes the same? Usually it's a dot or a swoosh of colour sauce. Sauce gives a plate colour, acidity to cut through richness, and a look that makes the photo worth posting.",
      },
      {
        ar: "هذه الصوصات من مطبخ الشيف أحمد سلامة، وهي نفسها التي تراها في صور أطباقه. ثلاث منها منشورة هنا كاملة، والخمس كلها في دليل الصلصات الخمس المجاني.",
        en: "These are Chef Ahmet Salameh's own sauces — the ones you see in his plate photos. Three are published here in full; all five are in the free Five Signature Sauces guide.",
      },
    ],
    picks: [
      { recipe: "beet-and-pickled-ginger", why: { ar: "ماجنتا كهربائي — حادّ وحلو، مثالي مع السمك والأجبان.", en: "Electric magenta — sharp and sweet, perfect with fish and cheese." } },
      { recipe: "herb-and-chlorophyll", why: { ar: "أخضر عميق من الأعشاب الطازجة — يرفع أي طبق دجاج أو خضار.", en: "Deep green from fresh herbs — lifts any chicken or vegetable plate." } },
      { recipe: "aged-balsamic-and-date", why: { ar: "داكن ولامع — البلسمك والتمر مع اللحوم المشوية.", en: "Dark and glossy — balsamic and date for grilled meats." } },
    ],
    tips: [
      {
        heading: { ar: "كيف ترسم الصلصة على الطبق", en: "How to draw sauce on a plate" },
        body: {
          ar: "ضع ملعقة صلصة على طرف الطبق، ثم اسحبها بظهر الملعقة في حركة واحدة سريعة. أو استخدم زجاجة ضغط لنقاط متدرّجة الحجم. القاعدة: صلصة أقل، أثر أكبر.",
          en: "Put a spoonful of sauce at the edge of the plate and drag it with the back of the spoon in one quick stroke. Or use a squeeze bottle for dots of graded sizes. The rule: less sauce, more impact.",
        },
      },
      {
        heading: { ar: "القوام الصحيح", en: "Getting the texture right" },
        body: {
          ar: "الصلصة الجيدة للتزيين يجب أن تثبت مكانها ولا تسيل. إذا كانت سائلة، اخفقها أكثر أو أضف قليلاً من الزانثان أو اختزلها على النار.",
          en: "A plating sauce should hold its place, not run. If it's too thin, blend longer, add a pinch of xanthan, or reduce it on the heat.",
        },
      },
    ],
    faq: [
      {
        q: { ar: "كم تدوم الصوصات في الثلاجة؟", en: "How long do the sauces keep?" },
        a: { ar: "معظمها من ٣ إلى ٧ أيام في علبة محكمة، وتفاصيل كل صلصة مكتوبة في صفحتها.", en: "Most keep 3 to 7 days in an airtight container; each sauce page gives its own shelf life." },
      },
      {
        q: { ar: "هل دليل الصلصات الخمس مجاني؟", en: "Is the Five Signature Sauces guide free?" },
        a: { ar: "نعم، دليل الصلصات الخمس مجاني بالكامل، ويصلك فوراً.", en: "Yes — the Five Signature Sauces guide is completely free and arrives instantly." },
      },
    ],
  },
];

export const getGuide = (slug?: string) => guides.find((g) => g.slug === slug);
