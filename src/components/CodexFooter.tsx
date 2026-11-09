import { localePath } from "@/i18n/locale-path";
import { useLang } from "@/i18n/LanguageContext";

/**
 * The footer every Digistore24 page shares: privacy, terms and the legal
 * information Digistore24 requires, and no link to any other checkout.
 * تذييل صفحات Digistore24: الخصوصية والشروط والمعلومات القانونية فقط.
 */
const CodexFooter = ({ note }: { note?: string }) => {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const links: [string, string][] = [
    ["/codex/privacy/", isAr ? "الخصوصية" : "Privacy"],
    ["/codex/terms/", isAr ? "الشروط" : "Terms"],
    ["/codex/legal/", isAr ? "المعلومات القانونية" : "Legal information"],
  ];

  return (
    <footer className="border-t border-border py-10 text-center text-[12px] text-muted-foreground">
      {note && <p className="mb-3">{note}</p>}
      <p className="flex flex-wrap justify-center gap-4">
        {links.map(([path, label]) => (
          <a key={path} href={localePath(path, lang)} className="hover:text-gold">
            {label}
          </a>
        ))}
      </p>
      <p className="mt-3">© The Edible Codex</p>
    </footer>
  );
};

export default CodexFooter;
