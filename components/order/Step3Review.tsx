'use client'

import { CheckCircle, FileText, Edit2, ChevronRight, ChevronLeft, Clock, Shield } from 'lucide-react'
import type { Service } from '@/lib/services'
import type { OrderState } from './OrderFlow'

interface Props {
  service: Service
  order:   OrderState
  onNext:  () => void
  onBack:  () => void
  onEdit:  (step: number) => void
}

export default function Step3Review({ service, order, onNext, onBack, onEdit }: Props) {
  const plan = order.selectedPlan!

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Main review panel */}
      <div className="lg:col-span-2 space-y-4">

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-display font-bold text-lg text-gray-900 mb-1">Review Your Order</h2>
          <p className="text-sm text-gray-400">Check everything looks right before payment.</p>
        </div>

        {/* Service + Plan */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm text-gray-700">Service & Plan</h3>
            <button onClick={() => onEdit(1)} className="flex items-center gap-1 text-xs text-brand-teal hover:underline">
              <Edit2 size={11} /> Edit
            </button>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-brand-surface border border-brand-teal/10">
            <span className="text-2xl">{service.emoji}</span>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{service.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">{plan.desc}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {plan.includes.map(item => (
                  <span key={item} className="inline-flex items-center gap-1 text-[11px] text-brand-teal bg-white border border-brand-teal/20 px-2 py-0.5 rounded-full">
                    <CheckCircle size={9} className="flex-shrink-0" /> {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-display font-bold text-xl text-brand-teal">₹{plan.price}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{plan.name} plan</div>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm text-gray-700">Documents</h3>
            <button onClick={() => onEdit(2)} className="flex items-center gap-1 text-xs text-brand-teal hover:underline">
              <Edit2 size={11} /> Edit
            </button>
          </div>
          <div className="space-y-2">
            {service.docsNeeded.map(doc => {
              const uploaded = order.uploadedDocs[doc.id]
              return (
                <div key={doc.id} className={`flex items-center gap-3 p-3 rounded-xl border
                  ${uploaded ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0
                    ${uploaded ? 'bg-green-100' : 'bg-gray-200'}`}>
                    <FileText size={13} className={uploaded ? 'text-green-600' : 'text-gray-400'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-medium ${uploaded ? 'text-gray-700' : 'text-gray-400'}`}>
                      {doc.label}
                      {!doc.required && <span className="ml-1.5 text-[10px] text-gray-300">Optional</span>}
                    </div>
                    {uploaded && (
                      <div className="text-[10px] text-gray-400 truncate">{uploaded.name}</div>
                    )}
                  </div>
                  {uploaded
                    ? <CheckCircle size={15} className="text-brand-green flex-shrink-0" />
                    : <span className="text-[10px] text-gray-400 flex-shrink-0">Not uploaded</span>
                  }
                </div>
              )
            })}
          </div>
        </div>

        {/* Contact info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm text-gray-700">Your Details</h3>
            <button onClick={() => onEdit(2)} className="flex items-center gap-1 text-xs text-brand-teal hover:underline">
              <Edit2 size={11} /> Edit
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="text-gray-400 w-20 flex-shrink-0 text-xs">Name</span>
              <span className="font-medium text-gray-700">{order.name || '—'}</span>
            </div>
            {order.email && (
              <div className="flex gap-2">
                <span className="text-gray-400 w-20 flex-shrink-0 text-xs">Email</span>
                <span className="text-gray-700">{order.email}</span>
              </div>
            )}
            {order.notes && (
              <div className="flex gap-2">
                <span className="text-gray-400 w-20 flex-shrink-0 text-xs">Notes</span>
                <span className="text-gray-600 text-xs leading-relaxed">{order.notes}</span>
              </div>
            )}
          </div>
        </div>

        {/* Delivery info */}
        <div className="rounded-2xl border border-brand-teal/20 bg-brand-surface p-4 flex items-start gap-3">
          <Clock size={16} className="text-brand-teal flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-brand-teal">Delivery in {service.sla}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Your CA will begin work immediately after payment. You'll receive status updates via SMS and email.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky payment sidebar */}
      <div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-20 space-y-4">
          <h3 className="font-semibold text-sm text-gray-800">Payment Summary</h3>

          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">{service.name}</span>
              <span className="text-gray-700">₹{plan.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Platform fee</span>
              <span className="text-brand-green font-medium">Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">GST</span>
              <span className="text-gray-700">Included</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-2.5">
              <span className="font-semibold text-gray-800">Total</span>
              <span className="font-display font-bold text-2xl text-brand-teal">₹{plan.price}</span>
            </div>
          </div>

          <button
            onClick={onNext}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-amber text-white font-bold text-sm hover:bg-brand-amber2 shadow-md shadow-brand-amber/20 hover:-translate-y-0.5 transition-all"
          >
            Proceed to Pay ₹{plan.price}
            <ChevronRight size={16} />
          </button>

          <button
            onClick={onBack}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm text-gray-500 hover:text-brand-teal border border-gray-200 hover:border-brand-teal/30 transition-all"
          >
            <ChevronLeft size={14} /> Back
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
            <Shield size={11} className="text-brand-green" />
            Secured by Razorpay · 256-bit SSL
          </div>
        </div>
      </div>
    </div>
  )
}
