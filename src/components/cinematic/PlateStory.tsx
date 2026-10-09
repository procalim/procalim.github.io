import { useCallback, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/components/LocalLink";
import { useLang } from "@/i18n/LanguageContext";
import type { DictKey } from "@/i18n/dictionary";
import { brandImages } from "@/data/site";
import { clamp01, easeOut, prefersReducedMotion, useScrollProgress } from "@/hooks/use-scroll-progress";
import Picture from "@/components/Picture";

/**
 * The home page opens on the plates themselves. The section is three screens
 * tall and its stage stays pinned while the visitor scrolls through it: each
 * plate settles in from slightly closer, its headline rises, and the next
 * plate takes over — the dish, not a banner, is the hero.
 *
 * Every scene is in the HTML from the start (the first one visible), so
 * crawlers and visitors without JavaScript still get all three headlines,
 * and the page's one h1 is the first scene's.
 *
 * تبدأ الصفحة بالأطباق نفسها: القسم بطول ثلاث شاشات، والمشهد ثابت بينما
 * يتبدّل الطبق والعنوان مع السحب. كل المشاهد موجودة في الصفحة منذ البداية،
 * فيقرؤها جوجل كاملة.
 */

type Scene = {
  image: string;
  eyebrow: DictKey;
  line1: DictKey;
  line2: DictKey;
  body: DictKey;
  dish: DictKey;
  note: DictKey;
};

const SCENES: Scene[] = [
  {
    image: brandImages.chefShrimp,
    eyebrow: "hero.eyebrow",
    line1: "hero.title.line1",
    line2: "hero.title.line2",
    body: "hero.subtitle",
    dish: "gallery.1.title",
    note: "gallery.1.body",
  },
  {
    image: brandImages.chefDuck,
    eyebrow: "story.2.eyebrow",
    line1: "story.2.line1",
    line2: "story.2.line2",
    body: "story.2.body",
    dish: "gallery.2.title",
    note: "gallery.2.body",
  },
  {
    image: brandImages.chefBeef,
    eyebrow: "story.3.eyebrow",
    line1: "story.3.line1",
    line2: "story.3.line2",
    body: "story.3.body",
    dish: "gallery.3.title",
    note: "gallery.3.body",
  },
];

/** How much of its slot a scene spends fading in and out. */
const FADE = 0.18;

const PlateStory = ({ flagshipPath }: { flagshipPath: string }) => {
  const { t } = useLang();
  const section = useRef<HTMLElement>(null);
  const images = useRef<(HTMLImageElement | null)[]>([]);
  const texts = useRef<(HTMLDivElement | null)[]>([]);
  const captions = useRef<(HTMLDivElement | null)[]>([]);
  const bar = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const reduced = useRef<boolean | null>(null);

  const render = useCallback((progress: number) => {
    if (reduced.current === null) reduced.current = prefersReducedMotion();
    const still = reduced.current;
    const count = SCENES.length;
    // The scenes share the first 92% of the scroll; the last stretch holds
    // the final plate so it is not snatched away by the next section.
    const position = Math.min(progress / 0.92, 1) * count;
    const active = Math.min(count - 1, Math.floor(position));

    SCENES.forEach((_, i) => {
      const local = position - i; // 0…1 while this scene is on stage
      const fadeIn = i === 0 ? 1 : clamp01((local + FADE) / FADE);
      const fadeOut = i === count - 1 ? 1 : clamp01((1 - local) / FADE);
      const opacity = Math.min(fadeIn, fadeOut);
      const settle = easeOut(clamp01((local + FADE) / (1 + FADE)));

      const image = images.current[i];
      if (image) {
        image.style.opacity = String(opacity);
        image.style.transform = still ? "" : `scale(${1.14 - 0.14 * settle})`;
      }
      const text = texts.current[i];
      if (text) {
        text.style.opacity = String(opacity);
        text.style.transform = still ? "" : `translateY(${(1 - Math.min(fadeIn, 1)) * 48 - (1 - fadeOut) * 32}px)`;
        text.style.visibility = opacity < 0.02 ? "hidden" : "visible";
      }
      const caption = captions.current[i];
      if (caption) {
        caption.style.opacity = String(opacity);
        caption.style.visibility = opacity < 0.02 ? "hidden" : "visible";
      }
    });

    if (bar.current) bar.current.style.transform = `scaleX(${clamp01(progress / 0.92)})`;
    if (counter.current) counter.current.textContent = String(active + 1).padStart(2, "0");
  }, []);

  useScrollProgress(section, render);

  return (
    <section ref={section} className="relative h-[270svh] bg-ink" aria-label={t("hero.title.line1")}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* The plates — black on black, so the photographs melt into the stage */}
        <div className="absolute inset-x-0 bottom-[118px] top-[36%] sm:bottom-[170px] lg:inset-y-0 lg:bottom-0 lg:start-auto lg:w-[56%]">
          {SCENES.map((scene, i) => (
            <Picture
              key={scene.image}
              ref={(el) => (images.current[i] = el)}
              src={scene.image}
              alt={t(scene.dish)}
              fetchPriority={i === 0 ? "high" : undefined}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-[50%_80%] will-change-transform lg:origin-bottom lg:object-contain lg:object-bottom"
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          ))}
        </div>

        {/* Shade for the words: top and bottom on a phone, the side on a desktop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(to bottom, #0A0A0B 36%, rgba(10,10,11,0) 48%, rgba(10,10,11,0) 74%, #0A0A0B 88%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background:
              "radial-gradient(ellipse at 70% 60%, rgba(201,162,39,0.10), transparent 55%), linear-gradient(to var(--story-side, right), #0A0A0B 38%, rgba(10,10,11,0.4) 62%, transparent 80%)",
          }}
        />

        {/* Headlines */}
        <div className="container-luxe relative z-10 h-full">
          <div className="relative h-full">
            {SCENES.map((scene, i) => {
              const Heading = i === 0 ? "h1" : "h2";
              return (
                <div
                  key={scene.line1}
                  className="absolute inset-x-0 top-[92px] lg:top-[46%] lg:max-w-[48%] lg:-translate-y-1/2"
                >
                  <div
                    ref={(el) => (texts.current[i] = el)}
                    className="will-change-transform"
                    style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
                  >
                    <span className="eyebrow eyebrow-start">{t(scene.eyebrow)}</span>
                    <Heading className="font-poster mt-3 text-[clamp(2.5rem,10.5vw,7.2rem)] uppercase leading-[0.95] text-ivory lg:mt-5 lg:text-[clamp(3.5rem,5.6vw,6rem)]">
                      {t(scene.line1)}
                      <span className="block gold-text">{t(scene.line2)}</span>
                    </Heading>
                    <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ivory/80 md:text-base lg:mt-5">
                      {t(scene.body)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom bar: which plate, how far, and the way out */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="container-luxe pb-6 md:pb-8">
            <div className="relative mb-4 hidden h-10 sm:block">
              {SCENES.map((scene, i) => (
                <div
                  key={scene.dish}
                  ref={(el) => (captions.current[i] = el)}
                  className="absolute inset-0"
                  style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
                >
                  <p className="font-display text-[15px] text-ivory">{t(scene.dish)}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-gold/85">{t(scene.note)}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="font-poster text-sm tabular-nums text-gold" dir="ltr">
                <span ref={counter}>01</span>
                <span className="text-ivory/60"> / {String(SCENES.length).padStart(2, "0")}</span>
              </span>
              <div className="h-px flex-1 overflow-hidden bg-ivory/15">
                <div ref={bar} className="h-full origin-[left] bg-gold rtl:origin-[right]" style={{ transform: "scaleX(0)" }} />
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link to={flagshipPath} className="btn-gold">
                {t("hero.cta.primary")}
                <ArrowRight className="h-4 w-4 flip-rtl" />
              </Link>
              <Link to="/shop/" className="btn-outline-gold hidden sm:inline-flex">
                {t("hero.cta.secondary")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlateStory;
