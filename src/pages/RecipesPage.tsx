import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Seo from "@/components/Seo";
import RecipeCard from "@/components/RecipeCard";
import { localePath } from "@/i18n/locale-path";
import { useLang } from "@/i18n/LanguageContext";
import { recipes, recipeTags, recipeText } from "@/data/recipes";
import { brandImages, site } from "@/data/site";
import PageHero from "@/components/PageHero";

const RecipesPage = () => {
  const { t, lang } = useLang();
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
          // A list of links, not thirteen Recipes: each "Recipe" here carried
          // only a name and a URL, and Google validated every one as a full
          // recipe — "Missing field image" (critical), ingredients,
          // instructions… The recipes are described in full on their own
          // pages; this page only points at them, the way Google's summary-page
          // markup asks.
          // قائمة روابط لا وصفات: كل "Recipe" هنا كان بلا صورة ولا مكوّنات،
          // فاعتبرها جوجل وصفات ناقصة وأبلغ عن أخطاء.
          mainEntity: {
            "@type": "ItemList",
            itemListElement: recipes.map((recipe, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${site.url}${localePath(`/recipes/${recipe.slug}/`, lang)}`,
            })),
          },
        }}
      />

      <PageHero
        eyebrow={t("recipes.eyebrow")}
        title={t("recipes.title")}
        subtitle={t("recipes.subtitle")}
        image={brandImages.chefBeef}
        focus="center 72%"
      />

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
                      : "border-border text-ivory hover:border-gold hover:text-gold"
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
              className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-gold underline underline-offset-4"
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
