"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { Headphones, Mail, MapPin, Clock } from "lucide-react";

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

export function ContactSection() {
  const t = useTranslations("contactUsPage");
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const contactInfo = [
    {
      icon: MapPin,
      title: t("info.address.title"),
      content: t("info.address.content"),
      link: "https://maps.google.com/?q=Bazar+Khas+Nagar+Panchayat+Jiyanpur+Sagri+276140+Azamgarh+Uttar+Pradesh",
    },
    {
      icon: Headphones,
      title: t("info.phone.title"),
      content: t("info.phone.content"),
      link: "tel:+919807690693",
    },
    {
      icon: Mail,
      title: t("info.email.title"),
      content: t("info.email.content"),
      link: "mailto:info@lsglobaltraders.com",
    },
    {
      icon: Clock,
      title: t("info.hours.title"),
      content: t("info.hours.content"),
    },
  ];

  const validateForm = (): boolean => {
    const result = contactFormSchema.safeParse(formData);

    if (result.success) {
      setErrors({});
      return true;
    }

    const newErrors: FormErrors = {};
    const issues = result.error.issues;

    for (const issue of issues) {
      const field = issue.path[0] as keyof ContactFormData;
      if (!newErrors[field]) {
        newErrors[field] = issue.message;
      }
    }

    setErrors(newErrors);
    return false;
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

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setErrors({});
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left Side - Contact Info Cards (2x2 grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 border border-gray-100"
              >
                {/* Icon and Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#D28E45]/10 rounded-full flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#D28E45]" />
                  </div>
                  <h3 className="text-base font-bold text-[#313639]">
                    {item.title}
                  </h3>
                </div>

                {/* Content */}
                {item.link ? (
                  <a
                    href={item.link}
                    target={item.link.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.link.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-gray-600 hover:text-[#D28E45] transition-colors text-sm leading-relaxed block"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.content}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[#313639] mb-2">
                  {t("form.name")} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("form.namePlaceholder")}
                  className={`w-full border ${
                    errors.name ? "border-red-500" : "border-gray-200"
                  } bg-gray-50 rounded-md px-4 py-3 text-[#313639] placeholder-gray-400 focus:outline-none focus:border-[#D28E45] focus:bg-white transition-colors`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#313639] mb-2">
                    {t("form.email")} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("form.emailPlaceholder")}
                    className={`w-full border ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } bg-gray-50 rounded-md px-4 py-3 text-[#313639] placeholder-gray-400 focus:outline-none focus:border-[#D28E45] focus:bg-white transition-colors`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#313639] mb-2">
                    {t("form.phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t("form.phonePlaceholder")}
                    className={`w-full border ${
                      errors.phone ? "border-red-500" : "border-gray-200"
                    } bg-gray-50 rounded-md px-4 py-3 text-[#313639] placeholder-gray-400 focus:outline-none focus:border-[#D28E45] focus:bg-white transition-colors`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-[#313639] mb-2">
                  {t("form.message")} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("form.messagePlaceholder")}
                  rows={5}
                  className="w-full border border-gray-200 bg-gray-50 rounded-md px-4 py-3 text-[#313639] placeholder-gray-400 focus:outline-none focus:border-[#D28E45] focus:bg-white transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-[#D28E45] text-white font-semibold rounded-md hover:bg-[#C07D35] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "..." : t("form.submit")}
                </button>
              </div>

              {/* Status Messages */}
              {submitStatus === "error" && (
                <div className="border-2 border-red-500 p-4 rounded-md">
                  <p className="text-red-500 text-sm">{t("form.error")}</p>
                </div>
              )}
              {submitStatus === "success" && (
                <div className="bg-green-50 border border-green-500 p-4 rounded-md">
                  <p className="text-green-600 text-sm">{t("form.success")}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
