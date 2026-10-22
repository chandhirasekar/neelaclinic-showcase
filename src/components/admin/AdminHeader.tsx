'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Database, ArrowLeft, LogOut, ShieldCheck, Stethoscope, User } from 'lucide-react';

interface AdminHeaderProps {
  mongoConnected: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ mongoConnected }) => {
  const [userName, setUserName] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    // Read user role and name from client-side cookies if present
    const cookies = document.cookie.split('; ');
    const nameCookie = cookies.find((c) => c.startsWith('nila_name='));
    const roleCookie = cookies.find((c) => c.startsWith('nila_role='));

    if (nameCookie) {
      setUserName(decodeURIComponent(nameCookie.split('=')[1] || ''));
    }
    if (roleCookie) {
      setUserRole(roleCookie.split('=')[1] || '');
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.warn('Logout error:', e);
    }
    window.location.href = '/login';
  };

  return (
    <header className="bg-gradient-to-r from-[#0A66B2] via-[#095ca0] to-[#084F8C] text-white shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white p-1.5 shadow flex items-center justify-center overflow-hidden border border-white/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-icon.svg" alt="Nila Clinic Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight">Nila Clinic</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-[#D9F2AD]">
                  Admin Portal
                </span>
                {userRole && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                    <User className="w-2.5 h-2.5" />
                    <span>{userRole}</span>
                  </span>
                )}
              </div>
              <span className="text-xs text-[#D9F2AD] font-semibold tracking-wider">
                Showcase CMS &amp; Tablet Management {userName ? `• ${userName}` : ''}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-xs font-semibold backdrop-blur-sm border border-white/20">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>{mongoConnected ? 'MongoDB Live' : 'Local Storage Engine'}</span>
              <span className={`w-2 h-2 rounded-full ${mongoConnected ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
            </div> */}

            <Link
              href="/"
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-[#0A66B2] shadow hover:bg-blue-50 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Showcase View</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-white/15 hover:bg-rose-600 hover:text-white text-white border border-white/25 transition-all flex items-center gap-1.5 active:scale-95"
              title="End practitioner session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
