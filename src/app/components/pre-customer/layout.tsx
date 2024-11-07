import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

const PreCustomerLayout: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 bg-opacity-90">
      <div className="max-w-lg p-6 bg-gray-900 bg-opacity-90 rounded-xl shadow-2xl max-h-screen overflow-y-auto">
        <h2 className="text-3xl font-bold text-white text-center">{title}</h2>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default PreCustomerLayout;
