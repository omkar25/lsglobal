"use client";

import { 
  Wheat, 
  ShoppingCart, 
  Leaf, 
  Stethoscope, 
  Pill, 
  Factory, 
  Wrench, 
  Home, 
  Shirt, 
  Package, 
  Building2, 
  Users, 
  Tag, 
  Settings 
} from "lucide-react";
import { useTranslations } from "next-intl";

const industries = [
  { key: "industry1", icon: Wheat },
  { key: "industry2", icon: ShoppingCart },
  { key: "industry3", icon: Leaf },
  { key: "industry4", icon: Stethoscope },
  { key: "industry5", icon: Pill },
  { key: "industry6", icon: Factory },
  { key: "industry7", icon: Wrench },
  { key: "industry8", icon: Home },
  { key: "industry9", icon: Shirt },
  { key: "industry10", icon: Package },
  { key: "industry11", icon: Building2 },
  { key: "industry12", icon: Users },
  { key: "industry13", icon: Tag },
  { key: "industry14", icon: Settings },
] as const;

export function IndustriesWeServe() {
  const t = useTranslations("aboutUsPage.industriesWeServe");

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#313639] mb-2">
            {t("title")}
          </h2>
          <div className="w-24 h-1 bg-[#D28E45] mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.key}
                className="bg-[#F3F3F3] p-6 rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <Icon className="w-8 h-8 text-[#D28E45] mx-auto mb-3" />
                <p className="text-sm font-medium text-[#313639]">{t(industry.key)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
