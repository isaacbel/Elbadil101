'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Download,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Phone,
  Loader2,
} from 'lucide-react';
import { wilayasList } from '@/lib/wilayas';

export default function AdminSupportPage() {
  const [items, setItems] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [intention, setIntention] = useState('');
  const [participation, setParticipation] = useState('');
  const [page, setPage] = useState(1);

  const fetchSupporters = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (wilaya) params.set('wilaya', wilaya);
      if (intention) params.set('intention', intention);
      if (participation) params.set('participation', participation);
      params.set('page', String(page));
      params.set('limit', '20');

      const res = await fetch(`/api/admin/support?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setItems(json.items || []);
        setPagination(json.pagination || { total: 0, page: 1, limit: 20, totalPages: 1 });
      }
    } catch (err) {
      console.error('Failed to fetch supporters:', err);
    } finally {
      setLoading(false);
    }
  }, [search, wilaya, intention, participation, page]);

  useEffect(() => {
    fetchSupporters();
  }, [fetchSupporters]);

  const resetFilters = () => {
    setSearch('');
    setWilaya('');
    setIntention('');
    setParticipation('');
    setPage(1);
  };

  const hasActiveFilters = Boolean(search || wilaya || intention || participation);

  const handleExportCsv = () => {
    window.location.href = '/api/admin/support/export';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-teal">
              Supporters &amp; Volunteer Directory
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-teal/10 text-teal font-semibold text-xs">
              Grassroots Movement
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">
            Verified supporter registrations with contact info and participation preferences
          </p>
        </div>

        {/* CSV Export Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal hover:bg-deep text-sand text-xs font-semibold shadow-sm transition-transform active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-line shadow-card space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search name, phone, commune..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-line text-xs bg-sand/20 focus:outline-none focus:ring-1 focus:ring-teal"
            />
            <Search className="w-4 h-4 text-muted absolute left-3 top-2.5" />
          </div>

          {/* Wilaya Filter */}
          <div>
            <select
              value={wilaya}
              onChange={(e) => {
                setWilaya(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl border border-line text-xs bg-sand/20 focus:outline-none focus:ring-1 focus:ring-teal"
            >
              <option value="">All Wilayas</option>
              {wilayasList.map((w) => (
                <option key={w.code} value={w.fr}>
                  {w.code} - {w.fr}
                </option>
              ))}
            </select>
          </div>

          {/* Voting Intention */}
          <div>
            <select
              value={intention}
              onChange={(e) => {
                setIntention(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl border border-line text-xs bg-sand/20 focus:outline-none focus:ring-1 focus:ring-teal"
            >
              <option value="">All Voting Intentions</option>
              <option value="definitely">Will definitely vote</option>
              <option value="leaning">Leaning toward voting</option>
              <option value="learn_more">Want to learn more</option>
              <option value="undecided">Don't know yet</option>
            </select>
          </div>

          {/* Participation Type */}
          <div>
            <select
              value={participation}
              onChange={(e) => {
                setParticipation(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl border border-line text-xs bg-sand/20 focus:outline-none focus:ring-1 focus:ring-teal"
            >
              <option value="">All Participation Types</option>
              <option value="support">Symbolic support</option>
              <option value="share">Share campaign</option>
              <option value="volunteer">Volunteer</option>
              <option value="field_outreach">Field outreach</option>
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex justify-end pt-2 border-t border-line/60">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line hover:bg-sand/40 text-xs font-semibold text-ink transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-3xl border border-line shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="bg-sand/40 border-b border-line text-ink/70 uppercase font-bold tracking-wider">
                <th className="py-3.5 px-4 text-start">Supporter Name</th>
                <th className="py-3.5 px-4 text-start">Wilaya</th>
                <th className="py-3.5 px-4 text-start">Commune</th>
                <th className="py-3.5 px-4 text-start">Phone Number</th>
                <th className="py-3.5 px-4 text-start">Voting Intention</th>
                <th className="py-3.5 px-4 text-start">Participation</th>
                <th className="py-3.5 px-4 text-start">Message</th>
                <th className="py-3.5 px-4 text-end">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : items.length > 0 ? (
                items.map((row) => (
                  <tr key={row.id} className="hover:bg-sand/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-teal whitespace-nowrap">
                      {row.firstName} {row.lastName}
                    </td>

                    <td className="py-3.5 px-4 text-ink/80 whitespace-nowrap">
                      {row.wilaya}
                    </td>

                    <td className="py-3.5 px-4 text-muted whitespace-nowrap">
                      {row.commune || '—'}
                    </td>

                    <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                      <a
                        href={`tel:${row.phone}`}
                        className="text-teal hover:underline inline-flex items-center gap-1"
                        dir="ltr"
                      >
                        <Phone className="w-3 h-3 text-muted" />
                        <span>{row.phone}</span>
                      </a>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-sand text-ink font-medium">
                        {row.intention || '—'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-teal/5 text-teal font-semibold">
                        {row.participation || '—'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-[200px] truncate text-ink/70" title={row.message}>
                      {row.message || '—'}
                    </td>

                    <td className="py-3.5 px-4 text-end text-muted whitespace-nowrap">
                      {new Date(row.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted italic">
                    No supporters registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="p-4 bg-sand/30 border-t border-line flex items-center justify-between text-xs text-ink/70">
            <div>
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
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
    </div>
  );
}
