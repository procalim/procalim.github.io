# v5 (2026-11-23): Kevin's timeline slot by slot. 32 slots at his shot lengths (his 31 shots plus the hook's slow tail);
# our pieces fit to each slot (speed < 0.95 -> motion interpolation at 1620x2880, then lanczos to 4K).
# The swell out of slot 2 (ends 2.04 s) and slot 9 (ends 7.25 s), the swell in on slot 3, the zoom ramp into 3.46 s,
# the boomerang on the shreds and on the hashbrown landing (forward until it almost lands, back up, lands).
# One file per slot, resumable and parallel (a sandbox replacement kills long single renders).
# Higgsfield sandbox: NJ=4 python3 build5.py  -> p5_XX.mp4, inter5.mp4, spec5.json; then run5.sh
import subprocess, json, os
from concurrent.futures import ThreadPoolExecutor
SRC='take.mp4'; FPS=24; W,H=2160,3840
# slot: (kevin_dur, [(a, b, reversed)...], (z0, z1, cy0, cy1, swell_in, swell_out, ramp_in), name)
SL=[
(0.54,[(0.00,0.55,0)],(1.00,1.00,.45,.45,0,0,0),'skit wide'),
(0.66,[(0.55,0.88,0)],(1.00,1.06,.45,.45,0,0,0),'skit slow tail'),
(0.84,[(1.40,2.24,0)],(1.10,1.30,.35,.30,0,1,0),'skit close, swell out'),
(1.43,[(2.40,2.95,0),(2.70,2.95,1),(2.70,3.33,0)],(1.00,1.06,.5,.5,1,0,1),'shreds boomerang, zoom into the cut'),
(0.93,[(3.92,4.66,0)],(1.00,1.08,.5,.5,0,0,0),'squeeze'),
(0.44,[(4.70,5.14,0)],(1.10,1.10,.5,.5,0,0,0),'egg'),
(0.33,[(5.17,5.50,0)],(1.10,1.10,.5,.5,0,0,0),'cornstarch'),
(0.44,[(5.68,6.12,0)],(1.10,1.10,.5,.5,0,0,0),'spices'),
(0.70,[(6.25,6.95,0)],(1.00,1.02,.5,.5,0,0,0),'fork'),
(0.93,[(7.00,7.90,0)],(1.00,1.15,.4,.4,0,1,0),'clump to the lens, swell out'),
(2.30,[(7.95,8.65,0),(8.70,9.95,0)],(1.10,1.10,.4,.6,0,0,0),'grill'),
(0.60,[(10.05,10.65,0)],(1.00,1.02,.5,.5,0,0,0),'slit'),
(0.84,[(11.13,11.65,0)],(1.06,1.06,.5,.5,0,0,0),'chicken'),
(1.23,[(11.68,12.48,0)],(1.00,1.06,.5,.5,0,0,0),'lettuce and tomato'),
(0.90,[(12.48,13.10,0)],(1.00,1.04,.5,.5,0,0,0),'sauce'),
(0.44,[(13.18,13.62,0)],(1.08,1.08,.5,.5,0,0,0),'cheese'),
(0.36,[(13.95,14.31,0)],(1.06,1.06,.55,.55,0,0,0),'lid'),
(0.37,[(14.31,14.68,0)],(1.06,1.06,.55,.55,0,0,0),'waffle'),
(1.14,[(14.96,15.62,0)],(1.00,1.06,.35,.35,0,0,0),'flip'),
(0.96,[(15.67,15.86,0),(15.71,15.86,1),(15.71,16.33,0)],(1.00,1.08,.5,.5,0,0,0),'landing boomerang'),
(0.27,[(16.68,16.95,0)],(1.05,1.05,.5,.5,0,0,0),'fold 1'),
(0.30,[(16.95,17.25,0)],(1.05,1.05,.5,.5,0,0,0),'fold 2'),
(0.33,[(17.50,17.83,0)],(1.05,1.05,.5,.5,0,0,0),'skillet'),
(0.34,[(17.95,18.29,0)],(1.05,1.05,.5,.5,0,0,0),'lift'),
(0.56,[(18.29,18.74,0)],(1.10,1.10,.35,.5,0,0,0),'to the plate'),
(0.71,[(18.40,19.11,0)],(1.10,1.10,.45,.6,0,0,0),'on the plate'),
(0.56,[(19.15,19.71,0)],(1.05,1.05,.6,.6,0,0,0),'knife'),
(0.47,[(19.71,20.18,0)],(1.05,1.05,.6,.6,0,0,0),'knife through'),
(1.03,[(20.30,21.33,0)],(1.00,1.02,.6,.6,0,0,0),'pull apart'),
(1.11,[(21.89,23.00,0)],(1.04,1.00,.5,.5,0,0,0),'pepper'),
(1.53,[(23.02,24.55,0)],(1.00,1.04,.5,.5,0,0,0),'hero'),
(1.42,[(25.33,26.04,0)],(1.04,1.00,.4,.4,0,0,0),'bite'),
]
B=[0]; S=[]; META=[]; jobs=[]
for i,(kd,subs,sp,name) in enumerate(SL):
    src=sum(b-a for a,b,r in subs); speed=src/kd; n=round(kd*FPS); s0=B[-1]; B.append(s0+n); e=s0+n
    fc=[]; labs=[]
    for j,(a,b,r) in enumerate(subs):
        fc.append(f"[0:v]trim={a}:{b},setpts=PTS-STARTPTS"+(",reverse" if r else "")+f",fps={FPS}[s{j}]"); labs.append(f"[s{j}]")
    ch="".join(labs)+(f"concat=n={len(labs)}:v=1:a=0," if len(labs)>1 else "null,")
    if speed<0.95: ch+=(f"scale=1620:2880,minterpolate=fps={round(FPS/speed,3)}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:"
                        f"vsbmc=1,setpts={1/speed:.4f}*PTS,scale={W}:{H}:flags=lanczos,")
    elif speed>1.05: ch+=f"setpts={1/speed:.4f}*PTS,"
    ch+=f"fps={FPS},setsar=1,tpad=stop_mode=clone:stop_duration=1[v]"; fc.append(ch)
    jobs.append((i,n,";".join(fc),speed<0.95))
    z0,z1,y0,y1,sin,sout,rin=sp; k=[]
    k+= [[s0,round(z0*1.25,3),.5,y0,0,"step"],[s0+9,z0,.5,y0,0,"ease"]] if sin else [[s0,z0,.5,y0,0,"step"]]
    if sout: k+=[[e-7,z1,.5,y1,0,"ease"],[e-1,round(z1*1.55,3),.5,y1,0,"ease"]]
    elif rin: k+=[[e-10,z1,.5,y1,0,"ease"],[e-1,round(z1*1.2,3),.5,y1,0,"ease"]]
    else: k+=[[e-1,z1,.5,y1,0,"ease"]]
    blur=([[0,1,30],[2,3,14]] if sin else [])+([[n-4,n-3,14],[n-2,n-1,32]] if sout else [])
    S.append({"k":k,"blur":blur}); META.append({"name":name,"subs":subs,"speed":round(speed,3),"n":n})
