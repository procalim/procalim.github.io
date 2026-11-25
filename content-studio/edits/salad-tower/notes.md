# The salad tower reference (25 Nov): natural sounds before Genjutsu
The owner: «قبل ما نعمل الفيديو اعمل الاصوات وركبهم على الفيديو هاد، بعدين ... هيجز فيلد جينستيف». The reference (a chef
plating a beet, salad, avocado, feta and julienne tower in a ring, 19.9 s) carried only music and a commentator's voice;
its four stems held no cooking sound (playbook log, 25 Nov). So the sound was built from Epidemic Sound (via Higgsfield),
each on its action (Higgsfield sandbox /home/user/comm/foley.py):
| at | action | sound |
|---|---|---|
| 0.15 | spoon on the plate | Spoon, Taps On Plate |
| 0.45, 2.00, 3.40 | three sauce flicks | Spoon, Chocolate Pudding, Serve On Plate, Splat |
| 4.28 | the ring set on the plate | Cutlery, Single Item, Down On Plate 02 |
| 5.35 | the beet pressed in the ring | Squishing, Tomato, Hands |
| 7.05 | the salad tossed in the steel bowl | the clink, softer, and Fresh Plant, Shake, Rustle |
| 8.05 | the salad into the ring | the rustle |
| 9.65, 10.6 | the avocado, the feta | the squish, soft |
| 12.70 | the julienne nest | the rustle |
| 13.65 | the ring lifted | Metal, Scrape Object Along Metal Pole 02 |
| 0-19.9 | under all | Kitchen Atmos Calm, Low Activity 01 |
-19.0 LUFS, peak -1.0 (quiet, as real kitchen sound is). The result: 5518a5f4. Genjutsu quote with him (f62eda22) and his
kitchen (325df734), 1080p: 400 credits; nothing generated before «ولد».

## v2, 25 Nov (the owner: «صوت تكت الصحن مش مظبوط، ركبه بشكل مضبوط وقوه بصوت الصحن الحقيقي»)
The first placement guessed (0.15, 0.45, 2.00, 3.40). Measured: the splatter lands on the lower plate at 0.80, 2.17 and
3.63 s (the coloured pixels jump), so the spoon strikes the held plate at 0.77, 2.13 and 3.60. Each strike now three
layers (Cutlery Hit Dish, Ceramics Plate Put Down Clink, Spoon Taps On Plate) at -1 to -2 dB, the loudest sounds of the
reel; the ring on the plate at 4.32 (metal and plate layers); everything else 6-8 dB under them. -19.3 LUFS, peak -0.5.
foley.py here. The result: 305a4b52 (replaces 5518a5f4).
