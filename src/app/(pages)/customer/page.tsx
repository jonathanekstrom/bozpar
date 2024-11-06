"use server";

import PreCustomerWizardComponent from "@/app/components/wizard/pre-customer-wizard";

const CustomerPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <PreCustomerWizardComponent />
    </div>
  );
};

export default CustomerPage;
