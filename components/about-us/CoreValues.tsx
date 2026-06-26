"use client";

import { useTranslations } from "next-intl";
import {
  Shield,
  Users,
  TrendingUp,
  Award,
  Globe,
  Lightbulb,
  Handshake,
  Leaf,
} from "lucide-react";

const valueIcons = [
  Shield,
  Users,
  TrendingUp,
  Award,
  Globe,
  Lightbulb,
  Handshake,
  Leaf,
];

export function CoreValues() {
  const t = useTranslations("aboutUsPage");

  const values = [
    {
      title: t("coreValues.value1Title"),
      description: t("coreValues.value1Desc"),
    },
    {
      title: t("coreValues.value2Title"),
      description: t("coreValues.value2Desc"),
    },
    {
      title: t("coreValues.value3Title"),
      description: t("coreValues.value3Desc"),
    },
    {
      title: t("coreValues.value4Title"),
      description: t("coreValues.value4Desc"),
    },
    {
      title: t("coreValues.value5Title"),
      description: t("coreValues.value5Desc"),
    },
    {
      title: t("coreValues.value6Title"),
      description: t("coreValues.value6Desc"),
    },
    {
      title: t("coreValues.value7Title"),
      description: t("coreValues.value7Desc"),
    },
    {
      title: t("coreValues.value8Title"),
      description: t("coreValues.value8Desc"),
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
              {t("coreValues.subtitle")}
            </span>
            <div className="w-full h-0.5 bg-[#D28E45] mt-2" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#313639]">
            {t("coreValues.title1")}{" "}
            <span className="italic text-[#D28E45]">{t("coreValues.title2")}</span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-3xl">
            {t("coreValues.description")}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = valueIcons[index];
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D28E45]/10 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-[#D28E45]" />
                </div>
                <h3 className="text-lg font-bold text-[#313639] mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
}
