# v6 step 1: Kevin's 2D camera per shot, measured from his file (kevin.mp4 in the working folder).
# His 31 cuts (refined to the biggest frame change within 3 frames); per shot, frame-to-frame similarity (zoom, rotation,
# shift) from KLT tracks + RANSAC, twice: the whole frame ("all") and the border only ("border", the action masked out).
# Writes kmotion2.json for anim6.py.
import cv2, numpy as np, json
D=[1.20,0.84,1.43,0.93,0.44,0.33,0.44,0.70,0.93,2.30,0.60,0.84,1.23,0.90,0.44,0.36,0.37,1.14,0.96,0.27,0.30,0.33,0.34,0.56,0.71,0.56,0.47,1.03,1.11,1.53,2.25]
cap=cv2.VideoCapture('kevin.mp4'); fps=cap.get(cv2.CAP_PROP_FPS); G=[]
while True:
    ok,f=cap.read()
    if not ok: break
    G.append(cv2.cvtColor(cv2.resize(f,(360,640),interpolation=cv2.INTER_AREA),cv2.COLOR_BGR2GRAY))
n=len(G); W,H=360,640; T0=np.cumsum([0]+D); cut=[min(n,round(t*fps)) for t in T0]
dd=[0]+[float(np.mean(cv2.absdiff(G[i],G[i-1]))) for i in range(1,n)]
for k in range(1,len(cut)-1):
    c=cut[k]; cut[k]=max(range(max(1,c-3),min(n,c+4)),key=lambda i:dd[i])
mask_b=np.zeros((H,W),np.uint8); mask_b[:,:]=255; mask_b[int(H*.2):int(H*.8),int(W*.2):int(W*.8)]=0
def sim(a,b,mask):
    p=cv2.goodFeaturesToTrack(a,500,0.01,7,mask=mask)
    if p is None or len(p)<12: return None
    q,st,_=cv2.calcOpticalFlowPyrLK(a,b,p,None,winSize=(21,21),maxLevel=3); m=st.ravel()==1
    if m.sum()<12: return None
    M,_=cv2.estimateAffinePartial2D(p[m],q[m],method=cv2.RANSAC,ransacReprojThreshold=1.5)
    return M
out=[]
for k in range(len(cut)-1):
    s0,s1=cut[k],cut[k+1]; Ta=np.eye(3); Tb=np.eye(3); fa=[[1,0,0,0]]; fb=[[1,0,0,0]]
    for i in range(s0+1,s1):
        for T,fr,mk in ((Ta,fa,None),(Tb,fb,mask_b)):
            M=sim(G[i-1],G[i],mk)
            if M is None: M=np.array([[1,0,0],[0,1,0]],float)
            T[:]=np.vstack([M,[0,0,1]])@T
            cx=T@np.array([W/2,H/2,1])
            fr.append([float(np.hypot(T[0,0],T[1,0])),float(np.degrees(np.arctan2(T[1,0],T[0,0]))),float((cx[0]-W/2)/W),float((cx[1]-H/2)/H)])
    out.append({"k":k,"s":s0,"e":s1,"all":fa,"border":fb})
    A=np.array(fa); B=np.array(fb)
    print(f"{k:2d} {s0/fps:5.2f}-{s1/fps:5.2f} n={s1-s0:2d} | all z {A[-1,0]:.3f} rot {A[:,1].min():+.1f}/{A[:,1].max():+.1f} | border z {B[-1,0]:.3f} rot {B[:,1].min():+.1f}/{B[:,1].max():+.1f}")
json.dump({"fps":fps,"cut":cut,"shots":out},open('kmotion2.json','w'))
