"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

const reasonKeys = [
  "reason1", "reason2", "reason3", "reason4", "reason5", "reason6",
  "reason7", "reason8", "reason9", "reason10", "reason11", "reason12"
] as const;

export function WhyChooseUs() {
  const t = useTranslations("aboutUsPage.whyChooseUs");

  return (
    <section className="py-16 md:py-24 bg-[#313639]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {t("title")}
          </h2>
          <div className="w-24 h-1 bg-[#D28E45] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {reasonKeys.map((key) => (
            <div key={key} className="flex items-center gap-3 bg-white/5 p-4 rounded-lg">
              <Check className="w-5 h-5 text-[#D28E45] shrink-0" />
              <span className="text-white text-sm">{t(key)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
