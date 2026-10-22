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
import { AuthStatusButton } from './AuthStatusButton';

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
    <div className="min-h-screen flex flex-col bg-[#F4F9FD] dark:bg-[#07172A] text-slate-800 dark:text-slate-100 transition-colors font-sans select-none">
      {/* Clinical Header: Full-Width Straight 1-Row on Desktop, 2-Tier on Tablet/Mobile */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#07172A]/95 backdrop-blur-md border-b border-[#D5E3F0] dark:border-slate-800 shadow-xs">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5">
          {/* DESKTOP VIEW (lg:): Full-width straight 1-row (Left Brand, Center Steps, Right Prescribe) */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:items-center w-full">
            {/* Left: Brand Identity & Back Link */}
            <div className="flex items-center justify-start gap-3">
              <Link
                href={`/${category}`}
                className="p-2 rounded-xl bg-slate-100 hover:bg-[#EBF4FB] text-[#0A66B2] transition-colors shrink-0 shadow-xs border border-slate-200"
                title={`Back to ${isHair ? 'Hair' : 'Skin'} Treatments`}
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>

              <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                <div className="w-10 h-10 rounded-2xl bg-white p-1 border-2 border-[#0A66B2]/20 shadow-xs flex items-center justify-center shrink-0 overflow-hidden group-hover:border-[#0A66B2] group-hover:scale-105 transition-all">
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
                    <span className="text-[10px] tracking-wider uppercase font-bold px-2.5 py-0.5 rounded-full bg-[#EBF4FB] text-[#0A66B2] border border-[#0A66B2]/30 whitespace-nowrap">
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#084F8C] transition-colors whitespace-nowrap"
                >
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black bg-[#8CC43A] text-[#084F8C] shrink-0">
                    ✓
                  </span>
                  <span>Intake</span>
                </Link>
                <span className="text-slate-300 dark:text-slate-700 text-xs">/</span>
                <Link
                  href={`/${category}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#084F8C] transition-colors whitespace-nowrap"
                >
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black bg-[#8CC43A] text-[#084F8C] shrink-0">
                    ✓
                  </span>
                  <span>Treatments</span>
                </Link>
                <span className="text-slate-300 dark:text-slate-700 text-xs">/</span>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#0A66B2] to-[#084F8C] text-white shadow-xs border border-blue-400/30 whitespace-nowrap">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black bg-[#8CC43A] text-[#084F8C] shrink-0">
                    3
                  </span>
                  <span>Concerns &amp; Outcomes</span>
                </div>
              </nav>
            </div>

            {/* Right: Prescribe Doctor Note Button & Doctor Dropdown */}
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleOpenConsultation}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#0A66B2] to-[#084F8C] hover:from-[#084F8C] hover:to-[#05355E] text-white border border-blue-400/30 shadow-xs active:scale-95 transition-all flex items-center gap-2 shrink-0 whitespace-nowrap"
              >
                <Stethoscope className="w-4 h-4 text-[#8CC43A] shrink-0" />
                <span>Prescribe Doctor Note</span>
              </button>
              <AuthStatusButton />
            </div>
          </div>

          {/* TABLET & MOBILE VIEW (< lg:): 2-Tier Layout */}
          <div className="lg:hidden flex flex-col gap-2">
            {/* Row 1: Brand on Left, Action on Right */}
            <div className="flex items-center justify-between gap-3 w-full">
              <div className="flex items-center gap-2">
                <Link
                  href={`/${category}`}
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

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleOpenConsultation}
                  className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-[#0A66B2] text-white flex items-center gap-1.5 shadow-xs"
                >
                  <Stethoscope className="w-3 h-3 text-[#8CC43A]" />
                  <span>Prescribe</span>
                </button>
                <AuthStatusButton />
              </div>
            </div>

            {/* Row 2: Centered Steps Rail */}
            <div className="flex justify-center w-full pt-1.5 border-t border-[#D5E3F0]/70">
              <nav aria-label="Consultation Steps" className="flex items-center gap-1.5 bg-[#EBF4FB]/80 p-1 rounded-2xl border border-[#D5E3F0] shadow-xs">
                <Link
                  href="/"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-medium text-slate-600 whitespace-nowrap"
                >
                  <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black bg-[#8CC43A] text-[#084F8C]">
                    ✓
                  </span>
                  <span>Intake</span>
                </Link>
                <span className="text-slate-300 text-xs">/</span>
                <Link
                  href={`/${category}`}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-medium text-slate-600 whitespace-nowrap"
                >
                  <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black bg-[#8CC43A] text-[#084F8C]">
                    ✓
                  </span>
                  <span>Treatments</span>
                </Link>
                <span className="text-slate-300 text-xs">/</span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-bold bg-gradient-to-r from-[#0A66B2] to-[#084F8C] text-white shadow-xs whitespace-nowrap">
                  <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black bg-[#8CC43A] text-[#084F8C]">
                    3
                  </span>
                  <span>Outcomes</span>
                </div>
              </nav>
            </div>
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
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      isHair
                        ? 'bg-[#0A66B2]/10 text-[#084F8C] dark:text-blue-300 border-[#0A66B2]/30'
                        : 'bg-[#72A924]/10 text-[#5F921B] dark:text-lime-300 border-[#72A924]/30'
                    }`}
                  >
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
                  const activeCardStyle = isHair
                    ? 'bg-gradient-to-r from-[#0A66B2] to-[#084F8C] text-white border-[#8CC43A] shadow-md shadow-blue-900/20'
                    : 'bg-gradient-to-r from-[#72A924] to-[#5F921B] text-white border-[#D9F2AD] shadow-md shadow-green-900/20';

                  const activeBadgeStyle = isHair
                    ? 'bg-[#8CC43A] text-[#084F8C]'
                    : 'bg-[#D9F2AD] text-[#2E540C]';

                  const activeChevronStyle = isHair
                    ? 'text-[#8CC43A]'
                    : 'text-[#D9F2AD]';

                  return (
                    <button
                      key={concern.id || idx}
                      type="button"
                      onClick={() => setActiveConcernIndex(idx)}
                      className={`w-full text-left p-4 rounded-2xl cursor-pointer transition-all border-2 flex items-center justify-between gap-3 ${
                        isSelected
                          ? activeCardStyle
                          : 'bg-stone-50 hover:bg-stone-100 dark:bg-stone-800/60 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200/80 dark:border-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            isSelected
                              ? activeBadgeStyle
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
                              isSelected
                                ? isHair
                                  ? 'text-blue-100'
                                  : 'text-green-100'
                                : 'text-stone-500 dark:text-stone-400'
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
                          isSelected ? `${activeChevronStyle} translate-x-1` : 'text-stone-400'
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
                  className={`w-full py-3 rounded-2xl text-xs font-bold shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 ${
                    isHair
                      ? 'bg-gradient-to-r from-[#0A66B2] to-[#084F8C] hover:from-[#084F8C] hover:to-[#05355E] text-white border border-[#8CC43A]/40 shadow-blue-900/25'
                      : 'bg-gradient-to-r from-[#72A924] to-[#5F921B] hover:from-[#5F921B] hover:to-[#2E540C] text-white border border-[#D9F2AD]/40 shadow-green-900/25'
                  }`}
                >
                  <Stethoscope className={`w-4 h-4 ${isHair ? 'text-[#8CC43A]' : 'text-[#D9F2AD]'}`} />
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
