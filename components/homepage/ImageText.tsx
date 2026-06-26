"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function ImageText() {
  const t = useTranslations("welcome");

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
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
              {t("title1")}
              <br />
              {t("title2")}{" "}
              <span className="italic text-[#313639]">{t("titleHighlight")}</span>
            </h2>

            {/* Paragraphs */}
            <div className="space-y-3 sm:space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2 sm:pt-4">
              {/* Global Reach */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#D28E45]" />
                  <h3 className="font-bold text-[#313639] text-sm tracking-wide">
                    {t("globalReach")}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t("globalReachDesc")}
                </p>
              </div>

              {/* Trusted Partnership */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#D28E45]" />
                  <h3 className="font-bold text-[#313639] text-sm tracking-wide">
                    {t("trustedPartnership")}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t("trustedPartnershipDesc")}
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/Home-Welcome.webp"
                alt="Home Welcome"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Decorative border - hidden on mobile */}
              <div className="hidden sm:block absolute -top-4 -right-4 w-full h-full border-2 border-[#D28E45] -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
