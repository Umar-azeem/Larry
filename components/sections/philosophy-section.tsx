"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { Play, ArrowRight, Award, Calendar } from "lucide-react";

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

    const scrollableRange = sectionHeight - windowHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));

    setTitleOpacity(progress);

    if (descriptionRef.current) {
      const descRect = descriptionRef.current.getBoundingClientRect();
      const descTop = descRect.top;
      const descHeight = descRect.height;

      const startTrigger = windowHeight * 0.8;
      const endTrigger = windowHeight * 0.2;

      if (descTop < startTrigger && descTop > endTrigger - descHeight) {
        const descProgress = Math.max(
          0,
          Math.min(1, (startTrigger - descTop) / (startTrigger - endTrigger)),
        );
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
    <section id="philosophy" className="bg-[#f4f4f4]">
      {/* Scroll-Animated Hero Section (Kept from original) */}
      <div ref={sectionRef} className="relative" style={{ height: "150vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
            {/* Title - 3D rotation */}
            <div
              className="flex items-center justify-center pointer-events-none"
              style={{ perspective: "1000px" }}
            >
              <div
                className="relative w-full"
                style={{ transformStyle: "preserve-3d", minHeight: "150px" }}
              >
                {titles.map((title, index) => {
                  const isLastText = index === titles.length - 1;
                  const segmentSize = 1 / titles.length;
                  const startProgress = index * segmentSize;
                  const endProgress = (index + 1) * segmentSize;

                  let rotateX = 0;
                  let opacity = 0;

                  if (
                    titleOpacity >= startProgress &&
                    titleOpacity < endProgress
                  ) {
                    const localProgress =
                      (titleOpacity - startProgress) / segmentSize;
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
                      className="absolute inset-0 flex items-center justify-center lg:justify-start text-[10vw] sm:text-[8vw] font-medium leading-tight tracking-tighter text-gray-900 lg:text-[4.5vw] text-center lg:text-left px-4 lg:px-0"
                      style={{
                        transform: `rotateX(${rotateX}deg) translateZ(0)`,
                        opacity,
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        willChange: "transform, opacity",
                        WebkitFontSmoothing: "antialiased",
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
                  transformStyle: "preserve-3d",
                }}
              >
                <Image
                  src="/hi/ho7.png" // Make sure this path is correct
                  alt="LMS Home Designs 3D Construction Process"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area (Redesigned to match reference) */}
      <div
        ref={descriptionRef}
        className="px-6 pb-24 md:px-12 lg:px-20 max-w-[1400px] mx-auto"
      >
        {/* Top Section: Image + Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Side: Images & Google Badge */}
          <div className="relative mt-10 lg:mt-0">
            {/* Main Image */}

            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-xl bg-black">
              <video
                src="/videos/vdi.mp4" // <-- REPLACE: Path to your actual video file
                controls
                playsInline
                className="w-full h-full object-cover"
                poster="/images/video-poster.jpg" // <-- OPTIONAL: Replace with a thumbnail image
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Client Portrait (Overlapping bottom right) */}
            <div className="absolute -bottom-16 right-4 md:right-12 w-32 h-40 md:w-64 md:h-56 rounded-xl border-[6px] border-white overflow-hidden shadow-2xl z-20">
              <Image
                src="/lm/pokkk.webp" // <-- REPLACE: The man in sunglasses
                alt="Client"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="mt-16 lg:mt-0 pt-8 lg:pt-0">
            <p className="text-[#C23B2E] font-serif italic text-xl mb-4 tracking-wide">
              ABOUT US
            </p>

            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif font-bold text-gray-800 leading-[1.1] mb-8">
              Design The Life You've Imagined, With Larry
            </h2>

            <p className="text-gray-600 leading-relaxed mb-8 text-base md:text-lg">
              We believe every project is personal. That's why we take the time
              to understand your space, your style, and your story and translate
              that into a design that lives beautifully and works effortlessly.
            </p>

            <p className="text-gray-600 leading-relaxed mb-10 text-base md:text-lg">
              With a skilled team, deep local roots, and bold creative thinking,
              LMS Home Designs is your partner from the very first sketch to the
              final walkthrough.
            </p>

            {/* Features List */}
            <div className="space-y-8 mb-10">
              <div className="flex gap-4 items-start">
                <div className="text-[#000000] mt-1 flex-shrink-0">
                  <Award className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-gray-800 mb-1">
                    Experienced Team
                  </h4>
                  <p className="text-gray-500 text-sm">
                    With our amazing team members, we're proud to bring joy to
                    more than 300 Satisfied Clients.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="text-[#000000] mt-1 flex-shrink-0">
                  <Calendar className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-gray-800 mb-1">
                    50+ Years of Experience
                  </h4>
                  <p className="text-gray-500 text-sm">
                    For over 50 years, LM Stevens has been offering expert
                    architectural design & building services.
                  </p>
                </div>
              </div>
            </div>

            {/* Button */}
            <button className="bg-[#000000] hover:bg-[#000000] text-white px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide flex items-center gap-2 transition-colors duration-300">
              VIEW SERVICES
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
