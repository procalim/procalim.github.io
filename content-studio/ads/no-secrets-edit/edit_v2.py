# No Secrets ad v2: punchier cut. Virtual close-ups cropped from the 4K wides, impacts with punch-in, shake and flash,
# word-by-word Arabic subtitles, music bed + sound design with ducking under the dialogue, loudness.
# Runs in the Higgsfield sandbox next to raw4k.mp4 (job 2da9d8da), kin/*.png (kinetic.mjs) and endcard.mov
# (compose_ad.py). Output no-secrets-ad-v2.mp4.
import subprocess, os, json, re
from PIL import Image
FPS=24; SRC='raw4k.mp4'; SFX='/home/user/.higgsfield/workflows/katana/scripts/sfx_lib'
def run(c): subprocess.run(c,check=True)
# name, src_a, src_b, speed, cx, cy, zoom, push, punch_src or 'snap' or None, gain
SEG=[('S0 slam',0.00,0.70,1.0,.5,.5,1.08,0.0,0.27,0),
     ('S1 tablet close',1.62,2.62,1.0,.5,.722,1.8,0.06,None,0),
     ('S2a Ahmet',2.62,3.45,1.0,.49,.25,2.0,0.05,None,0),
     ('S2b Layla',3.45,4.30,1.0,.208,.374,2.4,0.04,None,0),
     ('S3 Nabil line 2',4.80,6.542,1.0,.55,.40,1.0,0.08,None,0),
     ('S4 dish slid',6.542,8.083,1.25,.5,.45,1.0,0.05,None,0),
     ('S5 Ahmet line 3',8.12,10.45,1.0,.5,.42,1.0,0.12,None,0),
     ('S6 fork',10.542,11.667,1.0,.5,.5,1.0,0.06,10.70,6),
     ('S7 Nabil reaction',12.20,14.833,1.0,.5,.38,1.0,0.06,'snap',0),
     ('S8 Ahmet No Chef',14.833,15.55,1.0,.6875,.3125,1.6,0.03,None,0),
     ('S9 Layla She did',15.55,16.25,1.0,.3125,.4925,1.6,0.03,None,0),
     ('S10 From my book',16.25,16.833,1.0,.55,.35,1.15,0.05,None,0),
     ('S11 Nabil notebook',16.833,17.90,1.1,.5,.45,1.0,0.06,None,0),
     ('S12 tablet flip',18.458,20.04,1.15,.5,.5,1.0,0.05,18.95,0)]
out=[]; t=0.0
for s in SEG:
    N=round((s[2]-s[1])/s[3]*FPS); out.append((t,t+N/FPS,N)); t+=N/FPS
FILM=t
def o(src):   # source second -> output second
    for s,(o0,o1,N) in zip(SEG,out):
        if s[1]<=src<s[2]: return o0+(src-s[1])/s[3]
fc=[f"[0:v]split={len(SEG)}"+''.join(f"[s{i}]" for i in range(len(SEG))),
    f"[0:a]aresample=48000,aformat=channel_layouts=mono,asplit={len(SEG)}"+''.join(f"[t{i}]" for i in range(len(SEG)))]
for i,(s,(o0,o1,N)) in enumerate(zip(SEG,out)):
    name,a,b,sp,cx,cy,z,push,p,g=s
    zx=f"{z}*(1+{push}*on/{max(N-1,1)})"
    if p=='snap':   # snap zoom when his eyes widen (src 12.32)
        f0=round((12.32-a)/sp*FPS); zx+=f"*(1+0.16*min(1,max(0,(on-{f0})/3)))"
    elif p is not None:
        fp=(p-a)/sp*FPS; zx+=f"*(1+0.09*max(0,1-abs(on-{fp:.1f})/6))"
    shake=""
    if i==0:
        fp=round(0.27*FPS); shake=f"+if(gte(on,{fp}),40*sin((on-{fp})*2.6)*exp(-(on-{fp})/3),0)"
    xx=f"max(0,min(iw-iw/zoom,{cx}*iw-iw/zoom/2{shake}))"; yy=f"max(0,min(ih-ih/zoom,{cy}*ih-ih/zoom/2{shake.replace('sin','cos')}))"
    v=(f"[s{i}]trim=start={a}:end={b},setpts=(PTS-STARTPTS)/{sp},fps={FPS},"
       f"zoompan=z='{zx}':x='{xx}':y='{yy}':d=1:s=1080x1920:fps={FPS},setsar=1,format=yuv420p")
    if i==0: v+=",drawbox=x=0:y=0:w=iw:h=ih:color=white@0.45:t=fill:enable='between(t,0.27,0.35)'"
    v+=f",trim=end_frame={N}[v{i}]"
    au=f"[t{i}]atrim=start={a}:end={b},asetpts=PTS-STARTPTS"
    if sp!=1: au+=f",atempo={sp}"
    if g: au+=f",volume={g}dB"
    au+=f",apad,atrim=0:{N/FPS:.4f},afade=t=in:d=0.015,afade=t=out:st={N/FPS-0.015:.4f}:d=0.015[a{i}]"
    fc+=[v,au]
