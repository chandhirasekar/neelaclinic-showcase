'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  LogOut,
  Stethoscope,
  Users,
  ShieldCheck,
  ChevronDown,
  ArrowUpRight,
  UserCheck
} from 'lucide-react';

export const AuthStatusButton: React.FC = () => {
  const [role, setRole] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cookies = document.cookie.split('; ');
    const roleCookie = cookies.find((c) => c.startsWith('nila_role='));
    const nameCookie = cookies.find((c) => c.startsWith('nila_name='));

    if (roleCookie) setRole(roleCookie.split('=')[1] || '');
    if (nameCookie) {
      const rawName = nameCookie.split('=')[1] || '';
      try {
        let decoded = decodeURIComponent(rawName);
        if (decoded.includes('%20') || decoded.includes('%')) {
          decoded = decodeURIComponent(decoded);
        }
        setName(decoded);
      } catch {
        setName(rawName.replace(/%20/g, ' '));
      }
    }
  }, []);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.warn('Logout error:', e);
    }
    window.location.href = '/login';
  };

  const getRoleIcon = () => {
    if (role === 'doctor') return <Stethoscope className="w-4 h-4 text-[#0A66B2]" />;
    if (role === 'staff') return <Users className="w-4 h-4 text-[#72A924]" />;
    return <ShieldCheck className="w-4 h-4 text-[#0A66B2]" />;
  };

  // Extract clean short title for the pill button
  const getShortDisplayName = () => {
    if (!name) return role ? `Dr. (${role})` : 'Doctor Profile';
    // If name is "Dr. Nila (Attending Dermatologist)", extract "Dr. Nila"
    const cleaned = name.split('(')[0].trim();
    return cleaned || 'Dr. Nila';
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Dropdown Trigger Pill */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border shadow-xs select-none ${
          isOpen
            ? 'bg-[#EBF4FB] text-[#084F8C] border-[#0A66B2]/40 ring-2 ring-[#0A66B2]/20'
            : 'bg-white hover:bg-[#EBF4FB] dark:bg-slate-800 dark:hover:bg-slate-700 text-[#084F8C] dark:text-slate-200 border-[#D5E3F0] dark:border-slate-700 hover:border-[#0A66B2]/40'
        }`}
      >
        <div className="w-5 h-5 rounded-lg bg-sky-50 dark:bg-slate-700 flex items-center justify-center shrink-0">
          {getRoleIcon()}
        </div>
        <span className="font-semibold">{getShortDisplayName()}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#0A66B2]' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu Modal / Panel */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200/90 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 origin-top-right focus:outline-none"
          role="menu"
          aria-orientation="vertical"
        >
          {/* User Profile Summary Header */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 mb-1 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A66B2]/15 to-[#8CC43A]/25 border border-[#0A66B2]/20 flex items-center justify-center text-[#0A66B2] shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {name || 'Dr. Nila (Attending Physician)'}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    {role ? `${role} Active` : 'Tablet Practitioner'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="py-1 flex flex-col gap-1">
            {/* Dropdown Option 1: Admin URL */}
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#EBF4FB] dark:hover:bg-slate-800 group transition-all"
              role="menuitem"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#72A924] flex items-center justify-center border border-emerald-200/60 dark:border-emerald-800/40 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#084F8C]">
                    Doctor Admin Portal
                  </span>
                  <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                    Manage treatments, concerns &amp; leads
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#0A66B2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>

            {/* Dropdown Option 2: Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 group transition-all text-left"
              role="menuitem"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center border border-rose-200/60 dark:border-rose-900/40 group-hover:scale-105 transition-transform">
                  <LogOut className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-rose-600 dark:text-rose-400 group-hover:text-rose-700">
                    Sign Out / Logout
                  </span>
                  <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                    End tablet practitioner session
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
