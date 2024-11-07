"use client";

import PreCustomerLayout from "../pre-customer/layout";
import LandingButton from "./landing-button";

export default function LandingComponent() {
  return (
    <PreCustomerLayout title="Välkommen till Vår Tjänst">
      <p className="text-lg mb-4 mt-4 text-center">Den bästa lösningen för dina behov. Enkel, snabb och pålitlig.</p>
      <LandingButton />
    </PreCustomerLayout>
  );
}
