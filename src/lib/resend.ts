import { Resend } from "resend";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  return new Resend(apiKey);
}

export async function sendTicketEmail(params: {
  to: string;
  name: string;
  eventName: string;
  date: string;
  venue: string;
  location: string;
  tier: string;
  reference: string;
  qrCodeDataUrl: string;
  quantity: number;
}): Promise<void> {
  const { to, name, eventName, date, venue, location, tier, reference, qrCodeDataUrl, quantity } = params;
  const resend = getResend();

  await resend.emails.send({
    from: "Queground <tickets@queground.com>",
    to,
    subject: `Your Queground Ticket — ${eventName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:0;background-color:#0A0A0A;font-family:Arial,sans-serif;">
        <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
          <!-- Header -->
          <div style="text-align:center;margin-bottom:32px;">
            <h1 style="color:#FAFAFA;font-size:24px;margin:0;">
              QUE<span style="color:#DC2626;">GROUND</span>
            </h1>
          </div>

          <!-- Ticket Card -->
          <div style="background-color:#141414;border:1px solid rgba(220,38,38,0.2);border-radius:16px;padding:32px;text-align:center;">
            <p style="color:#DC2626;font-size:12px;text-transform:uppercase;letter-spacing:3px;margin:0 0 8px;">
              Your Ticket
            </p>
            <h2 style="color:#FAFAFA;font-size:32px;margin:0 0 4px;text-transform:uppercase;">
              ${eventName}
            </h2>
            <p style="color:#A1A1AA;font-size:14px;margin:0 0 24px;">
              featuring DJ Qamal
            </p>

            <!-- Details -->
            <div style="border-top:1px solid rgba(255,255,255,0.05);padding-top:20px;margin-bottom:20px;">
              <table style="width:100%;text-align:left;color:#A1A1AA;font-size:14px;" cellpadding="8">
                <tr>
                  <td style="color:#52525B;">Name</td>
                  <td style="color:#FAFAFA;text-align:right;">${name}</td>
                </tr>
                <tr>
                  <td style="color:#52525B;">Ticket Type</td>
                  <td style="color:#DC2626;text-align:right;font-weight:bold;">${tier}</td>
                </tr>
                <tr>
                  <td style="color:#52525B;">Quantity</td>
                  <td style="color:#FAFAFA;text-align:right;">${quantity}</td>
                </tr>
                <tr>
                  <td style="color:#52525B;">Date</td>
                  <td style="color:#FAFAFA;text-align:right;">${date}</td>
                </tr>
                <tr>
                  <td style="color:#52525B;">Venue</td>
                  <td style="color:#FAFAFA;text-align:right;">${venue}</td>
                </tr>
                <tr>
                  <td style="color:#52525B;">Location</td>
                  <td style="color:#FAFAFA;text-align:right;">${location}</td>
                </tr>
                <tr>
                  <td style="color:#52525B;">Reference</td>
                  <td style="color:#FAFAFA;text-align:right;font-family:monospace;">${reference}</td>
                </tr>
              </table>
            </div>

            <!-- QR Code -->
            <div style="border-top:1px solid rgba(255,255,255,0.05);padding-top:24px;">
              <p style="color:#52525B;font-size:12px;margin:0 0 12px;text-transform:uppercase;letter-spacing:2px;">
                Scan at Entry
              </p>
              <img src="${qrCodeDataUrl}" alt="Ticket QR Code" style="width:200px;height:200px;" />
            </div>
          </div>

          <!-- Footer -->
          <div style="text-align:center;margin-top:24px;">
            <p style="color:#52525B;font-size:12px;margin:0;">
              Present this QR code at the event entrance. Do not share your ticket.
            </p>
            <p style="color:#52525B;font-size:12px;margin:8px 0 0;">
              &copy; ${new Date().getFullYear()} Queground. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
}
