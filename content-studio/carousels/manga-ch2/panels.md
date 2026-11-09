# Master of the Craft, chapter 2: panel prompts for Higgsfield

Status: NOT generated. Generate only after the owner says «ولد».
On 2026-11-09 the owner chose to generate the panels himself on a free manga tool: his copy-paste prompts are in
`prompts-selfserve.md` and the reference images in `refs/`.

## Settings
- Model: `nano_banana_pro`, resolution `2k`. Cost checked on 2026-11-09: 2 credits a panel (1k costs the same).
- 7 panels = 14 credits. Keep 6 more for up to 3 redraws. Total to have: 20 credits.
- Balance on 2026-11-09: 0.22 credits, free plan.
- One `generate_image_batch` call with the 7 requests, then `jobs_wait`, then one `show_generation_by_ids`.
- The model draws no text. Arabic, English and the speech bubbles are laid over the panels by `render.mjs`.

## Reference images (role `image_references`, upload with media_upload -> PUT -> media_confirm)
1. The Master: `../manga-psych/img/verdict.jpg`, with the speech bubble cropped out before upload.
2. The three judges: `../manga-psych/img/judges.jpg`.
3. The dessert: `src/assets/recipes/crinkle-cake.jpg` (the book's own Crinkle Cake photo). Only for panels 1, 5, 6, 7.

## Shared blocks (put STYLE first and CAST second in every prompt)

STYLE:
Black-and-white Japanese manga panel in exactly the art style of the reference images: clean confident ink line art,
solid black shadows, fine grey screentone shading, high contrast, no colour at all. One single full-bleed panel: no
panel borders, no gutters, no speech bubbles, no captions, no sound-effect lettering, no text or letters of any kind,
no logo, no watermark.

CAST:
The Master (the chef in reference image 1, keep him identical): a man in his thirties, slicked-back dark hair with
faded sides, a thick dark mustache and no beard, black aviator sunglasses, white t-shirt, black apron with leather
straps and metal rivets, a thin chain necklace, black nitrile gloves.
The three judges (reference image 2, keep them identical, seated left to right): a woman with a blonde low bun,
rectangular glasses, a black turtleneck and a dark blazer; a bald Black man with a full beard in a white
double-breasted chef jacket; an older East Asian man with grey-streaked hair in a dark suit and tie.
Setting: the same dark tasting hall, solid black background, round pendant lamps, a brushed-steel counter, black menu
folders with a round emblem. Glasses of water only. No wine, no alcohol.
The dessert (reference image 3, redrawn in ink): a dark rectangular baking dish packed with crinkle cake, rows of
scrunched accordion-folded phyllo ruffles with crisp browned edges, glossy with syrup.

## Panels

### 1 `img/full.jpg` (slide 1, the cover) - aspect 3:2
Wide shot from behind the steel counter. In the background the three judges lean back in their chairs, completely
full: the older man loosens his tie with his eyes closed, the bearded chef rests a hand on his stomach and puffs his
cheeks, the woman holds up an open palm in refusal. Empty plates and crumpled napkins in front of them. In the
foreground, large and sharp, the Master's black-gloved hands slide the dish of crinkle cake across the counter toward
them, thin steam rising, speed lines along the counter. Dramatic light from one pendant lamp on the dish. Keep the
upper right corner as empty black background.

### 2 `img/eyes.jpg` (slide 2) - aspect 16:9
Extreme close-up strip of the three judges' faces side by side, from the eyebrows to the nose, eyes suddenly wide
open and fixed on something below the frame, pupils sharp, a single sweat drop on the older man's temple, a pendant
lamp reflected as a highlight in the woman's glasses. Radial focus lines from the centre. Heavy black shadows. Keep
all three faces inside the middle horizontal band of the frame.

### 3 `img/bored.jpg` (slide 3) - aspect 16:9
Medium shot of the woman judge alone at the counter. She pushes a half-eaten plate of sliced roast beef away with two
fingers, her fork laid down, her chin on her other hand, eyes half closed, bored. Flat grey screentone behind her for
the dull mood. Keep the upper left corner as empty background.

### 4 `img/courses.jpg` (slide 4) - aspect 16:9
High-angle view of the steel counter. Four small plates in a row, each a clearly different dish: a bowl of soup, a
green salad, a piece of grilled fish with lemon, a small mound of rice with nuts. The Master's black-gloved hand sets
down the fourth plate with precision, a clean cloth over his forearm. Hard light from above, strong reflections on
the steel, the plates evenly spaced across the middle band of the frame.

### 5 `img/door.jpg` (slide 5) - aspect 16:9
Surreal symbolic panel. A side-profile silhouette of the bearded judge's head in solid black against a white
background. Inside the head a small heavy vault door swings open and bright light rays burst out of it. From the
right, a spoon carrying one bite of crinkle cake moves toward his mouth, sparkles around the bite. Bold graphic
composition, strong black and white contrast, radiating lines.

### 6 `img/bliss.jpg` (slide 6) - aspect 3:2
Medium wide shot of the three judges eating the crinkle cake. The woman has her eyes closed with a fork at her lips,
the bearded chef holds a forkful up and smiles wide with a tear at the corner of his eye, the older man bends over
his plate and eats fast. The baking dish in the centre of the counter is almost empty, crumbs and syrup left. Sparkle
screentone and soft burst highlights behind them, the mood bright. Keep the upper right corner as empty background.

### 7 `img/smirk.jpg` (slide 8) - aspect 16:9
Low-angle medium shot of the Master standing behind the counter, arms crossed, a small confident smirk under his
mustache, the pendant lamps reflected in his aviator sunglasses. On the counter in front of him the empty baking dish
with a few crumbs. Solid black background, the smoker and its gauge faintly visible. Keep his head and arms inside
the middle horizontal band of the frame, because the top and bottom fifth get cropped. Keep the right third behind
him as empty black background.

## After generation (the skill's post-generation rule)
1. Look at every panel against its prompt: the Master and the judges match chapter 1, no drawn text, no alcohol, the
   dessert reads as crinkle cake. Redraw only the panels that fail.
2. Save the panels to `img/` under the names above and run `node render.mjs`.
3. Move the speech bubbles in `render.mjs` to the empty corner of each panel and point each tail at its speaker.
4. Check with ig-carousel, ig-human and caption.py, then write the alt text and the stories.
