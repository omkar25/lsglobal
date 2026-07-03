"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";

const products = [
  {
    key: "dyesPigments",
    image: "/images/products/Dyes-and-pigments-768x767.webp",
    href: "/c/chemicals-industry",
  },
  {
    key: "textileCrafts",
    image: "/images/products/Textile-crafts-embroidered-cushions-wall-hangings-768x767.webp",
    href: "/c/handicrafts-industry",
  },
  {
    key: "curtainsDrapes",
    image: "/images/products/Curtains-and-drapes-768x767.webp",
    href: "/c/home-textiles-industry",
  },
  {
    key: "surgicalGloves",
    image: "/images/products/Surgical-gloves-and-masks-768x767.webp",
    href: "/c/medical-surgical-equipment-industry",
  },
  {
    key: "turmericPowder",
    image: "/images/products/Turmeric-powder-768x767.webp",
    href: "/c/spices-industry",
  },
  {
    key: "pharmaceuticalIntermediates",
    image: "/images/products/Pharmaceutical-intermediates-768x767.webp",
    href: "/c/chemicals-industry",
  },
];

export function Products() {
  const t = useTranslations("products");

  return (
    <section className="py-12 sm:py-20 md:py-32 bg-white">
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

        {/* Products Grid - 3 columns */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
          {products.map((product) => (
            <div key={product.key} className="group text-center">
              {/* Image */}
              <div className="relative aspect-square mb-3 sm:mb-6 overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={product.image}
                  alt={t(`items.${product.key}.title`)}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#441C14]/0 group-hover:bg-[#441C14]/20 transition-colors duration-300" />
              </div>

              {/* Content */}
              <h3 className="text-sm sm:text-xl font-bold text-[#313639] group-hover:text-[#D28E45] transition-colors duration-300 mb-1.5 sm:mb-3 line-clamp-2">
                {t(`items.${product.key}.title`)}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-4 px-1 sm:px-4 hidden sm:block">
                {t(`items.${product.key}.description`)}
              </p>
              <Link
                href={product.href}
                className="inline-block px-3 sm:px-6 py-1.5 sm:py-2 bg-[#441C14] text-white text-xs sm:text-sm font-semibold hover:bg-[#D28E45] hover:shadow-md transition-all duration-300"
              >
                {t("readMore")}
              </Link>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-[#313639] text-white text-sm sm:text-base font-semibold hover:bg-[#D28E45] hover:shadow-lg transition-all duration-300"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            {t("viewMore")}
          </Link>
        </div>
      </div>
    </section>
  );
}
