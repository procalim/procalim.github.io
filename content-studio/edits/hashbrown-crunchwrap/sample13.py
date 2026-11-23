# A short sample of the v13 overlaps before the full render (the owner: «أعطيني اشي عينة قبل ما تكمل»): slots j0..j1
# composed exactly as compose13.py does (no outgoing overlap at j1), no text, with the v8 sound for that stretch.
# Usage: python3 sample13.py j0 j1 out.mp4   (the tortilla: 11 15; the shreds to the egg: 2 5)
import sys, subprocess, numpy as np
args=sys.argv[:]
src=open('compose13.py').read()
g={}; exec(src.split("enc=subprocess.Popen")[0],g)      # the helpers and settings only
v=g['v']; n=g['n']; MATCH=g['MATCH']; rd=g['rd']; register=g['register']; frac=g['frac']; inv=g['inv']; warp=g['warp']
HD=g['HD']; W=g['W']; H=g['H']
j0,j1,out=int(args[1]),int(args[2]),args[3]
N=len(v.SL); hw=[(min(6,n[j]//2,n[j+1]//2) if j in MATCH else 0) for j in range(N-1)]
B=[0]
for j in range(N): B.append(B[-1]+n[j])
enc=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r','24','-i','-',
    '-c:v','libx264','-crf','18','-preset','fast','-pix_fmt','yuv420p','vid_'+out],stdin=subprocess.PIPE)
def get(F,i): return F[int(np.clip(i,0,len(F)-1))]
cur=rd(j0); tot=0
for j in range(j0,j1+1):
    hin=hw[j-1] if j>j0 else 0; hout=hw[j] if j<j1 else 0
    nxt=rd(j+1) if j<j1 else None
    for i in range(hin,n[j]-hout): enc.stdin.write(cur[HD+i].tobytes()); tot+=1
    if hout:
        M,ni=register(cur[HD+n[j]-1],nxt[HD])
        for d in range(-hout,hout):
            a=(d+hout+0.5)/(2*hout); A=get(cur,HD+n[j]+d); Bf=get(nxt,HD+d)
            if M is not None: A=warp(A,inv(frac(M,a))); Bf=warp(Bf,frac(M,1-a))
            enc.stdin.write((A.astype(np.float32)*(1-a)+Bf.astype(np.float32)*a).astype(np.uint8).tobytes()); tot+=1
    cur=nxt
enc.stdin.close(); enc.wait()
t0=B[j0]/24; t1=B[j1+1]/24
subprocess.run(['ffmpeg','-v','error','-y','-i','vid_'+out,'-ss',str(t0),'-t',str(t1-t0),'-i','aud8.m4a','-map','0:v','-map','1:a',
                '-c:v','copy','-c:a','aac','-shortest','-movflags','+faststart',out],check=True)
print(out,tot,'frames',round(t0,2),'-',round(t1,2),'s; overlaps',[hw[j] for j in range(j0,j1)])
