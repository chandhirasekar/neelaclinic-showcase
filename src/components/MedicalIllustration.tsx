import React, { useState } from 'react';

interface MedicalIllustrationProps {
  category: 'skin' | 'hair';
  isAfter: boolean;
  className?: string;
  concernName?: string;
}

export const MedicalIllustration: React.FC<MedicalIllustrationProps> = ({
  category,
  isAfter,
  className = '',
  concernName = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const isHair = category === 'hair';

  // High-resolution real clinical photography
  const photoSrc = isHair
    ? isAfter
      ? '/photos/hair-loss-after.jpg'
      : '/photos/hair-loss-before.jpg'
    : isAfter
    ? '/photos/skin-acne-after.jpg'
    : '/photos/skin-acne-before.jpg';

  // If real photo loads cleanly, render authentic clinical documentation
  if (!imgError) {
    return (
      <div className={`relative w-full h-full select-none overflow-hidden bg-slate-950 flex items-center justify-center ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt={`Clinical result for ${concernName || category} ${isAfter ? 'after' : 'before'} treatment`}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/60 backdrop-blur-md px-3 py-1 rounded-full pointer-events-none">
          <span className="text-[11px] font-semibold text-slate-200 tracking-wide flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isAfter ? 'bg-[#8CC43A]' : 'bg-sky-400'}`}></span>
            {isAfter ? 'Clinical Result (Post-Treatment)' : 'Clinical Baseline (Pre-Treatment)'}
          </span>
        </div>
      </div>
    );
  }

  // Fallback: Clean medical silhouette strictly based on prototype BRD art (no cartoon emoji faces)
  const sk = isAfter ? '#c98f68' : '#bd835d';
  const hr = isHair && !isAfter;
  const bg = isAfter ? '#e6f3d6' : '#d8e7f5';

  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-slate-900 flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full object-cover"
        role="img"
        aria-label={`Clinical illustration ${isAfter ? 'after' : 'before'}`}
      >
        <rect width="400" height="300" fill={bg} />
        <path d="M50 300 Q70 232 200 224 Q330 232 350 300 Z" fill="#0a66b2" />
        <rect x="172" y="180" width="56" height="60" rx="14" fill={sk} />
        <ellipse cx="127" cy="140" rx="9" ry="18" fill={sk} />
        <ellipse cx="273" cy="140" rx="9" ry="18" fill={sk} />
        <ellipse cx="200" cy="135" rx="72" ry="88" fill={sk} />

        {/* Hair shape */}
        <path
          fill="#1c1411"
          d={
            hr
              ? 'M129 118 Q126 74 166 54 Q200 44 234 54 Q274 74 271 118 Q262 82 244 80 Q226 70 200 84 Q174 70 156 80 Q138 82 129 118 Z'
              : 'M126 124 Q112 40 200 34 Q288 40 274 124 Q266 76 200 70 Q134 76 126 124 Z'
          }
        />
        {hr && (
          <path
            d="M168 78l4 10M186 72l2 12M214 72l-2 12M232 78l-4 10M200 86v10"
            stroke="#1c1411"
            strokeWidth="1.5"
            opacity="0.5"
          />
        )}

        {/* Clean facial features matching prototype */}
        <g fill="#fff">
          <ellipse cx="172" cy="130" rx="10" ry="5" />
          <ellipse cx="228" cy="130" rx="10" ry="5" />
        </g>
        <g fill="#2a1a12">
          <circle cx="172" cy="130" r="3.5" />
          <circle cx="228" cy="130" r="3.5" />
        </g>
        <path d="M158 116q14-6 28 0M214 116q14-6 28 0M200 138q-6 18-3 25q3 3 6 0" stroke="#1c1411" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M182 186q18 10 36 0" stroke="#8E433E" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Skin texture conditions */}
        {!isHair && (
          isAfter ? (
            <g fill="#fff" opacity="0.25">
              <ellipse cx="160" cy="152" rx="18" ry="10" />
              <ellipse cx="242" cy="152" rx="18" ry="10" />
              <ellipse cx="200" cy="82" rx="26" ry="8" />
            </g>
          ) : (
            <g>
              <ellipse cx="156" cy="158" rx="16" ry="12" fill="#7d4a33" opacity="0.4" />
              <ellipse cx="246" cy="160" rx="18" ry="12" fill="#7d4a33" opacity="0.4" />
              <circle cx="160" cy="170" r="6" fill="#e7a29a" opacity="0.6" />
              <circle cx="160" cy="170" r="3" fill="#a8423a" opacity="0.85" />
              <circle cx="240" cy="172" r="7" fill="#e7a29a" opacity="0.6" />
              <circle cx="240" cy="172" r="3.5" fill="#a8423a" opacity="0.85" />
              <circle cx="218" cy="100" r="3" fill="#a8423a" opacity="0.85" />
            </g>
          )
        )}
      </svg>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/60 px-3 py-1 rounded-full pointer-events-none">
        <span className="text-[11px] text-slate-300">
          Illustration – replace with real clinic photo
        </span>
      </div>
    </div>
  );
};
