import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowRight, Clock, Lightbulb } from "lucide-react";
import { Link } from "@/components/LocalLink";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import { guideGraph } from "@/lib/structured-data";
import { localePath } from "@/i18n/locale-path";
import { useLang } from "@/i18n/LanguageContext";
import { getGuide, guides } from "@/data/guides";
import { getRecipe, recipePhoto } from "@/data/recipe-library";
import NotFoundPage from "@/pages/NotFoundPage";

/**
 * One search guide: the chef's introduction, the recipes it gathers (each
 * linking to its full page), notes, questions, and the product it leads to.
 * دليل واحد: مقدّمة الشيف، الوصفات بروابطها، النصائح، الأسئلة، والمنتج.
 */
const GuidePage = () => {
  const { slug } = useParams();
  const { t, L, lang } = useLang();
  const guide = getGuide(slug);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!guide) return <NotFoundPage />;

  const coverRecipe = getRecipe(guide.cover);
  const cover = coverRecipe ? recipePhoto(coverRecipe) : null;
  const picks = guide.picks.flatMap((pick) => {
    const recipe = getRecipe(pick.recipe);
    return recipe ? [{ recipe, why: pick.why }] : [];
  });
  const sauces = guide.product === "the-five-sauces";
  const others = guides.filter((g) => g.slug !== guide.slug);

  return (
    <>
      <Seo
        title={L(guide.title)}
        description={L(guide.description)}
        image={cover ?? undefined}
        jsonLd={guideGraph({
          trail: [
            { name: t("nav.home"), path: localePath("/", lang) },
            { name: t("guides.nav"), path: localePath("/guides", lang) },
            { name: L(guide.title), path: localePath(`/guides/${guide.slug}`, lang) },
          ],
          name: L(guide.title),
          description: L(guide.description),
          image: cover,
          lang,
          items: picks.map(({ recipe }) => ({ name: L(recipe.title), path: localePath(`/recipes/${recipe.slug}`, lang) })),
          faq: guide.faq.map((item) => ({ q: L(item.q), a: L(item.a) })),
        })}
      />

      <PageHero eyebrow={L(guide.eyebrow)} title={L(guide.title)} image={cover ?? undefined} compact />

      <div className="border-b border-border bg-navy-700/60">
        <nav aria-label="breadcrumb" className="container-luxe flex flex-wrap items-center gap-2 py-4 text-[12px] text-muted-foreground">
          <Link to="/" className="hover:text-gold">{t("nav.home")}</Link>
          <span aria-hidden="true">/</span>
          <Link to="/guides/" className="hover:text-gold">{t("guides.nav")}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-ivory/80">{L(guide.eyebrow)}</span>
        </nav>
      </div>

      <article className="section container-luxe">
        <div className="mx-auto max-w-3xl space-y-5 text-[16px] leading-[1.9] text-ivory/85">
          {guide.intro.map((paragraph, i) => (
            <p key={i} className={i === 0 ? "font-display text-lg leading-relaxed text-ivory md:text-xl" : undefined}>
              {L(paragraph)}
            </p>
          ))}
        </div>

        <h2 className="mx-auto mt-16 max-w-3xl font-display text-3xl text-ivory">{t("guides.picks")}</h2>
        <ol className="mx-auto mt-8 max-w-3xl space-y-6">
          {picks.map(({ recipe, why }, i) => {
            const photo = recipePhoto(recipe);
            return (
              <li key={recipe.slug} className="card-luxe overflow-hidden">
                <Link to={`/recipes/${recipe.slug}/`} className="group grid sm:grid-cols-[200px_1fr]">
                  {photo && (
                    <div className="relative aspect-[4/3] overflow-hidden bg-navy-700 sm:aspect-auto">
                      <img
                        src={photo}
                        alt={L(recipe.title)}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5 md:p-6">
                    <span className="font-poster text-2xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-1 font-display text-xl leading-snug text-ivory">{L(recipe.title)}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ivory/75">{L(why)}</p>
                    <p className="mt-3 flex flex-wrap items-center gap-4 text-[12px] text-ivory/60">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span dir="ltr">{recipe.time}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.12em] text-gold">
                        {t("guides.recipe")}
                        <ArrowRight className="h-3.5 w-3.5 flip-rtl" />
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>

        <h2 className="mx-auto mt-16 max-w-3xl font-display text-3xl text-ivory">{t("guides.tips")}</h2>
        <div className="mx-auto mt-8 max-w-3xl space-y-8">
          {guide.tips.map((tip) => (
            <section key={tip.heading.en}>
              <h3 className="flex items-center gap-2 font-display text-xl text-gold">
                <Lightbulb className="h-5 w-5 shrink-0" />
                {L(tip.heading)}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.9] text-ivory/80">{L(tip.body)}</p>
            </section>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-sm border border-gold/40 bg-navy-700/60 p-7 text-center shadow-gold-glow md:p-10">
          <p className="font-display text-2xl text-ivory">{t(sauces ? "guides.cta.sauces.title" : "guides.cta.book.title")}</p>
          <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-ivory/75">
            {t(sauces ? "guides.cta.sauces.body" : "guides.cta.book.body")}
          </p>
          <Link to={`/shop/${guide.product}/`} className="btn-gold mt-6">
            {t(sauces ? "guides.cta.sauces.button" : "guides.cta.book.button")}
            <ArrowRight className="h-4 w-4 flip-rtl" />
          </Link>
        </div>

        <h2 className="mx-auto mt-16 max-w-3xl font-display text-3xl text-ivory">{t("guides.faq")}</h2>
        <div className="mx-auto mt-6 max-w-3xl divide-y divide-gold/15 border-y border-gold/15">
          {guide.faq.map((item) => (
            <details key={item.q.en} className="group py-5">
              <summary className="cursor-pointer list-none font-display text-lg text-ivory marker:hidden">{L(item.q)}</summary>
              <p className="mt-3 text-[15px] leading-relaxed text-ivory/75">{L(item.a)}</p>
            </details>
          ))}
        </div>

        <h2 className="mx-auto mt-16 max-w-3xl font-display text-2xl text-ivory">{t("guides.more")}</h2>
        <ul className="mx-auto mt-5 grid max-w-3xl gap-3 sm:grid-cols-2">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                to={`/guides/${other.slug}/`}
                className="flex min-h-[44px] items-center justify-between gap-3 rounded-sm border border-gold/20 px-4 py-3 text-[14px] text-ivory/85 transition-colors hover:border-gold hover:text-gold"
              >
                {L(other.title)}
                <ArrowRight className="h-4 w-4 shrink-0 flip-rtl" />
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
};

export default GuidePage;
