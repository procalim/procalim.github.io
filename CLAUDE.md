# The Edible Codex

This repo is the ediblecodex.com website (Vite + React). The owner also uses Claude for
Instagram reels, Higgsfield video prompts and ChatPlace automations.

- For any reel, video prompt, hook, caption, «البروتوكول» or «نزل» request, follow
  `.claude/skills/reels-director/SKILL.md`.
- Never generate on Higgsfield without «ولد». Never send messages or emails without «أرسل».
- Recipes come from the book word for word. Halal only.
- Every reel uses `content-studio/prompts/_template-kevin-motion-26s.txt`: the same prompt, story and edit; only the
  recipe changes (the owner, 23 Nov). A reference video is read by Higgsfield's video analysis, not by still frames.
- New reel ideas from `content-studio/idea-lab/invention-bank.md` only when the owner asks for one.
- Every reel follows `content-studio/playbook.md`: its steps and checks in order, and every step logged there.
- Video editing tools live in `content-studio/` (installed by the SessionStart hook).
