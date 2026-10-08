import type { Product } from "./products";

/**
 * The two emails a buyer receives: a thank-you the moment they pay, and a
 * review request a few days later. Each is written in Arabic with the English
 * underneath, because the payment does not say which language the buyer
 * shopped in.
 * رسالتان: شكر فور الدفع، وطلب تقييم بعد أيام — بالعربية ثم الإنجليزية.
 */
export type Email = { subject: string; html: string; text: string };

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const button = (href: string, label: string) =>
  `<a href="${escape(href)}" style="display:inline-block;background:#C9A227;color:#0B1B33;text-decoration:none;font-weight:bold;padding:12px 24px;border-radius:4px">${escape(label)}</a>`;

const layout = (ar: string, en: string) => `<!doctype html>
<html lang="ar"><body style="margin:0;background:#F7F3EA;font-family:Tahoma,Arial,sans-serif;color:#0B1B33">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-top:4px solid #C9A227">
<tr><td style="padding:28px 28px 8px;font-family:Georgia,serif;font-size:20px">The Edible Codex · ذا إديبل كودكس</td></tr>
<tr><td dir="rtl" style="padding:8px 28px 20px;text-align:right;font-size:16px;line-height:1.8">${ar}</td></tr>
<tr><td style="padding:0 28px"><hr style="border:0;border-top:1px solid #E8E1CF"></td></tr>
<tr><td dir="ltr" style="padding:20px 28px 28px;text-align:left;font-size:15px;line-height:1.7;color:#3A4A63">${en}</td></tr>
</table></td></tr></table></body></html>`;

export const thankYouEmail = (product: Product): Email => ({
  subject: "طلبك جاهز! 🎉 · Your Edible Codex order is ready!",
  html: layout(
    `<p>شكراً لك! طلبك جاهز الحين: <strong>${escape(product.name.ar)}</strong>.</p>
<p>تقدر توصل لمحتواك من هنا:</p>
<p>${button(product.url, "افتح المحتوى")}</p>
<p>إذا احتجت أي مساعدة، رد على هذا الإيميل وراح نساعدك.</p>`,
    `<p>Thank you! Your order is ready: <strong>${escape(product.name.en)}</strong>.</p>
<p>${button(product.url, "Open your content")}</p>
<p>Need a hand? Just reply to this email and we'll help.</p>`,
  ),
  text: [
    `شكراً لك! طلبك جاهز الحين: ${product.name.ar}`,
    `تقدر توصل لمحتواك من هنا: ${product.url}`,
    "إذا احتجت أي مساعدة، رد على هذا الإيميل وراح نساعدك.",
    "",
    `Thank you! Your order is ready: ${product.name.en}`,
    `Get to your content here: ${product.url}`,
    "Need a hand? Just reply to this email and we'll help.",
  ].join("\n"),
});

export const reviewEmail = (product: Product): Email => ({
  subject: "وش رأيك بتجربتك؟ · How's it going so far?",
  html: layout(
    `<p>جربت <strong>${escape(product.name.ar)}</strong>؟ نحب نسمع رأيك!</p>
<p>خذ دقيقة وقيّمنا من هنا:</p>
<p>${button(product.url, "قيّم المنتج")}</p>
<p>ولو احتجت ترجع للمحتوى، نفس الرابط يوديك له: <a href="${escape(product.url)}">${escape(product.url)}</a></p>`,
    `<p>Tried <strong>${escape(product.name.en)}</strong> yet? We'd love to hear what you think.</p>
<p>${button(product.url, "Leave a quick review")}</p>
<p>The same link takes you back to your content: <a href="${escape(product.url)}">${escape(product.url)}</a></p>`,
  ),
  text: [
    `جربت ${product.name.ar}؟ نحب نسمع رأيك! خذ دقيقة وقيّمنا من هنا: ${product.url}`,
    `ولو احتجت ترجع للمحتوى، نفس الرابط يوديك له: ${product.url}`,
    "",
    `Tried ${product.name.en} yet? We'd love a quick review: ${product.url}`,
    `The same link takes you back to your content: ${product.url}`,
  ].join("\n"),
});
