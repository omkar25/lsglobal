"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { 
  Wheat, ShoppingCart, Leaf, Stethoscope, Pill, Factory, 
  Wrench, Home, Shirt, Package, Building2, Users, Tag, Settings 
} from "lucide-react";

const industries = [
  { key: "agriculture", icon: Wheat },
  { key: "foodFmcg", icon: ShoppingCart },
  { key: "spices", icon: Leaf },
  { key: "medical", icon: Stethoscope },
  { key: "pharmaceutical", icon: Pill },
  { key: "industrial", icon: Factory },
  { key: "engineering", icon: Wrench },
  { key: "handicrafts", icon: Home },
  { key: "textiles", icon: Shirt },
  { key: "packaging", icon: Package },
  { key: "construction", icon: Building2 },
  { key: "consumer", icon: Users },
  { key: "privateLabel", icon: Tag },
  { key: "customManufacturing", icon: Settings },
];

export function IndustriesPage() {
  const t = useTranslations("industriesPage");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-[#313639] py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{t("hero.title")}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{t("hero.subtitle")}</p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.key}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <div className="w-14 h-14 bg-[#D28E45]/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-[#D28E45]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#313639] mb-2">
                    {t(`industries.${industry.key}.title`)}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {t(`industries.${industry.key}.description`)}
                  </p>
                  <ul className="space-y-1">
                    {[1, 2, 3].map((i) => (
                      <li key={i} className="text-sm text-gray-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#D28E45] rounded-full" />
                        {t(`industries.${industry.key}.item${i}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
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
