# AI-generated video on Instagram Reels and TikTok (2025-2026): platform treatment, audience reception, breakout formats, and what a solo food creator can run

Research date: 16 Nov 2026. Method note: in this session WebFetch could not reach any site (threads.com, pmc.ncbi.nlm.nih.gov, time.com and kapwing.com all failed to resolve; the session's network allowlist blocks them). Every finding below therefore comes from web-search result summaries of the cited pages, not full-page reads. Numbers were cross-checked across two or more results where possible, and single-source or vendor claims are flagged.

Evidence tags used throughout:
- **[Official]**: platform policy page, platform announcement, or a platform executive's own statement.
- **[Measured]**: survey, experiment or dataset with a stated method and sample.
- **[Reported]**: established press reporting of numbers or events.
- **[Vendor/anecdote]**: tool vendors, tutorial sites, agency blogs, single unverified claims.
- **[Older]**: pre-2025 material, kept for context.

---

## Q1. How do Instagram and TikTok treat AI-generated video in 2025-2026 (labels, C2PA detection, reach effects, originality rules)?

### Takeaway
Neither platform officially down-ranks content just for being AI. Both label it, mainly from C2PA/IPTC metadata, invisible watermarks and creator self-disclosure. The real reach levers are elsewhere. Instagram ranks for originality and penalises unlabeled AI-persona accounts (per secondary reports). TikTok can make unlabeled realistic AI ineligible for the For You feed, and since Nov 2025 viewers can turn AI content down with a feed slider.

### Cited Findings

**Instagram / Meta**
- [Official, Older] In July 2024 Meta renamed its "Made with AI" tag to "AI info" after real photos were wrongly tagged. It is applied from industry metadata signals such as C2PA and IPTC — [TechCrunch, 1 Jul 2024](https://techcrunch.com/2024/07/01/meta-changes-its-label-from-made-with-ai-to-ai-info-to-indicate-use-of-ai-in-photos)
- [Reported] Around Oct 2025 Meta moved the "AI info" tag for content only *edited* with AI from under the username into the top-right menu. The label stays prominent where content is *detected* as AI-generated or the creator *self-discloses* AI use. Meta cites C2PA/IPTC metadata, Adobe Content Credentials and Google SynthID watermarks as signals. It does not run its own pixel-level detector publicly. TechCrunch criticised the change as making deception easier — [CO/AI](https://getcoai.com/news/facebook-and-instagram-make-ai-labels-less-prominent-on-edited-content); [Maginative](https://www.maginative.com/article/meta-changes-ai-labels-to-clear-up-user-confusion/); [Computing](https://computing.co.uk/news/2024/ai/fb-instagram-hide-ai-image-labels)
- [Official, via search summary of the primary post] Adam Mosseri's year-end essay (Threads, 31 Dec 2025, 20 slides) makes four points:
  - "authenticity is becoming infinitely reproducible."
  - Photoreal output from tools like Nano Banana Pro and Sora is now hard to tell from camera footage.
  - Platforms should label AI clearly *and* "fingerprint real media", e.g. cameras cryptographically signing images at capture.
  - "Continue to improve ranking for originality" is a 2026 priority.

  He also argued that flattering, polished imagery is now "cheap to produce and boring to consume" and pointed to raw, unpolished content as a signal of authenticity. Critics noted that AI can fake "raw" too — [Mosseri on Threads](https://www.threads.com/@mosseri/post/DS76UiklIDf/looking-forward-to-one-significant-interesting-is-that-authenticity-is-becoming); [Tubefilter, 6 Jan 2026](https://www.tubefilter.com/2026/01/06/adam-mosseri-instagram-warning-generative-ai-deepfakes/); [Om Malik](https://om.co/2026/01/01/what-is-instagrams-adam-mosseri-really-saying-in-his-year-end-memo/); [The Decoder](https://the-decoder.com/instagram-ceo-argues-humans-must-override-their-instinct-to-trust-what-they-see-online/); [Implicator](https://www.implicator.ai/instagrams-head-just-admitted-defeat-on-ai-slop-and-wants-camera-makers-to-fix-it/)
- [Official statement, secondary reporting only] In his weekly Story Q&A (mid/late Oct 2026; sources give 16, 19 or 23 Oct) Mosseri reportedly said: "We do not throttle the reach of AI content just for being AI content." He said ranking tries to match people with content they like whether or not it is AI, and that Instagram plans more labels and incentives for voluntary AI tagging. I could not reach a primary transcript — [Zoomsphere](https://www.zoomsphere.com/blog/instagram-algorithm-2026-what-actually-gets-reach); [ExplainX](https://explainx.ai/blog/adam-mosseri-ai-negativity-going-to-get-worse-instagram-slop-labels-ranking-what-he-said-2026); [MichyDev](https://www.michydev.com/instagram-ai-content-label-reach/); [Yahoo Tech](https://tech.yahoo.com/social-media/articles/instagram-chief-says-stronger-ai-220200136.html)
- [Reported, secondary, unconfirmed against Meta's own post] Instagram renamed its account-level "AI creator" badge to "AI-generated profile" (dated 31 Aug 2026 in one source, September in another). It reportedly limits recommendation reach (Reels/Explore) for profiles that feature an AI-generated *person* and do not apply the label. Creators who merely use AI tools in production are reportedly exempt, and labelled AI profiles are not penalised for being AI — [Kompozy guide](https://kompozy.io/guides/instagram-ai-content-detection-and-labeling); [Magic Hour checklist](https://magichour.ai/blog/instagram-ai-generated-content-labels); [Getix Group](https://getixgroup.com/blog/does-ai-content-hurt-social-reach-2026)
- [Reported] Meta added updated AI-disclosure tags for AI-generated *ads* (2026) — [Social Media Today](https://socialmediatoday.com/news/meta-adds-updated-disclosure-tags-for-ai-generated-ads/824658)
- [Official, Older → expanded 2026] Instagram's originality ranking works like this:
  - Reposts are replaced by the original in recommendations, and the original creator is notified.
  - Aggregators are removed from recommendations. Commonly cited threshold: accounts reposting others' content more than 10 times in 30 days.
  - Accounts that post "primarily" non-original reels "may not appear in recommendations to new audiences."

  The scheme was announced in 2024 for Reels — [Engadget](https://www.engadget.com/instagrams-algorithm-overhaul-will-reward-original-content-and-penalize-aggregators-130018977.html); [Social Media Today](https://www.socialmediatoday.com/news/instagram-updates-algorithm-to-benefit-original-creators/819016/)
- [Reported] On 30 Apr 2026 Mosseri expanded the repost crackdown from Reels to photos and carousels. Reposts with substantial commentary, remix or transformation are more likely to count as original; watermarked or lightly cropped reposts are not — [PetaPixel, 30 Apr 2026](https://petapixel.com/2026/04/30/new-instagram-policies-target-reposted-content/); [Communicate Online](https://communicateonline.me/news/instagram-expands-crackdown-on-reposted-content-across-platform/)

**TikTok**
- [Official/Reported] On 18 Nov 2025 TikTok announced several AI measures:
  - A control in *Manage Topics* that lets users set how much AI-generated content appears in their For You feed. There is no option to switch it off entirely.
  - Testing of invisible watermarking for content made with TikTok's own AI tools (e.g. AI Editor Pro) and for uploads carrying C2PA credentials, so labels survive re-uploads.
  - TikTok already reads C2PA Content Credentials to auto-label AI content.

  Sources: [TechCrunch, 18 Nov 2025](https://techcrunch.com/2025/11/18/tiktok-now-lets-you-choose-how-much-ai-generated-content-you-want-to-see/); [MacRumors](https://www.macrumors.com/2025/11/19/tiktok-ai-content-limits/); [Social Media Today](https://www.socialmediatoday.com/news/tiktok-adds-option-to-limit-ai-content-in-your-for-you-feed/805952/)
- [Official] TikTok's Community Guidelines (Integrity & Authenticity) require creators to label AI-generated or AI-modified content that shows realistic-looking people or scenes. Unlabeled realistic AI content may be removed, labelled by TikTok, or made **ineligible for the For You feed** — [TikTok Community Guidelines: Integrity & Authenticity](https://www.tiktok.com/community-guidelines/en/integrity-authenticity/); [TechCrunch on Aug 2025 guideline update](https://techcrunch.com/2025/08/15/tiktoks-new-guidelines-add-subtle-changes-for-live-creators-ai-content-and-more/); [Magic Hour TikTok checklist](https://magichour.ai/blog/tiktok-ai-generated-content-labels)
- [Reported, secondary] One source says the current guidelines version was released 25 Aug 2026 and took effect 24 Sep 2026. Another mentions a 2026 test of account-level "AI spam" detection. Both are single-source — [Magic Hour](https://magichour.ai/blog/tiktok-ai-generated-content-labels); [NoFaceTube](https://nofacetube.com/rules/tiktok-ai-content-controls/)
- [Vendor/anecdote] A marketing blog claims AI-flagged videos get lower distribution once the slider exists. TikTok has not confirmed this — [Dataslayer](https://www.dataslayer.ai/blog/tiktok-ai-filter-how-it-kills-or-saves-creator-reach)

**Ecosystem context (YouTube, measured)**
- [Measured] Kapwing's "AI Slop Report" (Nov 2025, data as of Oct 2025) found the following:
  - In the first 500 Shorts shown to a fresh account, 104 (21%) were "AI slop" and 165 (33%) were "brainrot".
  - Of the top-100 trending channels in every country (~15,000 channels), 278 posted only AI slop. Together they had >63B views, 221M subscribers and ≈$117M/yr estimated revenue.
  - South Korea led with 8.45B views. The top single channel was India's "Bandar Apna Dost" with 2.07B views.

  The feed test is one fresh account, not a platform-wide share — [TechSpot](https://www.techspot.com/news/110735-over-21-youtube-now-ai-slop-report.html); [NetInfluencer](https://www.netinfluencer.com/ai-generated-content-accounts-for-third-of-youtube-shorts-feed-kapwing-research-shows/); [Kapwing report](https://www.kapwing.com/blog/ai-slop-report-the-global-rise-of-low-quality-ai-videos/)

### Inferences
- "AI = reach penalty" is not the official rule on either platform. The practical risks are:
  - (a) Not labelling realistic AI. On TikTok that can mean FYF-ineligibility; on Instagram, unlabeled AI-persona accounts reportedly lose recommendations.
  - (b) Non-original or derivative output. Instagram's originality ranking keeps tightening, and AI clips cloned from trends will often look like copies.
  - (c) Viewer-side opt-outs. TikTok's slider shrinks the pool of viewers willing to be shown AI content, even if the algorithm itself is neutral.
- Labels are driven by metadata. Clips from tools that embed C2PA or SynthID (e.g. Google Veo) will likely be auto-labelled. Clips without that metadata depend on self-disclosure. Mixing real footage with AI clips in an editor may strip or keep metadata unpredictably. The safe default is to self-disclose when an AI shot is realistic.
- A real person running his own account who inserts AI shots should not fall under Instagram's "AI-generated profile" rule, which targets synthetic *persons*. He still needs per-post "AI info"/TikTok AIGC disclosure for realistic AI shots.

### Gaps
- No primary transcript or Meta newsroom post was reachable for the Oct 2026 "do not throttle" quote or the Aug 2026 "AI-generated profile" rule; both rest on secondary reporting with inconsistent dates.
- No credible controlled test (A/B, matched accounts) was found that measures reach of labelled vs unlabeled vs real-footage Reels/TikToks. Vendor claims exist but are unsourced.
- TikTok slider adoption rates and the slider's measured effect on AI-content distribution: not published.
- Whether Instagram's originality classifier treats generic AI "trend copies" (e.g. the 1,000th glass-fruit clip) as unoriginal: no official statement found.

---

## Q2. Audience reception: trust, engagement and "AI slop" reactions, and food specifically

### Takeaway
The best-measured finding: content *perceived* as AI loses about half its trust, whether or not it actually is AI (Raptive, 3,000 US adults). Majorities dislike AI video and want to be able to tell it apart, but most are not confident they can. For food, AI images can look *more* appetizing when viewers don't know the origin. Once AI origin is known or suspected, realism and willingness to eat drop. For a food creator, looking fake is the core risk.

### Cited Findings

**General trust and attitude data**
- [Measured] Raptive, published ~15 Jul 2025, 3,000 US adults, "The AI stink". When people *suspected* content was AI-generated:
  - It was rated 48% less trustworthy, 57% less authentic and 60% lower in emotional connection.
  - Purchase consideration fell 14%, and willingness to pay a premium fell 14%.
  - The effect held **even when the content was actually human-made**.
  - Ads placed next to suspected-AI content also scored worse: −17% premium perception, −17% relatability, −11% trust.

  Sources: [Raptive blog](https://raptive.com/blog/the-ai-stink-is-real-and-its-costing-brands/); [PPC Land](https://ppc.land/raptive-study-shows-ai-content-cuts-reader-trust-by-half/); [ContentGrip](https://www.contentgrip.com/raptive-study-ai-stink/)
- [Measured] Pew Research Center (fielded June 2025, 5,023 US adults, published 17 Sep 2025): 76% say it is extremely or very important to be able to tell whether pictures, videos or text were made by AI or by people. 53% are not too or not at all confident they can — [Pew](https://www.pewresearch.org/science/2025/09/17/how-americans-view-ai-and-its-impact-on-people-and-society/)
- [Measured] YouGov (20-22 Oct 2025, 1,091 US citizens, asked in the context of Trump's AI video posts): 62% disapprove of online videos made with AI tools in general, vs 23% who approve. The political framing may inflate disapproval — [YouGov](https://yougov.com/en-us/articles/53256-most-americans-react-negatively-when-shown-three-ai-generated-videos-posted-by-president-trump)
- [Measured, vendor-run] Animoto "State of Video 2026" survey (Sep 2025, 460 US respondents):
  - 82.6% say they have watched a video they suspected was AI-generated.
  - About 78% trust videos featuring real people more.
  - 36% say an AI-generated video would lower their perception of a brand.
  - Just over a third trust AI video about as much as human-made video.
  - Animoto's summary says consumers tolerate AI *elements* (voiceover, background editing) when the core video stays human-led.

  Sources: [Animoto State of Video](https://animoto.com/state-of-video); [Animoto blog](https://animoto.com/blog/news/what-people-think-about-ai-video); [Adweek](https://www.adweek.com/adweek-wire/83-of-consumers-can-spot-ai-videos-36-say-it-hurts-brand-trust-new-animoto-report/); [StudyFinds](https://studyfinds.com/why-consumers-trust-videos-people-more-than-ai/)
- [Measured, weak source] Story Radius (Dec 2025, 512 US adults, press release only): more than 8 in 10 say AI videos "pull them out" at least sometimes. Nearly half would use social media less if most of their feed were AI-generated — [EIN Presswire](https://www.einpresswire.com/article/876192457/new-national-survey-finds-americans-are-turning-against-ai-generated-video-on-social-media)
- [Measured, Older] Getty Images VisualGPS "Building Trust in the Age of AI" (Apr 2024; 30,000+ adults, 25 countries, 2022-2024): 98% say authentic images and video are pivotal to establishing trust. ~90% want to know whether an image is AI-generated — [Getty Images](https://www.gettyimages.com/visualgps/creative-trends/technology/building-trust-in-the-age-of-ai); [B&T](https://www.bandt.com.au/nearly-90-of-consumers-want-transparency-about-ai-images-finds-getty-images-report/)
- [Reported, secondhand] A 2025 Nuremberg Institute for Market Decisions study reportedly found AI-labelled ads were perceived as less natural and reduced purchase intent. I did not reach the original — [WebProNews](https://www.webpronews.com/ai-videos-erode-brand-faith-as-viewers-spot-synthetics-everywhere/)

**Food-specific studies**
- [Measured] Oxford (Charles Spence's group), 297 participants: when viewers did **not** know the source, AI-generated food images were consistently rated significantly *more* appetizing than real photos. When the source was known, real and AI versions were rated about equally appealing. Spence warned about amplifying "visual hunger" — [The Food Institute](https://foodinstitute.com/focus/new-study-exposes-the-power-and-pitfalls-of-ai-generated-food-images/)
- [Measured] Stright et al., *Journal of Sensory Studies*, 2025 (154 participants, 10 images, preliminary): perceived AI origin was negatively correlated with willingness to consume, healthiness, naturalness and appeal. The authors note this conflicts with earlier work — [Wiley](https://onlinelibrary.wiley.com/doi/10.1111/joss.70015)
- [Measured] *Scientific Reports*, 2026: AI-generated food stimuli matched real ones on perceived healthiness and calorie content, but were rated significantly **less realistic** and produced **lower willingness to eat** — [Nature / Scientific Reports](https://www.nature.com/articles/s41598-026-66977-1)
- [Measured] *British Food Journal*, 2025: AI vs real food images affect perceived value and negative word-of-mouth through pleasure and perceived risk. The authors advise keeping AI food imagery realistic and appetizing to avoid hurting brand evaluations — [Emerald / BFJ](https://www.emerald.com/bfj/article/doi/10.1108/BFJ-05-2025-0657/1333461/The-influence-of-AI-generated-versus-real-food)
- [Measured] Tourism study (Berlin Food Week survey, 898 participants, 2026) on how synthetic food imagery shapes authenticity and trust — [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S1878450X26000776)

**"AI slop" backlash, examples**
- [Reported] Spoon University reported that the fast-growing food-skit TikTok "YoooRyan" (600K+ followers in ~2 weeks) may be AI-made and copying skits from real creator @LifeWithLyles. This shows how audiences and press call out suspected AI food accounts — [Spoon University](https://spoonuniversity.com/news/popular-food-creators-videos-might-be-ai/)
- [Reported] The hit AI series "Fruit Love Island" (see Q3) was widely labelled "the perfect example of AI slop" by critics, which did not stop ~300M views — [Techstrong.ai](https://techstrong.ai/articles/ai-generated-fruit-love-island-is-bananas-should-be-peeled-back-critics-say/); [DesignRush](https://www.designrush.com/best-designs/video/trends/pixel-rot-ai-slop-fruit-love-island)
- [Reported, Mosseri] Per secondary write-ups, Mosseri said AI negativity is "going to get worse" — [ExplainX](https://explainx.ai/blog/adam-mosseri-ai-negativity-going-to-get-worse-instagram-slop-labels-ranking-what-he-said-2026)

### Inferences
- Viewer response splits by what the AI is used for:
  - **Openly impossible or entertaining AI** (glass fruit, talking fruit dramas) can rack up huge views despite the "slop" label. Viewers know it's AI, so there is no deception to punish.
  - **AI that pretends to be real**, especially food presented as an actual dish, a recipe result or a real person, triggers the trust penalty when detected. Detection is common: 82.6% say they've seen suspected-AI video.
- For a recipe creator whose business is "make this real dish", the measured penalties (−48% trust, lower willingness to eat, lower realism) land on exactly the outcome he needs. AI shots should never be the "proof" that the recipe works.
- The Oxford result (undisclosed AI food looks *more* appetizing) is tempting but risky. Platform labelling via metadata and the disclosure rules make "undisclosed" fragile, and the advantage vanishes on disclosure.

### Gaps
- No peer-reviewed or platform-published study was found that measures **actual engagement** (completion, shares, saves, follows) of AI vs real food *video* on Reels/TikTok. All food evidence is on still images in survey settings.
- No measured data on how "AI slop" comments affect a post's distribution.
- Non-US data is thin. Most surveys are US-only, and there is nothing specific to Arabic-speaking or MENA audiences.

---

## Q3. Which AI-driven accounts and formats went viral in 2025-2026, and what does that say about what AI video is good and bad at?

### Takeaway
The proven AI breakouts share three traits. They are openly unreal: impossible objects, animals, talking food, absurd characters. They run as a repeatable series with a recurring character or format. They are built around sound or dialogue (ASMR crunch, native-audio speech). Growth can be explosive: millions of followers in weeks. But it is often trend-dependent and short-lived, and I found no verified AI-*generated* cooking account with millions of followers that teaches real recipes.

### Cited Findings
- [Reported] **Glass-fruit / "impossible object" ASMR cutting (Veo 3, mid-2025).** Clips show knives slicing glass or crystal fruit with crisp crunch audio, using Veo 3's native sound generation. The most popular strawberry clip passed 20M views. Reports describe accounts reaching ~100K followers, and tutorials describe TikTok accounts with hundreds of thousands of followers from only a few such videos. A vendor claim of "180K followers in one week" is unverified — [36Kr](https://eu.36kr.com/en/p/3340310849533704); [Medium / Generative AI pub](https://generativeai.pub/how-to-make-the-viral-asmr-slicing-videos-with-veo-3-ai-57384b4279a4?gi=9d60284362cc); [PhotoGrid tutorial](https://www.photogrid.app/blog/glass-fruit-cutting/) [Vendor/anecdote for follower figures]
- [Reported] **"Italian brainrot" (early 2025).** Surreal AI creatures with pseudo-Italian names (Tralalero Tralala, Ballerina Cappuccina, Bombardiro Crocodilo) spread across TikTok and Instagram from Jan 2025, mainly among Gen Alpha. "Tung Tung Tung Sahur" (Feb 2025, by @noxaasht) is Indonesian in origin; its name echoes the drum used to wake people for the Ramadan sahur meal. Some Muslim TikTok users objected because the original Tralalero audio contains blasphemy against God/Allah, and child-safety concerns were raised. No reliable view totals were found — [FMT](https://www.freemalaysiatoday.com/category/leisure/2025/08/16/italian-brainrot-the-ai-memes-most-adults-dont-know); [RTÉ](https://www.rte.ie/culture/2025/0920/1534148-what-is-italian-brainrot-and-should-parents-be-wary-of-it); [SAYS](https://says.com/my/tech/what-is-italian-brainrot-meme-trend); [Wikiwand: Italian brainrot](https://www.wikiwand.com/en/articles/Italian_brainrot)
- [Reported] **Granny Spills (AI character, 2025).**
  - What it is: a fully AI-generated, sassy grandmother in pink designer suits giving direct-to-camera life advice ("Flowers die, honey. My Chanel bags are forever", liked nearly 1M times).
  - Who makes it: Blur Studios (Eric Suarez, Adam Vaserstein), using Google Veo with large prompt templates. TIME reports they refine ideas from Claude and run a stable of other AI characters (a Bigfoot vlogger, a street interviewer, a fitness instructor).
  - Growth: 1M Instagram followers and 400K TikTok followers in her first weeks (the creators say 22 days, ~July 2025). About 2.2M Instagram followers by late Oct 2026.
  - Monetization: brand deals, Cameo, Facebook/YouTube ads (no earnings published).

  Sources: [TIME](https://time.com/7329699/ai-influencers-tiktok-granny-spills/); [TIME TikTok caption](https://www.tiktok.com/@time/video/7574457110474345741); [Startup Spells](https://startupspells.com/p/grannyspills-ai-influencer-1m-instagram-followers); [CreatorDB](https://creatordb.app/creatorstats/grannyspills/)
- [Reported] **"Fruit Love Island" (AI microdrama, March 2026).**
  - What it is: a serialized *Love Island* parody starring fruit characters, posted by TikTok account @ai.cinema021 ("AI Cinema") from 13 Mar 2026.
  - Growth: 3M+ followers in about nine days; ~3.2-3.3M followers and ~300M total views. Episodes routinely topped 10M views, one hit ~39M.
  - Status: one source says production stopped on 28 Mar 2026; the creator is unidentified.
  - Reception: critics called it "AI slop". Trade press framed it as the start of an "AI microdrama" wave (Spanish-language "frutinovelas" followed).

  Sources: [The Decoder](https://the-decoder.com/ai-generated-dating-show-pulls-10-million-views-per-episode-on-tiktok/); [Express Tribune, 8 Apr 2026](https://tribune.com.pk/story/2598994/ai-generated-fruit-love-island-videos-go-viral-on-tiktok); [C21 Media](https://www.c21media.net/news/fruit-love-island-takes-social-media-by-storm-as-ai-microdramas-set-to-surge/); [Know Your Meme](https://knowyourmeme.com/memes/ai-fruit-love-island); [Dapta](https://dapta.ai/blog-posts/ai-news-week-15-frutinovelas-tiktok/)
- [Reported] **"AI Food Yelling At You" / talking produce (from Aug 2025).**
  - What it is: anthropomorphic fruit and vegetables lecture the viewer about cooking and storage mistakes. The first known clip was by TikToker @freshhacks on 5 Aug 2025.
  - Spread: by early 2026 the format moved into air-fryer habits, dishwasher loading, gym and hygiene. One talking-pimple hygiene clip had 4.2M plays (per a mirrored BBC Bitesize item).
  - Reception: comments were largely positive, but commentators warn the AI tips are not always accurate.
  - Separately, GNET researchers claim some AI fruit/vegetable videos carry violent or extremist content (a different strand).

  Sources: [Know Your Meme](https://knowyourmeme.com/memes/ai-food-yelling-at-you); [Dexerto](https://www.dexerto.com/tiktok/ai-food-videos-are-going-viral-for-shaming-peoples-cooking-habits-3310477/); [Star 101.9](https://www.star1019.com.au/trending/stories/viral-ai-talking-veggies/); [Cybernews](https://cybernews.com/ai-news/ai-fruitslop-violent-extremist-content-tiktok/)
- [Vendor/anecdote] **AI cat/animal chefs (2025).** Kling and Flux-made "cat chef" cooking clips are a large TikTok genre. A vendor tutorial claims one unnamed creator gained 825K+ followers. A labelled "Mr AI Cat" clip (Mar 2025) had ~1.8K likes. A "made this cat chef video in 2 minutes" post had 53.5K likes — [FlexClip](https://www.flexclip.com/learn/ai-cat-cooking-video.html); [TikTok @mraicat](https://www.tiktok.com/@mraicat/video/7479432202695052552); [TikTok @john.tagudin](https://www.tiktok.com/@john.tagudin/video/7493502475354524936?lang=en)
- [Measured] **Scale of AI "slop" economics.** 278 AI-slop-only channels among the world's trending YouTube channels had >63B views and ≈$117M/yr (Kapwing, Oct 2025 data). This shows that fully synthetic formats can earn large views, mostly as low-trust, high-volume entertainment — [TechSpot](https://www.techspot.com/news/110735-over-21-youtube-now-ai-slop-report.html)
- [Reported, contrast case, not AI-generated] Line cook Ryan Gilhuly (@gilhulycooks) films real cooking point-of-view on Meta's AI Ray-Ban glasses. He reached ~930K Instagram followers in a few months; his first Reel passed 60M views. A real person and real food with a novel camera angle broke out at "AI-account" speed — [Yahoo Lifestyle](https://www.yahoo.com/lifestyle/articles/meet-la-area-cook-whos-120000099.html)
- [Reported] I found **no** verified AI-*generated* cooking/recipe account with millions of followers. Large food creators like Albert CanCook and Bayashi are real chefs — (search summary across [Wikipedia: Albert CanCook](https://en.wikipedia.org/wiki/Albert_CanCook), [Wikipedia: Bayashi](https://en.wikipedia.org/wiki/Bayashi))

### Inferences
- **What AI video is good for:**
  - Physically impossible or costly visuals: glass food, giant ingredients, food transforming.
  - Non-human characters with a fixed personality: fruit, cats, a granny persona.
  - Satisfying micro-loops built on sound (ASMR crunch).
  - Cheap serialized episodes, where a recurring cast and cliffhangers drive follows.

  All the big wins are clearly fictional, so the AI look is part of the joke rather than a deception.
- **Where AI video fails:**
  - Credible instruction, where AI tips can be wrong.
  - Proving that food is edible or tastes good: the realism and willingness-to-eat penalties.
  - Avoiding saturation and copy-cat formats: glass fruit was cloned within weeks, which also clashes with Instagram's originality ranking.
  - Durability: Fruit Love Island stopped after ~2 weeks of production.
- Follows come from **serialized characters** (Granny Spills, Fruit Love Island), not from one-off spectacle. ASMR one-offs gave views but less identity.
- Cultural and religious fit matters for a Muslim, halal-focused audience. Italian-brainrot audio drew blasphemy complaints. Trend audio and characters need screening.

### Gaps
- No platform-verified view or follower data for glass-fruit or cat-chef accounts. The numbers are from press or tutorials.
- No long-run retention data. How many 2025 AI breakout accounts kept growing or monetising into late 2026 is unknown, apart from Granny Spills' follower count.
- No viral examples found specifically from Arabic or MENA AI food accounts.
- No data found on Seedance- or Higgsfield-specific viral accounts. Search results credited Veo 3 and Kling.

---

## Q4. Hybrid approaches: real human (face, voice, tasting) plus AI shots. Does the human element raise trust, shares and follows?

### Takeaway
Direct evidence on hybrid reels is thin. I found no controlled test or verified case study of a food creator mixing his own face or voice with AI shots. The indirect evidence points the same way, though:
- Viewers trust real people more (~78%).
- The penalty attaches to *perceived* AI, and to fully synthetic content more than AI-assisted content.
- Instagram's head is publicly pushing "raw", originality and fingerprinted real media as what will matter.

### Cited Findings
- [Measured, vendor] Animoto 2025 survey: ~78% trust videos featuring real people more than AI. Consumers accept AI *elements* such as voiceover or background editing if the core video is human-led — [StudyFinds](https://studyfinds.com/why-consumers-trust-videos-people-more-than-ai/); [Animoto](https://animoto.com/blog/news/what-people-think-about-ai-video)
- [Vendor/anecdote] Secondary analysis of Animoto data claims the trust penalty is concentrated in fully synthetic content, while AI-assisted content (real presenter, AI in editing) "does not show the same penalty" — [FutureFactors](https://futurefactors.ai/ai-video-brand-trust-marketing-2026/)
- [Measured] Raptive: suspected AI cuts trust ~48% and emotional connection ~60%, even for human-made content. Avoiding the AI *look* in trust-bearing moments matters as much as actual AI use — [Raptive](https://raptive.com/blog/the-ai-stink-is-real-and-its-costing-brands/)
- [Official] Mosseri (31 Dec 2025) says:
  - Polished imagery is "cheap to produce and boring to consume".
  - Raw, unpolished content is becoming a signal of authenticity.
  - Platforms will move toward fingerprinting *real* camera media.
  - Instagram will keep improving ranking for originality.

  Sources: [Tubefilter](https://www.tubefilter.com/2026/01/06/adam-mosseri-instagram-warning-generative-ai-deepfakes/); [Om Malik](https://om.co/2026/01/01/what-is-instagrams-adam-mosseri-really-saying-in-his-year-end-memo/); [Technobezz](https://www.technobezz.com/news/instagram-chief-warns-ai-images-are-evolving-too-fast-for-pl-2026-01-02-jmu3)
- [Vendor/anecdote] Industry how-to sources converge on the same hybrid rule: real footage carries credibility, and AI handles transitions, impossible shots and variants. "Use real where reality is available; generate where reality is unavailable or too generic." Undisclosed AI that is later discovered draws "severe" backlash — [CodeDesigns](https://codedesigns.eu/ai-video-production-in-2026-why-brands-blend-ai-clips-with-real-footage/); [DIYAI](https://diyai.io/ai-tools/video-generation/ai-b-roll-generator/); [Influencers-Time](https://www.influencers-time.com/ai-enhanced-reels-the-production-brief-for-brand-safe-blends/)
- [Vendor/anecdote] Unsourced claim that fully AI-generated UGC underperforms real human content "by 50-100x" in organic reach. No method given — [LightReel](https://lightreel.ai/blogs/ai-generated-ugc-videos)
- [Reported] The real-human counterexample is Gilhuly: real cooking from a novel point of view (smart glasses), ~930K followers in months — [Yahoo Lifestyle](https://www.yahoo.com/lifestyle/articles/meet-la-area-cook-whos-120000099.html)
- [Measured] On the food side, disclosed AI food loses its appetite advantage (Oxford/Spence), and AI food reads as less realistic with lower willingness to eat (*Sci Reports* 2026). Real eating and tasting shots supply the realism that AI shots lack — [Food Institute](https://foodinstitute.com/focus/new-study-exposes-the-power-and-pitfalls-of-ai-generated-food-images/); [Scientific Reports](https://www.nature.com/articles/s41598-026-66977-1)

### Inferences
- Treat the real face, real voice and real bite or taste as the **trust anchor**, placed where the viewer decides "is this real, should I make it?". That usually means the hook face, the first bite and the final reaction.
- Use AI shots only as **openly stylised spectacle**: impossible transformations, macro fantasies, intros and transitions. Viewers then read them as creative choice, not deception.
- A real voiceover over AI B-roll is likely tolerated (Animoto: AI elements OK when the core is human-led). But it is weaker than on-camera presence for trust, and voice cloning would forfeit the "real voice" benefit.
- Disclosing AI shots costs little once the human anchor is present, and protects against the "discovered undisclosed" backlash and TikTok FYF-ineligibility.

### Gaps
- No controlled or platform data on completion, shares or follows for hybrid vs fully-real vs fully-AI food reels.
- No verified case study of a food creator who grew mainly through hybrid (own face plus AI shots) content.
- Unknown whether showing an "AI info" label on a hybrid reel measurably lowers reach or engagement. Only Mosseri's "no throttle" statement exists (secondary).

---

## Q5. Practical formats a solo food creator with AI video tools plus his own face and kitchen can run for high completion and shares

### Takeaway
The evidence supports a "real anchor + AI spectacle" model. The most defensible formats combine a clearly unreal, sound-driven AI hook or series element (proven attention-getters) with real proof: his own hands, cooking, bite and reaction, which protect trust and give the follow reason. Every format below is an *inference* built from the cited evidence. None has been tested with measured data for this niche.

### Cited Findings (evidence each format leans on)
- Impossible or surreal ASMR gets huge single-clip views (glass-fruit strawberry 20M+) — [36Kr](https://eu.36kr.com/en/p/3340310849533704)
- Recurring characters and serialized episodes drive follower growth (Granny Spills 1M in ~22 days; Fruit Love Island 3M in ~9 days) — [TIME](https://time.com/7329699/ai-influencers-tiktok-granny-spills/); [The Decoder](https://the-decoder.com/ai-generated-dating-show-pulls-10-million-views-per-episode-on-tiktok/)
- Talking-food "you're doing it wrong" lectures went viral and drew mostly positive comments, but AI tips can be wrong — [Know Your Meme](https://knowyourmeme.com/memes/ai-food-yelling-at-you); [Star 101.9](https://www.star1019.com.au/trending/stories/viral-ai-talking-veggies/)
- Undisclosed AI food looks more appetizing; disclosed or suspected AI food loses realism and willingness to eat — [Food Institute](https://foodinstitute.com/focus/new-study-exposes-the-power-and-pitfalls-of-ai-generated-food-images/); [Scientific Reports](https://www.nature.com/articles/s41598-026-66977-1)
- Real people are trusted more; perceived AI costs ~half of trust — [StudyFinds/Animoto](https://studyfinds.com/why-consumers-trust-videos-people-more-than-ai/); [Raptive](https://raptive.com/blog/the-ai-stink-is-real-and-its-costing-brands/)
- Originality ranking punishes copies and reposts; transformed or remixed work counts more as original — [PetaPixel](https://petapixel.com/2026/04/30/new-instagram-policies-target-reposted-content/)
- Realistic AI must be labelled on TikTok, or the post risks For You feed ineligibility — [TikTok Community Guidelines](https://www.tiktok.com/community-guidelines/en/integrity-authenticity/)

### Inferences (candidate formats, ranked by fit with the evidence)
1. **"AI dream vs my real kitchen".** Open with a 1-3 s AI "impossible" version of the dish (molten, giant, glass-like, exploding) with ASMR sound. Hard-cut to him making the real dish from the book, ending in a real bite and reaction.
   - Why it fits: the AI hook buys attention, and the real ending supplies proof and the follow reason. The AI-vs-real contrast is itself a shareable curiosity gap and plays on the finding that AI food looks *more* appetizing.
   - Requirement: disclose the AI shot.
2. **Recurring AI ingredient character + real host.** A talking ingredient (e.g. a sassy onion or chickpea) nags him about a common cooking mistake. He answers on camera and shows the correct, book-faithful method.
   - Why it fits: this borrows the proven "AI Food Yelling At You" plus recurring-character dynamics. The tips stay accurate because the real host and the book deliver the instruction, not the AI.
   - Requirement: keep one consistent character design and voice for series memory.
3. **Episodic mini-series with cliffhangers.** A short arc (e.g. ingredients "competing" to get into tonight's dish) across 3-5 parts, ending each part with the real cooked result.
   - Why it fits: serialized AI drama drove the fastest follower growth on record (Fruit Love Island), and episodes create profile visits and follows.
   - Caveat: high novelty decay. Fruit Love Island stopped within weeks.
4. **Impossible-food ASMR as a signature intro or B-roll, not as the whole reel.** For example, cutting into a glass falafel to reveal the real falafel's cross-section.
   - Why it fits: one-off AI ASMR clips are saturated and look like trend copies, which carries originality risk. Used as a branded transition inside original recipe content, it adds spectacle without making the account an "AI slop" page.
5. **Real voiceover over AI B-roll (the lowest-effort format).** Acceptable for explainers or "food-science" moments; the Animoto data says AI elements are tolerated when the core is human-led.
   - Weakness: weaker than on-camera presence, and should not be used for the "final dish" shot.
6. **Real taste-test or reaction formats** (first bite, family or guest reaction, "rate it 1-10"). These are the purest trust and authenticity signal, matching Mosseri's "raw" thesis. AI is used here only for an intro or graphic.

**Rules that follow from the evidence**
- Never present an AI-generated plate as the result of a recipe.
- Always label realistic AI shots (Instagram "AI info" or the TikTok AIGC toggle).
- Avoid trending AI audio or characters with religious or offensive baggage (Italian brainrot precedent).
- Prefer original characters and concepts over copying the trend of the week, because of the originality ranking.

### Gaps
- None of these formats has measured completion or share-rate data for food. They are hypotheses to A/B test (e.g. with Instagram Trial Reels) rather than proven playbooks.
- No evidence was found on how Arabic-speaking audiences specifically react to AI food video.
- No reliable benchmarks for completion or share rates of AI ASMR vs real cooking reels.
