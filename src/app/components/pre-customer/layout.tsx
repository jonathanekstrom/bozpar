import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

const PreCustomerLayout: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="flex items-center justify-center h-full w-full p-6">
      <div className="bg-gray-900 bg-opacity-90 rounded-xl shadow-2xl max-h-[600px] max-w-md w-full p-6 overflow-y-auto">
        <h2 className="mb-4 text-3xl font-bold text-white text-center">{title}</h2>
        <div className="flex justify-center items-center">{children}</div>
      </div>
    </div>
  );
};

export default PreCustomerLayout;
