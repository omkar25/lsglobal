"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

const industries = [
  "🏥", "🏭", "🏢", "🏛️", "🌾", "🧤", "📦", "🌍", "🛒"
];

const advantages = Array.from({ length: 20 }, (_, i) => `advantage${i + 1}`);

export function VisionSection() {
  const t = useTranslations("aboutUsPage");
  const content = useTranslations("aboutUsPage.content");

  return (
    <>
    {/* Industries We Serve */}
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold tracking-wider text-[#D28E45]">
              {content("industriesTitle")}
            </span>
            <div className="w-full h-0.5 bg-[#D28E45] mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {industries.map((icon, index) => (
            <div key={index} className="bg-[#F3F3F3] p-6 rounded-lg text-center hover:shadow-md transition-shadow">
              <span className="text-3xl mb-3 block">{icon}</span>
              <p className="text-sm font-medium text-[#313639]">
                {content(`industries.industry${index + 1}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Competitive Advantages */}
    <section className="py-16 md:py-24 bg-[#313639]">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold tracking-wider text-[#D28E45]">
              {content("advantagesTitle")}
            </span>
            <div className="w-full h-0.5 bg-[#D28E45] mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {advantages.map((key) => (
            <div key={key} className="flex items-center gap-3 p-2">
              <Check className="w-5 h-5 text-[#D28E45] shrink-0" />
              <span className="text-white text-sm">{content(`advantages.${key}`)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Vision Section */}
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Subtitle */}
            <div className="inline-block">
              <span className="text-sm font-semibold tracking-wider text-[#D28E45]">
                {t("vision.subtitle")}
              </span>
              <div className="w-full h-0.5 bg-[#D28E45] mt-2" />
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#313639] leading-tight">
              {t("vision.title1")}{" "}
              <span className="italic text-[#D28E45]">{t("vision.title2")}</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {t("vision.description1")}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t("vision.description2")}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t("vision.description3")}
            </p>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] border-4 border-[#D28E45] overflow-hidden">
              <Image
                src="/images/about-us/about-us-5.png"
                alt="Our Vision"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
