import { Link } from "@/components/LocalLink";
import { MessageCircle } from "lucide-react";
import Seo from "@/components/Seo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLang } from "@/i18n/LanguageContext";
import { faqs } from "@/data/products";
import { site, whatsappLink } from "@/data/site";
import PageHero from "@/components/PageHero";

const FaqPage = () => {
  const { t, L, lang } = useLang();

  return (
    <>
      <Seo
        title={t("seo.faq.title")}
        description={t("seo.faq.desc")}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: L(faq.q),
            acceptedAnswer: { "@type": "Answer", text: L(faq.a) },
          })),
        }}
      />

      <PageHero eyebrow={t("faq.eyebrow")} title={t("faq.title")} subtitle={t("faq.subtitle")} />

      <section className="section container-luxe">
        <Accordion type="single" collapsible className="mx-auto max-w-3xl">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} data-reveal={i} value={`all-faq-${i}`} className="border-b border-gold/20">
              <AccordionTrigger className="py-5 text-start font-display text-base text-ivory hover:text-gold hover:no-underline md:text-lg">
                {L(faq.q)}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-[14px] leading-relaxed text-muted-foreground">
                {L(faq.a)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mx-auto mt-14 max-w-3xl rounded-sm border border-gold/25 bg-ink p-8 text-center">
          <h2 className="font-display text-xl text-ivory">{t("contact.title")}</h2>
          <p className="mt-3 text-[14px] text-muted-foreground">{t("contact.subtitle")}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/contact/" className="btn-navy">
              {t("contact.eyebrow")}
            </Link>
            <a
              href={whatsappLink(
                lang === "ar" ? `مرحباً، لدي سؤال عن ${site.brand.nameAr}` : `Hello, I have a question about ${site.brand.name}`,
              )}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-outline-gold text-ivory hover:text-ink"
            >
              <MessageCircle className="h-4 w-4" />
              {t("contact.whatsapp")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqPage;
