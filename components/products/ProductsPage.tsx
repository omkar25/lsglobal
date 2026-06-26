"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { 
  Wheat, Coffee, Leaf, Apple, Fish, Milk, Cookie, Candy,
  Pill, Stethoscope, Shirt, Gem, Palette, Sofa, Wrench, Cog
} from "lucide-react";

const productCategories = [
  { key: "grains", icon: Wheat },
  { key: "spices", icon: Coffee },
  { key: "herbs", icon: Leaf },
  { key: "fruits", icon: Apple },
  { key: "seafood", icon: Fish },
  { key: "dairy", icon: Milk },
  { key: "snacks", icon: Cookie },
  { key: "confectionery", icon: Candy },
  { key: "pharma", icon: Pill },
  { key: "medical", icon: Stethoscope },
  { key: "textiles", icon: Shirt },
  { key: "jewelry", icon: Gem },
  { key: "handicrafts", icon: Palette },
  { key: "furniture", icon: Sofa },
  { key: "tools", icon: Wrench },
  { key: "machinery", icon: Cog },
];

export function ProductsPage() {
  const t = useTranslations("productsPage");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-[#313639] py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{t("hero.title")}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{t("hero.subtitle")}</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#313639] mb-4">{t("categories.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("categories.description")}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {productCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.key}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-6 text-center group hover:bg-[#313639]"
                >
                  <div className="w-12 h-12 bg-[#D28E45]/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#D28E45]/20">
                    <Icon className="w-6 h-6 text-[#D28E45]" />
                  </div>
                  <h3 className="font-bold text-[#313639] group-hover:text-white text-sm">
                    {t(`categories.${category.key}`)}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sourcing Process */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#313639] mb-12">{t("process.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 bg-[#D28E45] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  {step}
                </div>
                <h3 className="font-bold text-[#313639] mb-2">{t(`process.step${step}.title`)}</h3>
                <p className="text-gray-600 text-sm">{t(`process.step${step}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-[#313639]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t("cta.title")}</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">{t("cta.description")}</p>
          <Link
            href="/request-quotation"
            className="inline-block px-8 py-4 bg-[#D28E45] text-white font-semibold rounded-md hover:bg-[#C07D35] transition-colors"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </div>
  );
}
