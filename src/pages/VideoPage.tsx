import { useParams } from "react-router-dom";
import { Link } from "@/components/LocalLink";
import { ArrowRight, Check, ChevronLeft } from "lucide-react";
import Seo from "@/components/Seo";
import { videoGraph } from "@/lib/structured-data";
import BuyButton from "@/components/BuyButton";
import { localePath } from "@/i18n/locale-path";
import { useLang } from "@/i18n/LanguageContext";
import { getProduct } from "@/data/products";
import { getVideo, videoClip, videoPoster, videos } from "@/data/videos";
import { site } from "@/data/site";

/**
 * A watch page: one clip, and the page exists for that clip.
 *
 * Google indexes a video only where it is the point of the page — on the home
 * page the same four clips are "supplementary content" and it skips them, and
 * it only ever picks one video per page anyway. Each clip gets its own address
 * so each can be found on its own.
 * جوجل يفهرس الفيديو فقط إذا كانت الصفحة مخصّصة له، لذلك لكل مقطع صفحته.
 */
const VideoPage = () => {
  const { slug } = useParams();
  const { t, L, lang } = useLang();
  const video = getVideo(slug);
  const flagship = getProduct("the-edible-codex")!;

  if (!video) {
    return (
      <div className="container-luxe section text-center">
        <Seo title={t("videos.notFound")} description={t("videos.notFound")} />
        <h1 className="font-display text-3xl text-navy-700">{t("videos.notFound")}</h1>
        <Link to="/videos/" className="btn-gold mt-8 inline-flex">
          {t("videos.all")}
        </Link>
      </div>
    );
  }

  const others = videos.filter((other) => other.slug !== video.slug);

  return (
    <>
      <Seo
        title={L(video.title)}
        description={L(video.description)}
        image={videoPoster(video)}
        jsonLd={videoGraph({
          trail: [
            { name: t("nav.home"), path: localePath("/", lang) },
            { name: t("videos.nav"), path: localePath("/videos", lang) },
            { name: L(video.title), path: localePath(`/videos/${video.slug}`, lang) },
          ],
          name: L(video.title),
          description: L(video.description),
          thumbnail: videoPoster(video),
          clip: videoClip(video),
          duration: video.duration,
          lang,
        })}
      />

      <div className="border-b border-border bg-white">
        <div className="container-luxe flex items-center gap-2 py-4 text-[12px] text-muted-foreground">
          <Link to="/" className="hover:text-gold-600">
            {t("nav.home")}
          </Link>
          <ChevronLeft className="h-3.5 w-3.5 rotate-180 flip-rtl" />
          <Link to="/videos/" className="hover:text-gold-600">
            {t("videos.nav")}
          </Link>
          <ChevronLeft className="h-3.5 w-3.5 rotate-180 flip-rtl" />
          <span className="truncate text-navy-700">{L(video.title)}</span>
        </div>
      </div>

      <section className="section container-luxe">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-14">
          {/* The clip leads the page — it is what the page is for. */}
          <video
            className="aspect-[9/16] w-full rounded-lg border border-gold/25 bg-ink object-cover shadow-luxe"
            poster={videoPoster(video)}
            preload="metadata"
            playsInline
            controls
          >
            <source src={videoClip(video)} type="video/mp4" />
          </video>

          <div>
            <p className="eyebrow eyebrow-start">{t("videos.eyebrow")}</p>
            <h1 className="mt-5 font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-tight text-navy-700">
              {L(video.title)}
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              {L(video.description)}
            </p>

            <h2 className="mt-10 font-display text-xl text-navy-700">{t("videos.why")}</h2>
            <ul className="mt-5 space-y-4">
              {(lang === "ar" ? video.notes.ar : video.notes.en).map((note) => (
                <li key={note} className="flex gap-3 text-[15px] leading-relaxed text-navy-800/85">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold-600" />
                  {note}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-sm border border-gold/25 bg-ivory p-6">
              <p className="text-[15px] leading-relaxed text-navy-800/85">{t("videos.bookPitch")}</p>
              <div className="mt-5">
                <BuyButton product={flagship} withPrice />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory-dim/50 section">
        <div className="container-luxe">
          <h2 className="font-display text-2xl text-navy-700">{t("videos.more")}</h2>
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3">
            {others.map((other) => (
              <Link key={other.slug} to={`/videos/${other.slug}/`} className="group">
                <img
                  src={videoPoster(other)}
                  alt={L(other.title)}
                  loading="lazy"
                  className="aspect-[9/16] w-full rounded-lg border border-gold/20 object-cover transition-opacity group-hover:opacity-90"
                />
                <h3 className="mt-3 font-display text-[15px] leading-snug text-navy-700">
                  {L(other.title)}
                </h3>
              </Link>
            ))}
          </div>

          <Link to="/videos/" className="btn-outline-gold mt-10 inline-flex">
            {t("videos.all")}
            <ArrowRight className="h-4 w-4 flip-rtl" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default VideoPage;
