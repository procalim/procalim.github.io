# Pull Away Reveal, matched to the source (owner, 2026-11-14: «قصدي حركات الفيديو مطابقة زي الفيديو الي منو»).
# The take 5bb1f69b already follows the source's timing (motion peaks: source cut 3.0, pulls 3.6/4.2-4.3/4.8-4.9/5.5;
# take cut 2.9, pulls 3.6/4.2/4.8/5.4-5.6). The sped-up cut (0431c398) broke that rhythm. This one: 0-6.1 s at 1.0x,
# cut where the source ends (6.1 s). No text. 300 Hz high-pass on the sound (a possible voice near 3.0 s).
# Result 2026-11-14: 6.17 s, -14.9 LUFS; pp.py DEAD 3, SLOW 2 on the opening wide, as on the source itself (DEAD 4,
# SLOW 2): a faithful match, the owner's call. Media 76d74a06 (replaces 0431c398).
import subprocess, re
def run(c): subprocess.run(c, check=True)
def meas(f):
    e = subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
    s = e[e.rindex('Summary'):]
    return float(re.search(r'I:\s+(-?[\d.]+)',s).group(1)), float(re.search(r'Peak:\s+(-?[\d.]+)',s).group(1))
run(['ffmpeg','-v','error','-y','-i','take2.mp4','-t','6.1','-vf','scale=1080:1920:flags=lanczos,setsar=1,format=yuv420p',
     '-af','aresample=48000,aformat=channel_layouts=mono,highpass=f=300,afade=t=out:st=6.04:d=0.06',
     '-c:v','libx264','-crf','14','-preset','slow','-r','24','-c:a','pcm_s16le','match_mid.mov'])
I, P = meas('match_mid.mov'); g = -14.5 - I
run(['ffmpeg','-v','error','-y','-i','match_mid.mov','-af',f"volume={g:.2f}dB,alimiter=limit=0.84:attack=3:release=80:level=disabled,pan=stereo|c0=c0|c1=c0",
     '-c:v','libx264','-crf','16','-preset','slow','-profile:v','high','-pix_fmt','yuv420p','-r','24',
     '-c:a','aac','-b:a','256k','-movflags','+faststart','pull-away-reveal-match.mp4'])
print('mix', (I, P), 'gain', round(g, 2), 'final', meas('pull-away-reveal-match.mp4'))
