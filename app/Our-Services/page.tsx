// app/services/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Ruler,
  Home,
  Hammer,
  Building2,
  ChevronDown,
  Phone,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Compass,
  PencilRuler,
  Box,
} from "lucide-react";

/* ============================================================
   SERVICE DATA
   ============================================================ */
const services = [
  {
    id: "design-planning",
    title: "Design & Planning",
    icon: Ruler,
    tagline: "Where vision meets buildable reality.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop",
    alt: "Architectural blueprints and planning materials on a desk",
    description:
      "At LM Stevens Designs, our Design and Planning services in Allyn, Washington bring together personalization, precision, and decades of expertise to create homes that truly fit your life. We craft custom layouts—never cookie-cutter—using consultations, sketches, 3D modeling, and permit-ready drawings to shape spaces that balance comfort, function, efficiency, and style. Whether it's a coastal cottage or a large family estate, we combine smart space-saving strategies, natural lighting, sustainability, and future-ready design into every plan. Backed by over 50 years of local experience and trusted across Mason, Kitsap, and Pierce counties, our team delivers an organized process, clear communication, fast turnaround, and reliable coordination with engineers and builders. From initial concepts to construction-ready documents, we're more than designers—we're planning partners committed to turning your ideas into a beautiful, buildable, and lasting reality.",
    features: [
      "Personalized consultations & sketches",
      "3D modeling & visual walkthroughs",
      "Permit-ready construction drawings",
      "Space-saving & sustainable strategies",
    ],
  },
  {
    id: "custom-home-designs",
    title: "Custom Home Designs",
    icon: Home,
    tagline: "Your story, your lifestyle, your dream home.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    alt: "Modern custom home exterior",
    description:
      "At LM Stevens Designs, our Custom Home Designs in Allyn, WA start with your story, your lifestyle, and your vision, bringing dream homes to life through a personal, hands-on design process backed by over 50 years of Northwest experience. We guide you from early sketches to detailed, permit-ready plans, ensuring every layout, elevation, and material choice reflects how you live and how your property works. Whether you want a cozy cottage, a modern open-concept home, a luxury residence, or an affordable custom build, our designs prioritize smart flow, natural light, energy efficiency, and long-term comfort. Every plan is crafted around your routines, your land, and your goals, making construction smoother and the final home uniquely yours. Trusted across Mason, Kitsap, and Pierce Counties, we deliver clear communication, fast turnaround, transparent pricing, and designs that pass permitting with ease — creating homes that are beautiful, functional, and built around the way you truly want to live.",
    features: [
      "Hands-on, personal design process",
      "Layouts tailored to your land & lifestyle",
      "Natural light & energy efficiency focus",
      "Transparent pricing & fast turnaround",
    ],
  },
  {
    id: "new-home-construction",
    title: "New Home Construction",
    icon: Hammer,
    tagline: "Built right, from first sketch to keys.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop",
    alt: "Home under construction with framing visible",
    description:
      "At LM Stevens Designs, our New Home Construction service in Allyn, WA is centered on building homes that feel personal, purposeful, and perfectly suited to your life. With over 50 years of experience, we guide homeowners through a seamless design-to-build process that covers everything from planning, permits, and site preparation to full construction and final walkthroughs. We shape every project around your vision—whether it's a lakefront retreat, a cozy family home, or a luxury estate—using smart layouts, durable materials, and energy-efficient strategies that perform beautifully in Northwest weather. As trusted custom home builders across Mason, Kitsap, and Pierce Counties, we focus on clear communication, honest pricing, and craftsmanship that stands the test of time. From affordable builds to high-end designs, our team ensures your home is unique, functional, and built the right way from the first sketch to the moment you hold the keys.",
    features: [
      "Design-to-build under one roof",
      "Permits, site prep & full construction",
      "Northwest-weather durable materials",
      "Honest pricing & final walkthroughs",
    ],
  },
  {
    id: "architectural-design",
    title: "Architectural Design",
    icon: Building2,
    tagline: "Clarity, creativity, and precision — start to finish.",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2000&auto=format&fit=crop",
    alt: "Modern architectural detail of a home",
    description:
      "Our Architectural Design services bring every part of your project together with clarity, creativity, and precision, covering everything from design and planning to complete construction support. We create detailed floor plans, 3D renderings, CAD drawings, site plans, as-builts, and sustainable design layouts tailored to your property and lifestyle. Whether you need custom home designs, modular or multigenerational layouts, or space-optimized solutions, we handle each step with purpose. Our build and management services cover new home construction, residential developments, tenant improvements, and full project coordination to keep everything on schedule. For remodels and upgrades, we design room additions, kitchen and bath transformations, attic and basement conversions, accessible spaces, garages, decks, guesthouses, and pool houses. From concept to construction, every line, model, and plan is crafted to bring your vision to life with efficiency, durability, and style delivering results that exceed expectations.",
    features: [
      "Floor plans, 3D renders & CAD drawings",
      "Site plans, as-builts & sustainable layouts",
      "Additions, remodels & conversions",
      "Full project coordination & construction support",
    ],
  },
];

/* ============================================================
   SUBMENU
   ============================================================ */
const serviceSubmenu = [
  { label: "Design & Planning", href: "#design-planning", icon: Ruler },
  { label: "Custom Home Designs", href: "#custom-home-designs", icon: Home },
  { label: "New Home Construction", href: "#new-home-construction", icon: Hammer },
  { label: "Architecture Design and Planning", href: "#architectural-design", icon: Building2 },
];

/* ============================================================
   BLOG DATA
   ============================================================ */
