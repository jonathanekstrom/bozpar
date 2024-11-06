"use client";

import { useState, useEffect } from "react";
import PreCustomerLayout from "./layout";
import { BankInfo } from "./internal-contracts";
import { addToLocalStorage, getSectionData } from "@/app/lib/use-local-storage";

const BankInfoComponent = () => {
  const [formData, setFormData] = useState<BankInfo>({
    loanAmount: 0,
    interestRate: 0,
    loanToValue: 0,
    loanTerm: 0,
  });
  const [errors, setErrors] = useState<Partial<BankInfo>>({});
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedData = getSectionData("bankInfo");
    if (savedData && Object.keys(savedData).length > 0) {
      setFormData(savedData);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value),
    });
  };

  const validate = (): Partial<BankInfo> => {
    const newErrors: Partial<BankInfo> = {};
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      addToLocalStorage("bankInfo", formData);
      alert("Nuvarande bankinformation är sparad!");
      setIsSaved(true);
      setErrors({});
    }
  };

  return (
    <PreCustomerLayout title="Nuvarande Bankinformation">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Bolån */}
        <div>
          <label htmlFor="loanAmount" className="block mb-2 text-lg text-gray-300">
            Bolån:
          </label>
          <input
            type="number"
            id="loanAmount"
            name="loanAmount"
            value={formData.loanAmount || ""}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200 ${
              errors.loanAmount ? "border-red-500" : "border-gray-700"
            }`}
          />
          {errors.loanAmount && <p className="text-red-500 mt-1">{errors.loanAmount}</p>}
        </div>

        {/* Räntesats */}
        <div>
          <label htmlFor="interestRate" className="block mb-2 text-lg text-gray-300">
            Räntesats (%):
          </label>
          <input
            type="number"
            id="interestRate"
            name="interestRate"
            value={formData.interestRate || ""}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200 ${
              errors.interestRate ? "border-red-500" : "border-gray-700"
            }`}
            step="0.1"
          />
          {errors.interestRate && <p className="text-red-500 mt-1">{errors.interestRate}</p>}
        </div>

        {/* Belåningsgrad */}
        <div>
          <label htmlFor="loanToValue" className="block mb-2 text-lg text-gray-300">
            Belåningsgrad (%):
          </label>
          <input
            type="number"
            id="loanToValue"
            name="loanToValue"
            value={formData.loanToValue || ""}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200 ${
              errors.loanToValue ? "border-red-500" : "border-gray-700"
            }`}
            step="0.1"
          />
          {errors.loanToValue && <p className="text-red-500 mt-1">{errors.loanToValue}</p>}
        </div>

        {/* Löptid */}
        <div>
          <label htmlFor="loanTerm" className="block mb-2 text-lg text-gray-300">
            Löptid (år):
          </label>
          <input
            type="number"
            id="loanTerm"
            name="loanTerm"
            value={formData.loanTerm || ""}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg bg-gray-700 text-white placeholder-gray-400 transition duration-200 ${
              errors.loanTerm ? "border-red-500" : "border-gray-700"
            }`}
            min="1"
            required
          />
          {errors.loanTerm && <p className="text-red-500 mt-1">{errors.loanTerm}</p>}
        </div>

        {/* Spara-knapp */}
        <button
          type="submit"
          className={`bg-yellow-500 text-white py-3 rounded-lg w-full hover:bg-yellow-400 transition duration-200 ${
            isSaved ? "cursor-not-allowed opacity-70" : ""
          }`}
          disabled={isSaved}
        >
          {isSaved ? "Sparat" : "Spara"}
        </button>
      </form>
    </PreCustomerLayout>
  );
};

export default BankInfoComponent;
