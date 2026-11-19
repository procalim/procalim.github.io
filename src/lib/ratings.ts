import { useEffect, useState } from "react";

/**
 * Visitors' star ratings for the recipes, served from the site's own domain
 * by the Cloudflare Worker (webhook/src/ratings.ts). One request loads every
 * recipe's rating; a vote updates the shared copy so every star on the page
 * moves together.
 * تقييمات الزوار للوصفات، من عامل Cloudflare على نطاق الموقع نفسه.
 */
export type RecipeRating = { count: number; average: number };

const ENDPOINT = "/api/ratings";
const listeners = new Set<() => void>();
let all: Record<string, RecipeRating> = {};
let loading: Promise<void> | null = null;

const notify = () => listeners.forEach((listener) => listener());

const load = () =>
  (loading ??= fetch(ENDPOINT)
    .then((response) => (response.ok ? response.json() : {}))
    .then((data: Record<string, RecipeRating>) => {
      all = data && typeof data === "object" ? data : {};
      notify();
    })
    .catch(() => undefined));

/** The stars this browser gave a recipe, kept so a returning cook sees them. */
const remembered = (slug: string) => {
  try {
    const stars = Number(localStorage.getItem(`ec-rated:${slug}`));
    return stars >= 1 && stars <= 5 ? stars : 0;
  } catch {
    return 0;
  }
};

export const sendRating = async (slug: string, stars: number) => {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ recipe: slug, stars }),
  });
  if (!response.ok) throw new Error(`rating ${response.status}`);
  const data = (await response.json()) as RecipeRating & { yours: number };
  all = { ...all, [slug]: { count: data.count, average: data.average } };
  try {
    localStorage.setItem(`ec-rated:${slug}`, String(stars));
  } catch {
    /* private mode: the vote still counted */
  }
  notify();
  return data;
};

/** This recipe's rating (null until someone rates) and this visitor's stars. */
export const useRecipeRating = (slug: string) => {
  const [, redraw] = useState(0);
  useEffect(() => {
    const listener = () => redraw((n) => n + 1);
    listeners.add(listener);
    load();
    return () => {
      listeners.delete(listener);
    };
  }, []);
  const rating = all[slug];
  return { rating: rating && rating.count > 0 ? rating : null, yours: remembered(slug) };
};
