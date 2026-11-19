# Story intro: the selfie he talks in (Seedance 2.5 job 8bd3323c, his ElevenLabs voice f88c53f5 as @Audio1), 2026-11-19.
# The owner: «دورك هو تحطك الكابشن وزوم وedit وتضيف شوية صور وهيك على طريقتك».
# The lips follow the take's own voice track (its pauses differ from the mp3's), so the take's track stays.
# Usage (Higgsfield sandbox, /home/user/intro with take.mp4, cover.jpg, pdfc-01.jpg, p_ice/p_bean/p_dough.jpg):
#   python3 edit_intro.py
import subprocess, re, json

FPS, N = 24, 481                     # the take: 720x1280, 24 fps, 481 frames (20.04 s)
SUB_Y, BUBBLE_Y = 1290, 1530
LIM = 'aresample=192000,alimiter=limit=0.89:attack=1:release=40:level=disabled,aresample=48000'


def run(c): subprocess.run(c, check=True)


# the take's speech (silencedetect -35 dB, 0.18 s): 0.23-2.34 | 2.58-3.38 | 4.03-4.61 | 4.88-5.67 | 5.89-7.03 |
# 7.41-9.90 | 10.21-11.91 + 12.59-13.10 | 13.51-15.29 | 15.58-16.60 + 16.82-17.76 | 18.32-19.16; then the smile and nod
CUES = [  # (start, end, Arabic parts [(text, gold)], English, style)
    (0.12, 2.47, [('٣٦١', 1), (' وصفة حلال…', 0)], '361 halal recipes…', 'ar title'),
    (2.47, 3.95, [('بكتاب واحد.', 0)], 'in one book.', 'ar'),
    (3.95, 4.82, [('أنا أحمد،', 0)], "I'm Ahmad,", 'ar'),
    (4.82, 5.80, [('وهاد كتابي:', 0)], 'and this is my book:', 'ar'),
    (5.80, 7.32, [('The Edible Codex', 0)], '', 'big'),
    (7.32, 10.05, [('كل حلقة من ', 0), ('«بروتين من الكتاب»', 1)], 'Every episode of Protein from the Book', 'ar'),
    (10.05, 13.30, [('وصفة منه،\nفيها بروتين قد وجبة كاملة.', 0)], "one recipe from it, a full meal's protein.", 'ar'),
    (13.30, 15.42, [('بدك ', 0), ('٨ وصفات', 1), (' منهم ببلاش؟', 0)], 'Want 8 of them free?', 'ar'),
    (15.42, 18.05, [('ردّ على هالستوري بكلمة ', 0), ('«بروتين»', 1)], 'Reply PROTEIN to this story', 'ar'),
    (18.05, 20.04, [('وأهلا فيك هون.', 0)], 'Welcome.', 'ar'),
]
# photo cards over the selfie (no cut anywhere: the selfie runs under them), never in 0-3 s
CARDS = [  # v3 (owner: «ليش مغطي على وجهي»): beside his face, never over it. His sunglasses stay inside x 260-810
    # from 5 to 16 s (base.mkv with lines at x 250 and 830, every 0.8 s), so the cards live in the kitchen at the sides,
    # 225 px wide (x 12-237 and 843-1068, y 360-760), one a side at most; never in 0-3 s; no cut under them
    # the book cover from the site (public/brand/book/cover.jpg, 1200x1500): the book itself, 831x1150 at (184,175)
    dict(src='cover.jpg', s=5.80, e=7.32, x=955, y=600, w=225, h=311, rot=3, side='right',
         img=dict(left=-50, top=-47, w=325, h=406)),
    # the three episodes, their own takes (labels already blurred), the protein the edits said: left, right, left
    dict(src='p_ice.jpg', s=7.40, e=8.70, x=125, y=560, w=225, h=400, rot=-3, side='left', pill='47 غ',
         img=dict(left=0, top=0, w=225, h=400)),
    dict(src='p_bean.jpg', s=8.00, e=10.05, x=955, y=560, w=225, h=400, rot=3, side='right', pill='55 غ',
         img=dict(left=0, top=0, w=225, h=400)),
    dict(src='p_dough.jpg', s=8.70, e=10.05, x=125, y=560, w=225, h=400, rot=-3, side='left', pill='70 غ',
         img=dict(left=0, top=0, w=225, h=400)),
    # the free PDF's cover (page 1 of the DM's PDF)
    dict(src='pdfc-01.jpg', s=13.35, e=15.42, x=125, y=600, w=225, h=318, rot=-3, side='left', badge='ببلاش',
         img=dict(left=0, top=0, w=225, h=318)),
]
for c in CARDS: c['from'] = c.pop('side')
BUBBLE = dict(s=15.62, e=18.05, text='بروتين')
spec = dict(fps=FPS, frames=N, cps=40, subY=SUB_Y, bubbleY=BUBBLE_Y, bubble=BUBBLE, cards=CARDS,
            cues=[dict(s=s, e=e, ar=ar, en=en, kind=k) for s, e, ar, en, k in CUES])
