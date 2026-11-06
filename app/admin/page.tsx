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
  ArrowLeft,
  RefreshCw,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import {
  ADMIN_STATUS_LABELS,
  ADMIN_TYPE_LABELS,
  formatAdminDate,
} from '@/lib/admin-labels';
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
  const { locale, t } = useI18n();
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
            {t('admin.overview.title')}
          </h2>
          <p className="text-xs text-muted mt-0.5">
            {t('admin.overview.subtitle')}
          </p>
        </div>

        <button
          type="button"
          onClick={fetchDashboardData}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line bg-white hover:bg-sand/40 text-xs font-semibold text-ink transition-colors shadow-2xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{t('admin.overview.refresh')}</span>
        </button>
      </div>

      {/* Primary Statistics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Submissions */}
        <div className="p-5 rounded-2xl bg-white border border-line shadow-card space-y-2">
          <div className="flex items-center justify-between text-teal/70">
            <span className="text-xs font-bold uppercase tracking-wider">
              {t('admin.overview.totalSubmissions')}
            </span>
            <Inbox className="w-4 h-4 text-teal" />
          </div>
          <div className="font-kreon text-2xl sm:text-3xl font-bold text-teal">
            {stats?.totalSubmissions ?? '—'}
          </div>
          <div className="text-[11px] text-muted">
            {t('admin.overview.totalSubmissionsSub')}
          </div>
        </div>

        {/* Complaints */}
        <div className="p-5 rounded-2xl bg-white border border-line shadow-card space-y-2">
          <div className="flex items-center justify-between text-red-600">
            <span className="text-xs font-bold uppercase tracking-wider">
              {t('admin.overview.complaints')}
            </span>
            <ShieldAlert className="w-4 h-4 text-red-600" />
          </div>
          <div className="font-kreon text-2xl sm:text-3xl font-bold text-red-600">
            {stats?.totalComplaints ?? '—'}
          </div>
          <div className="text-[11px] text-muted">
            {t('admin.overview.complaintsSub')}
          </div>
        </div>

        {/* Suggestions */}
        <div className="p-5 rounded-2xl bg-white border border-line shadow-card space-y-2">
          <div className="flex items-center justify-between text-teal">
            <span className="text-xs font-bold uppercase tracking-wider">
              {t('admin.overview.suggestions')}
            </span>
            <Lightbulb className="w-4 h-4 text-green-brand" />
          </div>
          <div className="font-kreon text-2xl sm:text-3xl font-bold text-teal">
            {stats?.totalSuggestions ?? '—'}
          </div>
          <div className="text-[11px] text-muted">
            {t('admin.overview.suggestionsSub')}
          </div>
        </div>

        {/* Pending */}
        <div className="p-5 rounded-2xl bg-white border border-line shadow-card space-y-2">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-xs font-bold uppercase tracking-wider">
              {t('admin.overview.pending')}
            </span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-kreon text-2xl sm:text-3xl font-bold text-amber-600">
            {stats?.pending ?? '—'}
          </div>
          <div className="text-[11px] text-muted">
            {t('admin.overview.pendingSub')}
          </div>
        </div>

        {/* In Progress */}
        <div className="p-5 rounded-2xl bg-white border border-line shadow-card space-y-2">
          <div className="flex items-center justify-between text-blue-600">
            <span className="text-xs font-bold uppercase tracking-wider">
              {t('admin.overview.inProgress')}
            </span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="font-kreon text-2xl sm:text-3xl font-bold text-blue-600">
            {stats?.inProgress ?? '—'}
          </div>
          <div className="text-[11px] text-muted">
            {t('admin.overview.inProgressSub')}
          </div>
        </div>

        {/* Resolved */}
        <div className="p-5 rounded-2xl bg-white border border-line shadow-card space-y-2">
          <div className="flex items-center justify-between text-teal">
            <span className="text-xs font-bold uppercase tracking-wider">
              {t('admin.overview.resolved')}
            </span>
            <CheckCircle2 className="w-4 h-4 text-teal" />
          </div>
          <div className="font-kreon text-2xl sm:text-3xl font-bold text-teal">
            {stats?.resolved ?? '—'}
          </div>
          <div className="text-[11px] text-muted">
            {t('admin.overview.resolvedSub')}
          </div>
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
              {t('admin.overview.supportersTitle')}
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-sand">
              <span className="font-kreon text-wheat">{stats?.totalSupporters ?? 0}</span>{' '}
              {t('admin.overview.supportersRegistered')}
            </div>
          </div>
        </div>

        <Link
          href="/admin/support"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-wheat text-deep hover:bg-wheat/90 text-xs font-semibold transition-transform active:scale-95 shadow-sm"
        >
          <span>{t('admin.overview.viewSupportersBtn')}</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Submissions Over Time Chart */}
      {stats?.chartData && stats.chartData.length > 0 && (
        <div className="p-6 rounded-3xl bg-white border border-line shadow-card space-y-4">
          <h3 className="font-serif font-bold text-base text-teal">
            {t('admin.overview.activityChartTitle')}
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
                    title={`${d.day}: ${d.count}`}
                  />
                  <span className="text-[10px] text-muted truncate max-w-full font-mono">
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
              {t('admin.overview.recentSubmissionsTitle')}
            </h3>
            <p className="text-xs text-muted">
              {t('admin.overview.recentSubmissionsSub')}
            </p>
          </div>
          <Link
            href="/admin/submissions"
            className="text-xs font-semibold text-teal hover:underline inline-flex items-center gap-1"
          >
            <span>{t('admin.overview.viewAllSubmissions')}</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="border-b border-line text-muted uppercase font-semibold">
                <th className="py-3 px-3 text-start">{t('admin.submissions.tableRef')}</th>
                <th className="py-3 px-3 text-start">{t('admin.submissions.tableType')}</th>
                <th className="py-3 px-3 text-start">{locale === 'ar' ? 'نص المراسلة' : 'Message'}</th>
                <th className="py-3 px-3 text-start">{t('admin.submissions.tableStatus')}</th>
                <th className="py-3 px-3 text-start">{t('admin.submissions.tableDate')}</th>
                <th className="py-3 px-3 text-end">{t('admin.submissions.tableActions')}</th>
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
                      <bdi dir="ltr">{item.referenceId}</bdi>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-teal/5 text-teal font-semibold">
                        {ADMIN_TYPE_LABELS[item.type] || item.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 max-w-[280px] truncate text-ink/80 font-medium" dir="auto">
                      {item.description || item.subject}
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
                        {ADMIN_STATUS_LABELS[item.status] || item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-muted whitespace-nowrap">
                      {formatAdminDate(item.createdAt)}
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
                        {t('admin.overview.inspect')}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted italic">
                    {loading ? t('admin.overview.loading') : t('admin.overview.noSubmissions')}
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
