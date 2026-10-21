'use client';

import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full bg-[#EBF3FA] dark:bg-slate-900 border-b border-[#D5E3F0] dark:border-slate-800 py-2.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        <Link
          href="/"
          className="hover:text-[#0A66B2] dark:hover:text-blue-400 transition-colors font-medium text-slate-700 dark:text-slate-300"
        >
          Home
        </Link>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <span className="text-slate-400 select-none">/</span>
              {isLast ? (
                <span className="font-bold text-[#0A66B2] dark:text-blue-400 truncate max-w-[280px] sm:max-w-none">
                  {item.label}
                </span>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="hover:text-[#0A66B2] dark:hover:text-blue-400 transition-colors font-medium text-slate-700 dark:text-slate-300 text-left"
                >
                  {item.label}
                </button>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-[#0A66B2] dark:hover:text-blue-400 transition-colors font-medium text-slate-700 dark:text-slate-300"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {item.label}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
