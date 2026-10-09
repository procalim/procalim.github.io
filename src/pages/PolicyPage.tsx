import { useParams } from "react-router-dom";
import { Link } from "@/components/LocalLink";
import Seo from "@/components/Seo";
import { useLang } from "@/i18n/LanguageContext";
import { getPolicy } from "@/data/policies";
import PageHero from "@/components/PageHero";

const PolicyPage = () => {
  const { slug } = useParams();
  const { t, L, lang } = useLang();
  const policy = getPolicy(slug);

  if (!policy) {
    return (
      <div className="container-luxe py-32 text-center">
        <h1 className="font-display text-3xl text-ivory">{t("nf.title")}</h1>
        <Link to="/" className="btn-navy mt-8">
          {t("nf.cta")}
        </Link>
      </div>
    );
  }

  const updated = new Intl.DateTimeFormat(lang === "ar" ? "ar-SA" : "en-GB", {
    dateStyle: "long",
  }).format(new Date(policy.updated));

  return (
    <>
      <Seo title={L(policy.title)} description={L(policy.sections[0].body)} />

      <PageHero eyebrow={t("legal.eyebrow")} title={L(policy.title)}>
        <p className="hero-fade mt-4 text-[12px] uppercase tracking-[0.14em] text-gold/85">
          {t("legal.updated")}: {updated}
        </p>
      </PageHero>

      <section className="section container-luxe">
        <div className="mx-auto max-w-3xl space-y-10">
          {policy.sections.map((section) => (
            <article key={L(section.heading)}>
              <h2 className="font-display text-xl text-ivory">{L(section.heading)}</h2>
              <div className="mt-3 gold-rule" />
              <p className="mt-4 text-[15px] leading-relaxed text-ivory/80">{L(section.body)}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default PolicyPage;
