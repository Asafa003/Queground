import { NextRequest, NextResponse } from "next/server";
import { initializeTransaction } from "@/lib/paystack";
import { saveOrder } from "@/lib/store";
import { generateReference } from "@/lib/utils";
import { currentEvent } from "@/data/events";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, tierId, quantity } = body;

    // Validate inputs
    if (!name || !email || !phone || !tierId || !quantity) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (quantity < 1 || quantity > 5) {
      return NextResponse.json(
        { error: "Quantity must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Find ticket tier
    const tier = currentEvent.ticketTiers.find((t) => t.id === tierId);
    if (!tier || !tier.available) {
      return NextResponse.json(
        { error: "Invalid or unavailable ticket tier" },
        { status: 400 }
      );
    }

    const reference = generateReference();
    const amount = tier.price * quantity;
    const origin = req.headers.get("origin") || "http://localhost:3000";

    // Initialize Paystack transaction
    const result = await initializeTransaction({
      email,
      amount,
      reference,
      callback_url: `${origin}/tickets/${reference}`,
      metadata: {
        name,
        phone,
        tier: tier.id,
        tierName: tier.name,
        quantity: String(quantity),
        event: currentEvent.id,
      },
    });

    // Save order as pending
    await saveOrder({
      reference,
      name,
      email,
      phone,
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
