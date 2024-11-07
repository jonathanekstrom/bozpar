"use client";

import { useState, useEffect } from "react";
import { useInterestCalc } from "@/app/lib/use-interest-calc";
import PreCustomerLayout from "./layout";
import OfferingButtonComponent from "./offering-button-component";
import { useRouter } from "next/navigation";

const OfferingComponent = () => {
  const { moneySaved, calculate } = useInterestCalc();
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    calculate();
  }, [calculate]);

  const handleAcceptDecline = () => {
    setLoading(true);

    setTimeout(() => {
      router.push("/kalp");
      setLoading(false);
    }, 1000);
  };

  if (!isClient) return null;

  const isPositive = moneySaved !== null && moneySaved > 0;
  const buttonLabel = isPositive ? "Acceptera" : "Neka";
  const buttonStyle = isPositive ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700";

  return (
    <PreCustomerLayout title="Erbjudande">
      <div className="space-y-4">
        {isPositive ? (
          <p className="mt-2 text-green-600 block">Grattis vi kan hjälpa dig spara per månad {moneySaved}</p>
        ) : (
          !isPositive && <p className="mt-2 text-red-600 block">Vi har tyvärr inget erbjudande</p>
        )}
      </div>

      <OfferingButtonComponent isLoading={loading} onClick={handleAcceptDecline} label={buttonLabel} buttonStyle={buttonStyle} />
    </PreCustomerLayout>
  );
};

export default OfferingComponent;
