import type { Localized } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/dictionary";
import { recipesAr } from "./recipes.ar";

/**
 * وصفات مختارة من كتاب The Edible Codex — النصّ كما نُشر في الكتاب.
 * Recipes taken from the book, published verbatim; only the titles and
 * one-line descriptions are also given in Arabic.
 *
 * لإضافة وصفة: انسخ أي كتلة أدناه وعدّلها. الفهرس والبحث وخريطة الموقع
 * كلها تقرأ من هذا الملف تلقائياً.
 */

/** Colour drawn from the book's own five-sauce palette. */
export type RecipeAccent = "magenta" | "gold" | "green" | "orange" | "dark";

export type Recipe = {
  slug: string;
  /** Recipe number in the collection; 0 for the sauce chapter. */
  number: number;
  source: "codex" | "sauces";
  accent: RecipeAccent;
  time: string;
  serves: string;
  tags: string[];
  title: Localized;
  subtitle: Localized;
  ingredients: string[];
  steps: string[];
  tip: string;
  /** Plate photo under public/brand/recipes/. Falls back to the colour plate. */
  photo?: boolean;
};

export const accentHex: Record<RecipeAccent, string> = {
  magenta: "#A81B52",
  gold: "#C9A227",
  green: "#1F7A4C",
  orange: "#C0562A",
  dark: "#2B1B12",
};

