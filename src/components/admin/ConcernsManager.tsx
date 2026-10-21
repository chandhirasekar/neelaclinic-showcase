'use client';

import React, { useState } from 'react';
import { Treatment, ConcernItem } from '@/types';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';

interface ConcernsManagerProps {
  treatments: Treatment[];
  selectedTreatmentId: string;
  onSelectTreatmentId: (id: string) => void;
  onRefresh: () => void;
  onShowStatus: (msg: string, type?: 'success' | 'error') => void;
}

export const ConcernsManager: React.FC<ConcernsManagerProps> = ({
  treatments,
  selectedTreatmentId,
  onSelectTreatmentId,
  onRefresh,
  onShowStatus,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConcern, setEditingConcern] = useState<ConcernItem | null>(null);

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [beforeImage, setBeforeImage] = useState('');
  const [afterImage, setAfterImage] = useState('');
  const [useIllustration, setUseIllustration] = useState(true);
  const [recTreatments, setRecTreatments] = useState('');

  const activeTreatment = treatments.find(t => t.id === selectedTreatmentId) || treatments[0];

  const handleOpenModal = (c?: ConcernItem) => {
    if (c) {
      setEditingConcern(c);
      setId(c.id);
      setName(c.name);
      setBeforeImage(c.beforeImage || '');
      setAfterImage(c.afterImage || '');
      setUseIllustration(c.useIllustration !== false);
      setRecTreatments((c.recommendedTreatments || []).join(', '));
    } else {
      setEditingConcern(null);
      setId(`concern-${Date.now()}`);
      setName('');
      setBeforeImage('');
      setAfterImage('');
      setUseIllustration(true);
      setRecTreatments('');
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !activeTreatment) return;

    const recList = recTreatments
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const payload: ConcernItem = {
      id: id || `concern-${Date.now()}`,
      name: name.trim(),
      beforeImage: beforeImage.trim() || undefined,
      afterImage: afterImage.trim() || undefined,
      useIllustration,
      recommendedTreatments: recList.length > 0 ? recList : undefined,
    };

    try {
      const res = await fetch('/api/concerns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          treatmentId: activeTreatment.id,
          concern: payload,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onShowStatus('Concern saved successfully!');
        setIsModalOpen(false);
        onRefresh();
      } else {
        onShowStatus(data.error || 'Failed to save concern', 'error');
      }
    } catch (err: any) {
      onShowStatus(err.message, 'error');
    }
  };

  const handleDelete = async (concernId: string) => {
    if (!confirm('Are you sure you want to delete this concern?')) return;
    try {
      const res = await fetch(
        `/api/concerns?treatmentId=${activeTreatment.id}&concernId=${concernId}`,
        { method: 'DELETE' }
      );
      const data = await res.json();
      if (data.success) {
        onShowStatus('Concern removed successfully');
        onRefresh();
      }
    } catch (err: any) {
      onShowStatus(err.message, 'error');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isAfter: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (isAfter) {
        setAfterImage(result);
      } else {
        setBeforeImage(result);
      }
      setUseIllustration(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
            Select Treatment:
          </label>
          <select
            value={activeTreatment?.id || ''}
            onChange={(e) => onSelectTreatmentId(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold text-slate-900 dark:text-white flex-1 sm:w-80 focus:ring-2 focus:ring-[#0A66B2]"
          >
            {treatments.map((t) => (
              <option key={t.id} value={t.id}>
                [{t.category.toUpperCase()}] {t.name} ({t.concerns?.length || 0} concerns)
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => handleOpenModal()}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-[#8CC43A] hover:bg-[#72A924] text-slate-950 shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Concern to this Treatment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {activeTreatment?.concerns?.map((concern) => (
          <div
            key={concern.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {concern.useIllustration !== false ? 'Medical Illustration' : 'Custom Real Photo'}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenModal(concern)}
                    className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
                    title="Edit Concern & Photos"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(concern.id)}
                    className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                    title="Delete Concern"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                {concern.name}
              </h4>

              {concern.recommendedTreatments && (
                <div className="mt-2">
                  <span className="text-[10px] uppercase font-bold text-[#0A66B2]">Doctor Recommendation:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {concern.recommendedTreatments.map((r, i) => (
                      <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Before Photo: {concern.beforeImage ? '✓ Custom' : 'Default SVG'}</span>
                <span>After Photo: {concern.afterImage ? '✓ Custom' : 'Default SVG'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto no-scrollbar">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              {editingConcern ? 'Edit Concern & Photographs' : 'Add Concern'}
            </h3>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Concern Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Reduces acne scars"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Doctor Recommended Treatments (Comma-separated)</label>
                <input
                  type="text"
                  value={recTreatments}
                  onChange={(e) => setRecTreatments(e.target.value)}
                  placeholder="e.g. PRP, Exo-Skin, PRF, CO2, Peel"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-900 dark:text-white">
                  <input
                    type="checkbox"
                    checked={useIllustration}
                    onChange={(e) => setUseIllustration(e.target.checked)}
                    className="rounded w-4 h-4 text-[#0A66B2]"
                  />
                  <span>Use Illustrated Person Placeholder (BRD BR-08)</span>
                </label>
                <p className="text-[11px] text-slate-500">
                  When enabled, shows high-precision clinical illustrated vector before/after. Uncheck to supply real patient photos.
                </p>
              </div>
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Before Photo (Upload or URL)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={beforeImage}
                      onChange={(e) => { setBeforeImage(e.target.value); setUseIllustration(false); }}
                      placeholder="https://... or choose file"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs"
                    />
                    <label className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 cursor-pointer font-semibold flex items-center gap-1 shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, false)}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">After Photo (Upload or URL)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={afterImage}
                      onChange={(e) => { setAfterImage(e.target.value); setUseIllustration(false); }}
                      placeholder="https://... or choose file"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs"
                    />
                    <label className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 cursor-pointer font-semibold flex items-center gap-1 shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, true)}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#8CC43A] hover:bg-[#72A924] text-slate-950 shadow-md"
                >
                  Save Concern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
