// CustomerLayout.tsx
import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

const CustomerLayout: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="max-w-lg mx-auto bg-gray-900 bg-opacity-90 rounded-xl shadow-2xl">
      <h2 className="mb-6 text-3xl font-bold text-white text-center">{title}</h2>
      {children}
    </div>
  );
};

export default CustomerLayout;
