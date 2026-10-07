import { Link } from "@/components/LocalLink";
import Seo from "@/components/Seo";
import { localePath } from "@/i18n/locale-path";
import { useLang } from "@/i18n/LanguageContext";
import { videoPoster, videos } from "@/data/videos";
import { site } from "@/data/site";

/** The index of the watch pages. */
const VideosPage = () => {
  const { t, L, lang } = useLang();

  return (
    <>
      <Seo
        title={t("seo.videos.title")}
        description={t("seo.videos.desc")}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: t("seo.videos.title"),
          description: t("seo.videos.desc"),
          url: `${site.url}${localePath("/videos/", lang)}`,
        }}
      />

      <section className="section container-luxe">
        {/* Written out rather than via SectionHeading, which always renders an
            h2 — an index page needs an h1 of its own. */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold-600">
            {t("videos.eyebrow")}
          </p>
          <h1 className="mt-3 font-display text-3xl text-navy-700 md:text-4xl">
            {t("videos.title")}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {t("videos.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {videos.map((video) => (
            <Link key={video.slug} to={`/videos/${video.slug}/`} className="group">
              <img
                src={videoPoster(video)}
                alt={L(video.title)}
                loading="lazy"
                className="aspect-[9/16] w-full rounded-lg border border-gold/20 object-cover transition-opacity group-hover:opacity-90"
              />
              <h2 className="mt-3 font-display text-[15px] leading-snug text-navy-700">
                {L(video.title)}
              </h2>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
                {L(video.description)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default VideosPage;
