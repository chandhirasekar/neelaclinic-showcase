'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Stethoscope } from 'lucide-react';
import { CategoryType } from '@/types';

interface HeaderProps {
  currentCategory?: CategoryType;
  onSelectCategory?: (category: CategoryType) => void;
  onOpenConsultation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory = 'skin',
  onSelectCategory,
  onOpenConsultation,
}) => {
  return (
    <header className="w-full bg-[#0A66B2] text-white border-b border-[#084F8C] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3.5 sm:gap-4 group">
            <div className="w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-[18px] bg-white p-2 shadow-[0_4px_14px_rgba(0,0,0,0.18)] flex items-center justify-center shrink-0 overflow-hidden transition-transform group-hover:scale-102">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Nila Clinic Logo"
                className="w-full h-full object-contain block"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] leading-tight text-white font-sans">
                Nila Clinic
              </span>
              <span className="text-[#D9F2AD] font-semibold text-xs sm:text-sm tracking-wide mt-0.5">
                Skin & Hair Care
              </span>
            </div>
          </Link>

          {/* Right Tablet Navigation Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Category Quick Switcher Pills */}
            <div className="inline-flex rounded-full bg-black/20 p-1 border border-white/20 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => onSelectCategory?.('skin')}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  currentCategory === 'skin'
                    ? 'bg-white text-[#0A66B2] shadow-sm'
                    : 'text-white/85 hover:text-white hover:bg-white/10'
                }`}
              >
                Skin Treatments
              </button>
              <button
                type="button"
                onClick={() => onSelectCategory?.('hair')}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  currentCategory === 'hair'
                    ? 'bg-white text-[#0A66B2] shadow-sm'
                    : 'text-white/85 hover:text-white hover:bg-white/10'
                }`}
              >
                Hair Treatments
              </button>
            </div>

            {/* Doctor Note Pad Button */}
            {onOpenConsultation && (
              <button
                type="button"
                onClick={onOpenConsultation}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#8CC43A] hover:bg-[#72A924] text-[#0B2545] shadow-sm transition-colors active:scale-95"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Doctor Note</span>
              </button>
            )}

            {/* Admin Portal Link */}
            <Link
              href="/admin"
              className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 border border-white/20"
              title="Admin CMS"
            >
              <ShieldCheck className="w-4 h-4 text-[#D9F2AD]" />
              <span className="hidden md:inline">Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
