import { useRef } from "react";
import { Link } from "@/components/LocalLink";
import { ArrowRight, BookOpen, ChefHat, Check, ChevronsLeftRight, Droplets, Infinity as InfinityIcon, Quote, Star } from "lucide-react";
import Seo from "@/components/Seo";
import { localePath } from "@/i18n/locale-path";
import SectionHeading from "@/components/SectionHeading";
import TrustStrip from "@/components/TrustStrip";
import VideoStrip from "@/components/VideoStrip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatPrice, useLang } from "@/i18n/LanguageContext";
import { faqs, getProduct, testimonials } from "@/data/products";
import BuyButton from "@/components/BuyButton";
import { bookPages, brandImages, site } from "@/data/site";
import PlateStory from "@/components/cinematic/PlateStory";
import BookFlip3D from "@/components/cinematic/BookFlip3D";
import GoldBand from "@/components/cinematic/GoldBand";
import RecipeReel from "@/components/cinematic/RecipeReel";
import SauceFeature from "@/components/cinematic/SauceFeature";
import { useReveal } from "@/hooks/use-reveal";
import Picture from "@/components/Picture";

const HomePage = () => {
  const { t, L, lang } = useLang();
  const flagship = getProduct("the-edible-codex")!;
  const page = useRef<HTMLDivElement>(null);
  useReveal(page);

  const valueProps = [
    { Icon: ChefHat, title: t("value.1.title"), body: t("value.1.body") },
    { Icon: BookOpen, title: t("value.2.title"), body: t("value.2.body") },
    { Icon: Droplets, title: t("value.3.title"), body: t("value.3.body") },
    { Icon: InfinityIcon, title: t("value.4.title"), body: t("value.4.body") },
  ];

  return (
    <div ref={page} className="bg-ink">
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
          url: `${site.url}${localePath("/", lang)}`,
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

      {/* ── HERO · the plates, scene by scene as the visitor scrolls ── */}
      <PlateStory flagshipPath={`/shop/${flagship.slug}/`} />

      <GoldBand />

      <TrustStrip />

      {/* ── INSIDE THE BOOK · one plate per scroll ── */}
      <RecipeReel />

      {/* ── THE FIVE SAUCES · the free guide ── */}
      <SauceFeature />

      <VideoStrip />

      <div className="gold-divider" aria-hidden="true" />

      {/* ── THE CHEF ── */}
      <section className="texture-dark overflow-hidden py-14 md:py-20">
        <div className="container-luxe grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div data-reveal className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="absolute -inset-3 rounded-sm border border-gold/25" aria-hidden="true" />
            <Picture
              src={brandImages.chefPortrait}
              width={1100}
              height={1473}
              alt={lang === "ar" ? site.brand.chefAr : site.brand.chefEn}
              loading="lazy"
              className="relative aspect-[4/5] w-full rounded-sm object-cover object-top shadow-luxe"
            />
          </div>

          <div data-reveal="2">
            <span className="eyebrow eyebrow-start">{t("chef.eyebrow")}</span>
            <h2 className="font-poster mt-4 text-[clamp(2.4rem,8vw,5rem)] uppercase leading-[0.95] text-ivory">
              {lang === "ar" ? site.brand.chefAr : site.brand.chefEn}
            </h2>
            <blockquote className="mt-6 border-s-2 border-gold ps-5 font-display text-xl leading-relaxed text-ivory/90 md:text-2xl">
              “{t("hero.portrait.line")}”
            </blockquote>
            <p className="mt-4 text-[12px] uppercase tracking-[0.16em] text-gold/80">{t("hero.portrait.brand")}</p>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-gold/20 pt-8">
              {[
                { value: "261", label: t("hero.stat.recipes") },
                { value: "100", label: t("hero.stat.bonus") },
                { value: "12K+", label: t("hero.stat.readers") },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="font-poster text-4xl text-gold md:text-5xl">{stat.value}</dt>
                  <dd className="mt-1.5 text-[11px] uppercase leading-relaxed tracking-[0.1em] text-ivory/70">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>

            <Link to="/about/" className="btn-outline-gold mt-10">
              {t("chef.cta")}
              <ArrowRight className="h-4 w-4 flip-rtl" />
            </Link>
          </div>
        </div>
      </section>

      <div className="gold-divider" aria-hidden="true" />

      {/* ── VALUE PROPS ── */}
      <section className="texture-navy py-14 md:py-20">
        <div className="container-luxe">
          <SectionHeading
            eyebrow={t("featured.eyebrow")}
            title={t("value.title")}
            subtitle={t("value.subtitle")}
            tone="light"
            numeral="01"
          />

          <div className="-mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-gold/30 bg-gold/30 lg:grid-cols-4">
            {valueProps.map(({ Icon, title, body }, i) => (
              <div key={title} data-reveal={i + 1} className="group bg-ink/90 p-4 transition-colors duration-300 hover:bg-navy-800 md:p-8">
                <span className="grid h-10 w-10 place-items-center rounded-sm bg-gold-gradient text-ink md:h-12 md:w-12">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-[15px] text-gold md:mt-6 md:text-lg">{title}</h3>
                <p className="mt-2 text-[12px] leading-relaxed text-ivory/65 md:mt-3 md:text-[13px]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLAGSHIP · the book opens, then the offer ── */}
      <BookFlip3D />

      <section className="texture-navy pb-14 pt-2 md:pb-20 md:pt-6">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-2">
          <div className="relative order-2 hidden lg:order-1 lg:block">
            <div className="absolute -inset-4 rounded-sm border border-gold/20" aria-hidden="true" />
            <Picture
              src={bookPages.onScreen}
              alt={L(flagship.title)}
              loading="lazy"
              className="relative w-full rounded-sm object-cover shadow-luxe"
            />
          </div>

          <div data-reveal className="order-1 lg:order-2">
            <span className="eyebrow eyebrow-start">{t("featured.eyebrow")}</span>
            <h2 className="mt-5 font-display text-3xl leading-tight text-ivory md:text-[2.7rem]">
              {t("featured.title")}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ivory/70">{t("featured.body")}</p>

            <ul className="mt-6 space-y-3">
              {["featured.bullet.1", "featured.bullet.2", "featured.bullet.3", "featured.bullet.4"].map((key) => (
                <li key={key} className="flex items-start gap-3 text-[14px] text-ivory/85">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                    <Check className="h-3 w-3" />
                  </span>
                  {t(key as "featured.bullet.1")}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-6">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl tabular-nums text-gold">
                  {formatPrice(flagship.price, lang, site.currency.symbol)}
                </span>
                {flagship.compareAt && (
                  <span className="text-lg text-ivory/60 line-through tabular-nums">
                    {formatPrice(flagship.compareAt, lang, site.currency.symbol)}
                  </span>
                )}
              </div>
              <BuyButton product={flagship} />
            </div>
          </div>
        </div>
      </section>

      <div className="gold-divider" aria-hidden="true" />

      {/* ── REVIEWS · swiped sideways on a phone rather than stacked ── */}
      <section className="texture-dark py-14 md:py-20">
        <div className="container-luxe">
          <SectionHeading eyebrow={t("reviews.eyebrow")} title={t("reviews.title")} subtitle={t("reviews.rating")} tone="light" numeral="02" />
          <p className="-mt-8 mb-5 flex items-center justify-center gap-2 text-[12px] uppercase tracking-[0.14em] text-gold/85 md:hidden">
            <ChevronsLeftRight className="h-4 w-4" aria-hidden="true" />
            {t("reviews.swipe")}
          </p>
        </div>

        <div className="-mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:container-luxe md:grid md:grid-cols-2 md:gap-6 md:overflow-visible lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {testimonials.map((review, i) => (
            <blockquote
              key={L(review.name)}
              data-reveal={Math.min(i, 3)}
              className="flex w-[82%] shrink-0 snap-center flex-col rounded-sm border border-gold/25 bg-navy-800/60 p-6 md:w-auto"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-[14px] leading-relaxed text-ivory/85">“{L(review.quote)}”</p>
              <footer className="mt-5 flex items-center gap-3 border-t border-gold/15 pt-4">
                <Quote className="h-5 w-5 shrink-0 text-gold/50 flip-rtl" />
                <div>
                  <p className="font-display text-[14px] text-gold">{L(review.name)}</p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-ivory/65">
                    {L(review.role)} · {t("reviews.verified")}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ── OFFER ── */}
      <section className="relative overflow-hidden border-y border-gold/40 bg-ink">
        <Picture
          src={brandImages.chefShrimp}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="container-luxe relative z-10 py-16 text-center md:py-24">
          <span data-reveal className="eyebrow">{t("offer.eyebrow")}</span>
          <h2 className="font-poster mx-auto mt-6 max-w-3xl text-[clamp(2.2rem,7vw,4.4rem)] uppercase leading-[0.95] text-ivory text-balance">
            {t("offer.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ivory/70">{t("offer.body")}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to={`/shop/${flagship.slug}/`} className="btn-gold">
              {t("offer.cta")}
              <ArrowRight className="h-4 w-4 flip-rtl" />
            </Link>
            <span className="text-[12px] uppercase tracking-[0.14em] text-ivory/70">{t("product.guaranteeValue")}</span>
          </div>
        </div>
      </section>

      <div className="gold-divider" aria-hidden="true" />

      {/* ── FAQ ── */}
      <section className="texture-navy py-14 md:py-20">
        <div className="container-luxe">
          <SectionHeading eyebrow={t("faq.eyebrow")} title={t("faq.title")} subtitle={t("faq.subtitle")} tone="light" numeral="03" />

          <Accordion type="single" collapsible className="mx-auto -mt-4 max-w-3xl">
            {faqs.slice(0, 4).map((faq, i) => (
              <AccordionItem key={i} data-reveal={i} value={`faq-${i}`} className="border-b border-gold/25">
                <AccordionTrigger className="py-5 text-start font-display text-base text-ivory hover:text-gold hover:no-underline [&>svg]:text-gold">
                  {L(faq.q)}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[14px] leading-relaxed text-ivory/70">
                  {L(faq.a)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 text-center">
            <Link to="/faq/" className="btn-outline-gold">
              {t("faq.eyebrow")}
              <ArrowRight className="h-4 w-4 flip-rtl" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
