# No Secrets ad: the edit with Arabic subtitles (2026-11-12)
Source: the owner's own generation on higgsfield.ai, job 2da9d8da (Seedance 2.5, 20 s, 4K 2160x3840 HEVC 24 fps,
bitrate high, audio on, his voice recording as the audio reference, the Chef-Ahmad element), from
`../no-secrets-seedance-20s.txt`. Unlimited generation, 0 credits.
Edited in the Higgsfield sandbox, 0 credits.

## v2 (2026-11-12, the one to use): https://d2ol7oe51mr4n9.cloudfront.net/user_2x0tp0odsOo92J2AkNG46XQD8Gw/0079c609-b88a-4ba5-8358-bfc5193770c2.mp4
Media 0079c609-b88a-4ba5-8358-bfc5193770c2, 1080x1920, H.264 24 fps, 19.3 s (16.8 s film + 2.5 s end card), AAC stereo,
-15.3 LUFS, -2.6 dBTP. Script `edit_v2.py` (needs `kin/` from `kinetic.mjs kinetic.json` and `endcard.mov` from
`compose_ad.py`).
Why: the owner's read of v1, «الفيديو ميت ... اعمل اقوى من هيك». What changed:
- 14 shots instead of 10. The 4K wides give extra close-ups with no loss: the tablet cover on "361 recipes?", Ahmet
  and Layla on "For anyone with a phone?", Ahmet on "No, Chef.", Layla on "She did.".
- The slam hits: a punch-in, a shake, a white flash and a heavy impact. Snap zoom with a low boom when Nabil's eyes
  widen. Punch-ins on the fork and on the tablet turning face up. The dish slide at 1.25x, the notebook at 1.1x, the
  tablet flip at 1.15x.
- Subtitles: Arabic only, 62 px, word by word as he says them (each new word pops for 2 frames), gold on ٣٦١, تندفن,
  كتابي. Stronger Arabic: «وصفة الشيف... بتندفن معه.» and «وبعدين قلّي... لازم تندفن؟» (buried with him, the Arabic
  idiom for a secret), «إنت اللي عملتها؟!». Close-ups carry the line under the chin (y 1420); on the tablet shot it
  sits above the tablet (y 580) so it never covers the cover.
- Sound: a low drone with a slow pulse, a heartbeat under Nabil's reaction, near silence before "You made this?",
  a riser into "From my book" with a boom on the word, a whoosh and a hit on the tablet, a boom on the end card. The
  music and effects duck under every line (sidechain), so the dialogue stays on top.
- Known: the generated voice says "three-sixty-one" fast; Whisper hears "161" even on the untouched source. The
  subtitle ٣٦١ and the cover's "361 Recipes" carry the number.

## v1 (replaced)
https://d2ol7oe51mr4n9.cloudfront.net/user_2x0tp0odsOo92J2AkNG46XQD8Gw/9e30efd4-92ad-42ca-8474-319a259426c9.mp4
(media 9e30efd4-92ad-42ca-8474-319a259426c9), `edit_ad.py` then `compose_ad.py`, 1080x1920, 21.25 s (18.75 s film +
2.5 s end card), AAC stereo 192k.

## The read (errors first)
- Nabil's chef jacket carries "EDIBLE CODEX" on the chest (shots at 3.9-5.7 s and 15.8-17.2 s of the edit): the man
  who is against the book wears its name. Small; most viewers will not read it.
- The tablet lands face up and shows the cover from 1 s (the script said face down). The end flip still reads.
- Nabil presses the notebook but never slides it to Ahmet: the "he gives up his secrets" beat is missing.
- The lenses are brown-tinted, not solid black.
- The opening wide shot is still for 4 s (motion 0.3 per half second): trimmed and given a slow push-in.
- Right: the five lines once each, in order, by the right speaker (Whisper small.en); Ahmet's lines sit at 120-125 Hz,
  his recording at 122 Hz; the tablet cover at the end matches the real cover (title, emblem, "361 Recipes", his name);
  the cake reads as crinkle cake; gloves on Ahmet; water only, no alcohol; no stray text.

## Timeline (source frames at 24 fps -> output seconds)
| Source frames (s) | Output | Shot | Edit |
|---|---|---|---|
| 0-21 (0.00-0.88) | 0.00-0.88 | the tablet slammed | |
| 35-107 (1.46-4.46) | 0.88-3.88 | wide, line 1 | 0.6 s of stillness cut before the line; push-in 1.00-1.15 |
| 113-157 (4.71-6.54) | 3.88-5.71 | Nabil, notebook, line 2 | 0.25 s cut before the shot; push-in to 1.08 |
| 157-194 (6.54-8.08) | 5.71-7.25 | Ahmet slides the dish | push-in to 1.05 |
| 194-253 (8.08-10.54) | 7.25-9.71 | Ahmet close, line 3 | push-in to 1.10 |
| 253-280 (10.54-11.67) | 9.71-10.83 | the fork in the crinkle cake | push-in to 1.08, +6 dB |
| 286-356 (11.92-14.83) | 10.83-13.75 | Nabil's reaction, line 4 | first 0.25 s cut; push-in to 1.12 |
| 356-404 (14.83-16.83) | 13.75-15.75 | Ahmet points at Layla, line 5 | push-in to 1.06 |
| 404-438 (16.83-18.25) | 15.75-17.17 | Nabil and the notebook | push-in to 1.06 |
| 443-481 (18.46-20.04) | 17.17-18.75 | the tablet turned face up | push-in to 1.05, fade to black in the last 0.25 s |
| end card | 18.75-21.25 | the real cover, «٣٦١ وصفة حلال. بلا أسرار.» / "361 halal recipes. No secrets.", EDIBLECODEX.COM | cover eases in, text fades in, a soft low hit |

## Subtitles (subs.json, subs/ov_*.png; Arabic 48 px Tajawal over English 28 px; gold on ٣٦١ and كتابي)
| Output | Arabic | English | Position |
|---|---|---|---|
| 1.07-2.05 | ٣٦١ وصفة؟ | 361 recipes? | y 1190-1300, on the marble above the tablet |
| 2.05-3.85 | لأي حدا معه موبايل؟ | For anyone with a phone? | same |
| 4.04-5.95 | وصفات الشيف بتموت معه. | A chef's recipes die with him. | same |
| 7.32-8.25 | دوقها أول. | Taste it first. | close-up: 170 px lower, under the chin |
| 8.45-9.70 | بعدين قلّي إنها لازم تموت. | Then tell me it should die. | close-up |
| 12.47-13.75 | إنت عملت هاي؟ | You made this? | close-up |
| 13.83-14.55 | لا يا شيف. | No, Chef. | y 1190-1300 |
| 14.57-15.20 | هي عملتها. | She did. | same |
| 15.22-16.10 | من كتابي. | From my book. | same |
Each subtitle starts with its word (Whisper word times) and pops in over 3 frames; all inside x 230-850.

## Checks
| Check | Result |
|---|---|
| Loudness | -15.3 LUFS, -4.2 dBTP |
| Lines | all five audible and uncut (no splice inside a line) |
| Seams | every splice on a cut or inside a still shot |
| 390 px phone check | subtitles readable; no face, cover or food covered; end card readable |
| Ads safe zone | the lower subtitles (y 1360-1470) sit in Meta's bottom 35%: fine for a reel; as a paid ad, check them over the CTA bar |
