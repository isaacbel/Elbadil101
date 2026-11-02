'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Lightbulb, Search, RotateCcw, Loader2 } from 'lucide-react';
import SubmissionDrawer from '@/components/admin/SubmissionDrawer';

export default function AdminSuggestionsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const fetchSuggestions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('type', 'Suggestion');
      if (search) params.set('search', search);
      if (status) params.set('status', status);
      params.set('limit', '50');

      const res = await fetch(`/api/admin/submissions?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setItems(json.items || []);
      }
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-teal">
              Citizen Constructive Suggestions
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-teal/10 text-teal font-semibold text-xs">
              Public Proposals
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">
            Ideas, policy improvements, and municipal initiatives suggested by citizens
          </p>
        </div>

        <div className="text-xs text-ink/70 bg-white px-3.5 py-2 rounded-xl border border-line shadow-2xs">
          Total Suggestions: <span className="font-bold text-teal">{items.length}</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-line shadow-card flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search proposals, citizen name, reference..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-line text-xs bg-sand/20 focus:outline-none focus:ring-1 focus:ring-teal"
          />
          <Search className="w-4 h-4 text-muted absolute left-3 top-2.5" />
        </div>

        <div className="w-48">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-line text-xs bg-sand/20 focus:outline-none focus:ring-1 focus:ring-teal"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending Review</option>
            <option value="In Progress">In Evaluation</option>
            <option value="Resolved">Accepted / Resolved</option>
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
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Suggestions List Table */}
      <div className="bg-white rounded-3xl border border-line shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="bg-sand/40 border-b border-line text-ink/70 uppercase font-bold tracking-wider">
                <th className="py-3.5 px-4 text-start">Reference ID</th>
                <th className="py-3.5 px-4 text-start">Suggestion Title / Subject</th>
                <th className="py-3.5 px-4 text-start">Status</th>
                <th className="py-3.5 px-4 text-start">Date</th>
                <th className="py-3.5 px-4 text-end">Action</th>
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
                    <td className="py-3.5 px-4 font-mono font-bold text-teal">
                      {row.referenceId}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-ink max-w-[320px] truncate">
                      {row.subject}
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
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedId(row.id);
                        }}
                        className="text-teal hover:underline font-semibold"
                      >
                        Review Proposal
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted italic">
                    No suggestions recorded.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SubmissionDrawer
        submissionId={selectedId}
        onClose={() => setSelectedId(null)}
        onUpdated={fetchSuggestions}
      />
    </div>
  );
}
