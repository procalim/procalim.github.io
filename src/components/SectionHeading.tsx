type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  tone?: "dark" | "light";
};

const SectionHeading = ({ eyebrow, title, subtitle, align = "center", tone = "dark" }: Props) => {
  const isCenter = align === "center";
  return (
    <div data-reveal className={`${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-start"} mb-12`}>
      {eyebrow && <span className={`eyebrow ${isCenter ? "" : "eyebrow-start"}`}>{eyebrow}</span>}
      <h2
        className={`mt-5 text-3xl leading-tight md:text-[2.6rem] ${
          tone === "light" ? "text-ivory" : "text-navy-700"
        } text-balance`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-[15px] leading-relaxed ${tone === "light" ? "text-ivory/70" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
