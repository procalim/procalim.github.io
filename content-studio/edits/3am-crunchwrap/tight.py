# The 3 a.m. crunchwrap, 30 s -> 20.6 s (24 Nov; the owner: «الفيديو اوريدي تمام ... ليش ما عم بيكملوا للآخر؟ ... بدي
# أحل المشكلة مش بفيديو ثاني»). The couch story, the grate and squeeze, the folds, the cut and the couch end kept whole;
# the middle (the chopping, the garlic, the long mince, the slow assembly) cut to its key moves on the reel's own cuts.
# Higgsfield sandbox /home/user/mc1; then the overlays as fin.sh (hook frames 0-93; the save and send line from frame
# 407, 16.95 s, the halves). A 8e4a8ace, B f4c924c2: post as Trial Reels to non-followers.
import subprocess, json
SEG=[(0.00,9.00),(13.71,14.50),(16.38,16.88),(17.50,18.92),(19.00,19.46),(20.25,20.62),(21.17,21.50),(21.50,25.58),(25.58,26.60),(27.42,30.04)]
def run(a): subprocess.run(a,check=True)
names=[]
for i,(a,b) in enumerate(SEG):
    n=f"t{i:02d}.mp4"; d=b-a; names.append(n)
    run(["ffmpeg","-v","error","-y","-ss",f"{a}","-i","out.mp4","-t",f"{d:.3f}","-vf","scale=1080:1920:flags=lanczos,setsar=1,fps=24",
         "-af",f"afade=t=in:d=0.02,afade=t=out:st={max(0,d-0.02):.3f}:d=0.02","-c:v","libx264","-crf","12","-preset","fast",
         "-c:a","aac","-b:a","256k","-ar","48000",n])
open("tlist.txt","w").write("".join(f"file '{n}'\n" for n in names))
run(["ffmpeg","-v","error","-y","-f","concat","-safe","0","-i","tlist.txt","-c:v","libx264","-crf","12","-preset","fast","-c:a","aac","-b:a","256k","tcut.mp4"])
