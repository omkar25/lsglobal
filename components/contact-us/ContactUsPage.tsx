"use client";

import { MapSection } from "./MapSection";
import { GlobalCommunicationSection } from "./GlobalCommunicationSection";
import { ContactSection } from "./ContactSection";

export function ContactUsPage() {
  return (
    <div className="flex flex-col">
      <MapSection />
      <GlobalCommunicationSection />
      <ContactSection />
    </div>
  );
}
