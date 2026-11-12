# No Secrets ad: picture + sound edit (exact frame cuts, slow push-ins, dead pauses trimmed). 4K -> 1080x1920.
# Runs in the Higgsfield sandbox next to raw4k.mp4 (job 2da9d8da). Then compose_ad.py.
import subprocess, json
FPS=24; SRC='raw4k.mp4'
# (name, start_frame, end_frame_excl, zoom_end, cx, cy, gain_dB)
SEG=[('A slam',0,21,1.00,.5,.45,0),
     ('B wide, line 1',35,107,1.15,.5,.45,0),
     ('C Nabil, line 2',113,157,1.08,.55,.40,0),
     ('D the dish slid',157,194,1.05,.5,.45,0),
     ('E Ahmet, line 3',194,253,1.10,.5,.42,0),
     ('F fork',253,280,1.08,.5,.5,6),
     ('G Nabil, line 4',286,356,1.12,.5,.42,0),
     ('H Ahmet points, line 5',356,404,1.06,.5,.45,0),
     ('I Nabil, notebook',404,438,1.06,.5,.45,0),
     ('J the tablet',443,481,1.05,.5,.5,0)]
fc=[]; n=len(SEG)
fc.append(f"[0:v]split={n}"+''.join(f"[s{i}]" for i in range(n)))
fc.append(f"[0:a]aresample=48000,asplit={n}"+''.join(f"[t{i}]" for i in range(n)))
out=[]; t=0.0
for i,(name,a,b,z,cx,cy,g) in enumerate(SEG):
    N=b-a
    fc.append(f"[s{i}]trim=start_frame={a}:end_frame={b},setpts=PTS-STARTPTS,"
              f"zoompan=z='1+{z-1:.3f}*on/{max(N-1,1)}':x='(iw-iw/zoom)*{cx}':y='(ih-ih/zoom)*{cy}':d=1:s=1080x1920:fps={FPS},"
              f"setsar=1,format=yuv420p[v{i}]")
    au=f"[t{i}]atrim=start={a/FPS:.4f}:end={b/FPS:.4f},asetpts=PTS-STARTPTS"
    if g: au+=f",volume={g}dB"
    au+=f",afade=t=in:d=0.02,afade=t=out:st={N/FPS-0.02:.4f}:d=0.02[a{i}]"
    fc.append(au)
    out.append((name,round(t,3),round(t+N/FPS,3),a/FPS,b/FPS)); t+=N/FPS
fc.append(''.join(f"[v{i}][a{i}]" for i in range(n))+f"concat=n={n}:v=1:a=1[vc][ac]")
json.dump({'segments':out,'total':round(t,3)},open('ad_timeline.json','w'),indent=1)
cmd=['ffmpeg','-v','error','-y','-i',SRC,'-filter_complex',';'.join(fc),'-map','[vc]','-map','[ac]',
     '-c:v','libx264','-preset','slow','-crf','16','-pix_fmt','yuv420p','-r',str(FPS),'-c:a','pcm_s16le','ad-pic.mov']
subprocess.run(cmd,check=True)
for o in out: print(o)
print('total',round(t,3))
