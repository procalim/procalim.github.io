import { useCallback, useRef } from "react";
import { useLang } from "@/i18n/LanguageContext";
import type { DictKey } from "@/i18n/dictionary";
import { bookPages } from "@/data/site";
import { clamp01, easeOut, prefersReducedMotion, useScrollProgress } from "@/hooks/use-scroll-progress";

/**
 * The book opens itself. The cover sits alone in the middle of a pinned
 * stage; as the visitor scrolls, the pages behind it fan out to either side —
 * contents, a recipe, the chef, the book on a phone — and the headline counts
 * what is inside. It is the box-opening shot of a product film, done with the
 * book's real pages.
 *
 * الكتاب يفتح نفسه: الغلاف في المنتصف، ومع السحب تنفرد الصفحات خلفه يميناً
 * ويساراً، بصفحات الكتاب الحقيقية.
 */

type Page = { image: string; label: DictKey; slot: number };

/** slot: where the page lands, in page-widths from the centre (negative = start side). */
const PAGES: Page[] = [
  { image: bookPages.contents, label: "reveal.page.contents", slot: -2 },
  { image: bookPages.frontispiece, label: "reveal.page.chef", slot: -1 },
  { image: bookPages.recipeMain, label: "reveal.page.recipe", slot: 1 },
  { image: bookPages.onScreen, label: "reveal.page.screen", slot: 2 },
];

const BookReveal = () => {
  const { t, lang } = useLang();
  const section = useRef<HTMLElement>(null);
  const pages = useRef<(HTMLElement | null)[]>([]);
  const cover = useRef<HTMLElement>(null);
  const words = useRef<HTMLDivElement>(null);
  const reduced = useRef<boolean | null>(null);

  const render = useCallback(
    (progress: number) => {
      if (reduced.current === null) reduced.current = prefersReducedMotion();
      const open = easeOut(clamp01((progress - 0.08) / 0.6));
      const side = lang === "ar" ? -1 : 1; // the start side flips with the language
      const stage = section.current?.clientWidth ?? 1200;
      // A page is 30% of the stage on a phone and ~17% on a desktop; the
      // outer pages land half off-screen on a phone, which reads as "more".
      const pageWidth = stage < 768 ? stage * 0.3 : Math.min(stage * 0.17, 260);
      const gap = stage < 768 ? 1 : 1.08;

      PAGES.forEach((page, i) => {
        const el = pages.current[i];
        if (!el) return;
        const x = page.slot * pageWidth * gap * open * side;
        const tilt = page.slot * 4 * open * side;
        const lift = Math.abs(page.slot) * 18 * open;
        el.style.opacity = String(clamp01(open * 3));
        el.style.transform = reduced.current
          ? `translateX(${x}px)`
          : `translateX(${x}px) translateY(${lift}px) rotate(${tilt}deg) scale(${0.86 + 0.08 * open})`;
      });

      if (cover.current && !reduced.current) {
        cover.current.style.transform = `scale(${1.08 - 0.08 * open}) translateY(${-12 * open}px)`;
      }
      if (words.current) {
        const show = clamp01((progress - 0.02) / 0.2);
        words.current.style.opacity = String(show);
        if (!reduced.current) words.current.style.transform = `translateY(${(1 - show) * 40}px)`;
      }
    },
    [lang],
  );

  useScrollProgress(section, render);

  return (
    <section ref={section} className="texture-navy relative h-[195svh]">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-[92px]">
        <div ref={words} className="container-luxe relative z-20 text-center will-change-transform">
          <span className="eyebrow">{t("featured.eyebrow")}</span>
          <h2 className="font-poster mx-auto mt-3 text-[clamp(2.4rem,9.5vw,6rem)] uppercase leading-[0.95] text-ivory">
            {t("reveal.line1")} <span className="gold-text sm:inline block">{t("reveal.line2")}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[13px] leading-relaxed text-ivory/70 md:text-[15px]">
            {t("reveal.body")}
          </p>
        </div>

        <div className="relative flex flex-1 items-center justify-center">
          {PAGES.map((page, i) => (
            <figure
              key={page.image}
              ref={(el) => (pages.current[i] = el)}
              className="absolute w-[30vw] max-w-[260px] will-change-transform md:w-[17vw]"
              style={{ opacity: 0, zIndex: 5 - Math.abs(page.slot) }}
            >
              <img
                src={page.image}
                alt={t(page.label)}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-sm object-cover shadow-luxe ring-1 ring-gold/25"
              />
              <figcaption className="mt-2 text-center text-[10px] uppercase tracking-[0.16em] text-gold/80">
                {t(page.label)}
              </figcaption>
            </figure>
          ))}

          <figure
            ref={cover}
            className="relative z-10 w-[38vw] max-w-[290px] will-change-transform md:w-[19vw]"
          >
            <div className="absolute -inset-3 rounded-sm border border-gold/30" aria-hidden="true" />
            <img
              src={bookPages.cover}
              alt={t("featured.title")}
              loading="lazy"
              decoding="async"
              className="relative aspect-[4/5] w-full rounded-sm object-cover shadow-gold-glow"
            />
            <figcaption className="sr-only">{t("reveal.page.cover")}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default BookReveal;
