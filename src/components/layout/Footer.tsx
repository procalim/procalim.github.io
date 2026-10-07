import { useState } from "react";
import { Link } from "@/components/LocalLink";
import { Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { site } from "@/data/site";

const PaymentMark = ({ label }: { label: string }) => (
  <span className="grid h-8 min-w-[48px] place-items-center rounded-sm border border-gold/25 bg-white/5 px-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-ivory/70">
    {label}
  </span>
);

const Footer = () => {
  const { t, lang } = useLang();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const explore = [
    { to: "/shop/", key: "nav.shop" as const },
    { to: "/recipes/", key: "nav.recipes" as const },
    { to: "/videos/", key: "videos.nav" as const },
    { to: "/about/", key: "nav.about" as const },
    { to: "/contact/", key: "nav.contact" as const },
  ];
  const help = [
    { to: "/faq/", key: "faq.eyebrow" as const },
    { to: "/policies/refund/", key: "legal.refund" as const },
    { to: "/contact/", key: "nav.contact" as const },
  ];

  const payments = ["Apple Pay", "Google Pay", "Visa", "MC", "Amex", "PayPal"];
  const legal = [
    { to: "/policies/privacy/", key: "legal.privacy" as const },
    { to: "/policies/terms/", key: "legal.terms" as const },
    { to: "/policies/refund/", key: "legal.refund" as const },
  ];

  return (
    <footer className="texture-navy text-ivory">
      {/* Newsletter band */}
      <div className="border-b border-gold/15">
        <div className="container-luxe grid gap-8 py-14 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow eyebrow-start">{site.brand.taglineEn}</span>
            <h3 className="mt-4 font-display text-2xl text-ivory md:text-3xl">{t("news.title")}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/65">{t("news.body")}</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
              setEmail("");
            }}
            className="lg:justify-self-end lg:w-full lg:max-w-md"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("news.placeholder")}
                aria-label={t("news.placeholder")}
                className="w-full rounded-sm border border-gold/30 bg-ink/40 px-4 py-3.5 text-sm text-ivory outline-none transition-colors placeholder:text-ivory/40 focus:border-gold"
              />
              <button type="submit" className="btn-gold shrink-0">
                <Send className="h-4 w-4 flip-rtl" />
                {t("news.cta")}
              </button>
            </div>
            <p className="mt-3 text-[11px] text-ivory/45">{done ? t("news.success") : t("news.privacy")}</p>
          </form>
        </div>
      </div>

      {/* Link columns */}
      <div className="container-luxe grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h4 className="font-display text-xl">
            The <span className="gold-text">Edible</span> Codex
          </h4>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/60">{t("footer.about")}</p>

          <ul className="mt-6 space-y-2.5 text-sm text-ivory/70">
            {site.contact.email && (
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-gold" />
                <a href={`mailto:${site.contact.email}`} className="hover:text-gold">
                  {site.contact.email}
                </a>
              </li>
            )}
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-gold" />
              <span dir="ltr">{site.contact.phoneDisplay}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-gold" />
              {lang === "ar" ? site.contact.cityAr : site.contact.cityEn}
            </li>
          </ul>
        </div>

        {[
          { title: t("footer.explore"), items: explore },
          { title: t("footer.help"), items: help },
          { title: t("footer.legal"), items: legal },
        ].map((col) => (
          <div key={col.title}>
            <h5 className="text-[11px] font-semibold uppercase tracking-luxe text-gold">{col.title}</h5>
            <ul className="mt-5 space-y-3">
              {col.items.map((item) => (
                <li key={`${col.title}-${item.to}-${item.key}`}>
                  <Link to={item.to} className="text-sm text-ivory/65 transition-colors hover:text-gold">
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/15">
        <div className="container-luxe flex flex-col items-center justify-between gap-6 py-7 md:flex-row">
          <p className="text-[12px] text-ivory/50">
            © {new Date().getFullYear()} {lang === "ar" ? site.brand.nameAr : site.brand.name} · {t("footer.rights")}
          </p>

          <div className="flex items-center gap-2" title={t("footer.payments")}>
            {payments.map((p) => (
              <PaymentMark key={p} label={p} />
            ))}
          </div>

          <div className="flex items-center gap-3">
            {[{ href: site.social.instagram, Icon: Instagram, label: "Instagram" }].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-sm border border-gold/25 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
