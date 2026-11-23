# v13 timeline (the owner: «بدي التداخل بين الثواني»): an overlap at every cut, up to 12 frames (0.5 s) centred on the
# cut, the two images lined up when they share a setup. Based on the v11 timeline: hard cuts on action, his two swells, and 13 overlaps where the two shots share a setup (the bowl, the
# tortilla, the grill, the fold, the plate): 8 frames centred on the cut. Inside each overlap the two frames are lined
# up on what they share (SIFT + RANSAC similarity; used when it is reliable), moving from A's framing to B's, so the
# shared object stays put while the rest dissolves (Kevin 2.70-2.94 s). Writes anim13.mp4.
import build13 as v, numpy as np, subprocess, cv2
W,H=v.W,v.H; HD=v.HANDLE; N=len(v.SL)
MATCH=set(range(len(v.SL)-1))-{1,9}     # v13: every cut except his two swells
n=[len(v.b.timemap(j)[0]) for j in range(N)]
def rd(j):
    raw=subprocess.run(['ffmpeg','-v','error','-i',f'c13_{j:02d}.mp4','-f','rawvideo','-pix_fmt','rgb24','-'],capture_output=True).stdout
    return np.frombuffer(raw,np.uint8).reshape(-1,H,W,3)
sift=cv2.SIFT_create(3000)
def register(a,b):   # similarity mapping B onto A (full-res coordinates), or None
    sa=cv2.cvtColor(cv2.resize(a,(540,960)),cv2.COLOR_RGB2GRAY); sb=cv2.cvtColor(cv2.resize(b,(540,960)),cv2.COLOR_RGB2GRAY)
    ka,da=sift.detectAndCompute(sa,None); kb,db=sift.detectAndCompute(sb,None)
    if da is None or db is None: return None,0
    m=cv2.BFMatcher().knnMatch(db,da,k=2); good=[x for x,y in m if x.distance<0.75*y.distance]
    if len(good)<12: return None,len(good)
    pb=np.float32([kb[x.queryIdx].pt for x in good])*4; pa=np.float32([ka[x.trainIdx].pt for x in good])*4
    M,inl=cv2.estimateAffinePartial2D(pb,pa,method=cv2.RANSAC,ransacReprojThreshold=12)
    if M is None: return None,0
    s=np.hypot(M[0,0],M[1,0]); ni=int(inl.sum())
    if ni<25 or not (0.8<s<1.25): return None,ni
    return M,ni
def frac(M,f):   # the similarity M taken a fraction f of the way from identity (log scale, angle, translation)
    s=np.hypot(M[0,0],M[1,0]); th=np.arctan2(M[1,0],M[0,0]); c=np.array([W/2,H/2])
    t=M[:,2]+M[:,:2]@c-c
    sf=s**f; tf=th*f; R=sf*np.array([[np.cos(tf),-np.sin(tf)],[np.sin(tf),np.cos(tf)]])
    return np.hstack([R,(c+t*f-R@c)[:,None]])
def inv(M): return cv2.invertAffineTransform(M)
def warp(img,M): return cv2.warpAffine(img,M,(W,H),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_REFLECT_101)
enc=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r','24','-i','-',
    '-c:v','libx264','-crf','15','-preset','medium','-pix_fmt','yuv420p','anim13.mp4'],stdin=subprocess.PIPE)
hw=[(min(6,n[j]//2,n[j+1]//2) if j in MATCH else 0) for j in range(N-1)]   # half a second, less around quick inserts
cur=rd(0); tot=0; log=[]
def get(F,i): return F[int(np.clip(i,0,len(F)-1))]
for j in range(N):
    hin=hw[j-1] if j>0 else 0; hout=hw[j] if j<N-1 else 0
    nxt=rd(j+1) if j<N-1 else None
    for i in range(hin, n[j]-hout):
        enc.stdin.write(cur[HD+i].tobytes()); tot+=1
    if hout:
        M,ni=register(cur[HD+n[j]-1],nxt[HD]); log.append((j,ni,None if M is None else round(float(np.hypot(M[0,0],M[1,0])),3)))
        for d in range(-hout,hout):
            a=(d+hout+0.5)/(2*hout)
            A=get(cur,HD+n[j]+d); B=get(nxt,HD+d)
            if M is not None:
                A=warp(A,inv(frac(M,a)))        # A drifts towards B's framing
                B=warp(B,frac(M,1-a))           # B starts on A's framing and relaxes to its own
            enc.stdin.write((A.astype(np.float32)*(1-a)+B.astype(np.float32)*a).astype(np.uint8).tobytes()); tot+=1
    cur=nxt
enc.stdin.close(); enc.wait(); print("frames",tot); print("overlaps (cut after slot, inliers, scale):",log)
