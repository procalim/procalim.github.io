import { useCallback, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/components/LocalLink";
import BuyButton from "@/components/BuyButton";
import { useLang } from "@/i18n/LanguageContext";
import type { DictKey } from "@/i18n/dictionary";
import { getProduct } from "@/data/products";
import { brandImages } from "@/data/site";
import { prefersReducedMotion, sceneState, useScrollProgress } from "@/hooks/use-scroll-progress";
import Picture from "@/components/Picture";

/**
 * The free guide gets its own scene. The finished plate — all five sauces
 * drawn across it — holds the middle of a pinned stage, and each scroll
 * brings one sauce forward: its colour, its name, the one line that makes
 * you want it. The way out is always on screen, because the guide is free.
 *
 * مشهد خاص لدليل الصلصات المجاني: الطبق بالصلصات الخمس في المنتصف، ومع
 * كل سحبة تتقدّم صلصة بلونها واسمها وجملتها. زر التحميل ظاهر دائماً.
 */

type Sauce = { color: string; name: DictKey; line: DictKey };

const SAUCES: Sauce[] = [
  { color: "#A81B52", name: "sauce.1.name", line: "sauce.1.line" },
  { color: "#D9A21B", name: "sauce.2.name", line: "sauce.2.line" },
  { color: "#1F7A4C", name: "sauce.3.name", line: "sauce.3.line" },
  { color: "#C0562A", name: "sauce.4.name", line: "sauce.4.line" },
  { color: "#3A2416", name: "sauce.5.name", line: "sauce.5.line" },
];

const SauceFeature = () => {
  const { t } = useLang();
  const product = getProduct("the-five-sauces");
  const section = useRef<HTMLElement>(null);
  const plate = useRef<HTMLImageElement>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const chips = useRef<(HTMLSpanElement | null)[]>([]);
  const reduced = useRef<boolean | null>(null);

  const render = useCallback((progress: number) => {
    if (reduced.current === null) reduced.current = prefersReducedMotion();
    const count = SAUCES.length;
    const position = Math.min(progress / 0.92, 1) * count;
    const active = Math.min(count - 1, Math.floor(position));

    if (plate.current && !reduced.current) {
      plate.current.style.transform = `scale(${1.12 - 0.12 * Math.min(1, progress * 1.6)}) rotate(${(1 - Math.min(1, progress * 1.6)) * -4}deg)`;
    }
    SAUCES.forEach((_, i) => {
      const { opacity, fadeIn } = sceneState(position, i, count, 0.25);
      const row = rows.current[i];
      if (row) {
        row.style.opacity = String(opacity);
        row.style.visibility = opacity < 0.02 ? "hidden" : "visible";
        if (!reduced.current) row.style.transform = `translateY(${(1 - fadeIn) * 30}px)`;
      }
      const chip = chips.current[i];
      if (chip) {
        chip.style.transform = `scale(${i === active ? 1.35 : 1})`;
        chip.style.opacity = i <= active ? "1" : "0.3";
      }
    });
  }, []);

  useScrollProgress(section, render);

  if (!product) return null;

  return (
    <section ref={section} className="relative h-[215svh] bg-ink" aria-label={t("sauces.line1")}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-[88px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, rgba(201,162,39,0.16), transparent 60%), radial-gradient(circle at 10% 0%, rgba(168,27,82,0.18), transparent 40%)",
          }}
        />

        <div className="container-luxe relative z-10 grid flex-1 items-center gap-4 pb-6 lg:grid-cols-2 lg:gap-14">
          {/* Words */}
          <div className="order-1">
            <span className="eyebrow eyebrow-start">{t("sauces.eyebrow")}</span>
            <h2 className="font-poster mt-3 text-[clamp(2.3rem,9.5vw,5.6rem)] uppercase leading-[0.95] text-ivory">
              {t("sauces.line1")}
              <span className="block gold-text">{t("sauces.line2")}</span>
            </h2>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ivory/80 md:text-[15px]">
              {t("sauces.body")}
            </p>

            {/* The sauce in focus, one per scroll */}
            <div className="relative mt-5 h-[58px] md:h-[64px]">
              {SAUCES.map((sauce, i) => (
                <div
                  key={sauce.name}
                  ref={(el) => (rows.current[i] = el)}
                  className="absolute inset-0 flex items-center gap-4"
                  style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
                >
                  <span className="h-12 w-1.5 shrink-0 rounded-full" style={{ background: sauce.color }} />
                  <div>
                    <p className="font-poster text-xl uppercase text-ivory md:text-2xl">{t(sauce.name)}</p>
                    <p className="mt-0.5 text-[13px] text-ivory/70">{t(sauce.line)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3" aria-hidden="true">
              {SAUCES.map((sauce, i) => (
                <span
                  key={sauce.color}
                  ref={(el) => (chips.current[i] = el)}
                  className="h-3.5 w-3.5 rounded-full ring-1 ring-ivory/30 transition-transform duration-300"
                  style={{ background: sauce.color, opacity: i === 0 ? 1 : 0.3 }}
                />
              ))}
            </div>

            <div className="mt-6 hidden flex-wrap items-center gap-4 lg:flex">
              <BuyButton product={product} />
              <Link
                to={`/shop/${product.slug}/`}
                className="inline-flex min-h-[44px] items-center text-[12px] font-semibold uppercase tracking-[0.16em] text-gold hover:text-ivory"
              >
                {t("sauces.more")}
              </Link>
            </div>
          </div>

          {/* The plate */}
          <div className="order-2 flex h-[28svh] min-h-0 justify-center lg:h-[62svh]">
            <Picture
              ref={plate}
              src={brandImages.fiveSauces}
              alt={t("sauces.alt")}
              loading="lazy"
              decoding="async"
              className="h-full w-auto max-w-full rounded-sm object-contain shadow-gold-glow will-change-transform"
            />
          </div>

          <div className="order-3 flex items-center gap-4 lg:hidden">
            <BuyButton product={product} className="flex-1" />
            <Link
              to={`/shop/${product.slug}/`}
              className="inline-flex min-h-[44px] shrink-0 items-center text-[12px] font-semibold uppercase tracking-[0.14em] text-gold"
            >
              {t("sauces.more")}
              <ArrowRight className="ms-1 inline h-3 w-3 flip-rtl" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SauceFeature;
