"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { currentEvent } from "@/data/events";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

export default function TicketsPage() {
  const [selectedTier, setSelectedTier] = useState(
    currentEvent.ticketTiers[0].id
  );
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tier = currentEvent.ticketTiers.find((t) => t.id === selectedTier)!;
  const total = (tier.price / 100) * quantity;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          tierId: selectedTier,
          quantity,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Redirect to Paystack
      window.location.href = data.authorization_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[#DC2626] text-sm uppercase tracking-[0.2em] font-medium mb-3">
              Get Your Tickets
            </p>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold text-white uppercase">
              {currentEvent.title}
            </h1>
            <p className="text-[#A1A1AA] mt-2">
              {currentEvent.time} • {currentEvent.location}
            </p>
          </div>

          {/* Tier Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {currentEvent.ticketTiers.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTier(t.id)}
                className={cn(
                  "relative p-6 rounded-xl border-2 text-left transition-all duration-300 cursor-pointer",
                  selectedTier === t.id
                    ? "border-[#DC2626] bg-[#DC2626]/5"
                    : "border-white/10 bg-[#141414] hover:border-white/20"
                )}
              >
                {selectedTier === t.id && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-[#DC2626] rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
                <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white uppercase">
                  {t.name}
                </p>
                <p className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#DC2626] mt-1">
                  {t.displayPrice}
                </p>
                <p className="text-[#A1A1AA] text-sm mt-1">{t.description}</p>
                <ul className="mt-4 space-y-2">
                  {t.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-center gap-2 text-sm text-[#A1A1AA]"
                    >
                      <svg
                        className="w-4 h-4 text-[#DC2626] flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {perk}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          {/* Purchase Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#141414] border border-white/10 rounded-xl p-6 sm:p-8"
          >
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mb-6">
              Your Details
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-[#A1A1AA] mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-[#52525B] focus:outline-none focus:border-[#DC2626] transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-[#A1A1AA] mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-[#52525B] focus:outline-none focus:border-[#DC2626] transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm text-[#A1A1AA] mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-[#52525B] focus:outline-none focus:border-[#DC2626] transition-colors"
                  placeholder="08012345678"
                />
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm text-[#A1A1AA] mb-1"
                >
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#DC2626] transition-colors"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "ticket" : "tickets"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-6 p-4 bg-[#0A0A0A] rounded-lg border border-white/5">
              <div className="flex justify-between text-sm text-[#A1A1AA]">
                <span>
                  {tier.name} × {quantity}
                </span>
                <span className="text-white">
                  ₦{total.toLocaleString()}
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5 flex justify-between">
                <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-white">
                  Total
                </span>
                <span className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#DC2626]">
                  ₦{total.toLocaleString()}
                </span>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="mt-6">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Pay ₦${total.toLocaleString()}`
                )}
              </Button>
            </div>

            <p className="text-center text-[#52525B] text-xs mt-4">
              Payments are securely processed by Paystack
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
