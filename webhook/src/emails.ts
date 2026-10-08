import type { Localized, Product } from "./products";

/**
 * The two emails a buyer receives: an order confirmation the moment they pay,
 * and a review request a few days later. Arabic first with the English
 * underneath, because the payment does not say which language the buyer
 * shopped in.
 *
 * Built the way email has to be: tables, inline styles and hosted images,
 * because Gmail and Outlook drop most of what a web page relies on. The one
 * <style> block only adds a gentle fade-in and a shimmer on the button for
 * the mail apps that run CSS animation (Apple Mail, iOS); everywhere else the
 * email looks the same, just still.
 * رسالتان: تأكيد الطلب فور الدفع، وطلب تقييم بعد أيام — بالعربية ثم الإنجليزية.
 */
export type Email = { subject: string; html: string; text: string };

const NAVY = "#0B1B33";
const NAVY_SOFT = "#13284A";
const GOLD = "#C9A227";
const IVORY = "#F7F3EA";
const MUTED = "#AAB4C3";
const SITE = "https://ediblecodex.com";
const CREST = `${SITE}/brand/email/crest.jpg`;
const INSTAGRAM = "https://instagram.com/ahmet_salameh";

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

type Lang = "ar" | "en";
const dirOf = (lang: Lang) => (lang === "ar" ? "rtl" : "ltr");
const alignOf = (lang: Lang) => (lang === "ar" ? "right" : "left");
const fontOf = (lang: Lang) =>
  lang === "ar" ? "Tahoma,'Segoe UI',Arial,sans-serif" : "'Helvetica Neue',Helvetica,Arial,sans-serif";

const row = (inner: string, padding = "0 32px") =>
  `<tr><td style="padding:${padding}">${inner}</td></tr>`;

const button = (href: string, label: string) => `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto">
  <tr><td class="cta" align="center" bgcolor="${GOLD}" style="border-radius:6px;background:${GOLD};background-image:linear-gradient(135deg,#E4C55A 0%,${GOLD} 45%,#A8841A 100%)">
    <a href="${escape(href)}" target="_blank" style="display:inline-block;padding:16px 40px;font-family:Tahoma,Arial,sans-serif;font-size:17px;font-weight:bold;color:${NAVY};text-decoration:none;border-radius:6px">${escape(label)}</a>
  </td></tr>
</table>`;

const eyebrow = (text: string, lang: Lang) =>
  `<p style="margin:0 0 10px;font-family:${fontOf(lang)};font-size:12px;letter-spacing:${lang === "en" ? "3px" : "0"};text-transform:uppercase;color:${GOLD};text-align:center">${escape(text)}</p>`;

const headline = (text: string, lang: Lang) =>
  `<h1 dir="${dirOf(lang)}" style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.3;font-weight:normal;color:${IVORY};text-align:center">${escape(text)}</h1>`;

const paragraph = (text: string, lang: Lang, color = MUTED, size = 16) =>
  `<p dir="${dirOf(lang)}" style="margin:0 0 16px;font-family:${fontOf(lang)};font-size:${size}px;line-height:1.8;color:${color};text-align:${alignOf(lang)}">${text}</p>`;

const divider = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:28px 0"><div style="height:1px;line-height:1px;font-size:1px;background:${GOLD};opacity:.35">&nbsp;</div></td></tr></table>`;

const features = (items: Localized[], lang: Lang) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="${dirOf(lang)}">${items
    .map(
      (f) => `<tr>
  <td width="28" valign="top" style="padding:6px 0;font-family:Arial,sans-serif;font-size:16px;color:${GOLD};text-align:${alignOf(lang)}">✦</td>
  <td valign="top" style="padding:6px 0;font-family:${fontOf(lang)};font-size:15px;line-height:1.6;color:${IVORY};text-align:${alignOf(lang)}">${escape(f[lang])}</td>
</tr>`,
    )
    .join("")}</table>`;

/** The product card: hero image, name, tagline. */
const productCard = (product: Product) => `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${NAVY_SOFT};border:1px solid rgba(201,162,39,.35);border-radius:10px;overflow:hidden">
  <tr><td class="fade"><img src="${escape(product.image)}" width="534" alt="${escape(product.name.en)}" style="display:block;width:100%;max-width:534px;height:auto;border:0"></td></tr>
  <tr><td style="padding:22px 24px 6px;text-align:center">
    <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:24px;color:${IVORY}">${escape(product.name.ar)}</p>
    <p style="margin:0 0 10px;font-family:Georgia,serif;font-size:15px;font-style:italic;color:${GOLD}">${escape(product.name.en)}</p>
  </td></tr>
  <tr><td dir="rtl" style="padding:0 24px 22px;text-align:center;font-family:${fontOf("ar")};font-size:14px;line-height:1.7;color:${MUTED}">${escape(product.tagline.ar)}<br><span dir="ltr">${escape(product.tagline.en)}</span></td></tr>
