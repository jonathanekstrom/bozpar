/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { getSectionData } from "./use-local-storage";

export const useInterestCalc = () => {
  const [moneySaved, setMoneySaved] = useState(0);
  const lowestInterest = 2.92;

  const calculate = () => {
    const currentBankCost = currentBankCalculations();
    const betterOptionCost = betterOptionCalculations();

    if (betterOptionCost < currentBankCost) {
      return currentBankCost - betterOptionCost;
    }
    return 0;
  };

  const currentBankCalculations = () => {
    const bankInfo = getSectionData("bankInfo");
    if (bankInfo?.loanAmount && bankInfo?.interestRate) {
      return calculateMonthlyCost(bankInfo.loanAmount, bankInfo.interestRate);
    }
    return 0;
  };

  const betterOptionCalculations = () => {
    const bankInfo = getSectionData("bankInfo");
    if (bankInfo?.loanAmount) {
      return calculateMonthlyCost(bankInfo.loanAmount, lowestInterest);
    }
    return 0;
  };

  const calculateMonthlyCost = (loanAmount: any, interestRate: any) => {
    if (loanAmount > 0 && interestRate > 0) {
      const yearlyCost = loanAmount * (interestRate / 100);
      return yearlyCost / 12;
    }
    return 0;
  };

  useEffect(() => {
    setMoneySaved(calculate());
  }, []);

  return {
    moneySaved,
    calculate,
  };
};
