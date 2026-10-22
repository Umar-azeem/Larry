"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

// Larry's actual Google Reviews
const testimonials = [
  {
    name: "Greg Barich",
    date: "February 13, 2025",
    text: "Very professional and personal. Our plans were walked through every step of the way and the attention to detail was outstanding.",
  },
  {
    name: "Martin Lybeck",
    date: "October 1, 2024",
    text: "Larry has gone above and beyond! Great ideas and incredible patience. Thanks Larry!",
  },
  {
    name: "Stephanie Gabbard",
    date: "October 2, 2024",
    text: "Very friendly and quickly responds to questions and ideas with what you need. Gives suggestions and is highly knowledgeable.",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Calculate how far the section is from the top of the viewport
      setScrollOffset(rect.top * 0.15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden bg-background"
    >
      {/* Main Cinematic Image Container */}
      <div className="relative aspect-[16/9] w-full min-h-[600px] md:min-h-[800px] flex items-end justify-center">
        {/* Parallax Background Image */}
        <div
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{ transform: `translateY(${scrollOffset}px)` }}
        >
          <Image
            src="/images/07-finished-house-front.svg" // Using your premium house asset
            alt="LMS Home Designs Custom Architecture"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Deep Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f14] via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Floating Google Review Badge */}
        <div className="absolute top-12 right-6 md:right-12 lg:right-20 z-20 flex flex-col items-end">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl flex items-center gap-4 animate-float">
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white text-xs mt-1 font-medium">
                Based on 12 Google Reviews
              </p>
            </div>
            <div className="h-10 w-[1px] bg-white/20 mx-1" />
            <span className="text-3xl font-bold text-white">5.0</span>
          </div>
        </div>

        {/* Main Quote Text Overlay */}
        <div className="relative z-10 w-full px-6 pb-32 md:px-12 md:pb-40 lg:px-20 lg:pb-48 flex flex-col items-center text-center">
          <div className="max-w-5xl">
            {/* Animated Quote Icon */}
            <svg
              className="w-12 h-12 mx-auto text-cyan-400 mb-6 opacity-80"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            <p className="text-2xl leading-relaxed text-white md:text-3xl lg:text-5xl lg:leading-tight font-medium tracking-tight drop-shadow-lg">
              Design the life you’ve imagined.{" "}
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-orange-300">
                We translate your space, style, and story
              </span>{" "}
              into a design that lives beautifully and works effortlessly.
            </p>

            {/* Architect Signature */}
            <div className="mt-10 flex flex-col items-center gap-2">
              <div className="h-10 w-[1px] bg-gradient-to-b from-cyan-400 to-transparent" />
              <p className="text-white font-bold tracking-widest uppercase text-sm">
                Larry Stevens
              </p>
              <p className="text-slate-400 text-xs tracking-wider uppercase">
                Principal Architect
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Glass Testimonial Carousel */}
      <div className="relative z-20 -mt-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto bg-[#0a0f14]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
          <div className="relative overflow-hidden h-[120px] md:h-[100px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col justify-center items-center text-center ${
                  index === activeIndex
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <p className="text-slate-300 text-lg md:text-xl italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-white font-semibold text-sm">
                    {testimonial.name}
                  </span>
                  <span className="text-slate-500 text-xs">
                    {testimonial.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-cyan-400"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `,
        }}
      />
    </section>
  );
}
