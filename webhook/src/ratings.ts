/**
 * Recipe star ratings · تقييمات الوصفات بالنجوم
 *
 * Served on the site's own domain (ediblecodex.com/api/ratings) through a
 * Worker route, so the pages call it without CORS and without knowing the
 * Worker's own address.
 *
 *   GET  /api/ratings   → { "<slug>": { "count": 3, "average": 4.7 }, … }
 *   POST /api/ratings   { "recipe": "<slug>", "stars": 1–5 }
 *
 * One vote per visitor per recipe: a visitor who rates again replaces their
 * earlier stars instead of adding a second vote. A visitor is the SHA-256 of
 * their IP address with the recipe, so no address is stored. Every number
 * here comes from someone pressing a star on the site — nothing is seeded.
 * كل تقييم من زائر حقيقي ضغط نجمة، وصوت واحد لكل زائر لكل وصفة.
 */

type Tally = { count: number; sum: number };
type Tallies = Record<string, Tally>;

export interface RatingsEnv {
  ORDERS: KVNamespace;
}

const SITE_ORIGIN = "https://ediblecodex.com";
const TALLIES = "ratings:tallies";
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+){0,9}$/;
/** More slugs than the site will ever have; junk cannot grow the store past it. */
const MAX_RECIPES = 300;
/** Votes one visitor can cast in a day, across all recipes. */
const DAILY_LIMIT = 30;
const YEAR = 365 * 24 * 60 * 60;

const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store", ...extra },
  });

const sha256 = async (text: string) => {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
};

const summary = (tallies: Tallies) =>
  Object.fromEntries(
    Object.entries(tallies)
      .filter(([, t]) => t.count > 0)
      .map(([slug, t]) => [slug, { count: t.count, average: Math.round((t.sum / t.count) * 10) / 10 }]),
  );

const readTallies = async (env: RatingsEnv) => (await env.ORDERS.get<Tallies>(TALLIES, "json")) ?? {};

export const handleRatings = async (request: Request, env: RatingsEnv): Promise<Response> => {
  if (request.method === "GET") {
    // A minute of browser and edge caching keeps a busy page to one read.
    return json(summary(await readTallies(env)), 200, { "cache-control": "public, max-age=60" });
  }
  if (request.method !== "POST") return json({ error: "method" }, 405);

  // Only the site's own pages vote. A browser always sends Origin on a POST.
  const origin = request.headers.get("origin");
  if (origin !== SITE_ORIGIN && origin !== SITE_ORIGIN.replace("https://", "https://www.")) {
    return json({ error: "origin" }, 403);
  }

  let body: { recipe?: unknown; stars?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: "body" }, 400);
  }
  const recipe = typeof body.recipe === "string" ? body.recipe : "";
  const stars = Number(body.stars);
  if (!SLUG.test(recipe) || !Number.isInteger(stars) || stars < 1 || stars > 5) {
    return json({ error: "invalid" }, 400);
  }

  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const visitor = await sha256(`edible-codex-ratings:${ip}`);
  const today = new Date().toISOString().slice(0, 10);
  const dayKey = `ratings:day:${today}:${visitor}`;
  const usedToday = Number((await env.ORDERS.get(dayKey)) ?? 0);
  if (usedToday >= DAILY_LIMIT) return json({ error: "limit" }, 429);

  const tallies = await readTallies(env);
  if (!tallies[recipe] && Object.keys(tallies).length >= MAX_RECIPES) return json({ error: "invalid" }, 400);
  const tally = tallies[recipe] ?? { count: 0, sum: 0 };

  const voteKey = `ratings:vote:${recipe}:${await sha256(`${recipe}:${visitor}`)}`;
  const earlier = Number((await env.ORDERS.get(voteKey)) ?? 0);
  if (earlier >= 1 && earlier <= 5) {
    tally.sum += stars - earlier;
  } else {
    tally.count += 1;
    tally.sum += stars;
  }
  tallies[recipe] = tally;

  await env.ORDERS.put(TALLIES, JSON.stringify(tallies));
  await env.ORDERS.put(voteKey, String(stars), { expirationTtl: YEAR });
  await env.ORDERS.put(dayKey, String(usedToday + 1), { expirationTtl: 2 * 24 * 60 * 60 });

  return json({ recipe, yours: stars, ...summary({ [recipe]: tally })[recipe] });
};
