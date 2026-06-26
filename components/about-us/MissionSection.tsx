"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

const missionPointKeys = ["point1", "point2", "point3", "point4", "point5"] as const;

const serviceKeys = [
  "service1", "service2", "service3", "service4", "service5", "service6",
  "service7", "service8", "service9", "service10", "service11", "service12"
] as const;

export function MissionSection() {
  const t = useTranslations("aboutUsPage");
  const content = useTranslations("aboutUsPage.content");

  return (
    <>
      {/* About LS Global Traders Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <div className="inline-block mb-4">
                <span className="text-sm font-semibold tracking-wider text-[#D28E45]">
                  {content("aboutTitle")}
                </span>
                <div className="w-full h-0.5 bg-[#D28E45] mt-2" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#313639] leading-tight">
                {content("aboutTagline")}
              </h2>
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>{content("story1")}</p>
              <p>{content("story2")}</p>
              <p>{content("story3")}</p>
              <p>{content("story4")}</p>
              <p>{content("story5")}</p>
              <p>{content("story6")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-[#313639]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div className="relative">
              <div className="relative aspect-square max-w-md mx-auto lg:mx-0 border-4 border-[#D28E45] overflow-hidden">
                <Image
                  src="/images/about-us/about-us-4.png"
                  alt="Our Mission"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {t("missionNew.title")}
                </h2>
                <div className="w-16 h-1 bg-[#D28E45]" />
              </div>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed">
                {t("missionNew.description")}
              </p>

              {/* Mission Points */}
              <div className="space-y-3">
                {missionPointKeys.map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#D28E45] shrink-0" />
                    <span className="text-white">{t(`missionNew.${key}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#313639] mb-2">
              {t("coreServices.title")}
            </h2>
            <div className="w-24 h-1 bg-[#D28E45] mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {serviceKeys.map((key) => (
              <div
                key={key}
                className="bg-[#F3F3F3] p-4 rounded-lg text-center hover:bg-[#313639] hover:text-white transition-colors group"
              >
                <p className="text-sm font-medium text-[#313639] group-hover:text-white">
                  {t(`coreServices.${key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
