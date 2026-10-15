import { useMemo } from "react";
import { Loader2 } from "lucide-react";
import { WhopElements, Checkout, CheckoutElement } from "@whop/elements-react";
import { useLang } from "@/i18n/LanguageContext";
import { loadCheckout } from "@/lib/whopCheckout";
import type { Product } from "@/data/products";

/**
 * Whop's checkout, mounted inside the buy dialog. It lives in its own file
 * so the Whop SDK is split out of the main bundle and downloaded only when a
 * buyer actually opens the dialog — every page loads faster for it.
 * الدفع عبر Whop في ملف منفصل، يُحمَّل فقط عند فتح نافذة الشراء.
 */
const CheckoutEmbed = ({
  product,
  returnUrl,
  onFailed,
}: {
  product: Product;
  returnUrl: string;
  onFailed: () => void;
}) => {
  const { t } = useLang();
  const elements = useMemo(() => loadCheckout(), []);

  return (
    <WhopElements
      elements={elements}
      locale="en"
      appearance={{ theme: { appearance: "dark" } }}
      onLoadError={onFailed}
    >
      <Checkout
        plan={product.planId}
        returnUrl={returnUrl}
        attribution={{ source: `ediblecodex.com/${product.slug}` }}
        fallback={<CheckoutLoading label={t("checkout.loading")} />}
      >
        <CheckoutElement className="min-h-[420px]" onError={onFailed} />
      </Checkout>
    </WhopElements>
  );
};

const CheckoutLoading = ({ label }: { label: string }) => (
  <p className="flex min-h-[420px] items-center justify-center gap-2 text-[12px] text-muted-foreground">
    <Loader2 className="h-3.5 w-3.5 animate-spin text-gold" />
    {label}
  </p>
);

export default CheckoutEmbed;
