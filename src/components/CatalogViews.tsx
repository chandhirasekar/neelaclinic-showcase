'use client';

import React from 'react';
import { Treatment, CategoryType, ConcernItem } from '@/types';
import { ComparisonSlider } from './ComparisonSlider';
import { ArrowLeft, Sparkles, ChevronRight } from 'lucide-react';

interface HomeChoiceViewProps {
  skinCount: number;
  hairCount: number;
  onSelectCategory: (cat: CategoryType) => void;
  onEnterShowroom: () => void;
}

export const HomeChoiceView: React.FC<HomeChoiceViewProps> = ({
  skinCount,
  hairCount,
  onSelectCategory,
  onEnterShowroom,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 animate-fadeIn">
      {/* Hero Headline */}
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-[#0A66B2] dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Clinical Excellence & Proven Outcomes</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          See the difference before you decide.
        </h1>
        <p className="mt-3.5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Choose what you want to treat. We’ll show you each treatment, the concerns it is recommended for, and genuine before-and-after outcomes.
        </p>

        {/* Tablet Fast Action */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onEnterShowroom}
            className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-[#0A66B2] hover:bg-[#084F8C] text-white shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#D9F2AD]" />
            <span>Open Tablet Showroom Explorer</span>
          </button>
        </div>
      </div>

      {/* Two Large Choice Cards (FR-01) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
        {/* Skin Card */}
        <div
          onClick={() => onSelectCategory('skin')}
          className="group cursor-pointer p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-[#0A66B2] to-[#084F8C] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 border border-blue-400/30 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none group-hover:scale-125 transition-transform"></div>
          <div>
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20 group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 84 84" className="w-10 h-10 fill-none stroke-[#c4ea8a] stroke-[4] stroke-linecap-round">
                <path d="M42 10C28 28 20 38 20 50a22 22 0 0044 0c0-12-8-22-22-40z" />
                <path d="M32 52a10 10 0 0010 10" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Skin Treatments
            </h2>
            <p className="text-sm text-blue-100 mt-2 font-medium">
              Clear, even, healthy skin.
            </p>
          </div>

          <div className="mt-8 pt-4 flex items-center justify-between border-t border-white/15">
            <span className="px-4 py-2 rounded-xl text-xs font-bold bg-[#8CC43A] group-hover:bg-[#72A924] text-slate-950 transition-colors shadow-sm">
              View {skinCount} treatments
            </span>
            <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* Hair Card */}
        <div
          onClick={() => onSelectCategory('hair')}
          className="group cursor-pointer p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-[#0A66B2] to-[#084F8C] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 border border-blue-400/30 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none group-hover:scale-125 transition-transform"></div>
          <div>
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20 group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 84 84" className="w-10 h-10 fill-none stroke-[#c4ea8a] stroke-[4] stroke-linecap-round">
                <path d="M24 74c-8-18 8-24 0-42s10-20 10-22M42 74c-8-18 8-24 0-42s10-20 10-22M60 74c-8-18 8-24 0-42s10-20 10-22" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Hair Treatments
            </h2>
            <p className="text-sm text-blue-100 mt-2 font-medium">
              Stronger, fuller, healthier hair.
            </p>
          </div>

          <div className="mt-8 pt-4 flex items-center justify-between border-t border-white/15">
            <span className="px-4 py-2 rounded-xl text-xs font-bold bg-[#8CC43A] group-hover:bg-[#72A924] text-slate-950 transition-colors shadow-sm">
              View {hairCount} treatments
            </span>
            <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* 3 Steps Guide Strip (BRD Section 10.1 Figure 6) */}
      <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-3xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
        <div className="p-3 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0A66B2] text-white flex items-center justify-center text-xs font-bold shrink-0">
            1
          </div>
          <div>
            <b className="block text-xs font-bold text-slate-900 dark:text-white">1. Pick Skin or Hair</b>
            <span className="text-xs text-slate-500 dark:text-slate-400">Start with what matters to you.</span>
          </div>
        </div>

        <div className="p-3 flex items-start gap-3 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700">
          <div className="w-8 h-8 rounded-full bg-[#0A66B2] text-white flex items-center justify-center text-xs font-bold shrink-0">
            2
          </div>
          <div>
            <b className="block text-xs font-bold text-slate-900 dark:text-white">2. Choose a treatment</b>
            <span className="text-xs text-slate-500 dark:text-slate-400">See what it is recommended for.</span>
          </div>
        </div>

        <div className="p-3 flex items-start gap-3 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700">
          <div className="w-8 h-8 rounded-full bg-[#8CC43A] text-slate-950 flex items-center justify-center text-xs font-bold shrink-0">
            3
          </div>
          <div>
            <b className="block text-xs font-bold text-slate-900 dark:text-white">3. Compare results</b>
            <span className="text-xs text-slate-500 dark:text-slate-400">Slide between before and after.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CategoryPageViewProps {
  category: CategoryType;
  treatments: Treatment[];
  onBackToHome: () => void;
  onSelectTreatment: (treatment: Treatment) => void;
}

export const CategoryPageView: React.FC<CategoryPageViewProps> = ({
  category,
  treatments,
  onBackToHome,
  onSelectTreatment,
}) => {
  const isSkin = category === 'skin';
  const title = isSkin ? 'Skin Treatments' : 'Hair Treatments';
  const subtitle = isSkin
    ? 'Clear, even, healthy skin. Select a treatment to see what it is recommended for.'
    : 'Stronger, fuller, healthier hair. Select a treatment to see what it is recommended for.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fadeIn">
      <button
        type="button"
        onClick={onBackToHome}
        className="inline-flex items-center gap-2 text-xs font-bold text-[#0A66B2] dark:text-blue-400 hover:underline mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to home</span>
      </button>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {title}
        </h1>
        <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {treatments.map((treatment) => (
          <div
            key={treatment.id}
            onClick={() => onSelectTreatment(treatment)}
            className="group cursor-pointer bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-full h-28 rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-slate-700 dark:to-slate-750 flex items-center justify-center mb-4 border border-blue-100/60 dark:border-slate-600">
                <span className="text-xs font-bold text-[#0A66B2] dark:text-blue-300 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-xs">
                  {treatment.category.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#0A66B2] dark:group-hover:text-blue-400 transition-colors">
                  {treatment.name}
                </h3>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {treatment.doctorNote || treatment.concerns.map(c => c.name).join(', ')}
              </p>
            </div>

            <div className="mt-6 pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60">
              <span className="text-xs font-bold text-[#3F7A12] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-lg">
                {treatment.concerns.length} recommended for
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface TreatmentPageViewProps {
  treatment: Treatment;
  onBackToCategory: () => void;
  onSelectConcern: (concern: ConcernItem, index: number) => void;
}

export const TreatmentPageView: React.FC<TreatmentPageViewProps> = ({
  treatment,
  onBackToCategory,
  onSelectConcern,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fadeIn">
      <button
        type="button"
        onClick={onBackToCategory}
        className="inline-flex items-center gap-2 text-xs font-bold text-[#0A66B2] dark:text-blue-400 hover:underline mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to {treatment.category === 'skin' ? 'Skin Treatments' : 'Hair Treatments'}</span>
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0A66B2] dark:text-blue-400">
            {treatment.category} Treatment
          </span>
          {treatment.badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#3F7A12] dark:text-emerald-300">
              {treatment.badge}
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {treatment.name}
        </h1>
        <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          {treatment.doctorNote ? `${treatment.doctorNote} ` : ''}
          Recommended for the concerns below. Pick one to see the result.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {treatment.concerns.map((concern, idx) => (
          <div
            key={concern.id || idx}
            onClick={() => onSelectConcern(concern, idx)}
            className="group cursor-pointer bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-full h-24 rounded-2xl bg-gradient-to-r from-blue-50/50 to-emerald-50/50 dark:from-slate-700/60 dark:to-slate-755 flex items-center justify-center mb-4 border border-slate-200/60 dark:border-slate-600">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Before & After Available
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#0A66B2] dark:group-hover:text-blue-400 transition-colors">
                {concern.name}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                See how this looks before and after treatment.
              </p>
            </div>

            <div className="mt-6 pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-700/60">
              <span className="text-xs font-bold text-[#0A66B2] dark:text-blue-400">
                See before and after
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ConcernResultViewProps {
  treatment: Treatment;
  concern: ConcernItem;
  concernIndex: number;
  onBackToTreatment: () => void;
  onSelectOtherConcern: (index: number) => void;
  onOpenConsultation: () => void;
}

export const ConcernResultView: React.FC<ConcernResultViewProps> = ({
  treatment,
  concern,
  concernIndex,
  onBackToTreatment,
  onSelectOtherConcern,
  onOpenConsultation,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fadeIn">
      <button
        type="button"
        onClick={onBackToTreatment}
        className="inline-flex items-center gap-2 text-xs font-bold text-[#0A66B2] dark:text-blue-400 hover:underline mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to {treatment.name}</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Comparison Canvas */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <ComparisonSlider
            category={treatment.category}
            concernName={concern.name}
            beforeImage={concern.beforeImage}
            afterImage={concern.afterImage}
            useIllustration={concern.useIllustration !== false}
          />
        </div>

        {/* Right Column: Context */}
        <div className="lg:col-span-5 flex flex-col gap-5 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-700 shadow-md">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A66B2] dark:text-blue-400">
              {treatment.name}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-0.5">
              {concern.name}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {treatment.name}. Drag the slider or use the buttons to compare.
            </p>
          </div>

          <div className="space-y-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Treatment:</span>
              <b className="text-slate-900 dark:text-white">{treatment.name}</b>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Recommended for:</span>
              <b className="text-[#3F7A12] dark:text-emerald-400">{concern.name}</b>
            </div>
          </div>

          {concern.recommendedTreatments && concern.recommendedTreatments.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40">
              <b className="block text-xs font-bold uppercase tracking-wider text-[#0A66B2] dark:text-blue-300 mb-2">
                Doctor’s recommended treatments
              </b>
              <div className="flex flex-wrap gap-1.5">
                {concern.recommendedTreatments.map((rec, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-xs"
                  >
                    {rec}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <b className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2.5">
              Other concerns for {treatment.name}
            </b>
            <div className="flex flex-wrap gap-2">
              {treatment.concerns.map((c, j) => {
                const isCurrent = j === concernIndex;
                return (
                  <button
                    key={c.id || j}
                    type="button"
                    onClick={() => onSelectOtherConcern(j)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isCurrent
                        ? 'bg-[#0A66B2] text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenConsultation}
            className="w-full py-3 rounded-2xl text-xs font-bold bg-[#8CC43A] hover:bg-[#72A924] text-slate-950 shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>Record Doctor Consultation Note</span>
          </button>
        </div>
      </div>

      <div className="mt-10 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed max-w-4xl mx-auto">
        Results vary from person to person. Every person’s skin and hair is different, so your doctor will plan your treatment and timeline after a consultation.
      </div>
    </div>
  );
};
