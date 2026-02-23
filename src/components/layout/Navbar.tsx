"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Event", href: "#upcoming" },
  { label: "Gallery", href: "#gallery" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a
              href="/"
              className="font-[family-name:var(--font-space-grotesk)] text-xl sm:text-2xl font-bold text-white"
            >
              QUE<span className="text-[#DC2626]">GROUND</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#A1A1AA] hover:text-white transition-colors text-sm uppercase tracking-wider font-medium"
                >
                  {link.label}
                </a>
              ))}
              <Button href="/tickets" size="sm">
                Get Tickets
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  "w-6 h-0.5 bg-white transition-all duration-300",
                  mobileOpen && "rotate-45 translate-y-2"
                )}
              />
              <span
                className={cn(
                  "w-6 h-0.5 bg-white transition-all duration-300",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "w-6 h-0.5 bg-white transition-all duration-300",
                  mobileOpen && "-rotate-45 -translate-y-2"
                )}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-lg md:hidden transition-all duration-300 flex flex-col items-center justify-center gap-8",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-white hover:text-[#DC2626] transition-colors uppercase tracking-wider"
          >
            {link.label}
          </a>
        ))}
        <Button
          href="/tickets"
          size="lg"
          onClick={() => setMobileOpen(false)}
        >
          Get Tickets
        </Button>
      </div>
    </>
  );
}
