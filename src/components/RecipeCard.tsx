import { Link } from "@/components/LocalLink";
import { ArrowRight, Clock, Users } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { accentHex, recipePhoto, type Recipe } from "@/data/recipes";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const { t, L } = useLang();
  const accent = accentHex[recipe.accent];
  const photo = recipePhoto(recipe);

  return (
    <article className="card-luxe group flex h-full flex-col">
      <Link to={`/recipes/${recipe.slug}/`} className="block">
        {/* The plate: the recipe's sauce colour on the book's navy */}
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-navy-700">
          {photo ? (
            <img
              src={photo}
              alt={L(recipe.title)}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <>
              <div
                className="absolute inset-0 opacity-90 transition-transform duration-700 group-hover:scale-105"
                style={{
                  background: `radial-gradient(circle at 50% 42%, ${accent} 0%, ${accent}CC 28%, transparent 62%)`,
                }}
              />
              <span className="relative font-display text-5xl text-ivory/90 drop-shadow">
                {recipe.source === "sauces" ? "◍" : String(recipe.number).padStart(3, "0")}
              </span>
            </>
          )}
          <div className="pointer-events-none absolute inset-0 bg-ink-fade opacity-60" />
          <span className="absolute top-4 start-4 rounded-sm border border-gold/40 bg-ink/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-200">
            {recipe.source === "sauces" ? t("recipes.sauceChapter") : t("recipes.codexChapter")}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg leading-snug text-ivory">
          <Link to={`/recipes/${recipe.slug}/`} className="transition-colors hover:text-gold">
            {L(recipe.title)}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">{L(recipe.subtitle)}</p>

        <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gold" />
            {recipe.time}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-gold" />
            {recipe.serves}
          </span>
          <Link
            to={`/recipes/${recipe.slug}/`}
            className="ms-auto flex items-center gap-1 font-semibold text-gold hover:underline"
          >
            {t("recipes.read")}
            <ArrowRight className="h-3.5 w-3.5 flip-rtl" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;
