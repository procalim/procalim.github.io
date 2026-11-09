import Seo from "@/components/Seo";
import CodexFooter from "@/components/CodexFooter";
import { useLang } from "@/i18n/LanguageContext";

/**
 * Legal information (imprint) for the Digistore24 pages. Digistore24 requires
 * the seller's name, address and VAT status to be one click away from the
 * sales page and the thank-you page.
 * المعلومات القانونية للبائع، تطلبها Digistore24 على صفحة البيع وصفحة الشكر.
 */
const rows = {
  en: [
    ["Seller", "Ahmad Ibrahim Ahmad Salameh (Chef Ahmet Salameh), individual seller — no registered company"],
    ["Address", "Amman, Jordan"],
    ["VAT ID", "None — the seller is not registered for VAT"],
    ["Website", "ediblecodex.com"],
    ["Product", "The Edible Codex — digital cookbook (PDF)"],
    ["Payments", "Orders are processed by Digistore24, who acts as the reseller and handles payment, invoices and refunds."],
  ],
  ar: [
    ["البائع", "أحمد إبراهيم أحمد سلامة (الشيف أحمد سلامة)، بائع فرد — لا توجد شركة مسجّلة"],
    ["العنوان", "عمّان، الأردن"],
    ["الرقم الضريبي", "لا يوجد — البائع غير مسجّل لضريبة القيمة المضافة"],
    ["الموقع", "ediblecodex.com"],
    ["المنتج", "ذا إديبل كودكس — كتاب طبخ رقمي (PDF)"],
    ["الدفع", "تتم الطلبات عبر Digistore24 بصفتها البائع الوسيط، وهي تتولى الدفع والفواتير والاسترداد."],
  ],
};

const CodexLegalPage = () => {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const title = isAr ? "المعلومات القانونية" : "Legal information";

  return (
    <>
      <Seo title={title} description={title} noindex />

      <header className="border-b border-border bg-navy-700/60">
        <div className="container-luxe py-5 text-center font-display text-xl text-ivory">
          The <span className="text-gold">Edible</span> Codex
        </div>
      </header>

      <section className="section container-luxe">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-center font-display text-3xl text-ivory">{title}</h1>
          <dl className="mt-10 divide-y divide-border border-y border-border">
            {rows[isAr ? "ar" : "en"].map(([label, value]) => (
              <div key={label} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
                <dt className="text-[12px] font-semibold uppercase tracking-[0.1em] text-gold">{label}</dt>
                <dd className="text-[14px] leading-relaxed text-ivory/85">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CodexFooter />
    </>
  );
};

export default CodexLegalPage;
