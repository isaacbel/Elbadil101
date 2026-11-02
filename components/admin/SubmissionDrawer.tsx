'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  MapPin,
  Building,
  ShieldAlert,
  Lightbulb,
  Trash2,
  Clock,
  Send,
  Loader2,
  Tag,
} from 'lucide-react';
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

  const handlePriorityChange = async (newPriority: string) => {
    try {
      const res = await fetch(`/api/admin/submissions/${data.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priority: newPriority }),
      });
      if (res.ok) {
        setData((prev: any) => ({ ...prev, priority: newPriority }));
        onUpdated();
      }
    } catch (err) {
      console.error('Failed to update priority:', err);
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

  // Check if string contains Arabic characters for RTL-aware rendering in admin
  const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text || '');

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

        <div className="fixed inset-y-0 right-0 max-w-2xl w-full bg-white shadow-2xl flex flex-col z-10 border-l border-line animate-fade-in">
          {/* Header */}
          <div className="p-5 px-6 bg-teal text-sand flex items-center justify-between border-b border-white/10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 text-sand">
                  {data?.referenceId || 'Loading...'}
                </span>
                {data?.type && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-wheat text-teal capitalize">
                    <Tag className="w-3 h-3" />
                    {data.type}
                  </span>
                )}
              </div>
              <div className="text-sm font-serif font-bold text-sand truncate max-w-md">
                {data?.subject || 'Submission Details'}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 text-sand hover:bg-white/20 transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 text-ink">
            {loading || !data ? (
              <div className="flex items-center justify-center py-20 text-muted">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                <span>Loading record...</span>
              </div>
            ) : (
              <>
                {/* Status & Priority Control Toolbar */}
                <div className="p-4 rounded-2xl bg-sand/40 border border-line flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-ink/70 uppercase tracking-wider mb-1">
                      Status
                    </label>
                    <div className="inline-flex rounded-xl bg-white p-1 border border-line shadow-sm">
                      {['Pending', 'In Progress', 'Resolved'].map((st) => (
                        <button
                          key={st}
                          type="button"
                          disabled={statusUpdating}
                          onClick={() => handleStatusChange(st)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            data.status === st
                              ? st === 'Resolved'
                                ? 'bg-teal text-sand shadow-sm'
                                : st === 'In Progress'
                                ? 'bg-amber-600 text-white shadow-sm'
                                : 'bg-deep text-sand shadow-sm'
                              : 'text-ink/70 hover:bg-sand/40'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-ink/70 uppercase tracking-wider mb-1">
                      Priority
                    </label>
                    <select
                      value={data.priority}
                      onChange={(e) => handlePriorityChange(e.target.value)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-line bg-white focus:outline-none focus:ring-1 focus:ring-teal"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                {/* Submission Metadata (Locked Location & Info) */}
                <div className="p-5 rounded-2xl bg-white border border-line shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal">
                      Submission Overview
                    </span>
                    <span className="text-[11px] font-mono text-muted flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-muted" />
                      {new Date(data.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-sand/30 border border-line/60">
                      <MapPin className="w-4 h-4 text-green-brand flex-shrink-0" />
                      <div>
                        <div className="text-[10px] text-muted">Fixed Wilaya &amp; Commune</div>
                        <div className="font-semibold text-teal">
                          {data.wilaya || '18 - جيجل (Jijel)'} · {data.commune || 'الطاهير (Taher)'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-sand/30 border border-line/60">
                      <Building className="w-4 h-4 text-teal flex-shrink-0" />
                      <div>
                        <div className="text-[10px] text-muted">Entity / Organization</div>
                        <div className="font-semibold text-ink">
                          {data.organization || 'Individual Citizen (Anonymous)'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Complaint Details Card if applicable */}
                {data.complaintDetails && (
                  <div className="p-5 rounded-2xl bg-sand/50 border border-line space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase">
                      <ShieldAlert className="w-4 h-4 text-red-600" />
                      <span>Complaint Specific Details</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-muted">Category:</span>
                        <div className="font-semibold text-ink mt-0.5">
                          {data.complaintDetails.category || 'General'}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted">Concerned Department:</span>
                        <div className="font-semibold text-ink mt-0.5">
                          {data.complaintDetails.concernedParty || 'Not specified'}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted">Incident Date:</span>
                        <div className="font-semibold text-ink mt-0.5">
                          {data.complaintDetails.incidentDate || 'Not specified'}
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
                      <span>Suggestion Specific Details</span>
                    </div>
                    <div className="text-xs space-y-2">
                      <div>
                        <span className="text-muted">Proposal Title:</span>
                        <div className="font-semibold text-ink mt-0.5">
                          {data.suggestionDetails.title}
                        </div>
                      </div>
                      {data.suggestionDetails.expectedImprovement && (
                        <div>
                          <span className="text-muted">Expected Improvement:</span>
                          <div className="text-ink/80 mt-0.5">
                            {data.suggestionDetails.expectedImprovement}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Main Written Description (RTL-aware) */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-ink/70 uppercase tracking-wider">
                    Written Request Content
                  </h4>
                  <div
                    className={`p-5 rounded-2xl bg-sand/30 border border-line text-sm leading-relaxed whitespace-pre-wrap ${
                      isArabic(data.description) ? 'font-naskh text-start' : 'text-start'
                    }`}
                    dir={isArabic(data.description) ? 'rtl' : 'ltr'}
                  >
                    {data.description}
                  </div>
                </div>

                {/* Internal Administrative Notes */}
                <div className="space-y-4 pt-4 border-t border-line">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-base text-teal">
                      Internal Administrative Notes
                    </h4>
                    <span className="text-xs text-muted">
                      Private to campaign staff
                    </span>
                  </div>

                  {/* Add Note Form */}
                  <form onSubmit={handleAddNote} className="space-y-2">
                    <textarea
                      rows={2}
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add an internal note or action update..."
                      className="w-full p-3 text-xs rounded-xl border border-line focus:outline-none focus:ring-1 focus:ring-teal bg-white"
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
                        <span>Save Note</span>
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
                            <span className="font-semibold text-teal">{note.authorEmail}</span>
                            <span>{new Date(note.createdAt).toLocaleString()}</span>
                          </div>
                          <p className="text-ink/80 whitespace-pre-wrap">{note.body}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-muted italic py-2">
                        No administrative notes recorded yet.
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Change Audit Trail */}
                <div className="space-y-3 pt-4 border-t border-line">
                  <h4 className="font-serif font-bold text-base text-teal flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-brand" />
                    <span>Audit Trail &amp; Status History</span>
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
                              {hist.previousStatus} → {hist.newStatus}
                            </span>
                            <span className="text-muted ml-2">by {hist.changedBy}</span>
                          </div>
                          <span className="text-[10px] text-muted">
                            {new Date(hist.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-muted italic">
                        Initial record created.
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
                    <span>Delete Submission</span>
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
        title="Delete Submission Record"
        message={`Are you sure you want to permanently delete submission ${data?.referenceId}? All associated notes and audit history will be permanently deleted.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialogOpen(false)}
        isLoading={deleting}
      />
    </>
  );
}
