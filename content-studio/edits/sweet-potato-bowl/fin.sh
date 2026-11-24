# The Loaded Sweet Potato Bowl (24 Nov), the owner's Genjutsu video (job 01b9a738, 1080p, 16.04 s, him and his kitchen).
# The owner: «الفيديو جاهز هووك ريههوك هووك ريههوك تاكست الحل لنمسك المشاهد من بنك الهوكات ... بس ما تسرع خلي زي ما هو».
# The video as it is: no cut, no speed change. Text only, white, middle, Arabic over English (biline.mjs), each card
# changing on the video's own cuts (3.17, 5.38, 8.50, 11.38 s), so no stretch is ever without text:
#   0.00-3.17 hook (A: the strategist's 4; B: the strategist's 21), 3.17-5.38 re-hook (the trick), 5.38-8.50 hook (bank
#   10), 8.50-12.29 re-hook (to the end), 12.30-13.49 nothing (the cheese pull clean), 13.50-16.04 save and send from the
#   bite (the reference's gym line). The sound: the Genjutsu result's own (peaks 0.0 dB) through the house limiter.
# Higgsfield sandbox /home/user/sp (g.mp4 = the job's result; biline.mjs from /home/user/mc1).
set -e
cd /home/user/sp
B=/home/user/mc1/biline.mjs
node $B hA.png "ياريت حدا قلّي هاي من زمان…" "I wish someone told me this sooner…"
node $B hB.png "يمكن عم تعمل نفس غلطتي…" "You might be making my mistake…"
node $B r1.png "بالفرن عالوجه… مش عالقشرة" "Cut side down. Not up."
node $B h2.png "لما الدايت بيبلّش بكرا 😅" "When your diet starts tomorrow 😅"
node $B r2.png "استنى آخر ثانية…" "Wait for the last second…"
node $B sL.png "احفظها وابعتها لرفيق الجيم 💪" "Save it & send it to your gym buddy 💪"
ffmpeg -v error -y -i g.mp4 -vn -af "aresample=192000,alimiter=limit=0.89:attack=1:release=60:level=disabled,aresample=48000" -c:a aac -b:a 256k aud.m4a
for v in A B; do
ffmpeg -v error -y -i g.mp4 -i aud.m4a -i h$v.png -i r1.png -i h2.png -i r2.png -i sL.png -filter_complex \
"[0:v][2:v]overlay=0:0:enable='lt(n,76)'[a];[a][3:v]overlay=0:0:enable='between(n,76,128)'[b];\
[b][4:v]overlay=0:0:enable='between(n,129,203)'[c];[c][5:v]overlay=0:0:enable='between(n,204,294)'[d];\
[d][6:v]overlay=0:0:enable='gte(n,324)',format=yuv420p[v]" \
-map "[v]" -map 1:a -c:v libx264 -crf 16 -preset slow -profile:v high -c:a copy -shortest -movflags +faststart sp_$v.mp4
done
