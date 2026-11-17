---
name: idea-lab
description: The gate every reel idea passes before a prompt is written for The Edible Codex (@ahmet_salameh). Scores the idea out of 10 on the send sentence, outside evidence (outlier multiples from ScrapeCreators), the book match, the 6-word hook, a number or identity, the sound and a series slot; only 7 or more gets a prompt. Logs each idea's score and, after posting, its sends per 1,000 reach, so the rubric learns from the account. Use for «فكرة», «افكار», «شو نعمل», «الريل الجاي», «ضرب افكار», idea lists, or before any reels-director prompt.
---

# idea-lab

Owner, 2026-11-17: «مشكلتنا بالفكرة مش بالفيديو». The research report (reports/ريلز الطبخ الفيروسية لحسابك.md) found
that distribution is decided when the idea is chosen: 16 of 17 reels stayed at 1.5-4.5K views whatever the skip, and
the two breakouts were the ones people sent (sweet potato patties 221 sends, 8.7 per 1,000 reach). So no prompt is
written for an idea that has not passed this gate. reels-director takes over after the gate.

## 1. Write the idea in one row
`dish (book N°) | the send sentence | hook ≤6 words | the answer at the end | the sound in 0-0.5 s | series slot`
The send sentence is «ابعتها لـ___ لأنو ___», a real person the viewer knows and a reason (craving, diet, kids'
lunch box, the family group, Ramadan). If it cannot be filled in specifically, stop here.

## 2. Look for outside evidence (ig-viral's rule: the outlier multiple, never raw views)
- The owner's ScrapeCreators connection (Composio, toolkit scrapecreators): SCRAPECREATORS_SEARCH_INSTAGRAM_REELS with
  the dish in English and in Arabic, date_posted last-year (1 credit a page); then for the 4-6 biggest results one
  page of SCRAPECREATORS_LIST_INSTAGRAM_USER_REELS by user_id (1 credit each) and the median of play_count.
- Multiple = plays / that account's median. Over 3x is a signal, under 1.5x is that account's normal day.
- Credits are the owner's: at most 8 per idea, never a loop, never in the background; say the credits left.
- Read the first 3 s of the top 2-3 (frames in the Higgsfield sandbox, speech with faster-whisper): the opening shot,
  the on-screen words, speech or none, the length.
- Write every row with its account and link into content-studio/research/swipe-YYYY-MM-DD.md (creators' handles
  only, never commenters').

## 3. Score it (10 points)
| Points | Test |
|---|---|
| 0-2 | Send sentence: 2 = a named person + a concrete reason; 1 = a vague one («لصاحبك»); 0 = none |
| 0-3 | Evidence: 3 = two or more reels of the same dish at 5x+ on different accounts in the last 12 months; 2 = two at 3x+; 1 = one at 3x+; 0 = none found or not looked |
| 0-1 | The book: the recipe is in the book (N° and page) and can be shown word for word, halal as written or with a stated halal swap (alcohol-free vanilla, halal-certified cheese, no gelatin) |
| 0-1 | Hook: 6 words or fewer, not a question, does not give the answer, readable over the opening shot |
| 0-1 | A number or an identity: grams of protein, ingredient count, minutes; or dates, Levantine, Ramadan, the family |
| 0-1 | Sound: a hit the camera can show in 0-0.5 s (a snap, a crack, a slam, a sizzle) |
| 0-1 | Series: it is the next episode of a named series, or it opens one with 4+ episodes in the book |
7 or more: write the prompt (reels-director). 5-6: look for more evidence or change the angle. Under 5: drop it.
Halal and the book are gates: a recipe not in the book goes to book-additions for the owner's approval first.

## 4. After posting: close the loop
At the 24 h read add the numbers to the idea's row in content-studio/idea-lab/ideas.md: sends per 1,000 reach (the
bar is 8.7), follows per 1,000 reach, skip, the end, keyword comments. Every 10 posted ideas, compare the scores with
the sends: if the evidence points do not predict sends on this account, change the weights here and say why.

## Output to the owner
The scored table (idea, score, the evidence in one line with the multiple, the hook), the top 2 to make next, and the
credits used. Short Levantine Arabic, numbers first.
