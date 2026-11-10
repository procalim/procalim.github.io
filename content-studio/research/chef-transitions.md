# Case study: how cooking creators make a recipe flow (smooth, action, every step seen)
Read before every prompt and every edit (owner's call, 2026-11-10). Searched 2026-11-10. Instagram and YouTube are
closed to this session, so this rests on articles and tutorials, most of them from editing-tool vendors: treat the
rules as common practice, not as measured proof. Our own numbers (SKILL.md, generation-log.md) outrank them.

## What the creators themselves say
- Nick DiGiovanni wants cooking to feel less dull and to keep viewers alert; he calls opening on a knife thrown into
  the board a hook that is hard to beat, and calls traditional cooking videos slow. A dedicated short-form editor
  cuts his videos. -> frame one is a forceful action with its sound, never a calm setup.
- Andy Cooks edited his own videos for the first year; the premise is fixed (a dish is requested, he cooks it at
  home). -> one fixed format, repeated, is part of the brand.
- The "selfie + recipe -> cinematic 30-second cooking video" skill reel (sferro21, screenshot 2026-11-10): 4,156
  likes, 14K comments, 2,588 shares, 7,059 saves. The format we use (cookcut) is this idea; 14K comments point to a
  comment-keyword delivery, the same mechanism as our «كتاب».

## Transition rules (what to write into the prompt, what to do in the edit)
| Rule | Prompt (Seedance) | Edit |
|---|---|---|
| Match cut: the same shape, motion or colour across the cut (flour sifting -> smooth batter; a circle -> a circle) | write each pair under TRANSITIONS | cut exactly on the matching frame |
| Cut on the motion peak (a toss at its highest point, a knife at impact) | end and start shots mid-motion | cut on the peak frame |
| Whip pan: the blur hides the cut; same direction and speed on both sides | at most one, written as a pan in a named direction | cut on the fastest blur frame; a bad whip is worse than a clean cut |
| Lens cover: a hand, a pan or a falling ingredient fills the frame for one frame | write the object passing the lens | cut when it fills most of the frame |
| Keep one element constant across the cut (hand, face, object, camera move) | his gloved hands in every shot | check the hand side and the tool match |
| Transitions are short: about 0.15-0.35 s | no fades, no dissolves | no transition longer than 0.35 s |
| Sound sells the cut: an on-screen sound (knife hit, sizzle, clink) masks it | the sound of every action in AUDIO | lay the hit exactly on the cut |
| Speed ramps: sparingly, on one readable action | only on actions that stay readable slowed down | ramp the calm stretches, not the impacts |
| Pace tightens toward the climax: faster cuts near the plating | shots 0.8-1.2 s just before the money shot | trim harder in the last third |
| Never cut without a reason, or it reads as random shots | every shot = the next recipe step | keep the step order; no shot out of sequence |

## How this enters every reel
1. Prompt: pick 4-6 match pairs from the table for this recipe's own tools and write them under TRANSITIONS.
2. Edit: re-cut on the motion peaks, add the on-screen hit on each cut, ramp only the calm stretches, and run
   prepublish.py until no half second reads DEAD or SLOW.

Sources:
- Nick DiGiovanni on hooks and pace: https://jira.phpfox.com/p/nick-digiovanni-cooking-tiktok
- His editor's profile: https://gondola.cc/kylevenberg
- Andy Cooks: https://esquire.com.au/andy-cooks-the-king-of-foodtok/
- Match cuts and speed ramps (vendor): https://www.capcut.com/create/instagram-reel-transitions-viral-edit-tips
- Food transitions (AI-written blog, treat with care): https://reelmind.ai/blog/food-video-transitions-making-culinary-edits-dynamic-and-engaging
- Cooking cuts and sound: https://filmora.wondershare.com/video-creative-tips/cooking-process-cinematic-filter.html
- Sound masking a cut: https://blitzcutai.com/blog/lifestyle-reel-hooks-transitions-2026
- Cutting without a reason: https://wpengine.fm.co/filmsupply/?p=788
- Whip pans and timing: https://www.nemovideo.com/blog/tiktok-transitions-tutorial-for-beginners
- In-camera transitions: https://www.journalism.co.uk/5-in-camera-video-transitions-to-make-your-social-content-more-engaging/
