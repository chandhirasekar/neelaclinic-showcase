'use client';

import React from 'react';
import Link from 'next/link';
import { INITIAL_TREATMENTS } from '@/data/treatmentsData';
import {
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Microscope,
  Stethoscope
} from 'lucide-react';
import { AuthStatusButton } from '@/components/AuthStatusButton';

export default function HomePage() {
  const hairCount = INITIAL_TREATMENTS.filter((t) => t.category === 'hair').length;
  const skinCount = INITIAL_TREATMENTS.filter((t) => t.category === 'skin').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#07172A] text-slate-100 transition-colors font-sans select-none">
      {/* Clinical Header: Full-Width Straight 1-Row on Desktop, 2-Tier on Tablet/Mobile */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#07172A]/95 backdrop-blur-md border-b border-[#D5E3F0] dark:border-slate-800 shadow-xs">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5">
          {/* DESKTOP VIEW (lg:): Full-width straight 1-row (Left Logo, Center Steps, Right Admin) */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:items-center w-full">
            {/* Left: Brand Identity */}
            <div className="flex items-center justify-start">
              <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
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
                    <span className="font-serif-classic text-lg sm:text-xl font-bold tracking-tight text-[#084F8C] dark:text-white whitespace-nowrap">
                      Nila Clinic
                    </span>
                    <span className="text-[10px] tracking-wider uppercase font-bold px-2.5 py-0.5 rounded-full bg-[#EBF4FB] text-[#0A66B2] border border-[#0A66B2]/30 whitespace-nowrap">
                      Tablet Consultation Suite
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                    Aesthetic Dermatology &amp; Clinical Trichology
                  </p>
                </div>
              </Link>
            </div>

            {/* Center: Step-by-Step Consultation Progress Rail */}
            <div className="flex justify-center items-center">
              <nav aria-label="Consultation Steps" className="flex items-center gap-2 bg-[#EBF4FB]/80 dark:bg-slate-900/80 p-1 sm:p-1.5 rounded-2xl border border-[#D5E3F0] dark:border-slate-800 shadow-xs">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#0A66B2] to-[#084F8C] text-white shadow-xs border border-blue-400/30 whitespace-nowrap">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black bg-[#8CC43A] text-[#084F8C] shrink-0">
                    1
                  </span>
                  <span>Patient Intake</span>
                </div>
                <span className="text-slate-300 dark:text-slate-700 text-xs">/</span>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shrink-0">
                    2
                  </span>
                  <span>Clinical Protocol</span>
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

            {/* Right: Doctor Profile Dropdown (Admin URL & Logout) */}
            <div className="flex items-center justify-end">
              <AuthStatusButton />
            </div>
          </div>

          {/* TABLET & MOBILE VIEW (< lg:): 2-Tier Layout to avoid squishing */}
          <div className="lg:hidden flex flex-col gap-2">
            {/* Row 1: Brand on Left, Admin on Right */}
            <div className="flex items-center justify-between gap-3 w-full">
              <Link href="/" className="flex items-center gap-2 group shrink-0">
                <div className="w-9 h-9 rounded-xl bg-white p-1 border-2 border-[#0A66B2]/20 shadow-xs flex items-center justify-center shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo-icon.svg"
                    alt="Nila Clinic Logo"
                    className="w-full h-full object-contain block select-none"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif-classic text-base font-bold tracking-tight text-[#084F8C] dark:text-white whitespace-nowrap">
                      Nila Clinic
                    </span>
                    <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#EBF4FB] text-[#0A66B2] border border-[#0A66B2]/30 whitespace-nowrap">
                      Tablet Suite
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                    Aesthetic Dermatology &amp; Clinical Trichology
                  </p>
                </div>
              </Link>

              <div className="flex items-center gap-1.5">
                <AuthStatusButton />
              </div>
            </div>

            {/* Row 2: Centered Steps Rail */}
            <div className="flex justify-center w-full pt-1.5 border-t border-[#D5E3F0]/70 dark:border-slate-800/70">
              <nav aria-label="Consultation Steps" className="flex items-center gap-1.5 bg-[#EBF4FB]/80 dark:bg-slate-900/80 p-1 rounded-2xl border border-[#D5E3F0] dark:border-slate-800 shadow-xs">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-bold bg-gradient-to-r from-[#0A66B2] to-[#084F8C] text-white shadow-xs whitespace-nowrap">
                  <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black bg-[#8CC43A] text-[#084F8C] shrink-0">
                    1
                  </span>
                  <span>Patient Intake</span>
                </div>
                <span className="text-slate-300 text-xs">/</span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-medium text-slate-400 whitespace-nowrap">
                  <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold bg-white text-slate-400 border border-slate-200 shrink-0">
                    2
                  </span>
                  <span>Clinical Protocol</span>
                </div>
                <span className="text-slate-300 text-xs">/</span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-medium text-slate-400 whitespace-nowrap">
                  <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold bg-white text-slate-400 border border-slate-200 shrink-0">
                    3
                  </span>
                  <span>Concerns &amp; Outcomes</span>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* HERO BANNER SECTION WITH LUXURY CLINIC BACKGROUND & REAL PHOTOGRAPHY BOXES */}
      <main className="flex-1 relative flex flex-col justify-center items-center overflow-hidden min-h-[calc(100vh-110px)] p-4 sm:p-6 lg:p-8">
        {/* Luxury Clinic Architectural Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: "url('/clinic-lounge-bg.jpg')" }}
        />

        {/* Cinematic Sapphire & Emerald Medical Gradient Overlay with Subtle Glass Blur */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#084F8C]/80 via-[#07172A]/85 to-[#07172A]/95 backdrop-blur-[3px]" />
        
        {/* Ambient Brand Lighting Orbs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#8CC43A]/15 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#0A66B2]/25 blur-3xl pointer-events-none rounded-full" />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center my-auto py-2 sm:py-4 animate-fadeIn">
          {/* Consultation Intake Header Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md text-white border border-white/25 mb-6 sm:mb-8 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#8CC43A]" />
            <span>Step 01 / Select Consultation Discipline</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8CC43A]" />
            <span className="text-white/85">Skin &amp; Hair Care</span>
          </div>

          {/* TWO PRIMARY TREATMENT BOXES WITH REAL CLINICAL IMAGERY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-4xl">
            {/* BOX 1: HAIR TREATMENTS WITH REAL TRICHOLOGY PHOTOGRAPHY */}
            <Link
              href="/hair"
              className="group cursor-pointer rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_25px_60px_rgba(10,102,178,0.5)] transition-all duration-300 hover:-translate-y-2 active:scale-[0.99] border-2 border-white/30 hover:border-[#8CC43A] flex flex-col justify-between relative min-h-[400px] sm:min-h-[440px] focus:outline-none focus:ring-4 focus:ring-[#0A66B2]/40"
            >
              {/* Real Background Image with Smooth Hover Zoom */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: "url('/hair-treatment-box.jpg')" }}
              />

              {/* Dynamic Gradient Overlay for Crisp Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-900/20" />
              
              {/* Subtle Blue Brand Accent Glow */}
              <div className="absolute inset-0 bg-[#0A66B2]/20 mix-blend-overlay group-hover:bg-[#0A66B2]/30 transition-colors" />

              {/* Top Header Row with Glassmorphism Badges */}
              <div className="w-full flex items-center justify-between gap-2 p-5 sm:p-6 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-md text-[#084F8C] shadow-sm">
                  <Microscope className="w-3.5 h-3.5 text-[#0A66B2]" />
                  <span>Trichology Clinic</span>
                </span>
                <span className="px-3 py-1.5 rounded-full text-[11px] font-black bg-[#8CC43A] text-[#084F8C] shadow-sm">
                  {hairCount} Treatments
                </span>
              </div>

              {/* Bottom Card Content */}
              <div className="p-6 sm:p-7 relative z-10 w-full flex flex-col justify-end">
                <div className="mb-3">
                  <h2 className="text-2xl sm:text-3xl font-serif-classic font-bold tracking-tight text-white drop-shadow-md group-hover:text-blue-100 transition-colors">
                    Hair Treatments
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-blue-100/90 font-medium tracking-wide">
                    Restoration • Density • Scalp Care
                  </p>
                </div>

                {/* Tactile Action Button */}
                <div className="pt-2">
                  <span className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-white text-[#084F8C] group-hover:bg-[#8CC43A] group-hover:text-[#084F8C] transition-all shadow-md flex items-center justify-center gap-2">
                    <span>Start Hair Consultation</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>

            {/* BOX 2: SKIN TREATMENTS WITH REAL DERMATOLOGY PHOTOGRAPHY */}
            <Link
              href="/skin"
              className="group cursor-pointer rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_25px_60px_rgba(114,169,36,0.5)] transition-all duration-300 hover:-translate-y-2 active:scale-[0.99] border-2 border-white/30 hover:border-white flex flex-col justify-between relative min-h-[400px] sm:min-h-[440px] focus:outline-none focus:ring-4 focus:ring-[#72A924]/40"
            >
              {/* Real Background Image with Smooth Hover Zoom */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: "url('/skin-treatment-box.jpg')" }}
              />

              {/* Dynamic Gradient Overlay for Crisp Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-900/20" />
              
              {/* Subtle Green Brand Accent Glow */}
              <div className="absolute inset-0 bg-[#72A924]/20 mix-blend-overlay group-hover:bg-[#72A924]/30 transition-colors" />

              {/* Top Header Row with Glassmorphism Badges */}
              <div className="w-full flex items-center justify-between gap-2 p-5 sm:p-6 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-md text-[#2E540C] shadow-sm">
                  <Stethoscope className="w-3.5 h-3.5 text-[#72A924]" />
                  <span>Dermatology Clinic</span>
                </span>
                <span className="px-3 py-1.5 rounded-full text-[11px] font-black bg-[#8CC43A] text-[#084F8C] shadow-sm">
                  {skinCount} Treatments
                </span>
              </div>

              {/* Bottom Card Content */}
              <div className="p-6 sm:p-7 relative z-10 w-full flex flex-col justify-end">
                <div className="mb-3">
                  <h2 className="text-2xl sm:text-3xl font-serif-classic font-bold tracking-tight text-white drop-shadow-md group-hover:text-green-100 transition-colors">
                    Skin Treatments
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-green-100/90 font-medium tracking-wide">
                    Rejuvenation • Laser • Aesthetics
                  </p>
                </div>

                {/* Tactile Action Button */}
                <div className="pt-2">
                  <span className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-white text-[#2E540C] group-hover:bg-[#8CC43A] group-hover:text-[#084F8C] transition-all shadow-md flex items-center justify-center gap-2">
                    <span>Start Skin Consultation</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
