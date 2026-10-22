'use client';

import React, { useState, useMemo } from 'react';
import { Treatment, CategoryType, TreatmentVariant } from '@/types';
import {
  enrichTreatmentWithVariants,
  HAIR_TREATMENT_VARIANTS,
  HAIR_CLINICAL_CASES
} from '@/data/treatmentVariantsData';
import { ClassicComparisonViewer } from './ClassicComparisonViewer';
import {
  ArrowLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Clock,
  Layers,
  Search,
  CheckCircle2,
  FileText,
  BadgeCheck,
  RotateCcw,
  Zap,
  Flame,
  Activity
} from 'lucide-react';

interface ThreeStepConsultationProps {
  treatments: Treatment[];
  initialCategory?: CategoryType;
  initialStep?: 1 | 2 | 3;
  onOpenConsultationModal: (treatmentName: string, concernName: string, variantName?: string) => void;
  onExitToCatalog?: () => void;
}

export const ThreeStepConsultation: React.FC<ThreeStepConsultationProps> = ({
  treatments,
  initialCategory = 'hair',
  initialStep = 1,
  onOpenConsultationModal,
  onExitToCatalog
}) => {
  // Step State: 1 = Category Intake (Hair or Skin), 2 = Treatment Selection, 3 = Split Variants & Before/After
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(initialStep);

  // Selected Category
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(initialCategory);

  // Selected Treatment
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>('hair-transplantation');

  // Selected Variant index / id
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');

  // Selected Clinical Case index for Before/After
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);

  // Search and filter for Step 2
  const [treatmentSearch, setTreatmentSearch] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');

  // Filtered treatments by category with enriched variants and cases
  const categoryTreatments = useMemo(() => {
    return treatments
      .filter((t) => t.category === selectedCategory)
      .map((t) => enrichTreatmentWithVariants(t));
  }, [treatments, selectedCategory]);

  // Active Treatment object
  const activeTreatment = useMemo(() => {
    const found = categoryTreatments.find((t) => t.id === selectedTreatmentId);
    return found || categoryTreatments[0] || null;
  }, [categoryTreatments, selectedTreatmentId]);

  // Active Variant object
  const activeVariant: TreatmentVariant | null = useMemo(() => {
    if (!activeTreatment || !activeTreatment.variants || activeTreatment.variants.length === 0) {
      return null;
    }
    if (selectedVariantId) {
      const found = activeTreatment.variants.find((v) => v.id === selectedVariantId);
      if (found) return found;
    }
    return activeTreatment.variants[0];
  }, [activeTreatment, selectedVariantId]);

  // Step 1: Handler for choosing Hair or Skin
  const handleSelectCategory = (cat: CategoryType) => {
    setSelectedCategory(cat);
    // Find first treatment in that category
    const firstTreatment = treatments.find((t) => t.category === cat);
    if (firstTreatment) {
      setSelectedTreatmentId(firstTreatment.id);
    }
    setActiveCaseIndex(0);
    setCurrentStep(2);
  };

  // Step 2: Handler for choosing a Treatment
  const handleSelectTreatment = (treatment: Treatment) => {
    setSelectedTreatmentId(treatment.id);
    const enriched = enrichTreatmentWithVariants(treatment);
    if (enriched.variants && enriched.variants.length > 0) {
      setSelectedVariantId(enriched.variants[0].id);
    }
    setActiveCaseIndex(0);
    setCurrentStep(3);
  };

  // Filtered list for Step 2
  const filteredStep2Treatments = useMemo(() => {
    let list = categoryTreatments;

    if (filterType !== 'all') {
      if (filterType === 'surgical') {
        list = list.filter((t) => t.invasiveness === 'Surgical');
      } else if (filterType === 'injectable') {
        list = list.filter(
          (t) =>
            t.id.includes('prp') ||
            t.id.includes('gfc') ||
            t.id.includes('botox') ||
            t.id.includes('glutathione')
        );
      } else if (filterType === 'laser-scalp') {
        list = list.filter(
          (t) =>
            t.id.includes('laser') ||
            t.id.includes('scalp') ||
            t.id.includes('dandruff') ||
            t.id.includes('microdermabrasion')
        );
      }
    }

    if (treatmentSearch.trim()) {
      const q = treatmentSearch.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.concerns.some((c) => c.name.toLowerCase().includes(q)) ||
          (t.doctorNote && t.doctorNote.toLowerCase().includes(q))
      );
    }

    return list;
  }, [categoryTreatments, filterType, treatmentSearch]);

  const hairCount = treatments.filter((t) => t.category === 'hair').length;
  const skinCount = treatments.filter((t) => t.category === 'skin').length;

  return (
    <div className="w-full flex-1 flex flex-col bg-[#F4F9FD] dark:bg-[#07172A] text-slate-800 dark:text-slate-100 transition-colors">
      {/* Clinical Header: Full-Width Straight 1-Row on Desktop, 2-Tier on Tablet/Mobile */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#07172A]/95 backdrop-blur-md border-b border-[#D5E3F0] dark:border-slate-800 shadow-xs">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5">
          {/* DESKTOP VIEW (lg:): Full-width straight 1-row (Left Brand, Center Steps, Right Prescribe) */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:items-center w-full">
            {/* Left: Brand Crest */}
            <div className="flex items-center justify-start gap-3">
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
                  <span className="text-[10px] tracking-wider uppercase font-bold px-2.5 py-0.5 rounded-full bg-[#EBF4FB] text-[#0A66B2] border border-[#0A66B2]/30 whitespace-nowrap">
                    Tablet Suite
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                  Aesthetic Dermatology &amp; Clinical Trichology
                </p>
              </div>
            </div>

            {/* Center: Step-by-Step Progress Rail */}
            <div className="flex justify-center items-center">
              <nav aria-label="Consultation Steps" className="flex items-center gap-1.5 bg-[#EBF4FB]/80 dark:bg-slate-900/80 p-1 rounded-2xl border border-[#D5E3F0] dark:border-slate-800 shadow-xs">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    currentStep === 1
                      ? 'bg-gradient-to-r from-[#0A66B2] to-[#084F8C] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#084F8C]'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black bg-[#8CC43A] text-[#084F8C] shrink-0">
                    1
                  </span>
                  <span>Intake</span>
                </button>

                <span className="text-slate-300 text-xs">/</span>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    currentStep === 2
                      ? 'bg-gradient-to-r from-[#0A66B2] to-[#084F8C] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#084F8C]'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black bg-[#8CC43A] text-[#084F8C] shrink-0">
                    2
                  </span>
                  <span>Protocol</span>
                </button>

                <span className="text-slate-300 text-xs">/</span>

                <button
                  type="button"
                  onClick={() => {
                    if (activeTreatment) setCurrentStep(3);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    currentStep === 3
                      ? 'bg-gradient-to-r from-[#0A66B2] to-[#084F8C] text-white shadow-xs'
                      : 'text-slate-600 hover:text-[#084F8C]'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black bg-[#8CC43A] text-[#084F8C] shrink-0">
                    3
                  </span>
                  <span>Outcomes</span>
                </button>
              </nav>
            </div>

            {/* Right: Prescribe Doctor Note Button */}
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() =>
                  onOpenConsultationModal(
                    activeTreatment?.name || 'General Consultation',
                    activeVariant?.name || 'Initial Assessment',
                    activeVariant?.name
                  )
                }
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#0A66B2] to-[#084F8C] hover:from-[#084F8C] hover:to-[#05355E] text-white border border-blue-400/30 shadow-xs active:scale-95 transition-all flex items-center gap-2 shrink-0 whitespace-nowrap"
              >
                <Stethoscope className="w-4 h-4 text-[#8CC43A] shrink-0" />
                <span>Prescribe Doctor Note</span>
              </button>
            </div>
          </div>

          {/* TABLET & MOBILE VIEW (< lg:): 2-Tier Layout */}
          <div className="lg:hidden flex flex-col gap-2">
            {/* Row 1: Brand on Left, Prescribe on Right */}
            <div className="flex items-center justify-between gap-3 w-full">
              <div className="flex items-center gap-2">
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
              </div>

              <button
                type="button"
                onClick={() =>
                  onOpenConsultationModal(
                    activeTreatment?.name || 'General Consultation',
                    activeVariant?.name || 'Initial Assessment',
                    activeVariant?.name
                  )
                }
                className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-[#0A66B2] text-white flex items-center gap-1.5 shadow-xs"
              >
                <Stethoscope className="w-3.5 h-3.5 text-[#8CC43A]" />
                <span>Prescribe</span>
              </button>
            </div>

            {/* Row 2: Centered Steps Rail */}
            <div className="flex justify-center w-full pt-1.5 border-t border-[#D5E3F0]/70">
              <nav aria-label="Consultation Steps" className="flex items-center gap-1 bg-[#EBF4FB]/80 p-1 rounded-2xl border border-[#D5E3F0] shadow-xs">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-xl text-[11px] font-bold ${
                    currentStep === 1
                      ? 'bg-gradient-to-r from-[#0A66B2] to-[#084F8C] text-white shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black bg-[#8CC43A] text-[#084F8C]">
                    1
                  </span>
                  <span>Intake</span>
                </button>
                <span className="text-slate-300 text-xs">/</span>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-xl text-[11px] font-bold ${
                    currentStep === 2
                      ? 'bg-gradient-to-r from-[#0A66B2] to-[#084F8C] text-white shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black bg-[#8CC43A] text-[#084F8C]">
                    2
                  </span>
                  <span>Protocol</span>
                </button>
                <span className="text-slate-300 text-xs">/</span>
                <button
                  type="button"
                  onClick={() => {
                    if (activeTreatment) setCurrentStep(3);
                  }}
                  className={`flex items-center gap-1 px-2 py-1 rounded-xl text-[11px] font-bold ${
                    currentStep === 3
                      ? 'bg-gradient-to-r from-[#0A66B2] to-[#084F8C] text-white shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black bg-[#8CC43A] text-[#084F8C]">
                    3
                  </span>
                  <span>Outcomes</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* STEP 1: PATIENT INTAKE - HAIR OR SKIN SELECTION */}
      {/* ========================================================================= */}
      {currentStep === 1 && (
        <section className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 animate-fadeIn flex flex-col justify-center my-auto">
          {/* Editorial Headline */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Step 01 / Clinical Consultation Intake</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif-classic font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
              What treatment is the patient presenting for?
            </h1>

            <p className="mt-2.5 text-stone-600 dark:text-stone-400 font-serif-cormorant text-base sm:text-lg leading-relaxed">
              Select the primary clinical discipline to evaluate specialized protocols, technique variants, and documented before-and-after cases.
            </p>
          </div>

          {/* Two Classic Grand Choice Portals (Hair vs Skin) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto w-full">
            {/* HAIR RESTORATION CARD BUTTON */}
            <button
              type="button"
              onClick={() => handleSelectCategory('hair')}
              className="w-full text-left group cursor-pointer p-6 sm:p-8 rounded-3xl bg-[#0F2E22] text-[#F5F2EB] shadow-2xl hover:shadow-[0_20px_50px_rgba(15,46,34,0.3)] transition-all duration-300 hover:-translate-y-1 active:scale-[0.99] border-2 border-[#C5A880]/50 hover:border-[#C5A880] flex flex-col justify-between relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
            >
              {/* Subtle Classic Gold Foil Corner Accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-[#C5A880]/15 to-transparent pointer-events-none"></div>

              <div>
                {/* Discipline Crest & Icon */}
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-5 border border-[#C5A880]/40 group-hover:scale-105 transition-transform">
                  <svg
                    viewBox="0 0 84 84"
                    className="w-8 h-8 fill-none stroke-[#C5A880] stroke-[3.5] stroke-linecap-round"
                  >
                    <path d="M24 74c-8-18 8-24 0-42s10-20 10-22M42 74c-8-18 8-24 0-42s10-20 10-22M60 74c-8-18 8-24 0-42s10-20 10-22" />
                  </svg>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#C5A880]/20 text-[#E8D7BE] border border-[#C5A880]/30 mb-2.5">
                  <span>Trichology & Microsurgery</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif-classic font-bold tracking-tight text-white">
                  Hair Treatments
                </h2>

                <p className="mt-2 text-sm text-stone-300 font-serif-cormorant text-base leading-relaxed">
                  Microsurgical Sapphire FUE, BIO-FUE, autologous GFC concentrates, regenerative PRP, and scalp microbiome restoration.
                </p>

                {/* Scope highlights */}
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-medium text-stone-300">
                  <span className="px-2.5 py-1 rounded-lg bg-black/25 border border-white/10">
                    Follicular Mapping
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-black/25 border border-white/10">
                    Sapphire FUE
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-black/25 border border-white/10">
                    Excell GFC
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-black/25 border border-white/10">
                    Scalp Detox
                  </span>
                </div>
              </div>

              {/* Action Strip */}
              <div className="mt-6 pt-4 flex items-center justify-between border-t border-white/15 w-full">
                <span className="px-4 py-2 rounded-xl text-xs font-bold bg-[#C5A880] text-[#0F2E22] group-hover:bg-[#E8D7BE] transition-colors shadow-sm">
                  Examine {hairCount} Hair Protocols
                </span>
                <ChevronRight className="w-5 h-5 text-[#C5A880] group-hover:translate-x-1.5 transition-transform" />
              </div>
            </button>

            {/* SKIN SCIENCE CARD BUTTON */}
            <button
              type="button"
              onClick={() => handleSelectCategory('skin')}
              className="w-full text-left group cursor-pointer p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.99] border-2 border-stone-200/90 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 flex flex-col justify-between relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#0F2E22]"
            >
              <div>
                {/* Discipline Crest & Icon */}
                <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-5 border border-stone-200 dark:border-stone-700 group-hover:scale-105 transition-transform">
                  <svg
                    viewBox="0 0 84 84"
                    className="w-8 h-8 fill-none stroke-[#0F2E22] dark:stroke-[#C5A880] stroke-[3.5] stroke-linecap-round"
                  >
                    <path d="M42 10C28 28 20 38 20 50a22 22 0 0044 0c0-12-8-22-22-40z" />
                    <path d="M32 52a10 10 0 0010 10" />
                  </svg>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 mb-2.5">
                  <span>Aesthetic Dermatology</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif-classic font-bold tracking-tight text-stone-900 dark:text-stone-100">
                  Skin Treatments
                </h2>

                <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 font-serif-cormorant text-base leading-relaxed">
                  Medical acne scar resurfacing, Q-Switch pigmentation lasers, anti-wrinkle Botox & Fillers, and deep dermal hydration.
                </p>

                {/* Scope highlights */}
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-medium text-stone-600 dark:text-stone-400">
                  <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    Acne Revision
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    Laser Toning
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    Botox & Fillers
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    Meso Glow
                  </span>
                </div>
              </div>

              {/* Action Strip */}
              <div className="mt-6 pt-4 flex items-center justify-between border-t border-stone-100 dark:border-stone-800 w-full">
                <span className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0F2E22] dark:bg-stone-800 text-[#E8D7BE] group-hover:bg-[#164231] transition-colors shadow-sm">
                  Examine {skinCount} Skin Protocols
                </span>
                <ChevronRight className="w-5 h-5 text-stone-400 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </button>
          </div>

          {/* Clinical Assurance Seal */}
          <div className="mt-8 text-center flex items-center justify-center gap-6 text-xs text-stone-500 dark:text-stone-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#8CC43A]" />
              <span>US-FDA Approved Protocols</span>
            </span>
            <span className="flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-[#C5A880]" />
              <span>Board-Certified Dermatologists</span>
            </span>
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-stone-400" />
              <span>Documented Case Audits</span>
            </span>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: LIST TREATMENT TYPE OPTIONS */}
      {/* ========================================================================= */}
      {currentStep === 2 && (
        <section className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 animate-fadeIn">
          {/* Breadcrumb & Step Navigation */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0F2E22] dark:text-[#E8D7BE] hover:underline"
            >
              <ArrowLeft className="w-4 h-4 text-[#C5A880]" />
              <span>Back to Patient Intake (Step 1)</span>
            </button>

            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
              Showing {filteredStep2Treatments.length} {selectedCategory === 'hair' ? 'Hair' : 'Skin'} Protocols
            </span>
          </div>

          {/* Section Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#0F2E22] dark:text-[#C5A880]">
                Step 02 / Select Clinical Protocol
              </span>
              <span className="text-stone-300 dark:text-stone-700">•</span>
              <span className="text-xs text-stone-500 font-medium capitalize">
                {selectedCategory} Discipline
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-classic font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              {selectedCategory === 'hair' ? 'Hair Restoration Protocols' : 'Aesthetic Dermatology Protocols'}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-serif-cormorant text-lg">
              Click any treatment option to inspect its technique variants, specifications, and verified before-and-after photographic results.
            </p>
          </div>

          {/* Search Bar & Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-2 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  filterType === 'all'
                    ? 'bg-[#0F2E22] text-[#E8D7BE] shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
                }`}
              >
                All Protocols
              </button>
              {selectedCategory === 'hair' ? (
                <>
                  <button
                    type="button"
                    onClick={() => setFilterType('surgical')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      filterType === 'surgical'
                        ? 'bg-[#0F2E22] text-[#E8D7BE] shadow-sm'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
                    }`}
                  >
                    Micro-Surgical (FUE/DHI)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterType('injectable')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      filterType === 'injectable'
                        ? 'bg-[#0F2E22] text-[#E8D7BE] shadow-sm'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
                    }`}
                  >
                    GFC & Biologic PRP
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterType('laser-scalp')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      filterType === 'laser-scalp'
                        ? 'bg-[#0F2E22] text-[#E8D7BE] shadow-sm'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
                    }`}
                  >
                    Scalp Detox & Laser
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setFilterType('injectable')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      filterType === 'injectable'
                        ? 'bg-[#0F2E22] text-[#E8D7BE] shadow-sm'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
                    }`}
                  >
                    Injectables & PRP
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterType('laser-scalp')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      filterType === 'laser-scalp'
                        ? 'bg-[#0F2E22] text-[#E8D7BE] shadow-sm'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
                    }`}
                  >
                    Clinical Lasers & Peels
                  </button>
                </>
              )}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search protocol or concern..."
                value={treatmentSearch}
                onChange={(e) => setTreatmentSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
          </div>

          {/* Grid of Treatment Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStep2Treatments.map((treatment) => (
              <button
                key={treatment.id}
                type="button"
                onClick={() => handleSelectTreatment(treatment)}
                className="w-full text-left group cursor-pointer rounded-3xl p-6 bg-white dark:bg-stone-900 border-2 border-stone-200/90 dark:border-stone-800 hover:border-[#C5A880]/70 dark:hover:border-[#C5A880]/70 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.99] flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
              >
                <div>
                  {/* Top Bar: Code & Invasiveness Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-stone-500 dark:text-stone-400 px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800">
                      {treatment.code || 'CLINICAL'}
                    </span>
                    {treatment.badge ? (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#0F2E22] text-[#E8D7BE] border border-[#C5A880]/30">
                        {treatment.badge}
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                        {treatment.invasiveness || 'Non-Invasive'}
                      </span>
                    )}
                  </div>

                  {/* Treatment Title */}
                  <h3 className="text-xl font-serif-classic font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#0F2E22] dark:group-hover:text-[#C5A880] transition-colors leading-snug">
                    {treatment.name}
                  </h3>

                  {/* Doctor note / rationale */}
                  <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                    {treatment.doctorNote ||
                      treatment.variants?.[0]?.tagline ||
                      'Clinical dermatological protocol tailored for specialized restoration.'}
                  </p>

                  {/* Clinical Specifications Pill Strip */}
                  <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center gap-3 text-[11px] text-stone-500 dark:text-stone-400">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{treatment.variants?.length || 2} Variants</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{treatment.sessionsSummary || '1 - 3 Sessions'}</span>
                    </span>
                  </div>

                  {/* Concerns Chips */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {treatment.concerns.slice(0, 3).map((c, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                      >
                        {c.name}
                      </span>
                    ))}
                    {treatment.concerns.length > 3 && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 text-stone-400">
                        +{treatment.concerns.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-6 pt-3 flex items-center justify-between border-t border-stone-100 dark:border-stone-800 w-full">
                  <span className="text-xs font-bold text-[#0F2E22] dark:text-[#C5A880] group-hover:underline flex items-center gap-1">
                    <span>Inspect Variants & Results</span>
                  </span>
                  <div className="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 group-hover:bg-[#0F2E22] group-hover:text-[#E8D7BE] flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: SPLIT VIEW - LEFT SIDE VARIANTS & RIGHT SIDE BEFORE/AFTER */}
      {/* ========================================================================= */}
      {currentStep === 3 && activeTreatment && (
        <section className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-6 animate-fadeIn flex flex-col">
          {/* Header Bar with Quick Switch */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
                title="Back to All Protocols"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    Step 03 / Clinical Comparison & Variants
                  </span>
                  <span className="text-xs text-stone-400">•</span>
                  <span className="text-xs font-medium text-stone-500 capitalize">
                    {activeTreatment.category} Protocol
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-serif-classic font-bold text-stone-900 dark:text-stone-100">
                  {activeTreatment.name}
                </h1>
              </div>
            </div>

            {/* Protocol Switcher Quick Dropdown */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
              >
                Switch Protocol ({categoryTreatments.length})
              </button>
            </div>
          </div>

          {/* TWO-COLUMN EDITORIAL CLINICAL LAYOUT */}
          {/* Left Side: Variants & Clinical Specifications */}
          {/* Right Side: Before and After Comparison Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 flex-1">
            {/* ------------------------------------------------------------------- */}
            {/* LEFT COLUMN (VARIANTS & CLINICAL SPECS) - 5 Columns */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Variant Selector Tabs */}
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                  1. Select Clinical Technique Variant:
                </span>
                <div className="flex flex-col gap-2">
                  {activeTreatment.variants?.map((v) => {
                    const isSelected = activeVariant?.id === v.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                          isSelected
                            ? 'bg-[#0F2E22] text-[#F5F2EB] border-[#C5A880] shadow-md'
                            : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 border-stone-200/90 dark:border-stone-800 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                isSelected
                                  ? 'bg-[#C5A880] text-[#0F2E22]'
                                  : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                              }`}
                            >
                              {isSelected ? '✓' : '•'}
                            </span>
                            <h4 className="text-sm font-bold tracking-tight font-serif-classic">
                              {v.name}
                            </h4>
                          </div>
                          {v.badge && (
                            <span
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                isSelected
                                  ? 'bg-[#C5A880]/20 text-[#E8D7BE] border border-[#C5A880]/40'
                                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                              }`}
                            >
                              {v.badge}
                            </span>
                          )}
                        </div>
                        <p
                          className={`mt-1.5 text-xs line-clamp-1 ${
                            isSelected ? 'text-stone-300' : 'text-stone-500 dark:text-stone-400'
                          }`}
                        >
                          {v.tagline}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Variant Deep Dive Card */}
              {activeVariant && (
                <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm flex flex-col gap-4">
                  {/* Variant Header Info */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-stone-400">
                        {activeVariant.code || 'SPEC-01'}
                      </span>
                      <span className="text-xs font-semibold text-[#0F2E22] dark:text-[#C5A880]">
                        {activeVariant.sessions}
                      </span>
                    </div>
                    <h3 className="text-lg font-serif-classic font-bold text-stone-900 dark:text-stone-100">
                      {activeVariant.name}
                    </h3>
                    <p className="mt-1 text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-serif-cormorant text-sm">
                      {activeVariant.methodology}
                    </p>
                  </div>

                  {/* Technical Specifications Grid */}
                  <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 flex flex-col divide-y divide-stone-200/70 dark:divide-stone-700/60 text-xs">
                    {activeVariant.specifications.map((spec, i) => (
                      <div key={i} className="py-1.5 flex items-center justify-between gap-2">
                        <span className="text-stone-500 dark:text-stone-400 font-medium">
                          {spec.label}
                        </span>
                        <span className="font-semibold text-stone-900 dark:text-stone-100 text-right">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Clinical Inclusions Checklist */}
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">
                      Clinical Inclusions & Care:
                    </span>
                    <ul className="flex flex-col gap-1.5 text-xs text-stone-700 dark:text-stone-300">
                      {activeVariant.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8CC43A] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Doctor Recommendation & Consultation Prescription Button */}
                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex flex-col gap-2.5">
                    {activeVariant.doctorVerdict && (
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 italic font-serif-classic">
                        "{activeVariant.doctorVerdict}"
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        onOpenConsultationModal(
                          activeTreatment.name,
                          activeVariant.recommendedFor[0] || 'Assessment',
                          activeVariant.name
                        )
                      }
                      className="w-full py-3 rounded-2xl text-xs font-bold bg-[#0F2E22] hover:bg-[#164231] text-[#E8D7BE] border border-[#C5A880]/50 shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
                    >
                      <Stethoscope className="w-4 h-4 text-[#C5A880]" />
                      <span>Prescribe / Document This Protocol</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* RIGHT COLUMN (BEFORE AND AFTER SHOWCASE) - 7 Columns */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm flex-1 flex flex-col">
                <ClassicComparisonViewer
                  cases={activeTreatment.cases || []}
                  activeCaseIndex={activeCaseIndex}
                  onSelectCaseIndex={setActiveCaseIndex}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
