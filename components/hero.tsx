"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const SLIDE_DURATION = 6000;

const slides = [
  {
    id: "modern",
    tab: "Modern",
    video: "/videos/v5.mp4",
    title: "Modern Custom Home",
    text: "Clean lines, large glazing, and seamless integration with the landscape.",
    specs: ["Allyn, WA", "Custom", "Permit-Ready"],
    href: "/portfolio/modern",
  },
  {
    id: "traditional",
    tab: "Traditional",
    video: "/videos/v6.mp4",
    title: "Classic Pacific Northwest",
    text: "Timeless gable rooflines, warm wood accents, and welcoming curb appeal.",
    specs: ["Mason Co.", "Remodel", "50+ Yrs"],
    href: "/portfolio/traditional",
  },
  {
    id: "adu",
    tab: "ADU",
    video: "/videos/v7.mp4",
    title: "Detached ADU",
    text: "Maximize your property value with a fully permitted backyard cottage.",
    specs: ["Tacoma", "ADU", "Zoning"],
    href: "/portfolio/adu",
  },
  {
    id: "shop",
    tab: "Shop",
    video: "/videos/v8.mp4",
    title: "Custom Shop & Garage",
    text: "Engineered for heavy equipment, high ceilings, and PNW weather.",
    specs: ["Pierce Co.", "Structural", "Engineered"],
    href: "/portfolio/shop",
  },
];

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

function Tab({
  label,
  index,
  active,
  progress,
  onClick,
}: {
  label: string;
  index: number;
  active: number;
  progress: MotionValue<number>;
  onClick: () => void;
}) {
  const width = useTransform(progress, (v) =>
    index < active ? "100%" : index === active ? `${v * 100}%` : "0%",
  );

  return (
    <button
      onClick={onClick}
      aria-label={`Show ${label} style`}
      aria-current={index === active}
      className="group flex-1 text-left focus-visible:outline-none"
    >
      <span
        className={`block text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold mb-1.5 transition-colors ${
          index === active
            ? "text-white"
            : "text-white/40 group-hover:text-white/70"
        }`}
      >
        {label}
      </span>
      <span className="block h-[1.5px] w-full bg-white overflow-hidden rounded-full group-focus-visible:ring-2 ring-white/70">
        <motion.span className="block h-full bg-primary" style={{ width }} />
      </span>
    </button>
  );
}

export function Hero() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const progress = useMotionValue(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const goTo = useCallback(
    (i: number) => {
      progress.set(0);
      setActive(i);
    },
    [progress],
  );

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.volume = 0;
        v.currentTime = 0;
        v.play().catch((error) => {
          console.warn(`Video ${i} failed to play:`, error);
        });
      } else {
        v.pause();
      }
    });
  }, [active]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;

      if (!hovered && !document.hidden) {
        const next = progress.get() + dt / SLIDE_DURATION;
        if (next >= 1) {
          goTo((active + 1) % slides.length);
          return;
        }
        progress.set(next);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, hovered, goTo, progress]);

  const slide = slides[active];

  return (
    <section className="relative min-h-screen m-2 rounded-2xl bg-[#05080a]">
      {/* Video Backgrounds */}
      {slides.map((s, i) => (
        <motion.video
          key={`${s.id}-${s.video}`}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          src={s.video}
          muted={true}
          loop
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          aria-hidden={i !== active}
          className="absolute inset-0 h-screen rounded-2xl w-full object-cover object-center"
          initial={false}
          animate={{
            opacity: i === active ? 1 : 0,
          }}
          transition={{ duration: 1.2, ease: EASE }}
        />
      ))}

      {/* Cinematic Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05080a]/40 via-black/20 to-black/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#05080a]/30 via-transparent to-transparent" />

      {/* Compact Floating Card */}
      <motion.div
        className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto z-20 sm:w-[360px]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <div className="rounded-2xl border border-white/10 bg-[#0a0f14]/15 p-4 sm:p-5 text-white shadow-2xl backdrop-blur-xl">
          {/* Tabs */}
          <div className="flex gap-2 sm:gap-3">
            {slides.map((s, i) => (
              <Tab
                key={s.id}
                label={s.tab}
                index={i}
                active={active}
                progress={progress}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          {/* Details */}
          <div
            className="mt-4 sm:mt-5 min-h-[100px] sm:min-h-[110px]"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-lg sm:text-xl font-bold leading-tight tracking-tight text-white">
                    {slide.title}
                  </h2>
                  <span className="mt-1 text-[10px] tabular-nums text-white/40 font-mono">
                    0{active + 1}/0{slides.length}
                  </span>
                </div>

                <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-snug line-clamp-2">
                  {slide.text}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {slide.specs.map((spec) => (
                    <span
                      key={spec}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/70"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA */}
          <a
            href={slide.href}
            className="mt-4 inline-flex w-full items-center justify-between rounded-full bg-primary px-4 py-2.5 text-xs sm:text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            View {slide.tab} Project
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
