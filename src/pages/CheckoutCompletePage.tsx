import { useSearchParams } from "react-router-dom";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { Link } from "@/components/LocalLink";
import Seo from "@/components/Seo";
import { useLang } from "@/i18n/LanguageContext";

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
  const { t } = useLang();
  const [params] = useSearchParams();
  const status = params.get("status");
  const payment = params.get("payment");
  const reference = payment && /^pay_[A-Za-z0-9]+$/.test(payment) ? payment : null;

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
