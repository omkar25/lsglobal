"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export function ContactForm() {
  const t = useTranslations("contactForm");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("validation.nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("validation.emailInvalid");
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("validation.phoneRequired");
    } else if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = t("validation.phoneInvalid");
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validateForm()) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/industries/Home-Textile-Industry.webp"
          alt="Contact Background"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Form Container */}
      <div className="relative z-10 container mx-auto px-4 py-10 sm:py-16 md:py-24">
        <div className="max-w-md mx-auto sm:mx-0">
          <div className="bg-[#313639] p-5 sm:p-8 md:p-10 rounded-lg sm:rounded-none">
            {/* Header */}
            <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#D28E45] mb-1.5 sm:mb-2">
              {t("subtitle")}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-5 sm:mb-8">
              {t("title")}
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("name")}
                  className="w-full bg-transparent border-b border-gray-500 text-white placeholder-gray-400 py-2 text-sm sm:text-base focus:outline-none focus:border-[#D28E45] transition-colors"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("email")}
                    className="w-full bg-transparent border-b border-gray-500 text-white placeholder-gray-400 py-2 text-sm sm:text-base focus:outline-none focus:border-[#D28E45] transition-colors"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t("phone")}
                    className="w-full bg-transparent border-b border-gray-500 text-white placeholder-gray-400 py-2 text-sm sm:text-base focus:outline-none focus:border-[#D28E45] transition-colors"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t("subject")}
                  className="w-full bg-transparent border-b border-gray-500 text-white placeholder-gray-400 py-2 text-sm sm:text-base focus:outline-none focus:border-[#D28E45] transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("message")}
                  rows={3}
                  className="w-full bg-transparent border-b border-gray-500 text-white placeholder-gray-400 py-2 text-sm sm:text-base focus:outline-none focus:border-[#D28E45] transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 sm:py-3 bg-[#D28E45] text-white text-sm sm:text-base font-semibold hover:bg-[#C07D35] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "..." : t("submit")}
              </button>

              {/* Status Messages */}
              {submitStatus === "error" && (
                <div className="border-2 border-[#D28E45] p-3 sm:p-4">
                  <p className="text-gray-400 text-xs sm:text-sm">{t("error")}</p>
                </div>
              )}
              {submitStatus === "success" && (
                <div className="bg-green-900/50 p-3 sm:p-4 rounded">
                  <p className="text-green-300 text-xs sm:text-sm">{t("success")}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
