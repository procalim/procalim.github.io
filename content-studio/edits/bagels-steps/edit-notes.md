# 2-Ingredient Bagels, step by step (N° 019), 2026-11-19

Take: Seedance 2.5 job e22ebda2 (the owner's unlimited), prompt prompts/w4-result-first-2-ingredient-bagels-20s.txt
(v2, step by step). Edit: edit_bagel_steps.py on edits/_tools/steps_edit.py and research/edit-reference-2026-11-19.md.

## The read (scdet cuts 1.63, 4.54, 5.46, 8.42, 9.46, 10.13, 11.71, 14.38, 16.25, 18.88 s; 24 fps, 481 frames)
0-1.6 s the oven knob and the glow. 1.6-4.5 s the flour, two spoons of yogurt, the mix. 4.5-9.5 s the knead, the knife
into 4, the rope, the ring, four rings on the tray. 9.5-11.7 s the egg cracked and beaten. 11.7-14.4 s the egg wash and
the seasoning. 14.4-16.25 s the bake through the oven glass. 16.25-20 s the result in gloved hands, torn open (no face
until 18.4 s), then the bite.

## The edit
| Out | Take frames | Speed | Card |
|---|---|---|---|
| 0.00-3.20 | 390-440 the bagel torn open | 0.65 (slow motion by interpolation) | hook «بيغل من مكوّنين بس؟» / NO YEAST?, complete at frame one |
| 3.20-4.50 | 0-39 the oven | 1.25 | «الفرن على 190°» |
| 4.50-7.45 | 39-131 flour and yogurt | 1.3 | «كوب طحين + كوب زبادي يوناني» |
| 7.45-10.53 | 131-227 knead and shape | 1.3 | «4 كرات… 4 حلقات» |
| 10.53-14.65 | 227-345 the egg, the wash, the seeds | 1.25 / 1.15 | «بيضة للوجه، وسمسم فوقها» |
| 14.65-16.15 | 345-390 the bake | 1.25 | «20-25 دقيقة لحتى تدهّب» |
| 16.15-19.95 | 390-481 the result again, the bite | 1.0 | the answer (the book's chef's note) «السر: زبادي يوناني سميك» / "Watery yogurt ruins the dough."; the send «من الكتاب · الوصفة ١٩» / «ابعتها للي مفكّر البيغل بدها خميرة» |

## Result (media 5337be22)
- 19.95 s, 1080x1920, 60 fps; -17.5 LUFS, -1.0 dBTP, range 18.9 dB.
- hook_check 10/10: G; 6 words in 0-3 s; typed by 0.07 s; the answer at 16.15 of 19.95 s; no text gap; 7 onsets in
  0-3 s (0.1, 0.6, 0.9, 1.2, 1.3, 1.7, 2.6 s); a friend's mistake; safe zone ok. open3 motion 3.5 (calm).
- The slow-motion in-between frames read clean (the crust and the seeds hold their shape).
- Package: week4/bagels-2-ingredient-caption.txt, -pinned.txt, -dm-reply.txt (the book, N° 019, word for word).

## v2 (owner: «الصوت كثير غريب في البيغل ومبين مصنع»), media b5441500
- Measured: the opening's sound slowed to 0.65 with atempo played every crack twice, about 30 ms apart (the hits at
  0.60/0.63 and 0.91/0.94 s; two lines per hit in the spectrogram), and the hits' rise fell from 25.9 dB (the take) to
  21.8 dB. The 7 onsets v1 counted in 0-3 s included those doubles.
- Fixed in edits/_tools/steps_edit.py (respace): a speed change now moves each hit to its new time and plays it at its
  own natural speed (cut at the next hit, never stretched); slower sections get the room's own quietest 0.2 s looped
  under them. The picture is unchanged (reuse of cut60.mkv).
- Result: one line per hit, rise 28.6 dB; 5 onsets in 0-3 s (0.1, 0.6, 0.9, 1.3, 1.6 s), hook_check 9/10 (the honest
  count); -17.3 LUFS, -0.9 dBTP, range 19.1 dB.
- The cookie dough and the salad got the same fix for their sped-up sections.
