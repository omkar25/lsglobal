"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Globe, Handshake, TrendingUp, Users, Award, Building2 } from "lucide-react";

type FormData = {
  companyName: string;
  contactPerson: string;
  productName: string;
  productionCapacity: string;
  certifications: string;
  country: string;
  email: string;
  phone: string;
  additionalDetails: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export function BecomeSupplierPage() {
  const t = useTranslations("becomeSupplierPage");
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    contactPerson: "",
    productName: "",
    productionCapacity: "",
    certifications: "",
    country: "",
    email: "",
    phone: "",
    additionalDetails: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const benefits = [
    { icon: Globe, key: "benefit1" },
    { icon: Handshake, key: "benefit2" },
    { icon: TrendingUp, key: "benefit3" },
    { icon: Users, key: "benefit4" },
    { icon: Award, key: "benefit5" },
    { icon: Building2, key: "benefit6" },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = t("form.errors.companyRequired");
    if (!formData.contactPerson.trim()) newErrors.contactPerson = t("form.errors.contactRequired");
    if (!formData.productName.trim()) newErrors.productName = t("form.errors.productRequired");
    if (!formData.productionCapacity.trim()) newErrors.productionCapacity = t("form.errors.capacityRequired");
    if (!formData.country.trim()) newErrors.country = t("form.errors.countryRequired");
    if (!formData.email.trim()) {
      newErrors.email = t("form.errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("form.errors.emailInvalid");
    }
    if (!formData.phone.trim()) newErrors.phone = t("form.errors.phoneRequired");
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
        body: JSON.stringify({ type: "supplier", ...formData }),
      });
      if (!response.ok) throw new Error("Failed");
      setSubmitStatus("success");
      setFormData({ companyName: "", contactPerson: "", productName: "", productionCapacity: "", certifications: "", country: "", email: "", phone: "", additionalDetails: "" });
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#313639] mb-2">{t("form.companyName")} *</label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder={t("form.companyNamePlaceholder")} className={inputClass("companyName")} />
                  {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#313639] mb-2">{t("form.contactPerson")} *</label>
                  <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} placeholder={t("form.contactPersonPlaceholder")} className={inputClass("contactPerson")} />
                  {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#313639] mb-2">{t("form.productName")} *</label>
                <input type="text" name="productName" value={formData.productName} onChange={handleChange} placeholder={t("form.productNamePlaceholder")} className={inputClass("productName")} />
                {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#313639] mb-2">{t("form.productionCapacity")} *</label>
                  <input type="text" name="productionCapacity" value={formData.productionCapacity} onChange={handleChange} placeholder={t("form.productionCapacityPlaceholder")} className={inputClass("productionCapacity")} />
                  {errors.productionCapacity && <p className="text-red-500 text-sm mt-1">{errors.productionCapacity}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#313639] mb-2">{t("form.certifications")}</label>
                  <input type="text" name="certifications" value={formData.certifications} onChange={handleChange} placeholder={t("form.certificationsPlaceholder")} className={inputClass("certifications")} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#313639] mb-2">{t("form.country")} *</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder={t("form.countryPlaceholder")} className={inputClass("country")} />
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#313639] mb-2">{t("form.email")} *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t("form.emailPlaceholder")} className={inputClass("email")} />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#313639] mb-2">{t("form.phone")} *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t("form.phonePlaceholder")} className={inputClass("phone")} />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
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
