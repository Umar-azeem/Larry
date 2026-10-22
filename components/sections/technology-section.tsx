"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startOffset = windowHeight * 0.9;
      const endOffset = windowHeight * 0.1;

      const totalDistance = startOffset - endOffset;
      const currentPosition = startOffset - rect.top;

      const newProgress = Math.max(
        0,
        Math.min(1, currentPosition / totalDistance),
      );
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className="text-2xl font-semibold leading-snug text-white md:text-3xl lg:text-4xl"
    >
      {words.map((word, index) => {
        const appearProgress = progress * (words.length + 1);
        const wordAppearProgress = Math.max(
          0,
          Math.min(1, appearProgress - index),
        );
        const wordOpacity = wordAppearProgress;
        const wordBlur = (1 - wordAppearProgress) * 30; // Reduced blur for legibility

        return (
          <span
            key={index}
            className="inline-block"
            style={{
              opacity: wordOpacity,
              filter: `blur(${wordBlur}px)`,
              transition: "opacity 0.1s linear, filter 0.1s linear",
              marginRight: "0.3em",
            }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}

// Replaced random textures with Larry's actual design assets
const sideImages = [
  {
    src: "/houses/hs3.png",
    alt: "LMS Home Designs Site Planning",
    position: "left",
  },
  {
    src: "/houses/hs2.png",
    alt: "LMS Home Designs Completed House",
    position: "right",
  },
];

// Larry's core service cycles
const textCycles = [
  "Custom Residential Design.",
  "Permit-Ready Planning.",
  "From Sketch to Reality.",
];

export function TechnologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [textProgress, setTextProgress] = useState(0);

  // Real LMS Home Designs copy
  const descriptionText =
    "LMS Home Designs provides residential design and permit-ready planning services throughout Western Washington. Specializing in custom homes, additions, remodels, ADUs, garages, and shops. With over 50 years of experience and a deep local understanding of Allyn and surrounding areas, Larry Stevens translates your unique lifestyle and property goals into functional, beautiful, and fully compliant architectural solutions.";

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 4;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      setScrollProgress(progress);

      if (textSectionRef.current) {
        const textRect = textSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const startOffset = windowHeight * 0.9;
        const endOffset = windowHeight * 0.1;

        const totalDistance = startOffset - endOffset;
        const currentPosition = startOffset - textRect.top;

        const newTextProgress = Math.max(
          0,
          Math.min(1, currentPosition / totalDistance),
        );
        setTextProgress(newTextProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const titleOpacity = Math.max(0, 1 - scrollProgress / 0.2);
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));

  const centerWidth = 100 - imageProgress * 58;
  const centerHeight = 100 - imageProgress * 30;
  const sideWidth = imageProgress * 22;
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + imageProgress * 100;
  const sideTranslateRight = 100 - imageProgress * 100;
  const gap = imageProgress * 16;

  return (
    <section ref={sectionRef} className="relative bg-foreground">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px` }}
          >
            {/* Left Column */}
            <div
              className="relative overflow-hidden rounded-xl will-change-transform"
              style={{
                width: `${sideWidth}%`,
                height: "100%",
                transform: `translateX(${sideTranslateLeft}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages
                .filter((img) => img.position === "left")
                .map((img, idx) => (
                  <Image
                    key={idx}
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover bg-neutral-900"
                  />
                ))}
            </div>

            {/* Main Center Image */}
            <div
              className="relative overflow-hidden rounded-xl will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: "100%",
                flex: "0 0 auto",
              }}
            >
              {/* Image Sequence - Larry's Project Timeline */}

              {/* 1. Concept / Site Prep */}
              <Image
                src="/houses/hs5.png"
                alt="Site preparation and planning"
                fill
                className="object-cover bg-neutral-900"
              />

              {/* 2. Foundation Stage */}
              <Image
                src="/houses/hs6.png"
                alt="Foundation construction"
                fill
                className="absolute inset-0 object-cover bg-neutral-900"
                style={{
                  opacity: Math.max(
                    0,
                    Math.min(1, (scrollProgress - 0.1) / 0.2),
                  ),
                  transition: "opacity 0.3s ease",
                }}
              />

              {/* 3. Framing Stage */}
              <Image
                src="/houses/hs1.png"
                alt="Timber framing and structural design"
                fill
                className="absolute inset-0 object-cover bg-neutral-900"
                style={{
                  opacity: Math.max(
                    0,
                    Math.min(1, (scrollProgress - 0.4) / 0.2),
                  ),
                  transition: "opacity 0.3s ease",
                }}
              />

              {/* 4. Finished Home */}
              <Image
                src="/houses/hs4.png"
                alt="Completed custom home design"
                fill
                className="absolute inset-0 object-cover bg-neutral-900"
                style={{
                  opacity: Math.max(
                    0,
                    Math.min(1, (scrollProgress - 0.7) / 0.2),
                  ),
                  transition: "opacity 0.3s ease",
                }}
              />

              <div className="absolute inset-0 bg-foreground/40" />

              {/* Title Text - Cycles through Larry's core services */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                {textCycles.map((text, cycleIndex) => {
                  const cycleStart = cycleIndex / textCycles.length;
                  const cycleEnd = (cycleIndex + 1) / textCycles.length;

                  const words = text.split(" ");

                  return (
                    <h2
                      key={cycleIndex}
                      className="absolute max-w-3xl font-medium leading-tight tracking-tight text-white md:text-5xl lg:text-6xl text-4xl drop-shadow-lg"
                    >
                      {words.map((word, wordIndex) => {
                        let wordOpacity = 0;
                        let wordBlur = 40;

                        if (
                          scrollProgress >= cycleStart &&
                          scrollProgress < cycleEnd
                        ) {
                          const localProgress =
                            (scrollProgress - cycleStart) /
                            (cycleEnd - cycleStart);

                          if (localProgress < 0.5) {
                            const appearProgress =
                              (localProgress / 0.5) * (words.length + 1);
                            const wordAppearProgress = Math.max(
                              0,
                              Math.min(1, appearProgress - wordIndex),
                            );
                            wordOpacity = wordAppearProgress;
                            wordBlur = (1 - wordAppearProgress) * 40;
                          } else {
                            const disappearProgress =
                              ((localProgress - 0.5) / 0.5) *
                              (words.length + 1);
                            const wordDisappearProgress = Math.max(
                              0,
                              Math.min(1, disappearProgress - wordIndex),
                            );
                            wordOpacity = 1 - wordDisappearProgress;
                            wordBlur = wordDisappearProgress * 40;
                          }
                        }

                        return (
                          <span
                            key={wordIndex}
                            className="inline-block"
                            style={{
                              opacity: wordOpacity,
                              filter: `blur(${wordBlur}px)`,
                              transition:
                                "opacity 0.1s linear, filter 0.1s linear",
                              marginRight: "0.3em",
                            }}
                          >
                            {word}
                          </span>
                        );
                      })}
                    </h2>
                  );
                })}
              </div>
            </div>

            {/* Right Column */}
            <div
              className="relative overflow-hidden rounded-xl will-change-transform"
              style={{
                width: `${sideWidth}%`,
                height: "100%",
                transform: `translateX(${sideTranslateRight}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages
                .filter((img) => img.position === "right")
                .map((img, idx) => (
                  <Image
                    key={idx}
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover bg-neutral-900"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll space to enable animation */}
      <div className="h-[400vh]" />

      {/* Description Section with Background Image and Scroll Reveal */}
      <div
        ref={textSectionRef}
        className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40 bg-black"
      >
        <div
          className="absolute top-0 left-0 right-0 z-0 pointer-events-none"
          style={{
            height: "150px",
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <ScrollRevealText text={descriptionText} />

          {/* Added a subtle CTA to match Larry's brand */}
          <div className="mt-12 opacity-100 transition-opacity duration-1000">
            <span className="inline-flex items-center justify-center px-6 py-3 border border-white/20 rounded-full text-white/70 text-sm tracking-widest uppercase hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
              Schedule a Consultation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
