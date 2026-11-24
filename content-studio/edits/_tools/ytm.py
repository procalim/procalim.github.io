# The free second corpus (ig-viral step 2): YouTube Shorts view counts and each channel's own median, no credits.
# Runs in the Higgsfield sandbox (YouTube is blocked from the Claude Code container): python3 -m pip install yt-dlp.
# Usage: python3 ytm.py "<query>" [results=40] [channels=6] [search=ytsearch]
#   The search may also be a results URL with filters, e.g. this year + under 4 min:
#   yt-dlp --flat-playlist -J "https://www.youtube.com/results?search_query=marry+me+chicken&sp=EgYIBRABGAE%253D"
# Prints: multiple (views / the channel's median of its last 30 shorts), views, median, channel, length, title, link.
# Upload dates are not in the flat output: check the top rows with
#   yt-dlp --skip-download --print "%(upload_date)s | %(channel)s | %(view_count)s" <url>   (idea-lab counts the last 12 months only)
import json, subprocess, sys, statistics as st
q=sys.argv[1]; n=int(sys.argv[2]) if len(sys.argv)>2 else 40
def yj(u, extra=()):
    r=subprocess.run(['python3','-m','yt_dlp','--no-update','--flat-playlist','-J',*extra,u],capture_output=True,text=True,timeout=40)
    try: return json.loads(r.stdout) or {}
    except Exception: return {}
d=yj(f"{(sys.argv[4] if len(sys.argv)>4 else 'ytsearch')}{n}:{q}")
rows=[e for e in (d.get('entries') or []) if e and (e.get('duration') or 999)<=90 and e.get('view_count')]
seen={}
for e in sorted(rows,key=lambda e:-e['view_count']):
    c=e.get('channel_id')
    if c in seen: continue
    seen[c]=e
top=list(seen.values())[:int(sys.argv[3]) if len(sys.argv)>3 else 6]
out=[]
for e in top:
    c=e.get('channel_id'); ch=yj(f"https://www.youtube.com/channel/{c}/shorts",('--playlist-end','30'))
    v=[x.get('view_count') for x in (ch.get('entries') or []) if x and x.get('view_count')]
    med=st.median(v) if v else None
    out.append((e['view_count']/med if med else None, e['view_count'], med, len(v), e.get('channel'), e.get('duration'), (e.get('title') or '')[:60], e.get('url')))
for o in sorted(out,key=lambda o:-(o[0] or 0)):
    print(f"{o[0] and round(o[0],1)}x | {o[1]} views | median {o[2]} of {o[3]} | {o[4]} | {o[5]}s | {o[6]} | {o[7]}")
