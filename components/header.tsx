"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

const serviceLinks = [
  { href: "/Our-Services/design-planning", label: "Design & Planning" },
  { href: "/Our-Services/custom-home-designs", label: "Custom Home Designs" },
  { href: "/Our-Services/new-home-construction", label: "New Home Construction" },
  { href: "/Our-Services/architectural-design", label: "Architecture Design and Planning" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-3xl transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md rounded-full" : "bg-transparent"
      }`}
      style={{
        boxShadow: isScrolled
          ? "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px"
          : "none",
      }}
    >
      <div className="flex items-center justify-between transition-all duration-300 px-2 pl-5 py-2">
        <Link href="/" className="relative block h-18 w-[100px]" aria-label="Home">
          <Image
            src="/images/lw.png"
            alt="LMS Home Designs"
            width={100}
            height={100}
            priority
            className={`absolute inset-0 h-20 w-28 object-contain transition-opacity duration-300 ${
              isScrolled ? "opacity-0" : "opacity-100"
            }`}
          />
          <Image
            src="/images/lb.png"
            alt="LMS Home Designs"
            width={100}
            height={100}
            priority
            className={`absolute inset-0 h-20 w-28 object-contain transition-opacity duration-300 ${
              isScrolled ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          {/* Our Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              onMouseEnter={() => setIsServicesOpen(true)}
              className={`flex items-center gap-1 text-sm transition-colors ${
                isScrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-white hover:text-foreground"
              }`}
            >
              Our Services
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  isServicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <div
              onMouseLeave={() => setIsServicesOpen(false)}
              className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                isServicesOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2"
              }`}
            >
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[220px]">
                {serviceLinks.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#04205D] transition-colors"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/areas-we-serve"
            className={`text-sm transition-colors ${
              isScrolled
                ? "text-muted-foreground hover:text-foreground"
                : "text-white hover:text-foreground"
            }`}
          >
            Areas We Serve
          </Link>
          <Link
            href="/portfolio"
            className={`text-sm transition-colors ${
              isScrolled
                ? "text-muted-foreground hover:text-foreground"
                : "text-white hover:text-foreground"
            }`}
          >
            Portfolio
          </Link>
          <Link
            href="/about"
            className={`text-sm transition-colors ${
              isScrolled
                ? "text-muted-foreground hover:text-foreground"
                : "text-white hover:text-foreground"
            }`}
          >
            About
          </Link>
        </nav>

        <div className="hidden items-center gap-6 md:flex mr-4">
          <Link
            href="/contact"
            className="px-4 py-2 text-sm font-medium transition-all rounded-full bg-foreground text-background hover:opacity-80"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="transition-colors md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-8 md:hidden rounded-b-2xl">
          <nav className="flex flex-col gap-6">
            {/* Mobile Services Dropdown */}
            <div>
              <button
                type="button"
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="flex items-center justify-between w-full text-lg text-foreground"
              >
                Our Services
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-200 ${
                    isMobileServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isMobileServicesOpen && (
                <div className="mt-3 ml-4 flex flex-col gap-3">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="text-base text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsMobileServicesOpen(false);
                      }}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/areas-we-serve"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Areas We Serve
            </Link>
            <Link
              href="/portfolio"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="/about"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="bg-foreground px-5 py-5 text-center text-sm font-medium text-background rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}