"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

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

export function SupplierRfqForm() {
  const t = useTranslations("rfqPage.supplierForm");
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = t("errors.companyRequired");
    }
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = t("errors.contactRequired");
    }
    if (!formData.productName.trim()) {
      newErrors.productName = t("errors.productRequired");
    }
    if (!formData.productionCapacity.trim()) {
      newErrors.productionCapacity = t("errors.capacityRequired");
    }
    if (!formData.country.trim()) {
      newErrors.country = t("errors.countryRequired");
    }
    if (!formData.email.trim()) {
      newErrors.email = t("errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("errors.emailInvalid");
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t("errors.phoneRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setSubmitStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "supplier", ...formData }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setSubmitStatus("success");
      setFormData({
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
      setErrors({});
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full border ${
      errors[field] ? "border-red-500" : "border-gray-200"
    } bg-gray-50 rounded-md px-4 py-3 text-[#313639] placeholder-gray-400 focus:outline-none focus:border-[#D28E45] focus:bg-white transition-colors`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#313639] mb-2">{t("title")}</h3>
        <p className="text-gray-600 text-sm">{t("description")}</p>
      </div>

      {/* Company & Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#313639] mb-2">
            {t("companyName")} *
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder={t("companyNamePlaceholder")}
            className={inputClass("companyName")}
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#313639] mb-2">
            {t("contactPerson")} *
          </label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder={t("contactPersonPlaceholder")}
            className={inputClass("contactPerson")}
          />
          {errors.contactPerson && (
            <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>
          )}
        </div>
      </div>

      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-[#313639] mb-2">
          {t("productName")} *
        </label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder={t("productNamePlaceholder")}
          className={inputClass("productName")}
        />
        {errors.productName && (
          <p className="text-red-500 text-sm mt-1">{errors.productName}</p>
        )}
      </div>

      {/* Capacity & Certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#313639] mb-2">
            {t("productionCapacity")} *
          </label>
          <input
            type="text"
            name="productionCapacity"
            value={formData.productionCapacity}
            onChange={handleChange}
            placeholder={t("productionCapacityPlaceholder")}
            className={inputClass("productionCapacity")}
          />
          {errors.productionCapacity && (
            <p className="text-red-500 text-sm mt-1">{errors.productionCapacity}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#313639] mb-2">
            {t("certifications")}
          </label>
          <input
            type="text"
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            placeholder={t("certificationsPlaceholder")}
            className={inputClass("certifications")}
          />
        </div>
      </div>

      {/* Country */}
      <div>
        <label className="block text-sm font-medium text-[#313639] mb-2">
          {t("country")} *
        </label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder={t("countryPlaceholder")}
          className={inputClass("country")}
        />
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country}</p>
        )}
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#313639] mb-2">
            {t("email")} *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("emailPlaceholder")}
            className={inputClass("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#313639] mb-2">
            {t("phone")} *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t("phonePlaceholder")}
            className={inputClass("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Additional Details */}
      <div>
        <label className="block text-sm font-medium text-[#313639] mb-2">
          {t("additionalDetails")}
        </label>
        <textarea
          name="additionalDetails"
          value={formData.additionalDetails}
          onChange={handleChange}
          placeholder={t("additionalDetailsPlaceholder")}
          rows={4}
          className="w-full border border-gray-200 bg-gray-50 rounded-md px-4 py-3 text-[#313639] placeholder-gray-400 focus:outline-none focus:border-[#D28E45] focus:bg-white transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-[#D28E45] text-white font-semibold rounded-md hover:bg-[#C07D35] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "..." : t("submit")}
        </button>
      </div>

      {/* Status */}
      {submitStatus === "error" && (
        <div className="border-2 border-red-500 p-4 rounded-md">
          <p className="text-red-500 text-sm">{t("error")}</p>
        </div>
      )}
      {submitStatus === "success" && (
        <div className="bg-green-50 border border-green-500 p-4 rounded-md">
          <p className="text-green-600 text-sm">{t("success")}</p>
        </div>
      )}
    </form>
  );
}