const blogPosts = [
  {
    title: "5 Questions to Ask Before Designing a Custom Home",
    excerpt:
      "From lot orientation to future family needs — the questions that shape a smarter, more livable plan.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    alt: "Interior design planning table with samples",
    date: "March 2025",
    read: "6 min read",
  },
  {
    title: "Design-to-Build: What the Process Actually Looks Like",
    excerpt:
      "A clear, step-by-step walkthrough of how a vision becomes permit-ready plans and a finished home.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop",
    alt: "Home construction progress",
    date: "February 2025",
    read: "8 min read",
  },
  {
    title: "Designing for the Northwest Climate",
    excerpt:
      "Smart materials, natural light, and energy-efficient strategies that perform in Mason, Kitsap & Pierce counties.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
    alt: "Finished luxury home exterior",
    date: "January 2025",
    read: "5 min read",
  },
];

/* ============================================================
   NAVBAR WITH SUBMENU
   ============================================================ */
function ServicesNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
          LM <span className="text-emerald-600">Stevens</span> Designs
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          <Link href="/" className="hover:text-emerald-600 transition">Home</Link>

          {/* Our Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-emerald-600 transition">
              Our Services <ChevronDown size={16} />
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 mt-3 w-72 rounded-xl bg-white shadow-xl border border-slate-100 overflow-hidden"
                >
                  {serviceSubmenu.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition text-slate-700"
                    >
                      <item.icon size={18} className="text-emerald-600" />
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/about" className="hover:text-emerald-600 transition">About</Link>
          <Link href="/contact" className="hover:text-emerald-600 transition">Contact</Link>
        </nav>

        <a
          href="tel:+13605551234"
          className="hidden sm:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition shadow-lg shadow-emerald-600/20"
        >
          <Phone size={16} /> Call Now
        </a>
      </div>
    </header>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-slate-900 text-white">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/30 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-teal-400/20 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{ y, opacity }} className="relative max-w-7xl mx-auto px-6 py-28 md:py-36 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-400/30 px-4 py-1.5 text-sm text-emerald-300 mb-6"
          >
            <Sparkles size={16} /> 50+ Years of Northwest Expertise
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
          >
            Design. Plan. <span className="text-emerald-400">Build.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-slate-300 max-w-lg"
          >
            Whether you're planning a custom home, remodel, addition, ADU, garage, or shop — we prepare the drawings you need, and guide you from first concept to construction-ready.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a href="#services" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-full font-semibold transition shadow-lg shadow-emerald-600/30">
              Explore Our Offerings <ArrowRight size={18} />
            </a>
            <a href="tel:+13605551234" className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 px-6 py-3 rounded-full font-semibold transition">
              <Phone size={18} /> Call Now
            </a>
          </motion.div>
        </div>

        {/* 3D-ish floating card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative"
          style={{ perspective: 1000 }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
          >
            <Image
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop"
              alt="Architectural planning desk"
              width={800}
              height={600}
              className="object-cover w-full h-[360px]"
              priority
            />
          </motion.div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-white text-slate-900 rounded-xl shadow-xl px-5 py-4 flex items-center gap-3"
          >
            <CheckCircle2 className="text-emerald-600" />
            <div>
              <p className="text-xs text-slate-500">Permit-ready</p>
              <p className="text-sm font-semibold">Design & Planning</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   SERVICE SECTION
   ============================================================ */
function ServiceSection({ service, index }) {
  const isEven = index % 2 === 0;
  const Icon = service.icon;

  return (
    <section id={service.id} className="py-20 md:py-28 border-b border-slate-100 last:border-none">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className={`relative ${isEven ? "" : "md:order-2"}`}
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
            <Image
              src={service.image}
              alt={service.alt}
              width={900}
              height={650}
              className="object-cover w-full h-[380px] hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute -top-5 -right-5 h-24 w-24 rounded-2xl bg-emerald-600/10 border border-emerald-600/20 flex items-center justify-center backdrop-blur">
            <Icon className="text-emerald-600" size={36} />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={isEven ? "" : "md:order-1"}
        >
          <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm mb-3">
            <Icon size={18} /> {service.tagline}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            {service.title}
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed">{service.description}</p>

          <ul className="mt-6 grid sm:grid-cols-2 gap-3">
            {service.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <a
            href="tel:+13605551234"
            className="mt-8 inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full font-semibold transition"
          >
            <Phone size={18} /> Call Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   BLOG SECTION
   ============================================================ */
function BlogSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">From the Blog</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Insights for smarter home planning
          </h2>
          <p className="mt-4 text-slate-600">
            Practical guidance from 50+ years of designing and building in the Northwest.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl ring-1 ring-slate-200 transition"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.alt}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span>{post.date}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span>{post.read}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-emerald-600 font-semibold text-sm">
                  Read more <ArrowRight size={14} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA STRIP
   ============================================================ */
function CTAStrip() {
  return (
    <section className="py-20 bg-emerald-600 text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">Ready to plan your dream home?</h2>
          <p className="mt-3 text-emerald-50">
            Talk with our design team in Allyn, WA — serving Mason, Kitsap & Pierce counties.
          </p>
        </div>
        <a
          href="tel:+13605551234"
          className="inline-flex items-center gap-2 bg-white text-emerald-700 px-7 py-3.5 rounded-full font-bold hover:bg-emerald-50 transition shadow-xl"
        >
          <Phone size={18} /> Call Now
        </a>
      </div>
    </section>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <ServicesNav />
      <Hero />

      <section id="services" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">What we offer</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Explore our offerings
            </h2>
            <p className="mt-4 text-slate-600">
              Whether you're planning a custom home, remodel, addition, ADU, garage, or shop, we can prepare the drawings you need.
            </p>
          </motion.div>

          {services.map((service, index) => (
            <ServiceSection key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>

      <BlogSection />
      <CTAStrip />
    </main>
  );
}