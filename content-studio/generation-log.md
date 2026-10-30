# Generation log

Read this before every generation check. Every error that ever came out of a generation is a check line below;
a new prompt must pass all of them. After every generation, success or not, add a row to the table and, for a
new kind of error, a new check line.

## Checks learned from past generations
1. Food shape, size and count written into every shot and repeated in the food lock; wrong shapes in AVOID
   (Gochujang: "chunks" once while the reference had strips, the chicken changed shape in every shot).
2. A reference image of the finished food is limited to the shot it belongs to (Kunafa part 2: @Image3 applied
   everywhere put glazed strips into the raw marinade).
3. Fillings named and made visible in the reveal shot ("many macaroni tubes visible in both halves"); QA the
   break shot (mac & cheese: plain cheese inside).
4. Multi-clip: every clip after the first gets a frame of the previous clip's food; QA the food across clips
   (Big Mac tacos: thin beef in two clips, a thick patty in the rest).
5. The finished dish never opens the video for more than 1.5 s (fettuccine: calm result-first opening, half the
   viewers gone by second 3).
6. Check the last second of the generation for silence before using it anywhere (giant pancake: silent tail).
7. Physics a viewer will call out: hot trays and pans only through a towel, a stuffed patty smashed thin will
   leak, counts in the food lock match the counts in the shots, the loop seam shows the same state as frame
   one (week 1 review, before generation).
8. No more than about 2 actions in one second of one shot, or the model skips a book step (week 1 review).
9. Halal includes extracts and sauces: vanilla extract contains alcohol, mirin is out (week 1 review).
10. A food broken or pulled apart with no melted cheese in the recipe: write "breaks cleanly, no strings, no
    threads, no cheese pull" (hidden veg cover: the cauliflower wing stretched like mozzarella).
11. Stills with a person: the model ignores "top third empty"; give the head position as a percent ("the top
    of his head at 40% of the frame height") so the cover text has room (hidden veg cover).

## Results
| Date | Reel | Model, settings, credits | Came out right | Errors (time, frame) | Cause | Prompt change | 24 h: skip, avg watch, end %, shares/1K, saves/1K |
|---|---|---|---|---|---|---|---|
| 2026-10-25 | Stuffed sweet potato patties (posted 27 Oct 22:30) | Genjutsu Lite, motion from Rima fit food reel, edited to 11.58 s | Shape and filling held, cheese pull, prepublish.py none, -14.2 LUFS | Last 2 s of the generation (dip and bite) unusable, cut | Generation ends badly | none logged at the time | 21.5 h: 23K views, 15K reach, skip 44.0%, avg watch 7.56 s (65% of length), end ~31%, shares 8.7/1K reach, saves 13.9/1K, 1 comment, 99.4% non-followers; account day: 40 profile visits, 0 link taps |
| 2026-10-30 | Carousel: 5 hidden vegetables (6 stills) | Nano Banana Pro, 2K, came back 1792x2400 (3:4), 12 credits | B to F: shapes as the book, fillings visible, gloves, dark top for text | A (cover): the cauliflower stretched in white strings; his head at the top edge, no room for the title | Break not locked; headroom asked as "top third" | Checks 10 and 11; A remade as an edit of itself (2 credits): clean break, head at 21%, title fits | pending |
