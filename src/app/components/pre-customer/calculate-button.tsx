"use client";

import { useState, useEffect } from "react";
import { useInterestCalc } from "@/app/lib/use-interest-calc";
import PreCustomerLayout from "./layout";

const LoadingButtonComponent = ({
  isLoading,
  onClick,
  label,
  buttonStyle,
}: {
  isLoading: boolean;
  onClick: () => void;
  label: string;
  buttonStyle: string;
}) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className={`w-full px-4 py-2 rounded ${isLoading ? "bg-gray-400" : buttonStyle} text-white font-semibold`}
    aria-busy={isLoading}
  >
    {isLoading ? "Calculating..." : label}
  </button>
);

const CalculateButtonComponent = () => {
  const { moneySaved, calculate } = useInterestCalc();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCalculate = () => {
    setLoading(true);
    setError(null);

    try {
      calculate();
    } catch {
      setError("Failed to calculate. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return null;

  // Kontrollera om moneySaved är positivt eller negativt för att bestämma knappens text och stil
  const isPositive = moneySaved !== null && moneySaved > 0;
  const buttonLabel = isPositive ? "Acceptera" : "Neka";
  const buttonStyle = isPositive ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700";

  return (
    <PreCustomerLayout title="Beräkna">
      <LoadingButtonComponent isLoading={loading} onClick={handleCalculate} label={buttonLabel} buttonStyle={buttonStyle} />

      {/* Visa resultatet om det finns, annars visa ett felmeddelande */}
      {moneySaved !== null && <p className="mt-2 text-green-600">Grattis vi kan hjälpa dig spara per månad {moneySaved}</p>}
      {error && (
        <p role="alert" className="mt-2 text-red-600">
          {error}
        </p>
      )}
    </PreCustomerLayout>
  );
};

export default CalculateButtonComponent;
