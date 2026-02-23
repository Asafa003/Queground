import Image from "next/image";
import { galleryImages } from "@/data/events";

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[#DC2626] text-sm uppercase tracking-[0.2em] font-medium mb-3">
            Past Events
          </p>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Gallery
          </h2>
          <p className="text-[#A1A1AA] mt-3 max-w-md mx-auto">
            Moments from our previous events. The energy speaks for itself.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative break-inside-avoid group overflow-hidden rounded-xl"
            >
              <div
                className={`relative ${
                  image.span === "tall"
                    ? "aspect-[3/5]"
                    : image.span === "wide"
                    ? "aspect-[16/10]"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#DC2626]/0 group-hover:bg-[#DC2626]/20 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Caption on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
