# Onion garlic chicken pasta, the sweet potato way: a 0.67 s flash of the fork shot, then the reel in order, the bite
# at 1.4x with the CTA only. 4K, one encode, HEVC Main 10, BT.709, like the source. Runs in the sandbox next to
# raw4k.mp4 (job 1c08b361) and cta4k.png (ov_cta.png, rendered with SCALE=2).
import subprocess, re
FPS=24
F0,F1=237,253     # fork shot (flash)
M1=253            # main: frames 0..252
B0,B1,BS=253,289,1.4   # bite
def run(c): subprocess.run(c,check=True)
def meas(f):
    e=subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af','ebur128=peak=true','-f','null','-'],capture_output=True,text=True).stderr
    s=e[e.rindex('Summary'):]
    return float(re.search(r'I:\s+(-?[\d.]+)',s).group(1)), float(re.search(r'Peak:\s+(-?[\d.]+)',s).group(1))
nfl=F1-F0; nm=M1; nb=round((B1-B0)/BS)
T_BITE=(nfl+nm)/FPS; TOTAL=(nfl+nm+nb)/FPS
# the chicken slap down 8 dB; cream, parmesan, toss and the fork up 4 dB (the money shot loudest)
vol=("volume='if(between(t,1.85,2.40),0.40,1)*if(between(t,6.60,8.55),1.6,1)*if(between(t,9.85,10.55),1.6,1)':eval=frame")
afc=[f"[0:a]atrim=start={F0/FPS:.4f}:end={F1/FPS:.4f},asetpts=PTS-STARTPTS,volume=1.6,afade=t=in:d=0.02,afade=t=out:st={nfl/FPS-0.03:.4f}:d=0.03,aresample=48000[a0]",
     f"[1:a]atrim=end={M1/FPS:.4f},asetpts=PTS-STARTPTS,{vol},afade=t=in:d=0.02,afade=t=out:st={nm/FPS-0.02:.4f}:d=0.02,aresample=48000[a1]",
     f"[1:a]atrim=start={B0/FPS:.4f}:end={B1/FPS:.4f},asetpts=PTS-STARTPTS,atempo={BS},apad,atrim=0:{nb/FPS:.4f},afade=t=in:d=0.02,aresample=48000[a2]",
     "[a0][a1][a2]concat=n=3:v=0:a=1,aformat=channel_layouts=mono,acompressor=threshold=-30dB:ratio=4:attack=4:release=150:makeup=1,acompressor=threshold=-18dB:ratio=3:attack=2:release=80[a]"]
run(['ffmpeg','-v','error','-y','-i','raw4k.mp4','-i','raw4k.mp4','-filter_complex',';'.join(afc),'-map','[a]','-c:a','pcm_s16le','mix.wav'])
I,P=meas('mix.wav'); g0=-17.5-I
run(['ffmpeg','-v','error','-y','-i','mix.wav','-af',f'volume={g0:.2f}dB,alimiter=limit=0.80:attack=2:release=60:level=disabled','mix2.wav'])
I2,P2=meas('mix2.wav'); g=-17.5-I2   # mono at -17.5 = stereo -14.5
vfc=[f"[0:v]trim=start_frame={F0}:end_frame={F1},setpts=PTS-STARTPTS[v0]",
     "[1:v]split=2[m0][m1]",
     f"[m0]trim=end_frame={M1},setpts=PTS-STARTPTS[v1]",
     f"[m1]trim=start_frame={B0}:end_frame={B1},setpts=(PTS-STARTPTS)/{BS},fps={FPS},trim=end_frame={nb}[v2]",
     "[v0][v1][v2]concat=n=3:v=1:a=0,format=yuv420p10le[vc]",
     f"[2:v]format=rgba,fade=t=in:st=0:d=0.15:alpha=1,setpts=PTS-STARTPTS+{T_BITE+0.04:.3f}/TB[c]",
     "[vc][c]overlay=0:0:format=yuv420p10:eof_action=pass,format=yuv420p10le,setsar=1[v]",
     f"[3:a]volume={g:.2f}dB,alimiter=limit=0.82:attack=2:release=60:level=disabled,aresample=48000,pan=stereo|c0=c0|c1=c0[ao]"]
run(['ffmpeg','-v','error','-y','-i','raw4k.mp4','-i','raw4k.mp4','-loop','1','-t',f'{TOTAL-T_BITE:.3f}','-r',str(FPS),'-i','cta4k.png','-i','mix2.wav',
     '-filter_complex',';'.join(vfc),'-map','[v]','-map','[ao]',
     '-c:v','libx265','-preset','medium','-crf','16','-pix_fmt','yuv420p10le','-profile:v','main10','-tag:v','hvc1',
     '-x265-params','colorprim=bt709:transfer=bt709:colormatrix=bt709:range=limited:log-level=error',
     '-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709','-color_range','tv','-r',str(FPS),
     '-c:a','aac','-b:a','256k','-shortest','-movflags','+faststart','onion-pasta-4k.mp4'])
print('total',round(TOTAL,3),'bite at',round(T_BITE,3),'mix',I,P,'final',meas('onion-pasta-4k.mp4'))
