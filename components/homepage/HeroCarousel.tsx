"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlurText from "@/components/ui/BlurText";

const slides = [
  { id: 1, image: "/images/sliders/export_import.png", position: "right"},
  { id: 2, image: "/images/sliders/slider_01.png", position: "left" },
  { id: 3, image: "/images/sliders/slider_02.png", position: "right" },
  { id: 4, image: "/images/sliders/slider_03.png", position: "left" },
  { id: 5, image: "/images/sliders/slider_04.png", position: "right" },
  { id: 6, image: "/images/sliders/slider_05.png", position: "left" },
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
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
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
            className={`object-cover transition-transform duration-7000 ease-out ${
              index === currentSlide ? "scale-100" : "scale-100"
            }`}
            priority={index === 0}
          />
        </div>
      ))}

      {/* Dark Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/60 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div
            key={animationKey}
            className={`max-w-2xl px-2 sm:px-0 ${
              isLeft
                ? "mr-auto sm:ml-4 md:ml-16 lg:ml-24 text-left"
                : "ml-auto sm:mr-4 md:mr-16 lg:mr-24 text-right"
            }`}
          >
            {/* Accent Line */}
            <div
              className={`w-12 sm:w-16 h-1 bg-[#D28E45] mb-4 sm:mb-6 animate-fade-in-up ${
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
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight drop-shadow-lg"
            />

            {/* Description with BlurText */}
            {showDescription && (
              <BlurText
                text={t(`slides.${slide.id}.description`)}
                delay={80}
                animateBy="words"
                direction="top"
                onAnimationComplete={() => setShowButtons(true)}
                className="text-sm sm:text-base md:text-lg text-gray-100 mb-5 sm:mb-8 leading-relaxed drop-shadow-md line-clamp-3 sm:line-clamp-none"
              />
            )}

            {/* Buttons */}
            {showButtons && (
              <div
                className={`flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up ${
                  isLeft ? "items-start sm:justify-start" : "items-end sm:justify-end"
                }`}
              >
                <Link
                  href="/about"
                  className="px-5 sm:px-8 py-2.5 sm:py-3 bg-white/90 border-2 border-[#313639] text-[#313639] text-sm sm:text-base font-semibold hover:bg-[#313639] hover:text-white hover:border-[#313639] transition-all duration-300"
                >
                  {t("aboutUs")}
                </Link>
                <Link
                  href="/contact"
                  className="px-5 sm:px-8 py-2.5 sm:py-3 bg-transparent border-2 border-[#D28E45] text-white text-sm sm:text-base font-semibold hover:bg-[#D28E45] hover:text-white transition-all duration-300"
                >
                  {t("contactUs")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-4 sm:bottom-8 left-2 sm:left-4 flex shadow-lg">
        <button
          onClick={prevSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white hover:text-[#313639] flex items-center justify-center transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#313639] group-hover:-translate-x-0.5 transition-all" />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D28E45] hover:bg-[#C07D35] flex items-center justify-center transition-all duration-300 group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 sm:h-2.5 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? "w-8 sm:w-10 bg-[#D28E45]"
                : "w-2 sm:w-2.5 bg-white/60 hover:bg-white/90"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
