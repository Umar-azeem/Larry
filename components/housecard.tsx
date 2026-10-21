"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import {
  Bath,
  BedDouble,
  Car,
  Heart,
  Maximize2,
  Ruler,
  X,
} from "lucide-react"
import data from "./../data/house.json"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
type House = {
  id: number
  code: string
  name: string
  beds: number
  baths: number
  garage: number
  area: number
  price: number
  design: string
  plan: string | null
  extras: string[]
}

const houses = data.houses as unknown as House[]

const EASE = [0.21, 0.47, 0.32, 0.98] as const
const MARQUEE_BG = "/images/b1.png"
const INK = "text-[#000000]"
const ACCENT = "bg-[#000000]"

const FILTERS = [
  { label: "All", test: (_: House) => true },
  { label: "3 bedrooms", test: (h: House) => h.beds === 3 },
  { label: "4 bedrooms", test: (h: House) => h.beds === 4 },
  { label: "5 bedrooms", test: (h: House) => h.beds >= 5 },
]

/* ------------------------------------------------------------------ */
/*  Typographic motion                                                 */
/* ------------------------------------------------------------------ */
function RevealWords({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.12em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 4 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: i * 0.09, ease: EASE }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function ScrollMarquee({ words, reverse = false }: { words: string[]; reverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const x = useTransform(scrollYProgress, [0, 1], reverse ? ["-35%", "0%"] : ["0%", "-35%"])
  const items = [...words, ...words, ...words, ...words]

  return (
    <div ref={ref} aria-hidden className="overflow-hidden whitespace-nowrap select-none">
      <motion.div style={{ x }} className="flex w-max gap-8 md:gap-14">
        {items.map((w, i) => (
          <span
            key={i}
            className="text-6xl md:text-8xl lg:text-9xl font-semibold leading-none tracking-tighter"
            style={
              i % 2
                ? { color: "transparent", WebkitTextStroke: "1.5px currentColor" }
                : undefined
            }
          >
            {w}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function Roll({ a, b }: { a: string; b: string }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-out group-hover/btn:-translate-y-full">
        {a}
      </span>
      <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out group-hover/btn:translate-y-0">
        {b}
      </span>
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */
function HouseCard({
  house,
  index,
  liked,
  onLike,
  onOpen,
}: {
  house: House
  index: number
  liked: boolean
  onLike: () => void
  onOpen: () => void
}) {
  const boxRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<"design" | "plan">("design")
  const [hovered, setHovered] = useState(false)

  const reveal = useMotionValue(0)
  const spring = useSpring(reveal, { stiffness: 160, damping: 24, mass: 0.6 })
  const rightInset = useTransform(spring, (v) => 100 - v)
  const clipPath = useMotionTemplate`inset(0% ${rightInset}% 0% 0%)`
  const lineLeft = useMotionTemplate`${spring}%`
  const lineOpacity = useTransform(spring, (v) => (v > 1 && v < 99 ? 1 : 0))

  useEffect(() => {
    reveal.set(mode === "plan" ? 100 : 0)
  }, [mode, reveal])

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !house.plan || mode === "plan") return
    const r = boxRef.current?.getBoundingClientRect()
    if (!r) return
    reveal.set(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)))
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: EASE }}
      className="group rounded-[28px] bg-white p-3 shadow-[0_1px_0_rgba(0,0,0,0.06),0_18px_40px_-24px_rgba(0,0,0,0.35)]"
    >
      {/* ---------- Image compare: design <-> skeleton ---------- */}
      <div
        ref={boxRef}
        onPointerMove={onMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => {
          setHovered(false)
          reveal.set(mode === "plan" ? 100 : 0)
        }}
        className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[#F0F0F0]"
      >
        {/* Changed to object-contain to show the full image */}
        <Image
          src={house.design}
          alt={`${house.name} house design`}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-contain transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />

        {house.plan && (
          <motion.div className="absolute inset-0 bg-white" style={{ clipPath }}>
            <Image
              src={house.plan}
              alt={`${house.name} floor plan`}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="object-contain p-3"
            />
          </motion.div>
        )}

        {house.plan && (
          <motion.div
            className="pointer-events-none absolute inset-y-0 w-[2px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
            style={{ left: lineLeft, opacity: lineOpacity }}
          >
            <span className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[10px] font-medium text-[#000] shadow-lg">
              ⇆
            </span>
          </motion.div>
        )}

        <motion.span
          aria-hidden
          className="pointer-events-none absolute right-4 top-2 z-10 text-7xl font-semibold leading-none tracking-tighter"
          style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(0,0,0,0.3)" }} // Changed stroke to dark so it's visible on white bg
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
        >
          {String(house.id).padStart(2, "0")}
        </motion.span>

        <AnimatePresence>
          {house.plan && mode === "design" && !hovered && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute bottom-3 left-3 hidden rounded-full bg-black/45 px-3 py-1.5 text-xs text-white backdrop-blur-md md:block"
            >
              Move across to see the plan
            </motion.span>
          )}
        </AnimatePresence>

        <div className="absolute bottom-3 left-3 z-10 flex rounded-full bg-black/45 p-1 text-xs text-white backdrop-blur-md md:left-auto md:right-14">
          {(["design", "plan"] as const).map((m) => {
            const disabled = m === "plan" && !house.plan
            return (
              <button
                key={m}
                disabled={disabled}
                onClick={() => setMode(m)}
                className="relative rounded-full px-3 py-1.5 capitalize disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                title={disabled ? "Floor plan coming soon" : undefined}
              >
                {mode === m && (
                  <motion.span
                    layoutId={`toggle-${house.id}`}
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className={`relative ${mode === m ? "text-[#000]" : ""}`}>{m}</span>
              </button>
            )
          })}
        </div>

        <button
          onClick={onOpen}
          aria-label={`Quick view ${house.name}`}
          className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#000] shadow-md transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#000]"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {/* ---------- Details ---------- */}
      <div className="px-2 pb-2 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-[#000]/55">{house.code}</p>
            <h3 className={`text-2xl font-semibold tracking-tight ${INK}`}>{house.name}</h3>
          </div>
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#000]/70">
          <li className="flex items-center gap-1.5"><BedDouble className="h-4 w-4" />{house.beds} bed</li>
          <li className="flex items-center gap-1.5"><Bath className="h-4 w-4" />{house.baths} bath</li>
          <li className="flex items-center gap-1.5"><Car className="h-4 w-4" />{house.garage} car</li>
          <li className="flex items-center gap-1.5"><Ruler className="h-4 w-4" />{house.area} m²</li>
        </ul>

        <div className="mt-5 flex gap-2">
          <button
            onClick={onOpen}
            className={`group/btn flex-1 rounded-full px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black ${ACCENT} text-white hover:bg-neutral-800`}
          >
            <Roll a="View Details" b="View Details" />
          </button>

          <button
            onClick={onLike}
            aria-label={liked ? "Remove from saved" : "Save design"}
            aria-pressed={liked}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#000]/15 transition-colors hover:border-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            <motion.span
              key={String(liked)}
              initial={{ scale: 0.4 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <Heart
                className={`h-5 w-5 ${liked ? "fill-black text-black" : "text-[#000]"}`}
              />
            </motion.span>
          </button>
        </div>
      </div>
    </motion.article>
  )
}

/* ------------------------------------------------------------------ */
/*  Quick view                                                         */
/* ------------------------------------------------------------------ */
function QuickView({
  house,
  onClose,
}: {
  house: House
  onClose: () => void
}) {
  const [active, setActive] = useState(0)
  const designs = [house.design, ...house.extras]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={house.name}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-t-[32px] bg-white p-4 sm:rounded-[32px] sm:p-6"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#000] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[#F0F0F0]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={designs[active]}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {/* Changed to object-contain to show full image */}
                  <Image src={designs[active]} alt={`${house.name} design`} fill sizes="50vw" className="object-contain p-2" />
                </motion.div>
              </AnimatePresence>
              <span className="absolute left-3 top-3 rounded-full bg-black/45 px-3 py-1 text-xs text-white backdrop-blur-md">
                Design
              </span>
            </div>
            {designs.length > 1 && (
              <div className="mt-3 flex gap-2">
                {designs.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActive(i)}
                    aria-label={`View render ${i + 1}`}
                    className={`relative h-14 w-20 overflow-hidden rounded-xl ring-2 bg-[#F0F0F0] transition ${
                      i === active ? "ring-black" : "ring-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={src} alt="" fill sizes="80px" className="object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-[#000]/10 bg-white md:aspect-auto">
            {house.plan ? (
              <Image src={house.plan} alt={`${house.name} floor plan`} fill sizes="50vw" className="object-contain p-4" />
            ) : (
              <div className="flex h-full min-h-[200px] items-center justify-center text-sm text-[#000]/50">
                Floor plan coming soon
              </div>
            )}
            <span className="absolute left-3 top-3 rounded-full bg-[#000] px-3 py-1 text-xs text-white">
              Floor plan
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4 px-1">
          <div>
            <p className="text-xs text-[#000]/55">{house.code}</p>
            <h3 className={`text-4xl font-semibold tracking-tight ${INK}`}>{house.name}</h3>
            <p className="mt-2 text-sm text-[#000]/70">
              {house.beds} bed · {house.baths} bath · {house.garage} car · {house.area} m²
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className={`rounded-full px-6 py-3 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black ${ACCENT} hover:bg-neutral-800`}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export function HouseCards() {
  const [filter, setFilter] = useState(0)
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const [open, setOpen] = useState<House | null>(null)

  const toggle = (set: Set<number>, id: number) => {
    const next = new Set(set)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  }

  const list = houses.filter(FILTERS[filter].test)
  const close = useCallback(() => setOpen(null), [])

  const bandRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: bandProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end start"],
  })
  const bgY = useTransform(bandProgress, [0, 1], ["-8%", "8%"])

  return (
    <section className="relative overflow-hidden bg-[#EDEFEA] pb-24 md:pb-32">
      {/* Typographic marquee */}
      <div ref={bandRef} className="relative overflow-hidden py-14 text-white md:py-20">
        <motion.div className="absolute -inset-y-[12%] inset-x-0" style={{ y: bgY }}>
          <Image
            src={MARQUEE_BG}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#000]/55" />

        <div className="relative space-y-2">
          <ScrollMarquee words={["Design", "Floor plan", "Build", "Live"]} />
          <ScrollMarquee words={["Home", "Garden", "Garage", "Light"]} reverse />
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-7xl px-6">
        {/* Heading - ONLY HEADING */}
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className={`max-w-3xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl ${INK}`}>
            <RevealWords text="Pick the house," />
            <br />
            <RevealWords text="see the bones." />
          </h2>
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-wrap items-center gap-2">
          {FILTERS.map((f, i) => (
            <button
              key={f.label}
              onClick={() => setFilter(i)}
              className="relative rounded-full px-5 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              {filter === i && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-[#000]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className={`relative ${filter === i ? "text-white" : "text-[#000]"}`}>{f.label}</span>
            </button>
          ))}
          <span className="ml-auto overflow-hidden text-sm tabular-nums text-[#000]/60">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={list.length}
                className="inline-block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {list.length}
              </motion.span>
            </AnimatePresence>{" "}
            designs
          </span>
        </div>

        {/* Grid */}
        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((h, i) => (
              <HouseCard
                key={h.id}
                house={h}
                index={i}
                liked={liked.has(h.id)}
                onLike={() => setLiked((s) => toggle(s, h.id))}
                onOpen={() => setOpen(h)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Quick view */}
      <AnimatePresence>
        {open && (
          <QuickView
            house={open}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </section>
  )
}