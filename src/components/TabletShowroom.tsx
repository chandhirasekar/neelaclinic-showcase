'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Treatment, CategoryType, ConcernItem } from '@/types';
import { ComparisonSlider } from './ComparisonSlider';
import { Search, ChevronRight, CheckCircle2, Stethoscope, Share2 } from 'lucide-react';

interface TabletShowroomProps {
  treatments: Treatment[];
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  onOpenConsultation: (treatment: string, concern: string) => void;
  onActiveContextChange?: (treatmentName: string, concernName: string) => void;
  isDarkMode?: boolean;
}

export const TabletShowroom: React.FC<TabletShowroomProps> = ({
  treatments,
  selectedCategory,
  onSelectCategory,
  onOpenConsultation,
  onActiveContextChange,
  isDarkMode = false,
}) => {
  const categoryTreatments = useMemo(() => {
    return treatments.filter(t => t.category === selectedCategory);
  }, [treatments, selectedCategory]);

  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>(
    categoryTreatments[0]?.id || ''
  );

  const [searchQuery, setSearchQuery] = useState('');

  // Keep selected treatment valid when category changes
  useEffect(() => {
    if (categoryTreatments.length > 0) {
      const exists = categoryTreatments.some(t => t.id === selectedTreatmentId);
      if (!exists) {
        setSelectedTreatmentId(categoryTreatments[0].id);
        setSelectedConcernIndex(0);
      }
    }
  }, [categoryTreatments, selectedTreatmentId]);

  const activeTreatment = useMemo(() => {
    const found = categoryTreatments.find(t => t.id === selectedTreatmentId);
    return found || categoryTreatments[0] || null;
  }, [categoryTreatments, selectedTreatmentId]);

  const [selectedConcernIndex, setSelectedConcernIndex] = useState<number>(0);

  const activeConcern: ConcernItem | null = useMemo(() => {
    if (!activeTreatment || !activeTreatment.concerns || activeTreatment.concerns.length === 0) {
      return null;
    }
    const idx = Math.min(selectedConcernIndex, activeTreatment.concerns.length - 1);
    return activeTreatment.concerns[idx] || activeTreatment.concerns[0];
  }, [activeTreatment, selectedConcernIndex]);

  // Sync breadcrumbs in header
  useEffect(() => {
    if (activeTreatment && activeConcern && onActiveContextChange) {
      onActiveContextChange(activeTreatment.name, activeConcern.name);
    }
  }, [activeTreatment, activeConcern, onActiveContextChange]);

  const filteredTreatments = useMemo(() => {
    if (!searchQuery.trim()) return categoryTreatments;
    const q = searchQuery.toLowerCase();
    return categoryTreatments.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.concerns.some(c => c.name.toLowerCase().includes(q)) ||
      (t.doctorNote && t.doctorNote.toLowerCase().includes(q))
    );
  }, [categoryTreatments, searchQuery]);

  const handleSelectTreatment = (id: string) => {
    setSelectedTreatmentId(id);
    setSelectedConcernIndex(0);
  };

  const handleShareSummary = () => {
    if (navigator.share && activeTreatment && activeConcern) {
      navigator.share({
        title: `${activeTreatment.name} - Nila Clinic`,
        text: `Explore ${activeTreatment.name} for ${activeConcern.name} at Nila Clinic Skin & Hair Care.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert(`Treatment link copied: ${window.location.href}`);
    }
  };

  const isSkin = selectedCategory === 'skin';
  const categoryTitle = isSkin ? 'Skin Treatments' : 'Hair Treatments';
  const categoryBlurb = isSkin
    ? 'Clear, even, healthy skin. Select a treatment to see what it is recommended for.'
    : 'Stronger, fuller, healthier hair. Select a treatment to see what it is recommended for.';

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 transition-colors ${
      isDarkMode ? 'text-slate-100' : 'text-slate-900'
    }`}>
      {/* Category Title & Lead matching prototype */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/90 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-[#0B2545] dark:text-white">
            {categoryTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {categoryBlurb}
          </p>
        </div>

        {/* Quick Search */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatments or concerns..."
              className="w-full pl-9 pr-3.5 py-2.5 rounded-full text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0A66B2] text-slate-900 dark:text-white shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Main Tablet Dual Column: Left List and Right Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Treatment Selector with fixed overflow padding */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-2.5 order-2 lg:order-1">
          <div className="flex items-center justify-between px-1.5 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {isSkin ? 'Skin Treatments' : 'Hair Treatments'} ({filteredTreatments.length})
            </span>
            <span className="text-[11px] font-medium text-slate-400">
              Select to inspect
            </span>
          </div>

          {/* Scroll container with p-2.5 so active card borders are NEVER hidden/clipped */}
          <div className="p-2 sm:p-2.5 flex flex-col gap-2.5 max-h-[70vh] overflow-y-auto rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 shadow-xs">
            {filteredTreatments.map((treatment) => {
              const isSelected = activeTreatment?.id === treatment.id;
              return (
                <button
                  key={treatment.id}
                  type="button"
                  onClick={() => handleSelectTreatment(treatment.id)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 text-left focus:outline-none ${
                    isSelected
                      ? 'border-l-[5px] border-l-[#0A66B2] border-t-2 border-r-2 border-b-2 border-blue-500/30 bg-blue-50/90 dark:bg-blue-950/70 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/90 hover:border-blue-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex flex-col min-w-0 pr-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`text-sm font-bold truncate ${
                        isSelected ? 'text-[#0A66B2] dark:text-blue-300' : 'text-slate-900 dark:text-white'
                      }`}>
                        {treatment.name}
                      </h3>
                      {treatment.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#3F7A12] shrink-0">
                          {treatment.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 leading-normal">
                      {treatment.doctorNote || treatment.concerns.map(c => c.name).join(', ')}
                    </p>
                    <div className="mt-2">
                      <span className="inline-block text-[11px] font-bold text-[#3F7A12] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full">
                        {treatment.concerns.length} recommended for
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-[#0A66B2] translate-x-0.5' : 'text-slate-300 dark:text-slate-600'
                  }`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Stage: Before/After Comparison & Clinical Data */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4 order-1 lg:order-2">
          {activeTreatment && activeConcern ? (
            <div className="bg-white dark:bg-slate-800/95 rounded-3xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 shadow-sm">
              {/* Header Meta */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0A66B2] dark:text-blue-400">
                    {activeTreatment.name}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                    {activeConcern.name}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShareSummary}
                    title="Share result"
                    className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenConsultation(activeTreatment.name, activeConcern.name)}
                    className="px-4 py-2 rounded-full text-xs font-bold bg-[#8CC43A] hover:bg-[#72A924] text-[#0B2545] shadow-xs flex items-center gap-1.5 transition-colors active:scale-95"
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>Record Patient Note</span>
                  </button>
                </div>
              </div>

              {/* Main Interactive Comparison View */}
              <div className="mb-4">
                <ComparisonSlider
                  category={selectedCategory}
                  concernName={activeConcern.name}
                  beforeImage={activeConcern.beforeImage}
                  afterImage={activeConcern.afterImage}
                  useIllustration={activeConcern.useIllustration !== false}
                />
              </div>

              {/* Concern Chips (BRD FR-09) */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Other Concerns for {activeTreatment.name} ({activeTreatment.concerns.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeTreatment.concerns.map((concern, idx) => {
                    const isCurrent = idx === selectedConcernIndex;
                    return (
                      <button
                        key={concern.id || idx}
                        type="button"
                        onClick={() => setSelectedConcernIndex(idx)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-95 ${
                          isCurrent
                            ? 'bg-[#8CC43A] text-[#0B2545] font-bold shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                      >
                        {isCurrent && <CheckCircle2 className="w-3.5 h-3.5 text-[#0B2545]" />}
                        <span>{concern.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Doctor Recommended Treatments (For Acne & Scar Guide FR-24) */}
              {activeConcern.recommendedTreatments && activeConcern.recommendedTreatments.length > 0 && (
                <div className="mt-4 p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40">
                  <b className="block text-xs font-bold uppercase tracking-wider text-[#0A66B2] dark:text-blue-300 mb-2">
                    Doctor’s recommended treatments
                  </b>
                  <div className="flex flex-wrap gap-1.5">
                    {activeConcern.recommendedTreatments.map((rec, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-xs border border-blue-200/40"
                      >
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Doctor Note */}
              {activeTreatment.doctorNote && (
                <div className="mt-3 p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/50 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <span className="font-bold text-[#3F7A12] shrink-0">Doctor Note:</span>
                  <span>{activeTreatment.doctorNote}</span>
                </div>
              )}

              {/* Standard Mandatory Medical Disclaimer (BR-05 & FR-14) */}
              <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                Results vary from person to person. Every person’s skin and hair is different, so your doctor will plan your treatment and timeline after a consultation.
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl text-center border border-slate-200 dark:border-slate-700">
              <p className="text-slate-500">Please select a treatment from the list.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
