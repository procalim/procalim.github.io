# v8 = v7 with the camera matched to Kevin (the owner: «مش نفس الإيقاع الكاميرا»): the net zoom per shot (the take's
# own camera after the time map x the added zoom) follows his measured zoom curve; only his two swells (2.04, 7.24 s).
# Needs tzoom.json (tzoom.py). Below, the v7 header:
# v7 (the owner: «القطع عالحركة، تسريع وتبطيء، إفكت بين اللقطات، حركة الكاميرا جوا اللقطة», on «الفيديو الأصلي كما
# ولّدته»): the take's own framing and colours (no crop base, no Dutch angle, no grade), Kevin's 31 shot lengths.
# - Cut on action: every slot starts and ends mid-move (the take's motion read per frame with optical flow, tmotion).
# - Speed ramps: fast, slow to rho of the speed on the key moment (the toss, the drop, the landing, the pour), fast again;
#   slow parts from a motion-interpolated window (72 fps at 1620x2880), fast parts blended over a 180-degree shutter.
# - Effects at 10 cuts (TR): a zoom-blur ('Z') or a whip in the move's direction with a covering zoom (no mirrored edge).
# - Camera inside the shot: Kevin's measured push/pull per shot (kmotion2.json), normalised to start from the full frame.
# Slot: (out_dur, [segments], name). Segment: ('lin', a, b, out) or ('ramp', a, b, out, key, rho); a > b plays backwards.
# Higgsfield sandbox: python3 build7.py plan (writes spec7.json); python3 build7.py 0 1 2 ... -> b7_XX.mp4 (resumable)
import cv2, numpy as np, json, subprocess, sys, os
cv2.setNumThreads(1)
W,H=2160,3840; FPS=24; IF=72; SRC=os.environ.get('TAKE','take.mp4')
SL=[
(1.20,[('ramp',0.00,1.05,1.20,0.50,0.35)],'skit toss'),
(0.84,[('ramp',1.34,2.30,0.84,1.50,0.40)],'skit close'),
(1.43,[('ramp',2.42,3.88,1.43,3.05,0.35)],'shreds'),
(0.93,[('ramp',3.93,4.66,0.93,4.25,0.50)],'squeeze'),
(0.44,[('lin',4.68,4.98,0.44)],'egg'),
(0.33,[('lin',5.10,5.40,0.33)],'cornstarch'),
(0.44,[('lin',5.66,6.14,0.44)],'spices'),
(0.70,[('lin',6.24,6.98,0.70)],'fork'),
(0.93,[('ramp',7.01,7.90,0.93,7.30,0.40)],'clump'),
(2.30,[('ramp',7.93,8.62,1.15,8.21,0.35),('lin',8.70,9.90,1.15)],'grill'),
(0.60,[('lin',10.22,10.82,0.60)],'slit'),
(0.84,[('ramp',11.13,11.82,0.84,11.20,0.35)],'chicken'),
(1.23,[('ramp',11.84,12.55,1.23,11.92,0.50)],'lettuce'),
(0.90,[('lin',12.55,13.15,0.90)],'sauce'),
(0.44,[('ramp',13.20,13.62,0.44,13.30,0.50)],'cheese'),
(0.36,[('lin',13.85,14.21,0.36)],'lid'),
(0.37,[('lin',14.30,14.67,0.37)],'waffle'),
(1.14,[('ramp',14.97,15.66,1.14,15.33,0.40)],'flip'),
(0.96,[('lin',15.67,15.84,0.17),('lin',15.84,15.72,0.12),('ramp',15.72,16.30,0.67,15.85,0.35)],'landing boomerang'),
(0.27,[('lin',16.84,17.11,0.27)],'fold 1'),
(0.30,[('lin',17.11,17.41,0.30)],'fold 2'),
(0.33,[('lin',17.51,17.84,0.33)],'skillet'),
(0.34,[('lin',17.95,18.29,0.34)],'lift'),
(0.56,[('lin',18.29,18.74,0.56)],'to the plate'),
(0.71,[('ramp',18.48,18.98,0.71,18.56,0.50)],'on the plate'),
(0.56,[('ramp',19.36,19.78,0.56,19.54,0.50)],'knife'),
(0.47,[('lin',19.80,20.22,0.47)],'knife through'),
(1.03,[('lin',20.32,21.36,1.03)],'pull apart'),
(1.11,[('ramp',21.90,22.99,1.11,22.20,0.40)],'pepper'),
(1.53,[('lin',23.02,24.55,1.53)],'hero'),
(1.42,[('lin',25.33,26.02,1.42)],'bite'),
]
# v9 (the owner: «شوف التنقل»): Kevin cuts between a wide and a close frame of the same action (12.21, 16.95, 18.18,
# 19.45, 20.95 s). Where our consecutive slots share a setup, every second one is a punch-in (zoom, focus x, focus y).
FOC={5:(1.45,.50,.45),11:(1.45,.38,.38),13:(1.40,.72,.45),16:(1.45,.50,.53),20:(1.40,.60,.50),23:(1.40,.50,.55),26:(1.45,.45,.55)}
TR={1:'Z'}   # v8: only his swells (the potato at 2.04 here; the clump at 7.24 comes from his own curve)
def ramp_solve(a,b,out,key,rho):
    # unknowns: the dip centre tk and width w; the fast speed vf follows from the source length. Prefer vf near 1.4.
    t=np.linspace(0,out,400); best=None
    for w in np.linspace(0.05,max(0.06,0.5*out),24):
        for tk in np.linspace(0.06*out,0.94*out,45):
            h=1-(1-rho)*np.exp(-((t-tk)/w)**2)
            I=np.concatenate([[0],np.cumsum((h[1:]+h[:-1])/2*np.diff(t))]); vf=(b-a)/I[-1]
            err=abs(a+vf*np.interp(tk,t,I)-key)
            sc=err*20+abs(vf-1.4)+(5 if vf>2.4 else 0)
            if best is None or sc<best[-1]: best=(err,tk,vf,w,sc)
    return best[:4]
