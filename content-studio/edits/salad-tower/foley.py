# Natural sounds for the chef's salad-tower reference (comm.mp4, 19.9 s), each on its action (Epidemic Sound via Higgsfield).
# Higgsfield sandbox /home/user/comm (sfx/ holds the downloads). v2, 25 Nov (the owner: «صوت تكت الصحن مش مظبوط، ركبه بشكل
# مضبوط وقوه بصوت الصحن الحقيقي»): the spoon strikes found by the splatter landing on the lower plate (one frame later):
# 0.77, 2.13, 3.60 s; each strike three layers (Cutlery Hit Dish, Ceramics Plate Put Down Clink, Spoon Taps On Plate), the
# loudest sounds of the reel; the ring on the plate at 4.32 s.
import subprocess, numpy as np, os
S="sfx"
def peak(f,ss,t):
    p=subprocess.run(["ffmpeg","-v","error","-ss",str(ss),"-t",str(t),"-i",f,"-ac","1","-ar","48000","-f","s16le","-"],capture_output=True)
    a=np.abs(np.frombuffer(p.stdout,np.int16).astype(float)/32768); return 20*np.log10(a.max()+1e-9)
# (name, source, start in source, length, place at, target peak dB, fade out)
EV=[]
# the spoon strikes the held plate one frame before each splatter lands (0.80, 2.17, 3.63 s on the lower plate)
for k,(st,land,sp_ss,sp_on) in enumerate([(0.77,0.80,1.50,1.623),(2.13,2.17,4.75,4.868),(3.60,3.63,20.10,20.192)]):
    EV+=[(f"hit{k}","hit.mp3",0.0,0.5,st-0.020,-1,0.15),
         (f"plt{k}","plate.mp3",0.0,0.7,st-0.042,-7,0.4),
         (f"tap{k}","tap.mp3",0.0,0.4,st-0.103,-6,0.15),
         (f"sp{k}","splat.mp3",sp_ss,0.8,land-(sp_on-sp_ss),-11,0.2)]
EV+=[("ring","clink.mp3",0.0,0.6,4.32-0.033,-3,0.1),("ringp","plate.mp3",0.0,0.7,4.32-0.042,-9,0.4),
    ("press","squish.mp3",3.0,1.6,5.35,-13,0.3),
    ("bowl","clink.mp3",0.0,0.6,7.05,-13,0.1),("toss","leaves.mp3",0.3,1.0,7.05,-11,0.3),
    ("fill","leaves.mp3",2.0,1.4,8.05,-13,0.4),
    ("avo","squish.mp3",9.0,0.8,9.65,-13,0.2),
    ("feta","squish.mp3",15.0,1.8,10.6,-17,0.4),
    ("nest","leaves.mp3",3.6,0.9,12.70,-12,0.3),
    ("lift","scrape.mp3",0.2,1.4,13.65,-15,0.4)]
ins=["-i","comm.mp4"]; flt=[]; labs=[]
for i,(n,f,ss,t,at,tp,fo) in enumerate(EV):
    g=tp-peak(f"{S}/{f}",ss,t)
    ins+=["-ss",str(ss),"-t",str(t),"-i",f"{S}/{f}"]
    d=int(at*1000)
    flt.append(f"[{i+1}:a]aformat=sample_rates=48000:channel_layouts=stereo,volume={g:.1f}dB,afade=t=in:d=0.01,afade=t=out:st={t-fo:.2f}:d={fo},adelay={d}|{d}[e{i}]")
    labs.append(f"[e{i}]")
k=len(EV)+1
ins+=["-ss","20","-t","20","-i",f"{S}/amb.mp3"]
flt.append(f"[{k}:a]aformat=sample_rates=48000:channel_layouts=stereo,volume=-4dB,afade=t=in:d=0.3,afade=t=out:st=19.3:d=0.6[amb]")
labs.append("[amb]")
flt.append("".join(labs)+f"amix=inputs={len(labs)}:normalize=0:duration=longest,atrim=0:19.9,volume=5dB,alimiter=limit=0.84:attack=0.5:release=40:level=disabled,aresample=48000,aformat=channel_layouts=stereo[mix]")
cmd=["ffmpeg","-v","error","-y"]+ins+["-filter_complex",";".join(flt),"-map","0:v","-map","[mix]","-c:v","copy","-c:a","aac","-b:a","256k","-shortest","-movflags","+faststart","out_foley.mp4"]
subprocess.run(cmd,check=True)
print("ok")
