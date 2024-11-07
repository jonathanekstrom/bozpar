"use client";

import { useRouter } from "next/navigation";

const LandingButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/lookup");
  };

  return (
    <button onClick={handleClick} className="w-full btn bg-gray-700 text-white px-6 py-3 rounded-md text-lg hover:bg-gray-500 duration-200">
      Kom igång
    </button>
  );
};

export default LandingButton;
