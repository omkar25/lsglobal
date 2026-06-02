"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function VisionSection() {
  const t = useTranslations("aboutUsPage");

  return (
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
  );
}
