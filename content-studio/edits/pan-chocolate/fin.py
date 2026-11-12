# Loudness: one measured gain (target -14.5 LUFS plus 2.2 dB the limiter takes back), then a limiter
# (ceiling 0.80, about -1.9 dBFS); video copied. v1 2026-11-11: -15.5 LUFS, -1.3 dBTP; v2 2026-11-12: -15.7 LUFS, -1.2 dBTP.
import subprocess, json, re
def meas(f):
    e=subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
    s=e[e.rindex('Summary'):]
    return float(re.search(r'I:\s+(-?[\d.]+)',s).group(1)), float(re.search(r'Peak:\s+(-?[\d.]+)',s).group(1))
I,P=meas('pan-mix.mov'); g=-14.5-I+2.2
af=f"volume={g:.2f}dB,alimiter=limit=0.80:attack=2:release=60:level=disabled,aresample=48000"
subprocess.run(['ffmpeg','-v','error','-y','-i','pan-mix.mov','-c:v','copy','-af',af,'-c:a','aac','-b:a','192k','-movflags','+faststart','pan-edit.mp4'],check=True)
I2,P2=meas('pan-edit.mp4'); print('mix',I,P,'gain',round(g,2),'final',I2,P2)
