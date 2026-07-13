import DynamicTrainingSection from "@/components/sections/DynamicTrainingSection";
import Hero from "@/components/sections/Hero";
import ScheduleSection from "@/components/sections/ScheduleSection";
import TrainingSection from "@/components/sections/TrainingSection";
import FinalCTA from "@/components/sections/FinalCTA";
import InstagramFeed from "@/components/sections/InstagramFeed";

export default function Home() {
  return (
    <main>
      <Hero />
      <ScheduleSection />
      <TrainingSection />
      <DynamicTrainingSection />
      <InstagramFeed username="verticecalistenia" limit={6} />
      <FinalCTA />
    </main>
  );
}
