"use client";

import React, { useState } from "react";
import CalculateButtonComponent from "@/app/components/pre-customer/calculate-button";
import PersonalInfoComponent from "@/app/components/pre-customer/personal-info";
import HousingInfoComponent from "../pre-customer/housing-info";
import BankInfoComponent from "../pre-customer/bank-info";

const PreCustomerWizardComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    <PersonalInfoComponent key="personal-info" />,
    <HousingInfoComponent key="housing-info" />,
    <BankInfoComponent key="bank-info" />,
    <CalculateButtonComponent key="calculate-button" />,
  ];

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gray-900 bg-opacity-90 rounded-xl shadow-2xl">
      <div>{steps[currentStep]}</div>

      <div className="flex justify-between mt-6">
        <button onClick={goToPreviousStep} className="btn btn-secondary" disabled={currentStep === 0}>
          Tillbaka
        </button>

        <button onClick={goToNextStep} className="btn btn-primary" disabled={currentStep === steps.length - 1}>
          Nästa
        </button>
      </div>
    </div>
  );
};

export default PreCustomerWizardComponent;