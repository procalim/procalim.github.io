import { useSearchParams } from "react-router-dom";
import { CheckCircle2, Clock, ExternalLink, XCircle } from "lucide-react";
import { Link } from "@/components/LocalLink";
import Seo from "@/components/Seo";
import { useLang } from "@/i18n/LanguageContext";
import { getProduct, products } from "@/data/products";
import { lastCheckout } from "@/lib/last-checkout";

/**
 * Where Whop sends the buyer back after an off-site payment step (3DS, a
 * bank page), with `payment` (the pay_ ID) and `status` (succeeded, failed
 * or canceled) on the URL.
 *
 * This page only tells the buyer what happened. It never grants access or
 * marks anything paid: anyone can type these parameters, and a buyer can
 * close the tab before it loads. Whop delivers the purchase itself, from
 * its own record of the payment.
 * صفحة العودة بعد الدفع تعرض النتيجة فقط، ولا تمنح أي وصول — فمعاملاتها
 * يمكن كتابتها يدوياً، وWhop هو من يسلّم المشتريات.
 */
const CheckoutCompletePage = () => {
  const { t, L } = useLang();
  const [params] = useSearchParams();
  const status = params.get("status");
  const payment = params.get("payment");
  const reference = payment && /^pay_[A-Za-z0-9]+$/.test(payment) ? payment : null;
  // What was bought: named on the return URL, else remembered from this tab.
  // Unknown, every product is offered — the button only opens Whop, where
  // access is checked against the buyer's own account.
  const bought = getProduct(params.get("product") ?? undefined) ?? getProduct(lastCheckout() ?? undefined);
  const openable = (bought ? [bought] : products).filter((p) => p.accessUrl);

  const view =
    status === "succeeded"
      ? { Icon: CheckCircle2, tone: "text-emerald-400", title: t("done.succeeded.title"), body: t("done.succeeded.body"), retry: false }
      : status === "failed" || status === "canceled"
        ? {
            Icon: XCircle,
            tone: "text-red-400",
            title: t(status === "failed" ? "done.failed.title" : "done.canceled.title"),
            body: t("done.failed.body"),
            retry: true,
          }
        : { Icon: Clock, tone: "text-gold", title: t("done.processing.title"), body: t("done.processing.body"), retry: false };

  return (
    <section className="texture-dark">
      <Seo title={t("done.title")} description={view.body} noindex />
      <div className="container-luxe flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <view.Icon className={`h-14 w-14 ${view.tone}`} aria-hidden />
        <h1 className="font-poster mt-6 text-[clamp(2rem,8vw,3.6rem)] uppercase leading-[0.95] text-ivory">{view.title}</h1>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ivory/70">{view.body}</p>
        {reference && (
          <p className="mt-4 text-[12px] text-ivory/70">
            {t("done.reference")}: <span dir="ltr">{reference}</span>
          </p>
        )}
        {/* After a payment, the way to what was bought — on Whop, signed in
            with the email used at checkout. */}
        {!view.retry && openable.length > 0 && (
          <div className="mt-9 w-full max-w-md rounded-sm border border-gold/40 bg-navy-700/60 p-6 shadow-gold-glow">
            <p className="font-display text-lg text-ivory">{t("done.access.title")}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-ivory/75">{t("done.access.body")}</p>
            <div className="mt-5 flex flex-col gap-3">
              {openable.map((p) => (
                <a key={p.slug} href={p.accessUrl} target="_blank" rel="noreferrer noopener" className="btn-gold w-full">
                  {openable.length > 1 ? L(p.title) : t("done.access.cta")}
                  <ExternalLink className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link to="/shop/" className={view.retry ? "btn-gold" : "btn-outline-gold"}>
            {t("done.retry")}
          </Link>
          <Link to="/" className={view.retry ? "btn-outline-gold" : "btn-gold"}>
            {t("done.home")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CheckoutCompletePage;
