"use client";

import { useState } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
] as const;

type Locale = (typeof languages)[number]["code"];

interface LanguageSwitcherProps {
  variant?: "dropdown" | "compact" | "mobile";
  className?: string;
}

export function LanguageSwitcher({
  variant = "dropdown",
  className = "",
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === currentLocale) || languages[0];

  const switchLocale = (locale: Locale) => {
    router.replace(pathname, { locale });
    setIsOpen(false);
  };

  if (variant === "compact") {
    return (
      <div className={`flex gap-1 ${className}`}>
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant="ghost"
            size="sm"
            onClick={() => switchLocale(lang.code)}
            className="text-lg px-2"
            title={lang.name}
          >
            {lang.flag}
          </Button>
        ))}
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div className={`flex gap-2 ${className}`}>
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant="outline"
            size="sm"
            onClick={() => switchLocale(lang.code)}
            className="flex-1 gap-2"
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.name}</span>
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2 rounded-none"
      >
        <span className="text-base">{currentLang.flag}</span>
        <span className="text-sm">{currentLang.name}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 min-w-[140px] border bg-white shadow-lg dark:bg-zinc-900 dark:border-zinc-800">
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLocale(lang.code)}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                    currentLocale === lang.code
                      ? "bg-zinc-100 dark:bg-zinc-800 font-medium"
                      : ""
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
