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
    <section className="py-20 md:py-32 bg-[#F3F3F3]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Subtitle */}
          <div className="inline-block mb-6">
            <span className="text-sm font-semibold tracking-wider text-[#313639]">
              {t("subtitle")}
            </span>
            <div className="w-full h-0.5 bg-[#D28E45] mt-2" />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#313639]">
            {t("title")}{" "}
            <span className="italic font-bold">{t("titleHighlight")}</span>
          </h2>
        </div>

        {/* Industries Grid - 5 in one row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {industries.map((industry) => (
            <div
              key={industry.key}
              className="bg-[#D28E45] rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="p-3">
                <div className="relative aspect-square rounded-xl overflow-hidden">
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
              <div className="px-4 pb-4 flex-1 flex flex-col text-center">
                <h3 className="text-lg font-bold text-white mb-2">
                  {t(`${industry.key}.title`)}
                </h3>
                <p className="text-sm text-white/90 leading-relaxed mb-4 flex-1">
                  {t(`${industry.key}.description`)}
                </p>
                <Link
                  href={industry.href}
                  className="inline-block mx-auto px-6 py-2 bg-[#313639] text-white text-sm font-semibold hover:bg-[#1a1a1a] transition-colors"
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
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#313639] text-white font-semibold hover:bg-[#1a1a1a] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
