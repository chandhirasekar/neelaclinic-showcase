'use client';

import React, { useState, useEffect } from 'react';
import { Treatment, ConsultationNote } from '@/types';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { TreatmentsManager } from '@/components/admin/TreatmentsManager';
import { ConcernsManager } from '@/components/admin/ConcernsManager';
import { ConsultationsManager } from '@/components/admin/ConsultationsManager';
import { SettingsManager } from '@/components/admin/SettingsManager';
import { UsersManager } from '@/components/admin/UsersManager';
import { Layers, Sparkles, Activity, Users, UserCheck } from 'lucide-react';
import { ClinicalLoader } from '@/components/ClinicalLoader';

export default function AdminPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [consultations, setConsultations] = useState<ConsultationNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [mongoConnected, setMongoConnected] = useState(false);
  const [activeTab, setActiveTab] = useState<'treatments' | 'concerns' | 'consultations' | 'settings' | 'users'>('treatments');
  const [selectedTreatmentForConcerns, setSelectedTreatmentForConcerns] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tRes, cRes] = await Promise.all([
        fetch('/api/treatments'),
        fetch('/api/consultations')
      ]);
      const tData = await tRes.json();
      const cData = await cRes.json();

      if (tData.success) {
        setTreatments(tData.data || []);
        setMongoConnected(Boolean(tData.mongoConnected));
        if (tData.data?.length > 0 && !selectedTreatmentForConcerns) {
          setSelectedTreatmentForConcerns(tData.data[0].id);
        }
      }
      if (cData.success) {
        setConsultations(cData.data || []);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const skinTreatments = treatments.filter(t => t.category === 'skin');
  const hairTreatments = treatments.filter(t => t.category === 'hair');
  const totalConcerns = treatments.reduce((acc, t) => acc + (t.concerns?.length || 0), 0);

  return (
    <div className="min-h-screen bg-[#F3F8FC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <AdminHeader mongoConnected={mongoConnected} />

      {statusMessage && (
        <div className={`py-2 px-4 text-center text-xs font-bold text-white transition-all ${statusMessage.type === 'error' ? 'bg-rose-600' : 'bg-emerald-600'
          }`}>
          {statusMessage.text}
        </div>
      )}

      {loading ? (
        <div className="flex-1 flex items-center justify-center py-20">
          <ClinicalLoader
            message="Connecting to Nila Clinic Database..."
            submessage="Loading live treatments and consultation records from MongoDB Atlas"
          />
        </div>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
          {/* Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Skin Treatments</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{skinTreatments.length}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-[#0A66B2] flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hair Treatments</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{hairTreatments.length}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-[#3F7A12] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Concerns</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalConcerns}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Leads</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{consultations.length}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab('treatments')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${activeTab === 'treatments'
                    ? 'bg-[#0A66B2] text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                  }`}
              >
                Treatments List ({treatments.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('concerns')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${activeTab === 'concerns'
                    ? 'bg-[#0A66B2] text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                  }`}
              >
                Concerns & Photos ({totalConcerns})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('consultations')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${activeTab === 'consultations'
                    ? 'bg-[#0A66B2] text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                  }`}
              >
                Tablet Consultations ({consultations.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${activeTab === 'users'
                    ? 'bg-[#0A66B2] text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                  }`}
              >
                Staff &amp; Access
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'settings'
                    ? 'bg-[#0A66B2] text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                Database &amp; Settings
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'treatments' && (
            <TreatmentsManager
              treatments={treatments}
              onRefresh={fetchData}
              onSelectTreatmentForConcerns={(id) => {
                setSelectedTreatmentForConcerns(id);
                setActiveTab('concerns');
              }}
              onShowStatus={showStatus}
            />
          )}

          {activeTab === 'concerns' && (
            <ConcernsManager
              treatments={treatments}
              selectedTreatmentId={selectedTreatmentForConcerns}
              onSelectTreatmentId={setSelectedTreatmentForConcerns}
              onRefresh={fetchData}
              onShowStatus={showStatus}
            />
          )}

          {activeTab === 'consultations' && (
            <ConsultationsManager
              consultations={consultations}
              onRefresh={fetchData}
              onShowStatus={showStatus}
            />
          )}

          {activeTab === 'users' && (
            <UsersManager onShowStatus={showStatus} />
          )}

          {activeTab === 'settings' && (
            <SettingsManager
              mongoConnected={mongoConnected}
              onRefresh={fetchData}
              onShowStatus={showStatus}
            />
          )}
        </main>
      )}
    </div>
  );
}