json.dump({"B":B,"S":S,"META":META},open('spec5.json','w'))
def ok(f,n):
    if not os.path.exists(f): return False
    r=subprocess.run(['ffprobe','-v','error','-count_packets','-show_entries','stream=nb_read_packets','-of','csv=p=0',f],
                     capture_output=True,text=True).stdout.strip()
    return r.isdigit() and int(r)==n
def run(job):
    i,n,fc,slow=job; f=f"p5_{i:02d}.mp4"
    if ok(f,n): return f"{i} skip"
    subprocess.run(['ffmpeg','-v','error','-y','-i',SRC,'-filter_complex',fc,'-map','[v]','-an','-frames:v',str(n),'-c:v',
                    'libx264','-crf','14','-preset','fast','-r',str(FPS),'-pix_fmt','yuv420p',f+'.tmp.mp4'],check=True)
    os.replace(f+'.tmp.mp4',f); return f"{i} done n={n}"
order=sorted(jobs,key=lambda j:(not j[3],-j[1]))   # slow-motion slots first, longest first
with ThreadPoolExecutor(int(os.environ.get('NJ','4'))) as ex:
    for r in ex.map(run,order): print(r,flush=True)
open('plist.txt','w').write("".join(f"file 'p5_{i:02d}.mp4'\n" for i in range(len(SL))))
subprocess.run(['ffmpeg','-v','error','-y','-f','concat','-safe','0','-i','plist.txt','-c','copy','inter5.mp4'],check=True)
tot=int(subprocess.run(['ffprobe','-v','error','-count_packets','-show_entries','stream=nb_read_packets','-of','csv=p=0',
                        'inter5.mp4'],capture_output=True,text=True).stdout.strip())
print("frames",tot,"planned",B[-1]); print("BUILD_OK" if tot==B[-1] else "BUILD_MISMATCH")
