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
12. A coating made from the recipe's own paste: repeat its colour in every shot it appears ("beige-pink strands,
    the same colour as the paste on the plate") and AVOID "pale yellow strands, kataifi, vermicelli, shredded
    phyllo, pale pastry dough" (Kibbeh Nests: the shell turned cream like dough and the ricer strands came out like kataifi).
13. A new shape that looks like a common object gets a pose and a proportion, and that object is named in AVOID
    ("lying flat on its side, about twice as long as wide, slightly curved like a pistachio kernel, never
    standing upright, no pointed tip"). Check the finished-shape frame against a real photo of the shape
    (Dubai pistachios: "domed oval" came out as 3 standing chocolate eggs although AVOID said "eggs").
14. "Deep golden" alone drifts to bright orange: name the colour by an object and say what it is not ("amber
    brown like toasted hazelnut skin, not orange"); "short pieces" needs "chopped like coarse crumbs, no long
    strands" (Dubai pistachios: orange, long vermicelli strands).

## Results
| Date | Reel | Model, settings, credits | Came out right | Errors (time, frame) | Cause | Prompt change | 24 h: skip, avg watch, end %, shares/1K, saves/1K |
|---|---|---|---|---|---|---|---|
| 2026-10-25 | Stuffed sweet potato patties (posted 27 Oct 22:30) | Genjutsu Lite, motion from Rima fit food reel, edited to 11.58 s | Shape and filling held, cheese pull, prepublish.py none, -14.2 LUFS | Last 2 s of the generation (dip and bite) unusable, cut | Generation ends badly | none logged at the time | 21.5 h: 23K views, 15K reach, skip 44.0%, avg watch 7.56 s (65% of length), end ~31%, shares 8.7/1K reach, saves 13.9/1K, 1 comment, 99.4% non-followers; account day: 40 profile visits, 0 link taps |
| 2026-10-30 | Carousel: 5 hidden vegetables (6 stills) | Nano Banana Pro, 2K, came back 1792x2400 (3:4), 12 credits | B to F: shapes as the book, fillings visible, gloves, dark top for text | A (cover): the cauliflower stretched in white strings; his head at the top edge, no room for the title | Break not locked; headroom asked as "top third" | Checks 10 and 11; A remade as an edit of itself (2 credits): clean break, head at 21%, title fits | pending |
| 2026-11-01 | Kibbeh Nests (sweet potato motion) | Seedance 2.5, 15.5 s 1080p, sent in 2 parts; edited to 10.33 s | Every book step in order, processor, oil drop, ricer, 3 nests in the oil, knife, pull-apart with lamb and pine nuts visible; prepublish.py none after the fixes, -14.7 LUFS, peak -1.1 | Shell pink on the plate (1.2 s) but cream like dough from 4.0 s; ricer strands pale yellow like kataifi (7.6-9.3 s); 4 nests on the board (9.3-10.5 s) then 3 in the oil; reveal crackle weak (src p2 4.0 s) | Colour of the paste not repeated per shot; count only in the lock | Check 12; board shot cut; knife crunch (p2 3.0 s) laid on the reveal; spoon and fold +8 dB | pending |
| 2026-11-01 (1 h 12 min) | Kibbeh Nests, first read | (see row above) | skip 39.0% (below his typical), comment rate higher | 1,320 views (IG 904, FB 416), 499 viewers, avg 5.82 s of 10.3 s, 0 shares, 2 saves, 0 follows; retention ~90% at 1 s, ~65% at 2.3 s, ~50% at 3.3 s, ~30% from 5 s to the end; Reels tab 75.3% | Same 1-3.5 s drop as the sweet potato (processor, plate, raw meat after the flash); question hook (October questions sit at 0.3-0.8x) | Next reels: statement hooks from the tested family (science rule or 'X is the mistake' with a number), plan-week-2026-11-02.md | 24 h pending |
| 2026-11-05 | Dubai Chocolate Pistachios (format A, 15 s) | Seedance 2.5 omni_reference, 15 s 1080p, audio, Chef-Ahmad element photo as image reference, 240 credits (job 311eee66) | Face and aviators from frame one already pouring; 3 cavities, 3 shells, 3 pieces everywhere; gloves in every hand shot; book steps in order; pistachio cream green, tahini beige; the snap opens cleanly with a green center, golden kataifi and crumbs, no strings; ends on him holding the halves; no text or logos; -15.4 LUFS; near silence 11.0-11.75 s before the snap | Shape 11.4-12 s: 3 smooth chocolate EGGS standing upright, pointed top, no seam ridge (AVOID had eggs). Kataifi 5.4-7.4 s: bright orange long strands, not deep golden-brown short pieces. Sound: the pour at 0-2.8 s is quiet (-34 to -43 dB RMS); the snap at 12.0 s (-14 dB) is not the loudest (landing 10.75 s -12, sizzle 5.0 s -13). Last second -40 dB mean, not silent | "Domed oval" plus a teardrop cavity reads as an egg; "deep golden" drifts to orange; "short pieces" ignored | Checks 13 and 14 | |
