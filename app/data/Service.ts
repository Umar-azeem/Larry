// app/data/services.ts

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  imageAlt: string;
  features: string[];
  benefits: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const services: Service[] = [
  /* ============================================================
     1. DESIGN & PLANNING
     ============================================================ */
  {
    id: "design-planning",
    title: "Design & Planning",
    subtitle:
      "Personalized architectural design services that bring your vision to life with precision and expertise.",
    description:
      "Our Design and Planning services bring together personalization, precision, and decades of expertise to create homes that truly fit your life.",
    longDescription:
      "At LM Stevens Designs, our Design and Planning services in Allyn, Washington bring together personalization, precision, and decades of expertise to create homes that truly fit your life. We craft custom layouts—never cookie-cutter—using consultations, sketches, 3D modeling, and permit-ready drawings to shape spaces that balance comfort, function, efficiency, and style. Whether it's a coastal cottage or a large family estate, we combine smart space-saving strategies, natural lighting, sustainability, and future-ready design into every plan. Backed by over 50 years of local experience and trusted across Mason, Kitsap, and Pierce counties, our team delivers an organized process, clear communication, fast turnaround, and reliable coordination with engineers and builders. From initial concepts to construction-ready documents, we're more than designers—we're planning partners committed to turning your ideas into a beautiful, buildable, and lasting reality.",
    icon: "PencilRuler",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop",
    imageAlt: "Architectural blueprints and planning materials on a drafting desk",
    features: [
      "Custom layout design tailored to your lifestyle",
      "3D modeling and visualization",
      "Permit-ready construction drawings",
      "Site analysis and property evaluation",
      "Sustainable and energy-efficient design strategies",
      "Coordination with engineers and builders",
    ],
    benefits: [
      "Personalized designs that reflect your unique vision",
      "50+ years of Northwest design experience",
      "Fast turnaround and clear communication",
      "Trusted across Mason, Kitsap, and Pierce counties",
      "Organized process from concept to construction",
    ],
    process: [
      {
        step: 1,
        title: "Initial Consultation",
        description:
          "We start with a conversation to understand your goals, lifestyle, and vision for your home.",
      },
      {
        step: 2,
        title: "Concept Development",
        description:
          "We create initial sketches and 3D models to visualize your project and refine the design direction.",
      },
      {
        step: 3,
        title: "Design Refinement",
        description:
          "We work together to perfect every detail, from layout to materials, ensuring everything fits your needs.",
      },
      {
        step: 4,
        title: "Permit-Ready Plans",
        description:
          "We deliver complete, construction-ready drawings that pass permitting with ease.",
      },
    ],
    faqs: [
      {
        question: "What types of projects do you design?",
        answer:
          "We design custom homes, additions, remodels, ADUs, garages, shops, and more throughout Western Washington.",
      },
      {
        question: "How long does the design process take?",
        answer:
          "Timeline varies based on project complexity, but we pride ourselves on fast turnaround while maintaining quality and attention to detail.",
      },
    ],
  },

  /* ============================================================
     2. CUSTOM HOME DESIGNS
     ============================================================ */
  {
    id: "custom-home-designs",
    title: "Custom Home Designs",
    subtitle:
      "Dream homes brought to life through a personal, hands-on design process backed by over 50 years of Northwest experience.",
    description:
      "Our Custom Home Designs start with your story, your lifestyle, and your vision, bringing dream homes to life through a personal, hands-on design process.",
    longDescription:
      "At LM Stevens Designs, our Custom Home Designs in Allyn, WA start with your story, your lifestyle, and your vision, bringing dream homes to life through a personal, hands-on design process backed by over 50 years of Northwest experience. We guide you from early sketches to detailed, permit-ready plans, ensuring every layout, elevation, and material choice reflects how you live and how your property works. Whether you want a cozy cottage, a modern open-concept home, a luxury residence, or an affordable custom build, our designs prioritize smart flow, natural light, energy efficiency, and long-term comfort. Every plan is crafted around your routines, your land, and your goals, making construction smoother and the final home uniquely yours. Trusted across Mason, Kitsap, and Pierce Counties, we deliver clear communication, fast turnaround, transparent pricing, and designs that pass permitting with ease — creating homes that are beautiful, functional, and built around the way you truly want to live.",
    icon: "Home",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    imageAlt: "Modern custom home exterior with large windows",
    features: [
      "Fully personalized design from concept to completion",
      "Permit-ready plans that pass with ease",
      "Smart layouts optimized for natural light and flow",
      "Energy-efficient design strategies",
      "Material and finish selection guidance",
      "Coordination with builders and contractors",
    ],
    benefits: [
      "Homes designed around your unique lifestyle",
      "Over 50 years of Northwest building expertise",
      "Transparent pricing with no surprises",
      "Fast turnaround without compromising quality",
      "Designs that work beautifully with your property",
    ],
    process: [
      {
        step: 1,
        title: "Discovery Meeting",
        description:
          "We learn about your lifestyle, preferences, and vision to understand what home means to you.",
      },
      {
        step: 2,
        title: "Concept Sketches",
        description:
          "We present initial design concepts based on your input and property characteristics.",
      },
      {
        step: 3,
        title: "Design Development",
        description:
          "We refine the design, selecting materials and details that bring your home to life.",
      },
      {
        step: 4,
        title: "Final Plans",
        description:
          "We deliver complete construction drawings ready for permitting and building.",
      },
    ],
    faqs: [
      {
        question: "Can you design affordable custom homes?",
        answer:
          "Absolutely! We design homes across all budget ranges, from affordable builds to luxury estates.",
      },
      {
        question: "Do you work with my builder?",
        answer:
          "Yes, we coordinate with builders and contractors throughout the process to ensure smooth construction.",
      },
    ],
  },

  /* ============================================================
     3. NEW HOME CONSTRUCTION
     ============================================================ */
  {
    id: "new-home-construction",
    title: "New Home Construction",
    subtitle:
      "Seamless design-to-build process covering everything from planning and permits to full construction and final walkthroughs.",
    description:
      "Our New Home Construction service is centered on building homes that feel personal, purposeful, and perfectly suited to your life.",
    longDescription:
      "At LM Stevens Designs, our New Home Construction service in Allyn, WA is centered on building homes that feel personal, purposeful, and perfectly suited to your life. With over 50 years of experience, we guide homeowners through a seamless design-to-build process that covers everything from planning, permits, and site preparation to full construction and final walkthroughs. We shape every project around your vision—whether it's a lakefront retreat, a cozy family home, or a luxury estate—using smart layouts, durable materials, and energy-efficient strategies that perform beautifully in Northwest weather. As trusted custom home builders across Mason, Kitsap, and Pierce Counties, we focus on clear communication, honest pricing, and craftsmanship that stands the test of time. From affordable builds to high-end designs, our team ensures your home is unique, functional, and built the right way from the first sketch to the moment you hold the keys.",
    icon: "Hammer",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop",
    imageAlt: "Home under construction with wood framing visible",
    features: [
      "Full design-to-build service",
      "Site preparation and planning",
      "Permit management and coordination",
      "Quality construction with durable materials",
      "Energy-efficient building strategies",
      "Final walkthrough and handover",
    ],
    benefits: [
      "One team from design through construction",
      "Clear communication at every stage",
      "Honest pricing with no hidden costs",
      "Craftsmanship that stands the test of time",
      "Homes built for Northwest weather",
    ],
    process: [
      {
        step: 1,
        title: "Planning & Design",
        description:
          "We finalize plans, secure permits, and prepare your site for construction.",
      },
      {
        step: 2,
        title: "Site Preparation",
        description:
          "We prepare your property, ensuring everything is ready for the build.",
      },
      {
        step: 3,
        title: "Construction",
        description:
          "Our team builds your home with quality materials and expert craftsmanship.",
      },
      {
        step: 4,
        title: "Final Walkthrough",
        description:
          "We walk through your completed home together, ensuring every detail is perfect.",
      },
    ],
    faqs: [
      {
        question: "Do you handle permits?",
        answer:
          "Yes, we manage the entire permitting process, ensuring your project is fully compliant and ready to build.",
      },
      {
        question: "How long does construction take?",
        answer:
          "Timeline depends on project scope, but we provide clear schedules and keep you informed throughout the process.",
      },
    ],
  },

  /* ============================================================
     4. ARCHITECTURE DESIGN AND PLANNING  ← ✅ NOW INCLUDED
     ============================================================ */
  {
    id: "architectural-design",
    title: "Architecture Design and Planning",
    subtitle:
      "Every part of your project brought together with clarity, creativity, and precision — from design and planning to complete construction support.",
    description:
      "Our Architectural Design services bring every part of your project together with clarity, creativity, and precision, covering everything from design and planning to complete construction support.",
    longDescription:
      "Our Architectural Design services bring every part of your project together with clarity, creativity, and precision, covering everything from design and planning to complete construction support. We create detailed floor plans, 3D renderings, CAD drawings, site plans, as-builts, and sustainable design layouts tailored to your property and lifestyle. Whether you need custom home designs, modular or multigenerational layouts, or space-optimized solutions, we handle each step with purpose. Our build and management services cover new home construction, residential developments, tenant improvements, and full project coordination to keep everything on schedule. For remodels and upgrades, we design room additions, kitchen and bath transformations, attic and basement conversions, accessible spaces, garages, decks, guesthouses, and pool houses. From concept to construction, every line, model, and plan is crafted to bring your vision to life with efficiency, durability, and style delivering results that exceed expectations.",
    icon: "Building2",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2000&auto=format&fit=crop",
    imageAlt: "Modern architectural facade with clean lines and glass",
    features: [
      "Detailed floor plans and CAD drawings",
      "3D renderings and site plans",
      "As-builts and sustainable design layouts",
      "Room additions, kitchen & bath transformations",
      "Attic and basement conversions, garages & decks",
      "Full project coordination and construction support",
    ],
    benefits: [
      "Clarity, creativity, and precision at every step",
      "Design tailored to your property and lifestyle",
      "Space-optimized and sustainable solutions",
      "Coordination keeps everything on schedule",
      "Results that exceed expectations",
    ],
    process: [
      {
        step: 1,
        title: "Project Discovery",
        description:
          "We review your property, goals, and constraints to define the scope and design direction.",
      },
      {
        step: 2,
        title: "Design & Drafting",
        description:
          "We produce floor plans, 3D renderings, CAD drawings, and site plans tailored to your needs.",
      },
      {
        step: 3,
        title: "Coordination & Approvals",
        description:
          "We coordinate with engineers and authorities to keep the project on schedule and ready to build.",
      },
      {
        step: 4,
        title: "Construction Support",
        description:
          "We stay involved through construction support, ensuring every line and plan comes to life.",
      },
    ],
    faqs: [
      {
        question: "What deliverables do you provide?",
        answer:
          "Floor plans, 3D renderings, CAD drawings, site plans, as-builts, and sustainable design layouts — tailored to your project.",
      },
      {
        question: "Do you support construction after design?",
        answer:
          "Yes — our build and management services cover new home construction, residential developments, tenant improvements, and full project coordination.",
      },
    ],
  },
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find((service) => service.id === service.id);
};