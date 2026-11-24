# After edit.py: the sound +7 dB into the house limiter (-14.9 LUFS), then A and B. They differ only in the hook (the
# first 1.4 s); the send line from the cross-section to the end. Needs hA.png hB.png sL.png from _tools/biline.mjs:
#   node biline.mjs hA.png "اعملها… وبيتقدّملك 💍" "Make this and he'll propose 💍"
#   node biline.mjs hB.png "عمري ما نزّلت هاي قبل…" "I've never shared this publicly before…"   (the strategist's hook 2)
#   node biline.mjs sL.png "ابعتها للي لازم يجيبلك خاتم 💍" "Send it to the one who owes you a ring 💍"
cd "$(dirname "$0")"
python3 edit.py > edit.log 2>&1
read HE SF < <(python3 -c "import json;j=json.load(open('edit.json'));print(round(j['starts']['s02']*24), round(j['starts']['s13']*24))")
ffmpeg -v error -y -i cut.mp4 -vn -af "volume=7dB,aresample=192000,alimiter=limit=0.89:attack=1:release=60:level=disabled,aresample=48000" -c:a aac -b:a 256k a_7.m4a
for v in A B; do
ffmpeg -v error -y -i cut.mp4 -i a_7.m4a -i h$v.png -i sL.png -filter_complex \
"[0:v][2:v]overlay=0:0:enable='lt(n,$HE)'[x1];[x1][3:v]overlay=0:0:enable='gte(n,$SF)',format=yuv420p[v]" \
-map "[v]" -map 1:a -c:v libx264 -crf 16 -preset slow -profile:v high -c:a copy -shortest -movflags +faststart ring_$v.mp4
done
echo "HE=$HE SF=$SF"; echo FIN_OK
