"use client";

import { useTranslations } from "next-intl";
import { MapPin, ExternalLink, Star } from "lucide-react";

export function MapSection() {
  const t = useTranslations("contactUsPage");

  return (
    <section className="relative">
      {/* Location Tooltip - Top Left */}
      <div className="absolute top-4 left-4 z-20 bg-white rounded-lg shadow-xl p-4 max-w-[280px] border border-gray-100">
        <div className="flex items-start gap-3">
          <div className="shrink-0">
            <div className="w-10 h-10 bg-[#D28E45]/10 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#D28E45]" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-[#313639] text-sm">
                {t("map.tooltip.title")}
              </h3>
              <a
                href="https://maps.google.com/?q=Bazar+Khas+Nagar+Panchayat+Jiyanpur+Sagri+276140+Azamgarh+Uttar+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-2">
              {t("map.tooltip.address")}
            </p>
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[1, 2, 3, 4].map((star) => (
                  <Star
                    key={star}
                    className="w-3 h-3 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <Star className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />
              </div>
              <span className="text-xs text-gray-500 ml-1">4.3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map iframe - Full Width */}
      <div className="w-full h-[450px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d114597.04099449977!2d83.18867758189414!3d26.15899859151531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sBazar%20Khas%20Nagar%20Panchayat%2C%20Jiyanpur%20Sagri%20Pin.276140%2C%20Azamgarh%2C%20Uttar%20Pradesh.!5e0!3m2!1sen!2sin!4v1762607400749!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="LS Global Traders Location"
          className="w-full h-full"
        />
      </div>

      {/* Get Directions Button */}
      <div className="absolute bottom-4 right-4 z-20">
        <a
          href="https://www.google.com/maps/dir//Bazar+Khas+Nagar+Panchayat+Jiyanpur+Sagri+276140+Azamgarh+Uttar+Pradesh"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D28E45] text-white font-semibold rounded-lg hover:bg-[#C07D35] transition-colors shadow-lg"
        >
          <MapPin className="w-4 h-4" />
          {t("map.getDirections")}
        </a>
      </div>
    </section>
  );
}
