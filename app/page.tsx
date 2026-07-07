import DynamicTrainingSection from "@/components/sections/DynamicTrainingSection";
import Hero from "@/components/sections/Hero";
import ScheduleSection from "@/components/sections/ScheduleSection";
import TrainingSection from "@/components/sections/TrainingSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrainingSection />
      <ScheduleSection />
      <DynamicTrainingSection />
      <FinalCTA />
    </main>
  );
}
