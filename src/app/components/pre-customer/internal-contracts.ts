export interface PersonalInfo {
  firstName: string;
  lastName: string;
  year: number;
  month: number;
  day: number;
  phoneNumber: string;
  email: string;
}

export interface HousingInfo {
  propertyType: string;
  address?: string;
  propertyDesignation?: string;
  apartmentNumber?: string;
  ownershipType?: string;
}

export interface BankInfo {
  loanAmount: number;
  interestRate: number;
  loanToValue: number;
  loanTerm: number;
}
