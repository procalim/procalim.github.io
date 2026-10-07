import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ChefHat, Check, Droplets, Infinity as InfinityIcon, Quote, Star } from "lucide-react";
import Seo from "@/components/Seo";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import TrustStrip from "@/components/TrustStrip";
import VideoStrip from "@/components/VideoStrip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatPrice, useLang } from "@/i18n/LanguageContext";
import { faqs, getProduct, products, testimonials } from "@/data/products";
import { recipes } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";
import BuyButton from "@/components/BuyButton";
import { bookPages, brandImages, site } from "@/data/site";

const HomePage = () => {
  const { t, L, lang } = useLang();
  const flagship = getProduct("the-edible-codex")!;

  const valueProps = [
    { Icon: ChefHat, title: t("value.1.title"), body: t("value.1.body") },
    { Icon: BookOpen, title: t("value.2.title"), body: t("value.2.body") },
    { Icon: Droplets, title: t("value.3.title"), body: t("value.3.body") },
    { Icon: InfinityIcon, title: t("value.4.title"), body: t("value.4.body") },
  ];

  const gallery = [
    { image: brandImages.chefShrimp, title: t("gallery.1.title"), body: t("gallery.1.body") },
    { image: brandImages.chefDuck, title: t("gallery.2.title"), body: t("gallery.2.body") },
    { image: brandImages.chefBeef, title: t("gallery.3.title"), body: t("gallery.3.body") },
  ];

  return (
    <>
      <Seo
        title={t("seo.home.title")}
        description={t("seo.home.desc")}
        jsonLd={{
          "@context": "https://schema.org",
          // An online shop, not a shop front: "Store" is a local business to
          // Google, which then asks for a street address and opening hours.
          "@type": "OnlineStore",
          name: site.brand.name,
          description: t("hero.subtitle"),
          url: site.url,
          logo: `${site.url}/brand/logo-square.jpg`,
          image: `${site.url}/brand/logo-square.jpg`,
          founder: { "@type": "Person", name: site.brand.chefEn },
          telephone: site.contact.phoneDisplay,
          address: { "@type": "PostalAddress", addressLocality: "Amman", addressCountry: "JO" },
          sameAs: [site.social.instagram],
          // The clips' VideoObject markup lives on their watch pages, not here:
          // Google treats a video as supplementary wherever the page is about
          // something else, and refuses to index it.
          // بيانات الفيديو على صفحات المقاطع، لأن جوجل لا يفهرسها هنا.
        }}
      />

      {/* ── HERO ── */}
      <section className="texture-dark relative overflow-hidden">
        {/* The chef and his pass, blurred back so the headline stays readable */}
        <img
          src={brandImages.heroBackdrop}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-80 blur-[3px] md:opacity-75 md:blur-[4px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/45 to-ink/85" />

        <div className="container-luxe relative z-10 grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="animate-fade-in">
            <span className="eyebrow eyebrow-start">{t("hero.eyebrow")}</span>

            <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,4.6rem)] font-semibold leading-[1.05] text-ivory text-balance">
              {t("hero.title.line1")}
              <span className="block gold-text animate-shimmer">{t("hero.title.line2")}</span>
            </h1>

            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ivory/70 md:text-base">{t("hero.subtitle")}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to={`/shop/${flagship.slug}/`} className="btn-gold">
                {t("hero.cta.primary")}
                <ArrowRight className="h-4 w-4 flip-rtl" />
              </Link>
              <Link to="/shop/" className="btn-outline-gold">
                {t("hero.cta.secondary")}
              </Link>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-gold/20 pt-8">
              {[
                { value: "261", label: t("hero.stat.recipes") },
                { value: "100", label: t("hero.stat.bonus") },
                { value: "12K+", label: t("hero.stat.readers") },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-3xl text-gold md:text-4xl">{stat.value}</dt>
                  <dd className="mt-1.5 text-[11px] uppercase leading-relaxed tracking-[0.1em] text-ivory/50">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* The chef, in a gold frame — on the phone too, where most of the
              traffic is. Hiding it below lg left a bare band of statistics
              between the headline and the trust row.
              الصورة تظهر على الهاتف أيضاً، حيث يأتي أغلب الزوّار. */}
          <div className="relative mx-auto w-full max-w-sm animate-fade-in-slow lg:max-w-none">
            <div className="absolute -inset-3 rounded-sm border border-gold/25" aria-hidden="true" />
            <div className="absolute -inset-8 hidden rounded-sm border border-gold/10 lg:block" aria-hidden="true" />
            <img
              src={brandImages.chefPortrait}
              alt={lang === "ar" ? site.brand.chefAr : site.brand.chefEn}
              className="relative aspect-[4/5] w-full rounded-sm object-cover object-top shadow-luxe"
              fetchPriority="high"
            />
            {/* Under the photo on a phone, over it from sm up — the overlay
                would otherwise sit on Skyline's head.
                تحت الصورة على الهاتف، وفوقها على الشاشات الأكبر. */}
            <div className="relative mt-3 rounded-sm border border-gold/25 bg-ink/85 px-5 py-4 backdrop-blur-sm sm:absolute sm:bottom-5 sm:start-5 sm:end-5 sm:mt-0">
              <p className="font-display text-base text-ivory">
                {lang === "ar" ? site.brand.chefAr : site.brand.chefEn}
              </p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-gold/90">{t("hero.portrait.line")}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-ivory/45">
                {t("hero.portrait.brand")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <VideoStrip />

      {/* ── VALUE PROPS ── */}
      <section className="section container-luxe">
        <SectionHeading eyebrow={t("featured.eyebrow")} title={t("value.title")} subtitle={t("value.subtitle")} />

        <div className="grid gap-px overflow-hidden rounded-sm border border-gold/20 bg-gold/20 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map(({ Icon, title, body }) => (
            <div key={title} className="group bg-white p-8 transition-colors duration-300 hover:bg-ivory">
              <span className="grid h-12 w-12 place-items-center rounded-sm bg-navy text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 font-display text-lg text-navy-700">{title}</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FLAGSHIP ── */}
      <section className="texture-navy section">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-2">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 rounded-sm border border-gold/20" aria-hidden="true" />
            <img
              src={bookPages.cover}
              alt={L(flagship.title)}
              loading="lazy"
              className="relative w-full rounded-sm object-cover shadow-luxe"
            />
          </div>

          <div className="order-1 lg:order-2">
            <span className="eyebrow eyebrow-start">{t("featured.eyebrow")}</span>
            <h2 className="mt-5 font-display text-3xl leading-tight text-ivory md:text-[2.7rem]">
              {t("featured.title")}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ivory/70">{t("featured.body")}</p>

            <ul className="mt-8 space-y-3.5">
              {["featured.bullet.1", "featured.bullet.2", "featured.bullet.3", "featured.bullet.4"].map((key) => (
                <li key={key} className="flex items-start gap-3 text-[14px] text-ivory/85">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                    <Check className="h-3 w-3" />
                  </span>
                  {t(key as "featured.bullet.1")}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl text-gold">
                  {formatPrice(flagship.price, lang, site.currency.symbol)}
                </span>
                {flagship.compareAt && (
                  <span className="text-lg text-ivory/40 line-through">
                    {formatPrice(flagship.compareAt, lang, site.currency.symbol)}
                  </span>
                )}
              </div>
              <BuyButton product={flagship} />
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="section container-luxe">
        <SectionHeading eyebrow={t("gallery.eyebrow")} title={t("gallery.title")} subtitle={t("gallery.subtitle")} />

        <div className="grid gap-6 md:grid-cols-3">
          {gallery.map((item) => (
            <figure key={item.title} className="group relative overflow-hidden rounded-sm bg-ink">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink-fade" />
              <figcaption className="absolute bottom-0 start-0 end-0 p-6">
                <h3 className="font-display text-lg text-ivory">{item.title}</h3>
                <p className="mt-1.5 text-[12px] uppercase tracking-[0.12em] text-gold/85">{item.body}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── EDITIONS ── */}
      <section className="bg-ivory-dim/50 section">
        <div className="container-luxe">
          <SectionHeading eyebrow={t("shop.eyebrow")} title={t("shop.title")} subtitle={t("shop.subtitle")} />

          <div className="mx-auto grid max-w-4xl gap-7 sm:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/shop/" className="btn-navy">
              {t("shop.viewAll")}
              <ArrowRight className="h-4 w-4 flip-rtl" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FREE RECIPES ── */}
      <section className="section container-luxe">
        <SectionHeading
          eyebrow={t("recipes.eyebrow")}
          title={t("recipes.homeTitle")}
          subtitle={t("recipes.homeBody")}
        />

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.slice(0, 3).map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/recipes/" className="btn-navy">
            {t("recipes.homeCta")}
            <ArrowRight className="h-4 w-4 flip-rtl" />
          </Link>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="section container-luxe">
        <SectionHeading eyebrow={t("reviews.eyebrow")} title={t("reviews.title")} subtitle={t("reviews.rating")} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((review) => (
            <blockquote key={L(review.name)} className="card-luxe flex h-full flex-col p-7">
              <Quote className="h-7 w-7 text-gold/35 flip-rtl" />
              <p className="mt-4 flex-1 text-[14px] leading-relaxed text-navy-800/85">“{L(review.quote)}”</p>

              <div className="mt-6 flex items-center gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>

              <footer className="mt-4 border-t border-border pt-4">
                <p className="font-display text-[15px] text-navy-700">{L(review.name)}</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  {L(review.role)} · {t("reviews.verified")}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ── OFFER ── */}
      <section className="texture-dark relative overflow-hidden">
        <img
          src={brandImages.chefShrimp}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="container-luxe relative z-10 py-20 text-center md:py-28">
          <span className="eyebrow">{t("offer.eyebrow")}</span>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl leading-tight text-ivory md:text-[2.8rem] text-balance">
            {t("offer.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ivory/70">{t("offer.body")}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to={`/shop/${flagship.slug}/`} className="btn-gold">
              {t("offer.cta")}
              <ArrowRight className="h-4 w-4 flip-rtl" />
            </Link>
            <span className="text-[12px] uppercase tracking-[0.14em] text-ivory/50">{t("product.guaranteeValue")}</span>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section container-luxe">
        <SectionHeading eyebrow={t("faq.eyebrow")} title={t("faq.title")} subtitle={t("faq.subtitle")} />

        <Accordion type="single" collapsible className="mx-auto max-w-3xl">
          {faqs.slice(0, 4).map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b border-gold/20">
              <AccordionTrigger className="py-5 text-start font-display text-base text-navy-700 hover:text-gold-600 hover:no-underline">
                {L(faq.q)}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[14px] leading-relaxed text-muted-foreground">
                {L(faq.a)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 text-center">
          <Link to="/faq/" className="btn-outline-gold text-navy-700 hover:text-ink">
            {t("faq.eyebrow")}
            <ArrowRight className="h-4 w-4 flip-rtl" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
