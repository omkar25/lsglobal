"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function CoreStrengths() {
  const t = useTranslations("coreStrengths");

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Top Section - Core Strengths */}
        <div className="text-center mb-10 sm:mb-16">
          {/* Subtitle */}
          <div className="inline-block mb-4 sm:mb-6">
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
        </div>

        {/* Strengths Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
          {/* Strength 1 */}
          <div className="flex gap-3 sm:gap-4">
            <span className="text-3xl sm:text-4xl font-light text-[#D28E45]">01</span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#313639] mb-1.5 sm:mb-2">
                {t("strength1Title")}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {t("strength1Desc")}
              </p>
            </div>
          </div>

          {/* Strength 2 */}
          <div className="flex gap-3 sm:gap-4">
            <span className="text-3xl sm:text-4xl font-light text-[#D28E45]">02</span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#313639] mb-1.5 sm:mb-2">
                {t("strength2Title")}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {t("strength2Desc")}
              </p>
            </div>
          </div>

          {/* Strength 3 */}
          <div className="flex gap-3 sm:gap-4 sm:col-span-2 md:col-span-1">
            <span className="text-3xl sm:text-4xl font-light text-[#D28E45]">03</span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#313639] mb-1.5 sm:mb-2">
                {t("strength3Title")}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {t("strength3Desc")}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section - Success Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6">
            {/* Subtitle */}
            <div className="inline-block">
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#313639]">
                {t("successSubtitle")}
              </span>
              <div className="w-full h-0.5 bg-[#D28E45] mt-1.5 sm:mt-2" />
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#313639] leading-tight">
              {t("successTitle1")}
              <br />
              {t("successTitle2")}{" "}
              <span className="italic font-bold">{t("successTitle3")}</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
              {t("successDesc")}
            </p>

            {/* About Us Button */}
            <Link
              href="/about"
              className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-[#D28E45] text-[#313639] text-sm sm:text-base font-semibold hover:bg-[#D28E45] hover:text-white transition-all duration-300"
            >
              {t("aboutUs")}
            </Link>
          </div>

          {/* Stats */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4 sm:gap-8">
            {/* Client Satisfaction */}
            <div className="text-center">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#E5E5E5"
                    strokeWidth="6"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#D28E45"
                    strokeWidth="6"
                    strokeDasharray={`${98 * 2.83} ${100 * 2.83}`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg sm:text-2xl font-bold text-[#313639]">
                    {t("clientSatisfactionPercent")}
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-[#313639] mb-1 sm:mb-2 text-sm sm:text-base">
                {t("clientSatisfaction")}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed hidden sm:block">
                {t("clientSatisfactionDesc")}
              </p>
            </div>

            {/* On-Time Delivery */}
            <div className="text-center">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#E5E5E5"
                    strokeWidth="6"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#D28E45"
                    strokeWidth="6"
                    strokeDasharray={`${96 * 2.83} ${100 * 2.83}`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg sm:text-2xl font-bold text-[#313639]">
                    {t("onTimeDeliveryPercent")}
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-[#313639] mb-1 sm:mb-2 text-sm sm:text-base">
                {t("onTimeDelivery")}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed hidden sm:block">
                {t("onTimeDeliveryDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
