import { HeroCarousel } from "@/components/shared/common/carousel/HeroCarousel";
import { ImageText } from "@/components/shared/common/imagetext/ImageText";
import { AboutSection } from "@/components/shared/common/aboutsection/AboutSection";
import { CoreStrengths } from "@/components/shared/common/corestrengths/CoreStrengths";
import { Industries } from "@/components/shared/common/industries/Industries";
import { Products } from "@/components/shared/common/products/Products";
import { ContactForm } from "@/components/shared/common/contactform/ContactForm";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroCarousel />
      <ImageText />
      <AboutSection />
      <CoreStrengths />
      <Industries />
      <ContactForm />
      <Products />
    </div>
  );
}
