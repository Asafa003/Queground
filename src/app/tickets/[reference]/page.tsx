"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { Order } from "@/types";
import { currentEvent } from "@/data/events";

export default function TicketConfirmationPage() {
  const params = useParams();
  const reference = params.reference as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function verifyPayment() {
      try {
        const res = await fetch(
          `/api/paystack/verify?reference=${reference}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Verification failed");
        }

        setOrder(data.order);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to verify ticket"
        );
      } finally {
        setLoading(false);
      }
    }

    verifyPayment();
  }, [reference]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="text-center py-20">
              <svg
                className="animate-spin w-12 h-12 mx-auto text-[#DC2626]"
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
              <p className="text-[#A1A1AA] mt-4 text-lg">
                Verifying your payment...
              </p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white mb-2">
                Payment Failed
              </h2>
              <p className="text-[#A1A1AA] mb-6">{error}</p>
              <Button href="/tickets">Try Again</Button>
            </div>
          )}

          {order && order.status === "confirmed" && (
            <div className="text-center">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
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
              </div>

              <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-white mb-2">
                Ticket Confirmed!
              </h1>
              <p className="text-[#A1A1AA] mb-8">
                Your ticket has been sent to{" "}
                <span className="text-white">{order.email}</span>
              </p>

              {/* Ticket Card */}
              <div className="bg-[#141414] border border-[#DC2626]/20 rounded-2xl overflow-hidden text-left">
                {/* Header */}
                <div className="bg-[#DC2626] px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white uppercase">
                      VIBES PARTY
                    </h2>
                    <span className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-white bg-white/20 px-3 py-1 rounded-full uppercase">
                      {order.tierName}
                    </span>
                  </div>
                  <p className="text-white/80 text-sm">featuring DJ Qamal</p>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#52525B] text-sm">Name</span>
                    <span className="text-white text-sm font-medium">
                      {order.name}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#52525B] text-sm">Date</span>
                    <span className="text-white text-sm">{new Date(currentEvent.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#52525B] text-sm">Time</span>
                    <span className="text-white text-sm">9PM – 4AM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#52525B] text-sm">Location</span>
                    <span className="text-white text-sm">
                      {currentEvent.venue}, {currentEvent.location}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-[#52525B] text-sm">Quantity</span>
                    <span className="text-white text-sm">{order.quantity}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#52525B] text-sm">Reference</span>
                    <span className="text-white text-sm font-mono">
                      {order.reference}
                    </span>
                  </div>
                </div>

                {/* QR Code */}
                {order.qrCode && (
                  <div className="p-6 pt-0 text-center">
                    <div className="border-t border-white/5 pt-6">
                      <p className="text-[#52525B] text-xs uppercase tracking-widest mb-3">
                        Scan at Entry
                      </p>
                      <div className="inline-block bg-white rounded-xl p-4">
                        <Image
                          src={order.qrCode}
                          alt="Ticket QR Code"
                          width={200}
                          height={200}
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/" variant="outline">
                  Back to Home
                </Button>
              </div>

              <p className="text-[#52525B] text-xs mt-6">
                Present this QR code at the event entrance. Do not share your
                ticket.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
