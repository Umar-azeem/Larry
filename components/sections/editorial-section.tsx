"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

// Larry's real business stats
const specs = [
  { label: "Years Experience", value: "50+" },
  { label: "Satisfied Clients", value: "300+" },
  { label: "Google Rating", value: "5.0" },
  { label: "Projects Built", value: "1k+" },
];

export function EditorialSection() {
  const videoRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const updateParallax = useCallback(() => {
    if (!videoRef.current) return;
    
    const rect = videoRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    const videoTop = rect.top;
    const videoBottom = rect.bottom;
    
    if (videoBottom > 0 && videoTop < windowHeight) {
      const progress = 1 - (videoTop + rect.height / 2) / (windowHeight + rect.height);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateParallax();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateParallax]);

  // Parallax effect: image moves up as you scroll down
  const parallaxY = (scrollProgress - 0.5) * 40; 

  return (
    <section className="bg-[#0a0f14] overflow-hidden">
      
      {/* Full-width Image with Parallax */}
      <div 
        ref={videoRef} 
        className="relative w-full h-[50vh] md:h-[60vh] lg:h-[75vh] overflow-hidden border-b border-white/5"
      >
        {/* Parallax Image Container */}
        <div 
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{
            transform: `translate3d(0, ${parallaxY}px, 0)`,
            WebkitTransform: `translate3d(0, ${parallaxY}px, 0)`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            willChange: 'transform',
          }}
        >
          <Image
            src="/images/05-scaffolding-building.svg" // Replaced video with your construction asset
            alt="LM Stevens Designs Construction Process"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f14] via-[#0a0f14]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f14]/80 via-transparent to-transparent" />
        
        {/* Optional Text Overlay on Image */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-20 max-w-4xl">
          <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 md:mb-4">
            The Building Process
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter drop-shadow-lg">
            Precision in every <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-orange-300">detail.</span>
          </h2>
        </div>
      </div>

      {/* Specs Grid - Fully Mobile Responsive */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 -mt-8 md:-mt-12 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {specs.map((spec, index) => (
            <div
              key={spec.label}
              className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-8 text-center transition-all duration-500 hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(34,211,238,0.1)] hover:border-cyan-500/30"
            >
              {/* Glowing Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <p className="mb-2 md:mb-3 text-[10px] md:text-xs uppercase tracking-widest text-slate-400 font-bold">
                {spec.label}
              </p>
              <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 text-3xl md:text-5xl lg:text-6xl tracking-tighter">
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}