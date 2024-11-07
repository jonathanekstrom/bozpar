"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LookupButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/customer");
    }, 2000);
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.cursor = "wait";
    } else {
      document.body.style.cursor = "auto";
    }
  }, [isLoading]);

  return (
    <button
      type="submit"
      className={`bg-yellow-500 text-white py-3 rounded-lg w-full hover:bg-yellow-400 transition duration-200 ${
        isLoading ? "cursor-not-allowed opacity-70" : ""
      }`}
      onClick={handleClick}
    >
      🔍 {isLoading ? "Söker..." : "Sök"}
    </button>
  );
}
