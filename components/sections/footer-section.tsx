"use client";

import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  services: [
    { label: "Design & Planning", href: "#services" },
    { label: "Custom Home Designs", href: "#services" },
    { label: "New Home Construction", href: "#services" },
    { label: "Architectural Design", href: "#services" },
  ],
  quickLinks: [
    { label: "About Us", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Areas We Serve", href: "#locations" },
    { label: "Contact Us", href: "#contact" },
  ],
};

export function FooterSection() {
  return (
    <footer className="relative bg-[#0a0f14] overflow-hidden border-t border-white/5 pt-24 pb-0 font-sans">
      {/* =========================================
          PRO-LEVEL 3D BACKGROUND
          ========================================= */}

      {/* Tech Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="pro-grid"
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
          <rect width="100%" height="100%" fill="url(#pro-grid)" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand & Contact Info */}
          <div className="lg:col-span-5">
            <Link href="#hero" className="group inline-block mb-6">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-white">
                LMS Home{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Designs
                </span>
              </h2>
              <div className="h-1 w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-hover:w-full mt-2 rounded-full" />
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-400 font-medium mb-10">
              For over 50 years, LMS Home Designs has been offering expert home
              design, building, and construction management services across the
              West Coast.
            </p>

            {/* Pro-Level Contact Cards */}
            <div className="space-y-4 max-w-md">
              <a
                href="tel:3602279861"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(34,211,238,0.1)]"
              >
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
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-0.5">
                    Call Us
                  </p>
                  <p className="text-base font-semibold text-white tracking-wide">
                    360 227-9861
                  </p>
                </div>
              </a>

              <a
                href="mailto:lmsdesignsllc@gmail.com"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-orange-500/50 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(249,115,22,0.1)]"
              >
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
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-0.5">
                    Email Us
                  </p>
                  <p className="text-base font-semibold text-white tracking-wide">
                    lmsdesignsllc@gmail.com
                  </p>
                </div>
              </a>

              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-blue-500/50 hover:-translate-y-1 cursor-default">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-all duration-300">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-0.5">
                    Visit Us
                  </p>
                  <p className="text-sm font-medium text-slate-300">
                    91 E Wheelwright St #4, Allyn, WA 98524
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer for layout */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Services Links */}
          <div className="lg:col-span-2">
            <h4 className="mb-6 text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Services
            </h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm font-medium text-slate-400 transition-all duration-300 hover:text-white"
                  >
                    <span className="w-0 h-[1px] bg-cyan-400 mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="mb-6 text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              Quick Links
            </h4>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm font-medium text-slate-400 transition-all duration-300 hover:text-white"
                  >
                    <span className="w-0 h-[1px] bg-orange-400 mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* =========================================
          BOTTOM BAR
          ========================================= */}
      <div className="relative z-10 mt-16 border-t border-white/10 bg-[#0a0f14]/80 backdrop-blur-xl px-6 py-8 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-xs text-slate-500 font-medium text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} LMS Home Designs LLC.</p>
            <span className="hidden md:inline text-white/20">|</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold text-slate-300 uppercase tracking-wider transition-all duration-300 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-400/10 group"
            >
              <span className="relative z-10">Facebook</span>
            </a>
            <a
              href="https://houzz.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold text-slate-300 uppercase tracking-wider transition-all duration-300 hover:text-white hover:border-orange-400/50 hover:bg-orange-400/10 group"
            >
              <span className="relative z-10">Houzz</span>
            </a>
          </div>
        </div>
      </div>

      {/* =========================================
          CUSTOM ANIMATIONS
          ========================================= */}
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
    </footer>
  );
}
