# The retention engine: what grabs attention and holds it to the end (2026-11-15)
Owner: «انت كخبير في هاذا البرومبت استخرج مثلا قوة الأصوات او الأشياء التي تجذب الانتباه وتدع المشاهد بنتظر إلى نهاية الفيديو
بنفس البرومبت والاستراتيجية فقط بتحسينات من البرومبت او التعديل ... إذا كنت لا تعرف اخرج من المهارات».
Same strategy (cookcut, his kitchen and face, a punch every 3 s, the payoff last). Each item is marked MEASURED (our own
reads) or CRAFT (editing and sound practice, not yet measured on this account; test one per reel).

## 1. What the shawarma prompt did that worked (MEASURED)
| Element | Read |
|---|---|
| Frame 0: a blade falling toward the lens, his face behind it, a hard impact sound | 93-94% at 1 s, 80-81% at 2 s (v1); the tostadas trial, a knife into red tuna: 93 / 81% |
| The opening shot held about 1.4 s (two strikes) before the next | v1 81% at 2 s; v2 cut it to 0.7 s: 67% |
| The hook card held about 2.75 s | v2 replaced it at 2.0 s and lost 14 points more at 1-2 s |
| The payoff (the cut, the bite) last, nothing after it | the tuna trial with raw steps after the payoff: 13% at the end |
| The cut as the loudest sound (after the compressors) | v1 kept 25-26% to the end of 15.75 s |
What lost viewers (MEASURED): raw meat filling the frame (v1 3-5 s, -19 points; v2 1-2 s, -24); a flat middle (about -2
points a second from 5 s); a cross-section that read as a solid patty; 15-16 s length (the ends near 40% are 7.6-12 s).

## 2. Sound: the strongest attention tool we have (CRAFT unless marked)
OWNER'S CALL, 2026-11-16: «الكرينكل نجح من الصوت مش من الهووك». The Crinkle Cake (about 500K views, 56% to the end) had
its loudest moment of the whole reel at 0.3 s: a hard dry crackle (prompts/crinkle-15s-v2-base.txt, "SOUND"), with 10
DEAD and 4 SLOW of 28 on pp.py, so the motion did not carry it. From now: the first impact (0.1-0.4 s) is the loudest
sound of the reel; the payoff is second; a dip before the payoff stays. This replaces rule 2 below (the loudest in
the last 3 s), which was craft and never measured here.
1. The first 0.3 s carries a sharp transient (a cleaver, a crack, a slam): a sudden loud onset makes the viewer orient
   before they decide to swipe. MEASURED on frame 0 above.
2. A rising energy curve: each punch a little louder or fuller than the one before; the loudest sound in the last 3 s.
   v1 first had its loudest sound at 3 s (the toss) until the edit moved it.
3. One beat of near silence (0.2-0.3 s) right before the payoff, then the payoff hit: the dip makes the hit feel bigger.
4. Sound leads picture (a J-cut): on every cut, the next shot's sound starts 3-4 frames before its picture. The ear pulls
   the eye forward; the viewer wants to see what made the sound. Done in the edit, not the prompt.
5. A sound promise: one off-screen sound heard before its source is shown (the griddle's sizzle under the oven shot),
   paid off on the next cut.
6. Texture sounds in the 2-8 kHz band (crunch, crackle, sizzle, the crisp bite) at close range on the payoff; the low
   thud of impacts on the punches. Write both into the AUDIO block by name.
7. With a song from the Instagram library: about 15 dB under the food sounds, its drop (or a strong beat) landing on the
   payoff, faded 1 s before the end.

## 3. Picture: what makes the eye stay (CRAFT unless marked)
1. Motion toward the lens (a blade, a tray, a hand) on the punches: looming motion is read as urgent. MEASURED at frame 0.
2. His face in the first second and again in the last two (people watch faces); never a wide transition shot of him
   walking between stations (v1 5.0-5.75 s, the oven wide).
3. A visible state change in every shot: raw to brown, flat to puffed, closed to cut. A shot where nothing changes is a
   place to leave.
4. One mid-point surprise at about 50% (a flame burst, a slam): a new peak where the slide usually starts.
5. Fire, steam and slow-motion particles only on the punches; they lose force if they are everywhere.
6. The payoff is shown once, at the end, clearly: the cut face with the filling readable (loose shavings, not a patty).
7. A loop seam: the last frame matches the first (the same framing, the same object), so the end runs into a rewatch.

## 4. The open loop: why they wait for the end (CRAFT)
1. Promise one specific thing in the first 3 s that only the last 2 s show (the crunch of the cut, the inside of the
   roll, the first bite). The hook card can name it; the picture withholds it.
2. Between the promise and the payoff, every 2-3 s a new step that brings the payoff visibly closer (progress the eye
   can count: the tower rising, browning, shaved, rolled, pressed).
3. Do not answer early: no cross-section, no bite, no finished dish before the last 3 s.
4. The last card echoes a word of the hook (the keyword card names the dish of the hook).

## 5. Edit techniques to add to every edit from now (CRAFT; one at a time when a read must say what worked)
| Technique | How in our pipeline |
|---|---|
| J-cut audio pre-lap | each segment's audio starts 3-4 frames before its picture, crossfaded under the previous shot |
| Speed ramp into impacts | fast (1.5-2x) up to the impact frame, real time on the impact and 4-6 frames after |
| Punch-in on impacts | 6-10% scale over 4-6 frames on the impact frame, plus a 2-frame shake |
| Rising loudness | the last 3 s 2-3 dB above the median; the payoff the loudest; a 0.2-0.3 s dip before it |
| Cuts on a steady grid | cut points every 12 or 18 frames at 24 fps where the footage allows: the rhythm feels intentional |
| No wide transition shots | cut a walk or a reach between stations; keep the action frames only |
| The loop seam | the last 0.3 s matches frame 0's framing |

## 6. Prompt blocks to add to every prompt (same strategy)
- RETENTION: "The payoff (name it) appears only in the last 3 seconds. Every shot shows a visible change in the food.
  One surprise peak at the middle of the video (name it). The last frame matches the first frame's framing."
- AUDIO: "Loud close-mic sound in every frame; the first impact at 0.3 seconds is the loudest sound of the whole video
  (name it: the slam of..., the crackle of...); a 0.2-second near silence before the payoff; the payoff the second
  loudest (name the texture)." (owner, 2026-11-16, the crinkle's measured sound)
- AVOID: "a wide shot of the cook walking between stations, a still shot where nothing changes, raw food filling the
  frame for more than half a second, the payoff before the last 3 seconds."
