'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  ShieldAlert,
  Lightbulb,
  Trash2,
  Clock,
  Send,
  Loader2,
  Tag,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import {
  ADMIN_STATUS_LABELS,
  ADMIN_TYPE_LABELS,
  ADMIN_COMPLAINT_CATEGORY_LABELS,
  formatAdminDate,
} from '@/lib/admin-labels';
import ConfirmDialog from './ConfirmDialog';

interface SubmissionDrawerProps {
  submissionId: number | string | null;
  onClose: () => void;
  onUpdated: () => void;
  userRole?: string;
}

export default function SubmissionDrawer({
  submissionId,
  onClose,
  onUpdated,
  userRole = 'admin',
}: SubmissionDrawerProps) {
  const { t } = useI18n();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [noteSubmitting, setNoteSubmitting] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!submissionId) {
      setData(null);
      return;
    }

    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/submissions/${submissionId}`);
        if (res.ok) {
          const json = await res.json();
          setData(json.submission);
        }
      } catch (err) {
        console.error('Error fetching submission details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [submissionId]);

  if (!submissionId) return null;

  const handleStatusChange = async (newStatus: string) => {
    setStatusUpdating(true);
    try {
      const res = await fetch(`/api/admin/submissions/${data.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setData((prev: any) => ({ ...prev, status: newStatus }));
        onUpdated();
        // Refresh details to get new status history entry
        const refreshRes = await fetch(`/api/admin/submissions/${data.id}`);
        if (refreshRes.ok) {
          const json = await refreshRes.json();
          setData(json.submission);
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setNoteSubmitting(true);
    try {
      const res = await fetch(`/api/admin/submissions/${data.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: newNote }),
      });
      if (res.ok) {
        const json = await res.json();
        setData((prev: any) => ({
          ...prev,
          notes: [json.note, ...(prev.notes || [])],
        }));
        setNewNote('');
      }
    } catch (err) {
      console.error('Failed to add note:', err);
    } finally {
      setNoteSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/submissions/${data.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setDeleteDialogOpen(false);
        onClose();
        onUpdated();
      }
    } catch (err) {
      console.error('Failed to delete submission:', err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden font-naskh">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

        <div className="fixed inset-y-0 end-0 max-w-2xl w-full bg-white shadow-2xl flex flex-col z-10 border-s border-line animate-fade-in text-start">
          {/* Header */}
          <div className="p-5 px-6 bg-teal text-sand flex items-center justify-between border-b border-white/10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 text-sand">
                  <bdi dir="ltr">{data?.referenceId || t('admin.drawer.loadingRecord')}</bdi>
                </span>
                {data?.type && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-wheat text-teal">
                    <Tag className="w-3 h-3" />
                    <span>{ADMIN_TYPE_LABELS[data.type] || data.type}</span>
                  </span>
                )}
              </div>
              <div className="text-sm font-serif font-bold text-sand truncate max-w-md" dir="auto">
                {data?.type ? ADMIN_TYPE_LABELS[data.type] || data.type : t('admin.drawer.title')}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 text-sand hover:bg-white/20 transition-colors"
              aria-label={t('admin.drawer.close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 text-ink">
            {loading || !data ? (
              <div className="flex items-center justify-center py-20 text-muted">
                <Loader2 className="w-6 h-6 animate-spin ms-2" />
                <span>{t('admin.drawer.loadingRecord')}</span>
              </div>
            ) : (
              <>
                {/* Status Control Toolbar */}
                <div className="p-4 rounded-2xl bg-sand/40 border border-line flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-ink/70 uppercase tracking-wider mb-1">
                      {t('admin.drawer.statusLabel')}
                    </label>
                    <div className="inline-flex rounded-xl bg-white p-1 border border-line shadow-sm">
                      {[
                        { key: 'Pending', label: ADMIN_STATUS_LABELS['Pending'] },
                        { key: 'In Progress', label: ADMIN_STATUS_LABELS['In Progress'] },
                        { key: 'Resolved', label: ADMIN_STATUS_LABELS['Resolved'] },
                      ].map((st) => (
                        <button
                          key={st.key}
                          type="button"
                          disabled={statusUpdating}
                          onClick={() => handleStatusChange(st.key)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            data.status === st.key
                              ? st.key === 'Resolved'
                                ? 'bg-teal text-sand shadow-sm'
                                : st.key === 'In Progress'
                                ? 'bg-amber-600 text-white shadow-sm'
                                : 'bg-deep text-sand shadow-sm'
                              : 'text-ink/70 hover:bg-sand/40'
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-muted flex items-center gap-1 font-kreon">
                    <Calendar className="w-4 h-4 text-teal" />
                    <span>{formatAdminDate(data.createdAt, true)}</span>
                  </div>
                </div>

                {/* Complaint Details Card if applicable */}
                {data.complaintDetails && (
                  <div className="p-5 rounded-2xl bg-sand/50 border border-line space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase">
                      <ShieldAlert className="w-4 h-4 text-red-600" />
                      <span>{t('admin.drawer.complaintDetails')}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-muted">{t('admin.drawer.category')}</span>
                        <div className="font-semibold text-ink mt-0.5">
                          {ADMIN_COMPLAINT_CATEGORY_LABELS[data.complaintDetails.category] ||
                            data.complaintDetails.category ||
                            t('admin.drawer.notSpecified')}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted">{t('admin.drawer.concernedDepartment')}</span>
                        <div className="font-semibold text-ink mt-0.5" dir="auto">
                          {data.complaintDetails.concernedParty || t('admin.drawer.notSpecified')}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted">{t('admin.drawer.incidentDate')}</span>
                        <div className="font-semibold text-ink mt-0.5">
                          {data.complaintDetails.incidentDate
                            ? formatAdminDate(data.complaintDetails.incidentDate)
                            : t('admin.drawer.notSpecified')}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Suggestion Details Card if applicable */}
                {data.suggestionDetails && (
                  <div className="p-5 rounded-2xl bg-sand/50 border border-line space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-teal uppercase">
                      <Lightbulb className="w-4 h-4 text-green-brand" />
                      <span>{t('admin.drawer.suggestionDetails')}</span>
                    </div>
                    <div className="text-xs space-y-2">
                      <div>
                        <span className="text-muted">{t('admin.drawer.proposalTitle')}</span>
                        <div className="font-semibold text-ink mt-0.5" dir="auto">
                          {data.suggestionDetails.title}
                        </div>
                      </div>
                      {data.suggestionDetails.expectedImprovement && (
                        <div>
                          <span className="text-muted">{t('admin.drawer.expectedImprovement')}</span>
                          <div className="text-ink/80 mt-0.5" dir="auto">
                            {data.suggestionDetails.expectedImprovement}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Main Written Description (dir="auto") */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-ink/70 uppercase tracking-wider">
                    {t('admin.drawer.writtenContent')}
                  </h4>
                  <div
                    className="p-5 rounded-2xl bg-sand/30 border border-line text-sm leading-relaxed whitespace-pre-wrap text-start"
                    dir="auto"
                  >
                    {data.description}
                  </div>
                </div>

                {/* Internal Administrative Notes */}
                <div className="space-y-4 pt-4 border-t border-line">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-base text-teal">
                      {t('admin.drawer.internalNotes')}
                    </h4>
                    <span className="text-xs text-muted">
                      {t('admin.drawer.internalNotesSub')}
                    </span>
                  </div>

                  {/* Add Note Form */}
                  <form onSubmit={handleAddNote} className="space-y-2">
                    <textarea
                      rows={2}
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder={t('admin.drawer.addNotePlaceholder')}
                      className="w-full p-3 text-xs rounded-xl border border-line focus:outline-none focus:ring-1 focus:ring-teal bg-white"
                      dir="auto"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={noteSubmitting || !newNote.trim()}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal hover:bg-deep text-sand text-xs font-semibold disabled:opacity-50 transition-colors"
                      >
                        {noteSubmitting ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Send className="w-3.5 h-3.5" />
                        )}
                        <span>{t('admin.drawer.saveNote')}</span>
                      </button>
                    </div>
                  </form>

                  {/* Notes List */}
                  <div className="space-y-2.5 max-h-48 overflow-y-auto">
                    {data.notes && data.notes.length > 0 ? (
                      data.notes.map((note: any) => (
                        <div
                          key={note.id}
                          className="p-3 rounded-xl bg-white border border-line text-xs space-y-1 shadow-2xs"
                        >
                          <div className="flex items-center justify-between text-muted text-[10px]">
                            <span className="font-semibold text-teal" dir="ltr">{note.authorEmail}</span>
                            <span className="font-kreon">{formatAdminDate(note.createdAt, true)}</span>
                          </div>
                          <p className="text-ink/80 whitespace-pre-wrap" dir="auto">{note.body}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-muted italic py-2">
                        {t('admin.drawer.noNotes')}
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Change Audit Trail */}
                <div className="space-y-3 pt-4 border-t border-line">
                  <h4 className="font-serif font-bold text-base text-teal flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-brand" />
                    <span>{t('admin.drawer.auditTrail')}</span>
                  </h4>
                  <div className="space-y-2">
                    {data.statusHistory && data.statusHistory.length > 0 ? (
                      data.statusHistory.map((hist: any) => (
                        <div
                          key={hist.id}
                          className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-sand/30 border border-line/60"
                        >
                          <div>
                            <span className="font-semibold text-ink">
                              {ADMIN_STATUS_LABELS[hist.previousStatus] || hist.previousStatus} ← {ADMIN_STATUS_LABELS[hist.newStatus] || hist.newStatus}
                            </span>
                            <span className="text-muted ms-2" dir="ltr">({hist.changedBy})</span>
                          </div>
                          <span className="text-[10px] text-muted font-kreon">
                            {formatAdminDate(hist.createdAt, true)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-muted italic">
                        {t('admin.drawer.initialCreated')}
                      </div>
                    )}
                  </div>
                </div>

                {/* Delete Destructive Action */}
                <div className="pt-6 border-t border-line flex justify-end">
                  <button
                    type="button"
                    onClick={() => setDeleteDialogOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{t('admin.drawer.deleteSubmission')}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        title={t('admin.submissions.deleteConfirmTitle')}
        message={t('admin.submissions.deleteConfirmMsg', {
          ref: data?.referenceId || '',
        })}
        confirmLabel={t('admin.submissions.confirmDeleteBtn')}
        cancelLabel={t('admin.submissions.cancelBtn')}
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialogOpen(false)}
        isLoading={deleting}
      />
    </>
  );
}
