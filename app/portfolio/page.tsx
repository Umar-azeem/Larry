"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, LayoutGrid, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/sections/hero-section";

// --- PORTFOLIO DATA ---
// Replace the 'src' URLs with your actual project images (e.g., "/houses/hc1.png")
const projects = [
  {
    id: 1,
    title: "Modern Lakefront Estate",
    category: "Custom Homes",
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "Allyn Hillside Remodel",
    category: "Remodels",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    title: "Detached ADU & Shop",
    category: "ADUs & Shops",
    src: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    title: "Coastal Contemporary",
    category: "Custom Homes",
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    title: "Historic Kitchen Expansion",
    category: "Remodels",
    src: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 6,
    title: "Garage with Living Space Above",
    category: "ADUs & Shops",
    src: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
];

const categories = ["All Projects", "Custom Homes", "Remodels", "ADUs & Shops"];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All Projects");

  // Filter logic
  const filteredProjects =
    activeCategory === "All Projects"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="w-full bg-[#0a0a0a] min-h-screen text-white selection:bg-[#8A1515]">
      <HeroSection />
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#8A1515] italic font-medium tracking-widest uppercase text-sm md:text-base mb-4 block">
            Our Work
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Building The Vision.<br className="hidden md:block" /> Crafting The Reality.
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Explore our portfolio of custom homes, remodels, and architectural designs across Western Washington. Every project is a unique collaboration with our clients.
          </p>
        </motion.div>
      </section>

      {/* =========================================
          FILTER CONTROLS
      ========================================= */}
      <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#8A1515] text-white shadow-lg shadow-[#8A1515]/20"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* =========================================
          PORTFOLIO GRID
      ========================================= */}
      <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto pb-32">
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer bg-white/5"
              >
                <img
                  src={project.src}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Text Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-[#8A1515] text-sm font-semibold mb-2 block translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {project.category}
                  </span>
                  <h3 className="text-white text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {project.title}
                  </h3>
                  
                  {/* Icon on hover */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <ArrowRight size={20} className="text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Empty State (in case a category has no projects) */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-white/50">
            <LayoutGrid size={48} className="mx-auto mb-4 opacity-50" />
            <p>No projects found in this category yet.</p>
          </div>
        )}
      </section>

      {/* =========================================
          PROCESS / TRUST SECTION
      ========================================= */}
      <section className="bg-[#111111] py-24 border-y border-white/5">
        <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                From The First Sketch To The Final Permit.
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                We know that building or remodeling is a major investment. That's why Larry and the team are personally involved at every stage. We handle the complexities of local zoning and permit-ready planning so you can focus on the excitement of your new space.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Personal involvement from Larry Stevens",
                  "Real-time virtual walkthroughs",
                  "Tailored to local Washington requirements",
                  "50+ years of residential expertise"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <CheckCircle2 size={20} className="text-[#8A1515]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#8A1515] rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
            >
              {/* Decorative background circle */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <h3 className="text-3xl font-bold text-white mb-4 relative z-10">
                Ready to start your project?
              </h3>
              <p className="text-white/80 mb-8 relative z-10">
                Connect with our expert team today for a free estimate and to discuss your vision.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#8A1515] px-8 py-4 rounded-full font-bold hover:bg-neutral-100 transition-colors w-full sm:w-auto relative z-10"
              >
                GET A FREE ESTIMATE
                <ArrowRight size={18} />
              </Link>
              
              <div className="mt-6 text-sm text-white/60 relative z-10">
                Or call us directly at <a href="tel:3602279861" className="text-white hover:underline">360-227-9861</a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}