</table>`;

const summary = (product: Product, reference: string, lang: Lang) => {
  const label = lang === "ar" ? { title: "ملخّص الطلب", item: "المنتج", total: "المبلغ", ref: "رقم الطلب" }
                              : { title: "Order summary", item: "Item", total: "Total", ref: "Order no." };
  const line = (k: string, v: string, mono = false) => `<tr>
  <td style="padding:8px 0;font-family:${fontOf(lang)};font-size:14px;color:${MUTED};text-align:${alignOf(lang)}">${k}</td>
  <td style="padding:8px 0;font-family:${mono ? "'Courier New',monospace" : fontOf(lang)};font-size:14px;color:${IVORY};text-align:${lang === "ar" ? "left" : "right"}" dir="ltr">${v}</td>
</tr>`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="${dirOf(lang)}" style="background:${NAVY_SOFT};border-radius:8px">
  <tr><td colspan="2" style="padding:16px 20px 4px;font-family:${fontOf(lang)};font-size:13px;letter-spacing:${lang === "en" ? "2px" : "0"};text-transform:uppercase;color:${GOLD};text-align:${alignOf(lang)}">${label.title}</td></tr>
  <tr><td colspan="2" style="padding:0 20px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    ${line(label.item, escape(product.name[lang]))}
    ${line(label.total, escape(product.price[lang]))}
    ${line(label.ref, escape(reference), true)}
  </table></td></tr>
</table>`;
};

const steps = (lang: Lang) => {
  const items = lang === "ar"
    ? ["اضغط زر «افتح المحتوى» أعلاه.", "سجّل الدخول في Whop بنفس هذا الإيميل.", "حمّل الملف أو اقرأه مباشرة — هو لك مدى الحياة."]
    : ["Tap “Open your content” above.", "Sign in to Whop with this same email.", "Download or read it right away — it's yours for life."];
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="${dirOf(lang)}">${items
    .map(
      (text, i) => `<tr>
  <td width="40" valign="top" style="padding:6px 0"><div style="width:28px;height:28px;line-height:28px;border-radius:14px;border:1px solid ${GOLD};text-align:center;font-family:Georgia,serif;font-size:14px;color:${GOLD}">${i + 1}</div></td>
  <td valign="middle" style="padding:6px 0;font-family:${fontOf(lang)};font-size:15px;line-height:1.6;color:${IVORY};text-align:${alignOf(lang)}">${escape(text)}</td>
</tr>`,
    )
    .join("")}</table>`;
};

const stars = (href: string) =>
  `<p style="margin:0 0 6px;text-align:center;font-size:34px;letter-spacing:6px;line-height:1">${[1, 2, 3, 4, 5]
    .map((n) => `<a href="${escape(href)}" target="_blank" title="${n}/5" style="color:${GOLD};text-decoration:none">★</a>`)
    .join("")}</p>`;

const footer = `
<tr><td style="padding:28px 32px 36px;text-align:center;border-top:1px solid rgba(201,162,39,.2)">
  <p style="margin:0 0 10px;font-family:Georgia,serif;font-size:14px;letter-spacing:3px;color:${GOLD}">THE EDIBLE CODEX</p>
  <p style="margin:0 0 14px;font-family:Arial,sans-serif;font-size:13px;line-height:1.8">
    <a href="${SITE}" target="_blank" style="color:${MUTED};text-decoration:none">ediblecodex.com</a>
    <span style="color:#4A5A75">&nbsp;·&nbsp;</span>
    <a href="${INSTAGRAM}" target="_blank" style="color:${MUTED};text-decoration:none">Instagram</a>
  </p>
  <p dir="rtl" style="margin:0;font-family:${fontOf("ar")};font-size:12px;line-height:1.7;color:#6B7A93">وصلتك هذه الرسالة لأنك طلبت من ذا إديبل كودكس.<br><span dir="ltr">You're receiving this because you ordered from The Edible Codex.</span></p>
</td></tr>`;

const shell = (preheader: string, rows: string) => `<!doctype html>
<html lang="ar" dir="rtl"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark"><meta name="supported-color-schemes" content="dark">
<title>The Edible Codex</title>
<style>
  @keyframes fadeUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }
  @keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
  .fade { animation: fadeUp .9s ease-out both }
  .cta { background-size: 200% 100% !important; animation: shimmer 3.5s linear infinite }
  @media (prefers-reduced-motion: reduce) { .fade, .cta { animation: none !important } }
  @media (max-width: 620px) { .wrap { width: 100% !important } h1 { font-size: 26px !important } }
