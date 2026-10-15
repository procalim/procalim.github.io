import { Link } from "@/components/LocalLink";
import Seo from "@/components/Seo";
import { localePath } from "@/i18n/locale-path";
import { useLang } from "@/i18n/LanguageContext";
import { videoPoster, videos } from "@/data/videos";
import { site } from "@/data/site";
import PageHero from "@/components/PageHero";

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

      <PageHero
        eyebrow={t("videos.eyebrow")}
        title={t("videos.title")}
        subtitle={t("videos.subtitle")}
        image={videoPoster(videos[1])}
        focus="center 40%"
      />

      <section className="section container-luxe">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {videos.map((video) => (
            <Link key={video.slug} to={`/videos/${video.slug}/`} className="group">
              <img
                src={videoPoster(video)}
                alt={L(video.title)}
                loading="lazy"
                className="aspect-[9/16] w-full rounded-lg border border-gold/20 object-cover transition-opacity group-hover:opacity-90"
              />
              <h2 className="mt-3 font-display text-[15px] leading-snug text-ivory">
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