def timemap(j):
    d,segs,_=SL[j]; n=round(d*FPS); outs=[]; t0=0; info=[]
    for s in segs:
        if s[0]=='lin':
            _,a,b,o=s; info.append(('lin',t0,o,a,b,(b-a)/o))
        else:
            _,a,b,o,k,rho=s; err,tk,vf,w=ramp_solve(a,b,o,k,rho); info.append(('ramp',t0,o,a,b,vf,tk,w,rho,k,err))
        t0+=s[3]
    scale=d/t0
    for i in range(n):
        tau=i/FPS/scale
        for inf in info:
            if tau<inf[1]+inf[2]-1e-9 or inf is info[-1]: break
        u=min(max(tau-inf[1],0),inf[2])
        if inf[0]=='lin':
            s=inf[3]+inf[5]*u; v=abs(inf[5])
        else:
            _,ts,o,a,b,vf,tk,w,rho,k,err=inf; tt=np.linspace(0,u,60) if u>0 else np.array([0.0])
            h=1-(1-rho)*np.exp(-((tt-tk)/w)**2); s=a+vf*(np.trapezoid(h,tt) if u>0 else 0); v=vf*h[-1]
        outs.append((float(s),float(v)))
    return outs,info
K=json.load(open('kmotion2.json'))['shots']
ZS=np.cumsum(np.log(np.array(json.load(open('tzoom.json'))['z'])))   # the take's own cumulative zoom (log)
def zsrc(t): return float(np.exp(np.interp(t*FPS,np.arange(len(ZS)),ZS)))
def kcum(j):
    sh=K[j]; return (np.array(sh['all'])[:,0]+np.array(sh['border'])[:,0])/2
def cam(j,n):
    # the net zoom (the take's own camera after the time map x the added zoom) follows Kevin's zoom curve for this
    # shot; the added zoom never goes below the full frame.
    tm,info=timemap(j); d=SL[j][0]; scale=d/sum(x[2] for x in info)
    z=kcum(j); u=np.linspace(0,1,n); Kt=np.interp(u*(len(z)-1),np.arange(len(z)),z)
    add=[]
    for i in range(n):
        tau=i/FPS/scale; seg=info[-1]
        for inf in info:
            if tau<inf[1]+inf[2]-1e-9: seg=inf; break
        add.append(Kt[i]/(zsrc(tm[i][0])/zsrc(seg[3])))
    add=np.array(add); add=add/add.min(); add=np.minimum(add,1.5)
    P=[[float(x),0.0,0.0] for x in add]
    if j in FOC:   # v9: the punch-in angle (his wide/close cuts inside one setup), framed on the action
        zb,fx,fy=FOC[j]
        for p in P:
            p[0]*=zb; z=p[0]; lim=0.5-0.5/z
            p[1]+=z*W*float(np.clip(0.5-fx,-lim,lim)); p[2]+=z*H*float(np.clip(0.5-fy,-lim,lim))
    if TR.get(j)=='Z':
        for q,m in enumerate([1.1,1.22,1.38,1.55]): P[n-4+q][0]*=m
    if TR.get(j-1)=='Z':
        for q,m in enumerate([1.3,1.15,1.06,1.02]): P[q][0]*=m
    return P
