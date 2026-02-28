import Image from "next/image";
import Button from "@/components/ui/Button";
import { currentEvent } from "@/data/events";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[#DC2626]/10">
        <Image
          src={currentEvent.flyerImage}
          alt={currentEvent.title}
          fill
          className="object-contain sm:object-cover object-top sm:object-center" 
          priority
          sizes="100vw"
          quality={90}
        />
        {/* Gradient Overlays - lighter to reveal more image detail */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 sm:from-black/60 sm:via-black/30 sm:to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 hidden sm:block" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Tagline */}
        <p className="text-[#DC2626] text-sm sm:text-base uppercase tracking-[0.3em] font-medium mb-4">
          Que Ground Presents
        </p>

        {/* Event Title */}
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-5xl sm:text-7xl lg:text-8xl font-bold text-white uppercase tracking-tight leading-none">
          {currentEvent.title}
        </h1>

        {/* DJ Name */}
        <p className="text-xl sm:text-2xl text-white/80 mt-4 font-[family-name:var(--font-space-grotesk)] font-medium">
          featuring <span className="text-[#DC2626]">DJ Qamal</span>
        </p>

        {/* Event Info */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-[#A1A1AA]">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-[#DC2626]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm sm:text-base font-semibold text-white">{new Date(currentEvent.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-[#DC2626]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm sm:text-base font-semibold text-white">{currentEvent.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-[#DC2626]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm sm:text-base font-semibold text-white">
              {currentEvent.venue}, {currentEvent.location}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10">
          <Button href="/tickets" size="lg" className="animate-pulse text-lg">
            Buy Tickets
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
