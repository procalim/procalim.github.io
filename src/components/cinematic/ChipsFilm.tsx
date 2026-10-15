import { useCallback, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/components/LocalLink";
import { useLang } from "@/i18n/LanguageContext";
import type { DictKey } from "@/i18n/dictionary";
import { clamp01, prefersReducedMotion, sceneState, useScrollProgress } from "@/hooks/use-scroll-progress";

/**
 * The chef's one-second rice-paper chips, played by the reader's scroll.
 *
 * The film is cut into 117 still frames (8 per second of the original, WebP,
 * about 1.9MB in all) and drawn onto a canvas: scrolling down plays it,
 * scrolling up rewinds it, and stopping holds the frame — the scroll-scrubbed
 * product film of the sites it was modelled on, with the dish as the product.
 * The frames start loading only when the section is a screen away, the first
 * frame doubles as the poster, and the headline changes with the shot.
 *
 * فيلم شيبس ورق الأرز يتحرّك بإصبع الزائر: مقطّع إلى ١١٧ صورة تُرسم على
 * لوحة مع السحب، تتقدّم للأمام وترجع للخلف، والعنوان يتبدّل مع اللقطة.
 */

const FRAMES = 117;
const frameUrl = (i: number) => `${import.meta.env.BASE_URL}brand/film/chips/f${String(i + 1).padStart(3, "0")}.webp`;
const POSTER = `${import.meta.env.BASE_URL}brand/film/chips/poster.jpg`;

/** The headline over each stretch of the film, matched to its shots. */
const BEATS: { line1: DictKey; line2: DictKey; body: DictKey }[] = [
  { line1: "film.1.line1", line2: "film.1.line2", body: "film.1.body" },
  { line1: "film.2.line1", line2: "film.2.line2", body: "film.2.body" },
  { line1: "film.3.line1", line2: "film.3.line2", body: "film.3.body" },
];

const ChipsFilm = () => {
  const { t } = useLang();
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const images = useRef<(HTMLImageElement | null)[]>(Array(FRAMES).fill(null));
  const shown = useRef(-1);
  const wanted = useRef(0);
  const beats = useRef<(HTMLDivElement | null)[]>([]);
  const bar = useRef<HTMLDivElement>(null);
  const reduced = useRef<boolean | null>(null);

  /** Draws frame `i`, or the nearest one already loaded, covering the canvas. */
  const draw = useCallback((i: number) => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    let pick = -1;
    for (let d = 0; d < FRAMES && pick < 0; d++) {
      if (images.current[i - d]?.complete) pick = i - d;
      else if (images.current[i + d]?.complete) pick = i + d;
    }
    if (pick < 0 || pick === shown.current) return;
    const img = images.current[pick]!;
    // Match the canvas to its box at the device's pixel density.
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(el.clientWidth * ratio);
    const h = Math.round(el.clientHeight * ratio);
    if (el.width !== w || el.height !== h) {
      el.width = w;
      el.height = h;
    }
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    shown.current = pick;
  }, []);

  // Load the frames once the section is a screen away — the first and every
  // eighth first, so the whole film is roughly there before the rest fills in.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const order = [
      ...Array.from({ length: FRAMES }, (_, i) => i).filter((i) => i % 8 === 0),
      ...Array.from({ length: FRAMES }, (_, i) => i).filter((i) => i % 8 !== 0),
    ];
    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        order.forEach((i) => {
          const img = new Image();
          img.decoding = "async";
          img.onload = () => {
            // A frame that lands near the one asked for is drawn at once.
            if (Math.abs(i - wanted.current) < 6) {
              shown.current = -1;
              draw(wanted.current);
            }
          };
          img.src = frameUrl(i);
          images.current[i] = img;
        });
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(el);
    const onResize = () => {
      shown.current = -1;
      draw(wanted.current);
    };
    window.addEventListener("resize", onResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [draw]);

  const render = useCallback(
    (progress: number) => {
      if (reduced.current === null) reduced.current = prefersReducedMotion();
      // The film plays over the first 92%; the last stretch holds the plate.
      const p = clamp01(progress / 0.92);
      const frame = Math.min(FRAMES - 1, Math.round(p * (FRAMES - 1)));
      wanted.current = frame;
      draw(frame);

      const position = p * BEATS.length;
      BEATS.forEach((_, i) => {
        const el = beats.current[i];
        if (!el) return;
        const { opacity, fadeIn } = sceneState(position, i, BEATS.length, 0.22);
        el.style.opacity = String(opacity);
        el.style.visibility = opacity < 0.02 ? "hidden" : "visible";
        if (!reduced.current) el.style.transform = `translateY(${(1 - fadeIn) * 36}px)`;
      });
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    },
    [draw],
  );

  useScrollProgress(section, render);

  return (
    <section ref={section} className="relative h-[330svh] bg-ink" aria-label={t("film.eyebrow")}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* The film: the whole stage on a phone, the right-hand side on a desktop */}
        <div className="absolute inset-0 lg:start-auto lg:w-1/2">
          <img
            src={POSTER}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-label={t("film.alt")} role="img" />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,11,0.92) 0%, rgba(10,10,11,0.55) 30%, rgba(10,10,11,0) 52%, rgba(10,10,11,0.9) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to var(--story-side, right), #0A0A0B 45%, rgba(10,10,11,0.6) 52%, transparent 70%)",
          }}
        />

        {/* The words, changing with the shot */}
        <div className="container-luxe relative z-10 h-full">
          <div className="relative h-full">
            <div className="absolute inset-x-0 top-[92px] lg:top-1/2 lg:max-w-[44%] lg:-translate-y-1/2">
              <span className="eyebrow eyebrow-start">{t("film.eyebrow")}</span>
              <div className="relative mt-3 h-[210px] md:h-[260px]">
                {BEATS.map((beat, i) => (
                  <div
                    key={beat.line1}
                    ref={(el) => (beats.current[i] = el)}
                    className="absolute inset-x-0 top-0 will-change-transform"
                    style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
                  >
                    <h2 className="font-poster text-[clamp(2.4rem,10vw,5.6rem)] uppercase leading-[0.95] text-ivory">
                      {t(beat.line1)}
                      <span className="block gold-text">{t(beat.line2)}</span>
                    </h2>
                    <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ivory/80 md:text-[15px]">
                      {t(beat.body)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-6 md:bottom-8 lg:max-w-[44%]">
              <div className="mb-4 h-px overflow-hidden bg-ivory/15">
                <div ref={bar} className="h-full origin-[left] bg-gold rtl:origin-[right]" style={{ transform: "scaleX(0)" }} />
              </div>
              <Link
                to="/videos/one-second-chips/"
                className="inline-flex min-h-[44px] items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-gold hover:text-ivory"
              >
                {t("film.cta")}
                <ArrowRight className="h-3.5 w-3.5 flip-rtl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChipsFilm;