export const recipes: Recipe[] = [
  {
    slug: "the-original-baked-feta-pasta",
    photo: true,
    number: 1,
    source: "codex",
    accent: "magenta",
    time: "45 min",
    serves: "4",
    tags: ["Pasta", "Viral"],
    title: { ar: "باستا الفيتا المخبوزة", en: "The Original Baked Feta Pasta" },
    subtitle: { ar: "الوصفة التي تسبّبت بنفاد جبن الفيتا عالمياً عام ٢٠٢١.", en: "The recipe that caused a global shortage of feta cheese in 2021." },
    ingredients: [
      "1 block (200g) Feta cheese",
      "2 cups Cherry tomatoes",
      "½ cup Olive oil",
      "3 cloves Garlic (minced or whole)",
      "Dried Oregano, Red pepper flakes",
      "Salt, Black pepper, Fresh Basil",
      "250g Pasta (Penne or Fusilli)",
    ],
    steps: [
      "Preheat oven to 400°F (200°C).",
      "In a baking dish, place cherry tomatoes. Place the feta block in the center.",
      "Drizzle generously with olive oil. Season with oregano, salt, pepper, and chili flakes.",
      "Bake for 35 minutes until tomatoes burst and feta is soft.",
      "Boil pasta in salted water. Reserve ½ cup pasta water.",
      "Mash feta and tomatoes together. Add garlic and fresh basil.",
      "Toss in cooked pasta (add pasta water if needed). Serve warm.",
    ],
    tip: "Use a full block of feta, not crumbles — it melts into a creamier sauce",
  },
  {
    slug: "marry-me-chicken",
    photo: true,
    number: 5,
    source: "codex",
    accent: "orange",
    time: "30 min",
    serves: "4",
    tags: ["Chicken", "Dinner"],
    title: { ar: "دجاج ماري مي", en: "Marry Me Chicken" },
    subtitle: { ar: "صدور دجاج بصلصة كريمية بالطماطم المجفّفة والبارميزان.", en: "Creamy Tuscan-style chicken said to be so good it elicits proposals." },
    ingredients: [
      "3 Chicken breasts (sliced lengthwise)",
      "½ cup Flour (for dredging)",
      "1 cup Heavy cream",
      "½ cup Chicken broth",
      "½ cup Sun-dried tomatoes (chopped)",
      "¼ cup Parmesan cheese",
      "Garlic, Thyme, Red pepper flakes, Fresh basil",
    ],
    steps: [
      "Season chicken and dredge lightly in flour.",
      "Sear chicken in a pan with oil/butter until golden. Remove and set aside.",
      "Sauté garlic for 1 minute. Add chicken broth to deglaze pan.",
      "Add heavy cream, sun-dried tomatoes, thyme, parmesan, and chili flakes. Simmer 5 minutes.",
      "Return chicken to sauce. Simmer another 3–5 minutes.",
      "Garnish with fresh basil. Serve over pasta or mashed potatoes.",
    ],
    tip: "Don't skip dredging in flour — it gives the sauce a luxurious thickness",
  },
  {
    slug: "quesabirria-tacos",
    photo: true,
    number: 21,
    source: "codex",
    accent: "dark",
    time: "3 h",
    serves: "6",
    tags: ["Beef", "Mexican", "Dinner"],
    title: { ar: "تاكو البيريا بالجبن", en: "Quesabirria Tacos (Birria Tacos)" },
    subtitle: { ar: "لحم مطهوّ ببطء، وتورتيلا مغموسة بالدهن، وصلصة الغمس.", en: "The most famous 'dipping taco' with a rich, red consommé." },
    ingredients: [
      "1 kg Beef Chuck roast (cut into chunks)",
      "4 dried Guajillo chilies (rehydrated)",
      "2 dried Ancho chilies",
      "1 onion, 4 cloves garlic, 1 tsp cumin, 1 tsp oregano",
      "½ tsp cinnamon, 4 cups beef broth, 2 tbsp vinegar",
      "Corn tortillas",
      "Oaxaca cheese or Mozzarella",
      "Onion & Cilantro for garnish",
    ],
    steps: [
      "Blend rehydrated chilies, onion, garlic, spices, vinegar, and 1 cup broth until smooth.",
      "Sear beef chunks. Pour blended sauce over meat. Add remaining broth.",
      "Simmer on low 3–4 hours (or Instant Pot 45 mins) until meat falls apart.",
      "Remove meat, shred with forks. Keep liquid (Consommé) in the pot.",
      "Dip a tortilla into the red consommé grease (floating on top). Place in a hot skillet.",
      "Add cheese and shredded meat. Fold over. Fry until crispy.",
      "Serve with a cup of hot consommé for dipping.",
    ],
    tip: "Skim the red fat from the top of the consommé — that's what you dip the tortillas in",
  },
  {
    slug: "gigi-hadid-spicy-vodka-pasta",
    photo: true,
    number: 6,
    source: "codex",
    accent: "magenta",
    time: "25 min",
    serves: "2",
    tags: ["Pasta", "Viral", "Italian"],
    title: { ar: "باستا جيجي حديد الحارّة", en: "Gigi Hadid's Spicy Vodka Pasta" },
    subtitle: { ar: "صلصة وردية كريمية جعلت الفودكا مكوّناً مشهوراً.", en: "A celebrity recipe that became a staple for spicy pasta lovers." },
    ingredients: [
      "250g Pasta (Shells or Penne)",
      "¼ cup Olive oil",
      "1 small onion (diced) + 2 cloves garlic",
      "¼ cup Tomato paste",
      "½ cup Heavy cream",
      "1 tbsp Vodka (optional)",
      "1 tsp Red pepper flakes",
      "Butter, Parmesan cheese, Basil",
    ],
    steps: [
      "Cook pasta. Save ½ cup pasta water.",
      "Sauté onion and garlic in olive oil until soft.",
      "Add tomato paste; cook until caramelized (darker red).",
      "Add vodka; cook 2 minutes to evaporate alcohol.",
      "Add heavy cream and red pepper flakes. Stir into a sauce.",
      "Add cooked pasta, pasta water, and a knob of butter. Stir vigorously.",
      "Finish with parmesan and basil.",
    ],
    tip: "Caramelizing the tomato paste is the secret — don't skip that step",
  },
  {
    slug: "emily-mariko-salmon-rice-bowl",
    photo: true,
    number: 3,
    source: "codex",
    accent: "orange",
    time: "15 min",
    serves: "1",
    tags: ["Seafood", "Quick", "Japanese", "Dinner"],
    title: { ar: "بول السلمون والأرز", en: "Emily Mariko's Salmon Rice Bowl" },
    subtitle: { ar: "بقايا السلمون والأرز تتحوّل إلى وجبة كاملة.", en: "Famous for the 'ice cube hack' to reheat rice without drying it out." },
    ingredients: [
      "Leftover cooked salmon",
      "Leftover white rice",
      "1 Ice cube",
      "Soy sauce, Sriracha",
      "Kewpie Mayo (Japanese mayo)",
      "Sliced Avocado",
      "Roasted Seaweed snacks (Nori)",
    ],
    steps: [
      "Place salmon on a plate and flake it with a fork.",
      "Add cold rice on top. Place an ice cube in the center.",
      "Cover with parchment paper. Microwave for 2 minutes.",
      "Remove remaining ice cube.",
      "Drizzle soy sauce, sriracha, and Kewpie mayo. Mix well.",
      "Serve with avocado slices; eat by wrapping in crispy seaweed.",
    ],
    tip: "The ice cube creates steam that rehydrates the rice without making it soggy",
  },
  {
    slug: "green-goddess-salad",
    photo: true,
    number: 4,
    source: "codex",
    accent: "green",
    time: "20 min",
    serves: "4",
    tags: ["Salad", "Vegetarian", "American"],
    title: { ar: "سلطة الإلهة الخضراء", en: "Green Goddess Salad" },
    subtitle: { ar: "سلطة مفرومة ناعماً بصلصة خضراء كثيفة.", en: "A viral vegan salad eaten like a dip with tortilla chips." },
    ingredients: [
      "Green cabbage (finely diced)",
      "Cucumber (diced)",
      "Chives, Green onions",
      "Dressing: 1 cup Spinach, 1 cup Basil",
      "2 cloves Garlic, 1 Shallot",
      "Juice of 2 Lemons, ¼ cup Olive oil",
      "¼ cup Cashews, 1/3 cup Nutritional yeast, Salt, Rice vinegar",
    ],
    steps: [
      "Chop cabbage, cucumber, chives, and green onions very small.",
      "Place all dressing ingredients into a blender. Blend until smooth.",
      "Pour dressing over vegetables and mix well.",
      "Serve immediately. Eat by scooping with corn tortilla chips like a dip.",
    ],
    tip: "Dice the veggies as small as possible — almost confetti-size — for the best texture",
  },
  {
    slug: "sushi-bake",
    photo: true,
    number: 17,
    source: "codex",
    accent: "orange",
    time: "40 min",
    serves: "6",
    tags: ["Seafood", "Party", "Japanese", "Dinner"],
    title: { ar: "السوشي المخبوز", en: "Sushi Bake" },
    subtitle: { ar: "كل نكهات رول السوشي في صينية واحدة تُقدَّم ساخنة.", en: "A deconstructed sushi roll baked in a casserole dish." },
    ingredients: [
      "3 cups Sushi rice (cooked and seasoned)",
      "500g Imitation Crab or Cooked Salmon",
      "½ cup Kewpie Mayo",
      "½ cup Cream cheese (softened)",
      "Furikake seasoning",
      "Sriracha",
      "Nori sheets for serving",
    ],
    steps: [
      "Preheat oven to 400°F (200°C).",
      "Press cooked rice into the bottom of a baking dish. Sprinkle with Furikake.",
      "Mix crab/salmon, mayo, and cream cheese.",
      "Spread mixture evenly over rice layer.",
      "Drizzle Sriracha and extra mayo on top.",
      "Bake 10–15 minutes until bubbly and slightly browned.",
      "Serve by scooping onto a small sheet of seaweed like a taco.",
    ],
    tip: "Toast the Furikake layer briefly before adding the topping for extra depth",
  },
  {
    slug: "smashed-potatoes",
    photo: true,
    number: 15,
    source: "codex",
    accent: "gold",
    time: "60 min",
    serves: "4",
    tags: ["Sides", "Potato"],
    title: { ar: "البطاطا المهروسة المقرمشة", en: "Smashed Potatoes" },
    subtitle: { ar: "مسلوقة ثم مهروسة ثم محمّرة — أقصى قرمشة ممكنة.", en: "The crispiest way to eat potatoes." },
    ingredients: [
      "Small baby potatoes (skin on)",
      "Olive oil",
      "Melted butter",
      "Garlic powder, Rosemary, Salt, Pepper",
    ],
    steps: [
      "Boil potatoes in salted water until fork-tender (15–20 mins). Drain and steam dry.",
      "Preheat oven to 425°F (220°C).",
      "Place potatoes on a parchment-lined baking sheet.",
      "Press down on each potato with a glass to smash flat (keep in one piece).",
      "Brush generously with olive oil, melted butter, and spices.",
      "Bake 30–40 minutes until deep golden brown and super crispy.",
    ],
    tip: "Letting the potatoes steam-dry after boiling is key to maximum crispiness",
  },
  {
    slug: "bang-bang-shrimp",
    photo: true,
    number: 57,
    source: "codex",
    accent: "magenta",
    time: "25 min",
    serves: "4",
    tags: ["Seafood", "Appetizer", "American"],
    title: { ar: "روبيان بانغ بانغ", en: "Bang Bang Shrimp" },
    subtitle: { ar: "روبيان مقرمش بصلصة حلوة حارّة.", en: "Crispy shrimp tossed in a sweet and spicy creamy sauce." },
    ingredients: [
      "250g Shrimp (peeled and deveined)",
      "½ cup Cornstarch",
      "Oil for frying",
      "Bang Bang Sauce: ¼ cup Mayonnaise",
      "2 tbsp Sweet Thai Chili Sauce",
      "1 tsp Sriracha",
    ],
    steps: [
      "Mix the sauce ingredients in a large bowl. Set aside.",
      "Coat shrimp thoroughly in cornstarch. Shake off excess.",
      "Heat oil in a pan. Fry shrimp 2–3 minutes until golden and crispy.",
      "Drain on paper towel for 1 minute.",
      "Toss hot shrimp in sauce bowl until fully coated.",
      "Serve immediately, garnished with green onions.",
    ],
    tip: "Drain the shrimp on paper towels first — wet shrimp makes the sauce runny",
  },
  {
    slug: "dalgona-coffee",
    photo: true,
    number: 11,
    source: "codex",
    accent: "gold",
    time: "10 min",
    serves: "1",
    tags: ["Drinks", "Coffee", "Korean"],
    title: { ar: "قهوة الدالغونا المخفوقة", en: "Dalgona Coffee (Whipped Coffee)" },
    subtitle: { ar: "قهوة مخفوقة حتى تصبح كريمة فوق الحليب البارد.", en: "The viral 'quarantine drink' that started it all in 2020." },
    ingredients: [
      "2 tbsp Instant coffee (must be instant)",
      "2 tbsp Granulated sugar",
      "2 tbsp Hot water",
      "Milk (cold or hot)",
      "Ice cubes",
    ],
    steps: [
      "Combine instant coffee, sugar, and hot water in a bowl (1:1:1 ratio).",
      "Whip vigorously with a hand mixer for 2–5 minutes.",
      "Whip until light brown, fluffy, stiff foam forms (like meringue).",
      "Fill a glass with ice and milk (¾ full).",
      "Spoon the whipped coffee foam on top.",
      "Mix with a straw as you drink.",
    ],
    tip: "Only instant coffee works — ground beans won't whip up",
  },
  {
    slug: "crinkle-cake",
    photo: true,
    number: 113,
    source: "codex",
    accent: "gold",
    time: "60 min",
    serves: "8",
    tags: ["Dessert", "Middle Eastern"],
    title: { ar: "كرينكل كيك — حلى الكنافة المجعّدة", en: "Crinkle Cake (Muakacha)" },
    subtitle: {
      ar: "حلى الرقائق المجعّدة الذي اجتاح المطابخ العربية — قشرة مقرمشة وقلب كاسترد.",
      en: "The Middle Eastern viral sensation that turns scrunching phyllo dough into an art form.",
    },
    ingredients: [
      "1 package Phyllo dough (thawed)",
      "1 cup Unsalted butter (melted)",
      "1 cup Milk",
      "2 Eggs",
      "½ cup Sugar",
      "1 tsp Vanilla extract",
      "Simple syrup: 1 cup Sugar, ½ cup Water, squeeze of Lemon (boiled until slightly thickened)",
    ],
    steps: [
      "Preheat oven to 350°F (175°C). Grease a 9x13 inch baking dish.",
      "Take two sheets of phyllo at a time and scrunch them up like an accordion. Place into the dish. Repeat until the dish is tightly packed.",
      "Bake dry for 10 minutes to crisp the edges.",
      "Remove from oven, pour the melted butter evenly over the top, and bake for another 10 minutes.",
      "Whisk the milk, eggs, sugar, and vanilla into a custard. Pour evenly over the baked phyllo.",
      "Bake for a final 15–20 minutes until the top is golden and the custard is set.",
      "Pour the cold simple syrup over the hot cake immediately after taking it out of the oven.",
    ],
    tip: "Cold syrup on a hot cake — that temperature gap is what keeps the top crisp",
  },
  {
    slug: "french-onion-grilled-cheese",
    photo: true,
    number: 116,
    source: "codex",
    accent: "dark",
    time: "40 min",
    serves: "1",
    tags: ["Sandwich", "Comfort"],
    title: { ar: "ساندويش الجبنة بالبصل الفرنسي", en: "French Onion Grilled Cheese" },
    subtitle: {
      ar: "شوربة البصل الفرنسية داخل ساندويش محمّر بالزبدة.",
      en: "Why eat soup when you can put those jammy onions inside a buttery sandwich?",
    },
    ingredients: [
      "2 thick slices Sourdough bread",
      "1 large Yellow onion (thinly sliced)",
      "2 tbsp Butter + 1 tbsp Olive oil",
      "½ cup Gruyère cheese (shredded)",
      "½ cup Mozzarella cheese (shredded)",
      "Fresh thyme",
      "Splash of Beef broth or Balsamic vinegar (for deglazing)",
    ],
    steps: [
      "Melt 1 tbsp butter and the olive oil in a skillet. Add the sliced onions and a pinch of salt. Cook low and slow for 25–30 minutes until deeply caramelized.",
      "Add a splash of broth or balsamic vinegar to deglaze the pan. Stir in fresh thyme. Set the onions aside.",
      "Clean the skillet. Butter one side of each slice of sourdough.",
      "Place one slice in the skillet butter side down. Layer with mozzarella, the warm onions, then the gruyère. Top with the second slice, butter side up.",
      "Grill over medium-low heat until the bottom is golden. Flip carefully and cook until the cheese is completely melted.",
    ],
    tip: "Low and slow on the onions — rushing them gives you brown, not sweet",
  },
  {
    slug: "whipped-feta-hot-honey-dip",
    photo: true,
    number: 119,
    source: "codex",
    accent: "green",
    time: "5 min",
    serves: "4",
    tags: ["Appetizer", "Quick"],
    title: { ar: "غموس الفيتا المخفوقة بالعسل الحار", en: "Whipped Feta & Hot Honey Dip" },
    subtitle: {
      ar: "مقبّلات في خمس دقائق توازن المالح والكريمي والحار والحلو.",
      en: "The ultimate 5-minute appetizer that balances salty, creamy, spicy, and sweet.",
    },
    ingredients: [
      "1 block (200g) Feta cheese",
      "½ cup Plain Greek yogurt (full fat)",
      "2 tbsp Olive oil",
      "1 clove Garlic",
      "3 tbsp Hot honey (honey infused with chili flakes)",
      "2 tbsp Pistachios (crushed)",
      "Warm pita bread (for serving)",
    ],
    steps: [
      "Place the feta, Greek yogurt, olive oil, and garlic clove into a food processor or blender.",
      "Blend on high for 2–3 minutes, scraping down the sides, until completely light, fluffy, and smooth.",
      "Spoon onto a serving plate. Use the back of a spoon to create swirls and dips.",
      "Drizzle the hot honey generously over the swirls.",
      "Garnish with crushed pistachios. Serve immediately with warm pita or crackers.",
    ],
    tip: "Blend a full three minutes — anything less stays grainy instead of whipped",
  },
  {
    slug: "korean-cream-cheese-garlic-bread",
    photo: true,
    number: 121,
    source: "codex",
    accent: "orange",
    time: "35 min",
    serves: "4",
    tags: ["Bread", "Viral", "Korean"],
    title: { ar: "خبز الثوم الكوري بالجبنة الكريمية", en: "Korean Cream Cheese Garlic Bread" },
    subtitle: {
      ar: "أكلة الشارع الكورية التي تجمع الحلو والمالح والثوم بجرأة.",
      en: "The viral Asian street food that is equal parts sweet, savory, and aggressively garlicky.",
    },
    ingredients: [
      "4 Round bread rolls (brioche or soft dinner rolls)",
      "Cream cheese filling: 1 cup Cream cheese (softened), 2 tbsp Sugar, ¼ cup Heavy cream",
      "Garlic butter dip: ½ cup Butter (melted), ¼ cup Milk, 2 tbsp Honey, 3 tbsp Garlic (minced), 1 Egg, 2 tbsp Fresh parsley (chopped)",
    ],
    steps: [
      "Preheat oven to 350°F (175°C). Line a baking sheet with parchment paper.",
      "Cut each roll into 6 wedges, almost all the way down, leaving the base intact so it opens like a flower.",
      "Whip the cream cheese, sugar, and heavy cream until smooth. Transfer to a piping bag.",
      "Pipe the cream cheese generously between every single slice.",
      "Whisk all the garlic butter dip ingredients together in a separate bowl.",
      "Dunk each stuffed roll completely into the garlic butter, making sure it gets inside the cuts.",
      "Bake for 15–20 minutes until the edges are crispy and the cream cheese is gooey.",
    ],
    tip: "Leave the base uncut — it is the only thing holding the flower together",
  },
  {
    slug: "viral-cucumber-salad",
    photo: true,
    number: 220,
    source: "codex",
    accent: "green",
    time: "10 min",
    serves: "1",
    tags: ["Salad", "Viral"],
    title: { ar: "سلطة الخيار الفايرال", en: "The Logan Moffitt Viral Cucumber Salad" },
    subtitle: {
      ar: "خيار مقطّع رفيعاً يُرجّ في علبة مع صلصة آسيوية — مقرمش ومنعش.",
      en: "Paper-thin cucumber shaken in a container with a savory Asian dressing — crisp, hydrating, umami.",
    },
    ingredients: [
      "1 English cucumber (sliced paper-thin, preferably with a mandoline)",
      "1 tbsp Soy sauce (or Tamari)",
      "1 tsp Toasted sesame oil",
      "1 clove Garlic (grated)",
      "1 tsp Toasted sesame seeds",
      "½ tsp Rice vinegar",
      "A pinch of MSG (optional)",
    ],
    steps: [
      "Slice the entire cucumber into a container with a tight-fitting lid.",
      "Add the soy sauce, sesame oil, grated garlic, rice vinegar, sesame seeds, and the MSG if using.",
      "Put the lid on and shake vigorously for 15–20 seconds, until the slices are bruised and coated.",
      "Eat straight out of the container with chopsticks.",
    ],
    tip: "A mandoline is the whole recipe — thick slices will not take the dressing the same way",
  },
  {
    slug: "beet-and-pickled-ginger",
    photo: true,
    number: 0,
    source: "sauces",
    accent: "magenta",
    time: "20 min",
    serves: "≈150 ml",
    tags: ["Sauce", "Plating"],
    title: { ar: "صلصة البنجر والزنجبيل المخلّل", en: "Beet & Pickled Ginger" },
    subtitle: { ar: "ماجنتا · حادّة، حلوة، وردي كهربائي", en: "MAGENTA · SHARP, SWEET, ELECTRIC PINK" },
    ingredients: [
      "1 medium beetroot, cooked and peeled",
      "40 g pickled ginger, drained",
      "2 tbsp rice vinegar",
      "1 tbsp water",
      "1 tsp sugar",
      "Pinch of fine salt",
    ],
    steps: [
      "Cut the cooked beetroot into rough chunks. Cold beetroot blends smoother than warm.",
      "Blend the beetroot, pickled ginger, vinegar and sugar until completely smooth. Take longer than feels necessary — any fibre left will clog the spoon.",
      "Pass the puree through a fine sieve, pressing with the back of a ladle. Discard the pulp.",
      "Loosen with water one teaspoon at a time until it falls from a spoon in a thin unbroken thread. Too thick and it lands as a blob; too thin and it runs.",
      "Season with salt. Chill before use — cold sauce holds its edge on the plate.",
    ],
    tip: "Beetroot stains. Wear gloves and keep it away from the gold rim.",
  },
  {
    slug: "herb-and-chlorophyll",
    photo: true,
    number: 0,
    source: "sauces",
    accent: "green",
    time: "20 min",
    serves: "≈150 ml",
    tags: ["Sauce", "Plating"],
    title: { ar: "صلصة الأعشاب والكلوروفيل", en: "Herb & Chlorophyll" },
    subtitle: { ar: "أخضر زمرّدي · عشبي، ساطع، أخضر غير طبيعي", en: "EMERALD GREEN · GRASSY, BRIGHT, UNNATURALLY GREEN" },
    ingredients: [
      "60 g flat parsley leaves, no stems",
      "20 g basil leaves",
      "80 ml neutral oil",
      "1 tbsp water",
      "Pinch of fine salt",
      "Ice water, for shocking",
    ],
    steps: [
      "Blanch the herbs in boiling salted water for exactly fifteen seconds. Any longer and the colour dulls.",
      "Lift them straight into ice water. This is the step that keeps the green. Skip it and you get army khaki.",
      "Squeeze the herbs completely dry between paper towel. Water left in them will split the sauce.",
      "Blend the herbs with the oil at full speed for two minutes, until the oil is vivid green and warm to the touch.",
      "Strain through a fine sieve lined with muslin. Let it drip; do not press, or you push through fibre and lose the clarity.",
      "Season with salt and thin with water only if it needs it.",
    ],
    tip: "Chlorophyll degrades in light. Store in a sealed container in the dark and use within two days.",
  },
  {
    slug: "aged-balsamic-and-date",
    photo: true,
    number: 0,
    source: "sauces",
    accent: "dark",
    time: "20 min",
    serves: "≈150 ml",
    tags: ["Sauce", "Plating"],
    title: { ar: "صلصة البلسمك المعتّق والتمر", en: "Aged Balsamic & Date" },
    subtitle: { ar: "بنّي شبه أسود · داكنة، حلوة، كاللّك", en: "NEAR-BLACK BROWN · DARK, SWEET, ALMOST LACQUER" },
    ingredients: [
      "150 ml balsamic vinegar",
      "4 medjool dates, pitted",
      "1 tbsp date molasses",
      "1 star anise",
      "Pinch of fine salt",
    ],
    steps: [
      "Soak the dates in warm water for twenty minutes, then drain.",
      "Reduce the balsamic with the star anise over low heat until it coats the back of a spoon. Low heat only — boiled balsamic turns bitter and sharp.",
      "Remove the star anise. Blend the reduction with the softened dates and the molasses until glossy and completely smooth.",
      "Pass through a fine sieve. Date skin will not break down fully and will show on white porcelain.",
      "Season with salt. Cool to room temperature before use; it thickens noticeably as it cools.",
    ],
    tip: "This is the heaviest of the five. It reads almost black on the plate and should always land last.",
  },];

export const getRecipe = (slug?: string) => recipes.find((r) => r.slug === slug);

/**
 * Plate photos are imported rather than served from /public so the build
 * fingerprints each file. Replacing a photo then changes its URL, and
 * browsers pick the new one up instead of showing a cached copy.
 */
const photoUrls = import.meta.glob("../assets/recipes/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const photoBySlug = Object.fromEntries(
  Object.entries(photoUrls).map(([path, url]) => [path.split("/").pop()!.replace(/\.jpg$/, ""), url]),
);

/** URL of a recipe's plate photo, or null when it has none yet. */
export const recipePhoto = (recipe: Recipe) => (recipe.photo ? photoBySlug[recipe.slug] ?? null : null);

/** Every tag in use, for the filter row. */
export const recipeTags = [...new Set(recipes.flatMap((r) => r.tags))].sort();

/**
 * Ingredients, method and tip in the reader's language. The book is English;
 * the Arabic lives in recipes.ar.ts and falls back to English if a recipe
 * has not been translated yet.
 * المكوّنات والطريقة والنصيحة بلغة القارئ.
 */
export const recipeText = (recipe: Recipe, lang: Lang) =>
  (lang === "ar" && recipesAr[recipe.slug]) || {
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    tip: recipe.tip,
  };
