import { useLang } from "@/i18n/LanguageContext";

/** Thin gold marquee above the header — the classic premium-store signal. */
const AnnouncementBar = () => {
  const { t } = useLang();
  const messages = [t("announce.1"), t("announce.2"), t("announce.3")];

  return (
    <div className="relative overflow-hidden bg-ink py-2.5">
      {/* The first thing a keyboard reaches: a way past the header */}
      <a href="#main" className="skip-link">
        {t("nav.skip")}
      </a>
      <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap will-change-transform hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((pass) => (
          <div key={pass} className="flex items-center gap-12" aria-hidden={pass === 1}>
            {messages.map((message) => (
              <span
                key={message}
                className="flex items-center gap-12 text-[11px] font-medium uppercase tracking-[0.2em] text-gold-200"
              >
                {message}
                <span className="h-1 w-1 rotate-45 bg-gold/60" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
