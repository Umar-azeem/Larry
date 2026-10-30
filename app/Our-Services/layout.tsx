// app/services/layout.tsx
"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { services } from "@/app/data/Service"; // ✅ Fixed: lowercase filename

interface LayoutProps {
  children: React.ReactNode;
}

function ServicesHero() {
  const pathname = usePathname();

  // Robust parsing: works for /services/design-planning OR /Our-Services/design-planning
  const segments = pathname.split("/").filter(Boolean);
  const slug = segments[segments.length - 1];
  const selectedService = services.find((s) => s.id === slug);

  return (
    <section className="relative bg-black overflow-hidden border-b border-white/5 pt-24 pb-20 md:pt-32 md:pb-28 font-sans rounded-b-[2.5rem]">
      {/* =========================================
          PRO-LEVEL 3D BACKGROUND (Matched to Footer)
          ========================================= */}

      {/* Tech Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hero-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Massive 3D Isometric House (Background Graphic) */}
      <div className="absolute -bottom-20 -right-20 md:-right-10 lg:right-10 w-[400px] md:w-[600px] lg:w-[800px] z-0 opacity-20 pointer-events-none mix-blend-screen animate-float-3d">
        <Image
          src="/images/12-iso-3d-complete-house.png"
          alt="3D Architectural Blueprint"
          width={800}
          height={800}
          className="object-contain"
        />
      </div>

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* =========================================
          MAIN CONTENT
          ========================================= */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        {selectedService ? (
          <>
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-cyan-400 text-xs font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Our Services
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white max-w-3xl">
              {selectedService.title.split(" ").map((word, i, arr) => {
                if (i === arr.length - 1) {
                  return (
                    <span
                      key={i}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
                    >
                      {word}{" "}
                    </span>
                  );
                }
                return <span key={i}>{word} </span>;
              })}
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-400 font-medium max-w-2xl leading-relaxed">
              {selectedService.subtitle}
            </p>

            {/* Glass Stats Cards */}
            <div className="mt-10 flex flex-wrap gap-4">
              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(34,211,238,0.1)]">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-0.5">
                    Features
                  </p>
                  <p className="text-base font-semibold text-white tracking-wide">
                    {selectedService.features?.length || 0} Included
                  </p>
                </div>
              </div>

              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-orange-500/50 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(249,115,22,0.1)]">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-0.5">
                    Benefits
                  </p>
                  <p className="text-base font-semibold text-white tracking-wide">
                    {selectedService.benefits?.length || 0} Included
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-cyan-400 text-xs font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                What We Do
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Services
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-400 font-medium max-w-2xl leading-relaxed">
              Comprehensive architectural design and construction services
              tailored to bring your vision to life.
            </p>
          </>
        )}
      </div>

      {/* Reuse Footer's float animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes float-3d {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float-3d {
          animation: float-3d 10s ease-in-out infinite;
        }
      `,
        }}
      />
    </section>
  );
}

function ServicesHeroLoading() {
  return (
    <section className="relative bg-black overflow-hidden border-b border-white/5 pt-24 pb-20 md:pt-32 md:pb-28 rounded-b-[2.5rem]">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="loading-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loading-grid)" />
        </svg>
      </div>
      <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="h-6 w-32 bg-white/10 rounded-full animate-pulse mb-6" />
        <div className="h-14 w-3/4 md:w-1/2 bg-white/10 rounded-lg animate-pulse mb-4" />
        <div className="h-6 w-full md:w-2/3 bg-white/10 rounded-lg animate-pulse mb-8" />
        <div className="flex gap-4">
          <div className="h-20 w-44 bg-white/10 rounded-2xl animate-pulse" />
          <div className="h-20 w-44 bg-white/10 rounded-2xl animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export default function ServicesLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Suspense fallback={<ServicesHeroLoading />}>
        <ServicesHero />
      </Suspense>

      <div className="container mx-auto px-4 py-8 max-w-7xl">{children}</div>
    </div>
  );
}