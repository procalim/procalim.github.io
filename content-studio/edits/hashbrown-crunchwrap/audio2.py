# v3 sound (2026-11-23): the take's own sounds, whole, never chopped: each piece keeps a 0.25 s L-cut tail into the
# next shot; the slow-motion pieces keep their sound at real speed, placed so the hit lands on its frame (no atempo);
# a soft room tone (brown noise, -37 dBFS before the gain) so no silence is left between sounds. Then: +6 dB and the
# peak-only limiter. Run in the Higgsfield sandbox next to build.py and spec.json.
import numpy as np, subprocess, json
SR=48000; FPS=24
x=np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i','take.mp4','-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout,np.int16).astype(np.float32).reshape(-1,2)/32768
SEG=eval(open('build.py').read().split("SEG=",1)[1].split("\nfc=[]")[0])
B=json.load(open('spec.json'))['B']
total=B[-1]/FPS; out=np.zeros((int(total*SR)+SR,2),np.float32)
def put(a,b,t,fin,fout):
    s=x[int(a*SR):int(b*SR)].copy()
    fi=int(fin*SR); fo=int(fout*SR)
    if fi: s[:fi]*=np.linspace(0,1,fi)[:,None]
    if fo: s[-fo:]*=np.linspace(1,0,fo)[:,None]
    i=int(t*SR)
    if i<0: s=s[-i:]; i=0
    out[i:i+len(s)]+=s[:len(out)-i]
ONSET={1:0.75, 28:25.65}   # the catch and the bite, in take seconds
for k,(a,b,sp,*_) in enumerate(SEG):
    t=B[k]/FPS
    if sp==1:
        pre=0.04; post=0.25
        put(max(0,a-pre),min(b+post,len(x)/SR),t-pre,pre,post)
    else:
        on=ONSET[k]; off=(on-a)/sp-(on-a)
        put(a,b,t+off,0.03,0.15)
rng=np.random.default_rng(7); n=len(out)
bn=np.zeros((n,2),np.float32); f=np.fft.rfftfreq(n,1/SR)
for c in range(2):
    W=np.fft.rfft(rng.standard_normal(n)); W*=1/np.maximum(f,60.0); W[f>6000]*=0.3
    bn[:,c]=np.fft.irfft(W,n).astype(np.float32)
bn/=np.sqrt(np.mean(bn**2))+1e-9; bn*=10**(-37/20)
out+=bn; out=out[:int(total*SR)]
(np.clip(out,-1,1)*32767).astype(np.int16).tofile('aud2.raw')
# Grade (the kitchen only, from 2.958 s): eq=contrast=1.12:brightness=-0.04:saturation=1.25:gamma=0.88,
# colorbalance=rs=-0.04:gs=-0.02:bs=0.08:rh=0.03:bh=-0.03
