"use client";

import { 
  ClipboardList, 
  Search, 
  Package, 
  FileText, 
  CheckCircle, 
  Shield, 
  FileCheck, 
  Truck, 
  MapPin, 
  HeadphonesIcon 
} from "lucide-react";
import { useTranslations } from "next-intl";

const steps = [
  { key: "step1", icon: ClipboardList },
  { key: "step2", icon: Search },
  { key: "step3", icon: Package },
  { key: "step4", icon: FileText },
  { key: "step5", icon: CheckCircle },
  { key: "step6", icon: Shield },
  { key: "step7", icon: FileCheck },
  { key: "step8", icon: Truck },
  { key: "step9", icon: MapPin },
  { key: "step10", icon: HeadphonesIcon },
] as const;

export function ExportProcess() {
  const t = useTranslations("aboutUsPage.exportProcess");

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#313639] mb-2">
            {t("title")}
          </h2>
          <div className="w-24 h-1 bg-[#D28E45] mx-auto" />
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.key}
                  className="relative bg-[#F3F3F3] p-6 rounded-lg text-center hover:bg-[#313639] hover:text-white transition-colors group"
                >
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#D28E45] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <Icon className="w-8 h-8 text-[#D28E45] mx-auto mb-3" />
                  <p className="text-sm font-medium text-[#313639] group-hover:text-white">
                    {t(step.key)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
