# Falafel Cups with the fake hook (owner, 2026-11-14): the near-fall take (job 82797741) 0.2-2.25 s in front of the
# falafel v4 edit (falafel-cups.mp4, media de94f773). No card on the hook (her reel has none); the v4 cards follow.
# Run in the folder with hook_raw.mp4 (the take) and pp.py; the v4 edit at /home/user/falafel/falafel-cups.mp4.
# Result 2026-11-14: 11.67 s, DEAD 0, SLOW 0, QUIET 0, LONG 0; -14.2 LUFS, peak -1.1; media 9070e05d.
import subprocess, re, json
FPS = 24
H0, HC, H1 = 0.20, 1.75, 2.25   # hook in, the model's cut (plate to the lens), hook out
# Past 2.25 s the take is SLOW and QUIET (-44 dB), and near 4.0 s a periodic sound at about 270 Hz may be a voice: left out.
def run(c): subprocess.run(c, check=True)
def meas(f):
    e = subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
    s = e[e.rindex('Summary'):]
    return float(re.search(r'I:\s+(-?[\d.]+)',s).group(1)), float(re.search(r'Peak:\s+(-?[\d.]+)',s).group(1))
n2 = round((H1-HC)*FPS)
v = (f"[0:v]trim=start={H0}:end={HC},setpts=PTS-STARTPTS,fps={FPS},scale=1080:1920:flags=lanczos,format=yuv420p[a];"
     f"[0:v]trim=start={HC}:end={H1},setpts=PTS-STARTPTS,fps={FPS},scale=1080:1920:flags=lanczos,"
     f"zoompan=z='1+0.06*on/{n2}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps={FPS},format=yuv420p[b];"
     "[a][b]concat=n=2:v=1:a=0[v]")
a = (f"[0:a]atrim=start={H0}:end={H1},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=mono,"
     f"afade=t=in:d=0.02,afade=t=out:st={H1-H0-0.06:.3f}:d=0.06[x]")
run(['ffmpeg','-v','error','-y','-i','hook_raw.mp4','-filter_complex',v+';'+a,'-map','[v]','-map','[x]',
     '-c:v','libx264','-crf','14','-preset','slow','-r',str(FPS),'-c:a','pcm_s16le','hook.mov'])
# level the hook to the reel: -14.5 LUFS short clip target via its integrated loudness, limited
I,P = meas('hook.mov'); g = -14.5 - I
run(['ffmpeg','-v','error','-y','-i','hook.mov','-c:v','copy','-af',
     f"volume={g:.2f}dB,alimiter=limit=0.80:attack=3:release=80:level=disabled,pan=stereo|c0=c0|c1=c0",
     '-c:a','pcm_s16le','hook_lev.mov'])
run(['ffmpeg','-v','error','-y','-i','hook_lev.mov','-i','/home/user/falafel/falafel-cups.mp4','-filter_complex',
     '[0:v]setsar=1[v0];[1:v]setsar=1,fps=24,format=yuv420p[v1];[0:a]aresample=48000[a0];[1:a]aresample=48000,aformat=channel_layouts=stereo[a1];'
     '[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]','-map','[v]','-map','[a]',
     '-c:v','libx264','-crf','16','-preset','slow','-profile:v','high','-pix_fmt','yuv420p','-r','24',
     '-c:a','aac','-b:a','256k','-movflags','+faststart','falafel-cups-fakehook.mp4'])
print('hook', round(H1-H0,2), 'mix', (I,P), 'gain', round(g,2), 'final', meas('falafel-cups-fakehook.mp4'))
