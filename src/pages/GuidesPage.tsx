import { ArrowRight } from "lucide-react";
import { Link } from "@/components/LocalLink";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { localePath } from "@/i18n/locale-path";
import { useLang } from "@/i18n/LanguageContext";
import { guides } from "@/data/guides";
import { getRecipe, recipePhoto } from "@/data/recipes";
import { site } from "@/data/site";

/** The index of the search guides. فهرس أدلة الطبخ. */
const GuidesPage = () => {
  const { t, L, lang } = useLang();
  const cover = (slug: string) => {
    const recipe = getRecipe(slug);
    return recipe ? recipePhoto(recipe) : null;
  };

  return (
    <>
      <Seo
        title={t("seo.guides.title")}
        description={t("seo.guides.desc")}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: t("seo.guides.title"),
          description: t("seo.guides.desc"),
          url: `${site.url}${localePath("/guides/", lang)}`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: guides.map((guide, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: L(guide.title),
              url: `${site.url}${localePath(`/guides/${guide.slug}/`, lang)}`,
            })),
          },
        }}
      />

      <PageHero
        eyebrow={t("guides.eyebrow")}
        title={t("guides.title")}
        subtitle={t("guides.subtitle")}
        image={cover(guides[0].cover) ?? undefined}
      />

      <section className="section container-luxe">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => {
            const photo = cover(guide.cover);
            return (
              <article key={guide.slug} className="card-luxe group flex h-full flex-col">
                <Link to={`/guides/${guide.slug}/`} className="flex h-full flex-col">
                  {photo && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-navy-700">
                      <img
                        src={photo}
                        alt={L(guide.title)}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">{L(guide.eyebrow)}</span>
                    <h2 className="mt-2 font-display text-xl leading-snug text-ivory">{L(guide.title)}</h2>
                    <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ivory/70">{L(guide.description)}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-gold">
                      {t("guides.read")}
                      <ArrowRight className="h-3.5 w-3.5 flip-rtl" />
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default GuidesPage;
