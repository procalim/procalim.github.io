# Opening and sound audit: every measurable reel against its skip rate (2026-11-17)

Owner: «الفكرة مش بالوصفة في بداية المحتوى والصوت ... الأبل باي والشيبس والكرنكل نسبة السكيب ضعيفة وهون الحل».
Organic only. No guesses: every number below is measured.

## Method
- Instagram Graph API (Composio, INSTAGRAM_GET_IG_USER_MEDIA with insights): `reels_skip_rate`,
  `ig_reels_avg_watch_time`, views, reach, shares for all 96 reels (June to 17 Nov 2026).
- 69 reels have a downloadable `media_url` (the 27 without one carry licensed audio, the Crinkle Cake among them);
  68 decoded. For each file:
  - loudness: ffmpeg `ebur128`, integrated LUFS;
  - dynamic range: 0.25 s RMS windows, 95th percentile minus 10th percentile (dB): how far the quiet room sits under
    the hits;
  - cuts: ffmpeg `scdet` threshold 12, counted in 0-3 s and per second over the reel.
- Spearman rank correlation against skip rate and average watch time.

## Skip rate by month
| Month | Reels | Median skip | Median avg watch | Median views |
|---|---|---|---|---|
| 2026-08 | 20 | 29.4% | 8.7 s | 5,747 |
| 2026-09 | 26 | 34.1% | 8.5 s | 4,556 |
| 2026-10 | 23 | 41.4% | 7.4 s | 3,258 |
| 2026-11 | 21 | 47.2% | 5.9 s | 1,892 |

## What moves with skip (68 reels)
| Measure | vs skip (rho) | vs avg watch (rho) | p |
|---|---|---|---|
| Integrated loudness (louder) | +0.60 | -0.47 | <0.0001 |
| Dynamic range (wider) | -0.53 | +0.57 | <0.0001 |
| Peak over median in 0-3 s | -0.50 | +0.57 | <0.0001 |
| Cuts in 0-3 s | +0.53 | -0.42 | <0.0001 |
| Cuts per second, whole reel | +0.50 | -0.39 | <0.0001 |
| Length | -0.09 | +0.55 | 0.49 (none) |

| Group | n | Median skip | Median avg watch | Median views |
|---|---|---|---|---|
| Range 18 dB or more | 40 | 33.5% | 8.5 s | 4,502 |
| Range 10-18 dB | 12 | 43.6% | 7.5 s | 3,263 |
| Range under 10 dB | 16 | 47.6% | 5.8 s | 2,364 |
| -17 LUFS or quieter | 41 | 33.5% | 8.6 s | 4,694 |
| Louder than -17 LUFS | 27 | 45.8% | 5.9 s | 2,564 |
| No cut in 0-3 s | 25 | 32.1% | 8.6 s | 4,694 |
| 1-2 cuts in 0-3 s | 25 | 37.8% | 7.8 s | 3,816 |
| 3 or more cuts in 0-3 s | 18 | 47.0% | 6.1 s | 2,301 |

