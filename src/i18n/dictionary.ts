export type Lang = "ar" | "en";

/** Every visible string on the site, in both languages. */
export const dictionary = {
  /* ── Navigation & shell ── */
  "nav.home": { ar: "الرئيسية", en: "Home" },
  "nav.shop": { ar: "المتجر", en: "Shop" },
  "nav.about": { ar: "عن الشيف", en: "About" },
  "nav.gallery": { ar: "المعرض", en: "Gallery" },
  "nav.recipes": { ar: "الوصفات", en: "Recipes" },
  "nav.faq": { ar: "الأسئلة الشائعة", en: "FAQ" },
  "nav.contact": { ar: "تواصل", en: "Contact" },
  "nav.menu": { ar: "القائمة", en: "Menu" },
  "nav.close": { ar: "إغلاق", en: "Close" },
  "nav.skip": { ar: "تخطَّ إلى المحتوى", en: "Skip to content" },
  "reviews.swipe": { ar: "اسحب لرؤية المزيد", en: "Swipe for more" },
  "legal.eyebrow": { ar: "السياسات", en: "Policies" },

  /* ── Home · the 3D book ── */
  "flip.eyebrow": { ar: "قلّب الكتاب بنفسك", en: "Turn the Pages Yourself" },
  "flip.hint": { ar: "انزل لتفتح الكتاب وتقلّب صفحاته", en: "Scroll to open the book and turn its pages" },
  "flip.counter": { ar: "وصفة من داخل الكتاب", en: "recipes from inside the book" },
  "flip.serves": { ar: "لـ", en: "Serves" },
  "flip.end.title": { ar: "وصفة أخرى بانتظارك في الكتاب", en: "more recipes waiting inside the book" },
  "flip.end.body": {
    ar: "هذه ١٨ وصفة فقط. الكتاب كاملاً: ٣٦١ وصفة في ٣٨٦ صفحة، بتحميل فوري.",
    en: "That was just 18. The full book: 361 recipes across 386 pages, instant download.",
  },
  "nav.cart": { ar: "السلة", en: "Cart" },
  "nav.search": { ar: "بحث", en: "Search" },
  "nav.language": { ar: "English", en: "العربية" },

  "announce.1": { ar: "تحميل فوري بعد الشراء · وصول مدى الحياة", en: "Instant download · Lifetime access" },
  "announce.2": { ar: "هدية: ١٠٠ وصفة سريعة مجاناً مع كل نسخة", en: "Bonus: 100 free quick meals with every copy" },
  "announce.3": { ar: "ضمان استرداد خلال ٣٠ يوماً", en: "30-day money-back guarantee" },

  /* ── Home · hero ── */
  "hero.eyebrow": { ar: "مطبخ المؤلف · إصدار رقمي", en: "Author's Kitchen · Digital Edition" },
  "hero.title.line1": {
    ar: "اطبخ كأنك",
    en: "Cook Like",
  },
  "hero.title.line2": {
    ar: "شيف مطعم",
    en: "A Fine-Dining Chef",
  },
  "hero.subtitle": {
    ar: "٣٦١ وصفة تحوّل مطبخ بيتك إلى مطبخ مطعم — نفس المقادير، نفس الخطوات، ونفس الطبق الذي تراه في الصورة.",
    en: "361 recipes that turn your home kitchen into a restaurant pass — the same measurements, the same steps, the same plate you see in the photo.",
  },
  "hero.cta.primary": { ar: "احصل على النسخة", en: "Get the Codex" },
  "hero.cta.secondary": { ar: "تصفّح المتجر", en: "Browse the Shop" },
  "hero.stat.recipes": { ar: "وصفة منسّقة", en: "Curated recipes" },
  "hero.stat.bonus": { ar: "وصفة سريعة مجاناً", en: "Free quick meals" },
  "hero.stat.readers": { ar: "قارئ حول العالم", en: "Readers worldwide" },
  "hero.portrait.line": {
    ar: "كتبتُ ٣٦١ وصفة كما أطبخها فعلاً — لا كما تُكتب في الكتب.",
    en: "I wrote 361 recipes the way I actually cook them — not the way books write them.",
  },
  "hero.portrait.brand": { ar: "مؤسّس ذا إديبل كودكس · عمّان", en: "Founder of The Edible Codex · Amman" },
  "hero.scroll": { ar: "تابع النزول", en: "Scroll" },

  /* ── Home · the plate story (scroll-driven hero scenes) ── */
  "story.2.eyebrow": { ar: "الفصل الثاني · الصلصات", en: "Chapter Two · The Sauces" },
  "story.2.line1": {
    ar: "سرّ المطاعم",
    en: "The Secret",
  },
  "story.2.line2": {
    ar: "في ملعقة صلصة",
    en: "Is in the Sauce",
  },
  "story.2.body": {
    ar: "خطّ واحد من الصلصة، ويمسك ضيوفك الجوال قبل الشوكة. نعلّمك كيف ترسمه — بالجرام، وبالصور.",
    en: "One stroke of sauce and your guests reach for their phone before their fork. We show you how to draw it — to the gram, in pictures.",
  },
  "story.3.eyebrow": { ar: "الفصل الثالث · الطبق الرئيسي", en: "Chapter Three · The Main" },
  "story.3.line1": {
    ar: "لن يصدّقوا",
    en: "They Won't Believe",
  },
  "story.3.line2": {
    ar: "أنك طبخته",
    en: "You Made This",
  },
  "story.3.body": {
    ar: "تندرلوين، بطّ، روبيان… مكتوبة كما يطبخها الشيف فعلاً. بلا تخمين، بلا طبق فاشل، بلا إحراج أمام الضيوف.",
    en: "Tenderloin, duck, shrimp — written the way the chef actually cooks them. No guessing, no failed plates, no apologising to guests.",
  },

  /* ── Home · scrolling band ── */
  "band.1": {
    ar: "٣٦١ وصفة",
    en: "361 recipes",
  },
  "band.2": {
    ar: "١٠٠ وصفة اجتاحت الإنترنت",
    en: "100 viral recipes",
  },
  "band.3": {
    ar: "صلصات بالجرام",
    en: "Sauces to the gram",
  },
  "band.4": {
    ar: "تحميل فوري",
    en: "Instant download",
  },
  "band.5": {
    ar: "بسعر وجبة واحدة",
    en: "The price of one meal",
  },

  /* ── Home · the book reveal ── */
  "reveal.line1": {
    ar: "مطبخ محترف",
    en: "A Pro Kitchen",
  },
  "reveal.line2": {
    ar: "في جيبك",
    en: "In Your Pocket",
  },
  "reveal.body": {
    ar: "٣٦١ وصفة في ٣٨٦ صفحة — لكل طبق صورته ومقاديره وملاحظة الشيف. افتحه على جوالك وأنت أمام الموقد، وابدأ الليلة.",
    en: "361 recipes across 386 pages — every plate with its own photograph, measurements and chef's note. Open it on your phone at the stove and start tonight.",
  },
  "reveal.page.cover": { ar: "الغلاف", en: "The cover" },
  "reveal.page.contents": { ar: "الفهرس", en: "Contents" },
  "reveal.page.recipe": { ar: "صفحة وصفة", en: "A recipe page" },
  "reveal.page.screen": { ar: "على كل شاشة", en: "On every screen" },
  "reveal.page.chef": { ar: "الشيف", en: "The chef" },

  /* ── Home · the chef ── */
  "chef.eyebrow": { ar: "الشيف", en: "The Chef" },
  "chef.cta": { ar: "قصة الشيف", en: "The chef's story" },

  /* ── Home · the recipe reel (one plate from the book per scroll) ── */
  "reel.eyebrow": { ar: "من داخل الكتاب", en: "Inside the Book" },
  "reel.cta": { ar: "افتح الوصفة مجاناً", en: "Open the recipe — free" },
  "reel.1.hook1": { ar: "القرمشة التي", en: "The Crunch That" },
  "reel.1.hook2": { ar: "كسرت الإنترنت", en: "Broke the Internet" },
  "reel.1.body": {
    ar: "روبيان مقرمش بصلصة كريمية حارّة. جرّبها مرة واحدة… وستُطلب منك في كل عزومة.",
    en: "Crisp shrimp in a creamy, fiery sauce. Make it once — and you'll be asked for it at every dinner.",
  },
  "reel.2.hook1": { ar: "الجبنة التي", en: "The Cheese Pull" },
  "reel.2.hook2": { ar: "لا تنتهي", en: "That Never Ends" },
  "reel.2.body": {
    ar: "بصل مكرمل ببطء، جبنة تذوب وتمتد، خبز ذهبي يطقطق. أشهى عشر دقائق في يومك.",
    en: "Slow-caramelised onion, cheese that melts and stretches, bread that crackles gold. The best ten minutes of your day.",
  },
  "reel.3.hook1": { ar: "التاكو الذي", en: "The Taco" },
  "reel.3.hook2": { ar: "يُغمَّس", en: "You Dunk" },
  "reel.3.body": {
    ar: "لحم مطهو لساعات حتى يتفتّت، تورتيلا مقرمشة، ومرق غني تغمس فيه كل لقمة. لن تعود للتاكو العادي.",
    en: "Meat braised for hours until it falls apart, a crisp tortilla, and a rich broth for every bite. Ordinary tacos are over.",
  },
  "reel.4.hook1": { ar: "بطاطا عادية؟", en: "Plain Potatoes?" },
  "reel.4.hook2": { ar: "ليس بعد اليوم", en: "Not Anymore" },
  "reel.4.body": {
    ar: "اسحقها، حمّرها حتى تتكسّر أطرافها، وشاهدها تختفي من الصحن قبل أن تجلس.",
    en: "Smash them, roast them until the edges shatter, and watch the plate empty before you sit down.",
  },
  "reel.5.hook1": { ar: "الحلو والمالح", en: "Sweet, Salty," },
  "reel.5.hook2": { ar: "في غمسة واحدة", en: "Gone in Minutes" },
  "reel.5.body": {
    ar: "فيتا مخفوقة كالحرير مع عسل حار. المقبّلات التي سيسألك الجميع عن وصفتها.",
    en: "Feta whipped silk-smooth under hot honey. The starter everyone will ask you the recipe for.",
  },
  "reel.6.hook1": { ar: "ثلاثة مكوّنات", en: "Three Ingredients." },
  "reel.6.hook2": { ar: "حيّرت العالم", en: "One Viral Cloud" },
  "reel.6.body": {
    ar: "قهوة مخفوقة كالسحاب فوق حليب بارد — دقيقتان، ومقهى كامل في كوبك.",
    en: "Coffee whipped into a cloud over cold milk — two minutes, and a whole café in your glass.",
  },

  /* ── Home · the five sauces (free guide) ── */
  "sauces.eyebrow": { ar: "هديّة مجانية · الصلصات الخمس", en: "Free Gift · The Five Sauces" },
  "sauces.line1": { ar: "خمس صلصات", en: "Five Sauces" },
  "sauces.line2": { ar: "تغيّر كل طبق", en: "That Change Every Plate" },
  "sauces.body": {
    ar: "نفس الصلصات التي تراها في صور الشيف، بالجرام وبالصور — مجاناً بالكامل. حمّلها الآن، وارسم الليلة أول طبق يليق بالكاميرا.",
    en: "The same sauces you see in the chef's photos, to the gram and in pictures — completely free. Download them now and draw your first camera-ready plate tonight.",
  },
  "sauces.more": { ar: "تفاصيل الدليل", en: "See the guide" },
  "sauces.alt": { ar: "طبق بالصلصات الخمس", en: "A plate drawn with the five sauces" },
  "sauce.1.name": { ar: "البنجر", en: "Beetroot" },
  "sauce.1.line": { ar: "الأحمر الذي يوقف التمرير.", en: "The red that stops the scroll." },
  "sauce.2.name": { ar: "الكركم", en: "Turmeric" },
  "sauce.2.line": { ar: "ذهب حقيقي على طبقك.", en: "Real gold on your plate." },
  "sauce.3.name": { ar: "الأعشاب", en: "Herb" },
  "sauce.3.line": { ar: "أخضر حيّ لا يبهت.", en: "A living green that never fades." },
  "sauce.4.name": { ar: "الفلفل المشوي", en: "Roasted Pepper" },
  "sauce.4.line": { ar: "دفء مدخّن بلون الغروب.", en: "Smoky warmth the colour of sunset." },
  "sauce.5.name": { ar: "البلسمك المركّز", en: "Reduced Balsamic" },
  "sauce.5.line": { ar: "اللمسة الأخيرة لكل شيف.", en: "Every chef's finishing stroke." },

  /* ── Value props ── */
  "value.title": { ar: "لماذا هذا الإصدار مختلف", en: "Why This Edition Is Different" },
  "value.subtitle": {
    ar: "كل تفصيلة صُمِّمت لتنقل معايير المطبخ الاحترافي إلى منزلك دون تعقيد.",
    en: "Every detail is built to carry professional kitchen standards into your home — without the complexity.",
  },
  "value.1.title": { ar: "تنسيق احترافي", en: "Professional Plating" },
  "value.1.body": {
    ar: "دروس تصوير وتنسيق الأطباق بنفس أسلوب مطاعم النجوم، بخطوات واضحة.",
    en: "Plating and food-styling lessons in fine-dining language, reduced to clear steps.",
  },
  "value.2.title": { ar: "مقادير مضبوطة", en: "Tested Ratios" },
  "value.2.body": {
    ar: "كل وصفة اختُبرت في مطبخ حقيقي بمقادير بالجرام والكوب معاً.",
    en: "Every recipe tested in a working kitchen, with grams and cups side by side.",
  },
  "value.3.title": { ar: "صلصات وأساسات", en: "Sauces & Bases" },
  "value.3.body": {
    ar: "مكتبة صلصات ملوّنة كاملة: البنجر، الكركم، الأعشاب، الفلفل المشوي والبلسمك.",
    en: "A full colour-sauce library: beetroot, turmeric, herb, roasted pepper and balsamic.",
  },
  "value.4.title": { ar: "وصول مدى الحياة", en: "Lifetime Access" },
  "value.4.body": {
    ar: "تحميل فوري، تحديثات مجانية للأبد، ويعمل على الجوال واللوح والحاسوب.",
    en: "Instant download, free updates forever, readable on phone, tablet and desktop.",
  },

  /* ── Featured product ── */
  "featured.eyebrow": { ar: "الإصدار الرئيسي", en: "The Flagship" },
  "featured.title": { ar: "ذا إديبل كودكس", en: "The Edible Codex" },
  "featured.body": {
    ar: "مجلّد رقمي من ٢٦١ وصفة مقسّمة إلى فصول: المقبلات، اللحوم، المأكولات البحرية، الصلصات، والتنسيق. مع فصل هدية من ١٠٠ وصفة سريعة تُنجز في ٢٠ دقيقة.",
    en: "A digital volume of 261 recipes across chapters — starters, meats, seafood, sauces and plating — plus a bonus chapter of 100 quick meals you can finish in 20 minutes.",
  },
  "featured.bullet.1": { ar: "٢٦١ وصفة مع صور نهائية لكل طبق", en: "261 recipes, each with a finished plate photo" },
  "featured.bullet.2": { ar: "فصل كامل عن الصلصات الملوّنة", en: "A full chapter on signature colour sauces" },
  "featured.bullet.3": { ar: "قوائم تسوّق جاهزة للطباعة", en: "Printable shopping lists" },
  "featured.bullet.4": { ar: "هدية: ١٠٠ وصفة سريعة", en: "Bonus: 100 quick meals" },

  /* ── Product grid ── */
  "shop.eyebrow": { ar: "المتجر", en: "The Shop" },
  "shop.title": { ar: "إصداراتنا", en: "Our Editions" },
  "shop.subtitle": {
    ar: "إصدارات رقمية قابلة للتحميل فوراً، صُمِّمت لتُقرأ وتُطبَّق في نفس اليوم.",
    en: "Digital editions, downloadable the moment you order, designed to be read and cooked the same day.",
  },
  "shop.viewAll": { ar: "عرض كل الإصدارات", en: "View all editions" },
  "shop.results": { ar: "نتيجة", en: "results" },
  "shop.result": { ar: "نتيجة واحدة", en: "result" },
  "shop.searchPlaceholder": { ar: "ابحث عن إصدار…", en: "Search editions…" },
  "shop.filters": { ar: "التصنيفات", en: "Filters" },
  "shop.sort": { ar: "الترتيب", en: "Sort by" },
  "shop.sort.featured": { ar: "المميّز", en: "Featured" },
  "shop.sort.priceAsc": { ar: "السعر: من الأقل", en: "Price: low to high" },
  "shop.sort.priceDesc": { ar: "السعر: من الأعلى", en: "Price: high to low" },
  "shop.empty": { ar: "لا توجد نتائج مطابقة.", en: "No editions match your filters." },
  "shop.clear": { ar: "مسح الفلاتر", en: "Clear filters" },
  "shop.all": { ar: "الكل", en: "All" },

  /* ── Product card / detail ── */
  "product.addToCart": { ar: "أضف إلى السلة", en: "Add to cart" },
  "product.buyNow": { ar: "اشترِ الآن", en: "Buy now" },
  "product.free": { ar: "مجاناً", en: "Free" },
  "product.getFree": { ar: "احصل عليه مجاناً", en: "Get it free" },
  "product.freeBadge": { ar: "هديّة مجانية", en: "Free gift" },
  "product.added": { ar: "أُضيف إلى السلة", en: "Added to cart" },
  "product.instant": { ar: "تحميل فوري", en: "Instant download" },
  "product.bestseller": { ar: "الأكثر مبيعاً", en: "Bestseller" },
  "product.bundle": { ar: "باقة موفّرة", en: "Bundle & save" },
  "product.new": { ar: "جديد", en: "New" },
  "product.save": { ar: "وفّر", en: "Save" },
  "product.includes": { ar: "ماذا يتضمّن", en: "What's included" },
  "product.details": { ar: "تفاصيل الإصدار", en: "Edition details" },
  "product.format": { ar: "الصيغة", en: "Format" },
  // The file that actually ships is an English PDF in two editions — the full
  // one and a lighter one for a phone. Promising EPUB and Arabic was a refund
  // waiting to happen. ما يُسلَّم فعلاً: PDF بنسختين، كاملة وخفيفة.
  "product.formatValue": {
    ar: "PDF · نسخة كاملة + نسخة خفيفة للهاتف",
    en: "PDF · full edition + a light one for your phone",
  },
  "product.delivery": { ar: "التسليم", en: "Delivery" },
  "product.deliveryValue": { ar: "رابط تحميل فوري بعد الدفع", en: "Instant download link after payment" },
  "product.guarantee": { ar: "الضمان", en: "Guarantee" },
  "product.guaranteeValue": { ar: "استرداد كامل خلال ٣٠ يوماً", en: "Full refund within 30 days" },
  "product.quantity": { ar: "الكمية", en: "Quantity" },
  "product.related": { ar: "قد يعجبك أيضاً", en: "You may also like" },
  "product.notFound": { ar: "هذا الإصدار غير موجود.", en: "That edition could not be found." },
  "product.backToShop": { ar: "العودة إلى المتجر", en: "Back to the shop" },
  "product.secure": { ar: "دفع آمن ومشفّر", en: "Secure encrypted checkout" },

  /* ── Recipes ── */
  "recipes.eyebrow": { ar: "من الكتاب", en: "From the Book" },
  "recipes.title": { ar: "وصفات مجانية", en: "Free Recipes" },
  "recipes.subtitle": {
    ar: "وصفات كاملة من ذا إديبل كودكس — بالمقادير والخطوات ونصيحة الشيف، مجاناً وبلا تسجيل.",
    en: "Complete recipes from The Edible Codex — ingredients, steps and the chef's note, free and with no sign-up.",
  },
  "recipes.searchPlaceholder": { ar: "ابحث بالاسم أو بالمكوّن…", en: "Search by name or ingredient…" },
  "recipes.one": { ar: "وصفة واحدة", en: "recipe" },
  "recipes.many": { ar: "وصفة", en: "recipes" },
  "recipes.empty": { ar: "لا توجد وصفة مطابقة.", en: "No recipe matches that." },
  "recipes.read": { ar: "اقرأ", en: "Read" },
  "recipes.ingredients": { ar: "المكوّنات", en: "Ingredients" },
  "recipes.method": { ar: "الطريقة", en: "Method" },
  "recipes.tip": { ar: "نصيحة الشيف", en: "Chef's note" },
  "recipes.more": { ar: "وصفات أخرى", en: "More recipes" },
  "recipes.backToAll": { ar: "كل الوصفات", en: "All recipes" },
  "recipes.notFound": { ar: "هذه الوصفة غير موجودة.", en: "That recipe could not be found." },
  "recipes.fromBook": { ar: "من هذا الإصدار", en: "From this edition" },
  "recipes.codexChapter": { ar: "الكوديكس", en: "The Codex" },
  "recipes.sauceChapter": { ar: "الصلصات", en: "Sauces" },
  "recipes.homeTitle": { ar: "جرّب قبل أن تشتري", en: "Taste Before You Buy" },
  "recipes.homeBody": {
    ar: "وصفات كاملة من الكتاب، منشورة مجاناً — اطبخها الليلة وقرّر بنفسك.",
    en: "Complete recipes from the book, published free — cook one tonight and judge for yourself.",
  },
  "recipes.homeCta": { ar: "تصفّح الوصفات المجانية", en: "Browse the free recipes" },

  /* ── Gallery ── */
  "gallery.eyebrow": { ar: "من المطبخ", en: "From the Pass" },
  "gallery.title": { ar: "أطباق من الكتاب", en: "Plates From the Book" },
  "gallery.subtitle": {
    ar: "صور حقيقية من جلسات التصوير — نفس الأطباق التي ستتعلّم تنفيذها.",
    en: "Real frames from the shoot — the same plates you will learn to build.",
  },
  "gallery.1.title": { ar: "روبيان بصلصات الطيف", en: "Shrimp, Spectrum Sauces" },
  "gallery.1.body": { ar: "ستّ صلصات ملوّنة على طبق واحد", en: "Six colour sauces on a single plate" },
  "gallery.2.title": { ar: "صدر بطّ بالكرز", en: "Duck Breast & Cherry" },
  "gallery.2.body": { ar: "رشّ حرّ وتوزيع متدرّج", en: "Free splatter, graded placement" },
  "gallery.3.title": { ar: "تندرلوين مع هريس الجزر", en: "Tenderloin, Carrot Purée" },
  "gallery.3.body": { ar: "خطوط بلسمك متساوية", en: "Evenly drawn balsamic lines" },

  /* ── Testimonials ── */
  "reviews.eyebrow": { ar: "آراء القرّاء", en: "Reader Reviews" },
  "reviews.title": { ar: "ماذا قالوا بعد أول أسبوع", en: "What They Said After Week One" },
  "reviews.verified": { ar: "مشترٍ موثّق", en: "Verified buyer" },
  "reviews.count": { ar: "تقييم", en: "reviews" },
  "reviews.rating": { ar: "٤٫٩ من ٥ · أكثر من ٨٠٠ تقييم", en: "4.9 / 5 · 800+ ratings" },

  /* ── Offer strip ── */
  "offer.eyebrow": {
    ar: "عرض الإطلاق · ٩٫٩٩$ بدل ١٩٫٩٩$",
    en: "Launch offer · $9.99, was $19.99",
  },
  "offer.title": {
    ar: "الليلة، اطبخ طبقاً يتذكّرونه",
    en: "Tonight, Cook a Plate They'll Remember",
  },
  "offer.body": {
    ar: "بأقل من سعر وجبة واحدة في مطعم، تحصل على ٣٦١ وصفة تطبخها العمر كله. وإن لم تعجبك، نعيد لك مالك كاملاً خلال ٣٠ يوماً — بلا أسئلة.",
    en: "For less than one restaurant meal, you get 361 recipes to cook for the rest of your life. And if it's not for you, we refund every cent within 30 days — no questions.",
  },
  "offer.cta": {
    ar: "ابدأ الآن",
    en: "Start now",
  },

  /* ── Newsletter ── */
  "news.title": { ar: "انضم إلى قائمة المطبخ", en: "Join the Kitchen List" },
  "news.body": {
    ar: "وصفة جديدة كل أسبوع، ونصائح تنسيق، وعروض خاصة للمشتركين فقط.",
    en: "A new recipe each week, plating notes, and subscriber-only offers.",
  },
  "news.placeholder": { ar: "بريدك الإلكتروني", en: "Your email address" },
  "news.cta": { ar: "اشترك", en: "Subscribe" },
  "news.success": { ar: "تم الاشتراك — تحقّق من بريدك.", en: "You're subscribed — check your inbox." },
  "news.privacy": { ar: "لن نشارك بريدك مع أي جهة. إلغاء الاشتراك بنقرة.", en: "We never share your email. Unsubscribe in one click." },

  /* ── About ── */
  "about.eyebrow": { ar: "عن الشيف", en: "About the Chef" },
  "about.title": { ar: "القصة خلف الكوديكس", en: "The Story Behind the Codex" },
  "about.lead": {
    ar: "بدأ المشروع من دفتر ملاحظات في مطبخ مزدحم: كل صلصة نجحت، كل نسبة ضُبطت، كل طبق استحقّ أن يُصوَّر.",
    en: "It started as a notebook in a busy kitchen: every sauce that worked, every ratio that landed, every plate worth photographing.",
  },
  "about.p1": {
    ar: "بعد سنوات بين خطّ الإنتاج ومطبخ التطوير، تحوّل الدفتر إلى نظام كامل: طريقة تفكير في الطبق قبل أن يبدأ الطهي — اللون، الملمس، الحرارة، ثم الطعم.",
    en: "After years between the line and the development kitchen, that notebook became a system: a way of thinking about the plate before the cooking starts — colour, texture, temperature, then taste.",
  },
  "about.p2": {
    ar: "ذا إديبل كودكس هو ذلك النظام، مكتوباً بلغة يفهمها من يطبخ في المنزل، ومصوّراً بنفس معايير المطاعم التي خرج منها.",
    en: "The Edible Codex is that system, written in language a home cook understands and photographed to the standard of the restaurants it came from.",
  },
  "about.p3": {
    ar: "لا نبيع وصفات فقط — نبيع الثقة بأن الطبق الذي تخرجه من مطبخك يستحق أن يُقدَّم.",
    en: "We are not selling recipes alone — we are selling the confidence that what leaves your kitchen deserves to be served.",
  },
  "about.values.title": { ar: "ما نلتزم به", en: "What We Stand For" },
  "about.v1.title": { ar: "دقّة", en: "Precision" },
  "about.v1.body": { ar: "لا وصفة تُنشر قبل أن تُختبر ثلاث مرات على الأقل.", en: "No recipe is published before it is tested at least three times." },
  "about.v2.title": { ar: "وضوح", en: "Clarity" },
  "about.v2.body": { ar: "خطوات قصيرة، بلا مصطلحات غامضة، وبصورة لكل مرحلة حرجة.", en: "Short steps, no fog of jargon, and a photo at every critical stage." },
  "about.v3.title": { ar: "جمال", en: "Beauty" },
  "about.v3.body": { ar: "الطبق يُؤكل بالعين أولاً — ولذلك التنسيق جزء من الوصفة لا إضافة عليها.", en: "We eat with the eyes first — so plating is part of the recipe, not an afterthought." },
  "about.cta": { ar: "ابدأ من الإصدار الرئيسي", en: "Start with the flagship edition" },
  "about.numbers.years": { ar: "سنوات في المطبخ", en: "Years in kitchens" },
  "about.numbers.recipes": { ar: "وصفة مُختبرة", en: "Tested recipes" },
  "about.numbers.countries": { ar: "دولة وصلها الكتاب", en: "Countries reached" },

  /* ── Contact ── */
  "contact.eyebrow": { ar: "تواصل", en: "Get in Touch" },
  "contact.title": { ar: "نحن نقرأ كل رسالة", en: "We Read Every Message" },
  "contact.subtitle": {
    ar: "أسئلة عن الطلب، تعاون تجاري، أو طلب خاص — اكتب لنا وسنردّ خلال يوم عمل.",
    en: "Order questions, partnerships, or a custom request — write to us and we reply within one business day.",
  },
  "contact.form.name": { ar: "الاسم", en: "Name" },
  "contact.form.email": { ar: "البريد الإلكتروني", en: "Email" },
  "contact.form.subject": { ar: "الموضوع", en: "Subject" },
  "contact.form.message": { ar: "رسالتك", en: "Your message" },
  "contact.form.send": { ar: "إرسال الرسالة", en: "Send message" },
  "contact.form.sending": { ar: "جارٍ الإرسال…", en: "Sending…" },
  "contact.form.success": { ar: "وصلتنا رسالتك، شكراً لك.", en: "Your message reached us. Thank you." },
  "contact.whatsapp": { ar: "راسلنا على واتساب", en: "Message us on WhatsApp" },
  "contact.email": { ar: "البريد", en: "Email" },
  "contact.phone": { ar: "الهاتف", en: "Phone" },
  "contact.location": { ar: "الموقع", en: "Location" },
  "contact.hours": { ar: "أوقات العمل", en: "Hours" },

  /* ── FAQ ── */
  "faq.eyebrow": { ar: "الأسئلة الشائعة", en: "FAQ" },
  "faq.title": { ar: "أسئلة قبل الشراء", en: "Questions Before You Buy" },
  "faq.subtitle": { ar: "لم تجد إجابتك؟ راسلنا مباشرة.", en: "Didn't find your answer? Write to us directly." },


  "product.whop": { ar: "الدفع الآمن عبر Whop", en: "Secure payment via Whop" },
  "product.whopNote": {
    ar: "الدفع يتم داخل هذه الصفحة — لن تغادر الموقع.",
    en: "Payment happens right here — you never leave the site.",
  },
  "product.whopBy": { ar: "بتشفير ومعالجة من منصّة Whop", en: "Encrypted and processed by Whop" },
  "product.methods": { ar: "طرق الدفع المقبولة", en: "Accepted payment methods" },
  "product.whopTrust": {
    ar: "دفع مشفّر · تسليم فوري · استرداد خلال ٣٠ يوماً",
    en: "Encrypted payment · instant delivery · 30-day refund",
  },
  "product.viaWhop": { ar: "الدفع الآمن عبر Whop", en: "Secure checkout by Whop" },
  "checkout.loading": { ar: "جارٍ تحميل صفحة الدفع الآمنة…", en: "Loading the secure checkout…" },
  "checkout.embedFailed": {
    ar: "تعذّر فتح الدفع داخل الصفحة. اضغط الزر أدناه لإتمام الشراء بأمان على Whop.",
    en: "The in-page checkout could not open. Use the button below to complete your purchase securely on Whop.",
  },
  "checkout.openHosted": { ar: "متابعة الدفع على Whop", en: "Continue to Whop checkout" },
  "checkout.moreMethods": {
    ar: "طرق دفع أخرى (تحويل بنكي · ACH · عملات رقمية)",
    en: "Other payment methods (bank wire · ACH · crypto)",
  },

  /* ── After checkout · بعد الدفع ── */
  "done.title": { ar: "حالة الدفع", en: "Payment status" },
  "done.succeeded.title": { ar: "تمّ الدفع بنجاح", en: "Payment received" },
  "done.succeeded.body": {
    ar: "شكراً لك. ستصلك رسالة من Whop على بريدك فيها الإيصال ورابط التحميل.",
    en: "Thank you. Whop is emailing your receipt and download access.",
  },
  "done.failed.title": { ar: "لم يكتمل الدفع", en: "The payment didn't go through" },
  "done.failed.body": {
    ar: "لم يُخصم أي مبلغ. يمكنك المحاولة مجدداً، أو اختيار طريقة دفع أخرى.",
    en: "You haven't been charged. You can try again, or choose another payment method.",
  },
  "done.canceled.title": { ar: "أُلغي الدفع", en: "The payment was canceled" },
  "done.processing.title": { ar: "جارٍ تأكيد الدفع", en: "Confirming your payment" },
  "done.processing.body": {
    ar: "قد يستغرق ذلك دقائق. ستصلك رسالة من Whop فور تأكيده — لا حاجة لإعادة الدفع.",
    en: "This can take a few minutes. Whop will email you as soon as it's confirmed — no need to pay again.",
  },
  "done.reference": { ar: "رقم العملية", en: "Payment reference" },
  "done.retry": { ar: "العودة إلى المتجر", en: "Back to the shop" },
  "done.home": { ar: "الصفحة الرئيسية", en: "Home" },

  /* ── Technique videos · مقاطع التقنيات ── */
  "videos.eyebrow": { ar: "من المطبخ", en: "From the kitchen" },
  "videos.title": { ar: "تقنيات في أقل من دقيقة", en: "Techniques in Under a Minute" },
  "videos.nav": { ar: "المقاطع", en: "Videos" },
  "videos.why": { ar: "لماذا تعمل هذه الطريقة", en: "Why this works" },
  "videos.more": { ar: "مقاطع أخرى", en: "More techniques" },
  "videos.all": { ar: "كل المقاطع", en: "All techniques" },
  "videos.notFound": { ar: "المقطع غير موجود", en: "Video not found" },
  "videos.bookPitch": {
    ar: "هذه واحدة من مئات التفاصيل التي يشرحها الكتاب — القاعدة أولاً، ثم الوصفة، ثم صورة الطبق النهائي.",
    en: "This is one of hundreds of details the book explains — the rule first, then the recipe, then a photo of the finished plate.",
  },
  "seo.videos.title": { ar: "تقنيات مطبخ مصوّرة", en: "Kitchen Techniques on Camera" },
  "seo.videos.desc": {
    ar: "مقاطع قصيرة من مطبخ محترف: لماذا تتسرّب الجبنة المقلية، متى ينفصل الهولنديز، وكيف يُضغط الأرز المقرمش. قاعدة واحدة في كل مقطع.",
    en: "Short clips from a professional kitchen: why fried cheese leaks, when hollandaise splits, and how crispy rice is pressed. One rule per clip.",
  },
  "videos.subtitle": {
    ar: "أربع تقنيات مطاعم مصوّرة في المطبخ، بالطريقة نفسها التي يشرحها بها الكتاب: القاعدة أولاً، ثم الطبق.",
    en: "Four restaurant techniques filmed in the kitchen, explained the way the book explains them: the rule first, then the plate.",
  },

  /* ── Search results · عناوين وأوصاف نتائج البحث ──
     Written for the search listing rather than the page: each one leads with
     what a searcher is looking for and closes with the reason to click —
     price, delivery, refund. Kept short enough to survive Google's truncation.
     عناوين مكتوبة لنتيجة البحث لا للصفحة نفسها. */
  "seo.home.title": { ar: "٢٦١ وصفة مصوّرة خطوة بخطوة", en: "261 Recipes, Photographed Step by Step" },
  "seo.home.desc": {
    ar: "كتاب طبخ رقمي من مطبخ محترف — ٢٦١ وصفة مصوّرة ومشروحة بالجرام والكوب، مع ١٠٠ وصفة سريعة هدية. تحميل فوري بـ ٩٫٩٩ دولاراً واسترداد خلال ٣٠ يوماً.",
    en: "A digital cookbook from a professional kitchen — 261 photographed recipes written in grams and cups, plus 100 quick meals free. Instant download for $9.99, 30-day refund.",
  },
  "seo.shop.title": { ar: "الكتاب الكامل والصلصات الخمس", en: "The Book & The Five Sauces" },
  "seo.shop.desc": {
    ar: "إصداران: ذا إديبل كودكس بـ ٩٫٩٩ دولاراً، والصلصات الخمس المميّزة مجاناً. تحميل فوري، وصول مدى الحياة، واسترداد خلال ٣٠ يوماً.",
    en: "Two editions: The Edible Codex for $9.99, and The Five Signature Sauces free. Instant download, lifetime access, 30-day refund.",
  },
  "seo.recipes.title": { ar: "١٨ وصفة مجانية مصوّرة", en: "18 Free Recipes, Photographed" },
  "seo.recipes.desc": {
    ar: "وصفات مجانية من الكتاب — تاكو كيسابيريا، مطري مي تشكن، باستا الفيتا المخبوزة وغيرها. مقادير دقيقة، خطوات واضحة، وصورة للطبق النهائي.",
    en: "Free recipes from the book — quesabirria tacos, marry me chicken, baked feta pasta and more. Exact quantities, clear steps, and a photo of the finished plate.",
  },
  "seo.faq.title": { ar: "الأسئلة الشائعة — الشراء والتحميل", en: "FAQ — Buying and Downloading" },
  "seo.faq.desc": {
    ar: "كل ما تحتاج معرفته قبل الشراء: صيغ الملفات، طريقة التحميل، اللغات، طرق الدفع، وسياسة الاسترداد خلال ٣٠ يوماً.",
    en: "Everything you need before buying: file formats, how delivery works, languages, payment methods, and the 30-day refund policy.",
  },
  "seo.about.title": { ar: "الشيف أحمد سلامة", en: "Chef Ahmet Salameh" },
  "seo.about.desc": {
    ar: "قصة المطبخ الذي وُلد منه ذا إديبل كودكس — من الخدمة اليومية إلى ٢٦١ وصفة مُختبرة ومصوّرة.",
    en: "The story of the kitchen behind The Edible Codex — from daily service to 261 tested, photographed recipes.",
  },
  "seo.contact.title": { ar: "تواصل معنا", en: "Contact Us" },
  "seo.contact.desc": {
    ar: "أسئلة عن الكتاب أو عن طلبك؟ راسلنا على واتساب ونردّ خلال ساعات.",
    en: "Questions about the book or your order? Message us on WhatsApp and we reply within hours.",
  },
  "seo.productSuffix": {
    ar: "تحميل فوري · وصول مدى الحياة · استرداد خلال ٣٠ يوماً",
    en: "Instant download · lifetime access · 30-day refund",
  },
  "seo.recipeSuffix": {
    ar: "وصفة مجانية مصوّرة خطوة بخطوة من ذا إديبل كودكس",
    en: "A free step-by-step recipe, photographed, from The Edible Codex",
  },

  /* ── Trust strip ── */
  "trust.instant": { ar: "تحميل فوري", en: "Instant delivery" },
  "trust.secure": { ar: "دفع آمن", en: "Secure payment" },
  "trust.refund": { ar: "استرداد ٣٠ يوماً", en: "30-day refund" },
  "trust.support": { ar: "دعم مباشر", en: "Direct support" },

  /* ── Footer ── */
  "footer.about": {
    ar: "إصدارات طهي رقمية من مطبخ محترف — وصفات مُختبرة، تنسيق احترافي، ولغة واضحة.",
    en: "Digital culinary editions from a professional kitchen — tested recipes, serious plating, plain language.",
  },
  "footer.explore": { ar: "تصفّح", en: "Explore" },
  "footer.help": { ar: "المساعدة", en: "Help" },
  "footer.legal": { ar: "القانوني", en: "Legal" },
  "footer.follow": { ar: "تابعنا", en: "Follow" },
  "footer.rights": { ar: "جميع الحقوق محفوظة.", en: "All rights reserved." },
  "footer.payments": { ar: "طرق الدفع المقبولة", en: "Accepted payment methods" },

  "legal.privacy": { ar: "سياسة الخصوصية", en: "Privacy Policy" },
  "legal.terms": { ar: "الشروط والأحكام", en: "Terms of Service" },
  "legal.refund": { ar: "سياسة الاسترداد", en: "Refund Policy" },
  "legal.updated": { ar: "آخر تحديث", en: "Last updated" },

  /* ── 404 ── */
  "nf.title": { ar: "الصفحة غير موجودة", en: "Page not found" },
  "nf.body": { ar: "الرابط الذي فتحته لم يعد متاحاً.", en: "The link you opened is no longer available." },
  "nf.cta": { ar: "العودة للرئيسية", en: "Back home" },
} as const;

export type DictKey = keyof typeof dictionary;
