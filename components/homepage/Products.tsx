"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";

const products = [
  {
    key: "dyesPigments",
    image: "/images/products/Dyes-and-pigments-768x767.webp",
    href: "/products/chemicals",
  },
  {
    key: "textileCrafts",
    image: "/images/products/Textile-crafts-embroidered-cushions-wall-hangings-768x767.webp",
    href: "/products/handicrafts",
  },
  {
    key: "curtainsDrapes",
    image: "/images/products/Curtains-and-drapes-768x767.webp",
    href: "/products/home-textiles",
  },
  {
    key: "surgicalGloves",
    image: "/images/products/Surgical-gloves-and-masks-768x767.webp",
    href: "/products/medical-equipment",
  },
  {
    key: "turmericPowder",
    image: "/images/products/Turmeric-powder-768x767.webp",
    href: "/products/spices",
  },
  {
    key: "pharmaceuticalIntermediates",
    image: "/images/products/Pharmaceutical-intermediates-768x767.webp",
    href: "/products/chemicals",
  },
];

export function Products() {
  const t = useTranslations("products");

  return (
    <section className="py-20 md:py-32 bg-white">
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

        {/* Products Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div key={product.key} className="group text-center">
              {/* Image */}
              <div className="relative aspect-square mb-6 overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  alt={t(`items.${product.key}.title`)}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-[#313639] mb-3">
                {t(`items.${product.key}.title`)}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 px-4">
                {t(`items.${product.key}.description`)}
              </p>
              <Link
                href={product.href}
                className="inline-block px-6 py-2 bg-[#441C14] text-white text-sm font-semibold hover:bg-[#2a110c] transition-colors"
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
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#313639] text-white font-semibold hover:bg-[#1a1a1a] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
            {t("viewMore")}
          </Link>
        </div>
      </div>
    </section>
  );
}
