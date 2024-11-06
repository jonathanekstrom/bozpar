"use client";

import { LandingButton } from "./landing-button";

export default function LandingComponent() {
  return (
    <div className="relative h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="relative z-10 p-6 bg-gray-900 bg-opacity-70 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-3">Välkommen till Vår Tjänst</h1>
        <p className="text-lg mb-4">Den bästa lösningen för dina behov. Enkel, snabb och pålitlig.</p>
        <LandingButton />
      </div>
    </div>
  );
}
