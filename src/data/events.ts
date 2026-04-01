import { Event, GalleryImage } from "@/types";

export const currentEvent: Event = {
  id: "vibes-party-2026",
  title: "VIBES PARTY",
  tagline: "The Ultimate Party Experience",
  date: "2026-04-11T21:00:00",
  time: "9PM – 4AM",
  venue: "Oopl Obanta Hall, Imowo",
  location: "Ijebu-Ode. Ogun State",
  description:
    "Queground presents VIBES PARTY — an unforgettable night of music, energy, and culture featuring DJ Qamal. Come experience the best of nightlife in Ijebu-Ode.",
  flyerImage: "/images/Quecode Vibes party.jpeg",
  ticketTiers: [
    {
      id: "regular",
      name: "Regular",
      price: 500000, // ₦5,000 in kobo
      displayPrice: "₦5,000",
      description: "General admission",
      perks: ["Event access", "Dance floor access", "General seating"],
      maxQuantity: 5,
      available: true,
    },
    {
      id: "vip",
      name: "VIP",
      price: 1500000, // ₦15,000 in kobo
      displayPrice: "₦15,000",
      description: "VIP experience",
      perks: [
        "Priority entry",
        "VIP lounge access",
        "Complimentary drinks",
        "Reserved seating",
        "Meet & greet",
      ],
      maxQuantity: 5,
      available: true,
    },
    {
      id: "groundshakers",
      name: "GROUNDSHAKERS",
      price: 30000000, // ₦300,000 in kobo
      displayPrice: "₦300,000",
      description: "The ultimate experience",
      perks: [
        "All VIP perks included",
        "Exclusive GROUNDSHAKERS lounge",
        "2 MARTELL VS, 2 MIXER, 1 SHISHA",
        "Backstage access",
        "Personal host & security",
        "Artist meet & greet",
        "Branded merch package",
      ],
      maxQuantity: 2,
      available: true,
    },
  ],
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/IMG_1543.JPG.jpeg",
    alt: "Queground stage with neon sign",
    span: "normal",
  },
  {
    src: "/images/IMG_1592.JPG.jpeg",
    alt: "Crowd vibes with string lights",
    span: "wide",
  },
  {
    src: "/images/IMG_1600.JPG.jpeg",
    alt: "Party crowd mingling",
    span: "normal",
  },
  {
    src: "/images/IMG_7134.JPG.jpeg",
    alt: "Performer on stage",
    span: "tall",
  },
  {
    src: "/images/IMG_1555.JPG.jpeg",
    alt: "Lounge scene at Queground",
    span: "normal",
  },
  {
    src: "/images/IMG_1556.JPG.jpeg",
    alt: "Bar scene vibes",
    span: "normal",
  },
  {
    src: "/images/IMG_8890.JPG.jpeg",
    alt: "Queground attendees",
    span: "normal",
  },
  {
    src: "/images/IMG_1602.JPG.jpeg",
    alt: "DJ at the RANE decks",
    span: "wide",
  },
];
