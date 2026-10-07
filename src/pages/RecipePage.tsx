import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ChevronLeft, Clock, Lightbulb, Users } from "lucide-react";
import Seo from "@/components/Seo";
import { recipeGraph } from "@/lib/structured-data";
import RecipeCard from "@/components/RecipeCard";
import SectionHeading from "@/components/SectionHeading";
import BuyButton from "@/components/BuyButton";
import { useLang } from "@/i18n/LanguageContext";
import { accentHex, getRecipe, recipePhoto, recipes, recipeText } from "@/data/recipes";
import { getProduct } from "@/data/products";
import { site } from "@/data/site";

const RecipePage = () => {
  const { slug } = useParams();
  const { t, L, lang } = useLang();
  const recipe = getRecipe(slug);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!recipe) {
    return (
      <div className="container-luxe py-32 text-center">
        <Seo title={t("recipes.notFound")} description={t("recipes.notFound")} />
        <h1 className="font-display text-3xl text-navy-700">{t("recipes.notFound")}</h1>
        <Link to="/recipes/" className="btn-navy mt-8">
          {t("recipes.backToAll")}
        </Link>
      </div>
    );
  }

  const accent = accentHex[recipe.accent];
  const photo = recipePhoto(recipe);
  // The sauce chapter sells the free booklet; everything else sells the book.
  const product = getProduct(recipe.source === "sauces" ? "the-five-sauces" : "the-edible-codex")!;
  // The three recipes after this one, wrapping round the list. Taking the first
  // three for every page put the same three photographs under every recipe, and
  // Google showed recipes in search with a neighbour's picture. It also meant
  // only those three ever got a link from the rest of the site.
  // الوصفات الثلاث التالية بدل أول ثلاث دائماً — كانت صورها تظهر في جوجل
  // مكان صورة الوصفة نفسها.
  const text = recipeText(recipe, lang);
  const flow = lang === "ar" ? "rtl" : "ltr";
  const at = recipes.findIndex((r) => r.slug === recipe.slug);
  const related = [1, 2, 3].map((step) => recipes[(at + step) % recipes.length]);

  return (
    <>
      <Seo
        title={lang === "ar" ? `طريقة عمل ${L(recipe.title)}` : L(recipe.title)}
        description={`${L(recipe.subtitle)} · ${recipe.time} · ${t("seo.recipeSuffix")}`}
        image={photo ?? undefined}
        jsonLd={recipeGraph({
          trail: [
            { name: t("nav.home"), path: "/" },
            { name: t("nav.recipes"), path: "/recipes" },
            { name: L(recipe.title), path: `/recipes/${recipe.slug}` },
          ],
          name: L(recipe.title),
          description: L(recipe.subtitle),
          photo,
          lang,
          serves: recipe.serves,
          time: recipe.time,
          tags: recipe.tags,
          ingredients: text.ingredients,
          steps: text.steps,
        })}
      />

      <div className="border-b border-border bg-white">
        <div className="container-luxe flex items-center gap-2 py-4 text-[12px] text-muted-foreground">
          <Link to="/" className="hover:text-gold-600">
            {t("nav.home")}
          </Link>
          <ChevronLeft className="h-3.5 w-3.5 rotate-180 flip-rtl" />
          <Link to="/recipes/" className="hover:text-gold-600">
            {t("nav.recipes")}
          </Link>
          <ChevronLeft className="h-3.5 w-3.5 rotate-180 flip-rtl" />
          <span className="truncate text-navy-700">{L(recipe.title)}</span>
        </div>
      </div>

      {/* The plate */}
      <section className="relative overflow-hidden bg-navy-700">
        {photo ? (
          <img src={photo} alt={L(recipe.title)} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(circle at 50% 30%, ${accent} 0%, ${accent}AA 24%, transparent 60%)` }}
          />
        )}
        <div className="absolute inset-0 bg-ink/70" />
        <div className="container-luxe relative z-10 py-16 text-center md:py-20">
          <span className="eyebrow">
            {recipe.source === "sauces" ? t("recipes.sauceChapter") : `N° ${String(recipe.number).padStart(3, "0")}`}
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-3xl leading-tight text-ivory md:text-5xl text-balance">
            {L(recipe.title)}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ivory/75">{L(recipe.subtitle)}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[12px] uppercase tracking-[0.12em] text-ivory/70">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold" />
              {recipe.time}
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gold" />
              {recipe.serves}
            </span>
          </div>
        </div>
      </section>

      <section className="section container-luxe">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Ingredients */}
          <aside className="h-fit rounded-sm border border-gold/25 bg-ivory p-7 lg:sticky lg:top-28">
            <h2 className="text-[11px] font-semibold uppercase tracking-luxe text-gold">{t("recipes.ingredients")}</h2>
            <ul className="mt-5 space-y-3">
              {text.ingredients.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14px] leading-relaxed text-navy-800/85">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: accent }} />
                  <span dir={flow} className="text-start">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </aside>

          {/* Method */}
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-luxe text-gold">{t("recipes.method")}</h2>
            <ol className="mt-6 space-y-6">
              {text.steps.map((step, i) => (
                <li key={step} id={`step-${i + 1}`} className="flex gap-5">
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-sm font-display text-base text-ivory"
                    style={{ background: accent }}
                  >
                    {i + 1}
                  </span>
                  <p dir={flow} className="pt-1 text-start text-[15px] leading-relaxed text-navy-800/85">
                    {step}
                  </p>
                </li>
              ))}
            </ol>

            {text.tip && (
              <div className="mt-10 rounded-sm border-s-2 border-gold bg-ivory p-6">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-luxe text-gold">
                  <Lightbulb className="h-4 w-4" />
                  {t("recipes.tip")}
                </p>
                <p dir={flow} className="mt-3 text-start text-[14px] leading-relaxed text-navy-800/85">
                  {text.tip}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* The book this came from */}
      <section className="texture-navy section">
        <div className="container-luxe mx-auto max-w-3xl text-center">
          <span className="eyebrow">{t("recipes.fromBook")}</span>
          <h2 className="mt-5 font-display text-2xl text-ivory md:text-3xl">{L(product.title)}</h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-ivory/70">{L(product.subtitle)}</p>
          <div className="mt-8 flex justify-center">
            <BuyButton product={product} withPrice />
          </div>
        </div>
      </section>

      {/* More recipes */}
      <section className="section container-luxe">
        <SectionHeading eyebrow={t("recipes.eyebrow")} title={t("recipes.more")} />
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <RecipeCard key={item.slug} recipe={item} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/recipes/" className="btn-navy">
            {t("recipes.backToAll")}
            <ArrowRight className="h-4 w-4 flip-rtl" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default RecipePage;
