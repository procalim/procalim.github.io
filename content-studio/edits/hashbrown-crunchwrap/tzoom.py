# v8: the take's own camera zoom per frame (two trackers, the whole frame and the border, mean), 1.0 across the take's
# cuts. Writes tzoom.json for build8.py.
import cv2, numpy as np, json, os
cap=cv2.VideoCapture(os.environ.get('TAKE','take.mp4')); G=[]
while True:
    ok,f=cap.read()
    if not ok: break
    G.append(cv2.cvtColor(cv2.resize(f,(360,640),interpolation=cv2.INTER_AREA),cv2.COLOR_BGR2GRAY))
W,H=360,640; mask_b=np.full((H,W),255,np.uint8); mask_b[int(H*.2):int(H*.8),int(W*.2):int(W*.8)]=0
cuts=[round(t*24) for t in (1.33,2.38,3.92,4.67,6.21,7.0,7.92,8.67,9.96,11.12,11.83,13.83,14.96,15.67,16.67,17.46,17.5,17.92,19.12,20.29,21.88,23.0,25.33)]
def sim(a,b,mask):
    p=cv2.goodFeaturesToTrack(a,500,0.01,7,mask=mask)
    if p is None or len(p)<12: return 1.0
    q,st,_=cv2.calcOpticalFlowPyrLK(a,b,p,None,winSize=(21,21),maxLevel=3); m=st.ravel()==1
    if m.sum()<12: return 1.0
    M,_=cv2.estimateAffinePartial2D(p[m],q[m],method=cv2.RANSAC,ransacReprojThreshold=1.5)
    return float(np.hypot(M[0,0],M[1,0])) if M is not None else 1.0
z=[1.0]
for i in range(1,len(G)):
    z.append(1.0 if any(abs(i-c)<=1 for c in cuts) else (sim(G[i-1],G[i],None)+sim(G[i-1],G[i],mask_b))/2)
json.dump({"z":z},open('tzoom.json','w')); print("frames",len(z))
