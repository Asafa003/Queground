import QRCode from "qrcode";
import crypto from "crypto";

function getQRSecret(): string {
  const secret = process.env.QR_SECRET;
  if (!secret) throw new Error("QR_SECRET is not set");
  return secret;
}

export function generateQRPayload(data: {
  reference: string;
  name: string;
  tier: string;
  event: string;
}): string {
  const payload = JSON.stringify(data);
  const signature = crypto
    .createHmac("sha256", getQRSecret())
    .update(payload)
    .digest("hex")
    .slice(0, 16);

  return Buffer.from(
    JSON.stringify({ ...data, sig: signature })
  ).toString("base64");
}

export async function generateQRCodeDataURL(
  reference: string,
  name: string,
  tier: string,
  event: string
): Promise<string> {
  const payload = generateQRPayload({ reference, name, tier, event });

  return QRCode.toDataURL(payload, {
    width: 300,
    margin: 2,
    color: {
      dark: "#0A0A0A",
      light: "#FAFAFA",
    },
    errorCorrectionLevel: "M",
  });
}
