#!/usr/bin/env python3
"""The house edit, strong version (owner, 2026-11-21: «زوم إن زوم أوت. وحركات زوايا مختلفة بنفس السيستم»).
Our own frames only, no regeneration. Per shot, keyframes of zoom, centre (a pan or a tilt when it moves) and rotation
(a dutch tilt), each a jump ('step') or an eased move ('ease'); a 2-frame blur on the cut as a zoom transition; light
sharpening. NO SHAKE (owner, 2026-11-21: «ما بدي هزة. الهزة مش فكرتنا ... زوم ان زوم اوت، حركات مختلفة بزوايا الكاميرا، مش هزة. حاسس حالي بهزة أرضية»): a hit gets a punch-in
(a 'step' key) or a new angle, never a shake; an old spec's "sh" list is ignored. Zoom stays at least 1.1 under 3 degrees
of rotation and 1.18 under 6 degrees, so no black corners show.
Usage (Higgsfield sandbox): python3 zoom_pro.py SRC.mp4 OUT.mp4 spec.json
spec: {"B": [shot boundaries in frames], "S": [{"k": [[frame, zoom, cx, cy, rot_deg, "step"|"ease"], ...],
       "bl": true|false}, ...]}
"""
import subprocess, sys, json
SRC, OUT, SPEC = sys.argv[1], sys.argv[2], json.load(open(sys.argv[3]))
B, S = SPEC['B'], SPEC['S']
def piece(keys, idx, s, var):
    ks = [(k[0] - s, k[idx], k[5]) for k in keys]; parts = []
    for i, (f, v, m) in enumerate(ks):
        if i + 1 < len(ks):
            f2, v2, m2 = ks[i + 1]
            if m2 == 'ease':
                d = max(f2 - f, 1); p = f"(({var}-{f})/{d})"
                parts.append((f2, f"({v}+({v2}-({v}))*(3*pow({p},2)-2*pow({p},3)))"))
            else:
                parts.append((f2, f"({v})"))
        else:
            parts.append((None, f"({v})"))
    e = parts[-1][1]
    for f2, ex in reversed(parts[:-1]):
        e = f"if(lt({var},{f2}),{ex},{e})"
    return e
L = []
for i, d in enumerate(S):
    s, e = B[i], B[i + 1]; n = e - s; K = d['k']
    z = piece(K, 1, s, 'on'); cx = piece(K, 2, s, 'on'); cy = piece(K, 3, s, 'on'); rot = piece(K, 4, s, 'n')
    x = f"max(0,min(iw-iw/zoom,(iw-iw/zoom)*{cx}))"
    y = f"max(0,min(ih-ih/zoom,(ih-ih/zoom)*{cy}))"
    vf = f"select='between(n,{s},{e-1})',setpts=N/24/TB,scale=2160:3840:flags=lanczos,"
    if any(k[4] != 0 for k in K):
        vf += f"rotate=a='({rot})*PI/180':ow=iw:oh=ih:c=black,"
    vf += f"zoompan=z='{z}':x='{x}':y='{y}':d=1:s=1080x1920:fps=24,setsar=1,unsharp=5:5:0.5"
    if d.get('bl'): vf += ",gblur=sigma=12:enable='lt(n,2)'"
    vf += ",format=yuv420p"
    out = f"q{i:02d}.mp4"
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-vf', vf, '-frames:v', str(n), '-an', '-c:v', 'libx264',
                    '-crf', '14', '-preset', 'medium', '-r', '24', out], check=True)
    L.append(f"file '{out}'")
open('qlist.txt', 'w').write("\n".join(L) + "\n")
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', 'qlist.txt', '-i', SRC, '-map', '0:v',
                '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', OUT],
               check=True)
