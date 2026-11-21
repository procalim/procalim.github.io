#!/usr/bin/env python3
"""The house zoom edit (owner, 2026-11-21: «احنا بدنا زومينج وإديتينج كويس مش نعيد توليد اللقطات»).
Our own frames, no regeneration: every shot gets an eased push-in or pull-out (zoompan on a 2x upscale to keep it
smooth), the payoff is pushed in to its peak, and the cut's own sound runs unchanged under it.
Usage: edit SRC, B (shot boundaries in frames at 24 fps, from the cut's own shot changes) and P (per shot: zoom start,
zoom end, centre x, centre y, all fractions of the frame), then run in the Higgsfield sandbox: python3 zoom_edit.py
"""
import subprocess
SRC = 'clam-long.mp4'
B = [0, 32, 44, 71, 99, 129, 166, 186, 209, 229, 264, 285, 400]
P = [(1.00, 1.10, .50, .62), (1.16, 1.20, .45, .68), (1.04, 1.16, .50, .60), (1.10, 1.00, .50, .50),
     (1.00, 1.12, .50, .45), (1.00, 1.16, .50, .60), (1.10, 1.00, .50, .50), (1.00, 1.12, .50, .45),
     (1.00, 1.10, .50, .60), (1.00, 1.15, .50, .55), (1.14, 1.02, .50, .50), (1.00, 1.22, .50, .45)]
L = []
for i, (z0, z1, cx, cy) in enumerate(P):
    s, e = B[i], B[i + 1]; n = e - s; den = max(n - 1, 1)
    z = f"{z0}+({z1}-{z0})*(3*pow(on/{den},2)-2*pow(on/{den},3))"
    vf = (f"select='between(n,{s},{e-1})',setpts=N/24/TB,scale=2160:3840:flags=lanczos,"
          f"zoompan=z='{z}':x='(iw-iw/zoom)*{cx}':y='(ih-ih/zoom)*{cy}':d=1:s=1080x1920:fps=24,setsar=1,format=yuv420p")
    out = f"z{i:02d}.mp4"
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-vf', vf, '-frames:v', str(n), '-an', '-c:v', 'libx264',
                    '-crf', '14', '-preset', 'medium', '-r', '24', out], check=True)
    L.append(f"file '{out}'")
open('list.txt', 'w').write("\n".join(L) + "\n")
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', 'list.txt', '-i', SRC, '-map', '0:v',
                '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart',
                'zoomed.mp4'], check=True)
