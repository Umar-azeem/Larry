"use client";

import { FadeImage } from "@/components/fade-image";
import Link from "next/link";

// Larry's actual service imagery
const galleryImages = [
  { id: 1, src: "/images/07-finished-house-front.svg", alt: "Custom Home Design" },
  { id: 2, src: "/images/12-iso-3d-complete-house.png", alt: "Architectural Planning" },
  { id: 3, src: "/images/06-timber-frame-house.svg", alt: "Custom Framing & Construction" },
  { id: 4, src: "/images/01-construction-site-overview.svg", alt: "Site Planning" },
];

export function CollectionSection() {
  return (
    <section id="about" className="bg-background py-20 md:py-32 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-primary italic font-medium tracking-widest uppercase text-sm md:text-base mb-2 block">
              Who We Are
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl max-w-2xl leading-tight">
              LM Stevens Designs – Architectural Design In Allyn, Washington
            </h2>
          </div>
          
          <Link 
            href="#contact" 
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors shrink-0"
          >
            GET A QUOTATION
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Red Block */}
          <div className="lg:col-span-5 bg-primary rounded-[2rem] p-8 md:p-12 text-primary-foreground relative z-10 lg:-mr-12 shadow-xl">
            {/* Diamond Icon */}
            <svg className="w-12 h-12 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 3h12l4 6-10 12L2 9l4-6z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 9h20M12 21L8 9l4-6 4 6-4 12z" />
            </svg>
            
            <p className="text-lg md:text-xl leading-relaxed mb-8">
              LMS Designs LLC provides residential design and permit-ready planning services throughout Western Washington. We specialize in custom homes, additions, remodels, ADUs, garages, and shops.
            </p>
            
            <Link 
              href="#services" 
              className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-6 py-3 rounded-full font-medium hover:bg-background/90 transition-colors"
            >
              VIEW SERVICES
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Right Auto-Scrolling Carousel */}
          <div className="lg:col-span-7 relative w-full overflow-hidden py-8 lg:py-0">
            {/* Gradient Fades for smooth edges */}
            <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
            
            {/* Marquee Container */}
            <div className="flex w-[200%] animate-marquee gap-6">
              {/* Duplicate list twice for seamless infinite loop */}
              {[...galleryImages, ...galleryImages].map((img, index) => (
                <div 
                  key={index} 
                  className="relative w-[300px] md:w-[400px] aspect-[4/3] shrink-0 rounded-2xl overflow-hidden shadow-lg"
                >
                  <FadeImage
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover bg-neutral-100"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Inline Styles for the Marquee Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}