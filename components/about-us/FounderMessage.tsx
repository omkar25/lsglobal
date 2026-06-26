"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function FounderMessage() {
  const t = useTranslations("aboutUsPage.founderMessage");

  return (
    <section className="py-16 md:py-24 bg-[#F3F3F3]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#313639] mb-2">
            {t("title")}
          </h2>
          <div className="w-24 h-1 bg-[#D28E45] mx-auto" />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Welcome Card */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Founder Image */}
              <div className="lg:col-span-1 flex justify-center">
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#D28E45]">
                  <Image
                    src="/images/alok_chaursiya.jpeg"
                    alt={t("founderName")}
                    fill
                    sizes="(max-width: 768px) 192px, 224px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Welcome Message */}
              <div className="lg:col-span-2 space-y-4">
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t("welcome")}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {t("welcomeMessage")}
                </p>
                <div className="pt-4 border-t border-gray-200">
                  <p className="font-bold text-[#313639]">– {t("founderName")}</p>
                  <p className="text-sm text-[#D28E45]">{t("founderTitle")}</p>
                  <p className="text-sm text-gray-500">{t("companyName")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Message */}
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>{t("message1")}</p>
            <p>{t("message2")}</p>
            <p>{t("message3")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
