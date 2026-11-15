# Beef Shawarma, the Oven Tower: the edit (2026-11-15)
Media 06bf6e4e-8b67-4a84-8534-9e74d7ab8ff8, 1080x1920 H.264 24 fps, 15.75 s, -14.8 LUFS, -1.3 dBTP.
https://d2ol7oe51mr4n9.cloudfront.net/user_2x0tp0odsOo92J2AkNG46XQD8Gw/06bf6e4e-8b67-4a84-8534-9e74d7ab8ff8.mp4
Source: job 53be7e0c (Seedance 2.5 omni reference, 20 s, 720p, the owner's unlimited). Build: `edit_shawarma.py`, cards
`cards.json` (overlay.mjs). The owner: «طبق زي البستاني بالهووك»: the Dubai way, his line as the hook.

Take read (frames every 0.25 s): every step in order (the cleaver in the sirloin, the bowl and spices, the lemon and
yogurt, the toss, the tower on the skewer in the onion, the oven, the roast through the glass, the tray out with steam,
the knife shaving the tower, the griddle, the bread, toum, tomato, pickles, onion, beef, the roll, the press, the cut
face, the bite). Weak points: the slices thicker than written; the lenses brown-tinted at the end; the last 0.6 s only
chewing (cut). Raw: DEAD 3, SLOW 2, QUIET 2, -21.8 LUFS.

| Output (s) | Shot | Speed | Card |
|---|---|---|---|
| 0.00-1.42 | the cleaver, two strikes, his face | 1.0, push-in 1.06 | «حبيبي، ليش ما عم بتعملي شاورما لحمة؟» 0-2.75 (y 890) |
| 1.42-2.25 | slices and spices, top-down | 1.5 | |
| 2.25-2.75 | the lemon, yogurt, garlic | 1.2 | |
| 2.75-4.08 | the toss | 1.0, push-in 1.05, -4 dB | «برج بالفرن، بلا سيخ دوّار» 2.75-5.75 |
| 4.08-5.00 | the tower | 1.6 | |
| 5.00-5.75 | the oven | 1.1 | |
| 5.75-6.46 | roasting through the glass | 2.0, push-in 1.08, -3 dB | «٢٢٠ درجة وبتطلع مقرمشة» 5.75-9.17 |
| 6.46-7.42 | out of the oven, steam | 1.4 | |
| 7.42-9.17 | the shave | 1.05, push-in 1.06 | |
| 9.17-10.12 | the sear | 1.2 | «اسمع القرمشة 🔊» 9.17-10.96 |
| 10.12-10.96 | the bread | 1.0 | |
| 10.96-12.00 | toum and the filling, top-down | 1.3 | «اكبسها عالصاج لحتى تقرمش» 10.96-13.67 |
| 12.00-12.92 | the roll | 1.2 | |
| 12.92-13.67 | the press | 2.0, push-in 1.08 | |
| 13.67-14.67 | the cut | 1.0, +6 dB: the loudest (75.0 dB at 14.0 s) | «اكتب «شاورما» 👇» 13.67-end (y 300) |
| 14.67-15.75 | his bite | 1.0, push-in 1.08 | |
pp.py: DEAD 0, SLOW 0, LONG 0, QUIET 0. v1 had the toss loudest (77.6 dB) and the cut at 73: fixed after the compressors.
Cards inside x 291-787.

## v2 (2026-11-15): the v2 take, a card every 2 s with an animated entrance
Media 17b852b6-7b27-44b8-8f9c-595170710a51, 1080x1920, 14.5 s, -14.2 LUFS, -1.5 dBTP (true peak, oversampled limiter).
https://d2ol7oe51mr4n9.cloudfront.net/user_2x0tp0odsOo92J2AkNG46XQD8Gw/17b852b6-7b27-44b8-8f9c-595170710a51.mp4
Source: job 051f9407 (prompts/w4-beef-shawarma-20s-v2.txt). Build: `mk_v2.py` writes `edit_shawarma_v2.py` and `cards_v2.json`.
Take read (frames every 0.25 s): every step in order; the raw steps end at 3.0 s in the edit. Errors: raw red beef thrown
on the griddle at 8.17-9.13 s (the owner's catch; cut, the sear starts browned at frame 220); a 1.5 s still hold with the
knife raised (cut to 0.5 s at 1.5x with a push-in); the cut is a knife slice, not the cleaver; the halves show a dense
patty-like meat layer; brown-tinted lenses in the bite; the browned meat reads as fine crumbles. Raw DEAD 4, SLOW 3,
QUIET 6; edit DEAD 0, SLOW 0, LONG 0, QUIET 0; the cut the loudest (76.7 dB at 11.0 s).
Cards (each enters in 4 frames: fade in and a 28 px slide up, ease-out): «حبيبي، ليش ما عم بتعملي شاورما لحمة؟» 0-2,
«استنى القرمشة بالآخر 🔊» 2-4, «برج بالفرن، بلا سيخ دوّار» 4-6, «٢٢٠ درجة وبتطلع مقرمشة» 6-8, «٥١ غ بروتين بسندويشة
وحدة» 8-10, «جاهز؟ 🔪» 10-11, «اكتب «شاورما» 👇» 11-end at the top. Inside x 291-787.
Caption: the v1 package (week4/beef-shawarma-*); checked against ig-human's slop lexicon (no hits), no em dash, 4 hashtags,
line 1 inside the first 125 characters.

## The completion cut (2026-11-15; owner: «المهم والي لازم ينعمل انو نخلي المشاهد يكمل»)
Media ee93ffc5-5b8c-40c9-9ccb-afb940395fe3, 12.38 s, -14.7 LUFS, -1.4 dBTP, DEAD 0, SLOW 0, LONG 0, QUIET 0, the cut the loudest.
https://d2ol7oe51mr4n9.cloudfront.net/user_2x0tp0odsOo92J2AkNG46XQD8Gw/ee93ffc5-5b8c-40c9-9ccb-afb940395fe3.mp4
Build: `mk_completion.py` writes `edit_shawarma_completion.py` from v1. One variable against v1: the pace. The same take
(53be7e0c), the v1 cards in the same order (hook 0-3.08, «برج بالفرن» 3.08-5.54, «٢٢٠ درجة» 5.54-7.08, «اسمع القرمشة»
7.08-8.46, «اكبسها عالصاج» 8.46-10.29, keyword 10.29-end), the same sound chain. v1's 1.42 s cleaver opening kept whole;
the raw bowl 0.62 s, the toss 0.75 s (apex and slap), the raw tower 0.5 s (v1 0.92 s), every middle shot 0.5-0.75 s,
the shave 1.54 s, the cut 1.0 s, the bite 1.08 s. Post as a trial reel and compare with v1: 94 / 81 / 68% at 1-3 s,
47% at 5 s, 26% at the end.
