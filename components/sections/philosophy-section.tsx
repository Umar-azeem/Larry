"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

const titles = [
  "Custom Home Designs.",
  "Permit-Ready Plans.",
  "Built for Your Lifestyle.",
];

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [titleOpacity, setTitleOpacity] = useState(0);
  const [descriptionProgress, setDescriptionProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const updateTransforms = useCallback(() => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = sectionRef.current.offsetHeight;
    
    // Calculate progress based on scroll position
    const scrollableRange = sectionHeight - windowHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));
    
    // Title rotates through 3 texts based on scroll progress
    setTitleOpacity(progress);

    // Description word animation
    if (descriptionRef.current) {
      const descRect = descriptionRef.current.getBoundingClientRect();
      const descTop = descRect.top;
      const descHeight = descRect.height;
      
      // Start animation when element enters viewport
      const startTrigger = windowHeight * 0.8;
      const endTrigger = windowHeight * 0.2;
      
      if (descTop < startTrigger && descTop > endTrigger - descHeight) {
        const descProgress = Math.max(0, Math.min(1, (startTrigger - descTop) / (startTrigger - endTrigger)));
        setDescriptionProgress(descProgress);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateTransforms);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransforms();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTransforms]);

  return (
    <section id="philosophy" className="bg-background">
      {/* Scroll-Animated Hero Section */}
      <div ref={sectionRef} className="relative" style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Title - 3D rotation */}
            <div 
              className="flex items-center justify-center pointer-events-none"
              style={{ perspective: '1000px' }}
            >
              <div className="relative w-full" style={{ transformStyle: 'preserve-3d', minHeight: '150px' }}>
                {titles.map((title, index) => {
                  const isLastText = index === titles.length - 1;
                  const segmentSize = 1 / titles.length;
                  const startProgress = index * segmentSize;
                  const endProgress = (index + 1) * segmentSize;
                  
                  let rotateX = 0;
                  let opacity = 0;
                  
                  if (titleOpacity >= startProgress && titleOpacity < endProgress) {
                    const localProgress = (titleOpacity - startProgress) / segmentSize;
                    rotateX = (1 - localProgress) * 90;
                    opacity = localProgress;
                  } else if (titleOpacity >= endProgress) {
                    if (isLastText) {
                      rotateX = 0;
                      opacity = 1;
                    } else {
                      rotateX = -90;
                      opacity = 0;
                    }
                  } else {
                    rotateX = 90;
                    opacity = 0;
                  }
                  
                  return (
                    <h2 
                      key={index}
                      className="absolute inset-0 flex items-center justify-center lg:justify-start text-[10vw] sm:text-[8vw] font-medium leading-tight tracking-tighter text-foreground lg:text-[4.5vw] text-center lg:text-left px-4 lg:px-0"
                      style={{
                        transform: `rotateX(${rotateX}deg) translateZ(0)`,
                        opacity,
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        willChange: 'transform, opacity',
                        WebkitFontSmoothing: 'antialiased',
                      }}
                    >
                      {title}
                    </h2>
                  );
                })}
              </div>
            </div>

            {/* 3D Isometric Image Panel */}
            <div className="hidden lg:flex items-center justify-center relative">
              <div 
                className="relative w-full max-w-md aspect-square transition-transform duration-700 hover:scale-105"
                style={{
                  transform: `rotateY(${titleOpacity * 15 - 10}deg) rotateX(${titleOpacity * 10 - 5}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Using your provided asset */}
                <Image 
                  src="/images/12-iso-3d-complete-house.png"
                  alt="LM Stevens Designs 3D Construction Process"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Description & Features */}
      <div ref={descriptionRef} className="px-6 pt-8 pb-20 md:px-12 md:pt-12 md:pb-28 lg:px-20 lg:pt-16 lg:pb-36">
        <div className="max-w-5xl mx-auto text-center">
          
          <p className="mt-8 leading-relaxed text-muted-foreground text-2xl md:text-3xl lg:text-4xl text-center font-light">
            {("LM Stevens Designs provides residential design and permit-ready planning services throughout Western Washington. We specialize in custom homes, additions, remodels, ADUs, garages, and shops — designed around your property, goals, and local permitting requirements.").split(" ").map((word, index, array) => {
              const wordProgress = Math.max(0, Math.min(1, (descriptionProgress * array.length) - index));
              const opacity = wordProgress;
              const blur = (1 - wordProgress) * 40;
              
              return (
                <span
                  key={index}
                  style={{
                    opacity,
                    filter: `blur(${blur}px)`,
                    transition: 'opacity 0.3s ease, filter 0.3s ease',
                  }}
                >
                  {word}{index < array.length - 1 ? " " : ""}
                </span>
              );
            })}
          </p>

          {/* Key Features Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "50+ Years Experience",
                desc: "Decades of expert architectural design and building services across the West Coast."
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Permit-Ready Plans",
                desc: "Tailored to local requirements, ensuring a smooth approval process for your project."
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "300+ Happy Clients",
                desc: "A proven track record of bringing joy to homeowners through personalized design."
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-muted/50 border border-border/50 hover:bg-muted transition-colors">
                {feature.icon}
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}