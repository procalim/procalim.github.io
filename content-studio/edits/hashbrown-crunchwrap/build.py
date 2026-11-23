# The Hashbrown Crunchwrap, Kevin-style cut (2026-11-23): 29 pieces of take 8790f4de, the hook toss and the bite in
# slow motion (minterpolate, 0.5x), then zoom_pro.py on inter.mov with the spec this writes. Run in the Higgsfield sandbox.
import subprocess, json
SRC='take.mp4'; FPS=24
# (start s, end s, speed, zoom0, zoom1, cx0, cx1, cy0, cy1, blur) -- Kevin's motion: a slow push on almost every shot
SEG=[(0.00,0.55,1,1.00,1.03,.5,.5,.45,.45,0),(0.55,1.30,.5,1.03,1.12,.5,.5,.40,.40,0),(1.40,2.33,1,1.15,1.30,.5,.5,.35,.30,0),
(2.40,3.80,1,1.00,1.08,.5,.5,.5,.5,1),(3.95,4.60,1,1.05,1.13,.5,.5,.5,.5,0),(4.70,5.10,1,1.10,1.12,.5,.5,.5,.5,0),
(5.15,5.50,1,1.10,1.12,.5,.5,.5,.5,0),(5.70,6.10,1,1.10,1.12,.5,.5,.5,.5,0),(6.30,6.90,1,1.00,1.03,.5,.5,.5,.5,0),
(7.00,7.90,1,1.00,1.15,.5,.5,.4,.4,0),(7.95,8.62,1,1.15,1.15,.5,.5,.4,.6,0),(8.70,9.60,1,1.05,1.12,.5,.5,.55,.55,0),
(10.10,10.80,1,1.00,1.04,.5,.5,.5,.5,1),(11.15,11.60,1,1.08,1.08,.5,.5,.5,.5,0),(11.70,12.10,1,1.08,1.08,.5,.5,.5,.5,0),
(12.15,12.45,1,1.08,1.08,.5,.5,.5,.5,0),(12.50,13.05,1,1.08,1.10,.5,.5,.5,.5,0),(13.20,13.60,1,1.08,1.08,.5,.5,.5,.5,0),
(13.95,14.70,1,1.00,1.06,.5,.5,.55,.55,0),(14.96,15.62,1,1.00,1.08,.5,.5,.35,.35,0),(15.67,16.62,1,1.00,1.10,.5,.5,.5,.5,1),
(16.70,17.42,1,1.05,1.05,.5,.5,.5,.5,0),(17.50,17.90,1,1.05,1.05,.5,.5,.5,.5,0),(18.00,18.90,1,1.12,1.12,.5,.5,.35,.6,0),
(19.15,20.25,1,1.05,1.05,.5,.5,.6,.6,1),(20.30,21.60,1,1.00,1.08,.5,.5,.6,.6,0),(21.90,22.60,1,1.08,1.00,.5,.5,.5,.5,0),
(23.00,24.60,1,1.00,1.06,.5,.5,.5,.5,0),(25.35,26.00,.5,1.12,1.00,.5,.5,.4,.4,0)]
fc=[]; parts=[]; B=[0]; S=[]
for i,(a,b,sp,z0,z1,x0,x1,y0,y1,bl) in enumerate(SEG):
    v=f"[0:v]trim={a}:{b},setpts=PTS-STARTPTS,scale=1440:2560:flags=lanczos"
    au=f"[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS"
    if sp!=1:
        v+=f",minterpolate=fps={int(FPS/sp)}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,setpts={1/sp}*PTS"
        au+=f",atempo={sp}"
    v+=f",fps={FPS},setsar=1[v{i}]"
    d=(b-a)/sp
    au+=f",afade=t=in:d=0.012,afade=t=out:st={d-0.02:.3f}:d=0.02[a{i}]"
    fc+= [v,au]; parts.append(f"[v{i}][a{i}]")
    n=round(d*FPS); s0=B[-1]; B.append(s0+n)
    S.append({"k":[[s0,z0,x0,y0,0,"step"],[s0+n-1,z1,x1,y1,0,"ease"]],"bl":bool(bl)})
fc.append("".join(parts)+f"concat=n={len(SEG)}:v=1:a=1[v][a]")
subprocess.run(['ffmpeg','-v','error','-y','-i',SRC,'-filter_complex',";".join(fc),'-map','[v]','-map','[a]','-c:v','libx264',
  '-crf','14','-preset','fast','-r',str(FPS),'-c:a','pcm_s16le','inter.mov'],check=True)
r=subprocess.run(['ffprobe','-v','error','-count_frames','-show_entries','stream=nb_read_frames','-select_streams','v','-of','csv=p=0','inter.mov'],capture_output=True,text=True).stdout.strip()
tot=int(r); B[-1]=tot
json.dump({"B":B,"S":S},open('spec.json','w'))
print("frames",tot,"bounds",B)
# Then: python3 zoom_pro.py inter.mov zp.mp4 spec.json; the sound +8.5 dB with the peak-only limiter (limit 0.75);
# the text: t1 frames 0-70, t2 223-290, t3 from 397 (meme.mjs 46 px).
