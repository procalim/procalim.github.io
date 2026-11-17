set -e
cd /home/user/edi
cp editorial.mjs /home/user/ov/editorial.mjs
node /home/user/ov/editorial.mjs mock.json st --still
C=/home/user/protein1/cut.mkv
i=0
for pair in "hook:1.20" "bread:6.40" "answer:10.20" "send:11.60"; do
  k=${pair%%:*}; t=${pair##*:}
  ffmpeg -v error -y -ss $t -i $C -frames:v 1 bg_$k.png
  f=$(ls st/$k/*.png | head -1)
  ffmpeg -v error -y -i bg_$k.png -i $f -filter_complex "[0:v][1:v]overlay=0:0,scale=360:640" m_$k.png
done
montage m_hook.png m_bread.png m_answer.png m_send.png -tile 4x1 -geometry +4+4 -background black -quality 82 mock.jpg
ls -la mock.jpg
