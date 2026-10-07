import { Link } from "react-router-dom";
import { ArrowRight, Award, Eye, Ruler } from "lucide-react";
import Seo from "@/components/Seo";
import SectionHeading from "@/components/SectionHeading";
import TrustStrip from "@/components/TrustStrip";
import { useLang } from "@/i18n/LanguageContext";
import { brandImages, site } from "@/data/site";

const AboutPage = () => {
  const { t, lang } = useLang();

  const values = [
    { Icon: Ruler, title: t("about.v1.title"), body: t("about.v1.body") },
    { Icon: Eye, title: t("about.v2.title"), body: t("about.v2.body") },
    { Icon: Award, title: t("about.v3.title"), body: t("about.v3.body") },
  ];

  const numbers = [
    { value: "14+", label: t("about.numbers.years") },
    { value: "261", label: t("about.numbers.recipes") },
    { value: "37", label: t("about.numbers.countries") },
  ];

  return (
    <>
      <Seo title={t("seo.about.title")} description={t("seo.about.desc")} image={brandImages.chefPortrait} />

      {/* Hero */}
      <section className="texture-dark relative overflow-hidden">
        <div className="container-luxe relative z-10 grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="eyebrow eyebrow-start">{t("about.eyebrow")}</span>
            <h1 className="mt-6 font-display text-4xl leading-tight text-ivory md:text-[3.2rem] text-balance">
              {t("about.title")}
            </h1>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ivory/70 md:text-base">{t("about.lead")}</p>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-gold/20 pt-8">
              {numbers.map((item) => (
                <div key={item.label}>
                  <dt className="font-display text-3xl text-gold">{item.value}</dt>
                  <dd className="mt-1.5 text-[11px] uppercase leading-relaxed tracking-[0.1em] text-ivory/50">
                    {item.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-sm border border-gold/25" aria-hidden="true" />
            <img
              src={brandImages.chefPortrait}
              alt={lang === "ar" ? site.brand.chefAr : site.brand.chefEn}
              className="relative aspect-[4/5] w-full rounded-sm object-cover object-top shadow-luxe"
            />
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Story */}
      <section className="section container-luxe">
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-lg max-w-none text-navy-800/85 prose-p:leading-relaxed">
            <p className="font-display text-xl leading-relaxed text-navy-700">{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-3">
          {[brandImages.chefShrimp, brandImages.chefDuck, brandImages.chefBeef].map((image, i) => (
            <img
              key={image}
              src={image}
              alt=""
              loading="lazy"
              className={`aspect-[3/4] w-full rounded-sm object-cover shadow-luxe ${i === 1 ? "md:mt-10" : ""}`}
            />
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="texture-navy section">
        <div className="container-luxe">
          <SectionHeading eyebrow={t("about.eyebrow")} title={t("about.values.title")} tone="light" />

          <div className="grid gap-6 md:grid-cols-3">
            {values.map(({ Icon, title, body }) => (
              <div key={title} className="card-dark p-8">
                <span className="grid h-12 w-12 place-items-center rounded-sm bg-gold/10 text-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-display text-xl text-ivory">{title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ivory/65">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link to="/shop/the-edible-codex/" className="btn-gold">
              {t("about.cta")}
              <ArrowRight className="h-4 w-4 flip-rtl" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
