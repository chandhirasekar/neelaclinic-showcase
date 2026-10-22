'use client';

import React, { useState, useEffect } from 'react';
import { Database, RotateCcw, Save, Server, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ClinicSettings } from '@/types';

interface SettingsManagerProps {
  mongoConnected: boolean;
  onRefresh: () => void;
  onShowStatus: (msg: string, type?: 'success' | 'error') => void;
}

export const SettingsManager: React.FC<SettingsManagerProps> = ({
  mongoConnected,
  onRefresh,
  onShowStatus,
}) => {
  const [settings, setSettings] = useState<ClinicSettings>({
    name: 'Nila Clinic',
    tagline: 'Skin & Hair Care',
    disclaimer: 'Results vary from person to person. Every person’s skin and hair is different, so your doctor will plan your treatment and timeline after a consultation.',
    phone: '+91 81222 64556'
  });
  const [stats, setStats] = useState<{
    treatmentsCount: number;
    consultationsCount: number;
    hasSettings: boolean;
    connected: boolean;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  const fetchSettingsAndStats = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success) {
        if (data.data) setSettings(data.data);
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.warn('Failed to fetch settings/stats:', err);
    }
  };

  useEffect(() => {
    fetchSettingsAndStats();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        onShowStatus('Clinic settings updated in MongoDB!');
        fetchSettingsAndStats();
      } else {
        onShowStatus(data.error || 'Failed to update settings', 'error');
      }
    } catch (err: any) {
      onShowStatus(err.message || 'Error saving settings', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('This will seed all collections (Treatments, Consultations, and Settings) with rich clinical data into MongoDB. Proceed?')) return;
    setIsSeeding(true);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        onShowStatus('All Mongoose collections seeded successfully!');
        onRefresh();
        fetchSettingsAndStats();
      } else {
        onShowStatus(data.error || 'Failed to seed collections', 'error');
      }
    } catch (err: any) {
      onShowStatus(err.message, 'error');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Database Connection & Live Collections Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl ${mongoConnected ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600' : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600'} flex items-center justify-center`}>
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                MongoDB Atlas &amp; Mongoose Live Status
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  mongoConnected ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}>
                  {mongoConnected ? 'Connected & Active' : 'Local Fallback'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Target Database: <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-bold text-slate-700 dark:text-slate-300">Neelaclinic</code>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={fetchSettingsAndStats}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Refresh Metrics
          </button>
        </div>

        {/* Live Mongoose Collections Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wider">
                treatments
              </span>
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {stats?.treatmentsCount ?? '--'}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Clinical protocols with variants &amp; cases
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                consultations
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {stats?.consultationsCount ?? '--'}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Doctor notes recorded from tablet intake
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                clinicsettings
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {stats?.hasSettings ? 'Synchronized' : 'Pending'}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Brand profile, helpline &amp; disclaimer
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Clinic Settings Form */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Dynamic Clinic Profile &amp; Settings
            </h3>
            <p className="text-xs text-slate-500">
              Changes saved here update the database collection and sync across all patient tablets dynamically.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Clinic Brand Name
              </label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-[#0A66B2] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Clinic Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-[#0A66B2] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Doctor Helpline / Phone
            </label>
            <input
              type="text"
              value={settings.phone || ''}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-[#0A66B2] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Medical Disclaimer Note
            </label>
            <textarea
              rows={3}
              value={settings.disclaimer}
              onChange={(e) => setSettings({ ...settings, disclaimer: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-[#0A66B2] focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0A66B2] hover:bg-[#084F8C] text-white shadow-md flex items-center gap-2 active:scale-95 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving to Database...' : 'Save Dynamic Settings'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Re-seed Collections Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
          Mongoose Collections Provisioning &amp; Re-Seed
        </h3>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Seeds all 3 MongoDB collections (<code>treatments</code>, <code>consultations</code>, and <code>clinicsettings</code>) with full BRD clinical specifications, variants, before/after cases, and patient consultation records.
        </p>
        <button
          type="button"
          disabled={isSeeding}
          onClick={handleReset}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 shadow-md flex items-center gap-2 active:scale-95 transition-all disabled:opacity-50"
        >
          <RotateCcw className={`w-4 h-4 ${isSeeding ? 'animate-spin' : ''}`} />
          <span>{isSeeding ? 'Seeding MongoDB Atlas Collections...' : 'Re-Seed All Collections to Mongoose (22 Treatments, 4 Leads, Settings)'}</span>
        </button>
      </div>
    </div>
  );
};
