import { HeroCarousel } from "./HeroCarousel";
import { ImageText } from "./ImageText";
import { AboutSection } from "./AboutSection";
import { CoreStrengths } from "./CoreStrengths";
import { Industries } from "./Industries";
import { ContactForm } from "./ContactForm";
import { Products } from "./Products";

export function Homepage() {
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
