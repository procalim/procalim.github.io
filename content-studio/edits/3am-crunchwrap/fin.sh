# The 3 a.m. Potato Crunchwrap (24 Nov), the owner's motion-control video (job 236a77db, 30.04 s, 720p, with the German
# reel's sound at -14.4 LUFS). Higgsfield sandbox /home/user/mc1. No cuts: the reel is the German's edit, already tight
# (one 0.25 s still window, at 28.25, the fall asleep). 1080x1920; the house limiter at 0 dB (peaks -0.4 -> -0.9).
# The text from _tools/biline.mjs: the hook over the couch opening (frames 0-93, to the kitchen cut at 3.92 s); the
# send line from the couch bite (frame 658, 27.42 s) to the end, not over the cut halves.
#   node biline.mjs hA.png "لما العرب يجوعوا الساعة 3 الصبح 🌙" "When Arabs get hungry at 3 a.m. 🌙"
#   node biline.mjs hB.png "غالباً ما رح تعترف بهاي، بس…" "You probably won't admit this, but…"   (the strategist's 25)
#   node biline.mjs sL.png "ابعتها لصاحبك اللي بيجوع الساعة 3 🌙" "Send it to your 3 a.m. friend 🌙"
cd "$(dirname "$0")"
ffmpeg -v error -y -i out.mp4 -vn -af "aresample=192000,alimiter=limit=0.89:attack=1:release=60:level=disabled,aresample=48000" -c:a aac -b:a 256k aud.m4a
for v in A B; do
ffmpeg -v error -y -i out.mp4 -i aud.m4a -i h$v.png -i sL.png -filter_complex \
"[0:v]scale=1080:1920:flags=lanczos,setsar=1[b];[b][2:v]overlay=0:0:enable='lt(n,94)'[x1];[x1][3:v]overlay=0:0:enable='gte(n,658)',format=yuv420p[v]" \
-map "[v]" -map 1:a -c:v libx264 -crf 16 -preset slow -profile:v high -c:a copy -shortest -movflags +faststart k3_$v.mp4
done
