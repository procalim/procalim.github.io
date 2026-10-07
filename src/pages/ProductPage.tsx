import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "@/components/LocalLink";
import { ChevronLeft, Check, Download, RotateCcw, ShieldCheck, Star } from "lucide-react";
import Seo from "@/components/Seo";
import { localePath } from "@/i18n/locale-path";
import { productGraph } from "@/lib/structured-data";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatPrice, useLang } from "@/i18n/LanguageContext";
import BuyButton from "@/components/BuyButton";
import { faqs, getProduct, products } from "@/data/products";
import { checkoutUrlFor, site } from "@/data/site";

/** Tailwind needs the whole class name in the source, so they are spelled out. */
const THUMB_COLS: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-3 sm:grid-cols-6",
};

const ProductPage = () => {
  const { slug } = useParams();
  const { t, L, lang } = useLang();
  const product = getProduct(slug);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!product) {
    return (
      <div className="container-luxe py-32 text-center">
        <Seo title={t("product.notFound")} description={t("product.notFound")} />
        <h1 className="font-display text-3xl text-navy-700">{t("product.notFound")}</h1>
        <Link to="/shop/" className="btn-navy mt-8">
          {t("product.backToShop")}
        </Link>
      </div>
    );
  }

  const savePct = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;

  const whopUrl = checkoutUrlFor(product);
  const onWhop = Boolean(whopUrl);
  const isFree = product.price === 0;
  const related = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <Seo
        title={L(product.title)}
        description={`${L(product.subtitle)} · ${t("seo.productSuffix")}`}
        image={product.image}
        jsonLd={productGraph({
          trail: [
            { name: t("nav.home"), path: localePath("/", lang) },
            { name: t("nav.shop"), path: localePath("/shop", lang) },
            { name: L(product.title), path: localePath(`/shop/${product.slug}`, lang) },
          ],
          name: L(product.title),
          description: L(product.description),
          image: product.image,
          slug: product.slug,
          price: product.price,
        })}
      />

      <div className="border-b border-border bg-white">
        <div className="container-luxe flex items-center gap-2 py-4 text-[12px] text-muted-foreground">
          <Link to="/" className="hover:text-gold-600">
            {t("nav.home")}
          </Link>
          <ChevronLeft className="h-3.5 w-3.5 rotate-180 flip-rtl" />
          <Link to="/shop/" className="hover:text-gold-600">
            {t("nav.shop")}
          </Link>
          <ChevronLeft className="h-3.5 w-3.5 rotate-180 flip-rtl" />
          <span className="truncate text-navy-700">{L(product.title)}</span>
        </div>
      </div>

      <section className="section container-luxe">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-sm border border-gold/20 bg-navy-800">
              <img
                src={product.gallery[active]}
                alt={L(product.title)}
                style={{ objectPosition: product.focus ?? "center" }}
                className="aspect-[4/5] w-full object-cover"
                fetchPriority="high"
              />
              {savePct > 0 && (
                <span className="absolute top-5 start-5 rounded-sm bg-gold-gradient px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
                  {t("product.save")} {savePct}%
                </span>
              )}
            </div>

            {product.gallery.length > 1 && (
              <div className={`mt-4 grid gap-3 ${THUMB_COLS[product.gallery.length] ?? "grid-cols-4"}`}>
                {product.gallery.map((image, i) => (
                  <button
                    key={image + i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`${L(product.title)} ${i + 1}`}
                    className={`overflow-hidden rounded-sm border transition-all duration-300 ${
                      active === i ? "border-gold ring-1 ring-gold" : "border-border hover:border-gold/50"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      loading="lazy"
                      style={{ objectPosition: product.focus ?? "center" }}
                      className="aspect-square w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Buy box */}
          <div>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-gold text-gold" : "text-border"}`}
                />
              ))}
              <span className="ms-1 text-[12px] text-muted-foreground">
                {product.rating} · {product.reviews} {t("reviews.count")}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl leading-tight text-navy-700 md:text-[2.5rem]">
              {L(product.title)}
            </h1>
            <p className="mt-3 text-[15px] text-gold-600">{L(product.subtitle)}</p>

            <div className="mt-6 flex items-baseline gap-4">
              <span className={`font-display text-4xl ${isFree ? "text-gold-600" : "text-navy-700"}`}>
                {isFree ? t("product.free") : formatPrice(product.price, lang, site.currency.symbol)}
              </span>
              {product.compareAt && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.compareAt, lang, site.currency.symbol)}
                </span>
              )}
            </div>

            <p className="mt-6 text-[15px] leading-relaxed text-navy-800/80">{L(product.description)}</p>

            <div className="my-8 gold-rule" />

            {/* One button, straight to checkout — no forms, no cart. */}
            <BuyButton product={product} withPrice className="w-full text-base" />

            {onWhop ? (
              <div className="mt-4 rounded-sm border border-gold/25 bg-ivory px-5 py-4 text-center">
                <p className="flex items-center justify-center gap-2 text-[12px] text-navy-700">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-gold" />
                  {t("product.whopNote")}
                </p>
                <p className="mt-1.5 text-[12px] font-semibold text-gold-600">{t("product.whopBy")}</p>
                <p className="mt-2 text-[11px] text-muted-foreground">{t("product.whopTrust")}</p>

                <div className="mt-4 border-t border-gold/20 pt-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {t("product.methods")}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
                    {["Apple Pay", "Google Pay", "Visa", "Mastercard", "Amex", "PayPal"].map((method) => (
                      <span
                        key={method}
                        className="rounded-sm border border-border bg-white px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.06em] text-navy-700"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-4 flex items-center justify-center gap-2 text-[12px] text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-gold" />
                {t("product.secure")}
              </p>
            )}

            {/* Included */}
            <div className="mt-9 rounded-sm border border-gold/25 bg-ivory p-7">
              <h2 className="text-[11px] font-semibold uppercase tracking-luxe text-gold">{t("product.includes")}</h2>
              <ul className="mt-5 space-y-3">
                {product.features.map((feature) => (
                  <li key={L(feature)} className="flex items-start gap-3 text-[14px] text-navy-800/85">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold-600">
                      <Check className="h-3 w-3" />
                    </span>
                    {L(feature)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Spec rows */}
            <dl className="mt-6 divide-y divide-border border-y border-border">
              {[
                { Icon: Download, label: t("product.format"), value: t("product.formatValue") },
                { Icon: ShieldCheck, label: t("product.delivery"), value: t("product.deliveryValue") },
                { Icon: RotateCcw, label: t("product.guarantee"), value: t("product.guaranteeValue") },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 py-4">
                  <Icon className="h-4 w-4 shrink-0 text-gold" />
                  <dt className="w-28 shrink-0 text-[12px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="text-[14px] text-navy-800/85">{value}</dd>
                </div>
              ))}
            </dl>

            <Accordion type="single" collapsible className="mt-8">
              {faqs.slice(0, 3).map((faq, i) => (
                <AccordionItem key={i} value={`p-faq-${i}`} className="border-b border-border">
                  <AccordionTrigger className="py-4 text-start font-display text-[15px] text-navy-700 hover:text-gold-600 hover:no-underline">
                    {L(faq.q)}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-[14px] leading-relaxed text-muted-foreground">
                    {L(faq.a)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-ivory-dim/50 section">
          <div className="container-luxe">
            <SectionHeading eyebrow={t("shop.eyebrow")} title={t("product.related")} />
            <div className="mx-auto grid max-w-xl gap-7">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductPage;
