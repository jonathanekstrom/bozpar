/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";

async function createPDF(clientData: any): Promise<Uint8Array> {
  const doc = new PDFDocument();
  const buffers: Uint8Array[] = [];

  // Lyssna på 'data' för att samla in PDF-data
  doc.on("data", (data) => buffers.push(data));

  // Generera PDF-innehåll
  doc.fontSize(24).text("Kundkännedom Rapport", { align: "center" }).moveDown();
  doc.fontSize(12).text(`Kund Namn: ${clientData.personalInfo.firstName || "N/A"}`);
  doc.text(`Adress: ${clientData.personalInfo.address || "N/A"}`);
  doc.text(`E-post: ${clientData.personalInfo.email || "N/A"}`);
  doc.moveDown();

  // Avsluta PDF-skapandet
  doc.end();

  // Vänta tills PDF:en är färdig och returnera den som en Uint8Array
  return new Promise((resolve, reject) => {
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(new Uint8Array(pdfBuffer)); // Konvertera till Uint8Array
    });
    doc.on("error", reject);
  });
}

export async function POST(req: NextRequest) {
  try {
    const { clientData } = await req.json();

    // Generera PDF-buffert
    const pdfBuffer = await createPDF(clientData);

    // Skicka tillbaka PDF som en fil
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=generated.pdf",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new NextResponse("Error generating PDF", { status: 500 });
  }
}
