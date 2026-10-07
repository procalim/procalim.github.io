import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, NavLink } from "@/components/LocalLink";
import { Globe, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { useLang } from "@/i18n/LanguageContext";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/shop/", key: "nav.shop" },
  { to: "/recipes/", key: "nav.recipes" },
  { to: "/videos/", key: "videos.nav" },
  { to: "/about/", key: "nav.about" },
  { to: "/faq/", key: "nav.faq" },
  { to: "/contact/", key: "nav.contact" },
] as const;

const Navbar = () => {
  const { t, toggleLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? "border-gold/25 bg-ivory/95 shadow-sm backdrop-blur-md" : "border-transparent bg-ivory"
      }`}
    >
      <div className="container-luxe flex h-[74px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `relative py-1 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors after:absolute after:-bottom-0.5 after:start-0 after:h-px after:bg-gold after:transition-all after:duration-300 ${
                  isActive
                    ? "text-gold-600 after:w-full"
                    : "text-navy-700/80 after:w-0 hover:text-gold-600 hover:after:w-full"
                }`
              }
            >
              {t(link.key)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleLang}
            className="flex items-center gap-1.5 rounded-sm border border-navy/15 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-700 transition-colors hover:border-gold hover:text-gold-600"
          >
            <Globe className="h-3.5 w-3.5" />
            {t("nav.language")}
          </button>


          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("nav.close") : t("nav.menu")}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-sm text-navy-700 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-gold/20 bg-ivory transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="container-luxe flex flex-col py-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `border-b border-border/60 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] last:border-0 ${
                  isActive ? "text-gold-600" : "text-navy-700"
                }`
              }
            >
              {t(link.key)}
            </NavLink>
          ))}
          <Link to="/shop/" className="btn-gold mt-4 w-full">
            {t("hero.cta.primary")}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
