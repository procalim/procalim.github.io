# v7 sound: every segment's own sound at real speed, the key moment's sound on the frame where it happens (ramps),
# reversed parts silent, 0.25 s L-cut tails (none before a reverse), a whoosh into and out of each effect, room tone.
import numpy as np, subprocess, json, build7
SR=48000; FPS=24
x=np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',build7.SRC,'-ac','2','-ar',str(SR),'-f','s16le','-'],
    capture_output=True).stdout,np.int16).astype(np.float32).reshape(-1,2)/32768
B=json.load(open('spec7.json'))['B']; total=B[-1]/FPS; out=np.zeros((int(total*SR)+SR,2),np.float32)
def put(a,b,t,fin=0.03,fout=0.25):
    if b<=a: return
    s=x[int(a*SR):int(min(b,len(x)/SR)*SR)].copy()
    fi=int(fin*SR); fo=int(fout*SR)
    if fi and len(s)>fi: s[:fi]*=np.linspace(0,1,fi)[:,None]
    if fo and len(s)>fo: s[-fo:]*=np.linspace(1,0,fo)[:,None]
    i=int(t*SR)
    if i<0: s=s[-i:]; i=0
    out[i:i+len(s)]+=s[:max(0,len(out)-i)]
for j,(d,segs,name) in enumerate(build7.SL):
    t0=B[j]/FPS; scale=d/sum(s[3] for s in segs); ts=t0
    for q,sg in enumerate(segs):
        o=sg[3]*scale; nxt=segs[q+1] if q+1<len(segs) else None
        tail=0.02 if (nxt is not None and nxt[2]<nxt[1]) else 0.25
        if sg[2]>sg[1]:
            if sg[0]=='lin':
                put(sg[1]-0.03, sg[1]+o+tail, ts-0.03, fout=tail)
            else:
                _,a,b,oo,key,rho=sg; err,tk,vf,w=build7.ramp_solve(a,b,oo,key,rho); tk*=scale
                st=max(a-0.03,key-tk); put(st, key+(o-tk)+tail, ts+tk-(key-st), fout=tail)
        ts+=o
rng=np.random.default_rng(3)
def whoosh(tc,rise=0.30,fall=0.12,gain_db=-21):
    n1=int(rise*SR); n2=int(fall*SR); n=n1+n2; w=rng.standard_normal((n,2)).astype(np.float32)
    W=np.fft.rfft(w,axis=0); f=np.fft.rfftfreq(n,1/SR); W*=((f>700)&(f<9000))[:,None]; w=np.fft.irfft(W,n,axis=0)
    env=np.concatenate([np.linspace(0,1,n1)**2,np.linspace(1,0,n2)**1.5])
    w=w/np.sqrt(np.mean(w**2))*env[:,None]*10**(gain_db/20); i=int((tc-rise)*SR); out[i:i+n]+=w[:len(out)-i]
for j in build7.TR: whoosh(B[j+1]/FPS)
rng2=np.random.default_rng(7); n=len(out); bn=np.zeros((n,2),np.float32); f=np.fft.rfftfreq(n,1/SR)
for c in range(2):
    Wn=np.fft.rfft(rng2.standard_normal(n)); Wn*=1/np.maximum(f,60.0); Wn[f>6000]*=0.3; bn[:,c]=np.fft.irfft(Wn,n).astype(np.float32)
bn/=np.sqrt(np.mean(bn**2))+1e-9; bn*=10**(-37/20); out+=bn; out=out[:int(total*SR)]
(np.clip(out,-1,1)*32767).astype(np.int16).tofile('aud7.raw'); print("ok",total)
