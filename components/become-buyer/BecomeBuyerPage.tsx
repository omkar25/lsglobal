"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Globe, Shield, Truck, Clock, HeadphonesIcon } from "lucide-react";

type FormData = {
  productName: string;
  quantity: string;
  destinationCountry: string;
  email: string;
  whatsapp: string;
  additionalDetails: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export function BecomeBuyerPage() {
  const t = useTranslations("becomeBuyerPage");
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    quantity: "",
    destinationCountry: "",
    email: "",
    whatsapp: "",
    additionalDetails: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const benefits = [
    { icon: Globe, key: "benefit1" },
    { icon: Shield, key: "benefit2" },
    { icon: Truck, key: "benefit3" },
    { icon: Clock, key: "benefit4" },
    { icon: HeadphonesIcon, key: "benefit5" },
    { icon: Check, key: "benefit6" },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.productName.trim()) newErrors.productName = t("form.errors.productRequired");
    if (!formData.quantity.trim()) newErrors.quantity = t("form.errors.quantityRequired");
    if (!formData.destinationCountry.trim()) newErrors.destinationCountry = t("form.errors.countryRequired");
    if (!formData.email.trim()) {
      newErrors.email = t("form.errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("form.errors.emailInvalid");
    }
    if (!formData.whatsapp.trim()) newErrors.whatsapp = t("form.errors.whatsappRequired");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "buyer", ...formData }),
      });
      if (!response.ok) throw new Error("Failed");
      setSubmitStatus("success");
      setFormData({ productName: "", quantity: "", destinationCountry: "", email: "", whatsapp: "", additionalDetails: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full border ${errors[field] ? "border-red-500" : "border-gray-200"} bg-gray-50 rounded-md px-4 py-3 text-[#313639] placeholder-gray-400 focus:outline-none focus:border-[#D28E45] focus:bg-white transition-colors`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-[#313639] py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{t("hero.title")}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{t("hero.subtitle")}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#313639] mb-12">{t("benefits.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit.key} className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-[#D28E45]/10 rounded-full flex items-center justify-center shrink-0">
                  <benefit.icon className="w-6 h-6 text-[#D28E45]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#313639] mb-1">{t(`benefits.${benefit.key}.title`)}</h3>
                  <p className="text-gray-600 text-sm">{t(`benefits.${benefit.key}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[#313639] mb-2">{t("form.title")}</h2>
            <p className="text-gray-600 mb-6">{t("form.description")}</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#313639] mb-2">{t("form.productName")} *</label>
                <input type="text" name="productName" value={formData.productName} onChange={handleChange} placeholder={t("form.productNamePlaceholder")} className={inputClass("productName")} />
                {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#313639] mb-2">{t("form.quantity")} *</label>
                  <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} placeholder={t("form.quantityPlaceholder")} className={inputClass("quantity")} />
                  {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#313639] mb-2">{t("form.destinationCountry")} *</label>
                  <input type="text" name="destinationCountry" value={formData.destinationCountry} onChange={handleChange} placeholder={t("form.destinationCountryPlaceholder")} className={inputClass("destinationCountry")} />
                  {errors.destinationCountry && <p className="text-red-500 text-sm mt-1">{errors.destinationCountry}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#313639] mb-2">{t("form.email")} *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t("form.emailPlaceholder")} className={inputClass("email")} />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#313639] mb-2">{t("form.whatsapp")} *</label>
                  <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder={t("form.whatsappPlaceholder")} className={inputClass("whatsapp")} />
                  {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#313639] mb-2">{t("form.additionalDetails")}</label>
                <textarea name="additionalDetails" value={formData.additionalDetails} onChange={handleChange} placeholder={t("form.additionalDetailsPlaceholder")} rows={4} className="w-full border border-gray-200 bg-gray-50 rounded-md px-4 py-3 text-[#313639] placeholder-gray-400 focus:outline-none focus:border-[#D28E45] focus:bg-white transition-colors resize-none" />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full px-8 py-4 bg-[#D28E45] text-white font-semibold rounded-md hover:bg-[#C07D35] transition-colors disabled:opacity-50">
                {isSubmitting ? "..." : t("form.submit")}
              </button>

              {submitStatus === "error" && <div className="border-2 border-red-500 p-4 rounded-md"><p className="text-red-500 text-sm">{t("form.error")}</p></div>}
              {submitStatus === "success" && <div className="bg-green-50 border border-green-500 p-4 rounded-md"><p className="text-green-600 text-sm">{t("form.success")}</p></div>}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
