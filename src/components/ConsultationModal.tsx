'use client';

import React, { useState } from 'react';
import { X, CheckCircle, ClipboardList, Send } from 'lucide-react';
import { CategoryType } from '@/types';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: CategoryType;
  treatmentName: string;
  concernName: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  category,
  treatmentName,
  concernName,
}) => {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setError('Please enter patient name');
      return;
    }
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName,
          patientPhone,
          category,
          treatmentName,
          concernName,
          doctorNotes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setPatientName('');
          setPatientPhone('');
          setDoctorNotes('');
          onClose();
        }, 1500);
      } else {
        setError(data.error || 'Failed to save note');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#0A66B2] flex items-center justify-center">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Doctor Consultation Pad
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Save patient interest & treatment notes on tablet
            </p>
          </div>
        </div>

        {isSuccess ? (
          <div className="py-10 text-center flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400 animate-fadeIn">
            <CheckCircle className="w-14 h-14 mb-3 animate-bounce" />
            <p className="text-base font-bold">Consultation Note Recorded!</p>
            <p className="text-xs text-slate-500 mt-1">Saved to clinic database.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Treatment context card */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 text-xs">
              <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 mb-1">
                <span>Demonstrating:</span>
                <span className="uppercase font-semibold tracking-wider text-[#0A66B2] dark:text-blue-400">
                  {category} care
                </span>
              </div>
              <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                {treatmentName}
              </p>
              <p className="text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                Target concern: {concernName}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Patient Full Name *
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Ananya Sharma"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A66B2]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Phone / WhatsApp Number (Optional)
              </label>
              <input
                type="tel"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A66B2]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Doctor Clinical Notes & Observations
              </label>
              <textarea
                value={doctorNotes}
                onChange={(e) => setDoctorNotes(e.target.value)}
                rows={3}
                placeholder="Doctor observations, skin type, recommended care regimen..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A66B2]"
              />
            </div>

            {error && (
              <p className="text-xs text-rose-500 font-medium bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-xl border border-rose-200/50">
                {error}
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#8CC43A] hover:bg-[#72A924] text-slate-950 font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                {isSubmitting ? 'Saving...' : 'Save Consultation Note'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
