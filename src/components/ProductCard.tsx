import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { formatPrice, useLang } from "@/i18n/LanguageContext";
import BuyButton from "@/components/BuyButton";
import { site } from "@/data/site";
import type { Product } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  const { t, L, lang } = useLang();

  const isFree = product.price === 0;

  const badgeLabel =
    product.badge === "bestseller"
      ? t("product.bestseller")
      : product.badge === "free"
        ? t("product.freeBadge")
        : product.badge === "new"
          ? t("product.new")
          : null;

  const savePct = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;

  return (
    <article className="card-luxe group flex h-full flex-col">
      <Link to={`/shop/${product.slug}/`} className="relative block overflow-hidden bg-navy-800">
        <img
          src={product.image}
          alt={L(product.title)}
          loading="lazy"
          style={{ objectPosition: product.focus ?? "center" }}
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-ink-fade opacity-60" />

        {badgeLabel && (
          <span className="absolute top-4 start-4 rounded-sm bg-gold-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
            {badgeLabel}
          </span>
        )}
        {savePct > 0 && (
          <span className="absolute top-4 end-4 rounded-sm border border-gold/40 bg-ink/80 px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-gold-200">
            −{savePct}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-gold text-gold" : "text-border"}`}
            />
          ))}
          <span className="ms-1 text-[11px] text-muted-foreground">({product.reviews})</span>
        </div>

        <h3 className="font-display text-lg leading-snug text-navy-700">
          <Link to={`/shop/${product.slug}/`} className="transition-colors hover:text-gold-600">
            {L(product.title)}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">{L(product.subtitle)}</p>

        <div className="mt-5 flex items-baseline gap-2">
          <span className={`font-display text-2xl ${isFree ? "text-gold-600" : "text-navy-700"}`}>
            {isFree ? t("product.free") : formatPrice(product.price, lang, site.currency.symbol)}
          </span>
          {product.compareAt && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAt, lang, site.currency.symbol)}
            </span>
          )}
        </div>

        <BuyButton product={product} className="mt-5 w-full" />

        <p className="mt-2.5 text-center text-[11px] text-muted-foreground">{t("product.viaWhop")}</p>
      </div>
    </article>
  );
};

export default ProductCard;