fc.append(''.join(f"[v{i}][a{i}]" for i in range(len(SEG)))+f"concat=n={len(SEG)}:v=1:a=1[vc][dia]")
if not os.path.exists('v2-pic.mov'): run(['ffmpeg','-v','error','-y','-i',SRC,'-filter_complex',';'.join(fc),'-map','[vc]','-map','[dia]',
     '-c:v','libx264','-preset','medium','-crf','15','-pix_fmt','yuv420p','-r',str(FPS),'-c:a','pcm_s16le','v2-pic.mov'])
# ---- subtitles: one transparent frame per output frame (word starts from Whisper, source seconds; dy = y shift)
PH={'k1a':([1.70,2.22],2.58,-720),'k1b':([2.58,3.28],3.52,0),'k1c':([3.52,3.78],4.18,0),
    'k2a':([4.92,5.24],5.60,0),'k2b':([5.60,5.98],6.64,0),'k3a':([8.20,8.62],8.94,120),'k3b':([9.34,9.54],9.96,120),
    'k3c':([9.96,10.10],10.36,120),'k4':([13.60,13.85,14.12],14.64,120),'k5a':([14.96,15.16],15.38,0),
    'k5b':([15.70,15.90],16.10,0),'k5c':([16.34,16.58],16.94,0)}
TOTAL=FILM+2.5; NF=round(TOTAL*FPS)
frames=[None]*NF
order=sorted(PH.items(),key=lambda kv:kv[1][0][0])
for idx,(k,(ws,end,dy)) in enumerate(order):
    starts=[o(w) for w in ws]; e=o(min(end,20.0))+0.25
    if idx+1<len(order): e=min(e,o(order[idx+1][1][0][0]))
    for j,st in enumerate(starts):
        nxt=starts[j+1] if j+1<len(starts) else e
        for f in range(round(st*FPS),min(round(nxt*FPS),NF)):
            pop=(f-round(st*FPS))<2
            frames[f]=(f"{k}_{j+1}{'p' if pop else ''}",dy)
os.makedirs('subf',exist_ok=True); cache={}
blank=Image.new('RGBA',(1080,1920),(0,0,0,0))
for f,item in enumerate(frames):
    if item is None: im=blank
    else:
        if item not in cache:
            src=Image.open(f'kin/{item[0]}.png').convert('RGBA'); im2=Image.new('RGBA',(1080,1920),(0,0,0,0))
            im2.paste(src,(0,item[1]),src); cache[item]=im2
        im=cache[item]
    if not os.path.exists('subs_v2.mov'): im.save(f'subf/{f:05d}.png')
run(['ffmpeg','-v','error','-y','-framerate',str(FPS),'-i','subf/%05d.png','-c:v','qtrle','subs_v2.mov']) if not os.path.exists('subs_v2.mov') else None
# ---- music bed and sound design (library: katana sfx_lib)
def sfx(path,at,db=0,extra=''):
    return (path,at,db,extra)
S=[sfx('whoosh/swish__swosh-03.ogg',0.0,-8),sfx('boom/kimp__impactPunch_heavy_000.ogg',0.27,0,'afade=t=out:st=0.25:d=0.2,'),sfx('boom/ksci__lowFrequency_explosion_000.ogg',0.27,-6,'afade=t=out:st=0.18:d=0.25,'),
   sfx('whoosh/swish__swosh-13.ogg',o(6.85),-8),
   sfx('hit/kimp__impactPlate_heavy_001.ogg',o(10.70),-12),
   sfx('boom/kdig__lowDown.ogg',o(12.32),-4),
   sfx('boom/kimp__impactSoft_heavy_000.ogg',o(12.95),-12,'lowpass=f=160,'),sfx('boom/kimp__impactSoft_heavy_000.ogg',o(13.38),-12,'lowpass=f=160,'),
   sfx('whoosh/swish__swosh-08.ogg',out[10][0]-0.10,-12),
   sfx('boom/ksci__lowFrequency_explosion_001.ogg',o(16.74),-2),sfx('boom/kimp__impactSoft_heavy_003.ogg',o(16.74),-6),
   sfx('longwhoosh/swish__swosh-31.ogg',out[13][0]-0.05,-10),sfx('boom/kimp__impactPunch_heavy_002.ogg',o(18.95),-5),
   sfx('boom/ksci__lowFrequency_explosion_000.ogg',FILM,-3),sfx('boom/kimp__impactSoft_heavy_003.ogg',FILM,-6)]
