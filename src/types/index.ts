export interface Event {
  id: string;
  title: string;
  tagline: string;
  date: string; // ISO date string
  time: string;
  venue: string;
  location: string;
  description: string;
  flyerImage: string;
  ticketTiers: TicketTier[];
}

export interface TicketTier {
  id: string;
  name: string;
  price: number; // in kobo for Paystack
  displayPrice: string;
  description: string;
  perks: string[];
  maxQuantity: number;
  available: boolean;
}

export interface Order {
  reference: string;
  name: string;
  email: string;
  phone: string;
  tier: string;
  tierName: string;
  quantity: number;
  amount: number;
  status: "pending" | "confirmed" | "failed";
  createdAt: string;
  confirmedAt?: string;
  qrCode?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  span?: "tall" | "wide" | "normal";
}
