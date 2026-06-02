"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

export function AboutContent() {
  const t = useTranslations("aboutUsPage.content");

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

  const industries = [
    "🏥", "🏭", "🏢", "🏛️", "🌾", "🧤", "📦", "🌍", "🛒"
  ];

  const advantages = Array.from({ length: 20 }, (_, i) => `advantage${i + 1}`);

  return (
    <div className="bg-white">
      {/* About LS Global Traders Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="text-sm font-semibold tracking-wider text-[#D28E45]">
                  {t("aboutTitle")}
                </span>
                <div className="w-full h-0.5 bg-[#D28E45] mt-2" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#313639] leading-tight">
                {t("aboutTagline")}
              </h2>
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>{t("story1")}</p>
              <p>{t("story2")}</p>
              <p>{t("story3")}</p>
              <p>{t("story4")}</p>
              <p>{t("story5")}</p>
              <p>{t("story6")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Business Solutions */}
      <section className="py-16 md:py-24 bg-[#F3F3F3]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold tracking-wider text-[#D28E45]">
                {t("solutionsTitle")}
              </span>
              <div className="w-full h-0.5 bg-[#D28E45] mt-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {businessSolutions.map((solution) => (
              <div key={solution.key} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{solution.icon}</span>
                  <div>
                    <h3 className="font-bold text-[#313639] mb-2">
                      {t(`solutions.${solution.key}.title`)}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t(`solutions.${solution.key}.desc`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold tracking-wider text-[#D28E45]">
                {t("industriesTitle")}
              </span>
              <div className="w-full h-0.5 bg-[#D28E45] mt-2" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {industries.map((icon, index) => (
              <div key={index} className="bg-[#F3F3F3] p-4 rounded-lg text-center">
                <span className="text-2xl mb-2 block">{icon}</span>
                <p className="text-sm font-medium text-[#313639]">
                  {t(`industries.industry${index + 1}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-16 md:py-24 bg-[#313639]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold tracking-wider text-[#D28E45]">
                {t("advantagesTitle")}
              </span>
              <div className="w-full h-0.5 bg-[#D28E45] mt-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {advantages.map((key) => (
              <div key={key} className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#D28E45] shrink-0" />
                <span className="text-white text-sm">{t(`advantages.${key}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-8">
              <span className="text-sm font-semibold tracking-wider text-[#D28E45]">
                {t("whyChooseTitle")}
              </span>
              <div className="w-full h-0.5 bg-[#D28E45] mt-2" />
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p className="text-lg font-medium text-[#313639]">{t("whyChoose.intro")}</p>
              <p className="italic">{t("whyChoose.trust")}</p>
              <p className="italic">{t("whyChoose.relationships")}</p>
              <p className="italic">{t("whyChoose.commitment")}</p>
              <p className="italic">{t("whyChoose.experience")}</p>
              <p className="italic">{t("whyChoose.integrity")}</p>
            </div>

            <div className="mt-8 space-y-4 text-gray-600 leading-relaxed">
              <p>{t("whyChoose.desc1")}</p>
              <p className="font-medium text-[#313639]">{t("whyChoose.connect")}</p>
              <p className="font-medium text-[#313639]">{t("whyChoose.build")}</p>
              <p className="font-medium text-[#313639]">{t("whyChoose.strengthen")}</p>
              <p className="font-medium text-[#313639]">{t("whyChoose.support")}</p>
              <p className="font-medium text-[#313639]">{t("whyChoose.create")}</p>
              <p>{t("whyChoose.desc2")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Philosophy */}
      <section className="py-16 md:py-24 bg-[#F3F3F3]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-8">
              <span className="text-sm font-semibold tracking-wider text-[#D28E45]">
                {t("leadershipTitle")}
              </span>
              <div className="w-full h-0.5 bg-[#D28E45] mt-2" />
            </div>

            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>{t("leadership.desc1")}</p>
              <p>{t("leadership.desc2")}</p>
              <blockquote className="text-xl md:text-2xl font-bold text-[#D28E45] italic py-6">
                &ldquo;{t("leadership.quote")}&rdquo;
              </blockquote>
              <p className="text-lg font-medium text-[#313639]">
                {t("leadership.tagline")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
