'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  ShieldAlert,
  Search,
  RotateCcw,
  Loader2,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import {
  ADMIN_STATUS_LABELS,
  formatAdminDate,
} from '@/lib/admin-labels';
import SubmissionDrawer from '@/components/admin/SubmissionDrawer';

export default function AdminComplaintsPage() {
  const { locale, t } = useI18n();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('type', 'Complaint');
      if (search) params.set('search', search);
      if (status) params.set('status', status);
      params.set('limit', '50');

      const res = await fetch(`/api/admin/submissions?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setItems(json.items || []);
      }
    } catch (err) {
      console.error('Error fetching complaints:', err);
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-teal">
              {t('admin.complaints.title')}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 font-semibold text-xs">
              {t('admin.complaints.badge')}
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">
            {t('admin.complaints.subtitle')}
          </p>
        </div>

        <div className="text-xs text-ink/70 bg-white px-3.5 py-2 rounded-xl border border-line shadow-2xs font-kreon">
          {t('admin.complaints.totalCount', { count: String(items.length) })}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-line shadow-card flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('admin.complaints.searchPlaceholder')}
            className="w-full ps-9 pe-4 py-2 rounded-xl border border-line text-xs bg-sand/20 focus:outline-none focus:ring-1 focus:ring-teal"
          >
          </input>
          <Search className="w-4 h-4 text-muted absolute start-3 top-2.5" />
        </div>

        <div className="w-48">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-line text-xs bg-sand/20 focus:outline-none focus:ring-1 focus:ring-teal"
          >
            <option value="">{t('admin.submissions.allStatuses')}</option>
            <option value="Pending">{ADMIN_STATUS_LABELS['Pending']}</option>
            <option value="In Progress">{ADMIN_STATUS_LABELS['In Progress']}</option>
            <option value="Resolved">{ADMIN_STATUS_LABELS['Resolved']}</option>
          </select>
        </div>

        {(search || status) && (
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setStatus('');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-line hover:bg-sand/40 text-xs font-semibold text-ink transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('admin.submissions.resetFilters')}</span>
          </button>
        )}
      </div>

      {/* Complaints List Table */}
      <div className="bg-white rounded-3xl border border-line shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="bg-sand/40 border-b border-line text-ink/70 uppercase font-bold tracking-wider">
                <th className="py-3.5 px-4 text-start">{t('admin.submissions.tableRef')}</th>
                <th className="py-3.5 px-4 text-start">{locale === 'ar' ? 'نص المراسلة' : 'Message'}</th>
                <th className="py-3.5 px-4 text-start">{t('admin.submissions.tableStatus')}</th>
                <th className="py-3.5 px-4 text-start">{t('admin.submissions.tableDate')}</th>
                <th className="py-3.5 px-4 text-end">{t('admin.submissions.tableActions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : items.length > 0 ? (
                items.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedId(row.id)}
                    className="hover:bg-sand/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-red-600">
                      <bdi dir="ltr">{row.referenceId}</bdi>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-ink max-w-[320px] truncate" dir="auto">
                      {row.description || row.subject}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          row.status === 'Resolved'
                            ? 'bg-teal/10 text-teal'
                            : row.status === 'In Progress'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-sand text-ink'
                        }`}
                      >
                        {ADMIN_STATUS_LABELS[row.status] || row.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-muted whitespace-nowrap">
                      {formatAdminDate(row.createdAt)}
                    </td>

                    <td className="py-3.5 px-4 text-end">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedId(row.id);
                        }}
                        className="text-teal hover:underline font-semibold"
                      >
                        {t('admin.complaints.examine')}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted italic">
                    {t('admin.complaints.noComplaints')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details & Action Drawer */}
      <SubmissionDrawer
        submissionId={selectedId}
        onClose={() => setSelectedId(null)}
        onUpdated={fetchComplaints}
      />
    </div>
  );
}
