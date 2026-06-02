"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/shared/common/language/LanguageSwitcher";

const productLinks = [
  { href: "/products/chemicals", key: "chemicals" },
  { href: "/products/handicrafts", key: "handicrafts" },
  { href: "/products/home-textiles", key: "homeTextiles" },
  { href: "/products/medical-equipment", key: "medicalEquipment" },
  { href: "/products/spices", key: "spices" },
] as const;

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#1A1A1A]">
      <div className="container mx-auto flex h-18 items-center justify-between px-4 gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo/lsglobal-logo.webp"
            alt="LS Global"
            width={180}
            height={80}
            style={{ width: "auto", height: "120px" }}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 ml-auto">
          <Link
            href="/"
            className={`text-sm font-semibold transition-colors ${
              isActive("/")
                ? "text-[#D28E45]"
                : "text-[#313639] hover:text-[#D28E45] dark:text-white dark:hover:text-[#D28E45]"
            }`}
          >
            {t("nav.home")}
          </Link>
          <Link
            href="/about-us"
            className={`text-sm font-semibold transition-colors ${
              isActive("/about-us")
                ? "text-[#D28E45]"
                : "text-[#313639] hover:text-[#D28E45] dark:text-white dark:hover:text-[#D28E45]"
            }`}
          >
            {t("nav.aboutUs")}
          </Link>

          {/* Products Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
                isActive("/products")
                  ? "text-[#D28E45]"
                  : "text-[#313639] hover:text-[#D28E45] dark:text-white dark:hover:text-[#D28E45]"
              }`}
            >
              {t("nav.ourProducts")}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${productsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {productsOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 rounded-md border bg-white shadow-lg dark:bg-zinc-900 dark:border-zinc-800">
                <div className="py-2">
                  {productLinks.map((link) => (
                    <Link
                      key={link.key}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
                      onClick={() => setProductsOpen(false)}
                    >
                      {t(`nav.products.${link.key}`)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className={`text-sm font-semibold transition-colors ${
              isActive("/contact")
                ? "text-[#D28E45]"
                : "text-[#313639] hover:text-[#D28E45] dark:text-white dark:hover:text-[#D28E45]"
            }`}
          >
            {t("nav.contactUs")}
          </Link>
        </nav>

        {/* Language Switcher & Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher variant="dropdown" className="hidden sm:flex" />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t("common.toggleMenu")}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white dark:bg-black">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <Link
              href="/"
              className={`py-2 text-sm font-semibold ${
                isActive("/")
                  ? "text-[#D28E45]"
                  : "text-gray-900 dark:text-white"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/about-us"
              className={`py-2 text-sm font-semibold ${
                isActive("/about-us")
                  ? "text-[#D28E45]"
                  : "text-gray-900 dark:text-white"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.aboutUs")}
            </Link>

            {/* Mobile Products Submenu */}
            <div>
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className="flex items-center justify-between w-full py-2 text-sm font-semibold text-gray-900 dark:text-white"
              >
                {t("nav.ourProducts")}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${productsOpen ? "rotate-180" : ""}`}
                />
              </button>
              {productsOpen && (
                <div className="pl-4 flex flex-col gap-1">
                  {productLinks.map((link) => (
                    <Link
                      key={link.key}
                      href={link.href}
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t(`nav.products.${link.key}`)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className={`py-2 text-sm font-semibold ${
                isActive("/contact")
                  ? "text-[#D28E45]"
                  : "text-gray-900 dark:text-white"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.contactUs")}
            </Link>

            {/* Mobile Language Switcher */}
            <LanguageSwitcher variant="mobile" className="pt-2 border-t mt-2" />
          </nav>
        </div>
      )}
    </header>
  );
}