def M_of(p,sw,sh_):   # source sw x sh_ -> output W x H, zoom about the centre, shift in output px
    S=p[0]*W/sw; return np.array([[S,0,W/2+p[1]-S*sw/2],[0,S,H/2+p[2]-S*sh_/2]],np.float64)
def load(j,tm):
    ss=[s for s,v in tm]; lo=max(0,min(ss)-0.08); hi=max(ss)+0.06
    if any(v<0.9 for s,v in tm):
        vf=f"trim=start={lo}:end={hi},setpts=PTS-STARTPTS,scale=1620:2880,minterpolate=fps={IF}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1"; w,h,fr=1620,2880,IF
    else:
        vf=f"trim=start={lo}:end={hi},setpts=PTS-STARTPTS"; w,h,fr=W,H,FPS
    raw=subprocess.run(['ffmpeg','-v','error','-i',SRC,'-vf',vf,'-f','rawvideo','-pix_fmt','rgb24','-'],capture_output=True).stdout
    return np.frombuffer(raw,np.uint8).reshape(-1,h,w,3),np.ceil(lo*FPS-1e-6)/FPS,fr,w,h
def fetch(F,t0,fr,s,v):
    x=(s-t0)*fr; span=max(1.0,v*fr/(2*FPS))   # 180-degree shutter over the source
    i1=int(np.clip(round(x),0,len(F)-1)); i0=int(np.clip(round(x-span+1),0,len(F)-1))
    if i1-i0<=0: return F[i1]
    return np.mean(F[i0:i1+1].astype(np.float32),0).astype(np.uint8)
def render(j):
    out=f"b9_{j:02d}.mp4"
    if os.path.exists(out): return
    tm,info=timemap(j); n=len(tm); P=cam(j,n); F,t0,fr,sw,sh_=load(j,tm)
    enc=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-',
        '-c:v','libx264','-crf','15','-preset','medium','-pix_fmt','yuv420p',out+'.tmp.mp4'],stdin=subprocess.PIPE)
    for i in range(n):
        src=fetch(F,t0,fr,*tm[i]); p=P[i]
        q=P[i-1] if i>0 else [2*P[0][k]-P[1][k] for k in range(3)] if n>1 else p
        M=M_of(p,sw,sh_); Mp=M_of(q,sw,sh_); Ai=cv2.invertAffineTransform(M); d=0
        for c in ((0,0),(W,0),(0,H),(W,H),(W/2,H/2)):
            s_=Ai@np.array([c[0],c[1],1.0]); c2=Mp@np.array([s_[0],s_[1],1.0]); d=max(d,float(np.hypot(*(c2-np.array(c)))))
        if d<=10:
            fr_=cv2.warpAffine(src,M,(W,H),flags=cv2.INTER_LANCZOS4,borderMode=cv2.BORDER_REFLECT_101)
        else:   # motion blur: sub-frame samples over the move (at quarter size for the big effect moves)
            low=d>250; k=4 if low else 1; Wl,Hl=W//k,H//k; N=int(min(32 if low else 12,max(2,d/(40 if low else 6))))
            acc=np.zeros((Hl,Wl,3),np.float32)
            for s in range(N):
                a=0.5+0.5*(s+0.5)/N; pa=[q[x]+(p[x]-q[x])*a for x in range(3)]
                acc+=cv2.warpAffine(src,M_of(pa,sw,sh_)/k,(Wl,Hl),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_REFLECT_101)
            fr_=(acc/N).clip(0,255).astype(np.uint8)
            if low: fr_=cv2.resize(fr_,(W,H),interpolation=cv2.INTER_CUBIC)
        enc.stdin.write(fr_.tobytes())
    enc.stdin.close(); enc.wait(); os.replace(out+'.tmp.mp4',out)
    vs=[v for s,v in tm]
    print(f"slot {j} {SL[j][2]} n={n} speed {min(vs):.2f}-{max(vs):.2f} src {tm[0][0]:.2f}->{tm[-1][0]:.2f}",flush=True)
if __name__=='__main__':
    if sys.argv[1]=='plan':
        B=[0]
        for j in range(len(SL)):
            tm,info=timemap(j); vs=[v for s,v in tm]; B.append(B[-1]+len(tm))
            print(j,SL[j][2].ljust(18),'n',len(tm),'speed %.2f-%.2f'%(min(vs),max(vs)),'src %.2f->%.2f'%(tm[0][0],tm[-1][0]))
        print('B',B); json.dump({"B":B},open('spec7.json','w'))
    else:
        for a in sys.argv[1:]: render(int(a))
