"use server";

import LookupComponent from "@/app/components/lookup/lookup-component";

const LookupPage = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
        <LookupComponent />
      </div>
    </>
  );
};

export default LookupPage;
