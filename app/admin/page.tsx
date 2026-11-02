'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Inbox,
  ShieldAlert,
  Lightbulb,
  Clock,
  CheckCircle2,
  Users,
  TrendingUp,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import SubmissionDrawer from '@/components/admin/SubmissionDrawer';

interface StatsData {
  totalSubmissions: number;
  totalComplaints: number;
  totalSuggestions: number;
  pending: number;
  inProgress: number;
  resolved: number;
  totalSupporters: number;
  chartData: { day: string; count: number }[];
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [recentItems, setRecentItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubId, setSelectedSubId] = useState<number | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, subsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/submissions?limit=6'),
      ]);

      if (statsRes.ok) {
        const statsJson = await statsRes.json();
        setStats(statsJson);
      }
      if (subsRes.ok) {
        const subsJson = await subsRes.json();
        setRecentItems(subsJson.items || []);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header bar with Refresh button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-teal">
            Campaign &amp; Office Activity
          </h2>
          <p className="text-xs text-muted mt-0.5">
            Real-time citizen engagement, written submissions, and complaint monitoring
          </p>
        </div>

        <button
          type="button"
          onClick={fetchDashboardData}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line bg-white hover:bg-sand/40 text-xs font-semibold text-ink transition-colors shadow-2xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Primary Statistics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Submissions */}
        <div className="p-5 rounded-2xl bg-white border border-line shadow-card space-y-2">
          <div className="flex items-center justify-between text-teal/70">
            <span className="text-xs font-bold uppercase tracking-wider">Submissions</span>
            <Inbox className="w-4 h-4 text-teal" />
          </div>
          <div className="font-kreon text-2xl sm:text-3xl font-bold text-teal">
            {stats?.totalSubmissions ?? '—'}
          </div>
          <div className="text-[11px] text-muted">All written citizen requests</div>
        </div>

        {/* Complaints */}
        <div className="p-5 rounded-2xl bg-white border border-line shadow-card space-y-2">
          <div className="flex items-center justify-between text-red-600">
            <span className="text-xs font-bold uppercase tracking-wider">Complaints</span>
            <ShieldAlert className="w-4 h-4 text-red-600" />
          </div>
          <div className="font-kreon text-2xl sm:text-3xl font-bold text-red-600">
            {stats?.totalComplaints ?? '—'}
          </div>
          <div className="text-[11px] text-muted">Grievances filed</div>
        </div>

        {/* Suggestions */}
        <div className="p-5 rounded-2xl bg-white border border-line shadow-card space-y-2">
          <div className="flex items-center justify-between text-teal">
            <span className="text-xs font-bold uppercase tracking-wider">Suggestions</span>
            <Lightbulb className="w-4 h-4 text-green-brand" />
          </div>
          <div className="font-kreon text-2xl sm:text-3xl font-bold text-teal">
            {stats?.totalSuggestions ?? '—'}
          </div>
          <div className="text-[11px] text-muted">Constructive proposals</div>
        </div>

        {/* Pending */}
        <div className="p-5 rounded-2xl bg-white border border-line shadow-card space-y-2">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-xs font-bold uppercase tracking-wider">Pending</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-kreon text-2xl sm:text-3xl font-bold text-amber-600">
            {stats?.pending ?? '—'}
          </div>
          <div className="text-[11px] text-muted">Awaiting office review</div>
        </div>

        {/* In Progress */}
        <div className="p-5 rounded-2xl bg-white border border-line shadow-card space-y-2">
          <div className="flex items-center justify-between text-blue-600">
            <span className="text-xs font-bold uppercase tracking-wider">In Progress</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="font-kreon text-2xl sm:text-3xl font-bold text-blue-600">
            {stats?.inProgress ?? '—'}
          </div>
          <div className="text-[11px] text-muted">Active investigation</div>
        </div>

        {/* Resolved */}
        <div className="p-5 rounded-2xl bg-white border border-line shadow-card space-y-2">
          <div className="flex items-center justify-between text-teal">
            <span className="text-xs font-bold uppercase tracking-wider">Resolved</span>
            <CheckCircle2 className="w-4 h-4 text-teal" />
          </div>
          <div className="font-kreon text-2xl sm:text-3xl font-bold text-teal">
            {stats?.resolved ?? '—'}
          </div>
          <div className="text-[11px] text-muted">Completed responses</div>
        </div>
      </div>

      {/* Secondary Banner: Supporters Count */}
      <div className="p-6 rounded-3xl bg-teal text-sand flex flex-col sm:flex-row items-center justify-between gap-6 shadow-editorial">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 text-sand" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-sand/70 font-semibold">
              Campaign Movement
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-sand">
              <span className="font-kreon text-wheat">{stats?.totalSupporters ?? 0}</span> Supporters Registered
            </div>
          </div>
        </div>

        <Link
          href="/admin/support"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-wheat text-deep hover:bg-wheat/90 text-xs font-semibold transition-transform active:scale-95 shadow-sm"
        >
          <span>View Directory &amp; Export CSV</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Submissions Over Time Chart */}
      {stats?.chartData && stats.chartData.length > 0 && (
        <div className="p-6 rounded-3xl bg-white border border-line shadow-card space-y-4">
          <h3 className="font-serif font-bold text-base text-teal">
            Submissions Activity (Past 7 Days)
          </h3>
          <div className="flex items-end gap-3 h-36 pt-4 border-b border-line/60">
            {stats.chartData.map((d) => {
              const max = Math.max(...stats.chartData.map((x) => x.count), 1);
              const heightPercent = Math.max(15, (d.count / max) * 100);
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-kreon font-bold text-teal">{d.count}</span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[48px] rounded-t-lg bg-teal/80 hover:bg-teal transition-all"
                    title={`${d.day}: ${d.count} submissions`}
                  />
                  <span className="text-[10px] text-muted truncate max-w-full">
                    {d.day.slice(5)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Submissions Table */}
      <div className="p-6 rounded-3xl bg-white border border-line shadow-card space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-line">
          <div>
            <h3 className="font-serif font-bold text-lg text-teal">
              Recent Citizen Requests
            </h3>
            <p className="text-xs text-muted">Latest incoming correspondence</p>
          </div>
          <Link
            href="/admin/submissions"
            className="text-xs font-semibold text-teal hover:underline inline-flex items-center gap-1"
          >
            <span>View All Submissions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="border-b border-line text-muted uppercase font-semibold">
                <th className="py-3 px-3 text-start">Reference</th>
                <th className="py-3 px-3 text-start">Citizen</th>
                <th className="py-3 px-3 text-start">Type</th>
                <th className="py-3 px-3 text-start">Subject</th>
                <th className="py-3 px-3 text-start">Priority</th>
                <th className="py-3 px-3 text-start">Status</th>
                <th className="py-3 px-3 text-end">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {recentItems.length > 0 ? (
                recentItems.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedSubId(item.id)}
                    className="hover:bg-sand/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-3 font-mono font-semibold text-teal">
                      {item.referenceId}
                    </td>
                    <td className="py-3 px-3 font-medium text-ink">
                      {item.fullName}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-teal/5 text-teal font-semibold">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 max-w-[200px] truncate text-ink/80">
                      {item.subject}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`font-semibold ${
                          item.priority === 'High'
                            ? 'text-red-600'
                            : item.priority === 'Medium'
                            ? 'text-amber-600'
                            : 'text-muted'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          item.status === 'Resolved'
                            ? 'bg-teal/10 text-teal'
                            : item.status === 'In Progress'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-sand text-ink'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-end">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSubId(item.id);
                        }}
                        className="text-teal hover:underline font-semibold"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted italic">
                    {loading ? 'Loading submissions...' : 'No citizen submissions recorded yet.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspection Drawer */}
      <SubmissionDrawer
        submissionId={selectedSubId}
        onClose={() => setSelectedSubId(null)}
        onUpdated={fetchDashboardData}
      />
    </div>
  );
}
