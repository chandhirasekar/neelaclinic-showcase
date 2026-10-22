'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ClinicalCase } from '@/types';
import {
  Columns,
  SplitSquareVertical,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  UserCheck
} from 'lucide-react';

interface ClassicComparisonViewerProps {
  cases: ClinicalCase[];
  activeCaseIndex: number;
  onSelectCaseIndex: (index: number) => void;
  className?: string;
}

export const ClassicComparisonViewer: React.FC<ClassicComparisonViewerProps> = ({
  cases,
  activeCaseIndex,
  onSelectCaseIndex,
  className = ''
}) => {
  const currentCase = cases[activeCaseIndex] || cases[0];
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    if (width <= 0) return;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  };

  const animateTo = (target: number) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    const start = sliderPosition;
    const startTime = performance.now();
    const duration = 400;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setSliderPosition(start + (target - start) * eased);
      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };
    animFrameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  if (!currentCase) {
    return (
      <div className="p-8 text-center text-stone-500 bg-stone-100 rounded-3xl">
        No clinical photographic cases recorded for this procedure.
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Top Header: Case Selector & View Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#0F2E22] text-[#E8D7BE] border border-[#C5A880]/30">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              <span>Verified Clinical Outcome</span>
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
              Case {activeCaseIndex + 1} of {cases.length}
            </span>
          </div>
          <h3 className="text-lg font-serif-classic font-bold text-stone-900 dark:text-stone-100 mt-1">
            {currentCase.title}
          </h3>
        </div>

        {/* View Mode & Fullscreen */}
        <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800/80 p-1 rounded-2xl border border-stone-200/80 dark:border-stone-700">
          <button
            type="button"
            onClick={() => setViewMode('slider')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'slider'
                ? 'bg-white dark:bg-stone-700 text-[#0F2E22] dark:text-stone-100 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
            title="Interactive Split Slider"
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Slider</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('side-by-side')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'side-by-side'
                ? 'bg-white dark:bg-stone-700 text-[#0F2E22] dark:text-stone-100 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
            title="Side-by-Side Dual View"
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dual View</span>
          </button>
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-xl text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Inspection'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Case Navigation Tabs if multiple cases exist */}
      {cases.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-3 no-scrollbar">
          {cases.map((c, idx) => (
            <button
              key={c.id || idx}
              type="button"
              onClick={() => {
                onSelectCaseIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                activeCaseIndex === idx
                  ? 'bg-[#0F2E22] text-[#E8D7BE] border-[#C5A880] shadow-sm'
                  : 'bg-stone-50 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300 border-stone-200/80 dark:border-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>Case {idx + 1}: {c.timeline}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Photographic Showcase Frame */}
      <div
        className={`relative w-full rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-xl transition-all duration-300 ${
          isFullscreen
            ? 'fixed inset-4 z-50 rounded-2xl shadow-2xl bg-black flex flex-col justify-center'
            : 'aspect-[4/3] sm:aspect-[16/11] max-h-[500px]'
        }`}
      >
        {isFullscreen && (
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-40 px-3 py-1.5 rounded-full bg-stone-900/80 text-white text-xs font-semibold backdrop-blur-md border border-stone-700"
          >
            Close Fullscreen [ESC]
          </button>
        )}

        {viewMode === 'slider' ? (
          /* Interactive Split Slider Mode */
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative w-full h-full select-none cursor-ew-resize overflow-hidden touch-none"
          >
            {/* Background Image: Post-Treatment (AFTER) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentCase.afterImage}
              alt={`${currentCase.title} Post-Treatment Outcome`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            {/* After Tag */}
            <div className="absolute top-3.5 right-3.5 pointer-events-none z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#0F2E22]/85 text-[#8CC43A] backdrop-blur-md border border-[#8CC43A]/40 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#8CC43A] animate-pulse"></span>
                <span>Post-Treatment</span>
              </span>
            </div>

            {/* Foreground Image: Pre-Treatment (BEFORE) clipped */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentCase.beforeImage}
                alt={`${currentCase.title} Pre-Treatment Baseline`}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none max-w-none"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                  height: containerRef.current ? `${containerRef.current.clientHeight}px` : '100%'
                }}
              />
              {/* Before Tag */}
              <div className="absolute top-3.5 left-3.5 pointer-events-none z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-black/75 text-amber-200 backdrop-blur-md border border-amber-300/30 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>Pre-Treatment</span>
                </span>
              </div>
            </div>

            {/* Brass / Gold Divider Line & Drag Handle */}
            <div
              className="absolute top-0 bottom-0 z-20 pointer-events-none flex items-center justify-center -translate-x-1/2"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Hairline */}
              <div className="w-[2.5px] h-full bg-gradient-to-b from-amber-200 via-[#C5A880] to-amber-200 shadow-[0_0_12px_rgba(197,168,128,0.7)]"></div>

              {/* Center Tactile Thumb */}
              <div className="absolute w-10 h-10 rounded-full bg-[#0F2E22] text-[#E8D7BE] border-2 border-[#C5A880] shadow-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <div className="flex items-center gap-0.5">
                  <ChevronLeft className="w-3.5 h-3.5 text-[#C5A880]" />
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Side-by-Side Dual View Mode */
          <div className="w-full h-full grid grid-cols-2 divide-x divide-stone-800">
            {/* Before Frame */}
            <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentCase.beforeImage}
                alt={`${currentCase.title} Pre-Treatment Baseline`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-black/80 text-amber-200 backdrop-blur-md border border-amber-300/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Baseline (Pre)</span>
                </span>
              </div>
            </div>

            {/* After Frame */}
            <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentCase.afterImage}
                alt={`${currentCase.title} Post-Treatment Outcome`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#0F2E22]/90 text-[#8CC43A] backdrop-blur-md border border-[#8CC43A]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8CC43A]"></span>
                  <span>Result (Post)</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slider Fast Jump Controls */}
      {viewMode === 'slider' && (
        <div className="flex items-center justify-between gap-2 mt-3 px-1">
          <button
            type="button"
            onClick={() => animateTo(100)}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
          >
            Show 100% Pre-Treatment
          </button>
          <button
            type="button"
            onClick={() => animateTo(50)}
            className="text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-stone-200/80 hover:bg-stone-300 dark:bg-stone-750 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors"
          >
            50 / 50 Split
          </button>
          <button
            type="button"
            onClick={() => animateTo(0)}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
          >
            Show 100% Post-Treatment
          </button>
        </div>
      )}

      {/* Clinical Metrics & Case Documentation Card */}
      <div className="mt-4 p-5 rounded-3xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/90 dark:border-stone-800 flex flex-col gap-4">
        {/* Patient Profile & Timeline Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs font-medium text-stone-600 dark:text-stone-400">
            <UserCheck className="w-4 h-4 text-[#C5A880]" />
            <span>{currentCase.patientProfile || 'Clinical Patient Review'}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F2E22] dark:text-[#E8D7BE]">
            <Calendar className="w-4 h-4 text-[#C5A880]" />
            <span>Timeline: {currentCase.timeline}</span>
          </div>
        </div>

        {/* 4 Quantitative Clinical Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {currentCase.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700 text-center"
            >
              <span className="block text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                {m.label}
              </span>
              <span className="block text-base sm:text-lg font-bold text-[#0F2E22] dark:text-[#E8D7BE] mt-0.5">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Doctor Case Verdict / Observation */}
        {currentCase.doctorNote && (
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8CC43A]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                Doctor's Clinical Observation
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 font-serif-classic italic leading-relaxed">
              "{currentCase.doctorNote}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
