# Step-by-step edit (THE MEASURED RULE item 8 + research/edit-reference-2026-11-19.md), shared by every step-by-step
# take: the result first (the take's last shot), every step in order, the result again; the hook complete at frame
# one; one typed card per step; each segment brought to 60 fps on its own by motion interpolation (slow motion by
# interpolation where speed < 1, no frame ever blended across a cut); the take's own sound segment by segment,
# -20 LUFS gain, a peak-only limiter; timeline.json for hook_check.py.
# Sandbox copy: /home/user/rv/steps_edit.py. A recipe script calls build(...) from its own folder (take.mp4 there).
import subprocess, re, wave, json, os, numpy as np

FIN, FPS, PRE, SR = 24, 60, 3, 48000
LIM = 'aresample=192000,alimiter=limit=0.89:attack=1:release=40:level=disabled,aresample=48000'
MI = 'minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1'


def run(c): subprocess.run(c, check=True)


def meas(f):
    e = subprocess.run(['ffmpeg', '-hide_banner', '-i', f, '-af', 'ebur128=peak=true', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    s = e[e.rindex('Summary'):]
    return float(re.search(r'I:\s+(-?[\d.]+)', s).group(1)), float(re.search(r'Peak:\s+(-?[\d.]+)', s).group(1))


def rd(f):
    w = wave.open(f); a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768; w.close(); return a


def wr(f, a):
    w = wave.open(f, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(a, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()


def respace(a, sp, n_out):
    """Change a sound's speed without stretching it (owner 2026-11-19: «الصوت كثير غريب في البيغل ومبين مصنع»; atempo
    0.65 doubled every crack, the transients' rise fell from 25.9 to 21.8 dB). Each hit is cut at its onset and played at
    its own natural speed, moved to its new time (t / sp); slower: the room's own quietest 0.2 s, looped, fills the
    longer gaps; faster: a hit is cut 12 ms before the next one starts."""
    w = int(0.01 * SR)
    db = 20 * np.log10(np.array([np.sqrt(np.mean(a[i * w:(i + 1) * w] ** 2)) + 1e-9 for i in range(len(a) // w)]))
    on = [0]
    for i in np.where(np.diff(db) >= 9)[0] + 1:
        if i * w - on[-1] >= int(0.06 * SR): on.append(int(i * w))
    out = np.zeros(n_out, np.float32)
    if sp < 1:   # room tone under the whole segment, from its quietest 0.2 s
        k = int(0.2 * SR); r = np.array([np.sqrt(np.mean(a[j:j + k] ** 2)) for j in range(0, max(1, len(a) - k), w)])
        j = int(np.argmin(r)) * w; tone = a[j:j + k].copy()
        if len(tone) > 2 * int(0.02 * SR):
            f = int(0.02 * SR); tone[:f] *= np.linspace(0, 1, f); tone[-f:] *= np.linspace(1, 0, f)
            for p in range(0, n_out, k - f): out[p:p + k] += tone[:min(k, n_out - p)]
    starts = [int(round(s / sp)) for s in on] + [n_out]
    for c, s in enumerate(on):
        e = on[c + 1] if c + 1 < len(on) else len(a)
        room = starts[c + 1] - starts[c]
        # the hit up to the next hit (never into it, so no hit plays twice); faster: up to its new slot + 12 ms
        L = max(1, min(e - s, room + int(0.012 * SR), n_out - starts[c]))
        chunk = a[s:s + L].copy()
        fi = min(int(0.003 * SR), L // 4); fo = min(int(0.012 * SR), L // 2)
        if fi: chunk[:fi] *= np.linspace(0, 1, fi)
        if fo: chunk[-fo:] *= np.linspace(1, 0, fo)
        out[starts[c]:starts[c] + L] += chunk
    return out


def timing(segs):
    """Each segment's output frames at 60 fps and its (start, end) in seconds, keyed by label."""
    n60 = [round((f1 - f0) / sp / FIN * FPS) for f0, f1, sp, lab in segs]
    L, t = {}, 0.0
    for (f0, f1, sp, lab), n in zip(segs, n60):
        L[lab] = (t, t + n / FPS); t += n / FPS
    return n60, L, t


def build(segs, shots, cards, meta, out, blur=None, take='take.mp4', only_cards=False, reuse_video=False):
    blur = blur or {}
    n60, L, total = timing(segs)
    cps = {k: (900 if k == 'hook' else max(26, int(np.ceil(sum(len(x['t']) for x in it) / (0.45 * (e - s))))))
           for k, s, e, y, it in cards}
    json.dump({'fps': FPS, 'cards': [dict(key=k, frames=round((e - s) * FPS), y=y, scrim=True, cps=cps[k], items=it)
                                     for k, s, e, y, it in cards]}, open('typ.json', 'w'), ensure_ascii=False)
    json.dump(dict(fps=FPS, total=total, **meta, cards=[dict(key=k, start=s, end=e, y=y, items=it) for k, s, e, y, it in cards]),
              open('timeline.json', 'w'), ensure_ascii=False)
    run(['node', '/home/user/ov/typed.mjs', 'typ.json', 'typ'])
    if only_cards:
        return L, total
    # picture: every segment to 60 fps on its own (slow motion by interpolation when the speed is under 1);
    # reuse_video keeps an existing cut60.mkv (a sound-only fix)
    for i, ((f0, f1, sp, lab), n) in enumerate(zip(segs, n60) if not (reuse_video and os.path.exists('cut60.mkv')) else []):
        v = f'trim=start_frame={f0}:end_frame={f1},setpts=(PTS-STARTPTS)/{sp}'
        if i in blur:
            x, y, w, h = blur[i]
            fc = f"[0:v]{v},split=2[m][b];[b]crop={w}:{h}:{x}:{y},boxblur=16:2[bb];[m][bb]overlay={x}:{y},{MI},scale=1080:1920:flags=lanczos,setsar=1,format=yuv420p[v]"
        else:
            fc = f"[0:v]{v},{MI},scale=1080:1920:flags=lanczos,setsar=1,format=yuv420p[v]"
        run(['ffmpeg', '-v', 'error', '-y', '-i', take, '-filter_complex', fc, '-map', '[v]', '-an', '-c:v', 'libx264',
             '-qp', '0', '-preset', 'ultrafast', '-frames:v', str(n), '-r', str(FPS), f'seg{i:02d}.mkv'])
    if not (reuse_video and os.path.exists('cut60.mkv')):
        open('vlist.txt', 'w').write(''.join(f"file 'seg{i:02d}.mkv'\n" for i in range(len(segs))))
        run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-i', 'vlist.txt', '-c', 'copy', 'cut60.mkv'])
    # sound: each segment's own sound (a short lead-in inside the same shot), crossfaded
    shot_start = lambda f: max(s for s in shots if s <= f)
    pieces, t = [], 0.0
    for i, ((f0, f1, sp, lab), n) in enumerate(zip(segs, n60)):
        d = n / FPS
        pre = PRE if i and f0 - PRE * sp >= shot_start(f0) else 0
        a0 = (f0 - pre * sp) / FIN
        # the source sound at its own speed; a speed change moves the hits (respace), it never stretches them
        run(['ffmpeg', '-v', 'error', '-y', '-i', take, '-vn', '-af',
             f'atrim={a0:.5f}:{f1 / FIN:.5f},asetpts=PTS-STARTPTS,aresample={SR},aformat=channel_layouts=mono',
             '-c:a', 'pcm_s16le', f'seg{i:02d}.wav'])
        raw, n_out = rd(f'seg{i:02d}.wav'), int(round((d + pre / FIN / sp) * SR))
        a = respace(raw, sp, n_out) if sp != 1.0 else np.pad(raw, (0, max(0, n_out - len(raw))))[:n_out]
        pieces.append((t - pre / FIN / sp, pre / sp, a)); t += d
    mix = np.zeros(int(total * SR) + SR, np.float32)
    for j, (off, pre, a) in enumerate(pieces):
        a = a.copy(); fi = max(int(pre / FIN * SR), int(0.01 * SR)); a[:fi] *= np.linspace(0, 1, fi)
        nxt = pieces[j + 1][1] if j + 1 < len(pieces) else 0
        fo = max(int(nxt / FIN * SR), int(0.01 * SR)); a[-fo:] *= np.linspace(1, 0, fo)
        s = int(round(max(0, off) * SR)); mix[s:s + len(a)] += a[:len(mix) - s]
    wr('mix2.wav', mix[:int(total * SR)])
    # typing clicks on the typed cards (none on the hook, complete at frame one)
    rng = np.random.default_rng(7)
    clicks = np.zeros(int(total * SR) + SR, np.float32)
    tt = np.arange(int(0.035 * SR)) / SR
    for k, s, e, y, it in cards:
        if k == 'hook': continue
        for fr in sorted(set(json.load(open(f'typ/{k}/events.json')))):
            n0 = rng.normal(0, 1, len(tt)).astype(np.float32)
            c = np.diff(n0, prepend=0) * np.exp(-tt / 0.0025) + np.sin(2 * np.pi * rng.uniform(900, 1300) * tt) * np.exp(-tt / 0.006) * 0.6
            c = c / np.abs(c).max() * 10 ** ((-24 + rng.uniform(-3, 3)) / 20)
            p = int((s + fr / FPS) * SR); clicks[p:p + len(c)] += c
    wr('clicks.wav', clicks[:int(total * SR)])
    I, P = meas('mix2.wav'); g = -20.0 - I
    ins = ['-i', 'cut60.mkv']; fc = ['[0:v]setsar=1,format=yuv420p[b0]']; last = 'b0'
    for k, (key, s, e, y, it) in enumerate(cards):
        ins += ['-framerate', str(FPS), '-i', f'typ/{key}/f%03d.png']
        fc.append(f"[{k + 1}:v]format=rgba,setpts=PTS-STARTPTS+{s:.4f}/TB[c{k}]")
        fc.append(f"[{last}][c{k}]overlay=0:0:eof_action=pass[o{k}]"); last = f'o{k}'
    fc.append(f'[{last}]format=yuv420p[v]')
    na = len(cards) + 1
    fc.append(f'[{na}:a]volume={g:.2f}dB[sh]')
    fc.append(f'[{na + 1}:a]volume={g - 3:.2f}dB[ck]')
    fc.append('[sh][ck]amix=inputs=2:normalize=0:duration=first,' + LIM + ',pan=stereo|c0=c0|c1=c0[ao]')
    ins += ['-i', 'mix2.wav', '-i', 'clicks.wav']
    run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '[ao]',
         '-frames:v', str(sum(n60)), '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-profile:v', 'high',
         '-pix_fmt', 'yuv420p', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
         '-color_range', 'tv', '-r', str(FPS), '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', out])
    for lab, (s, e) in L.items(): print(f'{s:6.2f}-{e:6.2f}  {lab}')
    print('cards', [(c[0], round(c[1], 2), round(c[2], 2), cps[c[0]]) for c in cards])
    print('total', round(total, 3), 'mix', I, P, 'final', meas(out))
    return L, total
