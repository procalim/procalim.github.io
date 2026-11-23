# The ice cubes cut (2026-11-23): 17 pieces of take 0cd8c165, only dead frames out; run in the Higgsfield sandbox.
import subprocess
SRC='/home/user/ice/take/take.mp4'
SEG=[(0,70),(72,88),(111,135),(138,162),(181,202),(211,226),(245,258),(274,294),(299,328),(339,363),
     (375,401),(403,425),(426,450),(451,467),(468,528),(575,602),(646,718)]
LOUDER={13:-4.0}  # the glass slide is louder than the shatter in the take
fc=[];vl=[]
for i,(a,b) in enumerate(SEG):
    t0,t1=a/24,b/24; d=t1-t0
    fc.append(f"[0:v]trim=start_frame={a}:end_frame={b},setpts=PTS-STARTPTS[v{i}]")
    vol=f",volume={LOUDER[i]}dB" if i in LOUDER else ""
    fc.append(f"[0:a]atrim={t0:.5f}:{t1:.5f},asetpts=PTS-STARTPTS{vol},afade=t=in:d=0.015,afade=t=out:st={d-0.02:.4f}:d=0.02[a{i}]")
    vl.append(f"[v{i}][a{i}]")
fc.append("".join(vl)+f"concat=n={len(SEG)}:v=1:a=1[v][a]")
subprocess.run(['ffmpeg','-v','error','-y','-i',SRC,'-filter_complex',";".join(fc),'-map','[v]','-map','[a]',
  '-c:v','libx264','-crf','12','-preset','fast','-r','24','-c:a','pcm_s16le','cut.mov'],check=True)
print(sum(b-a for a,b in SEG))