Inside the same month (so the month's own drift is held still), the wide-range reels still skip less:
| Month | Wide (18 dB+) | Flat (under 18 dB) |
|---|---|---|
| 2026-08 | 29.7% (n 15) | 36.9% (n 1) |
| 2026-09 | 34.6% (n 20) | 42.3% (n 2) |
| 2026-10 | 38.1% (n 3) | 45.2% (n 12) |
| 2026-11 | none | 47.4% (n 12) |

## Where the flat sound comes from: our own edit chain
| File | LUFS | Range (p95-p10) |
|---|---|---|
| Date bark raw take (Seedance) | -20.7 | 21.7 dB |
| Date bark posted edit (v4) | -13.3 | 10.5 dB |
| Date bark v5 | -13.4 | 7.4 dB |
| Protein raw take | -21.2 | 23.0 dB |
| Protein posted edit (v9) | -13.1 | 7.9 dB |
| Tacos raw take | -18.2 | 23.1 dB |
| Tacos posted edit | -14.5 | 5.0 dB |
| Hot Honey Salmon (skip 23.7%, August) | -21.2 | 27.3 dB |
| Eggs Benedict (skip 28.0%, August) | -24.3 | 37.0 dB |

The takes come out of Seedance with the same shape as the August winners. `dynaudnorm` + two compressors + the
-14 LUFS target (skill rules of 2026-10-27 to 2026-11-16) flattened them. Since 22 Oct every posted reel reads
-14.1 to -14.7 LUFS with 3-15 dB of range, and none has skipped under 35%.

## The first 3 seconds, frame by frame (0, 0.5, 1.0, 1.5, 2.0, 2.5 s)
- Lowest skip (Hot Honey Salmon 23.7%, Macarons 24.8%, Five Sauces 25.9%, Chips 26.0%, Sushi Burger 26.9%,
  Chicken 27.9%, Eggs Benedict 28.0%): one continuous shot, no cut in 0-3 s (chips: 2); his face and glasses in a
  medium shot; one clean subject on dark (a white plate); one continuous satisfying motion that builds a picture
  (a spoon drags sauce across the plate, stroke by stroke); a quiet room, then sharp single hits (spoon on porcelain);
  one small white line with a number («Honey burns at 110°C», «Hollandaise splits above 65°C»).
- Highest skip (protein 61.1%, skewers 58.2%, steak bites 53.3%, potato dill 45.3%, tacos 39.8%): three cuts in
  0-3 s; raw ingredients in bowls by 1-2 s (flour pour, minced meat, mash, boiled potatoes); a paper sheet or a big
  card box covering the frame (protein); a constant wall of sound at -14 LUFS.
- Apple pie (34.0%): an odd picture held (an apple between two slices of bread), one cut in 0-3 s; flat sound (6 dB).

## Limits (said plainly)
- This is a correlation over our own 68 reels, not a controlled test. The August reels also differ in format
  (plate art, the science line). The month table shows the effect holds inside each month, but only a same-picture
  A/B proves the sound alone.
- The 27 reels with licensed audio (the Crinkle Cake, Mansaf «منسف» 24.7%) cannot be downloaded through the API,
  so they are not in the 68.

## The test that settles it (organic, free)
Date bark v5 (flat, -13.4 LUFS, 7 dB) and v6 (the same picture frame for frame, the take's own sound at -20 LUFS) as
two Trial Reels, same hour. Read skip and the 2 s point at 24 h. Then the next prompt carries both rules:
one continuous opening shot of 3 s or more, and the dynamic master.

## Addendum 2026-11-18: protein ep 2's 24 h read, the hits in 0-3 s, and what gets sent
Ep 2 (cottage cheese ice cream, the first reel on this rule): skip 39.6% (the last 10 reels 47-66%), average watch
7.6 s (the best since October), 1,048 reached, 1 share, 3 saves. Curve (owner's screenshot): about 90% at 1 s, 75% at
2 s, 61% at 3 s, 49% at 4 s, flat 36-38% from 5 to 7 s, 16% at the end. The 2 s point beat the bar (65%); the drop
moved later, to 1-4 s.

Measured on 66 reels' files (0.1 s windows; an onset = a rise of 6 dB or more; motion = mean frame difference):
| Measure in 0-3 s | Group | n | Median skip | Median avg watch |
|---|---|---|---|---|
| Sharp sound onsets | 6 or more | 27 | 33.7% | 8.5 s |
| | 3-5 | 22 | 37.0% | 8.3 s |
| | 2 or fewer | 17 | 47.7% | 6.0 s |
| Picture motion 1-3 s | low third | 22 | 32.5% | 8.6 s |
| | middle third | 21 | 35.3% | 8.2 s |
| | high third | 23 | 46.8% | 6.9 s |
Spearman vs skip: onsets -0.44 (p 0.0002), motion +0.45 (p 0.0001).
The winners: Hot Honey Salmon 7 onsets (0.1, 0.9, 1.4, 1.8, 2.2, 2.7 s), Eggs Benedict 8, Chips 6, Macarons 4 spread a
second apart. Ep 2: 2 onsets, both at 0.5-0.6 s (the plop), then 2.5 s of near silence (-45 to -50 dB) while the honey
poured: the 1-4 s drop. Ep 3: 4 onsets (0.2, 0.3, 1.5, 2.2 s).
Rule: one calm continuous shot AND a new sharp sound every 0.5-1 s through 0-3 s (6 or more); no silent action
(a pour, a drizzle) in 0-3 s.

Sends per 1,000 reach (95 reels): the two captions with a kids angle 8.7 (stuffed sweet potato patties, 25,561 reached)
and 7.8 (sweet potato flatbreads, «Send this to someone whose kids won't touch vegetables», 5,129 reached): the two
biggest reaches since October. The mistake people forward: Five Sauces 22.5, Glass Tanghulu "why yours comes out
sticky" 21.7, Chocolate Tempering "loses temper above 34°C" 19.6, Rice "turns to paste" 11.1. Median of the rest 1.7.
Ep 2's "the one on a diet who still loves sweets": 0.95. Rule: the send line names a parent's problem with their kids
or a mistake the viewer's friend makes.
