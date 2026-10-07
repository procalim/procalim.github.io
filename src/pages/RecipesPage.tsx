import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Seo from "@/components/Seo";
import RecipeCard from "@/components/RecipeCard";
import { localePath } from "@/i18n/locale-path";
import { useLang } from "@/i18n/LanguageContext";
import { recipes, recipeTags, recipeText } from "@/data/recipes";
import { brandImages, site } from "@/data/site";

const RecipesPage = () => {
  const { t, L, lang } = useLang();
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return recipes.filter((recipe) => {
      if (tag !== "all" && !recipe.tags.includes(tag)) return false;
      if (!term) return true;
      // Search titles, descriptions, tags and — usefully — the ingredients,
      // so "feta" or "بنجر" finds the dish that uses it.
      return [
        recipe.title.ar,
        recipe.title.en,
        recipe.subtitle.ar,
        recipe.subtitle.en,
        recipe.tags.join(" "),
        recipe.ingredients.join(" "),
        recipeText(recipe, "ar").ingredients.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [query, tag]);

  return (
    <>
      <Seo
        title={t("seo.recipes.title")}
        description={t("seo.recipes.desc")}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: t("recipes.title"),
          description: t("recipes.subtitle"),
          url: `${site.url}${localePath("/recipes/", lang)}`,
          hasPart: recipes.map((recipe) => ({
            "@type": "Recipe",
            name: L(recipe.title),
            url: `${site.url}${localePath(`/recipes/${recipe.slug}/`, lang)}`,
          })),
        }}
      />

      <section className="texture-navy relative overflow-hidden">
        <img
          src={brandImages.chefBeef}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-bottom opacity-20"
        />
        <div className="container-luxe relative z-10 py-16 text-center md:py-20">
          <span className="eyebrow">{t("recipes.eyebrow")}</span>
          <h1 className="mt-5 font-display text-4xl text-ivory md:text-5xl">{t("recipes.title")}</h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ivory/70">{t("recipes.subtitle")}</p>
        </div>
      </section>

      <section className="section container-luxe">
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground start-4" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("recipes.searchPlaceholder")}
              aria-label={t("recipes.searchPlaceholder")}
              className="field-luxe ps-11"
            />
          </div>

          {/* One scrolling line on a phone: twenty-seven wrapped buttons
              pushed the first recipe seven rows down the screen. Wide enough
              and they wrap as before.
              شريط أفقي على الهاتف بدل جدار من الأزرار يدفع الوصفات للأسفل. */}
          <div
            className="-mx-5 mt-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0 md:pb-0"
          >
            {["all", ...recipeTags].map((value) => {
              const active = tag === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTag(value)}
                  className={`shrink-0 snap-start rounded-sm border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
                    active
                      ? "border-gold bg-gold-gradient text-ink"
                      : "border-border text-navy-700 hover:border-gold hover:text-gold-600"
                  }`}
                >
                  {value === "all" ? t("shop.all") : value}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-10 text-center text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
          {visible.length} {visible.length === 1 ? t("recipes.one") : t("recipes.many")}
        </p>

        {visible.length > 0 ? (
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-sm border border-dashed border-gold/40 py-20 text-center">
            <p className="text-muted-foreground">{t("recipes.empty")}</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setTag("all");
              }}
              className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-600 underline underline-offset-4"
            >
              {t("shop.clear")}
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default RecipesPage;
