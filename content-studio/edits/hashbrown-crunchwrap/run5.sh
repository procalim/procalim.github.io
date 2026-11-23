# v5 after build5.py (Higgsfield sandbox, xl, background): the 4K zoom and swells in 4 parallel ranges, the sound,
# then the grade (kitchen only, from the skit end) and the three lines; B5 (text) and A5 (no text), crf 17.
# Needs take.mp4, inter5.mp4, spec5.json, zoom_kevin.py (_tools), audio5.py, t1.png t2.png t3.png (2160x3840).
cd "$(dirname "$0")"
N=$(python3 -c "import json;print(len(json.load(open('spec5.json'))['S']))")
python3 zoom_kevin.py inter5.mp4 spec5.json 0 9 > z1.log 2>&1 &
python3 zoom_kevin.py inter5.mp4 spec5.json 9 17 > z2.log 2>&1 &
python3 zoom_kevin.py inter5.mp4 spec5.json 17 25 > z3.log 2>&1 &
python3 zoom_kevin.py inter5.mp4 spec5.json 25 $N > z4.log 2>&1 &
python3 audio5.py > a.log 2>&1
wait
ls q4_??.mp4 | sort | sed "s/^/file '/;s/$/'/" > qlist.txt
ffmpeg -v error -y -f concat -safe 0 -i qlist.txt -c copy zoom5.mp4
ffmpeg -v error -y -f s16le -ar 48000 -ac 2 -i aud5.raw -af "lowpass=f=14000,volume=6dB,aresample=192000,alimiter=limit=0.89:attack=1:release=60:level=disabled,aresample=48000" -c:a aac -b:a 256k aud5.m4a
# text cuts: the hook until the skit ends (slot 3), the re-hook from the slit (slot 11) to the cheese end (slot 16),
# the answer from the knife (slot 26)
read SK SL CH CU < <(python3 -c "import json; B=json.load(open('spec5.json'))['B']; print(B[3], B[11], B[16], B[26])")
SKT=$(python3 -c "print($SK/24)"); E="enable='gte(t,$SKT)'"
echo "SK=$SK SL=$SL CH=$CH CU=$CU"
ffmpeg -v error -y -i zoom5.mp4 -i aud5.m4a -i t1.png -i t2.png -i t3.png -filter_complex \
"[0:v]eq=contrast=1.12:brightness=-0.04:saturation=1.25:gamma=0.88:$E,colorbalance=rs=-0.04:gs=-0.02:bs=0.08:rh=0.03:bh=-0.03:$E,split[ga][gb];[gb][2:v]overlay=0:0:enable='lt(n,$SK)'[x1];[x1][3:v]overlay=0:0:enable='between(n,$SL,$((CH-1)))'[x2];[x2][4:v]overlay=0:0:enable='gte(n,$CU)',format=yuv420p[vb];[ga]format=yuv420p[va]" \
-map "[vb]" -map 1:a -c:v libx264 -crf 17 -preset medium -profile:v high -level 5.2 -c:a copy -shortest -movflags +faststart B5.mp4 \
-map "[va]" -map 1:a -c:v libx264 -crf 17 -preset medium -profile:v high -level 5.2 -c:a copy -shortest -movflags +faststart A5.mp4
echo RUN5_OK
