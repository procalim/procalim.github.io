import { useParams } from "react-router-dom";
import { Link } from "@/components/LocalLink";
import Seo from "@/components/Seo";
import { useLang } from "@/i18n/LanguageContext";
import { getPolicy } from "@/data/policies";

const PolicyPage = () => {
  const { slug } = useParams();
  const { t, L, lang } = useLang();
  const policy = getPolicy(slug);

  if (!policy) {
    return (
      <div className="container-luxe py-32 text-center">
        <h1 className="font-display text-3xl text-navy-700">{t("nf.title")}</h1>
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

      <section className="texture-navy">
        <div className="container-luxe py-14 text-center md:py-16">
          <h1 className="font-display text-3xl text-ivory md:text-4xl">{L(policy.title)}</h1>
          <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-gold/80">
            {t("legal.updated")}: {updated}
          </p>
        </div>
      </section>

      <section className="section container-luxe">
        <div className="mx-auto max-w-3xl space-y-10">
          {policy.sections.map((section) => (
            <article key={L(section.heading)}>
              <h2 className="font-display text-xl text-navy-700">{L(section.heading)}</h2>
              <div className="mt-3 gold-rule" />
              <p className="mt-4 text-[15px] leading-relaxed text-navy-800/80">{L(section.body)}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default PolicyPage;
