import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders its children only once the visitor is within reach of them.
 *
 * The home page is long and every section is heavy — pinned scenes, canvas
 * films, image reels. Building all of it while the page opens is what kept a
 * phone's main thread busy for most of a second. Below the opening scene,
 * each section now waits as an empty block of its own height until the
 * visitor scrolls within a couple of screens of it, then mounts and tells the
 * page-motion script that there is new content to reveal.
 *
 * يبني القسم فقط عند اقتراب الزائر منه، فتفتح الصفحة أسرع على الجوال.
 */
const Deferred = ({ children, height }: { children: ReactNode; height: string }) => {
  const box = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el || show) return;
    if (!("IntersectionObserver" in window)) {
      setShow(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { rootMargin: "200% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [show]);

  useEffect(() => {
    if (show) window.dispatchEvent(new Event("reveal:rescan"));
  }, [show]);

  return show ? <>{children}</> : <div ref={box} style={{ minHeight: height }} aria-hidden="true" />;
};

export default Deferred;
