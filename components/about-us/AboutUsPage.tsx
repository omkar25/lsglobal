"use client";

import { HeroBanner } from "./HeroBanner";
import { CommittedSection } from "./CommittedSection";
import { MissionSection } from "./MissionSection";
import { GrowthJourney } from "./GrowthJourney";
import { VisionSection } from "./VisionSection";
import { CoreValues } from "./CoreValues";

export function AboutUsPage() {
  return (
    <div className="flex flex-col">
      <HeroBanner />
      <MissionSection />
      <CommittedSection />
      <GrowthJourney />
      <VisionSection />
      <CoreValues />
    </div>
  );
}
