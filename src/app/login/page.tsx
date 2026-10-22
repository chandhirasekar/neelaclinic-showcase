'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  Stethoscope,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Users
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/';

  const [username, setUsername] = useState('doctor');
  const [password, setPassword] = useState('doctor123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedRole, setSelectedRole] = useState<'doctor' | 'staff' | 'admin'>('doctor');

  const handleRolePreset = (role: 'doctor' | 'staff' | 'admin') => {
    setSelectedRole(role);
    if (role === 'doctor') {
      setUsername('doctor');
      setPassword('doctor123');
    } else if (role === 'staff') {
      setUsername('staff');
      setPassword('staff123');
    } else {
      setUsername('admin');
      setPassword('admin123');
    }
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg('Please enter both username and password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push(from);
        router.refresh();
      } else {
        setErrorMsg(data.error || 'Authentication failed. Please verify your credentials.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error while attempting to log in.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center text-slate-100 p-4 sm:p-6 overflow-hidden font-sans select-none">
      {/* Full-bleed Clinic Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 filter brightness-[0.6] contrast-[1.1] transition-all duration-1000"
        style={{ backgroundImage: "url('/clinic-lounge-bg.jpg')" }}
      />

      {/* Atmospheric Clinical Sapphire & Emerald Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#084F8C]/60 via-[#07172A]/75 to-[#07172A]/90 backdrop-blur-[3px]" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#8CC43A]/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#0A66B2]/30 blur-[140px] rounded-full pointer-events-none" />

      {/* Highlighted Main Login Card Container */}
      <div className="w-full max-w-md relative z-10 my-auto animate-fadeIn">
        {/* Brand Crest & Header */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-20 h-20 rounded-3xl bg-white p-3 border-2 border-white/60 shadow-[0_12px_36px_rgba(0,0,0,0.5)] flex items-center justify-center mb-3 ring-4 ring-[#0A66B2]/40 transition-transform hover:scale-105">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-icon.svg"
              alt="Nila Clinic Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="font-serif-classic text-3xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-md">
            Nila Clinic
          </h1>
          <p className="text-xs font-bold text-[#8CC43A] uppercase tracking-wider mt-1 drop-shadow-sm">
            Tablet Consultation Suite
          </p>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[11px] text-white font-semibold mt-3 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-[#8CC43A]" />
            <span>Authorized Clinic Personnel Only</span>
          </div>
        </div>

        {/* Highlighted Frosted Glass Login Box with 360° Rotating Linear Gradient Border Beam */}
        <div className="relative group">
          {/* Ambient Glowing Aura */}
          {/* <div className="absolute -inset-1.5 rounded-[30px] bg-gradient-to-r from-[#0A66B2] via-[#8CC43A] to-[#00D2FF] opacity-35 blur-xl animate-glow-pulse group-hover:opacity-60 transition-opacity pointer-events-none" /> */}

          {/* Rotating Border Beam Outer Container */}
          <div className="relative p-[2.5px] rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.7),0_0_50px_rgba(10,102,178,0.35)]">
            {/* Primary Sharp Rotating Linear Gradient Beam */}
            <div
              className="absolute -inset-[150%] animate-border-beam pointer-events-none"
              style={{
                background:
                  'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 260deg, #0A66B2 290deg, #00D2FF 315deg, #8CC43A 340deg, #FFE600 360deg)',
              }}
            />

            {/* Glowing Blurred Halo Layer trailing behind the beam */}
            <div
              className="absolute -inset-[150%] animate-border-beam pointer-events-none opacity-80 blur-md"
              style={{
                background:
                  'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 260deg, #0A66B2 290deg, #00D2FF 315deg, #8CC43A 340deg, #FFE600 360deg)',
              }}
            />

            {/* Subtle hairline edge to maintain structural border definition */}
            <div className="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none z-10" />

            {/* Login Card Inner Body */}
            <div className="relative bg-[#0b1b2f]/95 backdrop-blur-2xl rounded-[22px] p-6 sm:p-8 z-20">
              {/* Subtle top edge glow bar */}
              {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0A66B2] via-[#8CC43A] to-[#0A66B2] opacity-80" /> */}

              {/* Role Presets Switcher */}
              <div className="mb-5 relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                    Select Attending Role:
                  </label>
                  <span className="text-[10px] text-[#8CC43A] font-semibold">1-Tap Fast Fill</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleRolePreset('doctor')}
                    className={`py-2 px-2.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-1 border ${selectedRole === 'doctor'
                      ? 'bg-gradient-to-b from-[#0A66B2] to-[#084F8C] text-white border-[#8CC43A] ring-2 ring-[#8CC43A]/40 shadow-lg scale-[1.02]'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700/80 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                  >
                    <Stethoscope className="w-4 h-4 text-[#8CC43A]" />
                    <span>Doctor</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRolePreset('staff')}
                    className={`py-2 px-2.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-1 border ${selectedRole === 'staff'
                      ? 'bg-gradient-to-b from-[#72A924] to-[#5a871b] text-white border-white ring-2 ring-[#8CC43A]/40 shadow-lg scale-[1.02]'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700/80 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                  >
                    <Users className="w-4 h-4 text-white" />
                    <span>Staff</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRolePreset('admin')}
                    className={`py-2 px-2.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-1 border ${selectedRole === 'admin'
                      ? 'bg-gradient-to-b from-purple-700 to-purple-900 text-white border-white ring-2 ring-purple-400/40 shadow-lg scale-[1.02]'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700/80 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-purple-300" />
                    <span>Admin</span>
                  </button>
                </div>
              </div>

              {/* Error Message Alert */}
              {errorMsg && (
                <div className="mb-4 p-3.5 rounded-2xl bg-rose-950/90 border border-rose-500 text-rose-200 text-xs flex items-center gap-2.5 animate-fadeIn shadow-md relative z-10">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="font-medium">{errorMsg}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">
                    Staff ID / Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. doctor or staff"
                      className="w-full pl-10 pr-4 py-3 bg-[#071322]/90 border border-slate-600 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#8CC43A]/50 focus:border-[#8CC43A] transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">
                    Access Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full pl-10 pr-11 py-3 bg-[#071322]/90 border border-slate-600 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#8CC43A]/50 focus:border-[#8CC43A] transition-all shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Highlighted Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#8CC43A] via-[#7cb529] to-[#6da51e] hover:from-[#9be038] hover:to-[#7bb922] text-[#084F8C] text-xs sm:text-sm font-black shadow-xl shadow-[#8CC43A]/25 border border-white/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#084F8C]/30 border-t-[#084F8C] rounded-full animate-spin" />
                        <span>Verifying Practitioner Access...</span>
                      </>
                    ) : (
                      <>
                        <span>Unlock Consultation Suite</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Quick Doctor / Staff notice */}
              <div className="mt-5 pt-4 border-t border-slate-700/80 text-center relative z-10">
                <p className="text-[11px] text-slate-300/80 leading-relaxed">
                  Patients and outside visitors must be attended by a clinic practitioner. New doctors and assistants can be added dynamically in the admin console.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security / Compliance Badge */}
        <div className="mt-5 text-center text-[10px] text-slate-300/90 flex items-center justify-center gap-2 drop-shadow">
          <ShieldCheck className="w-4 h-4 text-[#8CC43A]" />
          <span>Nila Aesthetic Clinic • Clinical Tablet System Protected</span>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#07172A] text-white text-xs">
          Loading Consultation Portal...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
