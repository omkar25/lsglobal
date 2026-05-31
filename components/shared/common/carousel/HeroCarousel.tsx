"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlurText from "@/components/ui/BlurText";

const slides = [
  { id: 1, image: "/images/sliders/slider_01.png", position: "right" },
  { id: 2, image: "/images/sliders/slider_02.png", position: "left" },
  { id: 3, image: "/images/sliders/slider_03.png", position: "right" },
  { id: 4, image: "/images/sliders/slider_04.png", position: "left" },
  { id: 5, image: "/images/sliders/slider_05.png", position: "right" },
] as const;

export function HeroCarousel() {
  const t = useTranslations("carousel");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setShowDescription(false);
    setShowButtons(false);
    setCurrentSlide(index);
    setAnimationKey((prev) => prev + 1);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slide = slides[currentSlide];
  const isLeft = slide.position === "left";

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.image}
            alt={`Slide ${s.id}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Dark Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div
            key={animationKey}
            className={`max-w-2xl ${
              isLeft
                ? "mr-auto ml-8 md:ml-16 lg:ml-24 text-left"
                : "ml-auto mr-8 md:mr-16 lg:mr-24 text-right"
            }`}
          >
            {/* Accent Line */}
            <div
              className={`w-16 h-1 bg-[#D28E45] mb-6 animate-fade-in-up ${
                isLeft ? "mr-auto" : "ml-auto"
              }`}
              style={{ animationDelay: "0ms", animationFillMode: "both" }}
            />

            {/* Title with BlurText */}
            <BlurText
              text={t(`slides.${slide.id}.title`)}
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={() => setShowDescription(true)}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg"
            />

            {/* Description with BlurText */}
            {showDescription && (
              <BlurText
                text={t(`slides.${slide.id}.description`)}
                delay={80}
                animateBy="words"
                direction="top"
                onAnimationComplete={() => setShowButtons(true)}
                className="text-base md:text-lg text-gray-100 mb-8 leading-relaxed drop-shadow-md"
              />
            )}

            {/* Buttons */}
            {showButtons && (
              <div
                className={`flex gap-4 animate-fade-in-up ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                <Link
                  href="/about"
                  className="px-8 py-3 bg-white/90 border-2 border-[#313639] text-[#313639] font-semibold hover:bg-[#313639] hover:text-white hover:border-[#313639] transition-all duration-300"
                >
                  {t("aboutUs")}
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-transparent border-2 border-[#D28E45] text-white font-semibold hover:bg-[#D28E45] hover:text-white transition-all duration-300"
                >
                  {t("contactUs")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 left-4 flex">
        <button
          onClick={prevSlide}
          className="w-12 h-12 bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-[#313639]" />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 bg-[#D28E45] hover:bg-[#C07D35] flex items-center justify-center transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-[#D28E45] scale-125"
                : "bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
