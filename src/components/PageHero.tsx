import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Picture from "@/components/Picture";
import { brandImages } from "@/data/site";
import { prefersReducedMotion } from "@/hooks/use-scroll-progress";

/**
 * The opening of every inner page, in the home page's language: a full-bleed
 * photograph that drifts in slowly and sinks away as the reader scrolls, a
 * poster headline that rises out of a mask, and a gold rule beneath.
 *
 * افتتاحية كل صفحة داخلية بنفس لغة الصفحة الرئيسية: صورة بملء العرض تتحرك
 * ببطء وتغوص مع السحب، وعنوان ضخم يرتفع من قناع.
 */
type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image?: string;
  /** CSS object-position for the photograph. */
  focus?: string;
  children?: ReactNode;
};

const PageHero = ({ eyebrow, title, subtitle, image = brandImages.heroBackdrop, focus = "center", children }: Props) => {
  const section = useRef<HTMLElement>(null);
  const photo = useRef<HTMLImageElement>(null);
  const words = useRef<HTMLDivElement>(null);

  // Parallax: as the hero leaves the screen the photograph sinks and the
  // words lift and fade. One rAF per scroll frame, nothing off screen.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = section.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / rect.height));
      if (photo.current) photo.current.style.transform = `translateY(${p * 22}%) scale(${1.08 + p * 0.08})`;
      if (words.current) {
        words.current.style.transform = `translateY(${p * -60}px)`;
        words.current.style.opacity = String(1 - p * 1.3);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={section} data-no-reveal className="relative flex min-h-[58svh] items-end overflow-hidden bg-ink md:min-h-[64svh]">
      <Picture
        ref={photo}
        src={image}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="hero-drift absolute inset-0 h-full w-full object-cover opacity-55 will-change-transform"
        style={{ objectPosition: focus }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0.2) 40%, #0A0A0B 100%), radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      <div ref={words} className="container-luxe relative z-10 pb-12 pt-28 text-center will-change-transform md:pb-16">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="font-poster mx-auto mt-4 max-w-4xl text-[clamp(2.6rem,10vw,6rem)] uppercase leading-[0.95] text-ivory">
          <span className="rise-line">
            <span className="gold-text">{title}</span>
          </span>
        </h1>
        {subtitle && (
          <p
            className="hero-fade mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ivory/80"
            style={{ "--fade-delay": "250ms" } as CSSProperties}
          >
            {subtitle}
          </p>
        )}
        {children}
      </div>

      <div className="gold-divider absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
};

export default PageHero;
