"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Phone, MapPin, Mail } from "lucide-react";

const siteLinks = [
  { href: "/", key: "nav.home" },
  { href: "/about-us", key: "nav.aboutUs" },
  { href: "/products", key: "nav.ourProducts" },
  { href: "/contact-us", key: "nav.contactUs" },
] as const;

const productLinks = [
  { href: "/products/spices", key: "nav.products.spices" },
  { href: "/products/home-textiles", key: "nav.products.homeTextiles" },
  { href: "/products/handicrafts", key: "nav.products.handicrafts" },
  { href: "/products/chemicals", key: "nav.products.chemicals" },
  { href: "/products/medical-equipment", key: "nav.products.medicalEquipment" },
] as const;

const socialLinks = [
  { href: "https://facebook.com", icon: "f", label: "Facebook" },
  { href: "https://twitter.com", icon: "𝕏", label: "Twitter" },
  { href: "https://youtube.com", icon: "▶", label: "YouTube" },
  { href: "https://linkedin.com", icon: "in", label: "LinkedIn" },
] as const;

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#313639] text-white">
      {/* Contact Bar */}
      <div className="bg-[#3D4145] py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border-2 border-[#D28E45] flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#D28E45]" />
              </div>
              <div>
                <p className="font-semibold text-white">{t("footer.phone")}</p>
                <p className="text-gray-300">{t("footer.phoneNumber")}</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border-2 border-[#D28E45] flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#D28E45]" />
              </div>
              <div>
                <p className="font-semibold text-white">{t("footer.address")}</p>
                <p className="text-gray-300 text-sm">
                  {t("footer.addressLine1")}<br />
                  {t("footer.addressLine2")}<br />
                  {t("footer.addressLine3")}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border-2 border-[#D28E45] flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#D28E45]" />
              </div>
              <div>
                <p className="font-semibold text-white">{t("footer.email")}</p>
                <p className="text-gray-300">{t("footer.emailAddress")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo & Tagline */}
            <div className="space-y-6">
              <Image
                src="/logo/logo.webp"
                alt="LS Global Traders"
                width={150}
                height={80}
                className="bg-white p-2"
                style={{ width: "auto", height: "80px" }}
              />
              <p className="text-gray-300 text-sm leading-relaxed">
                {t("footer.tagline")}
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#4A4F54] hover:bg-[#D28E45] flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <span className="text-sm font-medium">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Site Links */}
            <div>
              <h3 className="text-lg font-semibold text-[#D28E45] mb-4">
                {t("footer.siteLinks")}
              </h3>
              <ul className="space-y-2">
                {siteLinks.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-[#D28E45] transition-colors"
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Products */}
            <div>
              <h3 className="text-lg font-semibold text-[#D28E45] mb-4">
                {t("footer.ourProducts")}
              </h3>
              <ul className="space-y-2">
                {productLinks.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-[#D28E45] transition-colors"
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-lg font-semibold text-[#D28E45] mb-4">
                {t("footer.address")}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t("footer.addressLine1")}<br />
                {t("footer.addressLine2")}<br />
                {t("footer.addressLine3")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-600 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400 text-sm">
            {t("footer.copyright", { year: currentYear })}{" "}
            <Link href="/" className="text-[#D28E45] hover:underline">
              {t("footer.companyName")}
            </Link>
            . {t("footer.allRightsReserved")} | {t("footer.craftedWith")}{" "}
            <span className="text-red-500">❤</span> {t("footer.by")}{" "}
            <a
              href="https://digitalexim.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D28E45] hover:underline"
            >
              {t("footer.developerName")}
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
