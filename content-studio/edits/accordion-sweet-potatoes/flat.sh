# Accordion Sweet Potatoes, THE FLAT LINE cut (28 Nov). The owner, with the sweet potato read at 15 h (16,410 views, skip
# 28.9%, watch 8 s, 20 shares, 28 saves; the line sliding to about 10% at 15 s): «ضلت مشكلتنا بنسبة الإكمال ... هذا الخط
# لازم يكون مستقيم بالثانية الرابعة أو الخامسة ... بطاطا الأكوريددان اعمل منها نسخة الشخص يشوف الهوك يكمل للنهاية».
# One version, 7.54 s from the 12.04 s Genjutsu (job 4daea37b), no speed change. Out: the plate spin with the burned
# title (0-19), the peeling and trimming (50-83: the prep everyone knows, where the sweet potato lost 20% at 1-2.5 s),
# a blurred repositioning (126-133) and the oven with his face (215-260).
#   orig 20-49   the slice torn open, then the raw potato   out 0.00-1.25   frame one: the food doing something, close
#   orig 84-125  squaring, then the chopsticks + slicing      out 1.25-3.00   the trick lands at 1.92 s
#   orig 134-214 slicing, the block fanning open, the tray, the brush   out 3.00-6.38
#   orig 261-288 the knife in the finished slice (the reveal, the crunch)   out 6.38-7.54; the last frame is the first
#                frame's picture (a gloved hand holding a slice over the plate), so it loops
# Cards: the aunt (the proven hook) 0-1.92; «السر كله بعودين صيني 🥢» 1.92-3.79 (on the chopsticks); «استنى صوت القرمشة
# بالآخر 🔊» 3.79-6.37 (from the fan, the second the sweet potato started sliding: a concrete promise the end pays);
# the save and send line on the reveal at y 300.
# Sound: htdemucs stems of the result. The kitchen sounds (drums + vocals) cut with the picture (8 ms fades); the music
# (other + bass) unbroken from 4.254 s so its own end lands on the video's end; two Epidemic Sound hits: a crisp snap
# (Potato Chips, Snap, Crunch Up In Fingers; -12 dB) on the tear at 0.625 s, and a knife-through-toast crunch on the
# knife at 6.50 s (-10 dB) and 6.92 s (-4 dB). +16 dB into the house limiter (0.80): -14.5 LUFS, peak -0.9 dBFS.
# Higgsfield sandbox /home/user/acc. Media 8cb7ed87-a116-4c4d-b824-b68e290d584a.
set -e
cd /home/user/acc
node /home/user/mc1/biline.mjs w2.png "استنى صوت القرمشة بالآخر 🔊" "Wait for the crunch at the end 🔊"
# h2.png, r1.png, sv.png as fin.sh; stems/ from separate_stems (four) on g.mp4; fx/snap.mp3, fx/toast.mp3 downloaded
V="[0:v]split=4[a][b][c][d];[a]trim=start_frame=20:end_frame=50,setpts=PTS-STARTPTS[s1];[b]trim=start_frame=84:end_frame=126,setpts=PTS-STARTPTS[s2];[c]trim=start_frame=134:end_frame=215,setpts=PTS-STARTPTS[s3];[d]trim=start_frame=261:end_frame=289,setpts=PTS-STARTPTS[s4];[s1][s2][s3][s4]concat=n=4:v=1:a=0[cv];[cv][2:v]overlay=0:0:enable='lt(n,46)'[c1];[c1][3:v]overlay=0:0:enable='between(n,46,90)'[c2];[c2][4:v]overlay=0:0:enable='between(n,91,152)'[c3];[c3][5:v]overlay=0:0:enable='gte(n,153)',format=yuv420p[v]"
F="[6:a][7:a]amix=inputs=2:normalize=0,asplit=4[f1][f2][f3][f4];[f1]atrim=0.8333:2.0833,asetpts=PTS-STARTPTS,afade=t=in:d=0.008,afade=t=out:st=1.242:d=0.008[g1];[f2]atrim=3.5:5.25,asetpts=PTS-STARTPTS,afade=t=in:d=0.008,afade=t=out:st=1.742:d=0.008[g2];[f3]atrim=5.5833:8.9583,asetpts=PTS-STARTPTS,afade=t=in:d=0.008,afade=t=out:st=3.367:d=0.008[g3];[f4]atrim=10.875,asetpts=PTS-STARTPTS,afade=t=in:d=0.008,apad=whole_dur=1.1667[g4];[g1][g2][g3][g4]concat=n=4:v=0:a=1[fol]"
M="[8:a][9:a]amix=inputs=2:normalize=0,atrim=4.254,asetpts=PTS-STARTPTS,apad=whole_dur=7.5417,afade=t=in:d=0.03[mus]"
X="[10:a]atrim=0.10:0.75,asetpts=PTS-STARTPTS,volume=-12dB,adelay=315:all=1[sn];[11:a]asplit[t1][t2];[t1]atrim=0.18:0.60,asetpts=PTS-STARTPTS,afade=t=out:st=0.3:d=0.12,volume=-10dB,adelay=6480:all=1[k1];[t2]atrim=0.18:0.95,asetpts=PTS-STARTPTS,afade=t=out:st=0.6:d=0.17,volume=-4dB,adelay=6897:all=1[k2]"
ffmpeg -v error -y -i g.mp4 -loop 1 -i mask.png -i h2.png -i r1.png -i w2.png -i sv.png \
 -i stems/drums.flac -i stems/vocals.flac -i stems/other.flac -i stems/bass.flac -i fx/snap.mp3 -i fx/toast.mp3 \
 -filter_complex "$V;$F;$M;$X;[fol][mus][sn][k1][k2]amix=inputs=5:normalize=0:duration=first,atrim=0:7.5417,aformat=channel_layouts=stereo[mix]" \
 -map "[v]" -map "[mix]" -c:v libx264 -crf 16 -preset slow -profile:v high -r 24 -c:a pcm_s16le pre.mov
ffmpeg -v error -y -i pre.mov -c:v copy -af "volume=16dB,aresample=192000,alimiter=limit=0.80:attack=1:release=60:level=disabled,aresample=48000" -c:a aac -b:a 192k -movflags +faststart accordion-flat.mp4
