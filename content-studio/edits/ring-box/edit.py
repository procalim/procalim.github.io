# The Ring Box edit (24 Nov), job 0877a64b (720p, 20.05 s), Higgsfield sandbox /home/user/rb1.
# The take's own shots, dead frames out, cuts on the take's own cuts (1.88, 3.21, 4.00, 5.12, 7.17, 8.12, 10.17, 10.46,
# 11.12, 12.21, 13.88, 15.42, 16.71); one 0.25 s dissolve on the box where the slow pour is skipped (the box in place);
# one punch-in (1.12x) to hide the jump in the chewing. Out: the ring placed in plain view (9.67-10.17: it spoiled the
# reveal), the still box (8.75-9.67), the long holds. 1080x1920 from the 720p take.
import subprocess, json
SEG=[("s01",0.45,1.88),("s02",1.88,2.75),("s03",3.21,4.00),("s04",4.00,4.70),("s05a",5.12,6.42),("s05b",6.68,7.17),
     ("s06",7.17,8.12),("s07",8.12,8.70),("s08",10.17,10.46),("s09",10.46,10.70),("s10",11.15,12.21),("s11",12.21,13.00),
     ("s12",13.88,15.42),("s13",15.42,15.97),("s14a",16.71,18.20),("s14b",19.00,20.05)]
V="scale=1080:1920:flags=lanczos,setsar=1,fps=24"
def run(a): subprocess.run(a,check=True)
for n,a,b in SEG:
    vf=V if n!="s14b" else "scale=1210:2150:flags=lanczos,crop=1080:1920:65:150,setsar=1,fps=24"
    d=b-a
    run(["ffmpeg","-v","error","-y","-ss",f"{a}","-i","take.mp4","-t",f"{d:.3f}","-vf",vf,
         "-af",f"afade=t=in:d=0.012,afade=t=out:st={d-0.012:.3f}:d=0.012","-c:v","libx264","-crf","12","-preset","fast",
         "-c:a","aac","-b:a","256k","-ar","48000",f"{n}.mp4"])
la=SEG[4][2]-SEG[4][1]
run(["ffmpeg","-v","error","-y","-i","s05a.mp4","-i","s05b.mp4","-filter_complex",
     f"[0:v][1:v]xfade=transition=fade:duration=0.25:offset={la-0.25:.3f}[v];[0:a][1:a]acrossfade=d=0.25[a]",
     "-map","[v]","-map","[a]","-c:v","libx264","-crf","12","-preset","fast","-c:a","aac","-b:a","256k","s05.mp4"])
order=["s01","s02","s03","s04","s05","s06","s07","s08","s09","s10","s11","s12","s13","s14a","s14b"]
dur={}
for n in order:
    dur[n]=float(subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f"{n}.mp4"],capture_output=True,text=True).stdout)
t=0; starts={}
for n in order: starts[n]=t; t+=dur[n]
json.dump({"order":order,"dur":dur,"starts":starts,"total":t},open("edit.json","w"),indent=1)
open("list.txt","w").write("".join(f"file '{n}.mp4'\n" for n in order))
run(["ffmpeg","-v","error","-y","-f","concat","-safe","0","-i","list.txt","-c:v","libx264","-crf","12","-preset","fast",
     "-c:a","aac","-b:a","256k","cut.mp4"])
print(json.dumps({"total":round(t,2),"hook_end":round(starts["s02"],2),"send_from":round(starts["s13"],2)}))
