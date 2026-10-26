import type { Lang } from "@/i18n/dictionary";
import { recipes as bookRecipes, recipeText as bookText, type Recipe } from "./recipes";
import { extraRecipes, extraRecipesAr } from "./recipes.extra";

export { accentHex, recipePhoto, type Recipe } from "./recipes";

/**
 * Every published recipe: the 28 the home page's book turns through, then
 * the rest. The recipe pages, the index and the guides read from here; the
 * home page reads ./recipes alone, so it never downloads the others.
 * كل الوصفات المنشورة، لصفحات الوصفات والأدلة. الصفحة الرئيسية لا تحمّلها.
 */
export const recipes: Recipe[] = [...bookRecipes, ...extraRecipes];

export const getRecipe = (slug?: string) => recipes.find((r) => r.slug === slug);

/** Every tag in use, for the filter row. */
export const recipeTags = [...new Set(recipes.flatMap((r) => r.tags))].sort();

/** Ingredients, method and tip in the reader's language. */
export const recipeText = (recipe: Recipe, lang: Lang) =>
  (lang === "ar" && extraRecipesAr[recipe.slug]) || bookText(recipe, lang);
