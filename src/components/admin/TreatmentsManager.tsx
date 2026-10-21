'use client';

import React, { useState } from 'react';
import { Treatment, CategoryType } from '@/types';
import { Search, Plus, Edit, Trash2, Layers } from 'lucide-react';

interface TreatmentsManagerProps {
  treatments: Treatment[];
  onRefresh: () => void;
  onSelectTreatmentForConcerns: (id: string) => void;
  onShowStatus: (msg: string, type?: 'success' | 'error') => void;
}

export const TreatmentsManager: React.FC<TreatmentsManagerProps> = ({
  treatments,
  onRefresh,
  onSelectTreatmentForConcerns,
  onShowStatus,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<CategoryType>('skin');
  const [doctorNote, setDoctorNote] = useState('');
  const [badge, setBadge] = useState('');

  const handleOpenModal = (t?: Treatment) => {
    if (t) {
      setEditingTreatment(t);
      setName(t.name);
      setCategory(t.category);
      setDoctorNote(t.doctorNote || '');
      setBadge(t.badge || '');
    } else {
      setEditingTreatment(null);
      setName('');
      setCategory('skin');
      setDoctorNote('');
      setBadge('');
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const id = editingTreatment?.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const payload: Treatment = {
      id,
      name: name.trim(),
      category,
      doctorNote: doctorNote.trim() || undefined,
      badge: badge.trim() || undefined,
      concerns: editingTreatment?.concerns || [
        { id: `${id}-concern-1`, name: 'Initial Concern Indication', useIllustration: true }
      ],
      order: editingTreatment?.order || treatments.length + 1
    };

    try {
      const res = await fetch(`/api/treatments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        onShowStatus('Treatment saved successfully!');
        setIsModalOpen(false);
        onRefresh();
      } else {
        onShowStatus(data.error || 'Failed to save', 'error');
      }
    } catch (err: any) {
      onShowStatus(err.message, 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this treatment?')) return;
    try {
      const res = await fetch(`/api/treatments/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        onShowStatus('Treatment removed successfully');
        onRefresh();
      }
    } catch (err: any) {
      onShowStatus(err.message, 'error');
    }
  };

  const filtered = treatments.filter(t =>
    !searchQuery.trim() ||
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search treatments..."
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
          />
        </div>

        <button
          type="button"
          onClick={() => handleOpenModal()}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-[#8CC43A] hover:bg-[#72A924] text-slate-950 shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Treatment</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200/60 dark:border-slate-800">
              <tr>
                <th className="p-4">Treatment</th>
                <th className="p-4">Category</th>
                <th className="p-4">Doctor Note / Description</th>
                <th className="p-4">Concerns Count</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <span>{t.name}</span>
                      {t.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#3F7A12]">
                          {t.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-normal">id: {t.id}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      t.category === 'skin'
                        ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {t.category}
                    </span>
                  </td>
                  <td className="p-4 max-w-xs truncate text-slate-500 dark:text-slate-400">
                    {t.doctorNote || '—'}
                  </td>
                  <td className="p-4 font-bold text-slate-700 dark:text-slate-300">
                    {t.concerns?.length || 0}
                  </td>
                  <td className="p-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onSelectTreatmentForConcerns(t.id)}
                      className="p-1.5 rounded-lg bg-blue-50 text-[#0A66B2] hover:bg-blue-100"
                      title="Manage Concerns & Photos"
                    >
                      <Layers className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenModal(t)}
                      className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
                      title="Edit Treatment"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(t.id)}
                      className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                      title="Delete Treatment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              {editingTreatment ? 'Edit Treatment' : 'Add New Treatment'}
            </h3>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Treatment Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Q Switch Laser"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategoryType)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                >
                  <option value="skin">Skin Treatments</option>
                  <option value="hair">Hair Treatments</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Doctor Note / Short Description</label>
                <textarea
                  value={doctorNote}
                  onChange={(e) => setDoctorNote(e.target.value)}
                  rows={2}
                  placeholder="Doctor's note as printed or handwritten..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Badge Tag (Optional)</label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g. Popular, Clinical Laser"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
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
                  Save Treatment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
