import { useMemo, useState } from "react";
import { ArrowRight, ExternalLink, Loader2 } from "lucide-react";
import { WhopElements, Checkout, CheckoutElement } from "@whop/elements-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatPrice, useLang } from "@/i18n/LanguageContext";
import { loadCheckout } from "@/lib/whopCheckout";
import { buyLink, onBuyClick } from "@/lib/buy";
import { pageUrl } from "@/lib/page-url";
import { localePath } from "@/i18n/locale-path";
import { site } from "@/data/site";
import type { Product } from "@/data/products";

type Props = { product: Product; withPrice?: boolean; className?: string };

/**
 * Opens Whop's checkout inside the site, through Whop Elements. If the
 * element cannot load — the SDK is blocked, the plan refuses to embed — the
 * same dialog offers the hosted checkout instead, so the sale is never lost
 * to a blank box.
 * الدفع داخل الموقع عبر Whop Elements؛ وإن تعذّر تحميله يُعرض رابط صفحة الدفع على Whop.
 */
const BuyButton = ({ product, withPrice = false, className = "" }: Props) => {
  const { t, L, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);

  const isFree = product.price === 0;
  const hostedUrl = buyLink(product, lang);
  const label = isFree ? t("product.getFree") : t("product.buyNow");

  // Started only once the dialog opens, so pages that never check out never
  // load the SDK. Off-site payment steps (3DS, bank pages) come back to the
  // return page in the buyer's language, which reads `payment` and `status`.
  const elements = useMemo(() => (open ? loadCheckout() : null), [open]);
  const returnUrl = pageUrl(localePath("/checkout/complete/", lang));

  // No plan id configured — behave exactly as before, a plain outbound link.
  if (!product.planId) {
    return (
      <a
        href={hostedUrl}
        target="_blank"
        rel="noreferrer noopener"
        onClick={() => onBuyClick(product)}
        className={`btn-gold ${className}`}
      >
        {withPrice && !isFree ? `${label} · ${formatPrice(product.price, lang, site.currency.symbol)}` : label}
        <ArrowRight className="h-4 w-4 flip-rtl" />
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onBuyClick(product);
          setFailed(false);
          setOpen(true);
        }}
        className={`btn-gold ${className}`}
      >
        {withPrice && !isFree ? `${label} · ${formatPrice(product.price, lang, site.currency.symbol)}` : label}
        <ArrowRight className="h-4 w-4 flip-rtl" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] w-[calc(100vw-24px)] max-w-lg overflow-y-auto border-gold/30 bg-ivory p-0 sm:w-full">
          <DialogHeader className="border-b border-gold/20 px-6 py-4 text-start">
            <DialogTitle className="pe-8 font-display text-lg text-navy-700">{L(product.title)}</DialogTitle>
          </DialogHeader>

          <div className="px-4 py-4">
            {!failed ? (
              <>
                <WhopElements
                  elements={elements}
                  locale="en"
                  appearance={{ theme: { appearance: "light" } }}
                  onLoadError={() => setFailed(true)}
                >
                  <Checkout
                    plan={product.planId}
                    returnUrl={returnUrl}
                    attribution={{ source: `ediblecodex.com/${product.slug}` }}
                    fallback={
                      <p className="flex min-h-[420px] items-center justify-center gap-2 text-[12px] text-muted-foreground">
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-gold" />
                        {t("checkout.loading")}
                      </p>
                    }
                  >
                    <CheckoutElement className="min-h-[420px]" onError={() => setFailed(true)} />
                  </Checkout>
                </WhopElements>

                {/* The hosted page stays one tap away. */}
                <a
                  href={hostedUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 flex items-center justify-center gap-1.5 border-t border-border pt-4 text-[12px] text-muted-foreground underline underline-offset-4 transition-colors hover:text-gold-600"
                >
                  {t("checkout.moreMethods")}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </>
            ) : (
              <div className="py-10 text-center">
                <p className="text-[14px] leading-relaxed text-navy-800/85">{t("checkout.embedFailed")}</p>
                <a
                  href={hostedUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-gold mt-6 w-full"
                  onClick={() => setOpen(false)}
                >
                  {t("checkout.openHosted")}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BuyButton;
