'use client';

import React from 'react';
import { Database, RotateCcw } from 'lucide-react';

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
  const handleReset = async () => {
    if (!confirm('This will reset all treatments and concerns to the official Doctor BRD specification (22 treatments, 75 concerns). Proceed?')) return;
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        onShowStatus('Official BRD data restored successfully!');
        onRefresh();
      } else {
        onShowStatus(data.error || 'Failed to restore', 'error');
      }
    } catch (err: any) {
      onShowStatus(err.message, 'error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              MongoDB & Mongoose Database Connection
            </h3>
            <p className="text-xs text-slate-500">
              Status: {mongoConnected ? 'Connected via Mongoose' : 'Running on Auto-Persisted Local Storage Engine'}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2">
          <p className="font-bold">To connect your live MongoDB Cluster in the future:</p>
          <ol className="list-decimal list-inside space-y-1.5 pl-1">
            <li>Create or open <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono">.env.local</code> in this project root.</li>
            <li>Add your connection string:
              <pre className="mt-1 p-2 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto">
                MONGODB_URI=mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.mongodb.net/neelaclinic?retryWrites=true&amp;w=majority
              </pre>
            </li>
            <li>Restart dev server. Mongoose will automatically connect and synchronize all treatments!</li>
          </ol>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
          Official BRD Data Integrity Check
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Complies with Nila Clinic BRD v1.1: Double Chin Reduction removed (FR-21), LHR Therapy under Skin (FR-22), OLT under Hair (FR-23), and Acne/Scar Doctor Guide (FR-24).
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0A66B2] hover:bg-[#084F8C] text-white shadow-md flex items-center gap-2 active:scale-95 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Re-Seed Official BRD Data (22 Treatments, 75 Concerns)</span>
        </button>
      </div>
    </div>
  );
};
