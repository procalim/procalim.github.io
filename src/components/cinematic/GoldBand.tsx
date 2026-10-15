import { useLang } from "@/i18n/LanguageContext";

/**
 * A slow band of what the book holds, set big in the poster face between the
 * plates and the rest of the page. The motion stops for visitors who ask for
 * less of it.
 * شريط متحرك بأهم ما في الكتاب، يتوقف لمن يفضّل تقليل الحركة.
 */
const GoldBand = () => {
  const { t } = useLang();
  const items = [t("band.1"), t("band.2"), t("band.3"), t("band.4"), t("band.5")];

  return (
    <div className="relative overflow-hidden border-y border-gold/30 bg-gold-gradient py-4 md:py-5">
      <div className="flex w-max animate-marquee items-center whitespace-nowrap will-change-transform hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((pass) => (
          <div key={pass} className="flex items-center" aria-hidden={pass === 1}>
            {items.map((item) => (
              <span key={item} className="font-poster flex items-center text-2xl uppercase text-ink md:text-4xl">
                <span className="px-6 md:px-10">{item}</span>
                <span className="h-2 w-2 rotate-45 bg-ink/70" aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoldBand;
