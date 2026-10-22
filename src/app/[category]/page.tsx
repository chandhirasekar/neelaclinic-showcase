import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CategoryType } from '@/types';
import { INITIAL_TREATMENTS } from '@/data/treatmentsData';
import {
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Search,
  CheckCircle2,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export function generateStaticParams() {
  return [{ category: 'hair' }, { category: 'skin' }];
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (category !== 'hair' && category !== 'skin') {
    notFound();
  }

  const cat = category as CategoryType;
  const isHair = cat === 'hair';
  const categoryTreatments = INITIAL_TREATMENTS.filter((t) => t.category === cat);
  const categoryTitle = isHair ? 'Hair Treatments' : 'Skin Treatments';
  const categorySubtitle = isHair
    ? 'Stronger, fuller, healthier hair. Select a treatment below to inspect its recommended concerns and before-and-after results.'
    : 'Clear, even, healthy skin. Select a treatment below to inspect its recommended concerns and before-and-after results.';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#0B0F14] text-stone-900 dark:text-stone-100 transition-colors font-sans">
      {/* Top Editorial Bar */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 dark:bg-[#0B0F14]/95 backdrop-blur-md border-b border-[#E8E2D8] dark:border-stone-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          {/* Row 1: Brand & Back on Left, Switcher on Right */}
          <div className="flex items-center justify-between gap-3 w-full">
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <Link
                href="/"
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors shrink-0 shadow-sm"
                title="Back to Patient Intake"
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

            {/* Category Switcher Pill - Top Right */}
            <div className="flex items-center gap-1.5 shrink-0">
              <Link
                href={isHair ? '/skin' : '/hair'}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 transition-colors shrink-0 whitespace-nowrap flex items-center gap-1.5 shadow-sm"
              >
                <span>Switch to {isHair ? 'Skin' : 'Hair'} Treatments</span>
              </Link>
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
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#0F2E22] text-[#E8D7BE] shadow-md border border-[#C5A880]/50 whitespace-nowrap">
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold bg-[#C5A880] text-[#0F2E22] shrink-0">
                  2
                </span>
                <span>Treatment Options</span>
              </div>
              <span className="text-stone-300 dark:text-stone-700 text-xs">/</span>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-400 whitespace-nowrap">
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold bg-stone-200 dark:bg-stone-800 text-stone-500 shrink-0">
                  3
                </span>
                <span>Concerns & Outcomes</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 animate-fadeIn">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0F2E22] dark:text-[#E8D7BE] hover:underline"
          >
            <ArrowLeft className="w-4 h-4 text-[#C5A880]" />
            <span>Back to Patient Intake (Step 1)</span>
          </Link>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
            {categoryTreatments.length} Clinical Protocols
          </span>
        </div>

        {/* Section Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#0F2E22] dark:text-[#C5A880]">
              Step 02 / Choose Clinical Treatment
            </span>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <span className="text-xs text-stone-500 font-medium capitalize">
              {cat} Category
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif-classic font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            {categoryTitle}
          </h1>
          <p className="mt-1 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-serif-cormorant text-lg sm:text-xl">
            {categorySubtitle}
          </p>
        </div>

        {/* Treatment Option Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryTreatments.map((treatment) => (
            <Link
              key={treatment.id}
              href={`/${cat}/${treatment.id}`}
              className="w-full text-left group cursor-pointer rounded-3xl p-6 bg-white dark:bg-stone-900 border-2 border-stone-200/90 dark:border-stone-800 hover:border-[#C5A880]/80 dark:hover:border-[#C5A880]/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.99] flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
            >
              <div>
                {/* Badge & Order */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-stone-500 dark:text-stone-400 px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800">
                    {isHair ? `TRICH-${treatment.order || 1}` : `DERMA-${treatment.order || 1}`}
                  </span>
                  {treatment.badge && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#0F2E22] text-[#E8D7BE] border border-[#C5A880]/30">
                      {treatment.badge}
                    </span>
                  )}
                </div>

                {/* Treatment Name */}
                <h2 className="text-xl font-serif-classic font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#0F2E22] dark:group-hover:text-[#C5A880] transition-colors leading-snug">
                  {treatment.name}
                </h2>

                {/* Doctor Note */}
                <p className="mt-2 text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {treatment.doctorNote ||
                    `Clinical treatment protocol for ${treatment.concerns.map(c => c.name).slice(0, 2).join(' & ')}.`}
                </p>

                {/* Concerns Count & List */}
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800">
                  <span className="block text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                    Recommended For ({treatment.concerns.length} Concerns):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {treatment.concerns.map((concern, idx) => (
                      <span
                        key={concern.id || idx}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/60 dark:border-stone-700/60"
                      >
                        {concern.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Strip */}
              <div className="mt-6 pt-3 flex items-center justify-between border-t border-stone-100 dark:border-stone-800 w-full">
                <span className="text-xs font-bold text-[#0F2E22] dark:text-[#C5A880] group-hover:underline flex items-center gap-1">
                  <span>View Concerns & Before/After</span>
                </span>
                <div className="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 group-hover:bg-[#0F2E22] group-hover:text-[#E8D7BE] flex items-center justify-center transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
