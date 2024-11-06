/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Form from "next/form";
import { useEffect, useState } from "react";

const LookupComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      document.body.style.cursor = "wait";
    } else {
      document.body.style.cursor = "auto";
    }
  }, [isLoading]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sök Person</h2>
        <Form action="/search">
          <div className="mb-4">
            <input
              className="w-full p-3 border text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 "
              name="query"
              type="number"
              placeholder="Ange personnummer"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-200 transform hover:scale-105 shadow-lg"
            onClick={handleSubmit}
          >
            🔍 Sök
          </button>
        </Form>
      </div>
    </div>
  );
};

export default LookupComponent;
