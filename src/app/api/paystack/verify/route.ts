import { NextRequest, NextResponse } from "next/server";
import { verifyTransaction } from "@/lib/paystack";
import { getOrder, updateOrderStatus } from "@/lib/store";
import { generateQRCodeDataURL } from "@/lib/qrcode";
import { sendTicketEmail } from "@/lib/resend";
import { currentEvent } from "@/data/events";

export async function GET(req: NextRequest) {
  try {
    const reference = req.nextUrl.searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        { error: "Reference is required" },
        { status: 400 }
      );
    }

    const order = await getOrder(reference);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // If already confirmed, return the order
    if (order.status === "confirmed") {
      return NextResponse.json({ order });
    }

    // Verify with Paystack
    const result = await verifyTransaction(reference);

    if (result.data.status !== "success") {
      await updateOrderStatus(reference, "failed");
      return NextResponse.json(
        { error: "Payment was not successful" },
        { status: 400 }
      );
    }

    // Generate QR code
    const qrCode = await generateQRCodeDataURL(
      reference,
      order.name,
      order.tierName,
      currentEvent.title
    );

    // Update order
    const updatedOrder = await updateOrderStatus(reference, "confirmed", {
      confirmedAt: new Date().toISOString(),
      qrCode,
    });

    // Send confirmation email
    try {
      await sendTicketEmail({
        to: order.email,
        name: order.name,
        eventName: currentEvent.title,
        date: "April 18, 2026",
        venue: currentEvent.venue,
        location: currentEvent.location,
        tier: order.tierName,
        reference,
        qrCodeDataUrl: qrCode,
        quantity: order.quantity,
      });
    } catch (emailError) {
      console.error("Email send failed:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ order: updatedOrder });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
