"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";

const industries = [
  {
    key: "handicrafts",
    image: "/images/industries/Handicraft-Industry.webp",
    href: "/products/handicrafts",
  },
  {
    key: "homeTextiles",
    image: "/images/industries/Home-Textile-Industry.webp",
    href: "/products/home-textiles",
  },
  {
    key: "chemicals",
    image: "/images/industries/Chemicals-Industry.webp",
    href: "/products/chemicals",
  },
  {
    key: "medicalEquipment",
    image: "/images/industries/Medical-Surgical-Equipment-Industry.webp",
    href: "/products/medical-equipment",
  },
  {
    key: "spices",
    image: "/images/industries/Spices-Parts-Industry.webp",
    href: "/products/spices",
  },
];

export function Industries() {
  const t = useTranslations("industries");

  return (
    <section className="py-12 sm:py-20 md:py-32 bg-[#F3F3F3]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          {/* Subtitle */}
          <div className="inline-block mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#313639]">
              {t("subtitle")}
            </span>
            <div className="w-full h-0.5 bg-[#D28E45] mt-1.5 sm:mt-2" />
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#313639]">
            {t("title")}{" "}
            <span className="italic font-bold">{t("titleHighlight")}</span>
          </h2>
        </div>

        {/* Industries Grid - 5 in one row */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6 mb-8 sm:mb-12">
          {industries.map((industry) => (
            <div
              key={industry.key}
              className="bg-[#D28E45] rounded-xl sm:rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="p-2 sm:p-3">
                <div className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={t(`${industry.key}.title`)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="px-2 sm:px-4 pb-3 sm:pb-4 flex-1 flex flex-col text-center">
                <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2 line-clamp-2">
                  {t(`${industry.key}.title`)}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-2 sm:mb-4 flex-1 hidden sm:block">
                  {t(`${industry.key}.description`)}
                </p>
                <Link
                  href={industry.href}
                  className="inline-block mx-auto px-3 sm:px-6 py-1.5 sm:py-2 bg-[#313639] text-white text-xs sm:text-sm font-semibold hover:bg-[#1a1a1a] transition-colors"
                >
                  {t("knowMore")}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-[#313639] text-white text-sm sm:text-base font-semibold hover:bg-[#1a1a1a] transition-colors"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