json.dump(spec, open('cues.json', 'w'), ensure_ascii=False)
run(['node', 'intro_overlay.mjs', 'cues.json', 'ovl'])

# zoom: a slow push on the hook, punch-ins on his name and on the ask, a release on the smile
ZK = [(0, 1.00), (2.45, 1.05), (3.95, 1.05), (4.15, 1.16), (5.8, 1.10), (10.0, 1.05), (13.3, 1.11), (15.42, 1.11),
      (15.62, 1.21), (18.05, 1.15), (19.0, 1.03), (20.1, 1.02)]


def zexpr():
    k = [(round(t * FPS), z) for t, z in ZK]; e = str(k[-1][1])
    for (f0, z0), (f1, z1) in reversed(list(zip(k, k[1:]))):
        e = f"if(lt(in,{f1}),{z0}+({z1}-{z0})*(in-{f0})/{f1 - f0},{e})"
    return e


run(['ffmpeg', '-v', 'error', '-y', '-i', 'take.mp4', '-vf',
     f"scale=1440:2560:flags=lanczos,zoompan=z='{zexpr()}':x='(iw-iw/zoom)/2':y='(ih-ih/zoom)*0.42':d=1:s=1080x1920:fps={FPS},"
     "setsar=1,format=yuv420p", '-an', '-c:v', 'libx264', '-qp', '0', '-preset', 'ultrafast', 'base.mkv'])


def meas(f):
    e = subprocess.run(['ffmpeg', '-hide_banner', '-i', f, '-af', 'ebur128=peak=true', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    s = e[e.rindex('Summary'):]
    return float(re.search(r'I:\s+(-?[\d.]+)', s).group(1)), float(re.search(r'Peak:\s+(-?[\d.]+)', s).group(1))


# sound: the take's own voice, no compressor; a voice story sits at -16 LUFS (the cooking reels' -20 is for ASMR)
run(['ffmpeg', '-v', 'error', '-y', '-i', 'take.mp4', '-vn', '-ac', '1', '-ar', '48000', 'voice_take.wav'])
I, P = meas('voice_take.wav'); g = -16.0 - I
OUT = 'story-intro-selfie.mp4'
run(['ffmpeg', '-v', 'error', '-y', '-i', 'base.mkv', '-framerate', str(FPS), '-i', 'ovl/f%03d.png', '-i', 'voice_take.wav',
     '-filter_complex', f'[0:v][1:v]overlay=0:0:format=auto,format=yuv420p[v];[2:a]volume={g:.2f}dB,{LIM}[a]',
     '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-crf', '17', '-preset', 'medium', '-pix_fmt', 'yuv420p',
     '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', '-shortest', OUT])
print('take', I, P, 'gain', round(g, 2), 'final', meas(OUT))
ts = [0.6, 2.0, 3.0, 4.3, 6.5, 9.2, 11.5, 14.4, 16.8, 19.3]
sel = '+'.join(f'eq(n\\,{round(t * FPS)})' for t in ts)
run(['ffmpeg', '-v', 'error', '-y', '-i', OUT, '-vf', f"select='{sel}',scale=270:480,tile=10x1", '-vsync', '0',
     '-frames:v', '1', 'sheet_final.jpg'])
