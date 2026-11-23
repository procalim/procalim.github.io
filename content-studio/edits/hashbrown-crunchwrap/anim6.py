# v6 step 3: Kevin's keyframes on our shots (the owner: «هذا شغله كله معمول بالمونتاج ... اعمل زيه»).
# Per slot: his measured 2D camera curve (kmotion2.json: the mean zoom of the two trackers, the smaller rotation and
# shift of the two), a base framing (zoom, focus point, the Dutch angle measured from his lines), an automatic zoom
# margin so no border shows, and true motion blur (sub-frame averaging) when a frame moves fast.
# Inputs: the v5 slot files p5_XX.mp4 (build5.py), spec5.json, kmotion2.json. Usage: python3 anim6.py 0 1 2 ... -> a6_XX.mp4
import cv2, numpy as np, json, subprocess, sys, os
cv2.setNumThreads(1)
W,H=2160,3840; P=os.environ.get('P5','./')
K=json.load(open('kmotion2.json'))['shots']; META=json.load(open('spec5.json'))['META']
# slot: (base zoom, focus x, focus y, Dutch deg (line-angle convention, + = clockwise), shift gain)
BASE={0:(1.50,.5,.42,0,.7),1:(1.50,.5,.42,0,.7),2:(1.05,.5,.40,0,.7),9:(1.0,.5,.45,-17,.5),10:(1.30,.5,.64,0,.7),
      18:(1.0,.5,.42,-10,.5),19:(1.0,.5,.55,-4,.7),24:(1.15,.5,.62,0,.7),31:(1.20,.5,.40,6,.7)}
ROT0={10}   # the waffle-iron shot: the two trackers disagree on rotation (the lid moving), so zoom and shift only
def kcurve(k):
    sh=K[k]; A=np.array(sh['all']); B=np.array(sh['border'])
    z=(A[:,0]+B[:,0])/2
    pick=lambda a,b: np.where(np.abs(a)<np.abs(b),a,b)
    C=np.stack([z,pick(A[:,1],B[:,1]),pick(A[:,2],B[:,2]),pick(A[:,3],B[:,3])],1)
    if len(C)>=5:   # light smoothing: 3-tap median then [1,2,1]; his last frame kept (the swell end)
        M=C.copy()
        for i in range(1,len(C)-1): M[i]=np.median(C[i-1:i+2],0)
        S=M.copy()
        for i in range(1,len(C)-1): S[i]=(M[i-1]+2*M[i]+M[i+1])/4
        S[-1]=C[-1]; C=S
    return C
def sample(C,u):
    p=u*(len(C)-1); i=int(np.floor(p)); j=min(i+1,len(C)-1); w=p-i; return C[i]*(1-w)+C[j]*w
def mat(S,th,f,sh):
    t=np.radians(th); R=np.array([[np.cos(t),-np.sin(t)],[np.sin(t),np.cos(t)]])
    A=S*R; b=np.array([W/2,H/2])+sh-A@f; return np.hstack([A,b[:,None]])
def sreq(th,f,sh):   # the smallest zoom that keeps the source covering the whole output
    t=np.radians(th); RT=np.array([[np.cos(t),np.sin(t)],[-np.sin(t),np.cos(t)]]); need=0
    for q in ((0,0),(W,0),(0,H),(W,H)):
        v=RT@(np.array(q,float)-np.array([W/2,H/2])-sh)
        for ax,lim in ((0,W),(1,H)):
            if v[ax]>0: need=max(need,v[ax]/max(lim-f[ax],1))
            elif v[ax]<0: need=max(need,-v[ax]/max(f[ax],1))
    return need
def params(j):
    n=META[j]['n']
    if j in (0,1):   # slots 0 and 1 are one take (the skit and its slow tail) on his first shot
        k=0; tot=META[0]['n']+META[1]['n']; off=0 if j==0 else META[0]['n']; us=[(off+i)/(tot-1) for i in range(n)]
    else:
        k=j-1; us=[i/(n-1) for i in range(n)] if n>1 else [0]
    C=kcurve(k); zb,fx,fy,dut,g=BASE.get(j,(1.0,.5,.5,0,.7)); f=np.array([fx*W,fy*H]); pr=[]
    for i,u in enumerate(us):
        z,r,x,y=sample(C,u); S=zb*z; th=dut+(0 if j in ROT0 else r); sh=np.array([x*W,y*H])*g
        if j==2 and i>=n-5: S*=1+0.40*((i-(n-6))/5)**2     # the potato swell into the lens (his 1.93-2.04 s)
        pr.append([S,th,sh])
    boost=max(1.0,max(sreq(th,f,sh)/S for S,th,sh in pr))*1.01
    for p in pr: p[0]*=boost
    return pr,f,boost,k
def render(j):
    out=f"a6_{j:02d}.mp4"
    if os.path.exists(out): return
    pr,f,boost,k=params(j); n=len(pr)
    dec=subprocess.Popen(['ffmpeg','-v','error','-i',os.path.join(P,f'p5_{j:02d}.mp4'),'-f','rawvideo','-pix_fmt','rgb24','-'],stdout=subprocess.PIPE)
    enc=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r','24','-i','-',
         '-c:v','libx264','-crf','15','-preset','medium','-pix_fmt','yuv420p',out+'.tmp.mp4'],stdin=subprocess.PIPE)
    prev=None; nb=0
    for i in range(n):
        raw=dec.stdout.read(W*H*3)
        if len(raw)<W*H*3: break
        src=np.frombuffer(raw,np.uint8).reshape(H,W,3)
        S,th,sh=pr[i]; M=mat(S,th,f,sh); N=1
        if prev is not None:   # how far the picture moves on screen since the last frame
            Mp=mat(prev[0],prev[1],f,prev[2]); Ai=cv2.invertAffineTransform(M); d=0
            for q in ((0,0),(W,0),(0,H),(W,H),(W/2,H/2)):
                s=Ai@np.array([q[0],q[1],1.0]); q2=Mp@np.array([s[0],s[1],1.0]); d=max(d,np.hypot(*(q2-np.array(q))))
            if d>10: N=min(12,int(d/6)+1)
        if N==1:
            fr=cv2.warpAffine(src,M,(W,H),flags=cv2.INTER_LANCZOS4,borderMode=cv2.BORDER_REFLECT)
        else:
            nb+=1; acc=np.zeros((H,W,3),np.float32)
            for s in range(N):
                a=0.5+0.5*(s+0.5)/N   # 180-degree shutter: the second half of the move
                acc+=cv2.warpAffine(src,mat(prev[0]+(S-prev[0])*a,prev[1]+(th-prev[1])*a,f,prev[2]+(sh-prev[2])*a),(W,H),
                                    flags=cv2.INTER_CUBIC,borderMode=cv2.BORDER_REFLECT)
            fr=(acc/N).clip(0,255).astype(np.uint8)
        enc.stdin.write(fr.tobytes()); prev=(S,th,sh)
    enc.stdin.close(); enc.wait(); dec.wait(); os.replace(out+'.tmp.mp4',out)
    print(f"slot {j} kevin shot {k} n={n} boost {boost:.2f} zoom {pr[0][0]:.2f}->{pr[-1][0]:.2f} rot {pr[0][1]:+.1f}->{pr[-1][1]:+.1f} blurred {nb}",flush=True)
if __name__=='__main__':
    for a in sys.argv[1:]: render(int(a))
