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
import { wilayasList } from '@/lib/wilayas';
import SubmissionDrawer from '@/components/admin/SubmissionDrawer';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

export default function AdminSubmissionsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 15, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('admin');

  // Filters State
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [wilaya, setWilaya] = useState('');
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
      if (priority) params.set('priority', priority);
      if (wilaya) params.set('wilaya', wilaya);
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
  }, [search, type, status, priority, wilaya, sort, page]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const resetFilters = () => {
    setSearch('');
    setType('');
    setStatus('');
    setPriority('');
    setWilaya('');
    setSort('newest');
    setPage(1);
  };

  const hasActiveFilters = Boolean(search || type || status || priority || wilaya || sort !== 'newest');

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
            Citizen Written Submissions
          </h2>
          <p className="text-xs text-muted mt-0.5">
            Search, filter, track and respond to written citizen correspondence
          </p>
        </div>

        <div className="text-xs text-ink/70 bg-white px-3.5 py-2 rounded-xl border border-line shadow-2xs">
          Showing <span className="font-bold text-teal">{items.length}</span> of{' '}
          <span className="font-bold text-teal">{pagination.total}</span> records
        </div>
      </div>

      {/* Combinable Search & Multi-filter Bar */}
      <div className="p-5 rounded-2xl bg-white border border-line shadow-card space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="sm:col-span-2 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, email, ref ID, subject or content..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-line focus:outline-none focus:ring-1 focus:ring-teal text-xs bg-sand/20"
            />
            <Search className="w-4 h-4 text-muted absolute left-3 top-3" />
          </div>

          {/* Request Type Filter */}
          <div>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-line focus:outline-none focus:ring-1 focus:ring-teal text-xs bg-sand/20"
            >
              <option value="">All Types</option>
              <option value="General Information">General Information</option>
              <option value="Complaint">Complaint</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Question">Question</option>
              <option value="Technical Problem">Technical Problem</option>
              <option value="Request for Assistance">Request for Assistance</option>
              <option value="Other">Other</option>
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
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Secondary Filter Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-line/60">
          {/* Priority Filter */}
          <div>
            <select
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl border border-line focus:outline-none focus:ring-1 focus:ring-teal text-xs bg-sand/20"
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Wilaya Filter */}
          <div>
            <select
              value={wilaya}
              onChange={(e) => {
                setWilaya(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl border border-line focus:outline-none focus:ring-1 focus:ring-teal text-xs bg-sand/20"
            >
              <option value="">All 58 Wilayas</option>
              {wilayasList.map((w) => (
                <option key={w.code} value={w.fr}>
                  {w.code} - {w.fr}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting Order */}
          <div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-line focus:outline-none focus:ring-1 focus:ring-teal text-xs bg-sand/20"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          {/* One-Click Reset Button */}
          <div className="flex items-center justify-end">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line hover:bg-sand/40 text-xs font-semibold text-ink transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-3xl border border-line shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="bg-sand/40 border-b border-line text-ink/70 uppercase font-bold tracking-wider">
                <th className="py-3.5 px-4 text-start">Reference ID</th>
                <th className="py-3.5 px-4 text-start">Citizen Name</th>
                <th className="py-3.5 px-4 text-start">Type</th>
                <th className="py-3.5 px-4 text-start">Wilaya</th>
                <th className="py-3.5 px-4 text-start">Subject</th>
                <th className="py-3.5 px-4 text-start">Priority</th>
                <th className="py-3.5 px-4 text-start">Status</th>
                <th className="py-3.5 px-4 text-start">Date</th>
                <th className="py-3.5 px-4 text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-muted">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Loading records...</span>
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
                        <span>{row.referenceId}</span>
                        {row.confidential && (
                          <span title="Confidential">
                            <Lock className="w-3 h-3 text-red-600" />
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-ink">
                      {row.fullName}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-teal/5 text-teal font-semibold">
                        {row.type}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-muted">{row.wilaya}</td>

                    <td className="py-3.5 px-4 max-w-[200px] truncate text-ink font-medium">
                      {row.subject}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`font-semibold ${
                          row.priority === 'High'
                            ? 'text-red-600'
                            : row.priority === 'Medium'
                            ? 'text-amber-600'
                            : 'text-muted'
                        }`}
                      >
                        {row.priority}
                      </span>
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
                        {row.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-muted whitespace-nowrap">
                      {new Date(row.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4 text-end">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => setSelectedId(row.id)}
                          className="p-1.5 rounded-lg text-muted hover:text-teal hover:bg-sand/60 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(row)}
                          className="p-1.5 rounded-lg text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-muted italic">
                    <div className="flex flex-col items-center gap-2">
                      <Inbox className="w-8 h-8 text-muted/40" />
                      <span>No submissions found matching your search and filter criteria.</span>
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
            <div>
              Page {pagination.page} of {pagination.totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-line bg-white hover:bg-sand/40 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                className="p-1.5 rounded-lg border border-line bg-white hover:bg-sand/40 disabled:opacity-40 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
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
        title="Confirm Deletion"
        message={`Are you sure you want to delete submission ${deleteTarget?.referenceId} from ${deleteTarget?.fullName}?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={deleting}
      />
    </div>
  );
}
