# Pan Chocolate Cake edit: no text except the CTA at the end (owner's test 2026-11-11).
# Cold-open flash of the square, speed ramps, punch-ins on impacts, money-shot sound loudest.
# Runs in the Higgsfield sandbox next to raw.mp4 (job f0aadc93) and cards/cta.png (ov_cta.png).
# Then fin.py: one measured gain and a limiter to about -15.5 LUFS.
import subprocess, os, shutil, json, sys
SRC='raw.mp4'; FPS=24
# (src_start, src_end, speed, punch_src_time or 'push' or None, gain_dB)
SEG=[(17.30,18.08,1.0,17.72,10),   # 0 flash: the square lifted (cold open)
     (0.30,1.00,1.0,0.52,-2),      # 1 egg crack
     (1.00,2.00,1.3,None,8),       # 2 sugar
     (2.00,2.75,1.2,None,0),       # 3 whisked pale
     (2.75,3.75,1.3,None,0),       # 4 milk
     (3.75,4.55,1.2,4.05,-9),      # 5 cocoa (cut before the cloud settles)
     (5.00,5.92,1.2,None,-5),      # 6 flour
     (5.92,7.00,1.6,None,0),       # 7 hot coffee
     (7.00,7.70,1.0,7.22,-6),      # 8 lid slap
     (8.30,9.58,2.4,None,10),      # 9 cooking through the lid
     (9.58,10.75,1.3,None,0),      # 10 lid off, steam (+11 dB after the lift)
     (10.75,12.10,2.2,10.95,1),    # 11 holes
     (12.58,13.33,1.0,None,-3),    # 12 sauce
     (13.33,14.90,2.2,'push',2),   # 13 the pour, slow push-in
     (15.25,16.75,1.3,None,8),     # 14 spread
     (16.85,18.17,1.2,17.72,16),   # 15 MONEY: the square lifted
     (18.17,19.00,1.15,None,0),    # 16 the bite
     (19.00,20.04,1.8,None,0)]     # 17 chewing, the egg for the loop
G=json.load(open('gains.json')) if os.path.exists('gains.json') else {}
MONEY=15
out=[]; t=0.0
for (a,b,s,p,g) in SEG:
    d=round((b-a)/s*FPS)/FPS; out.append((t,t+d)); t+=d
TOTAL=t
CARDS=[('cta',out[16][0]+0.05,TOTAL,1243)]  # from the bite to the end
json.dump({'segments':[dict(src=[a,b],speed=s,gain=G.get(str(i),g),out=[round(o0,3),round(o1,3)]) for i,((a,b,s,p,g),(o0,o1)) in enumerate(zip(SEG,out))],'total':round(TOTAL,3),'cards':CARDS},open('timeline.json','w'),indent=1)
def card_clip(name,t0,t1,cy):
    d=f'cards/{name}_f'; shutil.rmtree(d,ignore_errors=True); os.makedirs(d)
    n=max(8,round((t1-t0)*FPS)); pops=[0.80,0.90,0.97,1.02,1.0]
    for k in range(n):
        s=pops[k] if k<len(pops) else 1.0
        cmd=['convert',f'cards/{name}.png','-background','none','-virtual-pixel','transparent','-distort','SRT',f'540,{cy} {s} 0 540,{cy}']
        subprocess.run(cmd+[f'{d}/{k:04d}.png'],check=True)
    subprocess.run(['ffmpeg','-v','error','-y','-framerate',str(FPS),'-i',f'{d}/%04d.png','-c:v','qtrle',f'cards/{name}.mov'],check=True)
for c in CARDS: card_clip(*c)
# each segment to its own file first (the cold open is out of source order, so one shared decode froze it)
os.makedirs('seg',exist_ok=True)
for i,((a,b,s,p,g),(o0,o1)) in enumerate(zip(SEG,out)):
    g=G.get(str(i),g)
    v=f"setpts=(PTS-STARTPTS)/{s},fps={FPS}"
    if p=='push':
        v+=f",zoompan=z='1+0.10*it/{(b-a)/s:.3f}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps={FPS}"
    elif p is not None:
        tp=(p-a)/s
        v+=f",zoompan=z='1+0.07*max(0\\,1-abs(it-{tp:.3f})/0.30)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps={FPS}"
    v+=",setsar=1,format=yuv420p"
    au="asetpts=PTS-STARTPTS,aresample=48000"
    if s!=1.0: au+=f",atempo={s}"
    if g: au+=f",volume={g}dB"
    if i==10: au+=",volume=enable='gte(t\\,0.25)':volume=11dB"
    if i==MONEY-1:
        dur=o1-o0; au+=f",volume=enable='gte(t\\,{dur-0.30:.3f})':volume=-14dB"
    N=round((o1-o0)*FPS)
    au+=f",apad,atrim=0:{N/FPS:.4f}"
    subprocess.run(['ffmpeg','-v','error','-y','-ss',f'{a}','-t',f'{b-a:.4f}','-i',SRC,'-vf',v,'-af',au,
        '-frames:v',str(N),'-c:v','libx264','-preset','fast','-crf','12','-pix_fmt','yuv420p','-r',str(FPS),'-c:a','pcm_s16le',f'seg/{i:02d}.mov'],check=True)
inputs=[]; fc=[]
for i in range(len(SEG)): inputs+=['-i',f'seg/{i:02d}.mov']
fc.append(''.join(f"[{i}:v][{i}:a]" for i in range(len(SEG)))+f"concat=n={len(SEG)}:v=1:a=1[vc][ac]")
last='vc'
for j,(name,t0,t1,cy) in enumerate(CARDS):
    k=len(SEG)+j
    inputs+=['-i',f'cards/{name}.mov']
    fc.append(f"[{k}:v]setpts=PTS-STARTPTS+{t0:.3f}/TB[c{j}]")
    fc.append(f"[{last}][c{j}]overlay=0:0:eof_action=pass[o{j}]"); last=f'o{j}'
fc.append("[ac]aresample=48000[aout]")
cmd=['ffmpeg','-v','error','-y',*inputs,'-filter_complex',';'.join(fc),'-map',f'[{last}]','-map','[aout]',
     '-c:v','libx264','-preset','slow','-crf','17','-profile:v','high','-pix_fmt','yuv420p','-r',str(FPS),
     '-c:a','pcm_s16le','pan-mix.mov']
open('cmd.txt','w').write(' '.join(cmd))
subprocess.run(cmd,check=True)
print('done',round(TOTAL,3),[(c[0],round(c[1],2),round(c[2],2)) for c in CARDS])
