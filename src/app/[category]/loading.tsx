import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ClinicalLoader } from '@/components/ClinicalLoader';
import { AuthStatusButton } from '@/components/AuthStatusButton';

export default function CategoryLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F9FD] dark:bg-[#07172A] text-slate-800 dark:text-slate-100 font-sans select-none">
      {/* Clinical Header: Matches [category] Page Layout */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#07172A]/95 backdrop-blur-md border-b border-[#D5E3F0] dark:border-slate-800 shadow-xs">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5">
          {/* DESKTOP VIEW (lg:): Straight 1-row */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:items-center w-full">
            {/* Left: Brand Identity & Back Link */}
            <div className="flex items-center justify-start gap-3">
              <Link
                href="/"
                className="p-2 rounded-xl bg-slate-100 hover:bg-[#EBF4FB] text-[#0A66B2] transition-colors shrink-0 shadow-xs border border-slate-200"
                title="Back to Patient Intake"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>

              <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                <div className="w-10 h-10 rounded-2xl bg-white p-1 border-2 border-[#0A66B2]/20 shadow-xs flex items-center justify-center shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo-icon.svg"
                    alt="Nila Clinic Logo"
                    className="w-full h-full object-contain block select-none"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-serif-classic text-lg font-bold tracking-tight text-[#084F8C] dark:text-white whitespace-nowrap">
                      Nila Clinic
                    </span>
                    <span className="text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 rounded-full bg-[#EBF4FB] text-[#0A66B2] border border-[#0A66B2]/30 whitespace-nowrap">
                      Tablet Suite
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                    Aesthetic Dermatology &amp; Clinical Trichology
                  </p>
                </div>
              </Link>
            </div>

            {/* Center: Step-by-Step Consultation Progress Rail */}
            <div className="flex justify-center items-center">
              <nav aria-label="Consultation Steps" className="flex items-center gap-2 bg-[#EBF4FB]/80 dark:bg-slate-900/80 p-1 sm:p-1.5 rounded-2xl border border-[#D5E3F0] dark:border-slate-800 shadow-xs">
                <Link
                  href="/"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap"
                >
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black bg-[#8CC43A] text-[#084F8C] shrink-0">
                    ✓
                  </span>
                  <span>Intake</span>
                </Link>
                <span className="text-slate-300 dark:text-slate-700 text-xs">/</span>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#0A66B2] to-[#084F8C] text-white shadow-xs border border-blue-400/30 whitespace-nowrap">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black bg-[#8CC43A] text-[#084F8C] shrink-0">
                    2
                  </span>
                  <span>Treatment Options</span>
                </div>
                <span className="text-slate-300 dark:text-slate-700 text-xs">/</span>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shrink-0">
                    3
                  </span>
                  <span>Concerns &amp; Outcomes</span>
                </div>
              </nav>
            </div>

            {/* Right: Doctor Profile Dropdown */}
            <div className="flex items-center justify-end">
              <AuthStatusButton />
            </div>
          </div>

          {/* TABLET & MOBILE VIEW (< lg:): 2-Tier Layout */}
          <div className="lg:hidden flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3 w-full">
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="p-1.5 rounded-lg bg-slate-100 text-[#0A66B2] shrink-0 border border-slate-200"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white p-1 border border-[#0A66B2]/20 shadow-xs flex items-center justify-center shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logo-icon.svg"
                      alt="Nila Clinic"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-serif-classic text-base font-bold text-[#084F8C]">
                    Nila Clinic
                  </span>
                </Link>
              </div>

              <AuthStatusButton />
            </div>

            {/* Row 2: Centered Steps Rail */}
            <div className="flex justify-center w-full pt-1.5 border-t border-[#D5E3F0]/70">
              <nav aria-label="Consultation Steps" className="flex items-center gap-1.5 bg-[#EBF4FB]/80 p-1 rounded-2xl border border-[#D5E3F0] shadow-xs">
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-medium text-slate-600">
                  <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black bg-[#8CC43A] text-[#084F8C]">
                    ✓
                  </span>
                  <span>Intake</span>
                </span>
                <span className="text-slate-300 text-xs">/</span>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold bg-[#0A66B2] text-white">
                  <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black bg-[#8CC43A] text-[#084F8C]">
                    2
                  </span>
                  <span>Treatments</span>
                </span>
                <span className="text-slate-300 text-xs">/</span>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-medium text-slate-400">
                  <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold bg-white text-slate-400">
                    3
                  </span>
                  <span>Outcomes</span>
                </span>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content: Centered Clinical Loader with Pulsing Logo Ring */}
      <main className="flex-1 flex items-center justify-center p-6">
        <ClinicalLoader
          message="Loading Clinical Treatment Library..."
          submessage="Retrieving specialized protocols from Nila Clinic Cloud"
        />
      </main>
    </div>
  );
}
