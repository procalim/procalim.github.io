import { pageUrl } from "@/lib/page-url";

/**
 * Breadcrumb markup for a page that already shows a breadcrumb trail.
 *
 * The trail was on screen but never described to Google, which shows it in
 * place of the bare URL in a result — "ediblecodex.com › الوصفات › كرينكل كيك"
 * reads as a place in a site rather than an address.
 * مسار التنقّل كان ظاهراً للزائر فقط؛ هذا يخبر جوجل به.
 */
export const breadcrumbList = (trail: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map((step, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: step.name,
    item: pageUrl(step.path),
  })),
});
