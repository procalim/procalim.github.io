# v10 timeline: the slots' core frames on Kevin's cut times; at every cut except his two swells, an overlap of 2h frames
# centred on the cut (h = 3, less for the quick inserts): the outgoing shot's last frames and post-handle fade into the
# incoming shot's pre-handle and first frames. Writes anim10.mp4.
import build10 as v, numpy as np, subprocess
W,H=v.W,v.H; HD=v.HANDLE; N=len(v.SL)
n=[len(v.b.timemap(j)[0]) for j in range(N)]
def rd(j):
    raw=subprocess.run(['ffmpeg','-v','error','-i',f'c10_{j:02d}.mp4','-f','rawvideo','-pix_fmt','rgb24','-'],capture_output=True).stdout
    return np.frombuffer(raw,np.uint8).reshape(-1,H,W,3)
hw=[0]*(N-1)
for j in range(N-1):
    hw[j]=0 if j in v.NO_OVERLAP else max(1,min(3,n[j]//3,n[j+1]//3))
enc=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r','24','-i','-',
    '-c:v','libx264','-crf','15','-preset','medium','-pix_fmt','yuv420p','anim10.mp4'],stdin=subprocess.PIPE)
cur=rd(0); tot=0
for j in range(N):
    hin=hw[j-1] if j>0 else 0; hout=hw[j] if j<N-1 else 0
    nxt=rd(j+1) if j<N-1 else None
    for i in range(hin, n[j]-hout):
        enc.stdin.write(cur[HD+i].tobytes()); tot+=1
    if hout:
        for d in range(-hout,hout):
            a=(d+hout+0.5)/(2*hout)
            A=cur[HD+n[j]+d].astype(np.float32); B=nxt[HD+d].astype(np.float32)
            enc.stdin.write((A*(1-a)+B*a).astype(np.uint8).tobytes()); tot+=1
    cur=nxt
enc.stdin.close(); enc.wait(); print("frames",tot,"overlaps",sum(1 for x in hw if x),"half-widths",hw)
