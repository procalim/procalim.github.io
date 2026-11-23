# v4 (2026-11-23): the 4K base for the Kevin-style edit: normal pieces, the slow-motion hook and bite
# (minterpolate, 0.5x), and Kevin's "going and coming back" (boom: forward a..b, reverse b..r, forward r..c) on the
# shreds throw and the hashbrown landing. Writes inter4k.mp4 and spec4k.json (keys with the swell in/out, blur ranges).
import subprocess, json
SRC='take.mp4'; FPS=24; W,H=2160,3840
SEG=[('n',(0.00,0.55),1.00,1.03,.45,.45,0,0),('slow',(0.55,1.30),1.03,1.12,.40,.40,0,0),('n',(1.40,2.33),1.15,1.30,.35,.30,0,1),
('boom',(2.40,3.00,2.75,3.40),1.00,1.08,.5,.5,1,0),('n',(3.95,4.60),1.05,1.13,.5,.5,0,0),('n',(4.70,5.10),1.10,1.12,.5,.5,0,0),
('n',(5.15,5.50),1.10,1.12,.5,.5,0,0),('n',(5.70,6.10),1.10,1.12,.5,.5,0,0),('n',(6.30,6.90),1.00,1.03,.5,.5,0,0),
('n',(7.00,7.90),1.00,1.15,.4,.4,0,1),('n',(7.95,8.62),1.15,1.15,.4,.6,1,0),('n',(8.70,9.60),1.05,1.12,.55,.55,0,0),
('n',(10.10,10.80),1.00,1.04,.5,.5,0,0),('n',(11.15,11.60),1.08,1.08,.5,.5,0,0),('n',(11.70,12.10),1.08,1.08,.5,.5,0,0),
('n',(12.15,12.45),1.08,1.08,.5,.5,0,0),('n',(12.50,13.05),1.08,1.10,.5,.5,0,0),('n',(13.20,13.60),1.08,1.08,.5,.5,0,0),
('n',(13.95,14.70),1.00,1.06,.55,.55,0,0),('n',(14.96,15.62),1.00,1.08,.35,.35,0,1),('boom',(15.67,16.10,15.85,16.62),1.00,1.10,.5,.5,1,0),
('n',(16.70,17.42),1.05,1.05,.5,.5,0,0),('n',(17.50,17.90),1.05,1.05,.5,.5,0,0),('n',(18.00,18.90),1.12,1.12,.35,.6,0,0),
('n',(19.15,20.25),1.05,1.05,.6,.6,0,0),('n',(20.30,21.60),1.00,1.08,.6,.6,0,0),('n',(21.90,22.60),1.08,1.00,.5,.5,0,0),
('n',(23.00,24.60),1.00,1.06,.5,.5,0,0),('slow',(25.35,26.00),1.12,1.00,.4,.4,0,0)]
fc=[]; parts=[]; B=[0]; S=[]; K=5
def tr(a,b,rev=False):
    s=f"[0:v]trim={a}:{b},setpts=PTS-STARTPTS"
    return s+(",reverse" if rev else "")
for i,(kind,t,z0,z1,y0,y1,sin,sout) in enumerate(SEG):
    if kind=='n':
        fc.append(tr(*t)+f",fps={FPS},setsar=1[v{i}]"); d=t[1]-t[0]
    elif kind=='slow':
        a,b=t; fc.append(tr(a,b)+f",scale=1620:2880,minterpolate=fps=48:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,setpts=2*PTS,scale={W}:{H}:flags=lanczos,fps={FPS},setsar=1[v{i}]"); d=(b-a)*2
    else:
        a,b,r,c=t
        fc.append(tr(a,b)+f",fps={FPS}[v{i}a]"); fc.append(tr(r,b,True)+f",fps={FPS}[v{i}b]"); fc.append(tr(r,c)+f",fps={FPS}[v{i}c]")
        fc.append(f"[v{i}a][v{i}b][v{i}c]concat=n=3:v=1:a=0,setsar=1[v{i}]"); d=(b-a)+(b-r)+(c-r)
    parts.append(f"[v{i}]"); n=round(d*FPS); s0=B[-1]; B.append(s0+n); e=s0+n
    k=[]
    if sin: k+= [[s0,round(z0*1.3,3),.5,y0,0,"step"],[s0+K,z0,.5,y0,0,"ease"]]
    else: k+= [[s0,z0,.5,y0,0,"step"]]
    if sout: k+= [[e-1-K,z1,.5,y1,0,"ease"],[e-1,round(z1*1.35,3),.5,y1,0,"ease"]]
    else: k+= [[e-1,z1,.5,y1,0,"ease"]]
    blur=[]
    if sin: blur+= [[0,1,28],[2,3,12]]
    if sout: blur+= [[n-4,n-3,12],[n-2,n-1,28]]
    S.append({"k":k,"blur":blur})
fc.append("".join(parts)+f"concat=n={len(SEG)}:v=1:a=0[v]")
subprocess.run(['ffmpeg','-v','error','-y','-i',SRC,'-filter_complex',";".join(fc),'-map','[v]','-an','-c:v','libx264',
  '-crf','14','-preset','fast','-r',str(FPS),'inter4k.mp4'],check=True)
tot=int(subprocess.run(['ffprobe','-v','error','-count_frames','-show_entries','stream=nb_read_frames','-select_streams','v','-of','csv=p=0','inter4k.mp4'],capture_output=True,text=True).stdout.strip())
B[-1]=tot; json.dump({"B":B,"S":S,"SEG":SEG},open('spec4k.json','w')); print("frames",tot,B)
# Then: zoom_kevin.py on inter4k.mp4 (4 ranges in parallel), audio4k.py, concat, the grade from 2.958 s, the 4K text
# (meme.mjs with deviceScaleFactor 2), x264 crf 17 at 2160x3840.
