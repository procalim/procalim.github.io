# v11 = v10 with the punch-ins off and the later shreds moment (3.45 s) for a visible overlap; outputs c11_XX.
# v10 (the owner: «نعم بالضبط ... طبق هذا الأمر على جميع الفيديوهات»): v9 plus Kevin's overlaps. Every slot is rendered
# with HANDLE extra frames at both ends (the move continues at its edge speed), so a cut can become a short overlap
# (dissolve) centred on the cut without moving his cut times. The shreds slot is split at 2.82 s for his in-shot overlap
# (2.70-2.94 s: the moment dissolves into a later moment). Usage: python3 build10.py 0 1 ... -> c10_XX.mp4 (n + 2*HANDLE)
import build9 as b, numpy as np, subprocess, os, sys, cv2
b.SRC=os.environ.get('TAKE','take.mp4'); W,H,FPS=b.W,b.H,b.FPS; HANDLE=3
old=b.SL
SL=[old[0],old[1],(19/24,[('ramp',2.42,2.98,19/24,2.72,0.40)],'shreds A'),(15/24,[('lin',3.45,3.88,15/24)],'shreds B')]+old[3:]
# Kevin's shot and the part of it (u0, u1) whose camera each slot takes
KS=[(0,0,1),(1,0,1),(2,0,0.56),(2,0.56,1)]+[(k,0,1) for k in range(3,31)]
b.SL=SL
TR={1:'Z'}                                   # the potato swell (the cut after slot 1 stays a swell, no overlap)
FOC={}   # v11: no punch-ins inside a setup, so the shared object stays put for the overlaps
NO_OVERLAP={1,9}                             # his two swell cuts: after the skit close and after the clump
CUTS=[0,1.33,2.38,3.92,4.67,6.21,7.0,7.92,8.67,9.96,11.12,11.83,13.83,14.96,15.67,16.67,17.46,17.5,17.92,19.12,20.29,21.88,23.0,25.33,26.04]
def shot_of(t):
    for a,c in zip(CUTS[:-1],CUTS[1:]):
        if a-1e-6<=t<c: return a,c
    return CUTS[-2],CUTS[-1]
def cam(j,n):
    tm,info=b.timemap(j); d=SL[j][0]; scale=d/sum(x[2] for x in info)
    k,u0,u1=KS[j]; z=b.kcum(k); u=np.linspace(u0,u1,n); Kt=np.interp(u*(len(z)-1),np.arange(len(z)),z)
    add=[]
    for i in range(n):
        tau=i/FPS/scale; seg=info[-1]
        for inf in info:
            if tau<inf[1]+inf[2]-1e-9: seg=inf; break
        add.append(Kt[i]/(b.zsrc(tm[i][0])/b.zsrc(seg[3])))
    add=np.array(add); add=add/add.min(); add=np.minimum(add,1.5)
    P=[[float(x),0.0,0.0] for x in add]
    if j in FOC:
        zb,fx,fy=FOC[j]
        for p in P:
            p[0]*=zb; zz=p[0]; lim=0.5-0.5/zz
            p[1]+=zz*W*float(np.clip(0.5-fx,-lim,lim)); p[2]+=zz*H*float(np.clip(0.5-fy,-lim,lim))
    if TR.get(j)=='Z':
        for q,m in enumerate([1.1,1.22,1.38,1.55]): P[n-4+q][0]*=m
    if TR.get(j-1)=='Z':
        for q,m in enumerate([1.3,1.15,1.06,1.02]): P[q][0]*=m
    return P
def handles(tm):
    (s0,v0),(s1,v1)=tm[0],tm[-1]
    d0=1 if len(tm)<2 or tm[1][0]>=s0 else -1; d1=1 if len(tm)<2 or s1>=tm[-2][0] else -1
    a0,c0=shot_of(s0); a1,c1=shot_of(s1)
    pre=[(float(np.clip(s0-d0*v0*k/FPS,a0+0.01,c0-0.01)),v0) for k in range(HANDLE,0,-1)]
    post=[(float(np.clip(s1+d1*v1*k/FPS,a1+0.01,c1-0.01)),v1) for k in range(1,HANDLE+1)]
    return pre+tm+post
def render(j):
    out=f"c11_{j:02d}.mp4"
    if os.path.exists(out): return
    tm,info=b.timemap(j); n=len(tm); P=cam(j,n); T=handles(tm)
    P=[P[0]]*HANDLE+P+[P[-1]]*HANDLE
    F,t0,fr,sw,sh_=b.load(j,T)
    enc=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-',
        '-c:v','libx264','-crf','15','-preset','medium','-pix_fmt','yuv420p',out+'.tmp.mp4'],stdin=subprocess.PIPE)
    for i in range(len(T)):
        src=b.fetch(F,t0,fr,*T[i]); p=P[i]
        q=P[i-1] if i>0 else p
        M=b.M_of(p,sw,sh_); Mp=b.M_of(q,sw,sh_); Ai=cv2.invertAffineTransform(M); d=0
        for c in ((0,0),(W,0),(0,H),(W,H),(W/2,H/2)):
            s_=Ai@np.array([c[0],c[1],1.0]); c2=Mp@np.array([s_[0],s_[1],1.0]); d=max(d,float(np.hypot(*(c2-np.array(c)))))
        if d<=10:
            fr_=cv2.warpAffine(src,M,(W,H),flags=cv2.INTER_LANCZOS4,borderMode=cv2.BORDER_REFLECT_101)
        else:
            low=d>250; k=4 if low else 1; Wl,Hl=W//k,H//k; N=int(min(32 if low else 12,max(2,d/(40 if low else 6))))
            acc=np.zeros((Hl,Wl,3),np.float32)
            for s in range(N):
                a=0.5+0.5*(s+0.5)/N; pa=[q[x]+(p[x]-q[x])*a for x in range(3)]
                acc+=cv2.warpAffine(src,b.M_of(pa,sw,sh_)/k,(Wl,Hl),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_REFLECT_101)
            fr_=(acc/N).clip(0,255).astype(np.uint8)
            if low: fr_=cv2.resize(fr_,(W,H),interpolation=cv2.INTER_CUBIC)
        enc.stdin.write(fr_.tobytes())
    enc.stdin.close(); enc.wait(); os.replace(out+'.tmp.mp4',out)
    print(f"slot {j} {SL[j][2]} n={n} +{2*HANDLE} handles src {T[0][0]:.2f}->{T[-1][0]:.2f}",flush=True)
if __name__=='__main__':
    if sys.argv[1]=='plan':
        Bs=[0]
        for j in range(len(SL)): Bs.append(Bs[-1]+len(b.timemap(j)[0]))
        print(len(SL),'slots',Bs[-1],'frames'); print(Bs)
    else:
        for a in sys.argv[1:]: render(int(a))
