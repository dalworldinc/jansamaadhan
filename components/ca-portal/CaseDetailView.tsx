'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, FileText, CheckCircle, AlertCircle,
  MessageCircle, Phone, Edit2, Save, X, Send,
  Download, Eye, Loader2, ShieldCheck
} from 'lucide-react'
import { STATUS_META, type CACase, type TimelineEvent } from '@/lib/caData'

interface Props {
  initialCase: CACase
}

const ACTOR_META: Record<TimelineEvent['actor'], { label: string; bg: string; color: string }> = {
  system:   { label: 'System',   bg: 'bg-gray-100',        color: 'text-gray-400' },
  ca:       { label: 'You',      bg: 'bg-brand-teal',      color: 'text-white' },
  customer: { label: 'Customer', bg: 'bg-brand-amber',     color: 'text-white' },
}

export default function CaseDetailView({ initialCase }: Props) {
  const [c, setC] = useState<CACase>(initialCase)

  // ── Notes ──────────────────────────────────────────────────────
  const [notesEditing, setNotesEditing] = useState(false)
  const [notesDraft,   setNotesDraft]   = useState(c.notes)
  const [notesSaving,  setNotesSaving]  = useState(false)

  async function saveNotes() {
    setNotesSaving(true)
    await new Promise(r => setTimeout(r, 500))
    setC(prev => ({ ...prev, notes: notesDraft }))
    setNotesSaving(false)
    setNotesEditing(false)
  }

  // ── Request documents ─────────────────────────────────────────
  const [requestOpen,    setRequestOpen]    = useState(false)
  const [requestMsg,     setRequestMsg]     = useState('')
  const [requestSelected,setRequestSelected]= useState<Set<string>>(new Set())
  const [requestSending, setRequestSending] = useState(false)
  const [requestSent,    setRequestSent]    = useState(false)

  const missingDocs = c.docs.filter(d => d.required && !d.uploaded)

  function toggleDoc(id: string) {
    setRequestSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  async function sendRequest() {
    if (requestSelected.size === 0) return
    setRequestSending(true)
    await new Promise(r => setTimeout(r, 700))

    const names = c.docs.filter(d => requestSelected.has(d.id)).map(d => d.name).join(', ')
    const event: TimelineEvent = {
      time:  'Just now',
      event: `Requested from customer: ${names}${requestMsg ? ` — "${requestMsg}"` : ''}`,
      actor: 'ca',
    }

    setC(prev => ({
      ...prev,
      status:   prev.status === 'new' || prev.status === 'in_progress' ? 'docs_requested' : prev.status,
      timeline: [...prev.timeline, event],
    }))

    setRequestSending(false)
    setRequestSent(true)
    setRequestSelected(new Set())
    setRequestMsg('')
    setTimeout(() => { setRequestSent(false); setRequestOpen(false) }, 1800)
  }

  // ── Mark complete ─────────────────────────────────────────────
  const [completeOpen,  setCompleteOpen]  = useState(false)
  const [ackInput,      setAckInput]      = useState('')
  const [completing,    setCompleting]    = useState(false)

  const allRequiredUploaded = c.docs.filter(d => d.required).every(d => d.uploaded)
  const isCompleted = c.status === 'completed'

  async function markComplete() {
    setCompleting(true)
    await new Promise(r => setTimeout(r, 900))

    const ack = ackInput.trim() || `ACK-${c.orderId.replace('ORD-', '')}-${Date.now().toString().slice(-5)}`
    const event: TimelineEvent = { time: 'Just now', event: `Marked completed — Ack: ${ack}`, actor: 'ca' }

    setC(prev => ({
      ...prev,
      status:   'completed',
      ackNo:    ack,
      timeline: [...prev.timeline, event],
    }))

    setCompleting(false)
    setCompleteOpen(false)
  }

  const st = STATUS_META[c.status]

  return (
    <div className="space-y-5 max-w-5xl">

      {/* Back link */}
      <Link
        href="/ca-portal/cases"
        className="inline-flex items-center gap-1.5 text-gray-400 hover:text-brand-teal text-sm transition-colors group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to Case Queue
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-4">
            <div className="text-3xl flex-shrink-0">{c.emoji}</div>
            <div>
              <h1 className="font-display font-bold text-xl text-gray-900">{c.service}</h1>
              <p className="text-xs text-gray-400 font-mono mt-0.5">{c.orderId} · Assigned {c.assignedAt}</p>
              <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${st.bg} ${st.color} ${st.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                  {st.label}
                </span>
                {c.priority === 'high' && !isCompleted && (
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-600">Urgent</span>
                )}
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-display font-bold text-2xl text-brand-teal">₹{c.caShare}</div>
            <div className="text-[11px] text-gray-400 mt-0.5">Your payout · Customer paid ₹{c.price}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Main column */}
        <div className="lg:col-span-2 space-y-4">

          {/* Documents */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm text-gray-800">Documents</h3>
              <span className="text-xs text-gray-400">
                {c.docs.filter(d => d.uploaded).length}/{c.docs.length} uploaded
              </span>
            </div>
            <div className="space-y-2">
              {c.docs.map(doc => (
                <div
                  key={doc.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border
                    ${doc.uploaded ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                    ${doc.uploaded ? 'bg-green-100' : 'bg-red-100'}`}>
                    <FileText size={14} className={doc.uploaded ? 'text-green-600' : 'text-red-400'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-medium truncate ${doc.uploaded ? 'text-gray-700' : 'text-red-600'}`}>
                      {doc.name}
                      {!doc.required && <span className="ml-1.5 text-[10px] text-gray-300">Optional</span>}
                    </div>
                    {doc.uploaded && doc.size !== '—' && (
                      <div className="text-[10px] text-gray-400">{doc.size}</div>
                    )}
                  </div>
                  {doc.uploaded ? (
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-brand-teal hover:bg-white transition-all" title="View">
                        <Eye size={13} />
                      </button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-brand-teal hover:bg-white transition-all" title="Download">
                        <Download size={13} />
                      </button>
                      <CheckCircle size={15} className="text-brand-green flex-shrink-0 ml-1" />
                    </div>
                  ) : (
                    <span className="text-[10px] font-semibold text-red-500 flex-shrink-0">Missing</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CA notes */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-gray-800">Your Notes</h3>
              {notesEditing ? (
                <div className="flex gap-2">
                  <button onClick={() => { setNotesDraft(c.notes); setNotesEditing(false) }} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                    <X size={14} />
                  </button>
                  <button onClick={saveNotes} disabled={notesSaving} className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-teal text-white text-xs font-semibold rounded-lg hover:bg-brand-teal2 transition-colors disabled:opacity-60">
                    {notesSaving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                    Save
                  </button>
                </div>
              ) : (
                <button onClick={() => setNotesEditing(true)} className="flex items-center gap-1.5 text-xs font-medium text-brand-teal hover:text-brand-teal2 transition-colors">
                  <Edit2 size={13} /> Edit
                </button>
              )}
            </div>
            {notesEditing ? (
              <textarea
                rows={4}
                value={notesDraft}
                onChange={e => setNotesDraft(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-brand-teal transition-colors bg-white resize-none"
              />
            ) : (
              <p className="text-sm text-gray-600 leading-relaxed">{c.notes}</p>
            )}
          </div>

          {/* Customer note */}
          {c.customerNote && (
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-[11px] font-semibold text-blue-700 mb-1 uppercase tracking-wider">Note from customer</p>
              <p className="text-sm text-blue-800 leading-relaxed">&ldquo;{c.customerNote}&rdquo;</p>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-sm text-gray-800 mb-4">Activity Timeline</h3>
            <div className="space-y-0">
              {c.timeline.map((step, i) => {
                const isLast = i === c.timeline.length - 1
                const actor  = ACTOR_META[step.actor]
                return (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${actor.bg}`}>
                        <span className={`text-[9px] font-bold ${actor.color}`}>{actor.label[0]}</span>
                      </div>
                      {!isLast && <div className="w-px flex-1 my-1 bg-gray-100" />}
                    </div>
                    <div className="pb-4 pt-0.5">
                      <p className="text-sm text-gray-700 leading-relaxed">{step.event}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{step.time} · {actor.label}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">

          {/* Customer */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
            <h3 className="font-semibold text-sm text-gray-800">Customer</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-teal flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {c.customerName.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{c.customerName}</p>
                <p className="text-xs text-gray-400 truncate">{c.customerCity}</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <Phone size={12} className="text-brand-teal" /> {c.customerPhone}
            </div>
            <a
              href={`https://wa.me/${c.customerPhone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-green-500 text-white text-xs font-semibold hover:bg-green-600 transition-all"
            >
              <MessageCircle size={14} /> Message on WhatsApp
            </a>
          </div>

          {/* Case summary */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-2.5">
            <h3 className="font-semibold text-sm text-gray-800 mb-1">Case Summary</h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Customer paid</span>
              <span className="text-gray-700">₹{c.price}</span>
            </div>
            <div className="flex justify-between text-sm border-b border-gray-100 pb-2.5">
              <span className="text-gray-500">Your payout</span>
              <span className="font-bold text-brand-teal">₹{c.caShare}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">SLA</span>
              <span className="text-gray-700">{c.slaLabel}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Due by</span>
              <span className="font-semibold text-gray-800">{c.dueBy}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Category</span>
              <span className="text-gray-700">{c.category}</span>
            </div>
            {c.ackNo && (
              <div className="rounded-xl bg-green-50 border border-green-200 p-3 mt-2">
                <p className="text-[11px] font-semibold text-green-700 mb-0.5">Acknowledgement</p>
                <p className="text-xs font-mono font-bold text-green-800">{c.ackNo}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          {!isCompleted ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
              <h3 className="font-semibold text-sm text-gray-800">Actions</h3>

              {/* Request documents */}
              {missingDocs.length > 0 && (
                <div>
                  <button
                    onClick={() => setRequestOpen(o => !o)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:border-brand-teal hover:text-brand-teal transition-all"
                  >
                    <AlertCircle size={15} /> Request Documents
                  </button>

                  {requestOpen && (
                    <div className="mt-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-3">
                      {requestSent ? (
                        <p className="text-xs font-semibold text-brand-green flex items-center gap-1.5">
                          <CheckCircle size={14} /> Request sent to customer
                        </p>
                      ) : (
                        <>
                          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Select missing documents</p>
                          <div className="space-y-1.5">
                            {missingDocs.map(d => (
                              <label key={d.id} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={requestSelected.has(d.id)}
                                  onChange={() => toggleDoc(d.id)}
                                  className="w-3.5 h-3.5 rounded accent-brand-teal"
                                />
                                {d.name}
                              </label>
                            ))}
                          </div>
                          <textarea
                            rows={2}
                            placeholder="Add a note for the customer (optional)…"
                            value={requestMsg}
                            onChange={e => setRequestMsg(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs outline-none focus:border-brand-teal transition-colors bg-white resize-none"
                          />
                          <button
                            onClick={sendRequest}
                            disabled={requestSelected.size === 0 || requestSending}
                            className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all
                              ${requestSelected.size > 0
                                ? 'bg-brand-teal text-white hover:bg-brand-teal2'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                          >
                            {requestSending ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
                            Send Request
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Mark complete */}
              <div>
                <button
                  onClick={() => setCompleteOpen(o => !o)}
                  disabled={!allRequiredUploaded}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all
                    ${allRequiredUploaded
                      ? 'bg-brand-teal text-white hover:bg-brand-teal2 shadow-sm shadow-brand-teal/20'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                  <CheckCircle size={15} /> Mark as Completed
                </button>
                {!allRequiredUploaded && (
                  <p className="text-[11px] text-gray-400 mt-1.5 text-center">All required documents must be uploaded first.</p>
                )}

                {completeOpen && allRequiredUploaded && (
                  <div className="mt-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                        Acknowledgement / reference no. <span className="text-gray-300 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={ackInput}
                        onChange={e => setAckInput(e.target.value)}
                        placeholder="e.g. ITR-V-2026-114502"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-mono outline-none focus:border-brand-teal transition-colors bg-white"
                      />
                    </div>
                    <button
                      onClick={markComplete}
                      disabled={completing}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-brand-green text-white text-xs font-semibold hover:opacity-90 transition-all disabled:opacity-60"
                    >
                      {completing ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle size={13} />}
                      Confirm Completion
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-green-200 p-5 text-center">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-2.5">
                <CheckCircle size={22} className="text-brand-green" />
              </div>
              <p className="text-sm font-semibold text-gray-800">Case completed</p>
              <p className="text-xs text-gray-400 mt-1">Great work — payout will be included in your next cycle.</p>
            </div>
          )}

          {/* ICAI badge */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
            <ShieldCheck size={11} className="text-brand-green" />
            ICAI verified · Confidential customer data
          </div>
        </div>
      </div>
    </div>
  )
}