/**
 * The product a buyer last opened the checkout for, kept for this tab only.
 * The return page reads `?product=` first; this covers a redirect that comes
 * back without it. Storage can be unavailable (private mode, blocked site
 * data), so every access is guarded and a miss is simply "unknown".
 * آخر منتج فُتح له الدفع في هذه النافذة، احتياطاً إن عاد الرابط بدونه.
 */
const KEY = "edible-codex:last-checkout";

export const rememberCheckout = (slug: string) => {
  try {
    sessionStorage.setItem(KEY, slug);
  } catch {
    /* storage unavailable — the query parameter still carries it */
  }
};

export const lastCheckout = (): string | null => {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
};
