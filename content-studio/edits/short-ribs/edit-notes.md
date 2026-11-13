# Golden-Seared Herb Short Ribs: the edit (2026-11-13)
Source: the owner's generation on his unlimited, job b8ae3a58 (Seedance 2.5, 14.05 s, 720x1280, 24 fps), prompt v5 in
`../../prompts/w4-short-ribs-crinkle.txt`, first frame 0dcea38d (made from the crinkle's first frame), the Chef-Ahmad element.
Final v3: https://d2ol7oe51mr4n9.cloudfront.net/user_2x0tp0odsOo92J2AkNG46XQD8Gw/542a01f1-bcd0-4b0a-8759-a2ca322b7bcc.mp4
(media 542a01f1-bcd0-4b0a-8759-a2ca322b7bcc), 1080x1920 H.264, 10.33 s, -14.5 LUFS, -1.5 dBTP. Build: `edit_ribs.py`.

## The read of the take
- Right: the crinkle's first angle, true top-down, one locked shot for 14 s; 10 ribs in the golden sauce; bare hands; the
  bones pulled out sideways with the meat held in the tray (the v5 line worked for the pulls on screen); a pile of clean
  bones on the granite below the tray; from 7.5 s both hands squeeze a block above the tray, the meat breaks into fibres.
- Wrong: 4.2-5.2 s, five bones go without a pull (the ribs turn boneless between frames); passed at 1.5x in about 0.7 s.
- Source sound: -22.5 LUFS, swinging from -18 to -43 dB per quarter second (quiet at 0-1 s, 6-6.5 s, 10-11 s, 12.5-14 s).
- Source motion (pp scale per 0.25 s): 3-5 for frames 6-60 (the first slow pull), 2-3 for 180-228 and 276-337 (the holds
  in the squeeze); 8-17 elsewhere.

## Timeline v3
| Output | Source frames | Shot | Speed |
|---|---|---|---|
| 0.00-0.33 | 0-12 | the first frame, his hand comes in | 1.5x |
| 0.33-1.25 | 12-60 | his hand grips and pulls the first bone | 2.2x |
| 1.25-2.75 | 60-100 | the bones pulled, the clacks | 1.1x |
| 2.75-3.79 | 100-138 | the rest of the bones out | 1.5x |
| 3.79-5.12 | 138-180 | both hands lift a block | 1.3x |
| 5.12-6.38 | 180-228 | the squeeze starts (push-in 1.0-1.1, still top-down) | 1.6x |
| 6.38-8.38 | 228-276 | the squeeze, the meat bursts | 1.0x |
| 8.38-10.33 | 276-337 | the last squeeze (push-in 1.0-1.15) | 1.3x |
Sound: one continuous take levelled (dynaudnorm, then the two compressors and the house loudness), so it stays loud from
the first frame to the last (owner: «الصوت قوي من أول لآخر الفيديو»): per half second -15 to -20 dB in v2, QUIET 0.

## Cards (cards.json; the crinkle's sizes and places; the hook the owner asked for: «زي لما تكون جوعان او الساعة 3»)
title 0-2.9 "Golden-Seared Herb Short Ribs" / «شورت ريبس بالصوص الذهبي»; hook 0-2.9 "When you're starving at 3 AM" /
«لما تجوع الساعة ٣ الفجر»; 2.9-5.12 «العظم بيطلع لحالو» / "The bone slides right out"; 5.12-8.12 «٣ ساعات بالفرن. وبس» /
"3 hours in the oven. That is all."; 8.12-end «مين لازم يشوف هاد؟» / "Who needs to see this?" (shares were the lever).

## Checks
| Version | Length | DEAD | SLOW | QUIET | Note |
|---|---|---|---|---|---|
| v1 | 11.62 s | 11 of 23 | 6 | 0 | speeds 1.1-1.6, no push-in |
| v2 | 10.46 s | 5 of 21 | 8 | 0 | measured speeds, push-ins on the two holds |
| v3 | 10.33 s | 2 of 21 (0.5 s at 4.4, 9.0 s at 4.9; threshold 5) | 9 | 0 | the first pull at 2.2x, the last push-in 1.15 |
Loudest: 4.5 s (the lift), 8.0 s (the squeeze), 0.5 s. The "cuts" pp.py reports at 2.92, 3.83 and 6.42 s are speed
changes, not cuts: one shot.

## Transfer note
Local files reach the sandbox through media_upload: the PUT to upload.higgsfield.ai works from this session's machine
(the CloudFront download host does not), then curl from the media URL inside the sandbox.
