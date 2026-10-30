"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Home() {
  // --- VISUALIZER INTERACTIVE STATES ---
  const [sqft, setSqft] = useState(2400);
  const [stories, setStories] = useState<1 | 2>(1);
  const [style, setStyle] = useState<
    "Modern Coastal" | "PNW Craftsman" | "Contemporary Estate"
  >("Modern Coastal");
  const [featureDeck, setFeatureDeck] = useState(true);
  const [featureGarage, setFeatureGarage] = useState(true);
  const [featureSolar, setFeatureSolar] = useState(false);
  
  const [isWireframe, setIsWireframe] = useState(false);
  const [roofCutaway, setRoofCutaway] = useState(false);

  const getEstDuration = (val: number) => {
    if (val < 1800) return "2-3 Weeks";
    if (val < 3500) return "3-4 Weeks";
    return "4-6 Weeks";
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(
      "Thank you! Your consultation request has been submitted to LM Stevens Designs & Planning."
    );
    e.currentTarget.reset();
  };

  // --- NEW VISUALIZER COMPONENT (MATCHED TO FOOTER THEME) ---
  const HouseVisualizer = () => (
    <div className="relative w-full h-[380px] sm:h-[450px] rounded-xl overflow-hidden bg-black border border-white/10 flex flex-col items-center justify-center perspective-[1000px]">
      {/* Tech Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="visualizer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#22d3ee" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#visualizer-grid)" />
        </svg>
      </div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/15 rounded-full blur-[80px] pointer-events-none" />

      {/* 3D House Container */}
      <div 
        className="relative w-[300px] h-[300px] transition-all duration-500 ease-out"
        style={{
          transform: `rotateX(20deg) rotateY(${isWireframe ? '45deg' : '30deg'}) scale(${stories === 2 ? 0.9 : 1})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Base/Slab */}
        <div 
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] h-[180px] rounded-lg transition-all duration-500 ${isWireframe ? 'bg-transparent border-2 border-cyan-500/50' : 'bg-white/5 shadow-2xl'}`}
          style={{ transform: 'rotateX(90deg) translateZ(-20px)' }}
        >
          {isWireframe && (
            <svg className="w-full h-full opacity-50" viewBox="0 0 280 180">
              <line x1="0" y1="90" x2="280" y2="90" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4" />
              <line x1="140" y1="0" x2="140" y2="180" stroke="#22d3ee" strokeWidth="1" strokeDasharray="4" />
            </svg>
          )}
        </div>

        {/* Main Walls */}
        <div 
          className={`absolute bottom-[20px] left-1/2 -translate-x-1/2 w-[260px] h-[150px] transition-all duration-500 ${isWireframe ? 'bg-transparent border-2 border-cyan-400/80' : 'bg-gradient-to-br from-white/10 to-white/5 shadow-inner'}`}
          style={{ transform: 'translateZ(0px)' }}
        >
          {!isWireframe && (
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <div className="flex justify-around">
                <div className="w-12 h-16 bg-cyan-300/20 border border-cyan-500/30 rounded-sm backdrop-blur-sm" />
                <div className="w-12 h-16 bg-cyan-300/20 border border-cyan-500/30 rounded-sm backdrop-blur-sm" />
                <div className="w-12 h-16 bg-cyan-300/20 border border-cyan-500/30 rounded-sm backdrop-blur-sm" />
              </div>
              <div className="flex justify-center">
                <div className="w-8 h-16 bg-black/60 border border-white/20 rounded-t-full" />
              </div>
            </div>
          )}
          {isWireframe && (
            <svg className="w-full h-full" viewBox="0 0 260 150">
               <rect x="20" y="20" width="40" height="50" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
               <rect x="110" y="20" width="40" height="50" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
               <rect x="200" y="20" width="40" height="50" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            </svg>
          )}
        </div>

        {/* Roof */}
        <div 
          className={`absolute bottom-[170px] left-1/2 -translate-x-1/2 w-0 h-0 transition-all duration-500 ${roofCutaway ? 'opacity-0' : 'opacity-100'}`}
          style={{ 
            transform: 'translateZ(0px)',
            borderLeft: '150px solid transparent',
            borderRight: '150px solid transparent',
            borderBottom: isWireframe ? 'none' : '100px solid rgba(2, 132, 199, 0.8)',
            filter: 'drop-shadow(0 -10px 20px rgba(34, 211, 238, 0.25))'
          }}
        >
          {isWireframe && (
            <div className="absolute -bottom-[100px] left-1/2 -translate-x-1/2 w-[300px] h-[100px] border border-cyan-500/50" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
          )}
        </div>
      </div>

      {/* Overlay Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
        <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-slate-300">
          <span><i className="fa-solid fa-hand-pointer text-cyan-400 mr-1"></i> Hover to rotate</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsWireframe(!isWireframe)} 
            className={`px-3 py-1.5 rounded-lg font-medium shadow backdrop-blur transition text-xs ${isWireframe ? 'bg-cyan-500 text-black' : 'bg-white/5 text-cyan-400 hover:bg-white/10'}`}
          >
            <i className="fa-solid fa-border-all mr-1"></i> Wireframe
          </button>
          <button 
            onClick={() => setRoofCutaway(!roofCutaway)} 
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs px-3 py-1.5 rounded-lg font-medium shadow backdrop-blur transition"
          >
            <i className="fa-solid fa-house-chimney mr-1"></i> {roofCutaway ? 'Show Roof' : 'Cutaway'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black text-slate-100 min-h-screen selection:bg-cyan-500 selection:text-white font-sans overflow-x-hidden relative">
      
      {/* =========================================
          GLOBAL BACKGROUND (Matched to Footer)
          ========================================= */}
      
      {/* Tech Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="page-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#22d3ee" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#page-grid)" />
        </svg>
      </div>

      {/* Top Announcement Bar */}
      <div className="relative z-10 bg-gradient-to-r from-black via-slate-950 to-black border-b border-white/5 py-2 text-xs font-medium text-slate-400 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Serving Mason, Kitsap & Pierce Counties with 50+ Years of Combined Experience</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:3600000000" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <i className="fa-solid fa-phone text-xs text-cyan-500"></i> Allyn, WA Studio
            </a>
            <a href="https://lmshomedesigns.com/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <i className="fa-solid fa-globe text-xs text-cyan-500"></i> Official Portal
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-compass-drafting text-xl"></i>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tighter text-white block leading-none">LM STEVENS</span>
              <span className="text-xs tracking-widest text-cyan-400 uppercase font-semibold">Designs & Planning</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
            <a href="#visualizer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <i className="fa-solid fa-cube text-cyan-500"></i> 3D CAD Visualizer
            </a>
            <a href="#portfolio" className="hover:text-cyan-400 transition-colors">Portfolio</a>
            <a href="#blog" className="hover:text-cyan-400 transition-colors">Design Article</a>
            <a href="#consultation" className="hover:text-cyan-400 transition-colors">Permit Planning</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href="#consultation" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 hover:-translate-y-0.5">
              <i className="fa-solid fa-calendar-check text-xs"></i>
              <span>Book Consultation</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-8 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Text */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-semibold backdrop-blur-md">
                <i className="fa-solid fa-drafting-compass"></i> Custom Residential Architecture & Planning
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white leading-[1.1]">
                Custom Homes, <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Permit-Ready</span> Realities.
              </h1>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                At <strong className="text-slate-200">LM Stevens Designs</strong> in Allyn, WA, we craft custom house layouts—never cookie-cutter. Bringing together over 50 years of expertise, 3D modeling, and permit-ready drawings across Mason, Kitsap, and Pierce counties.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-white/5 backdrop-blur-md p-3 rounded-lg text-center border border-white/10">
                  <span className="block text-2xl font-bold text-white">50+</span>
                  <span className="text-[11px] text-slate-400 font-medium">Years Experience</span>
                </div>
                <div className="bg-white/5 backdrop-blur-md p-3 rounded-lg text-center border border-white/10">
                  <span className="block text-2xl font-bold text-cyan-400">100%</span>
                  <span className="text-[11px] text-slate-400 font-medium">Permit Ready</span>
                </div>
                <div className="bg-white/5 backdrop-blur-md p-3 rounded-lg text-center border border-white/10">
                  <span className="block text-2xl font-bold text-white">3D CAD</span>
                  <span className="text-[11px] text-slate-400 font-medium">Virtual Walkthrough</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
                <a href="#consultation" className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-6 py-3.5 rounded-lg transition-all text-center shadow-lg shadow-cyan-500/25 hover:-translate-y-0.5">
                  Start Your Custom Plan
                </a>
                <a href="#visualizer" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-medium px-6 py-3.5 rounded-lg transition-all text-center flex items-center justify-center gap-2 backdrop-blur-md">
                  <i className="fa-solid fa-cube text-cyan-400"></i> Interactive 3D Model
                </a>
              </div>
            </div>

            {/* Hero Right Visualizer */}
            <div className="lg:col-span-7 relative">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-2 sm:p-4 border border-white/10 shadow-2xl relative">
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block animate-ping"></span>
                    <span>LM-STEVENS 3D CAD ENGINE v2.4</span>
                  </div>
                </div>
                <HouseVisualizer />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 border-y border-white/5 relative bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Architectural Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tighter">Comprehensive Planning & Custom Design Services</h2>
            <p className="text-slate-400 text-base">
              From initial coastal sketches to permit-ready construction sets, every project in Mason, Kitsap, and Pierce counties receives our full technical precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "fa-comments", title: "Personalized Consultations", desc: "We begin by listening deeply to your vision, lifestyle requirements, budget parameters, and site conditions in Western Washington to build a comprehensive planning roadmap.", bullets: ["Site topographical assessment", "Local zoning & setback analysis"] },
              { icon: "fa-cubes", title: "Sketches & 3D Modeling", desc: "Experience your home before a single nail is driven. We transform conceptual floor sketches into fully rendered high-definition 3D digital walk-throughs.", bullets: ["Spatial volume optimization", "Interactive 3D client reviews"] },
              { icon: "fa-file-signature", title: "Permit-Ready Drawings", desc: "Fast turnaround on rigorous blueprints designed for quick approval across county departments. Complete with structural coordination and engineering standards.", bullets: ["Mason, Kitsap & Pierce county ready", "Builder-ready structural plans"] },
              { icon: "fa-arrows-to-eye", title: "Smart Space-Saving", desc: "Maximized floor efficiency for any footprint. Intelligent storage solutions, multi-use zones, and open floor flow that eliminate dead wasted space.", bullets: ["Custom built-ins & flex spaces", "Ergonomic sightline design"] },
              { icon: "fa-sun", title: "Natural Lighting & Orientation", desc: "Designs tailored specifically to Western Washington’s unique solar path, framing natural Pacific Northwest views while bringing warmth and light inside.", bullets: ["Passive solar alignment", "Custom window placement strategies"] },
              { icon: "fa-leaf", title: "Sustainability & Future-Ready", desc: "Built for generations to come. Integrating eco-friendly materials, high-efficiency envelope design, EV readiness, and adaptable aging-in-place floorplans.", bullets: ["Energy-efficient building envelopes", "Universal design adaptability"] }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl mb-6 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300">
                  <i className={`fa-solid ${item.icon} text-3xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.desc}</p>
                <ul className="text-xs text-slate-300 space-y-2 border-t border-white/10 pt-4">
                  {item.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2">
                      <i className="fa-solid fa-check text-cyan-400"></i> {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visualizer & Planner Section */}
      <section id="visualizer" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
            <div>
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Interactive Studio Tool
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tighter mt-1">Custom Plan Visualizer & Estimator</h2>
              <p className="text-slate-400 text-sm mt-1">Tweak house configurations live to preview structure layouts and estimated planning timelines.</p>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-xl border border-white/10">
              {(['Modern Coastal', 'PNW Craftsman', 'Contemporary Estate'] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setStyle(item)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                    style === item ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visualizer Controls */}
            <div className="lg:col-span-4 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
                <i className="fa-solid fa-sliders text-cyan-400"></i> Floorplan Parameters
              </h3>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                  <span>Desired Footprint (Sq Ft)</span>
                  <span className="text-cyan-400 font-mono font-bold">{sqft.toLocaleString()} sq ft</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="5000"
                  step="100"
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Structure Height</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setStories(1)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition ${
                      stories === 1 ? 'border-cyan-500 bg-cyan-500/20 text-white' : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    Single Level
                  </button>
                  <button
                    onClick={() => setStories(2)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition ${
                      stories === 2 ? 'border-cyan-500 bg-cyan-500/20 text-white' : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    Two Story
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="block text-xs font-medium text-slate-300">Special Architectural Features</label>
                
                <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-cyan-500/30 transition">
                  <span className="text-xs text-slate-300 flex items-center gap-2"><i className="fa-solid fa-umbrella-beach text-cyan-400"></i> Covered Deck / Patio</span>
                  <input type="checkbox" checked={featureDeck} onChange={(e) => setFeatureDeck(e.target.checked)} className="rounded border-white/20 text-cyan-600 bg-black" />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-cyan-500/30 transition">
                  <span className="text-xs text-slate-300 flex items-center gap-2"><i className="fa-solid fa-car text-cyan-400"></i> 3-Car Extended Garage</span>
                  <input type="checkbox" checked={featureGarage} onChange={(e) => setFeatureGarage(e.target.checked)} className="rounded border-white/20 text-cyan-600 bg-black" />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-cyan-500/30 transition">
                  <span className="text-xs text-slate-300 flex items-center gap-2"><i className="fa-solid fa-solar-panel text-orange-400"></i> Eco Solar Glass Array</span>
                  <input type="checkbox" checked={featureSolar} onChange={(e) => setFeatureSolar(e.target.checked)} className="rounded border-white/20 text-cyan-600 bg-black" />
                </label>
              </div>

              <div className="relative bg-black/60 [background-image:linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] [background-size:20px_20px] p-4 rounded-xl border border-cyan-500/30 text-xs space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Estimated Design Duration:</span>
                  <span className="font-bold text-white">{getEstDuration(sqft)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Drawing Output:</span>
                  <span className="font-bold text-cyan-400">100% Permit Ready</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Primary Jurisdiction:</span>
                  <span className="font-bold text-orange-400">Mason / Kitsap County</span>
                </div>
              </div>
            </div>

            {/* Visualizer Graphic Output */}
            <div className="lg:col-span-8 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col justify-between min-h-[480px]">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs text-slate-400 font-mono">SCHEMATIC PREVIEW</span>
                  <h4 className="text-lg font-bold text-white">{style} Plan Concept</h4>
                </div>
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-mono">
                  {sqft.toLocaleString()} SQ FT
                </span>
              </div>

              <div className="my-6 relative bg-black/60 rounded-xl border border-white/10 p-6 flex flex-col items-center justify-center min-h-[300px] overflow-hidden">
                <div className="w-full max-w-md transition-all duration-500" style={{ transform: stories === 2 ? 'scaleY(1.05)' : 'scaleY(1)' }}>
                  <svg viewBox="0 0 500 350" className="w-full h-auto stroke-cyan-500 fill-none" strokeWidth="2">
                    <rect x="50" y="50" width="400" height="250" rx="4" className="stroke-cyan-400 fill-cyan-950/20" strokeWidth="3" />
                    <line x1="200" y1="50" x2="200" y2="300" strokeDasharray="4" className="stroke-slate-600" />
                    <line x1="200" y1="180" x2="450" y2="180" strokeDasharray="4" className="stroke-slate-600" />
                    <line x1="50" y1="170" x2="200" y2="170" strokeDasharray="4" className="stroke-slate-600" />
                    
                    <text x="120" y="110" fontSize="12" fill="#94a3b8" textAnchor="middle">PRIMARY SUITE</text>
                    <text x="120" y="240" fontSize="12" fill="#94a3b8" textAnchor="middle">GUEST & STUDY</text>
                    <text x="325" y="110" fontSize="12" fill="#22d3ee" textAnchor="middle" fontWeight="bold">OPEN LIVING & KITCHEN</text>

                    {featureGarage && (
                      <g>
                        <rect x="325" y="195" width="115" height="95" className="stroke-cyan-400/60 fill-cyan-950/20" strokeDasharray="2" />
                        <text x="382" y="248" fontSize="10" fill="#22d3ee" textAnchor="middle">EXTENDED GARAGE</text>
                      </g>
                    )}

                    {featureDeck && (
                      <g>
                        <rect x="20" y="80" width="28" height="140" className="stroke-orange-400/60 fill-orange-950/20" strokeDasharray="2" />
                        <text x="34" y="150" fontSize="9" fill="#fb923c" textAnchor="middle" transform="rotate(-90 34 150)">COVERED DECK</text>
                      </g>
                    )}
                  </svg>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
                <span className="text-xs text-slate-400">Ready to convert this schematic into engineer-stamped blueprints?</span>
                <a href="#consultation" className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition shadow-lg shadow-cyan-500/25">
                  Submit Specs for Review
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Featured Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tighter mt-1">Recent Western Washington Projects</h2>
              <p className="text-slate-400 text-sm mt-2 max-w-2xl">
                Explore a curation of custom floorplans and architectural home layouts designed for waterfront lots, sloped terrain, and wooded acreage across Mason, Kitsap, and Pierce counties.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold rounded-lg shadow-lg shadow-cyan-500/25">All Projects</button>
              <button className="px-4 py-2 bg-white/5 text-slate-300 hover:text-white text-xs font-semibold rounded-lg transition border border-white/10">Waterfront</button>
              <button className="px-4 py-2 bg-white/5 text-slate-300 hover:text-white text-xs font-semibold rounded-lg transition border border-white/10">Sloped Lots</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { county: "Mason County", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", title: "Hood Canal Waterfront Retreat", desc: "A custom 3-story daylight basement design maximizing panoramic fjord views while engineering around steep slope restrictions.", specs: "3,400 Sq Ft | 4 Bed | 3.5 Bath" },
              { county: "Pierce County", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", title: "Gig Harbor PNW Craftsman", desc: "Classic timber framing aesthetics fused with open-concept contemporary living, featuring extended vaulted great rooms and wrap-around covered decks.", specs: "2,850 Sq Ft | 3 Bed | 2.5 Bath" },
              { county: "Kitsap County", img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80", title: "Bainbridge Modern Farmhouse", desc: "Sustainable single-level architectural layout optimized for natural solar orientation, featuring high-efficiency insulated envelopes and integrated ADU space.", specs: "2,200 Sq Ft | 3 Bed | 2 Bath" }
            ].map((p, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 group">
                <div className="h-56 bg-black relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                  <Image src={p.img} alt={p.title} width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80 group-hover:opacity-100" />
                  <span className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md text-cyan-400 text-[11px] font-mono px-3 py-1 rounded-full border border-white/10">{p.county}</span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-white">{p.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs text-slate-300 font-mono">
                    <span>{p.specs}</span>
                    <span className="text-cyan-400 font-bold">Permit Approved</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog & Educational Section */}
      <section id="blog" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Expert Architectural Insights
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tighter">Navigating Custom Home Design & County Permitting</h2>
            <p className="text-slate-400 text-base">Key considerations for building in Washington State, from initial site evaluation to engineering sign-offs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 space-y-4 hover:border-cyan-500/30 transition">
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span className="text-cyan-400"><i className="fa-solid fa-calendar mr-1"></i> October 2026</span>
                <span>•</span>
                <span>6 Min Read</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Why Custom Home Layouts Beat Cookie-Cutter Blueprints in Western Washington</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Standard catalog floorplans often fail to account for local Pacific Northwest topography, solar angles, and strict county setback requirements. Discover how customized layouts maximize natural lighting, protect against winter moisture, and honor your specific land orientation.
              </p>
              <div className="pt-4">
                <a href="https://lmshomedesigns.com/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold flex items-center gap-2">
                  Read Full Article on Portal <i className="fa-solid fa-arrow-right text-xs"></i>
                </a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 space-y-4 hover:border-orange-500/30 transition">
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span className="text-orange-400"><i className="fa-solid fa-calendar mr-1"></i> Planning Guide</span>
                <span>•</span>
                <span>5 Min Read</span>
              </div>
              <h3 className="text-2xl font-bold text-white">The Permit-Ready Blueprint Checklist for Mason, Kitsap & Pierce Counties</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Submitting construction plans to county departments requires rigorous structural coordination, energy calculations, and septic/sewer clearances. Learn what our 50+ years of planning expertise ensures is locked into your submittal package to avoid costly delays.
              </p>
              <div className="pt-4">
                <a href="https://lmshomedesigns.com/" target="_blank" rel="noreferrer" className="text-orange-400 hover:text-orange-300 text-sm font-semibold flex items-center gap-2">
                  Read Full Article on Portal <i className="fa-solid fa-arrow-right text-xs"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section id="consultation" className="py-20 bg-white/[0.02] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-semibold backdrop-blur-md">
                <i className="fa-solid fa-phone-volume"></i> Get in Touch With Our Studio
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tighter leading-tight">Start Your Custom Home Project Today.</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Have a lot in Allyn, Belfair, Gig Harbor, or surrounding areas? Schedule a personalized consultation with our design team to discuss your layout ideas and permitting requirements.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 text-slate-300 text-sm">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <strong className="block text-white">Studio Location</strong>
                    <span>Allyn, WA (Serving Mason, Kitsap & Pierce Counties)</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-300 text-sm">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                    <i className="fa-solid fa-globe"></i>
                  </div>
                  <div>
                    <strong className="block text-white">Official Web Portal</strong>
                    <a href="https://lmshomedesigns.com/" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">lmshomedesigns.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white/5 backdrop-blur-xl p-8 sm:p-10 rounded-2xl border border-white/10 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <i className="fa-solid fa-calendar-check text-cyan-400"></i> Request Design Consultation
                </h3>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name</label>
                      <input type="text" required placeholder="John Doe" className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                      <input type="tel" required placeholder="(360) 000-0000" className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                      <input type="email" required placeholder="john@example.com" className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Project County / Location</label>
                      <select className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition">
                        <option>Mason County (Allyn / Belfair)</option>
                        <option>Kitsap County (Bainbridge / Bremerton)</option>
                        <option>Pierce County (Gig Harbor / Tacoma)</option>
                        <option>Other Western WA Location</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Project Details & Vision</label>
                    <textarea rows={4} placeholder="Tell us about your land, desired square footage, and whether you need 3D modeling or permit-ready drawings..." className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 transition"></textarea>
                  </div>

                  <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3.5 rounded-lg transition shadow-lg shadow-cyan-500/25 text-sm flex items-center justify-center gap-2 hover:-translate-y-0.5">
                    <i className="fa-solid fa-paper-plane text-xs"></i> Submit Consultation Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>      
    </div>
  );
}