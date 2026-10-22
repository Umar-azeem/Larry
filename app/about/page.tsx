"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  Video,
  MapPin,
  FileCheck,
  Users,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/sections/hero-section";

// Feature List Data
const features = [
  {
    icon: Home,
    title: "50+ Years of Experience",
    description: "A dedicated residential design team with over five decades of proven expertise.",
  },
  {
    icon: Video,
    title: "Virtual Walkthroughs",
    description: "Remote meetings and real-time virtual walkthroughs for your convenience.",
  },
  {
    icon: MapPin,
    title: "Local Knowledge",
    description: "Residential projects expertly managed throughout Western Washington.",
  },
  {
    icon: FileCheck,
    title: "Permit-Ready Plans",
    description: "Custom plans meticulously tailored to meet all local requirements.",
  },
  {
    icon: Users,
    title: "300+ Clients Served",
    description: "A proven track record of bringing dream homes to life for our community.",
  },
];

export default function AboutPage() {
  return (
    <main className="w-full bg-[#F5F5F5] min-h-screen">
        <HeroSection />
      {/* =========================================
          HERO SECTION (Split Red/Image Layout)
      ========================================= */}
      <section className="relative w-full bg-[#8A1515] overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          
          {/* Left Side - Red Background Content */}
          <div className="flex flex-col justify-center px-6 py-16 md:px-16 lg:px-24 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-white italic tracking-widest uppercase text-sm md:text-base mb-4 block">
                Why Choose Us
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8">
                50+ Years Of Experience, Personal Involvement, Local Knowledge, And Virtual Walkthroughs.
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl">
                For over 50 years, L M S Home Design has been offering expert home design, building, and construction management services to customers across California, Idaho, and multiple cities of Washington State.
              </p>

              {/* Feature Grid (2 Columns) */}
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <feature.icon size={28} className="text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-base mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-snug">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Image / Gallery Overlay */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-black/20 z-10" />
            {/* Placeholder for the gallery image - replace src with your actual image */}
            <img
              src="/hi/ho6.png"
              alt="LMS Home Design Gallery"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* =========================================
          CONTACT & MAP SECTION
      ========================================= */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-neutral-200">
          
          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <span className="text-[#8A1515] italic font-medium tracking-widest uppercase text-sm mb-2 block">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Ready to discuss your next project?
            </h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              Whether you're planning your next custom home design, tackling a remodel, or need expert guidance, our team is ready to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#8A1515]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#8A1515]">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 font-medium">Call Us</p>
                  <a href="tel:3602279861" className="text-lg font-bold text-neutral-900 hover:text-[#8A1515] transition">
                    360-227-9861
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#8A1515]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#8A1515]">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 font-medium">Email Us</p>
                  <a href="mailto:lmsdesignsllc@gmail.com" className="text-lg font-bold text-neutral-900 hover:text-[#8A1515] transition break-all">
                    lmsdesignsllc@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#8A1515]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#8A1515]">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 font-medium">Visit Us</p>
                  <p className="text-lg font-bold text-neutral-900 leading-tight">
                    91 E Wheelwright St #4,<br /> Allyn, WA 98524
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-neutral-100 flex items-center gap-2 text-neutral-500 text-sm">
              <ShieldCheck size={18} className="text-[#8A1515]" />
              Proudly serving California, Idaho & Washington State.
            </div>
          </div>

          {/* Google Map Embed */}
          <div className="w-full h-[400px] lg:h-auto min-h-[400px] rounded-2xl overflow-hidden shadow-inner bg-neutral-100 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13529.645473405022!2d-122.832424!3d47.381304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5491b6737778b7f1%3A0x6b8a207e6160d3d5!2s91%20E%20Wheelwright%20St%20%234%2C%20Allyn%2C%20WA%2098524!5e0!3m2!1sen!2sus!4v1714500000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>
        </div>
      </section>
    </main>
  );
}