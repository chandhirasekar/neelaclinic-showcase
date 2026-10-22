'use client';

import React, { useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { Users, UserPlus, Trash2, CheckCircle2, XCircle, Stethoscope, ShieldCheck, Key } from 'lucide-react';

interface UsersManagerProps {
  onShowStatus: (msg: string, type?: 'success' | 'error') => void;
}

export const UsersManager: React.FC<UsersManagerProps> = ({ onShowStatus }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for creating a new user
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('doctor');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/users');
      const data = await res.json();
      if (data.success) {
        setUsers(data.data || []);
      }
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !username.trim() || !password.trim()) {
      onShowStatus('Please fill all required fields', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          username: username.trim().toLowerCase(),
          password,
          role,
        }),
      });

      const data = await res.json();
      if (data.success) {
        onShowStatus('New user added to MongoDB successfully!');
        setIsModalOpen(false);
        setName('');
        setUsername('');
        setPassword('');
        setRole('doctor');
        fetchUsers();
      } else {
        onShowStatus(data.error || 'Failed to create user', 'error');
      }
    } catch (err: any) {
      onShowStatus(err.message || 'Error creating user', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      const res = await fetch(`/api/auth/users?id=${id}&action=toggle`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        onShowStatus('User status updated');
        fetchUsers();
      } else {
        onShowStatus(data.error || 'Failed to update', 'error');
      }
    } catch (err: any) {
      onShowStatus(err.message, 'error');
    }
  };

  const handleDeleteUser = async (id: string, userName: string) => {
    if (!confirm(`Are you sure you want to remove user "${userName}" from MongoDB?`)) return;

    try {
      const res = await fetch(`/api/auth/users?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        onShowStatus('User removed successfully');
        fetchUsers();
      } else {
        onShowStatus(data.error || 'Failed to delete', 'error');
      }
    } catch (err: any) {
      onShowStatus(err.message, 'error');
    }
  };

  const getRoleBadge = (r: UserRole) => {
    switch (r) {
      case 'doctor':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 dark:bg-sky-950 text-[#0A66B2] border border-sky-300 dark:border-sky-800">
            <Stethoscope className="w-3 h-3" />
            <span>Doctor</span>
          </span>
        );
      case 'staff':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-[#3F7A12] border border-emerald-300 dark:border-emerald-800">
            <Users className="w-3 h-3" />
            <span>Staff</span>
          </span>
        );
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 border border-purple-300 dark:border-purple-800">
            <ShieldCheck className="w-3 h-3" />
            <span>Admin</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-[#0A66B2]" />
            <span>Authorized Clinical Practitioners &amp; Staff</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Dynamic user management in MongoDB. Only registered doctors and staff can log in to unlock the consultation suite and admin panel.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0A66B2] hover:bg-[#084F8C] text-white text-xs font-bold shadow-md flex items-center gap-2 self-start sm:self-auto transition-all active:scale-95"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Doctor / Staff</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading user directory from MongoDB...</div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">No users found. Click &quot;Add New Doctor / Staff&quot; above to create one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-5">Name &amp; Profile</th>
                  <th className="py-3 px-5">Username</th>
                  <th className="py-3 px-5">Role</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5">Last Login</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-white">
                      {u.name}
                    </td>
                    <td className="py-3.5 px-5 font-mono text-slate-600 dark:text-slate-300">
                      @{u.username}
                    </td>
                    <td className="py-3.5 px-5">
                      {getRoleBadge(u.role)}
                    </td>
                    <td className="py-3.5 px-5">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(u.id!)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                          u.active
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                        title="Click to toggle active status"
                      >
                        {u.active ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        <span>{u.active ? 'Active' : 'Disabled'}</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-5 text-slate-500">
                      {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : 'Never'}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(u.id!, u.name)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors"
                        title="Remove user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Add Authorized Clinic User
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter the practitioner or staff credentials. This account will be securely saved in MongoDB.
            </p>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name &amp; Title
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Ramesh Kumar (Consultant)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-[#0A66B2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Username (Staff ID)
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. ramesh or staff_frontdesk"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-[#0A66B2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Initial Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter initial password"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-[#0A66B2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Assigned Clinical Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-[#0A66B2] focus:outline-none"
                >
                  <option value="doctor">Doctor (Consultation Suite &amp; Prescriptions)</option>
                  <option value="staff">Staff (Frontdesk &amp; Patient Registration)</option>
                  <option value="admin">Admin (Full Showcase &amp; Database CMS)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0A66B2] hover:bg-[#084F8C] text-white shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving to Database...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
