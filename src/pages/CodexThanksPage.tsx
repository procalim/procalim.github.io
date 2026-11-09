import { Check, Download, Mail, ShieldCheck } from "lucide-react";
import Seo from "@/components/Seo";
import { localePath } from "@/i18n/locale-path";
import { useLang } from "@/i18n/LanguageContext";
import { whatsappLink } from "@/data/site";

/**
 * The thank-you page Digistore24 sends buyers to after paying on /codex.
 * Digistore24 hosts the PDFs and shows the download link on its own order
 * confirmation and in its receipt email; this page says so, names the product
 * as digital, and carries the sentence Digistore24 requires about who charges
 * the card. Like /codex it links to no other checkout.
 * صفحة الشكر بعد الشراء عبر Digistore24: تشرح طريقة استلام الكتاب الرقمي، ولا تربط بأي دفع آخر.
 */
const copy = {
  en: {
    title: "Thank you for your order",
    lead: "Your copy of The Edible Codex is ready.",
    what: "What you bought",
    whatBody:
      "The Edible Codex — a digital cookbook (English PDF) in two editions: the full book and a light edition for your phone. This is a digital product; nothing is shipped.",
    how: "How to get your book",
    steps: [
      "Right after payment, Digistore24 shows your download link on the order confirmation page.",
      "Digistore24 also emails you the receipt and the same download link, to the address you used at checkout. It usually arrives within a few minutes.",
      "No email after 10 minutes? Check your spam or promotions folder, then search your inbox for “Digistore24”.",
      "Download both PDFs and save them on your phone or computer. They are yours to keep.",
    ],
    charge: "The withdrawal from your account will be done by Digistore24.",
    refund: "60-day money-back guarantee, handled by Digistore24.",
    help: "Need help with your order?",
    helpBody: "Reply to the Digistore24 email, or contact us on WhatsApp from the link below.",
  },
  ar: {
    title: "شكراً لطلبك",
    lead: "نسختك من ذا إديبل كودكس جاهزة.",
    what: "ماذا اشتريت",
    whatBody:
      "ذا إديبل كودكس — كتاب طبخ رقمي (ملف PDF بالإنجليزية) بنسختين: الكتاب الكامل ونسخة خفيفة للهاتف. هذا منتج رقمي، ولا يُشحن أي شيء.",
    how: "كيف تحصل على كتابك",
    steps: [
      "مباشرة بعد الدفع، تعرض Digistore24 رابط التحميل على صفحة تأكيد الطلب.",
      "وترسل لك Digistore24 الإيصال ورابط التحميل نفسه إلى البريد الذي استخدمته عند الدفع، عادة خلال دقائق.",
      "لم يصلك البريد بعد ١٠ دقائق؟ افحص مجلد الرسائل غير المرغوبة (Spam)، ثم ابحث في بريدك عن «Digistore24».",
      "حمّل ملفَّي PDF واحفظهما على هاتفك أو حاسوبك، فهما لك.",
    ],
    charge: "The withdrawal from your account will be done by Digistore24. — سيتم سحب المبلغ من حسابك بواسطة Digistore24.",
    refund: "ضمان استرداد خلال ٦٠ يوماً، تتولاه Digistore24.",
    help: "تحتاج مساعدة في طلبك؟",
    helpBody: "ردّ على بريد Digistore24، أو تواصل معنا عبر واتساب من الرابط أدناه.",
  },
};

const CodexThanksPage = () => {
  const { lang } = useLang();
  const c = copy[lang === "ar" ? "ar" : "en"];

  return (
    <>
      <Seo title={c.title} description={c.lead} noindex />

      <header className="border-b border-border bg-navy-700/60">
        <div className="container-luxe py-5 text-center font-display text-xl text-ivory">
          The <span className="text-gold">Edible</span> Codex
        </div>
      </header>

      <section className="section container-luxe">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-gold">
              <Check className="h-7 w-7" />
            </span>
            <h1 className="mt-6 font-display text-3xl text-ivory md:text-4xl">{c.title}</h1>
            <p className="mt-3 text-[15px] text-gold">{c.lead}</p>
          </div>

          <div className="mt-10 rounded-sm border border-gold/25 bg-ink p-7">
            <h2 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-luxe text-gold">
              <Download className="h-4 w-4" />
              {c.what}
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-ivory/85">{c.whatBody}</p>
          </div>

          <div className="mt-6 rounded-sm border border-gold/25 bg-ink p-7">
            <h2 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-luxe text-gold">
              <Mail className="h-4 w-4" />
              {c.how}
            </h2>
            <ol className="mt-5 space-y-4">
              {c.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed text-ivory/85">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-[12px] font-semibold text-gold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-8 rounded-sm border border-gold/40 px-5 py-4 text-center text-[14px] font-semibold text-ivory">
            {c.charge}
          </p>
          <p className="mt-4 flex items-center justify-center gap-2 text-[13px] text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-gold" />
            {c.refund}
          </p>

          <div className="mt-10 text-center">
            <h2 className="font-display text-xl text-ivory">{c.help}</h2>
            <p className="mt-2 text-[14px] text-ivory/75">{c.helpBody}</p>
            <a
              href={whatsappLink("Hello, I bought The Edible Codex on Digistore24 and need help with my order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-navy mt-5 inline-flex"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-[12px] text-muted-foreground">
        <p className="flex justify-center gap-4">
          <a href={localePath("/codex/privacy/", lang)} className="hover:text-gold">
            {lang === "ar" ? "الخصوصية" : "Privacy"}
          </a>
          <a href={localePath("/codex/terms/", lang)} className="hover:text-gold">
            {lang === "ar" ? "الشروط" : "Terms"}
          </a>
        </p>
        <p className="mt-3">© The Edible Codex</p>
      </footer>
    </>
  );
};

export default CodexThanksPage;
