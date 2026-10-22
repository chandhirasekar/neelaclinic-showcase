'use client';

import React from 'react';
import Link from 'next/link';
import { INITIAL_TREATMENTS } from '@/data/treatmentsData';
import {
  Sparkles,
  ShieldCheck,
  BadgeCheck,
  FileText,
  ChevronRight,
  Stethoscope
} from 'lucide-react';

export default function HomePage() {
  const hairCount = INITIAL_TREATMENTS.filter((t) => t.category === 'hair').length;
  const skinCount = INITIAL_TREATMENTS.filter((t) => t.category === 'skin').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#0B0F14] text-stone-900 dark:text-stone-100 transition-colors font-sans">
      {/* Editorial Luxury Top Bar */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 dark:bg-[#0B0F14]/95 backdrop-blur-md border-b border-[#E8E2D8] dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Clinic Brand Crest */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white p-1 border border-stone-200/80 dark:border-stone-700/80 shadow-sm flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-icon.svg"
                alt="Nila Clinic Logo"
                className="w-full h-full object-contain block select-none"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-classic text-base sm:text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100">
                  Nila Clinic
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold px-2 py-0.5 rounded-full bg-[#0F2E22] text-[#E8D7BE] border border-[#C5A880]/40 hidden sm:inline-flex">
                  Tablet Consultation Suite
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Aesthetic Dermatology & Trichology Excellence
              </p>
            </div>
          </Link>

          {/* Step Progress Rail */}
          <nav aria-label="Consultation Steps" className="flex items-center gap-2 bg-stone-100/90 dark:bg-stone-900/90 p-1.5 rounded-2xl border border-stone-200/90 dark:border-stone-800">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#0F2E22] text-[#E8D7BE] shadow-md border border-[#C5A880]/50">
              <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold bg-[#C5A880] text-[#0F2E22]">
                1
              </span>
              <span>Patient Intake</span>
            </div>
            <span className="text-stone-300 dark:text-stone-700 text-xs">/</span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-400">
              <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                2
              </span>
              <span className="hidden sm:inline">Clinical Protocol</span>
            </div>
            <span className="text-stone-300 dark:text-stone-700 text-xs">/</span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-400">
              <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                3
              </span>
              <span className="hidden sm:inline">Concerns & Outcomes</span>
            </div>
          </nav>

          {/* Admin Link */}
          <Link
            href="/admin"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors flex items-center gap-1.5 border border-stone-200 dark:border-stone-700"
          >
            <ShieldCheck className="w-4 h-4 text-[#8CC43A]" />
            <span className="hidden sm:inline">Admin CMS</span>
          </Link>
        </div>
      </header>

      {/* Main Step 1 Content Area */}
      <main className="flex-1 flex flex-col justify-center max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 my-auto animate-fadeIn">
        {/* Editorial Headline */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Step 01 / Patient Intake Focus</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif-classic font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
            What treatment is the patient presenting for?
          </h1>

          <p className="mt-3 text-stone-600 dark:text-stone-400 font-serif-cormorant text-lg sm:text-xl leading-relaxed">
            Select the primary clinical discipline to evaluate specialized treatments, recommended concerns, and verified before-and-after photographic results.
          </p>
        </div>

        {/* Two Grand Clinical Portals: Hair vs Skin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto w-full">
          {/* HAIR RESTORATION ROUTE LINK */}
          <Link
            href="/hair"
            className="group cursor-pointer p-7 sm:p-9 rounded-3xl bg-[#0F2E22] text-[#F5F2EB] shadow-2xl hover:shadow-[0_20px_50px_rgba(15,46,34,0.35)] transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.99] border-2 border-[#C5A880]/50 hover:border-[#C5A880] flex flex-col justify-between relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-radial from-[#C5A880]/20 to-transparent pointer-events-none"></div>

            <div>
              {/* Discipline Crest */}
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-[#C5A880]/40 group-hover:scale-105 transition-transform">
                <svg
                  viewBox="0 0 84 84"
                  className="w-9 h-9 fill-none stroke-[#C5A880] stroke-[3.5] stroke-linecap-round"
                >
                  <path d="M24 74c-8-18 8-24 0-42s10-20 10-22M42 74c-8-18 8-24 0-42s10-20 10-22M60 74c-8-18 8-24 0-42s10-20 10-22" />
                </svg>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#C5A880]/20 text-[#E8D7BE] border border-[#C5A880]/30 mb-3">
                <span>Trichology & Hair Restoration</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif-classic font-bold tracking-tight text-white">
                Hair Treatments
              </h2>

              <p className="mt-2.5 text-sm sm:text-base text-stone-300 font-serif-cormorant leading-relaxed">
                Hairfall control, Excell GFC, PRP hair restoration, oxygen laser therapy, dandruff scalp care, and microsurgical hair transplantation.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-medium text-stone-300">
                <span className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/10">
                  Hair Loss
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/10">
                  Thinning Hair
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/10">
                  Excell GFC
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/10">
                  Transplantation
                </span>
              </div>
            </div>

            <div className="mt-8 pt-5 flex items-center justify-between border-t border-white/15 w-full">
              <span className="px-4 py-2 rounded-xl text-xs font-bold bg-[#C5A880] text-[#0F2E22] group-hover:bg-[#E8D7BE] transition-colors shadow-sm">
                Examine {hairCount} Hair Treatments
              </span>
              <ChevronRight className="w-5 h-5 text-[#C5A880] group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>

          {/* SKIN SCIENCE ROUTE LINK */}
          <Link
            href="/skin"
            className="group cursor-pointer p-7 sm:p-9 rounded-3xl bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.99] border-2 border-stone-200/90 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 flex flex-col justify-between relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#0F2E22]"
          >
            <div>
              {/* Discipline Crest */}
              <div className="w-16 h-16 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-6 border border-stone-200 dark:border-stone-700 group-hover:scale-105 transition-transform">
                <svg
                  viewBox="0 0 84 84"
                  className="w-9 h-9 fill-none stroke-[#0F2E22] dark:stroke-[#C5A880] stroke-[3.5] stroke-linecap-round"
                >
                  <path d="M42 10C28 28 20 38 20 50a22 22 0 0044 0c0-12-8-22-22-40z" />
                  <path d="M32 52a10 10 0 0010 10" />
                </svg>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 mb-3">
                <span>Aesthetic Dermatology</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif-classic font-bold tracking-tight text-stone-900 dark:text-stone-100">
                Skin Treatments
              </h2>

              <p className="mt-2.5 text-sm sm:text-base text-stone-600 dark:text-stone-400 font-serif-cormorant leading-relaxed">
                PRP skin treatment, Glutathione IV, Oxygeno facial, Botox & Fillers, Microdermabrasion, and anti-acne scar protocols.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-medium text-stone-600 dark:text-stone-400">
                <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                  Wrinkles
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                  Acne Scar
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                  Dull Skin
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                  Exfoliation
                </span>
              </div>
            </div>

            <div className="mt-8 pt-5 flex items-center justify-between border-t border-stone-100 dark:border-stone-800 w-full">
              <span className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0F2E22] dark:bg-stone-800 text-[#E8D7BE] group-hover:bg-[#164231] transition-colors shadow-sm">
                Examine {skinCount} Skin Treatments
              </span>
              <ChevronRight className="w-5 h-5 text-stone-400 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Clinical Quality Trust Badges */}
        <div className="mt-10 text-center flex flex-wrap items-center justify-center gap-6 text-xs text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#8CC43A]" />
            <span>US-FDA Approved Technologies</span>
          </span>
          <span className="flex items-center gap-1.5">
            <BadgeCheck className="w-4 h-4 text-[#C5A880]" />
            <span>Board-Certified Dermatologists</span>
          </span>
          <span className="flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-stone-400" />
            <span>Documented Photographic Cases</span>
          </span>
        </div>
      </main>
    </div>
  );
}
