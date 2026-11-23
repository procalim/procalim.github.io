# v6 step 2: Kevin's look as two 3D LUTs (skit.cube, kitchen.cube): part of his luminance curve (CDF match on L), his
# colour cast per brightness zone (Lab a/b), and for the kitchen his blue-violet backlight as a split tone (shadows and
# low mids toward blue-violet, highlights warm; saturated food protected). Needs kevin.mp4 and the v5 slot files p5_XX.mp4.
import cv2, numpy as np
def frames(path, t0, t1, fps, step):
    cap=cv2.VideoCapture(path); i=0; out=[]
    while True:
        ok,f=cap.read()
        if not ok: break
        t=i/fps; i+=1
        if t0<=t<t1 and i%step==0: out.append(cv2.resize(f,(270,480),interpolation=cv2.INTER_AREA))
    return out
def lab(fr): return np.concatenate([cv2.cvtColor(f.astype(np.float32)/255,cv2.COLOR_BGR2Lab).reshape(-1,3) for f in fr])
def build(kfr, ufr, name, aL=0.6, aC=0.7):
    K=lab(kfr); U=lab(ufr)
    qs=np.linspace(0,1,257); kq=np.quantile(K[:,0],qs); uq=np.quantile(U[:,0],qs)
    bins=np.linspace(0,100,11); sa=[];sb=[];cen=[]
    for lo,hi in zip(bins[:-1],bins[1:]):
        mk=(K[:,0]>=lo)&(K[:,0]<hi); mu=(U[:,0]>=lo)&(U[:,0]<hi)
        ok=mk.sum()>200 and mu.sum()>200
        sa.append(K[mk,1].mean()-U[mu,1].mean() if ok else 0); sb.append(K[mk,2].mean()-U[mu,2].mean() if ok else 0); cen.append((lo+hi)/2)
    N=33; g=np.linspace(0,1,N); R,G,B=np.meshgrid(g,g,g,indexing='ij')
    rgb=np.stack([R,G,B],-1).reshape(-1,3).astype(np.float32)
    L=cv2.cvtColor(rgb[None,:,::-1],cv2.COLOR_BGR2Lab)[0]
    L2=L.copy(); L2[:,0]=L[:,0]*(1-aL)+np.interp(L[:,0],uq,kq)*aL
    L2[:,1]+=aC*np.interp(L2[:,0],cen,sa); L2[:,2]+=aC*np.interp(L2[:,0],cen,sb)
    if name=='kitchen':
        x=L2[:,0]; w=np.clip((x-2)/10,0,1)*np.clip((42-x)/22,0,1); ch=np.sqrt(L2[:,1]**2+L2[:,2]**2); keep=np.clip(1-ch/45,0.25,1)
        L2[:,2]+=-16*w*keep; L2[:,1]+=6*w*keep; L2[:,0]+=3*w
        hw=np.clip((x-60)/25,0,1); L2[:,2]+=4*hw; L2[:,1]+=1.5*hw
    o=cv2.cvtColor(L2[None].astype(np.float32),cv2.COLOR_Lab2BGR)[0][:,::-1].clip(0,1).reshape(N,N,N,3)
    with open(name+'.cube','w') as fh:
        fh.write(f"LUT_3D_SIZE {N}\n")
        for b in range(N):
            for gg in range(N):
                for r in range(N): fh.write("%.6f %.6f %.6f\n"%tuple(o[r,gg,b]))
ksk=frames('kevin.mp4',0,2.0,29.97,3); kki=frames('kevin.mp4',2.1,23.5,29.97,6); usk=[]; uki=[]
for j in range(32): (usk if j<=2 else uki).extend(frames(f'p5_{j:02d}.mp4',0,99,24,4))
build(ksk,usk,'skit',aL=0.25,aC=0.6); build(kki,uki,'kitchen',aL=0.6,aC=0.7)
