"use client";

import { useState, useEffect } from "react";
import { sendEmail } from "@/app/lib/http";
import { getApplicationData } from "@/app/lib/use-local-storage";
import PreCustomerLayout from "../pre-customer/layout";

const LoadingButtonComponent = ({ isLoading, onClick, children }: { isLoading: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className={`px-4 py-2 rounded ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white font-semibold`}
    aria-busy={isLoading}
  >
    {isLoading ? "Sending..." : children}
  </button>
);

const SendButtonComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSend = async () => {
    setLoading(true);
    setError(null);

    try {
      const emailData = getApplicationData();
      const response = await sendEmail(emailData);

      if (response.error) {
        throw new Error(response.error);
      }
    } catch {
      setError("Failed to send email. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <PreCustomerLayout title="Skicka">
      <LoadingButtonComponent isLoading={loading} onClick={handleSend}>
        Skicka
      </LoadingButtonComponent>

      {error && (
        <p role="alert" className="mt-2 text-red-600">
          {error}
        </p>
      )}
    </PreCustomerLayout>
  );
};

export default SendButtonComponent;
