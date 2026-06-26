"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { BuyerRfqForm } from "./BuyerRfqForm";
import { SupplierRfqForm } from "./SupplierRfqForm";
import { ShoppingCart, Factory } from "lucide-react";

export function RfqPage() {
  const t = useTranslations("rfqPage");
  const [activeTab, setActiveTab] = useState<"buyer" | "supplier">("buyer");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#313639] py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Tab Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Tabs */}
            <div className="flex mb-8 bg-white rounded-lg shadow-sm p-1">
              <button
                onClick={() => setActiveTab("buyer")}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-md font-semibold transition-colors ${
                  activeTab === "buyer"
                    ? "bg-[#D28E45] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {t("tabs.buyer")}
              </button>
              <button
                onClick={() => setActiveTab("supplier")}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-md font-semibold transition-colors ${
                  activeTab === "supplier"
                    ? "bg-[#D28E45] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Factory className="w-5 h-5" />
                {t("tabs.supplier")}
              </button>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              {activeTab === "buyer" ? <BuyerRfqForm /> : <SupplierRfqForm />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
