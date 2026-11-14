# Pull Away Reveal, standalone (owner, 2026-11-14: «ما بدو اشي ... بس بدو تسريع ... انزلو هسة»): take 5bb1f69b
# (prompt v2 in prompts/w4-flatbreads-pull-away-reveal.txt), only sped up. Measured: 0-2.5 s DEAD/SLOW (motion 3-6),
# the pulls 2.5-6.0 s good (13-21), the push-in on the hero 6.0-8.0 s LONG and DEAD at 7.5 s. Speeds: the wide from
# 1.0 s (0-1.0 s read DEAD) at 2.5x, the pulls 1.1x, the hero 1.6x to 7.6 s. No text. A 300 Hz high-pass on the sound:
# a short periodic tone near 3.0 s (219 Hz) may be a voice.
# Result 2026-11-14: 4.50 s, DEAD 0, SLOW 0, LONG 0, QUIET 0; -14.6 LUFS after +0.6 dB; media 0431c398.
import subprocess, re
FPS = 24
SEG = [(1.0, 3.0, 2.5), (3.0, 6.0, 1.1), (6.0, 7.6, 1.6)]
def run(c): subprocess.run(c, check=True)
def meas(f):
    e = subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
    s = e[e.rindex('Summary'):]
    return float(re.search(r'I:\s+(-?[\d.]+)',s).group(1)), float(re.search(r'Peak:\s+(-?[\d.]+)',s).group(1))
def atempo(sp):
    out = []
    while sp > 2.0: out.append('atempo=2.0'); sp /= 2.0
    out.append(f'atempo={sp:.4f}'); return ','.join(out)
v, a = [], []
for i, (t0, t1, sp) in enumerate(SEG):
    v.append(f"[0:v]trim=start={t0}:end={t1},setpts=(PTS-STARTPTS)/{sp},fps={FPS},scale=1080:1920:flags=lanczos,setsar=1,format=yuv420p[v{i}]")
    a.append(f"[0:a]atrim=start={t0}:end={t1},asetpts=PTS-STARTPTS,{atempo(sp)},aresample=48000,aformat=channel_layouts=mono,highpass=f=300[a{i}]")
n = len(SEG)
fc = ';'.join(v + a) + ';' + ''.join(f'[v{i}]' for i in range(n)) + f'concat=n={n}:v=1:a=0[v];' + ''.join(f'[a{i}]' for i in range(n)) + f'concat=n={n}:v=0:a=1,afade=t=in:d=0.02[x]'
run(['ffmpeg','-v','error','-y','-i','take2.mp4','-filter_complex',fc,'-map','[v]','-map','[x]','-c:v','libx264','-crf','14','-preset','slow','-r',str(FPS),'-c:a','pcm_s16le','mid.mov'])
I, P = meas('mid.mov'); g = -14.5 - I
run(['ffmpeg','-v','error','-y','-i','mid.mov','-af',f"volume={g:.2f}dB,alimiter=limit=0.80:attack=3:release=80:level=disabled,pan=stereo|c0=c0|c1=c0",
     '-c:v','libx264','-crf','16','-preset','slow','-profile:v','high','-pix_fmt','yuv420p','-r',str(FPS),'-c:a','aac','-b:a','256k','-movflags','+faststart','pull-away-reveal.mp4'])
# the limiter left it at -15.1 LUFS: +0.6 dB on the sound only
run(['ffmpeg','-v','error','-y','-i','pull-away-reveal.mp4','-c:v','copy','-af','volume=0.6dB,alimiter=limit=0.84:attack=3:release=80:level=disabled',
     '-c:a','aac','-b:a','256k','-movflags','+faststart','pull-away-reveal-final.mp4'])
print('mix', (I, P), 'gain', round(g, 2), 'final', meas('pull-away-reveal-final.mp4'))
