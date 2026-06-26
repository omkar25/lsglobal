"use client";

import { HeroBanner } from "./HeroBanner";
import { MissionSection } from "./MissionSection";
import { GrowthJourney } from "./GrowthJourney";
import { VisionSection } from "./VisionSection";
import { CoreValues } from "./CoreValues";
import { WhyChooseUs } from "./WhyChooseUs";
import { IndustriesWeServe } from "./IndustriesWeServe";
import { GlobalMarkets } from "./GlobalMarkets";
import { ExportProcess } from "./ExportProcess";
import { FounderMessage } from "./FounderMessage";

export function AboutUsPage() {
  return (
    <div className="flex flex-col">
      <HeroBanner />
      <MissionSection />
      <WhyChooseUs />
      <IndustriesWeServe />
      <GlobalMarkets />
      <ExportProcess />
      <FounderMessage />
      <GrowthJourney />
      <VisionSection />
      <CoreValues />
    </div>
  );
}
