import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { sendRating, useRecipeRating, type RecipeRating } from "@/lib/ratings";

const Stars = ({ value, size = "h-4 w-4" }: { value: number; size?: string }) => (
  <span className="flex items-center gap-0.5" aria-hidden="true">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star key={n} className={`${size} ${n <= Math.round(value) ? "fill-gold text-gold" : "text-ivory/30"}`} />
    ))}
  </span>
);

const countLabel = (rating: RecipeRating, t: (key: "rating.one" | "rating.count") => string) =>
  rating.count === 1 ? t("rating.one") : `${rating.count} ${t("rating.count")}`;

/**
 * The rating under a recipe's title, linking down to the box where it is
 * given. Shows nothing until someone has rated: no stars are ever invented.
 * التقييم تحت عنوان الوصفة، ولا يظهر قبل أن يقيّم أحد.
 */
export const RatingSummary = ({ slug }: { slug: string }) => {
  const { t } = useLang();
  const { rating } = useRecipeRating(slug);
  return (
    <a href="#rate" className="mt-5 inline-flex items-center gap-2 text-[13px] text-ivory/80 hover:text-gold">
      {rating ? (
        <>
          <Stars value={rating.average} />
          <span>
            <span className="font-semibold text-ivory">{rating.average.toFixed(1)}</span> · {countLabel(rating, t)}
          </span>
        </>
      ) : (
        <>
          <Stars value={0} />
          <span className="underline-offset-4 hover:underline">{t("rating.first")}</span>
        </>
      )}
    </a>
  );
};

/**
 * The box at the end of the method where a cook rates the recipe with one
 * tap. A link like ?rate=5 (from an email) only pre-selects the stars and
 * asks for the tap: mail scanners open every link, so a link alone must never
 * cast a vote.
 * مربع التقييم بنقرة واحدة. رابط ‎?rate=5‎ يحدّد النجوم فقط ولا يصوّت وحده.
 */
export const RateRecipe = ({ slug }: { slug: string }) => {
  const { t } = useLang();
  const { rating, yours } = useRecipeRating(slug);
  const [hover, setHover] = useState(0);
  const [suggested, setSuggested] = useState(0);
  const [state, setState] = useState<"idle" | "saving" | "done" | "error">("idle");
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wanted = Number(new URLSearchParams(window.location.search).get("rate"));
    if (!(wanted >= 1 && wanted <= 5)) return;
    setSuggested(wanted);
    // After the page's own scroll-to-top, which runs once this has mounted.
    // بعد رجوع الصفحة لأعلاها عند الفتح.
    const timer = window.setTimeout(() => box.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 400);
    return () => window.clearTimeout(timer);
  }, [slug]);

  const vote = async (stars: number) => {
    setState("saving");
    try {
      await sendRating(slug, stars);
      setSuggested(0);
      setState("done");
    } catch {
      setState("error");
    }
  };

  const shown = hover || (state === "saving" ? 0 : yours) || suggested;
  const message =
    state === "error"
      ? t("rating.error")
      : state === "done"
        ? t("rating.thanks")
        : yours
          ? `${t("rating.yours")}: ${yours}/5 — ${t("rating.change")}`
          : suggested
            ? t("rating.confirm")
            : t("rating.prompt");

  return (
    <div
      id="rate"
      ref={box}
      className={`mt-10 scroll-mt-28 rounded-sm border bg-ink p-6 text-center ${suggested ? "border-gold" : "border-gold/25"}`}
    >
      <p className="font-display text-xl text-ivory">{t("rating.title")}</p>
      <div className="mt-4 flex justify-center gap-1.5" dir="ltr" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            disabled={state === "saving"}
            onMouseEnter={() => setHover(n)}
            onFocus={() => setHover(n)}
            onBlur={() => setHover(0)}
            onClick={() => vote(n)}
            aria-label={`${n} ${t("rating.of")}`}
            aria-pressed={yours === n}
            className="rounded-sm p-1 transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-60"
          >
            <Star className={`h-9 w-9 ${n <= shown ? "fill-gold text-gold" : "text-ivory/35"}`} />
          </button>
        ))}
      </div>
      <p className={`mt-3 text-[13px] ${state === "error" ? "text-red-400" : "text-ivory/70"}`} role="status">
        {message}
      </p>
      {rating && (
        <p className="mt-2 flex items-center justify-center gap-2 text-[12px] text-ivory/60">
          <Stars value={rating.average} size="h-3.5 w-3.5" />
          {rating.average.toFixed(1)} · {countLabel(rating, t)}
        </p>
      )}
    </div>
  );
};
