import React from 'react';

interface DataFlowIconProps {
  className?: string;
}

export const DataFlowIcon: React.FC<DataFlowIconProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Animated flow lines */}
      <path
        d="M8 20 L16 20 L20 12 L24 28 L28 20 L32 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="flow-line"
      />
      {/* Input node */}
      <circle cx="8" cy="20" r="4" fill="currentColor" opacity="0.3" />
      <circle cx="8" cy="20" r="2" fill="currentColor" />
      {/* Output node */}
      <circle cx="32" cy="20" r="4" fill="currentColor" opacity="0.3" />
      <circle cx="32" cy="20" r="2" fill="currentColor" />
    </svg>
  );
};
