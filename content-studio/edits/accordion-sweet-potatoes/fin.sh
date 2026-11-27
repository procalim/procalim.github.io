# Accordion Sweet Potatoes (27 Nov), the owner's Genjutsu video (job 4daea37b, his own reference upload cc8fce3c, 1080p,
# 12.04 s, 24 fps). The owner: «اتصرح في بداية الفيديو كلام بنفس الفيديو الأصلي، أقوم بتغطيته ... وباللقطة الأخيرة ...
# شكلي وأنا أدخله بالفرن ... قم باقتصاصه بنفس سرعة الفيديو الأصلي ... نسختين ... بنك الهوكات الجديد ... مع القديم»,
# then «غطي مكان الكتابة بتاعت الفيديو الأصلي صح».
# - The oven shot with his face (frames 215-260, 8.96-10.88 s) cut out; no speed change. 0-214 + 261-288 = 243 frames,
#   10.125 s. The sound cut on the same frames (20 ms fades), so the knife crunches stay on the knife.
# - The burned title «accordion potatoes» (frames 5-19, x 65-890, y 864-1058): a soft blurred, darkened band
#   (y 780-1140, feathered mask) for frames 0-19, and the hook's two lines sit on the title's two lines (y 960).
# - Cards (biline.mjs): hook 0-75 (to the cut at 3.17 s), re-hook 76-173 (the chopsticks arrive at 4.17 s),
#   hook 2 174-214 (the tray and the brush), the save line 215-242 on the reveal at y 300, over the counter, not the food.
#   The video ends 1.17 s after the reveal starts (the end rule: 1.5 s at most).
# Higgsfield sandbox /home/user/acc (g.mp4 = the job's result; /home/user/mc1/biline.mjs = edits/_tools/biline.mjs).
set -e
cd /home/user/acc
B=/home/user/mc1/biline.mjs
node $B h1.png "طلع إني عم بقطّع البطاطا غلط طول عمري…" "I’ve been cutting potatoes wrong all along…" 960 50 44
node $B h2.png "لما خالتك تسأل «مين عامل هاد؟» 😏" "When your aunt asks “who made this?” 😏"
node $B r1.png "السر كله بعودين صيني 🥢" "The whole trick: two chopsticks 🥢"
node $B k2.png "شوف كيف بتتغير بالفرن 👀" "Watch them change in the oven 👀"
node $B sv.png "احفظها وابعتها للي بيحب البطاطا 🍠" "Save it & send it to a potato lover 🍠" 300
convert -size 1080x360 xc:black -fill white -draw "roundrectangle 30,40 1050,320 70,70" -blur 0x22 mask.png
SCRIM="[s]crop=1080:360:0:780,gblur=sigma=14,eq=brightness=-0.08[bl];[1:v]format=gray[mk];[bl][mk]alphamerge[blm]"
for v in 1 2; do
ffmpeg -v error -y -i g.mp4 -loop 1 -i mask.png -i h$v.png -i r1.png -i k2.png -i sv.png -filter_complex \
"[0:v]split[a][b];[a]trim=end_frame=215,setpts=PTS-STARTPTS[va];[b]trim=start_frame=261,setpts=PTS-STARTPTS[vb];\
[va][vb]concat=n=2:v=1:a=0,split[m][s];$SCRIM;[m][blm]overlay=0:780:shortest=1:enable='lt(n,20)'[c0];\
[c0][2:v]overlay=0:0:enable='lt(n,76)'[c1];[c1][3:v]overlay=0:0:enable='between(n,76,173)'[c2];\
[c2][4:v]overlay=0:0:enable='between(n,174,214)'[c3];[c3][5:v]overlay=0:0:enable='gte(n,215)',format=yuv420p[v];\
[0:a]asplit[x][y];[x]atrim=end=8.958333,asetpts=PTS-STARTPTS,afade=t=out:st=8.938:d=0.02[xa];\
[y]atrim=start=10.875,asetpts=PTS-STARTPTS,afade=t=in:d=0.02[ya];[xa][ya]concat=n=2:v=0:a=1,\
aresample=192000,alimiter=limit=0.89:attack=1:release=60:level=disabled,aresample=48000[au]" \
-map "[v]" -map "[au]" -c:v libx264 -crf 16 -preset slow -profile:v high -r 24 -c:a aac -b:a 192k -movflags +faststart accordion-v$v.mp4
done
# V1 (the new bank's 35) 0c71f45a-e6d4-4847-89ec-17af1e7f37b0; V2 (the aunt, proven) bc0ad190-86bf-48ab-af9a-d3addb7004e4.
