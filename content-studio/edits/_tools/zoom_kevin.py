#!/usr/bin/env python3
"""Kevin's edit at 4K (2026-11-23): zoom_pro without the upscale, output 2160x3840, plus the swell: per shot keys
(zoom, cx, cy; step/ease) and gblur ranges [f0, f1, sigma] (frames inside the shot) for the zoom-in into the lens at a
shot's end and the zoom-out settle at the next shot's start. No shake.
Usage (Higgsfield sandbox): python3 zoom_kevin.py SRC spec.json i0 i1   -> q4_XX.mp4 for shots i0..i1-1
"""
import subprocess, sys, json
SRC=sys.argv[1]; SP=json.load(open(sys.argv[2])); i0,i1=int(sys.argv[3]),int(sys.argv[4]); B,S=SP['B'],SP['S']
def piece(keys, idx, s, var):
    ks=[(k[0]-s,k[idx],k[5]) for k in keys]; parts=[]
    for i,(f,v,m) in enumerate(ks):
        if i+1<len(ks):
            f2,v2,m2=ks[i+1]
            if m2=='ease':
                d=max(f2-f,1); p=f"(({var}-{f})/{d})"; parts.append((f2,f"({v}+({v2}-({v}))*(3*pow({p},2)-2*pow({p},3)))"))
            else: parts.append((f2,f"({v})"))
        else: parts.append((None,f"({v})"))
    e=parts[-1][1]
    for f2,ex in reversed(parts[:-1]): e=f"if(lt({var},{f2}),{ex},{e})"
    return e
for i in range(i0,i1):
    s,e=B[i],B[i+1]; n=e-s; d=S[i]; K=d['k']
    z=piece(K,1,s,'on'); cx=piece(K,2,s,'on'); cy=piece(K,3,s,'on')
    vf=(f"select='between(n,{s},{e-1})',setpts=N/24/TB,zoompan=z='{z}':x='max(0,min(iw-iw/zoom,(iw-iw/zoom)*{cx}))':"
        f"y='max(0,min(ih-ih/zoom,(ih-ih/zoom)*{cy}))':d=1:s=2160x3840:fps=24,setsar=1,unsharp=5:5:0.4")
    for f0,f1,sg in d.get('blur',[]): vf+=f",gblur=sigma={sg}:enable='between(n,{f0},{f1})'"
    vf+=",format=yuv420p"
    subprocess.run(['ffmpeg','-v','error','-y','-i',SRC,'-vf',vf,'-frames:v',str(n),'-an','-c:v','libx264','-crf','15',
                    '-preset','medium','-r','24',f"q4_{i:02d}.mp4"],check=True)
print("done",i0,i1)
