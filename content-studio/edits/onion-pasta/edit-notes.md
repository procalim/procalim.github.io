# Onion Garlic Chicken Pasta: the edit (2026-11-12, the reference-account plan, the sweet potato way)
Source: the owner's own generation on higgsfield.ai (unlimited), job 1c08b361: Seedance 2.5 omni_reference, 12 s,
4K 2160x3840 HEVC Main 10, bitrate high, the reference reel as @Video1, the Chef-Ahmad element, the kitchen.
Prompt: ../../prompts/w4-onion-garlic-chicken-pasta-ref.txt. Owner's read: «شوفتو ولا غلطة».
Final: https://d2ol7oe51mr4n9.cloudfront.net/user_2x0tp0odsOo92J2AkNG46XQD8Gw/e0583c49-23ae-470a-a2e8-95ce387af179.mp4
(media e0583c49-23ae-470a-a2e8-95ce387af179), 2160x3840 HEVC Main 10 (hvc1), BT.709, 24 fps, 12.29 s, about 17 Mbps,
AAC stereo 256k, -14.5 LUFS, -1.4 dBTP.

## The read
- Right: every step of the reference in order (onions, spices, toss, 2 chicken breasts, 2 garlic halves, oven,
  baked, shredded, parsley, lemon, garlic squeezed, fusilli, cream, parmesan, toss, plate, parsley, parmesan, fork,
  the bite); black gloves on every hand; his kitchen; no text; no speech (Whisper); his face clean in the bite shot.
- Small: brown-tinted lenses, not solid black; the plate rim is tan, not gold; his forearm shows bare above the glove
  when he lifts the dish (3.4-3.7 s), which is fine.

## Timeline
| Source frames | Output | What | Edit |
|---|---|---|---|
| 237-252 | 0.00-0.67 | the fork lifting the creamy pasta (flash) | +4 dB |
| 0-252 | 0.67-11.21 | the reel in its own order | chicken slap -8 dB; cream, parmesan, toss, fork +4 dB |
| 253-288 | 11.21-12.29 | the bite | 1.4x; CTA «اكتب «باستا» 👇» / "Comment PASTA 👇" from 11.25 s on his apron |
Audio: two compressors, then gain and a limiter (the take was peaky and quiet, -27 LUFS).

## Checks
| Check | Result |
|---|---|
| prepublish (pp.py) | QUIET 1 (1.5 s, a gap between pours), SLOW 1 and DEAD 1 in the last 0.8 s (he stands still under the CTA, kept so the CTA can be read) |
| Loudest | 9.0 s, the creamy pasta served (the money shot) |
| Export vs source | same 4K, 10-bit, BT.709 |
| No product before the food | yes; CTA only, over the bite |
