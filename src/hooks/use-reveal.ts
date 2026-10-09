import { useEffect } from "react";
import { prefersReducedMotion } from "@/hooks/use-scroll-progress";

/**
 * What fades up into place as it reaches the screen: anything tagged
 * `data-reveal`, plus the usual building blocks of a page — section
 * headings, cards, figures, quotes, list rows and accordion items — so every
 * page moves without each one being annotated by hand.
 */
const AUTO =
  "[data-reveal], main section h2, main section h3, main .card-luxe, main section article, main section figure, main section blockquote, main section li";

/**
 * Fades page content up into place as it arrives, on every page. Nothing is
 * hidden until this runs, so the prerendered HTML and visitors without
 * JavaScript see everything; visitors who ask for less motion are never
 * armed. Pinned cinematic scenes and page heroes run their own motion and
 * are left alone. Siblings stagger by 60ms each, up to five steps.
 *
 * ظهور تدريجي لمحتوى كل صفحة عند وصوله للشاشة، مع تتابع خفيف بين العناصر
 * المتجاورة. لا يعمل لمن يفضّل تقليل الحركة.
 */
export const useReveal = (key: string) => {
  useEffect(() => {
    const root = document.querySelector("main");
    if (!root || prefersReducedMotion() || !("IntersectionObserver" in window)) return;

    // Wait a frame so the new route has painted.
    let observer: IntersectionObserver | null = null;
    const frame = requestAnimationFrame(() => {
      const targets = Array.from(root.querySelectorAll<HTMLElement>(AUTO)).filter(
        (el) => !el.closest(".sticky, [data-no-reveal], nav, header"),
      );
      // Nested matches (a heading inside a card) would animate twice; keep
      // only the outermost.
      const set = new Set(targets);
      const outer = targets.filter((el) => {
        for (let p = el.parentElement; p && p !== root; p = p.parentElement) if (set.has(p)) return false;
        return true;
      });

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            el.classList.add("is-revealed");
            observer?.unobserve(el);
            // Once in place, hand the element back to its own styles, so a
            // card's hover keeps its quick transition rather than the reveal's.
            window.setTimeout(() => {
              el.removeAttribute("data-reveal-target");
              el.classList.remove("is-revealed");
            }, 1200);
          });
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
      );

      outer.forEach((el) => {
        const explicit = el.dataset.reveal;
        const index = explicit ? Number(explicit) || 0 : Array.prototype.indexOf.call(el.parentElement?.children ?? [], el);
        el.style.setProperty("--reveal-delay", `${Math.min(Math.max(index, 0), 5) * 60}ms`);
        el.setAttribute("data-reveal-target", "");
        observer?.observe(el);
      });
      root.classList.add("reveal-armed");
    });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      root.classList.remove("reveal-armed");
      root.querySelectorAll(".is-revealed").forEach((el) => el.classList.remove("is-revealed"));
    };
  }, [key]);
};
