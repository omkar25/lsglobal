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
  const content = useTranslations("aboutUsPage.content");

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

    {/* Why Choose Us */}
    <section className="py-16 md:py-24 bg-[#F3F3F3]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-8">
            <span className="text-sm font-semibold tracking-wider text-[#D28E45]">
              {content("whyChooseTitle")}
            </span>
            <div className="w-full h-0.5 bg-[#D28E45] mt-2" />
          </div>

          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p className="text-lg font-medium text-[#313639]">{content("whyChoose.intro")}</p>
            <div className="flex flex-wrap justify-center gap-4 py-4">
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-[#313639] shadow-sm">{content("whyChoose.trust")}</span>
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-[#313639] shadow-sm">{content("whyChoose.relationships")}</span>
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-[#313639] shadow-sm">{content("whyChoose.commitment")}</span>
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-[#313639] shadow-sm">{content("whyChoose.experience")}</span>
              <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-[#313639] shadow-sm">{content("whyChoose.integrity")}</span>
            </div>
          </div>

          <div className="mt-8 space-y-4 text-gray-600 leading-relaxed">
            <p>{content("whyChoose.desc1")}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-medium text-[#D28E45]">{content("whyChoose.connect")}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-medium text-[#D28E45]">{content("whyChoose.build")}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-medium text-[#D28E45]">{content("whyChoose.strengthen")}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-medium text-[#D28E45]">{content("whyChoose.support")}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-medium text-[#D28E45]">{content("whyChoose.create")}</p>
              </div>
            </div>
            <p>{content("whyChoose.desc2")}</p>
          </div>
        </div>
      </div>
    </section>

    {/* Leadership Philosophy */}
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-8">
            <span className="text-sm font-semibold tracking-wider text-[#D28E45]">
              {content("leadershipTitle")}
            </span>
            <div className="w-full h-0.5 bg-[#D28E45] mt-2" />
          </div>

          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>{content("leadership.desc1")}</p>
            <p>{content("leadership.desc2")}</p>
            <blockquote className="text-xl md:text-2xl font-bold text-[#D28E45] italic py-6 border-l-4 border-[#D28E45] pl-6 text-left bg-[#F3F3F3] rounded-r-lg">
              &ldquo;{content("leadership.quote")}&rdquo;
            </blockquote>
            <p className="text-lg font-medium text-[#313639]">
              {content("leadership.tagline")}
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
