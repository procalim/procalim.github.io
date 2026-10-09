import { Download, Headphones, RotateCcw, ShieldCheck } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const TrustStrip = () => {
  const { t } = useLang();
  const items = [
    { Icon: Download, label: t("trust.instant") },
    { Icon: ShieldCheck, label: t("trust.secure") },
    { Icon: RotateCcw, label: t("trust.refund") },
    { Icon: Headphones, label: t("trust.support") },
  ];

  return (
    <div className="border-b border-ink/20 bg-gold-gradient">
      <div className="container-luxe grid grid-cols-2 divide-ink/15 md:grid-cols-4 md:divide-x rtl:md:divide-x-reverse">
        {items.map(({ Icon, label }) => (
          <div key={label} className="flex items-center justify-center gap-2.5 px-3 py-3.5 md:py-5">
            <Icon className="h-4 w-4 shrink-0 text-ink md:h-5 md:w-5" />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink md:text-[11px]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustStrip;
