# Per-half-second motion and cut check for a finished reel: flags "dead" stretches with no cut and little motion.
# Usage: python3 deadsec.py reel.mp4
import subprocess, sys, numpy as np, imageio_ffmpeg
F=imageio_ffmpeg.get_ffmpeg_exe(); V=sys.argv[1]; W,H=108,192; fps=12
raw=subprocess.run([F,"-v","error","-i",V,"-vf",f"fps={fps},scale={W}:{H},format=gray","-f","rawvideo","-"],capture_output=True).stdout
fr=np.frombuffer(raw,np.uint8).reshape(-1,H,W).astype(float)
d=np.abs(np.diff(fr,axis=0)).mean(axis=(1,2))
cuts=[(i+1)/fps for i,v in enumerate(d) if v>25]
win=int(fps*0.5); rows=[]
for s in range(0,len(d),win):
    seg=d[s:s+win]; rows.append((s/fps, seg.mean(), any(v>25 for v in seg)))
med=np.median([r[1] for r in rows])
print("cuts at:", [round(c,2) for c in cuts])
for t,m,c in rows:
    flag = "DEAD" if (m < 0.35*med and not c) else ("cut" if c else "")
    print(f"{t:5.1f}s  motion {m:5.1f} {'#'*int(m)} {flag}")
