"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type FormData = {
  productName: string;
  quantity: string;
  destinationCountry: string;
  email: string;
  whatsapp: string;
  additionalDetails: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export function BuyerRfqForm() {
  const t = useTranslations("rfqPage.buyerForm");
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = t("errors.productRequired");
    }
    if (!formData.quantity.trim()) {
      newErrors.quantity = t("errors.quantityRequired");
    }
    if (!formData.destinationCountry.trim()) {
      newErrors.destinationCountry = t("errors.countryRequired");
    }
    if (!formData.email.trim()) {
      newErrors.email = t("errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("errors.emailInvalid");
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = t("errors.whatsappRequired");
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
        body: JSON.stringify({ type: "buyer", ...formData }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setSubmitStatus("success");
      setFormData({
        productName: "",
        quantity: "",
        destinationCountry: "",
        email: "",
        whatsapp: "",
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

      {/* Quantity & Destination */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#313639] mb-2">
            {t("quantity")} *
          </label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder={t("quantityPlaceholder")}
            className={inputClass("quantity")}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#313639] mb-2">
            {t("destinationCountry")} *
          </label>
          <input
            type="text"
            name="destinationCountry"
            value={formData.destinationCountry}
            onChange={handleChange}
            placeholder={t("destinationCountryPlaceholder")}
            className={inputClass("destinationCountry")}
          />
          {errors.destinationCountry && (
            <p className="text-red-500 text-sm mt-1">{errors.destinationCountry}</p>
          )}
        </div>
      </div>

      {/* Email & WhatsApp */}
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
            {t("whatsapp")} *
          </label>
          <input
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder={t("whatsappPlaceholder")}
            className={inputClass("whatsapp")}
          />
          {errors.whatsapp && (
            <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>
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
