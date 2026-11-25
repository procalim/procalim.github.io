# The Salad Tower (25 Nov), the owner's Genjutsu video (job 5bbfcf0c, 1080p, 20.04 s, him and his kitchen; the sound is
# our foley v2, carried through Genjutsu). The video as it is: no cut, no speed change. Text white, Arabic over English
# (biline.mjs), each card changing on the video's own cuts (3.25, 6.17, 9.50, 13.58 s):
#   0.00-3.25 hook (A the bank's 16, B an either-or question), 3.25-6.17 re-hook (the ring), 6.17-9.50 hook (the bank's 8),
#   9.50-13.58 re-hook (to the reveal), 13.58-17.0 nothing (the ring lifted and the tower turning), 17.0-20.04 save and
#   send at y 1430, on the plate, so the potato crown stays clean.
# Higgsfield sandbox /home/user/salad (g.mp4 = the job's result).
set -e
cd /home/user/salad
B=/home/user/mc1/biline.mjs
node $B hA.png "لما خالتك تسأل «مين عامل هاد؟» 😏" "When your aunt asks “who made this?” 😏"
node $B hB.png "سلطة… ولا لوحة؟ 🎨" "Salad… or a painting? 🎨"
node $B r1.png "الحلقة هي كل السر 👀" "The ring is the whole trick 👀"
node $B h2.png "لما الضيوف على الباب بعد ٥ دقايق" "When guests are 5 minutes away"
node $B r2.png "استنى لما يشيل الحلقة…" "Wait till the ring comes off…"
node $B sL.png "احفظها وابعتها للي بيكره السلطة 🥗" "Save it & send it to your salad hater 🥗" 1430
for v in A B; do
ffmpeg -v error -y -i g.mp4 -i h$v.png -i r1.png -i h2.png -i r2.png -i sL.png -filter_complex \
"[0:v][1:v]overlay=0:0:enable='lt(n,78)'[a];[a][2:v]overlay=0:0:enable='between(n,78,147)'[b];\
[b][3:v]overlay=0:0:enable='between(n,148,227)'[c];[c][4:v]overlay=0:0:enable='between(n,228,325)'[d];\
[d][5:v]overlay=0:0:enable='gte(n,408)',format=yuv420p[v]" \
-map "[v]" -map 0:a -c:v libx264 -crf 16 -preset slow -profile:v high -c:a copy -movflags +faststart st_$v.mp4
done
# A 91695915, B f4209153.