</style>
</head>
<body style="margin:0;padding:0;background:${NAVY};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${NAVY}">${escape(preheader)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${NAVY}" style="background:${NAVY}">
<tr><td align="center" style="padding:24px 12px">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:${NAVY};border:1px solid rgba(201,162,39,.25);border-radius:12px">
  <tr><td style="height:4px;line-height:4px;font-size:4px;background:${GOLD};border-radius:12px 12px 0 0">&nbsp;</td></tr>
  <tr><td style="padding:32px 32px 8px;text-align:center">
    <img src="${CREST}" width="72" height="72" alt="The Edible Codex" style="display:inline-block;border:0;border-radius:36px">
    <p style="margin:12px 0 0;font-family:Georgia,serif;font-size:13px;letter-spacing:4px;color:${GOLD}">THE EDIBLE CODEX</p>
  </td></tr>
  ${rows}
  ${footer}
</table>
</td></tr></table>
</body></html>`;

export const thankYouEmail = (product: Product, reference: string): Email => {
  const html = shell(
    `طلبك جاهز — ${product.name.ar}. افتح المحتوى من هنا · Your order is ready.`,
    [
      row(`${eyebrow("✓ تمّ تأكيد طلبك", "ar")}${headline("طلبك جاهز! 🎉", "ar")}${paragraph(
        `شكراً لك على ثقتك. <strong style="color:${IVORY}">${escape(product.name.ar)}</strong> صار لك الآن — تقدر توصل له بضغطة واحدة.`,
        "ar",
        MUTED,
        16,
      ).replace("text-align:right", "text-align:center")}`, "16px 32px 8px"),
      row(productCard(product), "12px 32px 8px"),
      row(paragraph(escape(product.description.ar), "ar"), "20px 32px 0"),
      row(features(product.features, "ar"), "0 32px 8px"),
      row(button(product.url, "افتح المحتوى الآن ←"), "24px 32px 28px"),
      row(summary(product, reference, "ar"), "0 32px 24px"),
      row(`${paragraph(`<strong style="color:${GOLD}">كيف توصل لمحتواك</strong>`, "ar", IVORY, 15)}${steps("ar")}`, "0 32px 8px"),
      row(paragraph("إذا احتجت أي مساعدة، رد على هذا الإيميل مباشرة وراح نساعدك. 🤍", "ar", MUTED, 15), "16px 32px 0"),
      row(divider),
      row(`${eyebrow("Order confirmed", "en")}${headline("Your order is ready", "en")}${paragraph(
        `Thank you. <strong style="color:${IVORY}">${escape(product.name.en)}</strong> is yours now — one tap away.`,
        "en",
      ).replace("text-align:left", "text-align:center")}`, "0 32px 8px"),
      row(paragraph(escape(product.description.en), "en"), "8px 32px 0"),
      row(features(product.features, "en"), "0 32px 8px"),
      row(button(product.url, "Open your content →"), "24px 32px 28px"),
      row(summary(product, reference, "en"), "0 32px 24px"),
      row(steps("en"), "0 32px 8px"),
      row(paragraph("Need a hand? Just reply to this email and we'll help.", "en", MUTED, 15), "16px 32px 28px"),
    ].join(""),
  );
  return {
    subject: `طلبك جاهز! 🎉 ${product.name.ar} · Your Edible Codex order is ready`,
    html,
    text: [
      "طلبك جاهز! 🎉",
      `شكراً لك! ${product.name.ar} صار لك الآن.`,
      product.description.ar,
      ...product.features.map((f) => `• ${f.ar}`),
      `افتح المحتوى: ${product.url}`,
      `المبلغ: ${product.price.ar} · رقم الطلب: ${reference}`,
      "إذا احتجت أي مساعدة، رد على هذا الإيميل وراح نساعدك.",
      "",
      "Your order is ready",
      `Thank you! ${product.name.en} is yours now.`,
      product.description.en,
      ...product.features.map((f) => `• ${f.en}`),
      `Open your content: ${product.url}`,
      `Total: ${product.price.en} · Order no. ${reference}`,
      "Need a hand? Just reply to this email and we'll help.",
      "",
      "The Edible Codex · https://ediblecodex.com",
    ].join("\n"),
  };
};

export const reviewEmail = (product: Product): Email => {
  const html = shell(
    `وش رأيك بـ ${product.name.ar}؟ قيّمنا بنقرة · How's it going so far?`,
    [
      row(`${eyebrow("رأيك يهمّنا", "ar")}${headline("وش رأيك بتجربتك؟", "ar")}${paragraph(
        `صار لك أيام مع <strong style="color:${IVORY}">${escape(product.name.ar)}</strong> — جربت شي منه؟ نحب نسمع رأيك.`,
        "ar",
      ).replace("text-align:right", "text-align:center")}`, "16px 32px 8px"),
      row(productCard(product), "12px 32px 8px"),
      row(`${paragraph("اضغط على عدد النجوم وقيّمنا — تاخذ دقيقة وتفرق معنا كثير:", "ar", IVORY, 15).replace("text-align:right", "text-align:center")}${stars(product.url)}`, "24px 32px 8px"),
      row(button(product.url, "قيّم تجربتك ←"), "16px 32px 16px"),
      row(paragraph(`ولو احتجت ترجع للمحتوى، نفس الرابط يوديك له: <a href="${escape(product.url)}" style="color:${GOLD}">${escape(product.url)}</a>`, "ar", MUTED, 14), "8px 32px 0"),
      row(divider),
      row(`${eyebrow("We'd love your thoughts", "en")}${headline("How's it going so far?", "en")}${paragraph(
        `It's been a few days with <strong style="color:${IVORY}">${escape(product.name.en)}</strong>. Tried something yet? A quick review means a lot to us.`,
        "en",
      ).replace("text-align:left", "text-align:center")}`, "0 32px 8px"),
      row(stars(product.url), "8px 32px 8px"),
      row(button(product.url, "Leave a quick review →"), "16px 32px 16px"),
      row(paragraph(`The same link takes you back to your content: <a href="${escape(product.url)}" style="color:${GOLD}">${escape(product.url)}</a>`, "en", MUTED, 14), "8px 32px 28px"),
    ].join(""),
  );
  return {
    subject: `وش رأيك بتجربتك؟ ⭐ ${product.name.ar} · How's it going so far?`,
    html,
    text: [
      `جربت ${product.name.ar}؟ نحب نسمع رأيك! خذ دقيقة وقيّمنا من هنا: ${product.url}`,
      `ولو احتجت ترجع للمحتوى، نفس الرابط يوديك له: ${product.url}`,
      "",
      `Tried ${product.name.en} yet? We'd love a quick review: ${product.url}`,
      `The same link takes you back to your content: ${product.url}`,
      "",
      "The Edible Codex · https://ediblecodex.com",
    ].join("\n"),
  };
};

