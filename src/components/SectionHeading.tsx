type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  tone?: "dark" | "light";
  /** A chapter number set big and outlined behind the heading. */
  numeral?: string;
};

const SectionHeading = ({ eyebrow, title, subtitle, align = "center", tone = "dark", numeral }: Props) => {
  const isCenter = align === "center";
  return (
    <div
      data-reveal
      className={`relative ${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-start"} mb-12`}
    >
      {numeral && (
        <span className="chapter-numeral" aria-hidden="true">
          {numeral}
        </span>
      )}
      {eyebrow && <span className={`relative eyebrow ${isCenter ? "" : "eyebrow-start"}`}>{eyebrow}</span>}
      <h2
        className={`relative mt-5 ${
          tone === "light"
            ? "font-poster text-[clamp(2.2rem,8vw,3.8rem)] uppercase leading-[0.95] text-ivory"
            : "text-3xl leading-tight text-navy-700 md:text-[2.6rem]"
        } text-balance`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`relative mt-4 text-[15px] leading-relaxed ${tone === "light" ? "text-ivory/70" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
