"use client";

import { useTranslations } from "next-intl";
import { Smile, Globe, Trophy } from "lucide-react";

export function GrowthJourney() {
  const t = useTranslations("aboutUsPage");

  const stats = [
    {
      icon: Smile,
      value: t("growth.stat1Value"),
      label: t("growth.stat1Label"),
    },
    {
      icon: Globe,
      value: t("growth.stat2Value"),
      label: t("growth.stat2Label"),
    },
    {
      icon: Trophy,
      value: t("growth.stat3Value"),
      label: t("growth.stat3Label"),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F3F3F3]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold tracking-wider text-[#D28E45]">
              {t("growth.subtitle")}
            </span>
            <div className="w-full h-0.5 bg-[#D28E45] mt-2" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#313639]">
            {t("growth.title1")}{" "}
            <span className="italic text-[#D28E45]">{t("growth.title2")}</span>
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`text-center ${
                  index < stats.length - 1
                    ? "md:border-r md:border-gray-300"
                    : ""
                }`}
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-12 h-12 text-[#D28E45]" strokeWidth={1.5} />
                </div>
                <p className="text-5xl md:text-6xl font-bold text-[#313639] mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
