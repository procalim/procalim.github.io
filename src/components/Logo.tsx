import { Link } from "@/components/LocalLink";
import { useLang } from "@/i18n/LanguageContext";
import { brandImages, site } from "@/data/site";

/** Gold monogram + wordmark. `tone` picks the wordmark colour for light/dark bars. */
const Logo = ({ tone = "dark", compact = false }: { tone?: "dark" | "light"; compact?: boolean }) => {
  const { lang } = useLang();
  const wordmark = tone === "light" ? "text-ivory" : "text-navy-700";

  return (
    <Link to="/" className="group flex items-center gap-3" aria-label={site.brand.name}>
      <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-sm border border-gold/40 bg-navy-700">
        <img
          src={brandImages.logoCrest}
          alt=""
          aria-hidden="true"
          className="h-full w-full scale-[1.18] object-cover"
        />
      </span>

      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={`whitespace-nowrap font-display text-[15px] font-semibold tracking-tight sm:text-[17px] ${wordmark}`}>
            The <span className="gold-text">Edible</span> Codex
          </span>
          <span className="mt-1 hidden whitespace-nowrap text-[9px] font-sans font-medium uppercase tracking-luxe text-gold/80 sm:block">
            {lang === "ar" ? site.brand.taglineAr : site.brand.taglineEn}
          </span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
