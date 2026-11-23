# v6 step 4 (Higgsfield sandbox, xl): the animated slots joined, his look (skit.cube before the kitchen, kitchen.cube
# after), a light sharpen, the three lines; the v5 sound (aud5.m4a, run5.sh). B6 (text) and A6 (no text), crf 17.
# Before it: python3 kmotion.py; python3 lut6.py; anim6.py over all 32 slots in 4 parallel workers.
cd "$(dirname "$0")"
for i in $(seq -w 0 31); do echo "file 'a6_$i.mp4'"; done > alist.txt
ffmpeg -v error -y -f concat -safe 0 -i alist.txt -c copy anim6.mp4
read SK SL CH CU < <(python3 -c "import json; B=json.load(open('spec5.json'))['B']; print(B[3], B[11], B[16], B[26])")
ffmpeg -v error -y -i anim6.mp4 -i aud5.m4a -i t1.png -i t2.png -i t3.png -filter_complex \
"[0:v]lut3d=file=skit.cube:enable='lt(n,$SK)',lut3d=file=kitchen.cube:enable='gte(n,$SK)',unsharp=5:5:0.35,split[ga][gb];[gb][2:v]overlay=0:0:enable='lt(n,$SK)'[x1];[x1][3:v]overlay=0:0:enable='between(n,$SL,$((CH-1)))'[x2];[x2][4:v]overlay=0:0:enable='gte(n,$CU)',format=yuv420p[vb];[ga]format=yuv420p[va]" \
-map "[vb]" -map 1:a -c:v libx264 -crf 17 -preset medium -profile:v high -level 5.2 -c:a copy -shortest -movflags +faststart B6.mp4 \
-map "[va]" -map 1:a -c:v libx264 -crf 17 -preset medium -profile:v high -level 5.2 -c:a copy -shortest -movflags +faststart A6.mp4
echo FINAL6_OK
