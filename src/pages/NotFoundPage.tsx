import { Link } from "@/components/LocalLink";
import Seo from "@/components/Seo";
import { useLang } from "@/i18n/LanguageContext";

const NotFoundPage = () => {
  const { t } = useLang();

  return (
    <section className="texture-dark">
      <Seo title={t("nf.title")} description={t("nf.body")} />
      <div className="container-luxe flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <span className="font-poster text-[9rem] leading-none gold-text md:text-[12rem]">404</span>
        <h1 className="font-poster mt-6 text-[clamp(2rem,8vw,3.6rem)] uppercase leading-[0.95] text-ivory">{t("nf.title")}</h1>
        <p className="mt-3 text-[15px] text-ivory/75">{t("nf.body")}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="btn-gold">
            {t("nf.cta")}
          </Link>
          <Link to="/shop/" className="btn-outline-gold">
            {t("nav.shop")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
