import React from 'react';
import { COMPANY_STATS } from '../data/safariData';

export const StatsBar: React.FC = () => {
  return (
    <div className="bg-[#182F1D] border-y border-[#2A4830] py-8 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {COMPANY_STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col text-center ${idx > 0 ? 'sm:pl-6 pt-4 sm:pt-0' : ''}`}
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-[#FDB913] tracking-tight tabular-nums">
                {stat.value}
              </span>
              <span className="text-sm font-bold text-white mt-1">
                {stat.label}
              </span>
              <span className="text-xs text-neutral-400 mt-0.5">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
