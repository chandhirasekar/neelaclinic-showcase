'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ConcernItem, CategoryType } from '@/types';
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
  ShieldCheck
} from 'lucide-react';

interface ConcernComparisonViewerProps {
  category: CategoryType;
  treatmentName: string;
  concern: ConcernItem;
  className?: string;
}

export function getPhotosForConcern(category: CategoryType, treatmentId: string, concernName: string): { before: string; after: string } {
  const isHair = category === 'hair';
  const cName = concernName.toLowerCase();
  const tId = treatmentId.toLowerCase();

  if (isHair) {
    if (tId.includes('transplant') || cName.includes('hairline') || cName.includes('temple')) {
      return {
        before: '/photos/hair-transplant-before.jpg',
        after: '/photos/hair-transplant-after.jpg'
      };
    }
    if (tId.includes('gfc') || cName.includes('thickness') || cName.includes('crown') || cName.includes('reduces hair fall')) {
      return {
        before: '/photos/hair-gfc-before.jpg',
        after: '/photos/hair-gfc-after.jpg'
      };
    }
    return {
      before: '/photos/hair-loss-before.jpg',
      after: '/photos/hair-loss-after.jpg'
    };
  }

  // Skin photos
  return {
    before: '/photos/skin-acne-before.jpg',
    after: '/photos/skin-acne-after.jpg'
  };
}

export const ConcernComparisonViewer: React.FC<ConcernComparisonViewerProps> = ({
  category,
  treatmentName,
  concern,
  className = ''
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  const photos = getPhotosForConcern(category, treatmentName, concern.name);
  const beforeImg = concern.beforeImage || photos.before;
  const afterImg = concern.afterImage || photos.after;

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
    const duration = 350;

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
    // Reset to 50% whenever active concern changes
    setSliderPosition(50);
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [concern.id, concern.name]);

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Top Header: Active Concern Title & View Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#0F2E22] text-[#E8D7BE] border border-[#C5A880]/40">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              <span>Clinical Outcome</span>
            </span>
            <span className="text-xs text-stone-500 font-medium">
              Recommended for: <strong className="text-stone-900 dark:text-stone-100">{concern.name}</strong>
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-serif-classic font-bold text-stone-900 dark:text-stone-100 mt-1">
            {treatmentName} — {concern.name}
          </h3>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl border border-stone-200 dark:border-stone-700">
          <button
            type="button"
            onClick={() => setViewMode('slider')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'slider'
                ? 'bg-white dark:bg-stone-700 text-[#0F2E22] dark:text-stone-100 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span>Split Slider</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('side-by-side')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'side-by-side'
                ? 'bg-white dark:bg-stone-700 text-[#0F2E22] dark:text-stone-100 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Dual View</span>
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

      {/* Main Photographic Comparison Frame */}
      <div
        className={`relative w-full rounded-3xl overflow-hidden bg-stone-950 border border-stone-800 shadow-xl transition-all ${
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
          /* Interactive Split Slider */
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative w-full h-full select-none cursor-ew-resize overflow-hidden touch-none"
          >
            {/* Background: AFTER */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={afterImg}
              alt={`${concern.name} post-treatment result`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            {/* After Tag */}
            <div className="absolute top-3.5 right-3.5 pointer-events-none z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#0F2E22]/90 text-[#8CC43A] backdrop-blur-md border border-[#8CC43A]/40 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#8CC43A] animate-pulse"></span>
                <span>Post-Treatment</span>
              </span>
            </div>

            {/* Foreground: BEFORE */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={beforeImg}
                alt={`${concern.name} pre-treatment baseline`}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none max-w-none"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                  height: containerRef.current ? `${containerRef.current.clientHeight}px` : '100%'
                }}
              />
              {/* Before Tag */}
              <div className="absolute top-3.5 left-3.5 pointer-events-none z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-black/80 text-amber-200 backdrop-blur-md border border-amber-300/30 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>Pre-Treatment</span>
                </span>
              </div>
            </div>

            {/* Brass / Gold Hairline Divider & Thumb */}
            <div
              className="absolute top-0 bottom-0 z-20 pointer-events-none flex items-center justify-center -translate-x-1/2"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-[2.5px] h-full bg-gradient-to-b from-amber-200 via-[#C5A880] to-amber-200 shadow-[0_0_12px_rgba(197,168,128,0.7)]"></div>
              <div className="absolute w-10 h-10 rounded-full bg-[#0F2E22] text-[#E8D7BE] border-2 border-[#C5A880] shadow-2xl flex items-center justify-center">
                <div className="flex items-center gap-0.5">
                  <ChevronLeft className="w-3.5 h-3.5 text-[#C5A880]" />
                  <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Side-by-Side Dual View */
          <div className="w-full h-full grid grid-cols-2 divide-x divide-stone-800">
            {/* Before */}
            <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={beforeImg}
                alt={`${concern.name} before`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-black/80 text-amber-200 backdrop-blur-md border border-amber-300/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Baseline (Pre)</span>
                </span>
              </div>
            </div>
            {/* After */}
            <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={afterImg}
                alt={`${concern.name} after`}
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

      {/* Slider Fast Jump Buttons */}
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
            50 / 50 Balanced View
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

      {/* Clinical Notes Card */}
      <div className="mt-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-2 mb-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#8CC43A]" />
          <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
            Clinical Documentation Note
          </span>
        </div>
        <p className="text-xs text-stone-600 dark:text-stone-400 font-serif-classic italic leading-relaxed">
          "Documented clinical photographic evaluation for {treatmentName} addressing {concern.name}. Individual biological response varies; clinical results achieved through customized doctor-planned protocol."
        </p>
      </div>
    </div>
  );
};
