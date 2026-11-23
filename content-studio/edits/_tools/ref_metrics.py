# Measure an edit against its reference (2026-11-23): silence, loudness spread, cut rate, motion, brightness, saturation.
# Usage: python3 ref_metrics.py video.mp4
import numpy as np, subprocess, sys, json
f=sys.argv[1]
# audio
x=np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',f,'-ac','1','-ar','16000','-f','s16le','-'],capture_output=True).stdout,np.int16).astype(float)/32768
h=800; db=np.array([20*np.log10(np.sqrt(np.mean(x[i:i+h]**2))+1e-9) for i in range(0,len(x)-h,h)])
silent=float(np.mean(db<-40)); drops=int(np.sum(np.diff(db)<-18))
clip=int(np.sum(np.abs(x)>0.98))
fl=[]
for i in range(0,len(x)-2048,2048):
    s=np.abs(np.fft.rfft(x[i:i+2048]*np.hanning(2048)))+1e-9; fl.append(np.exp(np.mean(np.log(s)))/np.mean(s))
# video at 10 fps, 90x160
W,H=90,160
v=np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',f,'-vf',f'fps=10,scale={W}:{H}','-pix_fmt','rgb24','-f','rawvideo','-'],capture_output=True).stdout,np.uint8).reshape(-1,H,W,3).astype(float)
g=v.mean(axis=3)
mot=np.abs(np.diff(g,axis=0)).mean(axis=(1,2))
cuts=int(np.sum(mot>25))
r,gg,b=v[...,0].mean(),v[...,1].mean(),v[...,2].mean()
mx=v.max(axis=3); mn=v.min(axis=3); sat=float(np.mean((mx-mn)/(mx+1e-6)))
dur=len(x)/16000
print(json.dumps({"file":f,"dur":round(dur,2),"silent_frac":round(silent,2),"sudden_drops":drops,"clipped_samples":clip,
 "flatness_med":round(float(np.median(fl)),3),"db_p10":round(float(np.percentile(db,10)),1),"db_p90":round(float(np.percentile(db,90)),1),
 "cuts_est":cuts,"cuts_per_s":round(cuts/dur,2),"motion_med":round(float(np.median(mot)),1),"motion_p75":round(float(np.percentile(mot,75)),1),
 "luma":round(float(g.mean()),1),"luma_std":round(float(g.std()),1),"sat":round(sat,3),"R-B":round(float(r-b),1)}))
