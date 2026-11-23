# v5 sound: every piece's own sound at real speed from its slot start (reversed parts silent, their tail runs on),
# 0.25 s L-cut tails, a soft whoosh into each swell-out cut (Kevin's rising high band before his transitions),
# a brown-noise room tone at -37 dBFS. Reads spec5.json from build5.py; writes aud5.raw (s16le, 48 kHz, stereo).
import numpy as np, subprocess, json
SR=48000; FPS=24
x=np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i','take.mp4','-ac','2','-ar',str(SR),'-f','s16le','-'],
                capture_output=True).stdout,np.int16).astype(np.float32).reshape(-1,2)/32768
sp=json.load(open('spec5.json')); B=sp['B']; META=sp['META']; S=sp['S']
total=B[-1]/FPS; out=np.zeros((int(total*SR)+SR,2),np.float32)
def put(a,b,t,fin,fout,g=1.0):
    s=x[int(a*SR):int(min(b,len(x)/SR)*SR)].copy()*g
    fi=int(fin*SR); fo=int(fout*SR)
    if fi and len(s)>fi: s[:fi]*=np.linspace(0,1,fi)[:,None]
    if fo and len(s)>fo: s[-fo:]*=np.linspace(1,0,fo)[:,None]
    i=int(t*SR)
    if i<0: s=s[-i:]; i=0
    out[i:i+len(s)]+=s[:max(0,len(out)-i)]
for k,m in enumerate(META):
    t=B[k]/FPS; sp_=m['speed']
    for (a,b,r) in m['subs']:
        if not r:
            put(max(0,a-0.03),b+0.25,t-0.03,0.03,0.25)
        t+=(b-a)/sp_
rng=np.random.default_rng(3)
def whoosh(tend,dur=0.32,gain_db=-22):
    n=int(dur*SR); w=rng.standard_normal((n,2)).astype(np.float32)
    W=np.fft.rfft(w,axis=0); f=np.fft.rfftfreq(n,1/SR); W*=((f>800)&(f<9000))[:,None]; w=np.fft.irfft(W,n,axis=0)
    env=np.linspace(0,1,n)**2; env[-int(0.04*SR):]*=np.linspace(1,0,int(0.04*SR))
    w=w/np.sqrt(np.mean(w**2))*env[:,None]*10**(gain_db/20); i=int((tend-dur+0.06)*SR); out[i:i+n]+=w[:len(out)-i]
for k,s in enumerate(S):
    if s['blur'] and s['blur'][-1][2]>=30 and s['blur'][-1][0]>2: whoosh(B[k+1]/FPS)
rng2=np.random.default_rng(7); n=len(out); bn=np.zeros((n,2),np.float32); f=np.fft.rfftfreq(n,1/SR)
for c in range(2):
    Wn=np.fft.rfft(rng2.standard_normal(n)); Wn*=1/np.maximum(f,60.0); Wn[f>6000]*=0.3
    bn[:,c]=np.fft.irfft(Wn,n).astype(np.float32)
bn/=np.sqrt(np.mean(bn**2))+1e-9; bn*=10**(-37/20)
out+=bn; out=out[:int(total*SR)]
(np.clip(out,-1,1)*32767).astype(np.int16).tofile('aud5.raw'); print("ok",total)
