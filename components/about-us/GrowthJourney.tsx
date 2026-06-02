"use client";

import { useTranslations } from "next-intl";
import { Smile, Globe, Trophy } from "lucide-react";

const businessSolutions = [
  { icon: "🌍", key: "solution1" },
  { icon: "🔍", key: "solution2" },
  { icon: "🏥", key: "solution3" },
  { icon: "🧤", key: "solution4" },
  { icon: "🩹", key: "solution5" },
  { icon: "📦", key: "solution6" },
  { icon: "📋", key: "solution7" },
  { icon: "🤝", key: "solution8" },
  { icon: "🏭", key: "solution9" },
  { icon: "🌾", key: "solution10" },
  { icon: "📈", key: "solution11" },
  { icon: "🌐", key: "solution12" },
];

export function GrowthJourney() {
  const t = useTranslations("aboutUsPage");
  const content = useTranslations("aboutUsPage.content");

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
    <>
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
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

    {/* Core Business Solutions */}
    <section className="py-16 md:py-24 bg-[#F3F3F3]">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold tracking-wider text-[#D28E45]">
              {content("solutionsTitle")}
            </span>
            <div className="w-full h-0.5 bg-[#D28E45] mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {businessSolutions.map((solution) => (
            <div key={solution.key} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <span className="text-2xl">{solution.icon}</span>
                <div>
                  <h3 className="font-bold text-[#313639] mb-2">
                    {content(`solutions.${solution.key}.title`)}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {content(`solutions.${solution.key}.desc`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
