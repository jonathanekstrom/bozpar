"use client";

import React, { useState } from "react";

const TestApiRoutes: React.FC = () => {
  const [statusMessage, setStatusMessage] = useState<string>("");

  // Testa generate-pdf API
  const testGeneratePdf = async () => {
    const clientData = { name: "Test Client" }; // Testdata för PDF

    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientData }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const pdfBufferBase64 = await response.text(); // Förvänta sig en base64-kodad PDF
      setStatusMessage("PDF generated successfully.");

      // Skicka PDF till e-post API
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipients: ["ce.jonathan.ekstrom@gmail.com"],
          subject: "Generated PDF Test",
          text: "Here is a test-generated PDF.",
          pdfBufferBase64,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error("Failed to send email");
      }

      setStatusMessage("PDF sent via email successfully.");
    } catch (error) {
      setStatusMessage(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <div>
      <h2>Test API Routes</h2>
      <button onClick={testGeneratePdf}>Test Generate PDF & Send Email</button>
      <p>{statusMessage}</p>
    </div>
  );
};

export default TestApiRoutes;