ins=[]; fcs=[]
for j,(p,at,db,ex) in enumerate(S):
    ins+=['-i',f'{SFX}/{p}']
    fcs.append(f"[{j}:a]aresample=48000,aformat=channel_layouts=mono,{ex}volume={db}dB,adelay={int(at*1000)}:all=1,apad=whole_dur={TOTAL}[x{j}]")
nS=len(S)
# drone: low A/E with a slow pulse; swell on the reaction, silence before "You made this?", riser into "From my book"
r0=o(13.60)-0.10; r1=o(16.74)
drone=(f"aevalsrc='0.5*sin(2*PI*55*t)+0.32*sin(2*PI*82.41*t)+0.18*sin(2*PI*110*t)*(0.6+0.4*sin(2*PI*1.5*t))':s=48000:d={TOTAL},"
       f"lowpass=f=320,volume='0.22*min(1,t/0.6)*if(between(t,{r0:.2f},{r0+0.55:.2f}),0.08,1)*if(between(t,{o(12.2):.2f},{r0:.2f}),1.6,1)*if(gt(t,{FILM:.2f}),max(0,1-(t-{FILM:.2f})/2.3),1)':eval=frame[dr]")
riser=(f"anoisesrc=color=pink:d={r1-r0:.2f}:sample_rate=48000:amplitude=0.6,highpass=f=900,lowpass=f=6000,"
       f"volume='0.25*pow(t/{r1-r0:.2f},2.2)':eval=frame,adelay={int(r0*1000)}:all=1,apad=whole_dur={TOTAL}[rs]")
fcs+=[drone,riser]
fcs.append(f"[{nS}:a]aresample=48000,aformat=channel_layouts=mono,apad=whole_dur={TOTAL}[dl]")
fcs.append("".join(f"[x{j}]" for j in range(nS))+f"[dr][rs]amix=inputs={nS+2}:normalize=0:duration=longest[bus]")
fcs.append("[dl]asplit=2[dl1][dl2]")
fcs.append("[bus][dl1]sidechaincompress=threshold=0.02:ratio=6:attack=8:release=300:level_sc=1.5[busd]")
fcs.append(f"[busd][dl2]amix=inputs=2:normalize=0:duration=longest,atrim=0:{TOTAL}[mix]")
run(['ffmpeg','-v','error','-y',*ins,'-i','v2-pic.mov','-filter_complex',';'.join(fcs),'-map','[mix]','-c:a','pcm_s16le','v2-audio.wav'])
# ---- picture + subtitles + end card (flash in)
run(['ffmpeg','-v','error','-y','-i','v2-pic.mov','-i','subs_v2.mov','-i','endcard.mov','-i','v2-audio.wav','-filter_complex',
     f"[0:v][1:v]overlay=0:0:eof_action=pass,trim=end={FILM:.4f},setpts=PTS-STARTPTS[f];"
     f"[2:v]drawbox=x=0:y=0:w=iw:h=ih:color=white@0.5:t=fill:enable='lt(t,0.08)'[e];[f][e]concat=n=2:v=1:a=0,format=yuv420p[v]",
     '-map','[v]','-map','3:a','-c:v','libx264','-preset','slow','-crf','17','-profile:v','high','-pix_fmt','yuv420p','-r',str(FPS),
     '-c:a','pcm_s16le','-shortest','v2-mix.mov'])
def meas(f):
    e=subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
    s=e[e.rindex('Summary'):]
    return float(re.search(r'I:\s+(-?[\d.]+)',s).group(1)), float(re.search(r'Peak:\s+(-?[\d.]+)',s).group(1))
I,P=meas('v2-mix.mov'); g=-14.0-I+1.2
run(['ffmpeg','-v','error','-y','-i','v2-mix.mov','-c:v','copy','-af',f"volume={g:.2f}dB,alimiter=limit=0.84:attack=3:release=80:level=disabled,aresample=48000",
     '-ac','2','-c:a','aac','-b:a','192k','-movflags','+faststart','no-secrets-ad-v2.mp4'])
json.dump({'segments':[(s[0],s[1],s[2],s[3],round(a,3),round(b,3)) for s,(a,b,N) in zip(SEG,out)],'film':round(FILM,3)},open('v2_timeline.json','w'),indent=1)
print('film',round(FILM,3),'mix',I,P,'final',meas('no-secrets-ad-v2.mp4'))
