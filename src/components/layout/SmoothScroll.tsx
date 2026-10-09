import { useEffect } from "react";
import Lenis from "lenis";
import { prefersReducedMotion } from "@/hooks/use-scroll-progress";

/**
 * Weighted, eased scrolling for mouse wheels and trackpads — the glide that
 * makes the pinned scenes feel like film rather than steps. Phones keep their
 * own native scrolling (it is already smooth, and hijacking it breaks the
 * feel of the finger), and visitors who ask for less motion get none of it.
 *
 * تمرير ناعم بعجلة الفأرة. الجوال يبقى على تمريره الطبيعي.
 */
const SmoothScroll = () => {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
