import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string | number;
  rate?: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
  colorClass: string;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
  colorClass,
}) => {
  return (
    <div className={`relative rounded-lg ${colorClass} p-6 shadow-lg w-64`}>
      {/* Background Decoration */}
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white opacity-30 blur-xl"></div>

      {/* Icon Section */}
      <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full">
        {children}
      </div>

      {/* Main Content */}
      <div className="relative z-10 mt-4">
        <div className="flex items-end justify-between">
          <div>
            <h4 className="text-2xl font-bold text-gray-800">{total}</h4>
            <span className="text-sm font-medium text-gray-600">{title}</span>
          </div>
          <span
            className={`flex items-center gap-1 text-sm font-medium ${
              levelUp ? "text-green-600" : levelDown ? "text-red-600" : ""
            }`}
          >
            {rate}
            {levelUp && (
              <svg
                className="fill-green-600"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 0L10 7H0L5 0Z" />
              </svg>
            )}
            {levelDown && (
              <svg
                className="fill-red-600"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 10L0 3H10L5 10Z" />
              </svg>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;