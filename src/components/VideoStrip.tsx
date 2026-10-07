import { useRef, useState } from "react";
import { Link } from "@/components/LocalLink";
import { Play } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { videos, videoClip, videoPoster, type SiteVideo } from "@/data/videos";

/**
 * One clip. The poster carries the weight until the visitor presses play, so
 * four videos cost four small JPEGs on load rather than eight megabytes —
 * `preload="none"` keeps the files themselves off the wire until asked for.
 * الفيديو لا يُحمَّل إلا عند الضغط، فلا يبطئ فتح الصفحة.
 */
const VideoCard = ({ video }: { video: SiteVideo }) => {
  const { L } = useLang();
  const ref = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    setStarted(true);
    void ref.current?.play();
  };

  return (
    <figure className="group">
      <div className="relative overflow-hidden rounded-lg border border-gold/20 bg-ink shadow-sm">
        <video
          ref={ref}
          className="aspect-[9/16] w-full object-cover"
          poster={videoPoster(video)}
          preload="none"
          playsInline
          controls={started}
          onPlay={() => setStarted(true)}
        >
          <source src={videoClip(video)} type="video/mp4" />
        </video>

        {!started && (
          <button
            type="button"
            onClick={play}
            aria-label={L(video.title)}
            className="absolute inset-0 flex items-center justify-center bg-ink/25 transition-colors hover:bg-ink/10"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ivory/95 shadow-lg transition-transform group-hover:scale-105">
              <Play className="ml-0.5 h-5 w-5 fill-navy text-navy" />
            </span>
          </button>
        )}
      </div>

      <figcaption className="mt-3">
        {/* The title links to the clip's own watch page, which is where it can
            be indexed and where the technique is written out. */}
        <h3 className="font-display text-[15px] leading-snug text-navy-700">
          <Link to={`/videos/${video.slug}/`} className="transition-colors hover:text-gold-600">
            {L(video.title)}
          </Link>
        </h3>
        <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
          {L(video.description)}
        </p>
      </figcaption>
    </figure>
  );
};

/** The technique reel under the hero. */
const VideoStrip = () => {
  const { t } = useLang();

  return (
    <section className="border-b border-border bg-white py-16 md:py-20">
      <div className="container-luxe">
        <p className="text-center text-[11px] uppercase tracking-[0.28em] text-gold-600">
          {t("videos.eyebrow")}
        </p>
        <h2 className="mt-3 text-center font-display text-3xl text-navy-700 md:text-4xl">
          {t("videos.title")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] leading-relaxed text-muted-foreground">
          {t("videos.subtitle")}
        </p>

        <div className="mt-10 grid grid-cols-2 gap-5 md:mt-12 md:grid-cols-4 md:gap-6">
          {videos.map((video) => (
            <VideoCard key={video.slug} video={video} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/videos/" className="btn-outline-gold">
            {t("videos.all")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VideoStrip;
