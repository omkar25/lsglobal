"use client";

import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin } from "lucide-react";

export function GlobalCommunicationSection() {
  const t = useTranslations("contactUsPage");

  const communicationCards = [
    {
      icon: Phone,
      title: t("communication.callSupport.title"),
      description: t("communication.callSupport.description"),
    },
    {
      icon: Mail,
      title: t("communication.emailAssistance.title"),
      description: t("communication.emailAssistance.description"),
    },
    {
      icon: MapPin,
      title: t("communication.officeLocation.title"),
      description: t("communication.officeLocation.description"),
    },
  ];

  return (
    <section className="py-8 md:py-10 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <p className="text-sm font-semibold tracking-wider text-[#D28E45] mb-4">
            {t("communication.subtitle")}
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#313639] mb-6">
            {t("communication.title1")}{" "}
            <span className="font-black">{t("communication.title2")}</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-2">
            {t("communication.description1")}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {t("communication.description2")}
          </p>
        </div>

        {/* Communication Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {communicationCards.map((card, index) => (
            <div key={index} className="text-center">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 border-2 border-[#D28E45] rounded-full flex items-center justify-center">
                  <card.icon className="w-6 h-6 text-[#D28E45]" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-[#313639] mb-3">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
