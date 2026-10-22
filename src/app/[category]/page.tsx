import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CategoryType } from '@/types';
import { getAllTreatments } from '@/lib/treatmentService';
import {
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Microscope,
  Stethoscope,
  Sparkles
} from 'lucide-react';
import { AuthStatusButton } from '@/components/AuthStatusButton';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (category !== 'hair' && category !== 'skin') {
    notFound();
  }

  const cat = category as CategoryType;
  const isHair = cat === 'hair';
  const allTreatments = await getAllTreatments();
  const categoryTreatments = allTreatments.filter((t) => t.category === cat);
  const categoryTitle = isHair ? 'Hair Treatments' : 'Skin Treatments';
  const categorySubtitle = isHair
    ? 'Stronger, fuller, healthier hair. Select a treatment below to inspect its recommended concerns and before-and-after results.'
    : 'Clear, even, healthy skin. Select a treatment below to inspect its recommended concerns and before-and-after results.';

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F9FD] dark:bg-[#07172A] text-slate-800 dark:text-slate-100 transition-colors font-sans select-none">
      {/* Clinical Header: Full-Width Straight 1-Row on Desktop, 2-Tier on Tablet/Mobile */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#07172A]/95 backdrop-blur-md border-b border-[#D5E3F0] dark:border-slate-800 shadow-xs">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5">
          {/* DESKTOP VIEW (lg:): Full-width straight 1-row (Left Brand, Center Steps, Right Switcher) */}
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#084F8C] transition-colors whitespace-nowrap"
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

            {/* Right: Switcher & Doctor Profile Dropdown */}
            <div className="flex items-center justify-end gap-2">
              <Link
                href={isHair ? '/skin' : '/hair'}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-[#EBF4FB] text-[#084F8C] transition-all flex items-center gap-1.5 border border-[#D5E3F0] shrink-0 whitespace-nowrap shadow-xs hover:border-[#0A66B2]/40"
              >
                <span>Switch to {isHair ? 'Skin' : 'Hair'} Treatments</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#72A924]" />
              </Link>
              <AuthStatusButton />
            </div>
          </div>

          {/* TABLET & MOBILE VIEW (< lg:): 2-Tier Layout */}
          <div className="lg:hidden flex flex-col gap-2">
            {/* Row 1: Brand on Left, Switcher on Right */}
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

              <div className="flex items-center gap-1.5">
                <Link
                  href={isHair ? '/skin' : '/hair'}
                  className="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-white text-[#084F8C] border border-[#D5E3F0] shadow-xs"
                >
                  {isHair ? 'Skin' : 'Hair'}
                </Link>
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
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-bold bg-gradient-to-r from-[#0A66B2] to-[#084F8C] text-white shadow-xs whitespace-nowrap">
                  <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black bg-[#8CC43A] text-[#084F8C]">
                    2
                  </span>
                  <span>Treatments</span>
                </div>
                <span className="text-slate-300 text-xs">/</span>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-medium text-slate-400 whitespace-nowrap">
                  <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold bg-white text-slate-400 border border-slate-200">
                    3
                  </span>
                  <span>Outcomes</span>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 animate-fadeIn">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0A66B2] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Patient Intake (Step 1)</span>
          </Link>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EBF4FB] text-[#084F8C] border border-[#0A66B2]/20">
            {categoryTreatments.length} Clinical Protocols
          </span>
        </div>

        {/* Section Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A66B2]">
              Step 02 / Choose Clinical Treatment
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              {cat} Department
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif-classic font-bold text-slate-900 tracking-tight">
            {categoryTitle}
          </h1>
          <p className="mt-1 text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            {categorySubtitle}
          </p>
        </div>

        {/* Treatment Option Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryTreatments.map((treatment) => (
            <Link
              key={treatment.id}
              href={`/${cat}/${treatment.id}`}
              className="w-full text-left group cursor-pointer rounded-2xl p-6 bg-white border-2 border-slate-200/90 hover:border-[#0A66B2] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.99] flex flex-col justify-between focus:outline-none focus:ring-4 focus:ring-[#0A66B2]/20"
            >
              <div>
                {/* Badge & Order */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-500 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                    {isHair ? `TRICH-${treatment.order || 1}` : `DERMA-${treatment.order || 1}`}
                  </span>
                  {treatment.badge && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EBF4FB] text-[#0A66B2] border border-[#0A66B2]/30">
                      {treatment.badge}
                    </span>
                  )}
                </div>

                {/* Treatment Name */}
                <h2 className="text-xl font-serif-classic font-bold text-slate-900 group-hover:text-[#0A66B2] transition-colors leading-snug">
                  {treatment.name}
                </h2>

                {/* Doctor Note */}
                <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {treatment.doctorNote ||
                    `Clinical treatment protocol for ${treatment.concerns.map(c => c.name).slice(0, 2).join(' & ')}.`}
                </p>

                {/* Concerns Count & List */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Recommended For ({treatment.concerns.length} Concerns):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {treatment.concerns.map((concern, idx) => (
                      <span
                        key={concern.id || idx}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[#F4F9FD] text-slate-700 border border-[#D5E3F0]"
                      >
                        {concern.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Strip */}
              <div className="mt-6 pt-3 flex items-center justify-between border-t border-slate-100 w-full">
                <span className="text-xs font-bold text-[#0A66B2] group-hover:underline flex items-center gap-1">
                  <span>View Concerns &amp; Before/After</span>
                </span>
                <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#0A66B2] group-hover:text-white flex items-center justify-center transition-colors">
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
