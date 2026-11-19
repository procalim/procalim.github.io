# Hook and text check (2026-11-19, research/hook-bank.md section 4). Score out of 10; 8 or more ships.
# Usage (Higgsfield sandbox, in the edit folder after the render): python3 hook_check.py final.mp4 timeline.json typ
# timeline.json (written by the edit script): {fps, total, hook_formula: [letters], send_type, cards: [{key, start, end,
# y, items: [{k, t}]}]}
import json, subprocess, sys, glob, os, numpy as np
from PIL import Image
video, tl_path, typ = sys.argv[1], sys.argv[2], sys.argv[3]
T = json.load(open(tl_path)); fps = T['fps']; total = T['total']; cards = T['cards']
pts, notes = 0, []
# 1. the formula (own skip by type, outside multiples)
f = set(T.get('hook_formula', []))
p = 2 if f & {'A', 'B', 'E', 'I', 'G'} else 1 if f & {'H', 'J'} else 0
pts += p; notes.append(f"formula {sorted(f)}: {p}/2")
# 2. 6 words or fewer in 0-3 s, nothing else on screen
early = [c for c in cards if c['start'] < 3.0]
words = sum(len(it['t'].split()) for c in early for it in c['items'])
p = 1 if words <= 6 and len(early) == 1 else 0; pts += p; notes.append(f"words in 0-3 s: {words} on {len(early)} card(s): {p}/1")
# 3. the first line typed by 1.5 s
hook = early[0]; ev = json.load(open(os.path.join(typ, hook['key'], 'events.json')))
n1 = len([ch for ch in hook['items'][0]['t'] if ch.strip()])
t1 = hook['start'] + (ev[min(n1, len(ev)) - 1] / fps if ev else 99)
p = 1 if t1 <= 1.5 else 0; pts += p; notes.append(f"first line typed by {t1:.2f} s: {p}/1")
# 4. the answer only in the last third
ans = [c for c in cards if c['key'] == 'answer']
p = 1 if ans and ans[0]['start'] >= total * 2 / 3 - 0.5 else 0; pts += p
notes.append(f"answer starts {ans[0]['start']:.2f} s of {total:.2f}: {p}/1" if ans else "no answer card: 0/1")
# 5. no stretch over 2.5 s without text after 3 s
iv = sorted((c['start'], c['end']) for c in cards); t, gap = 3.0, 0.0
for s, e in iv:
    if e <= t: continue
    gap = max(gap, s - t); t = max(t, e)
gap = max(gap, total - t)
p = 2 if gap <= 2.5 else 1 if gap <= 3.5 else 0; pts += p; notes.append(f"longest text gap after 3 s: {gap:.2f} s: {p}/2")
# 6. sharp sound onsets in 0-3 s
a = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', video, '-t', '3.1', '-ac', '1', '-ar', '16000', '-f', 'f32le', '-'],
                                 capture_output=True).stdout, np.float32)
w = 1600; db = np.array([20 * np.log10(np.sqrt(np.mean(a[i * w:(i + 1) * w] ** 2)) + 1e-9) for i in range(len(a) // w)])
on = int(np.sum(np.diff(db[:30]) >= 6)); p = 1 if on >= 6 else 0; pts += p; notes.append(f"sound onsets in 0-3 s: {on}: {p}/1")
# 7. the send line
p = 1 if T.get('send_type') in ('kids', 'mistake') else 0; pts += p; notes.append(f"send type {T.get('send_type')}: {p}/1")
# 8. the safe zone (white text pixels on every card's held frame)
bad = []
for c in cards:
    fr = sorted(glob.glob(os.path.join(typ, c['key'], 'f*.png')))
    im = np.asarray(Image.open(fr[int(len(fr) * 0.7)]).convert('RGBA')).astype(int)
    m = (im[:, :, 3] > 200) & (im[:, :, 0] > 200) & (im[:, :, 1] > 200)
    ys, xs = np.where(m)
    if len(xs) and (ys.min() < 220 or ys.max() > 1540 or xs.min() < 60 or xs.max() > 1020):
        bad.append(f"{c['key']} x{xs.min()}-{xs.max()} y{ys.min()}-{ys.max()}")
p = 0 if bad else 1; pts += p; notes.append(f"safe zone: {'ok' if not bad else bad}: {p}/1")
print(f"HOOK CHECK {pts}/10 ({'ships' if pts >= 8 else 'fix'})")
for n in notes: print('  -', n)
