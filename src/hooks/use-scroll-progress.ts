import { useEffect, useRef, type RefObject } from "react";

/**
 * Reports how far the visitor has scrolled through a tall section, from 0
 * (its top has reached the top of the screen) to 1 (its bottom has reached
 * the bottom of the screen) — the clock the pinned, scroll-driven scenes run
 * on.
 *
 * The callback writes styles straight onto elements rather than setting
 * state: one React render per scroll frame would stutter on a phone.
 * Frames are coalesced through requestAnimationFrame, and nothing runs while
 * the section is off screen.
 *
 * يقيس تقدّم السحب داخل قسم طويل (من ٠ إلى ١) لتتحرك المشاهد معه،
 * ويكتب الأنماط مباشرة دون إعادة رسم React في كل إطار.
 */
export const useScrollProgress = (
  ref: RefObject<HTMLElement>,
  onProgress: (progress: number) => void,
) => {
  const callback = useRef(onProgress);
  callback.current = onProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let visible = true;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const progress = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
      callback.current(progress);
    };

    const schedule = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    });
    observer.observe(el);

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
};

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/** Fast start, soft landing — how a plate is set down. */
export const easeOut = (value: number) => 1 - Math.pow(1 - clamp01(value), 3);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
