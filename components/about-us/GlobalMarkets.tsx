"use client";

import { Globe, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

const markets = [
  {
    regionKey: "middleEast",
    countryKeys: ["uae", "saudiArabia", "qatar", "oman", "bahrain"],
  },
  {
    regionKey: "africa",
    countryKeys: [],
  },
  {
    regionKey: "europe",
    countryKeys: [],
  },
  {
    regionKey: "northAmerica",
    countryKeys: [],
  },
  {
    regionKey: "southAmerica",
    countryKeys: [],
  },
  {
    regionKey: "southEastAsia",
    countryKeys: [],
  },
  {
    regionKey: "australia",
    countryKeys: [],
  },
] as const;

export function GlobalMarkets() {
  const t = useTranslations("aboutUsPage.globalMarkets");

  return (
    <section className="py-16 md:py-24 bg-[#F3F3F3]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#313639] mb-2">
            {t("title")}
          </h2>
          <div className="w-24 h-1 bg-[#D28E45] mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {markets.map((market) => (
            <div
              key={market.regionKey}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-[#D28E45]" />
                <h3 className="font-bold text-[#313639]">{t(market.regionKey)}</h3>
              </div>
              {market.countryKeys.length > 0 && (
                <ul className="space-y-1">
                  {market.countryKeys.map((countryKey) => (
                    <li key={countryKey} className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-3 h-3 text-[#D28E45]" />
                      {t(countryKey)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
