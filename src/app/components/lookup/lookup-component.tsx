/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Form from "next/form";
import PreCustomerLayout from "../pre-customer/layout";
import LookupButton from "./lookup-button";

const LookupComponent = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <PreCustomerLayout title="Sök Person">
      <Form action="/search" className="spacy-y-6" onSubmit={handleSubmit}>
        <input
          className="w-full p-3 border text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 mb-3"
          name="query"
          type="number"
          placeholder="Ange personnummer"
          required
        />
        <LookupButton />
      </Form>
    </PreCustomerLayout>
  );
};

export default LookupComponent;
