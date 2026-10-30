// app/services/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services } from "@/app/data/Service"; 

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id,
  }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  const IconComponent = Icons[
    service.icon as keyof typeof Icons
  ] as unknown as LucideIcon;

  return (
    <div className="relative min-h-screen bg-black overflow-hidden font-sans py-12">
      {/* =========================================
          PRO-LEVEL 3D BACKGROUND (Matched to Footer/Hero)
          ========================================= */}

      {/* Tech Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="detail-grid"
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
          <rect width="100%" height="100%" fill="url(#detail-grid)" />
        </svg>
      </div>

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* =========================================
          MAIN CONTENT
          ========================================= */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 mb-8 text-sm font-bold uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-all duration-300"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-all">
            <Icons.ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
          </span>
          Back to All Services
        </Link>

        <div className="relative bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
          {/* ✅ HERO IMAGE */}
          <div className="relative h-64 md:h-80 w-full">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              priority
              className="object-cover opacity-80"
              sizes="(max-width: 1024px) 100vw, 900px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
              <div className="p-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full">
                {IconComponent && (
                  <IconComponent className="w-6 h-6 text-cyan-400" />
                )}
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-slate-200">
                {service.title}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-cyan-500/20 border border-cyan-500/30 rounded-full">
                {IconComponent && (
                  <IconComponent className="w-8 h-8 text-cyan-400" />
                )}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-white">
                  {service.title}
                </h1>
                <p className="text-slate-400 mt-1">{service.subtitle}</p>
              </div>
            </div>

            <div className="prose max-w-none">
              {service.longDescription && (
                <p className="text-slate-300 leading-relaxed text-lg font-medium">
                  {service.longDescription}
                </p>
              )}

              {service.features && service.features.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Key Features
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0">
                    {service.features.map((feature: string, idx: number) => (
                      <li
                        key={idx}
                        className="group flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 transition-all duration-300 hover:bg-white/10 hover:border-cyan-500/30"
                      >
                        <Icons.CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.benefits && service.benefits.length > 0 && (
                <div className="mt-10 p-6 rounded-2xl bg-orange-500/5 border border-orange-500/20">
                  <h3 className="text-sm font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                    Why Choose Us
                  </h3>
                  <ul className="flex flex-wrap gap-2 list-none p-0">
                    {service.benefits.map((item, idx) => (
                      <li
                        key={idx}
                        className="bg-white/5 px-4 py-2 rounded-full text-sm text-slate-300 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-orange-500/40 transition-all duration-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.process && service.process.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Our Process
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.process.map((step) => (
                      <div
                        key={step.step}
                        className="group p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-cyan-500/30 hover:-translate-y-1"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                            {step.step}
                          </span>
                          <h4 className="font-semibold text-white">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {service.faqs && service.faqs.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {service.faqs.map((faq, idx) => (
                      <details
                        key={idx}
                        className="group bg-white/5 rounded-xl border border-white/10 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-cyan-500/30"
                      >
                        <summary className="font-medium text-slate-200 cursor-pointer flex items-center justify-between list-none">
                          {faq.question}
                          <span className="text-cyan-400 transition-transform duration-300 group-open:rotate-180">
                            <Icons.ChevronDown className="w-5 h-5" />
                          </span>
                        </summary>
                        <p className="mt-3 text-slate-400 text-sm leading-relaxed border-t border-white/10 pt-3">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10 flex flex-wrap gap-4 border-t border-white/10 pt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
                >
                  Get Started <Icons.ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <a
                  href="tel:3602279861"
                  className="inline-flex items-center px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/40 text-slate-200 font-semibold rounded-xl transition-all duration-300 backdrop-blur-md"
                >
                  <Icons.Phone className="mr-2 w-4 h-4 text-orange-400" /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}