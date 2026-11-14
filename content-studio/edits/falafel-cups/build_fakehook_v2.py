# Falafel fake hook v2 (owner, 2026-11-14: «آخر ثواني افضل من اول ثلاث ثواني ... ارجع الخصر»): the take's last
# seconds, 3.00-5.05 s (the plate brought down to his waist, tomato spilled on the plate), push-in 1.0-1.08, then the
# falafel v4. Sound: the take's own plate rattle and knock from 0.20-2.25 s laid under it (the same 2.05 s); the take's
# sound past 2.25 s is quiet (-45 dB) with a periodic sound near 4.0 s that may be a voice, so it is not used.
# Result 2026-11-14: 11.67 s, DEAD 0, SLOW 0, LONG 0, QUIET 0; -14.2 LUFS, peak -1.1; media 264b3e20 (replaces 9070e05d).
import subprocess, re
FPS = 24
V0, V1 = 3.00, 5.05
A0 = 0.20
def run(c): subprocess.run(c, check=True)
def meas(f):
    e = subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
    s = e[e.rindex('Summary'):]
    return float(re.search(r'I:\s+(-?[\d.]+)',s).group(1)), float(re.search(r'Peak:\s+(-?[\d.]+)',s).group(1))
D = V1 - V0; n = round(D*FPS)
v = (f"[0:v]trim=start={V0}:end={V1},setpts=PTS-STARTPTS,fps={FPS},scale=1080:1920:flags=lanczos,"
     f"zoompan=z='1+0.08*on/{n}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps={FPS},format=yuv420p[v]")
a = (f"[0:a]atrim=start={A0}:end={A0+D},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=mono,"
     f"afade=t=in:d=0.02,afade=t=out:st={D-0.06:.3f}:d=0.06[x]")
run(['ffmpeg','-v','error','-y','-i','hook_raw.mp4','-filter_complex',v+';'+a,'-map','[v]','-map','[x]',
     '-c:v','libx264','-crf','14','-preset','slow','-r',str(FPS),'-c:a','pcm_s16le','hook2.mov'])
I,P = meas('hook2.mov'); g = -14.5 - I
run(['ffmpeg','-v','error','-y','-i','hook2.mov','-c:v','copy','-af',
     f"volume={g:.2f}dB,alimiter=limit=0.80:attack=3:release=80:level=disabled,pan=stereo|c0=c0|c1=c0",
     '-c:a','pcm_s16le','hook2_lev.mov'])
run(['ffmpeg','-v','error','-y','-i','hook2_lev.mov','-i','/home/user/falafel/falafel-cups.mp4','-filter_complex',
     '[0:v]setsar=1[v0];[1:v]setsar=1,fps=24,format=yuv420p[v1];[0:a]aresample=48000[a0];[1:a]aresample=48000,aformat=channel_layouts=stereo[a1];'
     '[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]','-map','[v]','-map','[a]',
     '-c:v','libx264','-crf','16','-preset','slow','-profile:v','high','-pix_fmt','yuv420p','-r','24',
     '-c:a','aac','-b:a','256k','-movflags','+faststart','falafel-cups-fakehook-v2.mp4'])
print('hook', round(D,2), 'mix', (I,P), 'gain', round(g,2), 'final', meas('falafel-cups-fakehook-v2.mp4'))
