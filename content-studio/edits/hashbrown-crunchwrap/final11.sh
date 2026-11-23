# v11 finish (Higgsfield sandbox, xl): the matched overlaps (compose11.py), the three lines, the v8 sound (aud8.m4a, the same
# timing). Before it: build11.py over the 8 changed slots (the others are v10's, copied as c11_) in 4 parallel workers. B11 (text), A11 (no text), crf 17.
cd "$(dirname "$0")"
python3 compose11.py
SK=49; SL=229; CH=326; CU=453   # the hook until the skit ends; the re-hook from the slit to the cheese end; the answer from the knife
ffmpeg -v error -y -i anim11.mp4 -i aud8.m4a -i t1.png -i t2.png -i t3.png -filter_complex \
"[0:v]unsharp=5:5:0.3,split[ga][gb];[gb][2:v]overlay=0:0:enable='lt(n,$SK)'[x1];[x1][3:v]overlay=0:0:enable='between(n,$SL,$((CH-1)))'[x2];[x2][4:v]overlay=0:0:enable='gte(n,$CU)',format=yuv420p[vb];[ga]format=yuv420p[va]" \
-map "[vb]" -map 1:a -c:v libx264 -crf 17 -preset medium -profile:v high -level 5.2 -c:a copy -shortest -movflags +faststart B11.mp4 \
-map "[va]" -map 1:a -c:v libx264 -crf 17 -preset medium -profile:v high -level 5.2 -c:a copy -shortest -movflags +faststart A11.mp4
echo FINAL11_OK
