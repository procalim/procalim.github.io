# The Edible Codex — متجر رقمي احترافي / Premium Digital Storefront

موقع متجر إلكتروني كامل بهوية بصرية ذهبية · سوداء · كحلية، ثنائي اللغة (عربي RTL + إنجليزي LTR).
A complete storefront in a gold · black · navy identity, bilingual (Arabic RTL + English LTR).

![identity](public/brand/edible-codex-cover.jpg)

---

## ١. التشغيل محلياً · Running locally

```sh
npm install
npm run dev       # http://localhost:8080
npm run build     # production build → dist/
npm run preview   # preview the production build
npm run lint
```

## ٢. ما الذي تعدّله أولاً · What to edit first

كل المحتوى مجمّع في أربعة ملفات — لا حاجة للدخول في الكود.
All content lives in four files — you never have to dig through components.

| الملف · File | ماذا يحتوي · What it holds |
| --- | --- |
| `src/data/site.ts` | الاسم، اسم الشيف، البريد (اتركه فارغاً ليختفي)، الجوال، واتساب، إنستغرام، العملة |
| `src/data/recipes.ts` | الوصفات المجانية — انسخ أي كتلة وعدّلها لإضافة وصفة |
| `src/data/products.ts` | المنتجات وأسعارها وأوصافها ومميزاتها، التقييمات، الأسئلة الشائعة، أكواد الخصم |
| `src/data/policies.ts` | سياسة الخصوصية، الشروط والأحكام، سياسة الاسترداد |
| `src/i18n/dictionary.ts` | كل نصوص الواجهة بالعربية والإنجليزية في مكان واحد |

> **مهم:** التقييمات في `products.ts` نماذج توضيحية — استبدلها بتقييمات عملائك الحقيقيين قبل النشر.
> **Important:** the reviews in `products.ts` are placeholders — replace them with real customer reviews before launch.

> الأسعار الحالية: الإصدار الرئيسي **$14.99** والباقي مُسعَّر حوله. احرص أن يطابق السعر ما هو معروض على Whop.
> Current pricing: the flagship is **$14.99** and the rest is scaled around it — keep it in sync with Whop.

## ٣. الصور · Brand images

صورك في `public/brand/` وتُستدعى عبر `brandImages` في `src/data/site.ts`:

- `logo-full.jpg` — الشعار الأصلي كما أرسلته
- `logo-crest.jpg` — الشارة وحدها (الشوكة والسكين والملعقة) وتظهر في الشريط العلوي
- `logo-square.jpg` · `icon-180.png` — أيقونة المتصفّح وصورة المشاركة الاجتماعية
- `chef-portrait.jpg` — الواجهة الرئيسية وصفحة عن الشيف
- `chef-shrimp-rainbow.jpg`, `chef-duck-cherry.jpg`, `chef-beef-tenderloin.jpg` — المعرض وبطاقات المنتجات
- `edible-codex-cover.jpg` — غلاف الإصدار الرئيسي وصورة المشاركة الاجتماعية

لتبديل أي صورة: ضع ملفاً بنفس الاسم في نفس المجلد.
To swap an image: drop a file with the same name into the same folder.

كل منتج يحمل خاصية `focus` (مثل `"center 75%"`) تحدّد أي جزء من الصورة يبقى في الإطار عند القص — عدّلها إن أضفت صوراً بتكوين مختلف.
Each product carries a `focus` value (e.g. `"center 75%"`) that decides which part of the photo survives the crop — adjust it when you add photos with a different composition.

## ٤. الصفحات · Pages

| المسار · Route | الصفحة · Page |
| --- | --- |
| `/` | الرئيسية: واجهة، مزايا، الإصدار الرئيسي، معرض الأطباق، المنتجات، التقييمات، عرض، أسئلة |
| `/shop` | المتجر مع بحث وتصنيفات وترتيب حسب السعر |
| `/shop/:slug` | صفحة المنتج: معرض صور، كمية، إضافة للسلة، شراء فوري، مواصفات، أسئلة، منتجات مشابهة |
| `/recipes` | فهرس الوصفات المجانية مع بحث بالاسم والمكوّنات وتصنيفات |
| `/recipes/:slug` | الوصفة كاملة ببيانات `Recipe` المنظّمة لجوجل |
| `/about` · `/faq` · `/contact` | عن الشيف · الأسئلة الشائعة · التواصل (نموذج + واتساب) |
| `/cart` · `/checkout` | السلة (مع كود خصم) · إتمام الطلب |
| `/policies/privacy`، `/policies/terms`، `/policies/refund` | السياسات |

## ٥. الدفع عبر Whop · Whop checkout

**الدفع مربوط بالكامل.** لا سلة ولا نموذج بيانات: كل زر شراء رابط واحد يفتح صفحة Whop مباشرة.

روابط الدفع موضوعة في `checkoutUrl` لكل منتج في `src/data/products.ts`:

| المنتج | السعر | رابط Whop |
| --- | --- | --- |
| الكتاب | $14.99 | `whop.com/the-edible-codex/the-edible-codex-cookbook/` |
| الصلصات الخمس | مجاناً | `whop.com/the-edible-codex/the-edible-codex-five-sauces/` |

سعر `0` يُعرض تلقائياً كـ «مجاناً» ويتغيّر نص الزر إلى «احصل عليه مجاناً».

لتغيير رابط أو سعر: عدّل `checkoutUrl` أو `price` في `src/data/products.ts` فقط.
إن تُرك `checkoutUrl` فارغاً يفتح الزر رسالة واتساب جاهزة بدلاً من أن يكون معطّلاً.

## ٥ب. بكسل Whop · Whop pixel — **مثبَّت بالفعل** ✅

