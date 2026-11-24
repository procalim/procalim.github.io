# The Edible Codex

This repo is the ediblecodex.com website (Vite + React). The owner also uses Claude for
Instagram reels, Higgsfield video prompts and ChatPlace automations.

- For any reel, video prompt, hook, caption, «البروتوكول» or «نزل» request, follow
  `.claude/skills/reels-director/SKILL.md`.
- Never generate on Higgsfield without «ولد». Never send messages or emails without «أرسل».
- Recipes come from the book word for word. Halal only. A new recipe goes into the book as a numbered addition (N° 362 on)
  in `content-studio/book-additions/`, once the owner approves it (the owner, 24 Nov: «الكتاب ... بصير 362 وصفة»).
- Every reel follows THE DOOR in `content-studio/playbook.md` (the owner, 24 Nov: «اعطيني حل»): frame one is the food
  doing something close with a sound, the middle is moves only, the reveal in the last quarter, the bite back where it
  began, two Trial Reels that differ in the first second. Kevin's motion language (`content-studio/prompts/_template-kevin-motion-26s.txt`)
  stays; its living-room skit and prep run do not (the crunchwrap: 47.3% skip). A reference video is read by
  Higgsfield's video analysis, not by still frames.
- New reel ideas from `content-studio/idea-lab/invention-bank.md` only when the owner asks for one.
- Every reel follows `content-studio/playbook.md`: its steps and checks in order, and every step logged there.
- Video editing tools live in `content-studio/` (installed by the SessionStart hook).
