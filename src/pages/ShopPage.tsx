import Seo from "@/components/Seo";
import ProductCard from "@/components/ProductCard";
import TrustStrip from "@/components/TrustStrip";
import { useLang } from "@/i18n/LanguageContext";
import { products } from "@/data/products";
import { brandImages } from "@/data/site";
import PageHero from "@/components/PageHero";

const ShopPage = () => {
  const { t } = useLang();

  return (
    <>
      <Seo title={t("seo.shop.title")} description={t("seo.shop.desc")} />

      <PageHero
        eyebrow={t("shop.eyebrow")}
        title={t("shop.title")}
        subtitle={t("shop.subtitle")}
        image={brandImages.chefDuck}
        focus="center 70%"
      />

      <TrustStrip />

      {/* Two products — a grid needs no search, filters or sorting. */}
      <section className="section container-luxe">
        <div className="mx-auto grid max-w-4xl gap-7 sm:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ShopPage;