الكود الذي أعطاك إياه Whop مثبَّت حرفياً في `index.html` (معرّف النشاط `biz_9eLjCbXTyya0ks`)،
ولا يحتاج أي خطوة إضافية منك سوى نشر الموقع.

لماذا سطر واحد يكفي: Whop يقول "in the `<head>` of every page"، وهذا الموقع تطبيق صفحة واحدة
(SPA) له ملف `index.html` وحيد يخدم كل المسارات.

ولأن الموقع لا يعيد تحميل الصفحة عند التنقّل، كان Whop سيسجّل زيارة واحدة فقط لكل جلسة؛
لذلك يرسل `src/components/RouteTracker.tsx` حدث `page` عند كل انتقال داخلي
(مع تخطّي أول زيارة لأن كود Whop يسجّلها بنفسه، منعاً للتكرار).

كما يُرسل حدث اختياري باسم `checkout_start` عند تحويل الزائر إلى صفحة الدفع —
غيّر اسمه أو احذفه من `src/lib/pixel.ts` إن أردت.

### التحقّق بعد النشر

1. افتح موقعك المنشور وتنقّل بين صفحتين.
2. افتح `https://whop.com/dashboard/biz_9eLjCbXTyya0ks/websites`
3. يجب أن يظهر نطاقك مع وقت حديث في عمود **Last event**.

للفحص بنفسك: افتح أدوات المطوّر → Console واكتب `whop.q` — سترى قائمة الأحداث المسجّلة.

## ٦. اللغة والاتجاه · Language & direction

- العربية هي اللغة الافتراضية، والاتجاه `rtl` يُضبط تلقائياً على `<html>`.
- زر التبديل في الشريط العلوي، واختيار الزائر محفوظ في `localStorage`.
- خطوط: Playfair Display + Inter للإنجليزية، Amiri + Tajawal للعربية.
- Arabic is the default; direction, fonts and the whole layout mirror automatically.

## ٧. الهوية البصرية · Design tokens

الألوان معرّفة في `tailwind.config.ts`، والمكوّنات الجاهزة في `src/index.css`:

| Token | Value | استخدام |
| --- | --- | --- |
| `gold` | `#C9A227` | العناصر الأساسية، الأزرار، الحدود |
| `navy` | `#132B52` / `#0B1B33` | الخلفيات الداكنة والنصوص |
| `ink` | `#0A0A0B` | الأسود العميق |
| `ivory` | `#F7F3EA` | الخلفية الفاتحة |

أصناف جاهزة: `.btn-gold` · `.btn-navy` · `.btn-outline-gold` · `.card-luxe` · `.card-dark` · `.eyebrow` · `.gold-text` · `.texture-dark` · `.texture-navy` · `.field-luxe`

## ٨. التقنيات · Stack

Vite · React 18 · TypeScript · Tailwind CSS · shadcn/ui · React Router · lucide-react

## ٨ب. محركات البحث · SEO

الأساس التقني جاهز ويُحدَّث تلقائياً مع كل بناء:

- `sitemap.xml` و `robots.txt` يُولَّدان من صفحات الموقع ومنتجاته الحقيقية
  (`scripts/generate-seo-files.mjs`) — لا يحتاجان تعديلاً يدوياً أبداً.
- رابط أساسي (canonical) ووسوم `hreflang` للعربية والإنجليزية في كل صفحة.
- بيانات منظّمة (JSON-LD): `Store` للرئيسية، `Product` مع السعر والعملة
  لكل منتج، و`FAQPage` لصفحة الأسئلة.
- عناوين ووصف اجتماعي مستقلّان لكل صفحة (`src/components/Seo.tsx`).

**لم نضف `aggregateRating`** إلى بيانات المنتج عمداً: التقييمات المعروضة
نموذجية، ونشر تقييمات غير حقيقية كبيانات منظّمة يخالف إرشادات جوجل ويضلّل
المشتري. أضفها بعد جمع تقييمات حقيقية.

**عند شراء النطاق:** غيّر العنوان في `site.config.json` فقط — تتبعه خريطة
الموقع والروابط الأساسية والبيانات المنظّمة كلها.

## ٩. النشر · Deploy

```sh
npm run build     # → dist/
```

ارفع مجلد `dist/` إلى أي استضافة ثابتة: Netlify أو Vercel أو Cloudflare Pages أو Lovable.
توجيه المسارات إلى `index.html` مُعدّ مسبقاً:

- `public/_redirects` → Netlify و Cloudflare Pages
- `vercel.json` → Vercel

بدون هذا التوجيه تعمل الصفحة الرئيسية فقط، وتعطي الروابط العميقة مثل
`/shop/the-edible-codex` خطأ 404 عند فتحها مباشرة.

### الموقع و Whop معاً · This site alongside Whop

في شاشة **"Create your website"** لدى Whop ثلاثة خيارات:

| الخيار | ماذا يعني لهذا الموقع |
| --- | --- |
| **Use a blueprint** | قالب جاهز من Whop — يتجاهل هذا الموقع بالكامل |
| **Build with AI** | يبني موقعاً جديداً من وصف — يتجاهل هذا الموقع أيضاً |
| **Import a website** | يعيد بناء الموقع من رابطه داخل محرّر Whop |
| **Connect your website** ← | يُبقي الموقع كما هو ويضيف التتبّع فقط |

**الموصى به: `Connect your website`.** هذا الموقع تطبيق React تفاعلي (سلة، تبديل لغة،
بحث وفلاتر، درج سلة)؛ الاستيراد `Import a website` ينسخ الشكل داخل محرّر Whop وقد تفقد
هذه الوظائف. الأفضل: انشر الموقع على نطاقك، الصق البكسل، واترك Whop للدفع والتسليم.
