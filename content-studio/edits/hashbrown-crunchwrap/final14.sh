# v14, the locked template's edit on the owner's take (job 46d6c074), Higgsfield sandbox /home/user/cw14.
# The take as is (no zoom, no grade); the three lines white in the middle with no box (_tools/whiteline.mjs, 64 px,
# centred on y 960) on the take's own cut frames; the take's sound +7.5 dB into the house limiter (-15.4 LUFS).
# Needs take.mp4 (job 46d6c074) and whiteline.mjs next to it.
cd "$(dirname "$0")"
node whiteline.mjs w1.png "Why is everyone putting<br>hashbrowns in tortillas? 🥔" 960 64
node whiteline.mjs w2.png "Wait… why cut the tortilla? ✂️" 960 64
node whiteline.mjs w3.png "The hashbrown is the crunch 🥔<br>Send it to your 3 a.m. friend 😮‍💨" 960 64
ffmpeg -v error -y -i take.mp4 -vn -af "volume=7.5dB,aresample=192000,alimiter=limit=0.89:attack=1:release=60:level=disabled,aresample=48000" -c:a aac -b:a 256k aud14.m4a
# A: the take's video untouched, the new sound
ffmpeg -v error -y -i take.mp4 -i aud14.m4a -map 0:v -map 1:a -c:v copy -c:a copy -shortest -movflags +faststart A14.mp4
# B: the hook 0-51 (the skit ends at the cut 2.17 s), the re-hook 243-323 (the slit 10.12 s to the iron 13.50 s),
# the answer from 459 (the knife 19.12 s) to the end
ffmpeg -v error -y -i take.mp4 -i aud14.m4a -i w1.png -i w2.png -i w3.png -filter_complex \
"[0:v][2:v]overlay=0:0:enable='lt(n,52)'[x1];[x1][3:v]overlay=0:0:enable='between(n,243,323)'[x2];[x2][4:v]overlay=0:0:enable='gte(n,459)',format=yuv420p[vb]" \
-map "[vb]" -map 1:a -c:v libx264 -crf 17 -preset medium -profile:v high -level 5.2 -c:a copy -shortest -movflags +faststart B14.mp4
echo FIN14_OK
