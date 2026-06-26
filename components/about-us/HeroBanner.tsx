"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Home } from "lucide-react";

export function HeroBanner() {
  const t = useTranslations("aboutUsPage");

  return (
    <section className="relative py-26 md:py-36 lg:py-50">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/lsg_globla_about-us.jpeg"
          alt="About Us Background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#313639] mb-4">
          {t("hero.title")}
        </h1>
        <div className="flex items-center justify-center gap-2 text-[#313639]">
          <Home className="w-4 h-4" />
          <span className="text-sm">→</span>
          <span className="text-sm text-[#D28E45]">{t("hero.aboutUs")}</span>
        </div>
      </div>
    </section>
  );
}
