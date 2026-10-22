'use client';

import React from 'react';

interface ClinicalLoaderProps {
  message?: string;
  submessage?: string;
}

export const ClinicalLoader: React.FC<ClinicalLoaderProps> = ({
  message = 'Loading Clinical Protocols...',
  submessage = 'Connecting to Nila Clinic Database'
}) => {
  return (
    <div className="min-h-[50vh] flex-1 flex flex-col items-center justify-center p-8 select-none animate-fadeIn">
      <div className="relative flex items-center justify-center mb-6">
        {/* Outer Dual-Color Spinning Ring */}
        <div className="w-20 h-20 rounded-full border-4 border-slate-200/80 border-t-[#0A66B2] border-r-[#8CC43A] animate-spin" />
        
        {/* Inner Pulse Ring */}
        <div className="absolute w-14 h-14 rounded-full bg-[#EBF4FB] flex items-center justify-center shadow-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-icon.svg"
            alt="Nila Clinic"
            className="w-8 h-8 object-contain animate-pulse"
          />
        </div>
      </div>

      {/* Status Messages */}
      <div className="text-center">
        <h3 className="text-base sm:text-lg font-serif-classic font-bold text-[#084F8C]">
          {message}
        </h3>
        <p className="mt-1 text-xs text-slate-500 font-medium tracking-wide">
          {submessage}
        </p>
      </div>
    </div>
  );
};
