import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Queground | VIBES PARTY",
  description: "Get your tickets for VIBES PARTY featuring DJ Qamal. April 2026, Amugan Hall, Irewon, Ijebu-Ode, Ogun State.",
  keywords: ["Queground", "VIBES PARTY", "DJ Qamal", "Ijebu-Ode", "party", "tickets", "events"],
  openGraph: {
    title: "Queground | VIBES PARTY",
    description: "Get your tickets for VIBES PARTY featuring DJ Qamal. April 2026, Amugan Hall, Irewon, Ijebu-Ode.",
    type: "website",
    images: ["/images/Quecode Vibes party.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-[#0A0A0A] text-[#FAFAFA]`}
      >
        {children}
      </body>
    </html>
  );
}
