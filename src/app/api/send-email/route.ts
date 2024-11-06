import nodemailer from "nodemailer";

// Definiera request och response typer för bättre typning
export async function POST(req: Request): Promise<Response> {
  try {
    // Hämta JSON-data från request body
    const { recipients, subject, text, pdfBufferBase64 } = await req.json();

    // Konvertera base64-strängen till en Buffer
    const pdfBuffer = Buffer.from(pdfBufferBase64, "base64");

    // Skapa nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL, // Din e-postadress
        pass: process.env.PASSWORD, // Ditt e-postlösenord
      },
    });

    // Skapa e-postalternativ
    const mailOptions = {
      from: process.env.EMAIL,
      to: recipients.join(","),
      subject,
      text,
      attachments: [
        {
          filename: "rapport.pdf",
          content: pdfBuffer, // Den konverterade PDF-bufferten som bilaga
        },
      ],
    };

    // Skicka e-posten
    await transporter.sendMail(mailOptions);

    // Returnera success
    return new Response(JSON.stringify({ message: "Email sent successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ message: "Failed to send email", error: errorMessage }), { status: 500 });
  }
}
