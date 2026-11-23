# v9 finish (Higgsfield sandbox, xl): the sound, the 31 rendered slots joined, the three lines (t1-t3.png, 4K);
# the take's own colours (no grade), a light sharpen for the interpolated slots. B7 (text), A7 (no text), crf 17.
# Before it: python3 build7.py plan; build7.py over all slots in 4 parallel workers (kmotion2.json from kmotion.py).
cd "$(dirname "$0")"
# the sound: aud8.m4a from final8.sh (the same timing)
for i in $(seq -w 0 30); do echo "file 'b9_$i.mp4'"; done > blist.txt
ffmpeg -v error -y -f concat -safe 0 -i blist.txt -c copy anim9.mp4
# (aud8.m4a as v8) ffmpeg -v error -y -f s16le -ar 48000 -ac 2 -i aud8.raw -af "lowpass=f=14000,volume=6dB,aresample=192000,alimiter=limit=0.89:attack=1:release=60:level=disabled,aresample=48000" -c:a aac -b:a 256k aud8.m4a
# the hook until the skit ends (slot 2), the re-hook from the slit (slot 10) to the cheese end (slot 15), the answer from the knife (slot 25)
read SK SL CH CU < <(python3 -c "import json; B=json.load(open('spec7.json'))['B']; print(B[2], B[10], B[15], B[25])")
ffmpeg -v error -y -i anim9.mp4 -i aud8.m4a -i t1.png -i t2.png -i t3.png -filter_complex \
"[0:v]unsharp=5:5:0.3,split[ga][gb];[gb][2:v]overlay=0:0:enable='lt(n,$SK)'[x1];[x1][3:v]overlay=0:0:enable='between(n,$SL,$((CH-1)))'[x2];[x2][4:v]overlay=0:0:enable='gte(n,$CU)',format=yuv420p[vb];[ga]format=yuv420p[va]" \
-map "[vb]" -map 1:a -c:v libx264 -crf 17 -preset medium -profile:v high -level 5.2 -c:a copy -shortest -movflags +faststart B9.mp4 \
-map "[va]" -map 1:a -c:v libx264 -crf 17 -preset medium -profile:v high -level 5.2 -c:a copy -shortest -movflags +faststart A9.mp4
echo FINAL9_OK
