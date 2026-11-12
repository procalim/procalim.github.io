# No Secrets ad: subtitles (Arabic + English), end card, sound, loudness. Input ad-pic.mov (18.75 s).
# Needs subs/s*.png (subs/ov_*.png here), cover_book.png, endbg.png, endtext.png (ov_endtext.png), endweb.png (ov_endweb.png).
import subprocess, os, shutil, re
FPS=24; CLOSE=170   # close-ups: subtitles lowered below the chin
# (png, out_start, out_end, y_shift)
SUBS=[('s1a',1.07,2.05,0),('s1b',2.05,3.85,0),('s2',4.04,5.95,0),
      ('s3a',7.32,8.25,CLOSE),('s3b',8.45,9.70,CLOSE),('s4',12.47,13.75,CLOSE),
      ('s5a',13.83,14.55,0),('s5b',14.57,15.20,0),('s5c',15.22,16.10,0)]
CY=1245
def run(c): subprocess.run(c,check=True)
os.makedirs('clips',exist_ok=True)
for name,t0,t1,dy in SUBS:
    d=f'clips/{name}'; shutil.rmtree(d,ignore_errors=True); os.makedirs(d)
    src=f'subs/{name}.png'
    if dy: run(['convert',src,'-roll',f'+0+{dy}',f'{d}/base.png']); src=f'{d}/base.png'
    n=round((t1-t0)*FPS); pops=[0.94,0.98,1.0]; cy=CY+dy
    for k in range(n):
        s=pops[k] if k<len(pops) else 1.0
        a=min(1.0,(k+1)/3,(n-k)/3)
        c=['convert',src,'-background','none','-virtual-pixel','transparent','-distort','SRT',f'540,{cy} {s} 0 540,{cy}']
        if a<1: c+=['-channel','A','-evaluate','multiply',f'{a:.3f}','+channel']
        run(c+[f'{d}/{k:04d}.png'])
    run(['ffmpeg','-v','error','-y','-framerate',str(FPS),'-i',f'{d}/%04d.png','-c:v','qtrle',f'clips/{name}.mov'])
# end card, 2.5 s: background, cover easing in, text popping in
E=2.5; NE=int(E*FPS)
fc=["[1:v]scale=560:-1,format=rgba[cov]",
    f"[0:v][cov]overlay=x='(W-w)/2':y='310':shortest=1,format=yuv420p[b0]",
    f"[b0]zoompan=z='1.06-0.06*on/{NE-1}':x='(iw-iw/zoom)/2':y='(ih-ih/zoom)*0.36':d=1:s=1080x1920:fps={FPS},fade=t=in:st=0:d=0.30[b1]",
    "[2:v]format=rgba,fade=t=in:st=0.35:d=0.25:alpha=1[tx]","[3:v]format=rgba,fade=t=in:st=0.65:d=0.25:alpha=1[wb]",
    "[b1][tx]overlay=0:0[b2]","[b2][wb]overlay=0:0,format=yuv420p[ev]"]
run(['ffmpeg','-v','error','-y','-loop','1','-t',str(E),'-r',str(FPS),'-i','endbg.png','-loop','1','-t',str(E),'-r',str(FPS),'-i','cover_book.png',
     '-loop','1','-t',str(E),'-r',str(FPS),'-i','endtext.png','-loop','1','-t',str(E),'-r',str(FPS),'-i','endweb.png',
     '-filter_complex',';'.join(fc),'-map','[ev]','-frames:v',str(NE),'-c:v','libx264','-crf','16','-pix_fmt','yuv420p','-r',str(FPS),'endcard.mov'])
# end card sound: a soft low hit and a faint shimmer
run(['ffmpeg','-v','error','-y','-f','lavfi','-i',f'sine=frequency=46:duration={E}:sample_rate=48000',
     '-f','lavfi','-i',f'anoisesrc=color=pink:duration={E}:sample_rate=48000:amplitude=0.5',
     '-filter_complex',"[0:a]volume='0.5*exp(-2.2*t)':eval=frame[s];[1:a]highpass=f=4500,volume='0.06*exp(-4*t)':eval=frame[n];[s][n]amix=inputs=2:normalize=0,aformat=channel_layouts=mono[a]",
     '-map','[a]','-c:a','pcm_s16le','endhit.wav'])
# main: picture + subtitles, then the end card
ins=['-i','ad-pic.mov']; fc=[]; last='0:v'
for j,(name,t0,t1,dy) in enumerate(SUBS):
    ins+=['-i',f'clips/{name}.mov']
    fc.append(f"[{j+1}:v]setpts=PTS-STARTPTS+{t0:.3f}/TB[c{j}]")
    fc.append(f"[{last}][c{j}]overlay=0:0:eof_action=pass[o{j}]"); last=f'o{j}'
k=len(SUBS)+1
ins+=['-i','endcard.mov','-i','endhit.wav']
fc.append(f"[{last}]fade=t=out:st=18.50:d=0.25,format=yuv420p[main]")
fc.append(f"[0:a]aresample=48000,aformat=channel_layouts=mono,afade=t=out:st=18.35:d=0.40[ma]")
fc.append(f"[{k+1}:a]aresample=48000,aformat=channel_layouts=mono[ea]")
fc.append(f"[main][ma][{k}:v][ea]concat=n=2:v=1:a=1[v][a]")
run(['ffmpeg','-v','error','-y',*ins,'-filter_complex',';'.join(fc),'-map','[v]','-map','[a]',
     '-c:v','libx264','-preset','slow','-crf','17','-profile:v','high','-pix_fmt','yuv420p','-r',str(FPS),'-c:a','pcm_s16le','ad-mix.mov'])
# loudness: -14.5 LUFS target with a limiter (result 2026-11-12: -15.3 LUFS, -4.2 dBTP)
def meas(f):
    e=subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
    s=e[e.rindex('Summary'):]
    return float(re.search(r'I:\s+(-?[\d.]+)',s).group(1)), float(re.search(r'Peak:\s+(-?[\d.]+)',s).group(1))
I,P=meas('ad-mix.mov'); g=-14.5-I+1.0
run(['ffmpeg','-v','error','-y','-i','ad-mix.mov','-c:v','copy','-af',f"volume={g:.2f}dB,alimiter=limit=0.84:attack=3:release=80:level=disabled,aresample=48000",
     '-ac','2','-c:a','aac','-b:a','192k','-movflags','+faststart','no-secrets-ad.mp4'])
print('mix',I,P,'gain',round(g,2),'final',meas('no-secrets-ad.mp4'))
