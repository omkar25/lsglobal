"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function MissionSection() {
  const t = useTranslations("aboutUsPage");

  return (
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
            {/* Subtitle */}
            <div className="inline-block">
              <span className="text-sm font-semibold tracking-wider text-[#D28E45]">
                {t("mission.subtitle")}
              </span>
              <div className="w-full h-0.5 bg-[#D28E45] mt-2" />
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {t("mission.title1")}{" "}
              <span className="italic text-[#D28E45]">{t("mission.title2")}</span>
            </h2>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed">
              {t("mission.description1")}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {t("mission.description2")}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {t("mission.description3")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
