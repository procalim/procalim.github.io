import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "@/hooks/use-scroll-progress";

/**
 * Fades the `[data-reveal]` elements inside `root` up into place as they
 * reach the screen. Nothing is hidden until this runs, so the prerendered
 * page and visitors without JavaScript see everything; visitors who ask for
 * less motion are never armed at all. A `data-reveal="2"` waits two steps
 * (60ms each) — how a row of cards staggers in.
 *
 * يُظهر العناصر تدريجياً عند وصولها للشاشة. لا يُخفى شيء قبل تشغيله، ولا
 * يعمل لمن يفضّل تقليل الحركة.
 */
export const useReveal = (root: RefObject<HTMLElement>) => {
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return;

    const targets = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal]"));
    targets.forEach((target) => {
      const step = Number(target.dataset.reveal) || 0;
      target.style.setProperty("--reveal-delay", `${step * 60}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));
    el.classList.add("reveal-armed");
    return () => {
      observer.disconnect();
      el.classList.remove("reveal-armed");
    };
  }, [root]);
};
