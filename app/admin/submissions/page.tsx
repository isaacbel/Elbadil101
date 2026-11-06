'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Lock,
  Eye,
  Trash2,
  Inbox,
  Loader2,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import {
  ADMIN_STATUS_LABELS,
  ADMIN_TYPE_LABELS,
  formatAdminDate,
} from '@/lib/admin-labels';
import SubmissionDrawer from '@/components/admin/SubmissionDrawer';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

export default function AdminSubmissionsPage() {
  const { locale, t } = useI18n();
  const [items, setItems] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 15, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('admin');

  // Filters State (priority removed)
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  // Drawer & Delete State
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (type) params.set('type', type);
      if (status) params.set('status', status);
      if (sort) params.set('sort', sort);
      params.set('page', String(page));
      params.set('limit', '15');

      const res = await fetch(`/api/admin/submissions?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setItems(json.items || []);
        setPagination(json.pagination || { total: 0, page: 1, limit: 15, totalPages: 1 });
        if (json.userRole) setUserRole(json.userRole);
      }
    } catch (err) {
      console.error('Failed to fetch submissions:', err);
    } finally {
      setLoading(false);
    }
  }, [search, type, status, sort, page]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const resetFilters = () => {
    setSearch('');
    setType('');
    setStatus('');
    setSort('newest');
    setPage(1);
  };

  const hasActiveFilters = Boolean(search || type || status || sort !== 'newest');

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/submissions/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setDeleteTarget(null);
        fetchSubmissions();
      }
    } catch (err) {
      console.error('Error deleting submission:', err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-teal">
            {t('admin.submissions.title')}
          </h2>
          <p className="text-xs text-muted mt-0.5">
            {t('admin.submissions.subtitle')}
          </p>
        </div>

        <div className="text-xs text-ink/70 bg-white px-3.5 py-2 rounded-xl border border-line shadow-2xs font-kreon">
          {t('admin.submissions.showingRecords', {
            count: String(items.length),
            total: String(pagination.total),
          })}
        </div>
      </div>

      {/* Combinable Search & Filter Bar */}
      <div className="p-5 rounded-2xl bg-white border border-line shadow-card space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative sm:col-span-2">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={t('admin.submissions.searchPlaceholder')}
              className="w-full ps-9 pe-4 py-2.5 rounded-xl border border-line focus:outline-none focus:ring-1 focus:ring-teal text-xs bg-sand/20"
            />
            <Search className="w-4 h-4 text-muted absolute start-3 top-3" />
          </div>

          {/* Request Type Filter (Question removed) */}
          <div>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-line focus:outline-none focus:ring-1 focus:ring-teal text-xs bg-sand/20"
            >
              <option value="">{t('admin.submissions.allTypes')}</option>
              <option value="General Information">{ADMIN_TYPE_LABELS['General Information']}</option>
              <option value="Complaint">{ADMIN_TYPE_LABELS['Complaint']}</option>
              <option value="Suggestion">{ADMIN_TYPE_LABELS['Suggestion']}</option>
              <option value="Technical Problem">{ADMIN_TYPE_LABELS['Technical Problem']}</option>
              <option value="Request for Assistance">{ADMIN_TYPE_LABELS['Request for Assistance']}</option>
              <option value="Other">{ADMIN_TYPE_LABELS['Other']}</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-line focus:outline-none focus:ring-1 focus:ring-teal text-xs bg-sand/20"
            >
              <option value="">{t('admin.submissions.allStatuses')}</option>
              <option value="Pending">{ADMIN_STATUS_LABELS['Pending']}</option>
              <option value="In Progress">{ADMIN_STATUS_LABELS['In Progress']}</option>
              <option value="Resolved">{ADMIN_STATUS_LABELS['Resolved']}</option>
            </select>
          </div>
        </div>

        {/* Secondary Row (Sorting & Reset) */}
        <div className="flex items-center justify-between pt-2 border-t border-line/60">
          <div className="w-48">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-line focus:outline-none focus:ring-1 focus:ring-teal text-xs bg-sand/20"
            >
              <option value="newest">{t('admin.submissions.sortNewest')}</option>
              <option value="oldest">{t('admin.submissions.sortOldest')}</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line hover:bg-sand/40 text-xs font-semibold text-ink transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('admin.submissions.resetFilters')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-3xl border border-line shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="bg-sand/40 border-b border-line text-ink/70 uppercase font-bold tracking-wider">
                <th className="py-3.5 px-4 text-start">{t('admin.submissions.tableRef')}</th>
                <th className="py-3.5 px-4 text-start">{t('admin.submissions.tableType')}</th>
                <th className="py-3.5 px-4 text-start">{locale === 'ar' ? 'نص المراسلة' : 'Message'}</th>
                <th className="py-3.5 px-4 text-start">{t('admin.submissions.tableStatus')}</th>
                <th className="py-3.5 px-4 text-start">{t('admin.submissions.tableDate')}</th>
                <th className="py-3.5 px-4 text-end">{t('admin.submissions.tableActions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t('admin.overview.loading')}</span>
                    </div>
                  </td>
                </tr>
              ) : items.length > 0 ? (
                items.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedId(row.id)}
                    className="hover:bg-sand/40 cursor-pointer transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-teal">
                      <div className="flex items-center gap-1.5">
                        <bdi dir="ltr">{row.referenceId}</bdi>
                        {row.confidential && (
                          <span title="سري">
                            <Lock className="w-3 h-3 text-red-600" />
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-teal/5 text-teal font-semibold">
                        {ADMIN_TYPE_LABELS[row.type] || row.type}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-[340px] truncate text-ink font-medium" dir="auto">
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
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => setSelectedId(row.id)}
                          className="p-1.5 rounded-lg text-muted hover:text-teal hover:bg-sand/60 transition-colors"
                          title={t('admin.submissions.viewDetails')}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(row)}
                          className="p-1.5 rounded-lg text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                          title={t('admin.submissions.delete')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted italic">
                    <div className="flex flex-col items-center gap-2">
                      <Inbox className="w-8 h-8 text-muted/40" />
                      <span>{t('admin.submissions.noResults')}</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {pagination.totalPages > 1 && (
          <div className="p-4 bg-sand/30 border-t border-line flex items-center justify-between text-xs text-ink/70">
            <div className="font-kreon">
              {t('admin.submissions.page', {
                page: String(pagination.page),
                totalPages: String(pagination.totalPages),
              })}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-line bg-white hover:bg-sand/40 disabled:opacity-40 transition-colors"
                title={t('admin.common.prev')}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                className="p-1.5 rounded-lg border border-line bg-white hover:bg-sand/40 disabled:opacity-40 transition-colors"
                title={t('admin.common.next')}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details Drawer */}
      <SubmissionDrawer
        submissionId={selectedId}
        onClose={() => setSelectedId(null)}
        onUpdated={fetchSubmissions}
        userRole={userRole}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title={t('admin.submissions.deleteConfirmTitle')}
        message={t('admin.submissions.deleteConfirmMsg', {
          ref: deleteTarget?.referenceId || '',
        })}
        confirmLabel={t('admin.submissions.confirmDeleteBtn')}
        cancelLabel={t('admin.submissions.cancelBtn')}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={deleting}
      />
    </div>
  );
}
