'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MedicalIllustration } from './MedicalIllustration';
import { Maximize2, Minimize2, Columns, SplitSquareVertical, ZoomIn, ZoomOut } from 'lucide-react';

interface ComparisonSliderProps {
  category: 'skin' | 'hair';
  concernName: string;
  beforeImage?: string;
  afterImage?: string;
  useIllustration?: boolean;
  className?: string;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  category,
  concernName,
  beforeImage,
  afterImage,
  useIllustration = true,
  className = ''
}) => {
  // Slider position: 100 = completely shows Before, 0 = completely shows After
  // BRD FR-06: The comparison page opens by showing the Before image (so slider = 100)
  const [position, setPosition] = useState<number>(100);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    if (width === 0) return;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setPosition(percentage);
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
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    const start = position;
    const startTime = performance.now();
    const duration = 500;

    const step = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;
      setPosition(current);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      }
    };

    animationFrameRef.current = requestAnimationFrame(step);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setPosition(prev => Math.min(100, prev + 5));
    } else if (e.key === 'ArrowRight') {
      setPosition(prev => Math.max(0, prev - 5));
    } else if (e.key === 'Home') {
      setPosition(100);
    } else if (e.key === 'End') {
      setPosition(0);
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const renderImageOrIllustration = (isAfter: boolean) => {
    const customImage = isAfter ? afterImage : beforeImage;
    if (customImage) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={customImage}
          alt={`${concernName} ${isAfter ? 'after' : 'before'} treatment`}
          className="w-full h-full object-cover"
        />
      );
    }

    if (useIllustration) {
      return (
        <MedicalIllustration
          category={category}
          isAfter={isAfter}
          concernName={concernName}
        />
      );
    }

    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 p-6 text-center">
        <p className="text-sm font-semibold">Photos coming soon</p>
        <p className="text-xs text-slate-400 mt-1">Clinical documentation in progress</p>
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col select-none transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-slate-950 p-4 md:p-8 flex items-center justify-center'
          : className
      }`}
    >
      {/* Tablet Control Bar */}
      <div className="flex items-center justify-between pb-3 px-1 gap-2">
        <div className="flex items-center gap-2">
          {/* Mode Switch: Slider vs Side-by-Side */}
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 border border-slate-200 dark:border-slate-700/60 shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode('slider')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'slider'
                  ? 'bg-white dark:bg-slate-700 text-[#0A66B2] dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <SplitSquareVertical className="w-3.5 h-3.5" />
              <span>Interactive Slider</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'side-by-side'
                  ? 'bg-white dark:bg-slate-700 text-[#0A66B2] dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Side-by-Side</span>
            </button>
          </div>

          {/* Animated sweep buttons (FR-07) */}
          {viewMode === 'slider' && (
            <div className="hidden sm:inline-flex items-center gap-1.5 ml-1">
              <button
                type="button"
                onClick={() => animateTo(100)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-blue-50 dark:bg-blue-950/40 text-[#0A66B2] dark:text-blue-300 border border-blue-200/60 hover:bg-blue-100 transition-colors active:scale-95"
              >
                Show Before
              </button>
              <button
                type="button"
                onClick={() => animateTo(0)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-[#3F7A12] dark:text-emerald-300 border border-emerald-200/60 hover:bg-emerald-100 transition-colors active:scale-95"
              >
                Show After
              </button>
            </div>
          )}
        </div>

        {/* Doctor Consultation Controls (Zoom & Fullscreen) */}
        <div className="flex items-center gap-1.5">
          {viewMode === 'slider' && (
            <button
              type="button"
              onClick={() => setZoomLevel(zoomLevel === 1 ? 1.4 : 1)}
              title="Doctor Clinical Zoom"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
            >
              {zoomLevel === 1 ? <ZoomIn className="w-4 h-4" /> : <ZoomOut className="w-4 h-4 text-[#0A66B2]" />}
            </button>
          )}

          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Tablet Patient Presentation Mode'}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Comparison Canvas */}
      <div
        className={`relative w-full overflow-hidden rounded-2xl md:rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-xl transition-transform ${
          isFullscreen ? 'max-w-4xl max-h-[80vh] aspect-[4/3]' : 'aspect-[4/3] w-full'
        }`}
        style={{
          transform: zoomLevel > 1 ? `scale(${zoomLevel})` : undefined,
          transformOrigin: 'center center',
          transition: 'transform 0.25s ease-out'
        }}
      >
        {viewMode === 'slider' ? (
          <div
            ref={containerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative w-full h-full cursor-ew-resize touch-none outline-none group"
            aria-label="Comparison slider. Use left and right arrow keys to compare before and after."
          >
            {/* AFTER Layer (Base layer beneath) */}
            <div className="absolute inset-0 w-full h-full">
              {renderImageOrIllustration(true)}
            </div>

            {/* BEFORE Layer (Clipped layer on top) */}
            <div
              className="absolute inset-0 h-full overflow-hidden will-change-[width]"
              style={{ width: `${position}%` }}
            >
              <div
                className="relative h-full"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                  minWidth: '100%'
                }}
              >
                {renderImageOrIllustration(false)}
              </div>
            </div>

            {/* Draggable Divider Handle Line */}
            <div
              className="absolute top-0 bottom-0 z-20 pointer-events-none flex flex-col items-center"
              style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-1 h-full bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)]"></div>

              <div className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#8CC43A] hover:bg-[#72A924] border-2 border-white shadow-lg flex items-center justify-center text-white cursor-ew-resize transition-transform group-hover:scale-110 active:scale-95 pointer-events-auto">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                  <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
                </svg>
              </div>
            </div>

            {/* Clear Badges (FR-08) */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-slate-900/85 text-white backdrop-blur-md shadow-md border border-white/20">
                Before
              </span>
            </div>
            <div className="absolute top-4 right-4 z-10 pointer-events-none">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#3F7A12]/90 text-white backdrop-blur-md shadow-md border border-white/20">
                After
              </span>
            </div>
          </div>
        ) : (
          /* Side-by-Side Presentation View */
          <div className="grid grid-cols-2 w-full h-full divide-x-2 divide-slate-300 dark:divide-slate-700">
            <div className="relative w-full h-full overflow-hidden">
              {renderImageOrIllustration(false)}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-slate-900/85 text-white backdrop-blur-md shadow-md">
                  Before
                </span>
              </div>
            </div>
            <div className="relative w-full h-full overflow-hidden">
              {renderImageOrIllustration(true)}
              <div className="absolute top-3 right-3 z-10">
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#3F7A12]/90 text-white backdrop-blur-md shadow-md">
                  After
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tablet Sweep Buttons below for touch accessibility */}
      {viewMode === 'slider' && (
        <div className="flex sm:hidden items-center justify-center gap-3 pt-3">
          <button
            type="button"
            onClick={() => animateTo(100)}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-[#0A66B2] border border-blue-200 active:scale-95"
          >
            Show Before
          </button>
          <button
            type="button"
            onClick={() => animateTo(0)}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-[#3F7A12] border border-emerald-200 active:scale-95"
          >
            Show After
          </button>
        </div>
      )}
    </div>
  );
};
