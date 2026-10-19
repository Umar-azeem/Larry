"use client";

import { FadeImage } from "@/components/fade-image";

const features = [
  {
    image: "/images/01-construction-site-overview.svg",
    title: "Project Planning",
    span: "col-span-2 row-span-2", // Large
  },
  {
    image: "/images/08-iso-3d-foundation.png",
    title: "Foundation",
    span: "col-span-1 row-span-1", // Small
  },
  {
    image: "/images/09-iso-3d-structure-frame.png",
    title: "Framing",
    span: "col-span-1 row-span-1", // Small
  },
  {
    image: "/images/02-tower-crane.svg",
    title: "Heavy Lifting",
    span: "col-span-1 row-span-2", // Tall
  },
  {
    image: "/images/10-iso-3d-walls.png",
    title: "Enclosure",
    span: "col-span-1 row-span-1", // Small
  },
  {
    image: "/images/06-timber-frame-house.svg",
    title: "Custom Timber",
    span: "col-span-2 row-span-1", // Wide
  },
  {
    image: "/images/03-excavator-digging.svg",
    title: "Site Prep",
    span: "col-span-1 row-span-1", // Small
  },
  {
    image: "/images/11-iso-3d-roof-frame.png",
    title: "Roofing",
    span: "col-span-1 row-span-2", // Tall
  },
  {
    image: "/images/05-scaffolding-building.svg",
    title: "Construction",
    span: "col-span-2 row-span-1", // Wide
  },
  {
    image: "/images/12-iso-3d-complete-house.png",
    title: "Finished Home",
    span: "col-span-1 row-span-1", // Small
  },
];

export function FeaturedProductsSection() {
  return (
    <section id="portfolio" className="relative bg-background py-20 md:py-32">
      <div className="px-4 md:px-12 lg:px-20">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground">
              From Concept to Completion
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl">
              Explore our architectural process. We handle everything from site planning and permit-ready blueprints to the final structural build.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-7xl mx-auto auto-rows-[180px] md:auto-rows-[240px]">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group relative overflow-hidden rounded-xl bg-muted border border-border/50 ${feature.span}`}
            >
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                <FadeImage
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Overlay for text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Title Label */}
              <div className="absolute bottom-4 left-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white font-medium text-sm md:text-base drop-shadow-md">
                  {feature.title}
                </span>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}