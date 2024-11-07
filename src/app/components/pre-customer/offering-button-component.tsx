"use client";

const OfferingButtonComponent = ({
  isLoading,
  onClick,
  label,
  buttonStyle,
}: {
  isLoading: boolean;
  onClick: () => void;
  label: string;
  buttonStyle: string;
}) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className={`w-full px-4 py-2 rounded ${isLoading ? "bg-gray-400" : buttonStyle} text-white font-semibold`}
    aria-busy={isLoading}
  >
    {isLoading ? "Laddar..." : label}
  </button>
);

export default OfferingButtonComponent;
