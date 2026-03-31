import { NextRequest, NextResponse } from "next/server";
import { initializeTransaction } from "@/lib/paystack";
import { saveOrder } from "@/lib/store";
import { generateReference } from "@/lib/utils";
import { currentEvent } from "@/data/events";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 5 requests per minute per IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (isRateLimited(ip, 5, 60_000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, phone, tierId, quantity } = body;

    // Validate inputs exist
    if (!name || !email || !phone || !tierId || !quantity) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Type and length checks
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof phone !== "string" ||
      typeof tierId !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid input types" },
        { status: 400 }
      );
    }

    if (name.length > 100 || email.length > 254 || phone.length > 20) {
      return NextResponse.json(
        { error: "Input exceeds maximum length" },
        { status: 400 }
      );
    }

    // Sanitize name — allow only letters, spaces, hyphens, apostrophes
    const sanitizedName = name.trim();
    if (!/^[a-zA-Z\s'-]{2,100}$/.test(sanitizedName)) {
      return NextResponse.json(
        { error: "Name contains invalid characters" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate Nigerian phone number
    const cleanPhone = phone.replace(/[\s-]/g, "");
    if (!/^(\+234|0)[789]\d{9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Enter a valid Nigerian phone number" },
        { status: 400 }
      );
    }

    // Find ticket tier first to check maxQuantity
    const tier = currentEvent.ticketTiers.find((t) => t.id === tierId);
    if (!tier || !tier.available) {
      return NextResponse.json(
        { error: "Invalid or unavailable ticket tier" },
        { status: 400 }
      );
    }

    if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1 || quantity > tier.maxQuantity) {
      return NextResponse.json(
        { error: `Quantity must be between 1 and ${tier.maxQuantity}` },
        { status: 400 }
      );
    }

    const reference = generateReference();
    const amount = tier.price * quantity;

    // Whitelist allowed origins to prevent redirect to phishing sites
    const allowedOrigins = [
      "https://www.queground.com",
      "https://queground.com",
      "http://localhost:3000",
    ];
    const rawOrigin = req.headers.get("origin") || "";
    const origin = allowedOrigins.includes(rawOrigin)
      ? rawOrigin
      : allowedOrigins[0];

    // Initialize Paystack transaction
    const result = await initializeTransaction({
      email: email.trim().toLowerCase(),
      amount,
      reference,
      callback_url: `${origin}/tickets/${reference}`,
      metadata: {
        name: sanitizedName,
        phone: cleanPhone,
        tier: tier.id,
        tierName: tier.name,
        quantity: String(quantity),
        event: currentEvent.id,
      },
    });

    // Save order as pending
    await saveOrder({
      reference,
      name: sanitizedName,
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      tier: tier.id,
      tierName: tier.name,
      quantity,
      amount,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      authorization_url: result.data.authorization_url,
      reference,
    });
  } catch (error) {
    console.error("Paystack init error:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}
