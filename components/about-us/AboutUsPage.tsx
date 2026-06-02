"use client";

import { HeroBanner } from "./HeroBanner";
/* import { CommittedSection } from "./CommittedSection";
import { MissionSection } from "./MissionSection";
import { GrowthJourney } from "./GrowthJourney";
import { VisionSection } from "./VisionSection";
import { CoreValues } from "./CoreValues"; */
import { AboutContent } from "./AboutContent";

export function AboutUsPage() {
  return (
    <div className="flex flex-col">
      <HeroBanner />
      {/* <CommittedSection />
      <MissionSection />
      <GrowthJourney />
      <VisionSection />
      <CoreValues /> */}
      <AboutContent />
    </div>
  );
}
