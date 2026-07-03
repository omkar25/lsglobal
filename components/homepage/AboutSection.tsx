"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Globe, Award } from "lucide-react";

export function AboutSection() {
  const t = useTranslations("aboutSection");

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-[#F3F3F3]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6">
            {/* Subtitle */}
            <div className="inline-block">
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#313639]">
                {t("subtitle")}
              </span>
              <div className="w-full h-0.5 bg-[#D28E45] mt-1.5 sm:mt-2" />
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#313639] leading-tight">
              <span className="italic">{t("title1")}</span>
              <br />
              <span className="italic font-bold">{t("title2")}</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {t("description")}
            </p>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 pt-2 sm:pt-4">
              {/* Global Clients */}
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#D28E45] flex items-center justify-center shrink-0 group-hover:bg-[#D28E45] transition-colors duration-300">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-[#D28E45] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold italic text-[#313639]">
                    {t("globalClientsCount")}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">{t("globalClients")}</p>
                </div>
              </div>

              {/* Years Experience */}
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#D28E45] flex items-center justify-center shrink-0 group-hover:bg-[#D28E45] transition-colors duration-300">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#D28E45] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold italic text-[#313639]">
                    {t("yearsExperienceCount")}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">{t("yearsExperience")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative">
              {/* Main Image */}
              <div className="relative w-full aspect-square max-w-sm sm:max-w-md mx-auto lg:ml-auto overflow-hidden group shadow-xl">
                <Image
                  src="/images/Home_About.webp"
                  alt="About LS Global"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Decorative border - hidden on mobile */}
              <div className="hidden sm:block absolute top-6 sm:top-8 right-6 sm:right-8 w-3/4 h-3/4 border-2 sm:border-4 border-[#D28E45] -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
