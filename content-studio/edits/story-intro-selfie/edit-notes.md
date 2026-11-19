# Story intro: the selfie in his voice (2026-11-19)

Owner: «الفيديو جاهز مرة حلوة دورك هو تحطك الكابشن وزوم وedit وتضيف شوية صور وهيك على طريقتك».
Prompt: prompts/story-intro-selfie-20s.txt. Take: Seedance 2.5 job 8bd3323c (the owner's unlimited, 720x1280, 24 fps,
481 frames, 20.04 s). Voice: ElevenLabs v4, his element Chef-Ahmad--1, job f88c53f5 (18.44 s), given as @Audio1.

## The read
- One continuous selfie shot, his face front-on the whole time, sunglasses on, the kitchen soft behind; no cut.
- The take's own voice: speech 0.23-19.16 s, then the smile. Its pauses do not match the mp3's (take: 2.34-2.58,
  3.38-4.03 ...; mp3: 2.65-3.01, 3.83-4.46 ...), so the lips follow the take's track: the take's track stays.
- Subtitle cues follow the take's speech segments (silencedetect -35 dB, 0.18 s), sentence by sentence.

## The edit (edit_intro.py + intro_overlay.mjs, the Higgsfield sandbox /home/user/intro)
- Zoom (zoompan on a 2x upscale, the face at 42% height fixed): a slow push 1.00-1.05 on the hook, a punch to 1.16 on
  «أنا أحمد», 1.21 on «ردّ على هالستوري», a release to 1.02 on the smile.
- Typed subtitles (El Messiri, Playfair italic for the English), no typing clicks over the voice; the accent words in
  gold with a dark stroke (gold alone did not read on the mustard shirt, v1).
- Photo cards over the selfie, never in 0-3 s, no cut under them: the book cover (public/brand/book/cover.jpg,
  «361 Recipes», 5.80-7.32 s); the three episodes from their own takes with their protein (ice cream 47 g, bean salad
  55 g, cookie dough 70 g, 7.40-10.05 s); the free PDF's cover with «ببلاش» (13.35-15.42 s); the reply bubble
  «بروتين» and an arrow toward the reply bar (15.62-18.05 s).
- Not used: public/brand/edible-codex-cover.jpg (a wine glass in the picture, and «260 curated recipes»).
- Sound: the take's own voice, no compressor, -16 LUFS gain and the peak-only limiter (a voice story; the cooking
  reels' -20 is for ASMR).

## v1 (not delivered)
- -16.7 LUFS, -1.0 dBTP. The pills read «غ 47~» (the tilde flipped in the right-to-left pill); «The Edible Codex» in
  gold was hard to read on the shirt; «كاملة.» alone on a second line.

## v2
- Pills «47 غ», «55 غ», «70 غ»; «The Edible Codex» white; gold accents with a dark stroke and a stronger scrim; the
  long line broken by meaning («وصفة منه،» / «فيها بروتين قد وجبة كاملة.»).
- Delivered: media 97244c10. 20.04 s, 1080x1920, -16.7 LUFS, -1.0 dBTP.

## v3 (owner: «ليش مغطي على وجهي»)
- v2's cards sat over his face. A first try at 285 px beside it still touched the sunglasses' edges. His sunglasses
  stay inside x 260-810 from 5 to 16 s (base.mkv with lines at x 250 and 830, every 0.8 s), so the cards are 225 px
  wide in the kitchen at the sides (x 12-237 and 843-1068, y 360-760), sliding in from their own side: the cover
  right; the episodes left, right, then left again (the ice cream makes way for the cookie dough); the free PDF left.
  One card a side at most; his face is never covered.
- Delivered: media aeeb35ef (v2 97244c10 replaced). 20.04 s, 1080x1920, -16.7 LUFS, -1.0 dBTP.
