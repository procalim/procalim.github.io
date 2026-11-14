# Tostadas break hook (owner, 2026-11-14): take 61af542c (Seedance 2.5, 5 s): an empty plate flies at the lens and
# smashes on the floor, the tostada safe. Owner: «بترتر والكسر مبين ل3 بدل 5» (it stutters; the hook to 3 s, not 5).
# The stutter: frames 31-35, the plate jumps 22-85 grey levels a frame. Fix: frames 28-40 at half speed with motion
# interpolation (minterpolate mci), so the throw and the crash read clean. The 2 s freeze after it (DEAD) is cut;
# the take's end (he slides the tostada to the lens) closes the hook at 1.5x. Then the tostadas v4 (efcddd10).
# Run in the folder with hook_raw.mp4 (the take); the v4 edit at /home/user/tostada/crispy-rice-tostadas.mp4.
# Result 2026-11-14: hook 2.5 s, reel 10.08 s, DEAD 0, SLOW 0, LONG 0, QUIET 0; -14.4 LUFS, peak -1.2; media 4d7184ab.
import subprocess, re
FPS = 24
def run(c): subprocess.run(c, check=True)
def meas(f):
    e = subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
    s = e[e.rindex('Summary'):]
    return float(re.search(r'I:\s+(-?[\d.]+)',s).group(1)), float(re.search(r'Peak:\s+(-?[\d.]+)',s).group(1))
SC = 'scale=1080:1920:flags=lanczos,setsar=1,format=yuv420p'
v = (f"[0:v]trim=start_frame=11:end_frame=28,setpts=PTS-STARTPTS,{SC}[a];"
     f"[0:v]trim=start_frame=28:end_frame=41,setpts=PTS-STARTPTS,minterpolate=fps=48:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,"
     f"setpts=2*PTS,fps={FPS},trim=end_frame=26,{SC}[b];"
     f"[0:v]trim=start=4.0:end=5.05,setpts=(PTS-STARTPTS)/1.5,fps={FPS},{SC}[c];"
     "[a][b][c]concat=n=3:v=1:a=0[v]")
# sound: continuous 0.103-1.792 s under A and B, so the crash (1.48 s) lands on the shards (B frame 16); then the
# end's plate slide at 1.5x. The lift (0.30-1.00 s out) is +14 dB: it read QUIET (the swing is -38 to -46 dB).
AB = (17 + 26) / FPS
a = (f"[0:a]atrim=start=0.103:end={0.103+AB:.3f},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=mono,volume='if(between(t,0.30,1.00),5,1)':eval=frame,afade=t=in:d=0.02[x1];"
     f"[0:a]atrim=start=4.0:end=5.05,asetpts=PTS-STARTPTS,atempo=1.5,aresample=48000,aformat=channel_layouts=mono[x2];"
     "[x1][x2]acrossfade=d=0.02,afade=t=out:st=2.40:d=0.06[x]")
run(['ffmpeg','-v','error','-y','-i','hook_raw.mp4','-filter_complex',v+';'+a,'-map','[v]','-map','[x]',
     '-c:v','libx264','-crf','14','-preset','slow','-r',str(FPS),'-c:a','pcm_s16le','hook.mov'])
I,P = meas('hook.mov'); g = -14.5 - I
run(['ffmpeg','-v','error','-y','-i','hook.mov','-c:v','copy','-af',
     f"volume={g:.2f}dB,alimiter=limit=0.80:attack=3:release=80:level=disabled,pan=stereo|c0=c0|c1=c0",
     '-c:a','pcm_s16le','hook_lev.mov'])
run(['ffmpeg','-v','error','-y','-i','hook_lev.mov','-i','/home/user/tostada/crispy-rice-tostadas.mp4','-filter_complex',
     '[0:v]setsar=1[v0];[1:v]setsar=1,fps=24,format=yuv420p[v1];[0:a]aresample=48000[a0];[1:a]aresample=48000,aformat=channel_layouts=stereo[a1];'
     '[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]','-map','[v]','-map','[a]',
     '-c:v','libx264','-crf','16','-preset','slow','-profile:v','high','-pix_fmt','yuv420p','-r','24',
     '-c:a','aac','-b:a','256k','-movflags','+faststart','crispy-rice-tostadas-breakhook.mp4'])
print('hook', round(AB + 17/FPS, 2), 'mix', (I,P), 'gain', round(g,2), 'final', meas('crispy-rice-tostadas-breakhook.mp4'))
