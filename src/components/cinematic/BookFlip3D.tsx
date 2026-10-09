import { useCallback, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/components/LocalLink";
import BuyButton from "@/components/BuyButton";
import { useLang } from "@/i18n/LanguageContext";
import { getProduct } from "@/data/products";
import { bookPages, brandImages } from "@/data/site";
import { recipePhoto, recipes, recipeText, type Recipe } from "@/data/recipes";
import { clamp01, easeOut, prefersReducedMotion, useScrollProgress } from "@/hooks/use-scroll-progress";

/**
 * The book, in three dimensions, turned by the reader's own scroll.
 *
 * It arrives closed and tilted, swings round to face the reader, the cover
 * opens, and then every page turns in turn: on the left the plate, on the
 * right its recipe — eighteen of them, the ones published on the site —
 * before the last page invites the reader to the other 343.
 *
 * Built with CSS 3D transforms rather than WebGL: the pages stay real HTML
 * (sharp text, real images, nothing extra to download), and a phone turns
 * them as smoothly as a desktop. Each leaf is a two-faced card hinged on the
 * spine; its rotation is a pure function of the scroll position, so it can
 * be scrubbed forwards and back. The book opens left-to-right in English and
 * right-to-left in Arabic, as a printed book would.
 *
 * الكتاب ثلاثي الأبعاد: يصل مغلقاً ومائلاً، يستدير، يُفتح الغلاف، ثم تُقلَّب
 * الصفحات مع السحب — صورة الطبق يساراً ووصفته يميناً. يُفتح من اليمين
 * بالعربية ومن اليسار بالإنجليزية كأي كتاب مطبوع.
 */

type Face = { key: string; node: ReactNode };
type Leaf = { front: Face; back: Face; recipe?: Recipe };

/** Share of the scroll spent swinging the closed book round to face the reader. */
const INTRO = 0.07;
/** Share held at the end, so the last spread is not snatched away. */
const OUTRO = 0.05;
/** How much each page's turn overlaps the next one's — a riffle, not a queue. */
const OVERLAP = 0.35;

const paper = "#F4EFE4";

const PhotoPage = ({ recipe, load }: { recipe: Recipe; load: boolean }) => {
  const { L } = useLang();
  const photo = load ? recipePhoto(recipe) : null;
  return (
    <div className="relative h-full w-full bg-ink">
      {photo && (
        <img src={photo} alt={L(recipe.title)} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-[7%]">
        <p className="text-[0.62em] uppercase tracking-[0.2em] text-gold">
          N° {String(recipe.number).padStart(3, "0")}
        </p>
        <p className="mt-[0.3em] font-display text-[1.15em] leading-tight text-ivory">{L(recipe.title)}</p>
      </div>
    </div>
  );
};

const RecipePage = ({ recipe }: { recipe: Recipe }) => {
  const { L, lang, t } = useLang();
  const text = recipeText(recipe, lang);
  return (
    <div className="flex h-full w-full flex-col p-[8%] text-navy-800" style={{ background: paper }}>
      <p className="text-[0.55em] uppercase tracking-[0.2em] text-gold-600">
        The Edible Codex · N° {String(recipe.number).padStart(3, "0")}
      </p>
      <p className="mt-[0.4em] font-display text-[1.05em] leading-tight text-navy-700">{L(recipe.title)}</p>
      <p className="mt-[0.3em] text-[0.55em] uppercase tracking-[0.12em] text-navy-700/70">
        <bdi dir="ltr">{recipe.time}</bdi> · {t("flip.serves")} {recipe.serves}
      </p>
      <div className="my-[0.6em] h-px bg-gold/50" />
      <p className="text-[0.55em] font-semibold uppercase tracking-[0.16em] text-gold-600">{t("recipes.ingredients")}</p>
      <ul className="mt-[0.3em] space-y-[0.15em] text-[0.6em] leading-snug">
        {text.ingredients.slice(0, 6).map((item) => (
          <li key={item} className="line-clamp-1">
            · {item}
          </li>
        ))}
      </ul>
      <p className="mt-[0.6em] text-[0.55em] font-semibold uppercase tracking-[0.16em] text-gold-600">{t("recipes.method")}</p>
      <ol className="mt-[0.3em] min-h-0 flex-1 space-y-[0.2em] overflow-hidden text-[0.6em] leading-snug">
        {text.steps.slice(0, 4).map((step, i) => (
          <li key={step} className="line-clamp-2">
            <span className="text-gold-600">{i + 1}.</span> {step}
          </li>
        ))}
      </ol>
    </div>
  );
};

// The cover and its first pages load with the section, not on first sight:
// a page turned edge-on never "comes into view" for the lazy loader.
const ImagePage = ({ src, alt }: { src: string; alt: string }) => (
  <picture className="contents">
    <source type="image/webp" srcSet={src.replace(/\.jpe?g$/i, ".webp")} />
    <img src={src} alt={alt} decoding="async" className="h-full w-full bg-ink object-cover" />
  </picture>
);

const EndPage = () => {
  const { t } = useLang();
  return (
    <div className="texture-navy flex h-full w-full flex-col items-center justify-center p-[10%] text-center">
      <span className="font-poster text-[2.6em] leading-none text-gold">+343</span>
      <p className="mt-[0.5em] font-display text-[0.95em] leading-snug text-ivory">{t("flip.end.title")}</p>
      <p className="mt-[0.5em] text-[0.6em] leading-relaxed text-ivory/75">{t("flip.end.body")}</p>
    </div>
  );
};

const BookFlip3D = () => {
  const { t, L, lang } = useLang();
  const flagship = getProduct("the-edible-codex");
  const rtl = lang === "ar";
  const section = useRef<HTMLElement>(null);
  const book = useRef<HTMLDivElement>(null);
  const leafEls = useRef<(HTMLDivElement | null)[]>([]);
  const shades = useRef<(HTMLDivElement | null)[]>([]);
  const words = useRef<HTMLDivElement>(null);
  const farBoard = useRef<HTMLDivElement>(null);
  const reduced = useRef<boolean | null>(null);
  // How many leaves have turned — drives the caption and which photographs
  // are worth loading. It changes once per page, not once per frame.
  const [turned, setTurned] = useState(0);
  const turnedRef = useRef(0);
  /** Photographs load only for the pages within reach of the open spread. */
  const near = (leaf: number) => Math.abs(leaf - turned) <= 3;

  // Leaf 0 is the cover (the chef behind it), leaf 1 the contents (the first
  // plate behind it); after that each leaf carries one recipe's text on its
  // front and the next recipe's plate on its back, so every open spread reads
  // plate | recipe.
  const leaves: Leaf[] = [
    {
      front: { key: "cover", node: <ImagePage src={bookPages.cover} alt={t("featured.title")} /> },
      back: { key: "chef", node: <ImagePage src={bookPages.frontispiece} alt={t("reveal.page.chef")} /> },
    },
    {
      front: { key: "contents", node: <ImagePage src={bookPages.contents} alt={t("reveal.page.contents")} /> },
      back: { key: `photo-${recipes[0].slug}`, node: <PhotoPage recipe={recipes[0]} load={near(1)} /> },
    },
    ...recipes.map((recipe, i) => ({
      recipe,
      front: { key: `text-${recipe.slug}`, node: <RecipePage recipe={recipe} /> },
      back:
        i + 1 < recipes.length
          ? { key: `photo-${recipes[i + 1].slug}`, node: <PhotoPage recipe={recipes[i + 1]} load={near(i + 2)} /> }
          : { key: "end", node: <EndPage /> },
    })),
  ];
  const count = leaves.length;

  const render = useCallback(
    (progress: number) => {
      if (reduced.current === null) reduced.current = prefersReducedMotion();
      const still = reduced.current;
      const side = rtl ? 1 : -1; // which way a page swings over the spine

      // 1 · The closed book swings round to face the reader.
      const intro = easeOut(clamp01(progress / INTRO));
      // 2 · The pages turn, each starting a little before the last has landed.
      const turning = clamp01((progress - INTRO) / (1 - INTRO - OUTRO));
      const slot = 1 / (count - (count - 1) * OVERLAP);
      const flips = Array.from({ length: count }, (_, i) => {
        const start = i * slot * (1 - OVERLAP);
        return clamp01((turning - start) / slot);
      });

      // The closed book sits centred on its cover; once the cover opens, the
      // whole spread is centred on the spine.
      const opened = easeOut(flips[0]);
      const shift = (1 - opened) * 25 * side; // % of the two-page width

      // The board the pages land on exists only once the cover has opened.
      if (farBoard.current) farBoard.current.style.opacity = String(clamp01(flips[0] * 4));

      if (book.current) {
        const tiltX = still ? 0 : (1 - intro) * 28;
        const tiltY = still ? 0 : (1 - intro) * -34 * (rtl ? -1 : 1);
        const scale = still ? 1 : 0.82 + 0.18 * intro;
        book.current.style.transform = `translateX(${shift}%) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`;
      }

      flips.forEach((f, i) => {
        const el = leafEls.current[i];
        if (!el) return;
        const angle = easeInOut(f) * 180;
        // Stack depth: unturned pages pile up with the first on top; turned
        // ones pile on the other side with the latest on top. The sign flips
        // as the page passes upright, where the jump cannot be seen.
        const depth = angle < 90 ? (count - i) * 0.7 : -(i + 1) * 0.7;
        // A turning page lifts off the stack and curls a little.
        const lift = Math.sin((angle * Math.PI) / 180) * 30;
        el.style.transform = `rotateY(${angle * side}deg) translateZ(${depth + (angle < 90 ? lift : -lift)}px)`;
        const shade = shades.current[i];
        if (shade) shade.style.opacity = String(Math.sin((angle * Math.PI) / 180) * 0.45);
      });

      if (words.current) {
        const fade = 1 - clamp01((progress - INTRO * 0.6) / 0.06);
        words.current.style.opacity = String(Math.max(0.0, fade));
      }

      const nowTurned = flips.filter((f) => f > 0.5).length;
      if (nowTurned !== turnedRef.current) {
        turnedRef.current = nowTurned;
        setTurned(nowTurned);
      }
    },
    [rtl, count],
  );

  useScrollProgress(section, render);

  // The open spread shows recipe (turned − 2); past the last page, the offer.
  const current = turned >= count ? recipes.length : turned >= 2 ? turned - 2 : -1;
  const shown = current >= 0 && current < recipes.length ? recipes[current] : null;
  const pageStyle = {
    // One page: never wider than a little under half the screen, never
    // taller than the screen leaves room for, never larger than print size.
    "--pw": "min(44vw, calc((100svh - 300px) * 0.8), 380px)",
  } as CSSProperties;

  return (
    <section
      ref={section}
      className="texture-navy relative"
      style={{ height: `${count * 34 + 120}svh` }}
      aria-label={t("flip.eyebrow")}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-[86px]">
        {/* Headline over the closed book; it steps aside as the cover opens */}
        <div ref={words} className="container-luxe relative z-20 text-center">
          <span className="eyebrow">{t("flip.eyebrow")}</span>
          <h2 className="font-poster mt-2 text-[clamp(2.1rem,8.5vw,5rem)] uppercase leading-[0.95] text-ivory">
            {t("reveal.line1")} <span className="gold-text">{t("reveal.line2")}</span>
          </h2>
        </div>

        {/* The book */}
        <div className="relative flex flex-1 items-center justify-center" style={{ perspective: "1800px", ...pageStyle }}>
          <div
            ref={book}
            className="relative will-change-transform"
            style={{
              width: "calc(var(--pw) * 2)",
              height: "calc(var(--pw) * 1.25)",
              transformStyle: "preserve-3d",
              fontSize: "calc(var(--pw) / 13)",
            }}
          >
            {/* The boards: the back of the book, under every page */}
            <div
              className="absolute top-0 h-full w-1/2 rounded-sm bg-ink shadow-luxe ring-1 ring-gold/30"
              style={{ [rtl ? "right" : "left"]: "50%", transform: "translateZ(-1px)" }}
            >
              <img
                src={brandImages.logoCrest}
                alt=""
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 w-1/3 -translate-x-1/2 -translate-y-1/2 opacity-60"
              />
            </div>
            <div
              ref={farBoard}
              className="absolute top-0 h-full w-1/2 rounded-sm bg-ink shadow-luxe"
              style={{ [rtl ? "left" : "right"]: "50%", transform: "translateZ(-1px)", opacity: 0 }}
            />

            {leaves.map((leaf, i) => (
              <div
                key={leaf.front.key}
                ref={(el) => (leafEls.current[i] = el)}
                className="absolute top-0 h-full w-1/2"
                style={{
                  [rtl ? "right" : "left"]: "50%",
                  transformOrigin: rtl ? "right center" : "left center",
                  transformStyle: "preserve-3d",
                  transform: `translateZ(${(count - i) * 0.7}px)`,
                }}
              >
                <div
                  className="absolute inset-0 overflow-hidden rounded-sm"
                  style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                  {leaf.front.node}
                  {/* The spine's shadow on the page */}
                  <div
                    className="pointer-events-none absolute inset-y-0 w-[12%]"
                    style={{
                      [rtl ? "right" : "left"]: 0,
                      background: `linear-gradient(to ${rtl ? "left" : "right"}, rgba(0,0,0,0.28), transparent)`,
                    }}
                  />
                </div>
                <div
                  className="absolute inset-0 overflow-hidden rounded-sm"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {leaf.back.node}
                  <div
                    className="pointer-events-none absolute inset-y-0 w-[12%]"
                    style={{
                      [rtl ? "left" : "right"]: 0,
                      background: `linear-gradient(to ${rtl ? "right" : "left"}, rgba(0,0,0,0.28), transparent)`,
                    }}
                  />
                </div>
                {/* Light falling across a page as it turns */}
                <div
                  ref={(el) => (shades.current[i] = el)}
                  className="pointer-events-none absolute inset-0 rounded-sm bg-gradient-to-r from-black/0 via-black/40 to-black/0"
                  style={{ opacity: 0 }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* What is open right now, in readable type, with the way to it */}
        <div className="container-luxe relative z-20 flex min-h-[112px] flex-col items-center justify-center pb-5 text-center">
          {shown ? (
            <>
              <p className="text-[12px] uppercase tracking-[0.16em] text-gold/90">
                <span className="tabular-nums" dir="ltr">
                  {String(current + 1).padStart(2, "0")} / {recipes.length}
                </span>{" "}
                · {t("flip.counter")}
              </p>
              <p className="mt-1 font-display text-lg text-ivory">{L(shown.title)}</p>
              <Link
                to={`/recipes/${shown.slug}/`}
                className="mt-1 inline-flex min-h-[44px] items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-gold hover:text-ivory"
              >
                {t("reel.cta")}
                <ArrowRight className="h-3.5 w-3.5 flip-rtl" />
              </Link>
            </>
          ) : current >= recipes.length && flagship ? (
            <>
              <p className="text-[13px] text-ivory/80">{t("flip.end.body")}</p>
              <BuyButton product={flagship} withPrice className="mt-3" />
            </>
          ) : (
            <p className="text-[13px] text-ivory/75">{t("flip.hint")}</p>
          )}
        </div>
      </div>
    </section>
  );
};

/** Slow at the start and end of a turn, quick through the middle. */
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

export default BookFlip3D;
