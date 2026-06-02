"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

export function CommittedSection() {
  const t = useTranslations("aboutUsPage");

  const featuresLeft = [
    t("committed.feature1"),
    t("committed.feature2"),
    t("committed.feature3"),
    t("committed.feature4"),
  ];

  const featuresRight = [
    t("committed.feature5"),
    t("committed.feature6"),
    t("committed.feature7"),
    t("committed.feature8"),
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Subtitle */}
            <div className="inline-block">
              <span className="text-sm font-semibold tracking-wider text-[#D28E45]">
                {t("committed.subtitle")}
              </span>
              <div className="w-full h-0.5 bg-[#D28E45] mt-2" />
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#313639] leading-tight">
              {t("committed.title1")}
              <br />
              <span className="italic text-[#D28E45]">{t("committed.title2")}</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {t("committed.description")}
            </p>

            {/* Left Image - Spices */}
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden mt-6">
              <Image
                src="/images/about-us/about-us-2.png"
                alt="Spices"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            {/* Right Image - Medical Equipment */}
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
              <Image
                src="/images/about-us/about-us-3.png"
                alt="Medical Equipment"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* What We Do Section */}
            <div className="pt-4">
              <h3 className="text-xl font-bold text-[#313639] mb-6">
                {t("committed.whatWeDo")}
              </h3>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {/* Left Column */}
                <div className="space-y-3">
                  {featuresLeft.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#D28E45] shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  {featuresRight.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#D28E45] shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
