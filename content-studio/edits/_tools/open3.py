# Opening check (2026-11-18): sharp sound onsets in 0-3 s (0.1 s windows, a rise of 6 dB or more) and picture motion
# (mean frame difference at 48x84, 12 fps). 66 reels: 6+ onsets median skip 33.7%, 2 or fewer 47.7%; motion low third
# 32.5%, high third 46.8% (research/opening-sound-audit-2026-11-17.md addendum). Sandbox copy: /home/user/rv/open3.py
import subprocess, numpy as np, sys
for p in sys.argv[1:]:
    a=np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',p,'-ac','1','-ar','16000','-f','f32le','-'],capture_output=True).stdout,np.float32)
    w=1600; db=np.array([20*np.log10(np.sqrt(np.mean(a[i*w:(i+1)*w]**2))+1e-9) for i in range(len(a)//w)])
    on=np.where(np.diff(db[:30])>=6)[0]+1
    v=np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',p,'-t','6','-vf','fps=12,scale=48:84,format=gray','-f','rawvideo','-'],capture_output=True).stdout,np.uint8)
    v=v.reshape(-1,84,48).astype(float); md=np.abs(np.diff(v,axis=0)).mean((1,2))
    print(f"{p.split('/')[-1]:45s} onsets03={len(on)} at {[round(i/10,1) for i in on]} motion03={md[:36].mean():.1f} motion13={md[12:36].mean():.1f}")
