# v3 (2026-11-12, owner: «الفيديو مش بنفس الجودة»): the v2 cut rendered at the source quality.
# Run in the sandbox next to edit_v2.py, raw4k.mp4, v2-audio.wav (from edit_v2.py) and k4/ (kin4k + end4k PNGs, made
# locally with SCALE=2 node kinetic.mjs kinetic.json kin4k and SCALE=2 node ../../overlay.mjs end.json end4k).
# It writes edit_v3.py: same cut and timings as v2, but
#   - output 2160x3840 (the source's 4K), one single encode: HEVC Main 10, BT.709 tags, hvc1, CRF 16;
#   - Layla's close-up 2.0x instead of 2.4x and the tablet 1.5x instead of 1.8x (less enlargement);
#   - subtitles and end card rendered at 2x (crisp at 4K), the subtitle track fed as an ffconcat of PNGs;
#   - the end card as a lossless FFV1 10-bit intermediate.
# Then the audio is set to -14.5 LUFS on the stereo file (the mono mix at -3 dB, limiter 0.80):
#   ffmpeg -i v3-loud.mp4 -i v2-audio.wav -map 0:v -map 1:a -c:v copy -af "volume=-3.0dB,alimiter=limit=0.80:attack=3:release=80:level=disabled,aresample=48000,pan=stereo|c0=c0|c1=c0" -c:a aac -b:a 256k -shortest -movflags +faststart -tag:v hvc1 no-secrets-ad-v3-4k.mp4
s=open('edit_v2.py').read()
rep={
"('S1 tablet close',1.62,2.62,1.0,.5,.722,1.8,0.06,None,0)":"('S1 tablet close',1.62,2.62,1.0,.5,.667,1.5,0.06,None,0)",
"('S2b Layla',3.45,4.30,1.0,.208,.374,2.4,0.04,None,0)":"('S2b Layla',3.45,4.30,1.0,.25,.385,2.0,0.04,None,0)",
":d=1:s=1080x1920:fps={FPS},setsar=1,format=yuv420p\")":":d=1:s=2160x3840:fps={FPS},setsar=1,format=yuv420p10le\")",
"'k1a':([1.70,2.22],2.58,-720)":"'k1a':([1.70,2.22],2.58,-540)",
}
for k,v in rep.items():
    assert k in s,k; s=s.replace(k,v,1)
a=s.index("os.makedirs('subf',exist_ok=True); cache={}")
head=s[:a].replace("if not os.path.exists('v2-pic.mov'): run(","PIC_CMD=(")
tail=r'''
# ---- 4K subtitle track: ffconcat of shifted 2160x3840 state PNGs
os.makedirs('k4s',exist_ok=True)
Image.new('RGBA',(2160,3840),(0,0,0,0)).save('k4s/blank.png')
runs=[]; prev=None; start=0
for f in range(NF+1):
    it=frames[f] if f<NF else ('END',0)
    if it!=prev:
        if prev is not None or f>0: runs.append((prev,start,f))
        prev=it; start=f
lines=['ffconcat version 1.0']
for it,a0,b0 in runs:
    if it is None: name='k4s/blank.png'
    else:
        name=f"k4s/{it[0]}_{it[1]}.png"
        if not os.path.exists(name):
            im=Image.open(f"k4/{it[0]}.png").convert('RGBA'); c=Image.new('RGBA',(2160,3840),(0,0,0,0)); c.paste(im,(0,2*it[1]),im); c.save(name)
    lines+= [f"file '{name}'", f"duration {(b0-a0)/FPS:.5f}"]
lines.append(f"file '{runs[-1][0] and ('k4s/'+runs[-1][0][0]+'_'+str(runs[-1][0][1])+'.png') or 'k4s/blank.png'}'")
open('subs4k.txt','w').write('\n'.join(lines)+'\n')
# ---- 4K end card, lossless intermediate
E=2.5; NE=int(E*FPS)
efc=["[1:v]format=rgba[cov]",
    "[0:v][cov]overlay=x='(W-w)/2':y='760':shortest=1,format=yuv420p[b0]",
    f"[b0]zoompan=z='1.06-0.06*on/{NE-1}':x='(iw-iw/zoom)/2':y='(ih-ih/zoom)*0.36':d=1:s=2160x3840:fps={FPS},fade=t=in:st=0:d=0.30,format=yuv420p10le[b1]",
    "[2:v]format=rgba,fade=t=in:st=0.35:d=0.25:alpha=1[tx]","[3:v]format=rgba,fade=t=in:st=0.65:d=0.25:alpha=1[wb]",
    "[b1][tx]overlay=0:0:format=yuv420p10[b2]","[b2][wb]overlay=0:0:format=yuv420p10,drawbox=x=0:y=0:w=iw:h=ih:color=white@0.5:t=fill:enable='lt(t,0.08)',format=yuv420p10le[ev]"]
run(['ffmpeg','-v','error','-y','-loop','1','-t',str(E),'-r',str(FPS),'-i','k4/endbg.png','-loop','1','-t',str(E),'-r',str(FPS),'-i','k4/cover_book.png',
     '-loop','1','-t',str(E),'-r',str(FPS),'-i','k4/ov_endtext.png','-loop','1','-t',str(E),'-r',str(FPS),'-i','k4/ov_endweb.png',
     '-filter_complex',';'.join(efc),'-map','[ev]','-frames:v',str(NE),'-c:v','ffv1','-pix_fmt','yuv420p10le','endcard4k.mkv'])
# ---- one encode: picture + subtitles + end card -> HEVC Main 10, BT.709, like the source (audio fixed afterwards)
vfc=[x for x in fc if not x.startswith('[0:a]') and not x.startswith('[t')]
vfc[-1]=''.join(f"[v{i}]" for i in range(len(SEG)))+f"concat=n={len(SEG)}:v=1:a=0[vc]"
vfc.append("[1:v]fps=24,format=rgba[sub]")
vfc.append(f"[vc][sub]overlay=0:0:format=yuv420p10:eof_action=pass,trim=end={FILM:.4f},setpts=PTS-STARTPTS,format=yuv420p10le[f]")
vfc.append("[2:v]setpts=PTS-STARTPTS,format=yuv420p10le[e]")
vfc.append("[f][e]concat=n=2:v=1:a=0,setsar=1[v]")
run(['ffmpeg','-v','error','-y','-i',SRC,'-f','concat','-safe','0','-i','subs4k.txt','-i','endcard4k.mkv',
     '-filter_complex',';'.join(vfc),'-map','[v]',
     '-c:v','libx265','-preset','medium','-crf','16','-pix_fmt','yuv420p10le','-profile:v','main10','-tag:v','hvc1',
     '-x265-params','colorprim=bt709:transfer=bt709:colormatrix=bt709:range=limited:log-level=error',
     '-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709','-color_range','tv','-r',str(FPS),
     '-movflags','+faststart','v3-loud.mp4'])
'''
open('edit_v3.py','w').write(head+tail)
print('wrote edit_v3.py')
