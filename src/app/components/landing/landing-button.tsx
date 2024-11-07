"use client";

import { useRouter } from "next/navigation";

export function LandingButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/lookup");
  };

  return (
    <button onClick={handleClick} className="btn bg-gray-700 text-white px-6 py-3 rounded-md text-lg">
      Kom igång
    </button>
  );
}
