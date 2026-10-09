import { useCallback, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/components/LocalLink";
import { useLang } from "@/i18n/LanguageContext";
import type { DictKey } from "@/i18n/dictionary";
import { getRecipe, recipePhoto } from "@/data/recipes";
import { clamp01, prefersReducedMotion, sceneState, useScrollProgress } from "@/hooks/use-scroll-progress";

/**
 * Inside the book, one plate per scroll. A pinned stage turns the pages of
 * the book's own photographs: each recipe arrives full-frame with a slow
 * push-in, its hook set big, a line that sells the bite, and a link to the
 * full recipe on the site — which is also free, so the reel is the book's
 * best sample rather than a teaser.
 *
 * من داخل الكتاب، طبق مع كل سحبة: صورة الوصفة بملء الشاشة، عنوان جذّاب،
 * وصف يفتح الشهية، ورابط للوصفة كاملة مجاناً.
 */

type Reel = { slug: string; hook1: DictKey; hook2: DictKey; body: DictKey };

const REEL: Reel[] = [
  { slug: "bang-bang-shrimp", hook1: "reel.1.hook1", hook2: "reel.1.hook2", body: "reel.1.body" },
  { slug: "french-onion-grilled-cheese", hook1: "reel.2.hook1", hook2: "reel.2.hook2", body: "reel.2.body" },
  { slug: "quesabirria-tacos", hook1: "reel.3.hook1", hook2: "reel.3.hook2", body: "reel.3.body" },
  { slug: "smashed-potatoes", hook1: "reel.4.hook1", hook2: "reel.4.hook2", body: "reel.4.body" },
  { slug: "whipped-feta-hot-honey-dip", hook1: "reel.5.hook1", hook2: "reel.5.hook2", body: "reel.5.body" },
  { slug: "dalgona-coffee", hook1: "reel.6.hook1", hook2: "reel.6.hook2", body: "reel.6.body" },
];

const scenes = REEL.flatMap((item) => {
  const recipe = getRecipe(item.slug);
  return recipe ? [{ ...item, recipe }] : [];
});

const RecipeReel = () => {
  const { t, L, lang } = useLang();
  const section = useRef<HTMLElement>(null);
  const images = useRef<(HTMLImageElement | null)[]>([]);
  const texts = useRef<(HTMLDivElement | null)[]>([]);
  const dots = useRef<(HTMLSpanElement | null)[]>([]);
  const counter = useRef<HTMLSpanElement>(null);
  const reduced = useRef<boolean | null>(null);

  const render = useCallback(
    (progress: number) => {
      if (reduced.current === null) reduced.current = prefersReducedMotion();
      const still = reduced.current;
      const count = scenes.length;
      const position = Math.min(progress / 0.94, 1) * count;
      const active = Math.min(count - 1, Math.floor(position));
      const drift = lang === "ar" ? -1 : 1;

      scenes.forEach((_, i) => {
        const { opacity, fadeIn, fadeOut, settle } = sceneState(position, i, count);
        const image = images.current[i];
        if (image) {
          image.style.opacity = String(opacity);
          // A slow push-in that also slides a touch, like a camera on a rail.
          image.style.transform = still
            ? ""
            : `scale(${1.18 - 0.12 * settle}) translateX(${(1 - settle) * 3 * drift}%)`;
        }
        const text = texts.current[i];
        if (text) {
          text.style.opacity = String(opacity);
          text.style.visibility = opacity < 0.02 ? "hidden" : "visible";
          if (!still) text.style.transform = `translateY(${(1 - fadeIn) * 56 - (1 - fadeOut) * 28}px)`;
        }
        const dot = dots.current[i];
        if (dot) dot.style.transform = `scaleX(${i < active ? 1 : i === active ? clamp01(position - i) : 0})`;
      });

      if (counter.current) counter.current.textContent = String(active + 1).padStart(2, "0");
    },
    [lang],
  );

  useScrollProgress(section, render);

  return (
    <section
      ref={section}
      className="relative bg-ink"
      style={{ height: `${scenes.length * 75 + 30}svh` }}
      aria-label={t("reel.eyebrow")}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Photographs: the top of the screen on a phone, the whole stage on a desktop */}
        <div className="absolute inset-x-0 top-0 h-[60%] overflow-hidden lg:h-full">
          {scenes.map((scene, i) => (
            <img
              key={scene.slug}
              ref={(el) => (images.current[i] = el)}
              src={recipePhoto(scene.recipe) ?? undefined}
              alt={L(scene.recipe.title)}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          ))}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink lg:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(to var(--story-side, right), rgba(10,10,11,0.92) 0%, rgba(10,10,11,0.55) 38%, transparent 70%), linear-gradient(to top, rgba(10,10,11,0.85), transparent 40%)",
            }}
          />
        </div>

        {/* Section label and progress, pinned to the top */}
        <div className="absolute inset-x-0 top-[86px] z-10">
          <div className="container-luxe flex items-center gap-4">
            <span className="eyebrow eyebrow-start shrink-0">{t("reel.eyebrow")}</span>
            <div className="flex flex-1 gap-1.5">
              {scenes.map((scene, i) => (
                <span key={scene.slug} className="h-[2px] flex-1 overflow-hidden bg-ivory/20">
                  <span
                    ref={(el) => (dots.current[i] = el)}
                    className="block h-full origin-[left] bg-gold rtl:origin-[right]"
                    style={{ transform: "scaleX(0)" }}
                  />
                </span>
              ))}
            </div>
            <span className="font-poster shrink-0 text-sm text-gold" dir="ltr">
              <span ref={counter}>01</span>
              <span className="text-ivory/40"> / {String(scenes.length).padStart(2, "0")}</span>
            </span>
          </div>
        </div>

        {/* The words: under the photo on a phone, over its shaded side on a desktop */}
        <div className="absolute inset-x-0 bottom-0 top-[55%] z-10 lg:top-auto lg:h-full">
          <div className="container-luxe h-full">
            <div className="relative h-full">
            {scenes.map((scene, i) => (
              <div
                key={scene.slug}
                className="absolute inset-x-0 top-0 lg:bottom-[12%] lg:top-auto lg:max-w-[46%]"
              >
                <div
                  ref={(el) => (texts.current[i] = el)}
                  className="will-change-transform"
                  style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
                >
                  <p className="text-[11px] uppercase tracking-[0.18em] text-gold/85">
                    {L(scene.recipe.title)} · <bdi dir="ltr">{scene.recipe.time}</bdi>
                  </p>
                  <h3 className="font-poster mt-2 text-[clamp(2.1rem,9vw,5.4rem)] uppercase leading-[0.95] text-ivory lg:text-[clamp(3rem,4.6vw,4.6rem)]">
                    {t(scene.hook1)}
                    <span className="block gold-text">{t(scene.hook2)}</span>
                  </h3>
                  <p className="mt-3 max-w-md text-[13px] leading-relaxed text-ivory/75 md:text-[15px]">
                    {t(scene.body)}
                  </p>
                  <Link
                    to={`/recipes/${scene.slug}/`}
                    className="mt-5 inline-flex items-center gap-2 border-b border-gold/60 pb-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:text-ivory"
                  >
                    {t("reel.cta")}
                    <ArrowRight className="h-3.5 w-3.5 flip-rtl" />
                  </Link>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeReel;
