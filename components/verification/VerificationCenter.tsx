"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  FileText,
  Hash,
  FileBadge,
  Landmark,
  BadgeCheck,
  CreditCard,
  Download,
  ExternalLink,
} from "lucide-react";

const CERTIFICATE_IMAGE = "/verification/Certificate.jpeg";
const CERTIFICATE_PDF = "/verification/Company_Verification_Details.pdf";

export function VerificationCenter() {
  const t = useTranslations("verificationPage");

  const verificationDetails = [
    {
      icon: FileBadge,
      label: t("details.registrationCertificate"),
      value: "571/2016-17",
    },
    {
      icon: FileText,
      label: t("details.fileNumber"),
      value: "AZ-22630",
    },
    {
      icon: Hash,
      label: t("details.iec"),
      value: "AADAJ6483E",
    },
    {
      icon: Landmark,
      label: t("details.gst"),
      value: "09AADAJ6483E1ZH",
    },
    {
      icon: BadgeCheck,
      label: t("details.msme"),
      value: "UDYAM UP-07-0107923",
    },
    {
      icon: CreditCard,
      label: t("details.pan"),
      value: "AADA****3E",
      note: t("details.panNote"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-[#313639] py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D28E45]/20 mb-5">
            <ShieldCheck className="w-8 h-8 text-[#D28E45]" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {verificationDetails.map((detail) => {
                const Icon = detail.icon;
                return (
                  <div
                    key={detail.label}
                    className="flex items-start gap-4 bg-white rounded-xl shadow-sm p-5"
                  >
                    <div className="shrink-0 flex items-center justify-center w-11 h-11 rounded-lg bg-[#D28E45]/10">
                      <Icon className="w-5 h-5 text-[#D28E45]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-gray-500">{detail.label}</p>
                      <p className="text-lg font-semibold text-[#313639] wrap-break-word">
                        {detail.value}
                      </p>
                      {detail.note && (
                        <p className="text-xs text-gray-400 mt-1">{detail.note}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Certificate & Downloads */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Certificate Preview */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <Image
                  src={CERTIFICATE_IMAGE}
                  alt={t("certificate.alt")}
                  width={1200}
                  height={1600}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto rounded-lg"
                />
                <a
                  href={CERTIFICATE_IMAGE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-[#313639] bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t("certificate.viewFull")}
                </a>
              </div>

              {/* Downloads */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#313639] mb-2">
                  {t("downloads.title")}
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                  {t("downloads.description")}
                </p>

                <a
                  href={CERTIFICATE_PDF}
                  download
                  className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-[#D28E45]/5 transition-colors group"
                >
                  <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-red-50 text-red-500">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#313639]">
                      {t("downloads.fileTitle")}
                    </p>
                    <p className="text-sm text-gray-500">{t("downloads.fileType")}</p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 group-hover:text-[#D28E45] transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
