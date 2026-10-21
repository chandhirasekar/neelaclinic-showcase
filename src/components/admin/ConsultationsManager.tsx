'use client';

import React from 'react';
import { ConsultationNote } from '@/types';
import { Users, ExternalLink, Trash2 } from 'lucide-react';

interface ConsultationsManagerProps {
  consultations: ConsultationNote[];
  onRefresh: () => void;
  onShowStatus: (msg: string, type?: 'success' | 'error') => void;
}

export const ConsultationsManager: React.FC<ConsultationsManagerProps> = ({
  consultations,
  onRefresh,
  onShowStatus,
}) => {
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this patient consultation note?')) return;
    try {
      const res = await fetch(`/api/consultations?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        onShowStatus('Patient record deleted');
        onRefresh();
      }
    } catch (err: any) {
      onShowStatus(err.message, 'error');
    }
  };

  const handleExportCSV = () => {
    const csv = [
      ['Date', 'Patient Name', 'Phone', 'Category', 'Treatment', 'Concern', 'Notes'].join(','),
      ...consultations.map(c => [
        `"${c.createdAt}"`,
        `"${c.patientName}"`,
        `"${c.patientPhone || ''}"`,
        `"${c.category}"`,
        `"${c.treatmentName}"`,
        `"${c.concernName}"`,
        `"${(c.doctorNotes || '').replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nila-consultations-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Recorded Patient Consultation Notes ({consultations.length})
        </h3>
        {consultations.length > 0 && (
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0A66B2] text-white shadow-sm flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Export to CSV</span>
          </button>
        )}
      </div>

      {consultations.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No patient notes recorded yet.</p>
          <p className="text-xs text-slate-400 mt-1">
            Doctors can tap "Doctor Note" on any tablet screen during consultation to save notes.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200/60 dark:border-slate-800">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Patient</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Target Procedure</th>
                  <th className="p-4">Doctor Notes</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {consultations.map((note) => (
                  <tr key={note.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-4 text-slate-400 whitespace-nowrap">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      {note.patientName}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-300">
                      {note.patientPhone || '—'}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-900 dark:text-white">{note.treatmentName}</div>
                      <div className="text-[11px] text-[#3F7A12] dark:text-emerald-400">{note.concernName}</div>
                    </td>
                    <td className="p-4 text-slate-500 max-w-sm">
                      {note.doctorNotes || '—'}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        type="button"
                        onClick={() => note.id && handleDelete(note.id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                        title="Delete Note"
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
      )}
    </div>
  );
};
