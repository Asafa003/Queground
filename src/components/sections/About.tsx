import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div>
            <p className="text-[#DC2626] text-sm uppercase tracking-[0.2em] font-medium mb-3">
              About Us
            </p>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              What is{" "}
              <span className="text-[#DC2626]">Que Ground</span>?
            </h2>
            <div className="mt-6 space-y-4 text-[#A1A1AA] text-base sm:text-lg leading-relaxed">
              <p>
                QUE GROUND is more than just a music event, it&apos;s a celebration
                of community, creativity, and collaboration. It provides a
                powerful platform where individuals from all walks of life come
                together to share opportunities and uplift one another.
              </p>
              <p>
                Beyond music, QUE GROUND embraces connections across fashion,
                technology, and other industries, empowering talents to innovate,
                express, and grow together. It&apos;s a space where culture meets
                progress and everyone has a chance to shine.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 flex gap-8">
              <div>
                <p className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#DC2626]">
                  3+
                </p>
                <p className="text-[#A1A1AA] text-sm mt-1">Events Hosted</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#DC2626]">
                  500+
                </p>
                <p className="text-[#A1A1AA] text-sm mt-1">Attendees</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-[#DC2626]">
                  10+
                </p>
                <p className="text-[#A1A1AA] text-sm mt-1">DJs Featured</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#DC2626]/20">
              <Image
                src="/images/IMG_1602.JPG.jpeg"
                alt="DJ at the RANE decks at Queground"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#DC2626]/30 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
