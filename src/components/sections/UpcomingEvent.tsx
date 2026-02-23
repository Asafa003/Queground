import Button from "@/components/ui/Button";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { currentEvent } from "@/data/events";

export default function UpcomingEvent() {
  return (
    <section id="upcoming" className="py-20 sm:py-28 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[#DC2626] text-sm uppercase tracking-[0.2em] font-medium mb-3">
            Next Event
          </p>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Upcoming Event
          </h2>
        </div>

        {/* Event Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0A0A0A] border border-[#DC2626]/20 rounded-2xl p-6 sm:p-10 text-center">
            {/* Event Name */}
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase">
              {currentEvent.title}
            </h3>
            <p className="text-[#DC2626] text-lg sm:text-xl mt-2 font-medium font-[family-name:var(--font-space-grotesk)]">
              featuring DJ Qamal
            </p>

            {/* Event Details */}
            <div className="flex flex-wrap justify-center gap-6 mt-6 text-[#A1A1AA]">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#DC2626]"
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
                <span>April 18, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#DC2626]"
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
                <span>{currentEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#DC2626]"
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
                <span>{currentEvent.location}</span>
              </div>
            </div>

            {/* Countdown */}
            <div className="mt-8 flex justify-center">
              <CountdownTimer targetDate={currentEvent.date} />
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Button href="/tickets" size="lg">
                Get Your Ticket
              </Button>
            </div>

            {/* Ticket Price Hint */}
            <p className="text-[#52525B] text-sm mt-4">
              Starting from {currentEvent.ticketTiers[0].displayPrice}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
