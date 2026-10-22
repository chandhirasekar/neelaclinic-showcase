'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Treatment, ConcernItem, CategoryType } from '@/types';
import { ConcernComparisonViewer } from './ConcernComparisonViewer';
import { ConsultationModal } from './ConsultationModal';
import {
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Stethoscope,
  CheckCircle2,
  Layers,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface TreatmentConsultationClientProps {
  category: CategoryType;
  treatment: Treatment;
}

export const TreatmentConsultationClient: React.FC<TreatmentConsultationClientProps> = ({
  category,
  treatment
}) => {
  const isHair = category === 'hair';
  const concerns = treatment.concerns || [];

  // Active concern index state (defaults to 0)
  const [activeConcernIndex, setActiveConcernIndex] = useState<number>(0);

  // Doctor Consultation Modal state
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const activeConcern: ConcernItem | undefined = concerns[activeConcernIndex] || concerns[0];

  const handleOpenConsultation = () => {
    setIsConsultationOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#0B0F14] text-stone-900 dark:text-stone-100 transition-colors font-sans">
      {/* Top Editorial Bar */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 dark:bg-[#0B0F14]/95 backdrop-blur-md border-b border-[#E8E2D8] dark:border-stone-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          {/* Row 1: Brand & Back on Left, Prescribe Note on Right */}
          <div className="flex items-center justify-between gap-3 w-full">
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <Link
                href={`/${category}`}
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors shrink-0 shadow-sm"
                title={`Back to ${isHair ? 'Hair' : 'Skin'} Treatments`}
              >
                <ArrowLeft className="w-4 h-4 text-[#C5A880]" />
              </Link>

              <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white p-1 border border-stone-200/80 dark:border-stone-700/80 shadow-sm flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo-icon.svg"
                    alt="Nila Clinic Logo"
                    className="w-full h-full object-contain block select-none"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-serif-classic text-base sm:text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100 whitespace-nowrap shrink-0">
                      Nila Clinic
                    </span>
                    <span className="text-[10px] tracking-wider uppercase font-semibold px-2.5 py-0.5 rounded-full bg-[#0F2E22] text-[#E8D7BE] border border-[#C5A880]/40 whitespace-nowrap shrink-0">
                      Tablet Consultation Suite
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 whitespace-nowrap">
                    Aesthetic Dermatology & Trichology Excellence
                  </p>
                </div>
              </Link>
            </div>

            {/* Prescribe Note Button - Top Right */}
            <div className="flex items-center shrink-0">
              <button
                type="button"
                onClick={handleOpenConsultation}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold bg-[#0F2E22] hover:bg-[#164231] text-[#E8D7BE] border border-[#C5A880]/40 shadow-sm active:scale-95 transition-all flex items-center gap-2 shrink-0 whitespace-nowrap"
              >
                <Stethoscope className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span>Prescribe Doctor Note</span>
              </button>
            </div>
          </div>

          {/* Row 2: Step-by-Step Progress Rail (Wrapped down & Centered) */}
          <div className="flex justify-center w-full mt-2 sm:mt-2.5 pt-2 sm:pt-2.5 border-t border-[#E8E2D8]/60 dark:border-stone-800/60">
            <nav aria-label="Consultation Steps" className="flex items-center gap-1.5 sm:gap-2.5 bg-stone-100/90 dark:bg-stone-900/90 p-1 sm:p-1.5 rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-sm">
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-950 transition-colors whitespace-nowrap"
              >
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold bg-[#C5A880] text-[#0F2E22] shrink-0">
                  ✓
                </span>
                <span>Intake (Step 1)</span>
              </Link>
              <span className="text-stone-300 dark:text-stone-700 text-xs">/</span>
              <Link
                href={`/${category}`}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-950 transition-colors whitespace-nowrap"
              >
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold bg-[#C5A880] text-[#0F2E22] shrink-0">
                  ✓
                </span>
                <span>Treatments (Step 2)</span>
              </Link>
              <span className="text-stone-300 dark:text-stone-700 text-xs">/</span>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#0F2E22] text-[#E8D7BE] shadow-md border border-[#C5A880]/50 whitespace-nowrap">
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold bg-[#C5A880] text-[#0F2E22] shrink-0">
                  3
                </span>
                <span>Concerns & Outcomes</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content: Two Column Split View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-6 animate-fadeIn flex flex-col">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <Link href="/" className="hover:underline text-stone-600 dark:text-stone-400">
              Home
            </Link>
            <span>/</span>
            <Link href={`/${category}`} className="hover:underline text-stone-600 dark:text-stone-400 capitalize">
              {category} Treatments
            </Link>
            <span>/</span>
            <span className="font-bold text-stone-900 dark:text-stone-100">
              {treatment.name}
            </span>
          </div>

          <Link
            href={`/${category}`}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors"
          >
            ← Switch Treatment
          </Link>
        </div>

        {/* Two-Column Split Screen: Left Side Concerns, Right Side Before & After */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 flex-1">
          {/* ========================================================================= */}
          {/* LEFT SIDE: RECOMMENDED CONCERNS */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Treatment Card Banner */}
            <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-stone-500 dark:text-stone-400 px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800">
                  {isHair ? `TRICH-${treatment.order || 1}` : `DERMA-${treatment.order || 1}`}
                </span>
                {treatment.badge && (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#0F2E22] text-[#E8D7BE] border border-[#C5A880]/30">
                    {treatment.badge}
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-serif-classic font-bold text-stone-900 dark:text-stone-100">
                {treatment.name}
              </h1>

              {treatment.doctorNote && (
                <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-serif-cormorant text-sm">
                  {treatment.doctorNote}
                </p>
              )}
            </div>

            {/* List of Concerns: Recommended For */}
            <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm flex-1 flex flex-col">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                  Recommended For (Concerns):
                </span>
                <span className="text-[11px] font-semibold text-stone-400">
                  Select a concern below
                </span>
              </div>

              {/* Concern Options List */}
              <div className="flex flex-col gap-2.5 flex-1">
                {concerns.map((concern, idx) => {
                  const isSelected = activeConcernIndex === idx;
                  return (
                    <button
                      key={concern.id || idx}
                      type="button"
                      onClick={() => setActiveConcernIndex(idx)}
                      className={`w-full text-left p-4 rounded-2xl cursor-pointer transition-all border-2 flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#0F2E22] text-[#F5F2EB] border-[#C5A880] shadow-md'
                          : 'bg-stone-50 hover:bg-stone-100 dark:bg-stone-800/60 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200/80 dark:border-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            isSelected
                              ? 'bg-[#C5A880] text-[#0F2E22]'
                              : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                          }`}
                        >
                          {isSelected ? '✓' : idx + 1}
                        </span>

                        <div>
                          <h4 className="text-sm sm:text-base font-bold font-serif-classic leading-snug">
                            {concern.name}
                          </h4>
                          <span
                            className={`text-[11px] block mt-0.5 ${
                              isSelected ? 'text-stone-300' : 'text-stone-500 dark:text-stone-400'
                            }`}
                          >
                            {isSelected
                              ? 'Viewing clinical results'
                              : 'Tap to compare before & after'}
                          </span>
                        </div>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isSelected ? 'text-[#C5A880] translate-x-1' : 'text-stone-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Action Button: Prescribe / Document in Patient File */}
              <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={handleOpenConsultation}
                  className="w-full py-3 rounded-2xl text-xs font-bold bg-[#0F2E22] hover:bg-[#164231] text-[#E8D7BE] border border-[#C5A880]/50 shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Stethoscope className="w-4 h-4 text-[#C5A880]" />
                  <span>Document Note for {activeConcern?.name || 'Selected Concern'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE: BEFORE & AFTER OUTCOME SHOWCASE */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm flex-1 flex flex-col">
              {activeConcern ? (
                <ConcernComparisonViewer
                  category={category}
                  treatmentName={treatment.name}
                  concern={activeConcern}
                />
              ) : (
                <div className="p-8 text-center text-stone-500">
                  No concern selected.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Doctor Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        category={category}
        treatmentName={treatment.name}
        concernName={activeConcern?.name || 'General Concern'}
      />
    </div>
  );
};
