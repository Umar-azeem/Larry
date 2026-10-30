import { HeroSection } from "@/components/sections/hero-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { CollectionSection } from "@/components/sections/collection-section";
import { EditorialSection } from "@/components/sections/editorial-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { Hero } from "@/components/hero";
import { CollectionStrip } from "@/components/collectionStrip";
import { HouseCards } from "@/components/housecard";
export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <CollectionStrip />
      <HouseCards />
      <HeroSection />
      <PhilosophySection />
      <TechnologySection />
      <GallerySection />
      <CollectionSection />
      <EditorialSection />
      <TestimonialsSection />
    </main>
  );
}