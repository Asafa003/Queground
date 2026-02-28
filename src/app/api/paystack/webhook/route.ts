import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/paystack";
import { getOrder, updateOrderStatus } from "@/lib/store";
import { generateQRCodeDataURL } from "@/lib/qrcode";
import { sendTicketEmail } from "@/lib/resend";
import { currentEvent } from "@/data/events";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    if (!signature || !verifyWebhookSignature(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);

    if (event.event !== "charge.success") {
      return NextResponse.json({ received: true });
    }

    const reference = event.data.reference;
    const order = await getOrder(reference);

    if (!order || order.status === "confirmed") {
      return NextResponse.json({ received: true });
    }

    // Verify amount matches to prevent manipulation
    if (event.data.amount !== order.amount) {
      console.error(
        `Webhook amount mismatch: expected ${order.amount}, got ${event.data.amount} for ${reference}`
      );
      await updateOrderStatus(reference, "failed");
      return NextResponse.json({ received: true });
    }

    // Generate QR code
    const qrCode = await generateQRCodeDataURL(
      reference,
      order.name,
      order.tierName,
      currentEvent.title
    );

    // Update order
    await updateOrderStatus(reference, "confirmed", {
      confirmedAt: new Date().toISOString(),
      qrCode,
    });

    // Send email
    try {
      await sendTicketEmail({
        to: order.email,
        name: order.name,
        eventName: currentEvent.title,
        date: new Date(currentEvent.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        venue: currentEvent.venue,
        location: currentEvent.location,
        tier: order.tierName,
        reference,
        qrCodeDataUrl: qrCode,
        quantity: order.quantity,
      });
    } catch (emailError) {
      console.error("Webhook email failed:", emailError);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