/**
 * A one-off email for buyers who got the free guide before these emails
 * existed: the link to what they already own, a review request, and the
 * full book. Sent by scripts/send-catchup.ts, never by the webhook.
 * رسالة لمرة واحدة لمن حصل على الدليل المجاني قبل تفعيل الرسائل: رابط
 * المحتوى، وطلب تقييم، وعرض الكتاب الكامل.
 */
export const catchUpEmail = (gift: Product, book: Product, bookPage: Localized): Email => {
  const offer = (lang: Lang) => {
    const t = lang === "ar"
      ? { eyebrow: "الخطوة التالية في مطبخك", title: "جاهز للكتاب الكامل؟", price: "٩٫٩٩ دولار فقط", was: "بدل ١٩٫٩٩", cta: "احصل على الكتاب ←", note: "تحميل فوري · وصول مدى الحياة · استرداد كامل خلال ٣٠ يوماً" }
      : { eyebrow: "The next step in your kitchen", title: "Ready for the full book?", price: "Just $9.99", was: "was $19.99", cta: "Get the book →", note: "Instant download · lifetime access · 30-day full refund" };
    return [
      row(`${eyebrow(t.eyebrow, lang)}${headline(t.title, lang)}`, "8px 32px 8px"),
      row(productCard(book), "8px 32px 8px"),
      row(features(book.features, lang), "16px 32px 8px"),
      row(`<p style="margin:0;text-align:center;font-family:Georgia,serif;font-size:28px;color:${GOLD}">${t.price} <span style="font-size:16px;color:${MUTED};text-decoration:line-through">${t.was}</span></p>`, "16px 32px 8px"),
      row(button(bookPage[lang], t.cta), "16px 32px 8px"),
      row(`<p style="margin:0;text-align:center;font-family:${fontOf(lang)};font-size:13px;color:${MUTED}">${t.note}</p>`, "8px 32px 8px"),
    ].join("");
  };

  const html = shell(
    `هديتك تنتظرك: ${gift.name.ar} — رابط الوصول بالداخل · Your free guide is waiting`,
    [
      row(`${eyebrow("🎁 هديتك تنتظرك", "ar")}${headline(`${gift.name.ar} — صارت لك`, "ar")}${paragraph(
        `حصلت قبل فترة على <strong style="color:${IVORY}">${escape(gift.name.ar)}</strong> من ذا إديبل كودكس، وحبينا نتأكد إنها وصلتك. هذا رابط الوصول المباشر:`,
        "ar",
      ).replace("text-align:right", "text-align:center")}`, "16px 32px 8px"),
      row(productCard(gift), "12px 32px 8px"),
      row(button(gift.url, "افتح الدليل الآن ←"), "24px 32px 12px"),
      row(paragraph("سجّل الدخول في Whop بنفس هذا الإيميل، وتلقى الدليل جاهز للتحميل.", "ar", MUTED, 14).replace("text-align:right", "text-align:center"), "0 32px 8px"),
      row(`${paragraph("وإذا جربت صلصة منها، قيّمنا بنقرة — يفرق معنا كثير:", "ar", IVORY, 15).replace("text-align:right", "text-align:center")}${stars(gift.url)}`, "16px 32px 8px"),
      row(divider),
      offer("ar"),
      row(divider),
      row(`${eyebrow("Your free guide is waiting", "en")}${headline(`${gift.name.en} — it's yours`, "en")}${paragraph(
        `You picked up <strong style="color:${IVORY}">${escape(gift.name.en)}</strong> from The Edible Codex, and we wanted to make sure it reached you. Here's your direct link:`,
        "en",
      ).replace("text-align:left", "text-align:center")}`, "0 32px 8px"),
      row(button(gift.url, "Open the guide →"), "16px 32px 12px"),
      row(`${paragraph("Tried one of the sauces? A one-tap review means a lot:", "en", IVORY, 15).replace("text-align:left", "text-align:center")}${stars(gift.url)}`, "8px 32px 8px"),
      row(divider),
      offer("en"),
      row(paragraph("Questions? Just reply to this email. · عندك سؤال؟ رد على هذا الإيميل مباشرة.", "en", MUTED, 13).replace("text-align:left", "text-align:center"), "16px 32px 28px"),
    ].join(""),
  );
  return {
    subject: `🎁 هديتك تنتظرك: ${gift.name.ar} · Your free guide is waiting`,
    html,
    text: [
      `هديتك تنتظرك: ${gift.name.ar}`,
      `رابط الوصول: ${gift.url}`,
      "سجّل الدخول في Whop بنفس هذا الإيميل.",
      `قيّمنا: ${gift.url}`,
      "",
      `جاهز للكتاب الكامل؟ ${book.name.ar} — ٩٫٩٩ دولار بدل ١٩٫٩٩: ${bookPage.ar}`,
      "",
      `Your free guide is waiting: ${gift.name.en} — ${gift.url}`,
      `Ready for the full book? ${book.name.en} — $9.99 (was $19.99): ${bookPage.en}`,
      "",
      "The Edible Codex · https://ediblecodex.com",
    ].join("\n"),
  };
};
