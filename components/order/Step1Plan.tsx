'use client'

import { Check, Clock, Shield, Star, ChevronRight } from 'lucide-react'
import type { Service, ServicePlan } from '@/lib/services'
import type { OrderState } from './OrderFlow'

interface Props {
  service:  Service
  order:    OrderState
  onUpdate: (patch: Partial<OrderState>) => void
  onNext:   () => void
}

export default function Step1Plan({ service, order, onUpdate, onNext }: Props) {
  const selected = order.selectedPlan

  function selectPlan(plan: ServicePlan) {
    onUpdate({ selectedPlan: plan })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Left — plan selection (2/3) */}
      <div className="lg:col-span-2 space-y-4">

        {/* Service header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="text-3xl flex-shrink-0">{service.emoji}</div>
            <div>
              <h1 className="font-display font-bold text-xl text-gray-900">{service.name}</h1>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">{service.tagline}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock size={13} className="text-brand-teal" />
                  Delivered in {service.sla}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Shield size={13} className="text-brand-teal" />
                  {service.caRequired ? 'CA verified' : 'Expert guided'}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Star size={13} className="text-brand-amber fill-brand-amber" />
                  4.8 · Agent charges {service.agentPrice}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plan cards */}
        <div>
          <h2 className="font-semibold text-gray-800 text-sm mb-3">Choose a plan</h2>
          <div className="space-y-3">
            {service.plans.map((plan, i) => {
              const isSelected = selected?.id === plan.id
              const isPopular  = i === 0

              return (
                <button
                  key={plan.id}
                  onClick={() => selectPlan(plan)}
                  className={`w-full text-left rounded-2xl border-2 p-4 sm:p-5 transition-all duration-150
                    ${isSelected
                      ? 'border-brand-teal bg-brand-teal/[0.03] shadow-sm'
                      : 'border-gray-200 bg-white hover:border-brand-teal/40 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-semibold text-sm ${isSelected ? 'text-brand-teal' : 'text-gray-800'}`}>
                          {plan.name}
                        </span>
                        {isPopular && service.plans.length > 1 && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-amber text-white">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-3">{plan.desc}</p>
                      <ul className="space-y-1">
                        {plan.includes.map(item => (
                          <li key={item} className="flex items-center gap-2 text-xs text-gray-600">
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0
                              ${isSelected ? 'bg-brand-teal text-white' : 'bg-gray-100 text-gray-500'}`}>
                              <Check size={9} strokeWidth={3} />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <div className={`font-display font-bold text-2xl ${isSelected ? 'text-brand-teal' : 'text-gray-800'}`}>
                        ₹{plan.price}
                      </div>
                      <div className="text-[10px] text-gray-400 line-through mt-0.5">
                        vs {service.agentPrice}
                      </div>
                      {/* Selection indicator */}
                      <div className={`mt-3 w-6 h-6 rounded-full border-2 flex items-center justify-center ml-auto transition-all
                        ${isSelected
                          ? 'bg-brand-teal border-brand-teal'
                          : 'border-gray-300'}`}
                      >
                        {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* FAQs */}
        {service.faqs.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-sm text-gray-700 mb-3">Common questions</h3>
            <div className="space-y-3">
              {service.faqs.map(faq => (
                <div key={faq.q}>
                  <p className="text-xs font-semibold text-gray-700 mb-0.5">{faq.q}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right — summary sidebar (1/3) */}
      <div className="space-y-4">
        {/* Order summary card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-20">
          <h3 className="font-semibold text-sm text-gray-800 mb-4">Order Summary</h3>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Service</span>
              <span className="font-medium text-gray-800 text-right max-w-[150px]">{service.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Plan</span>
              <span className="font-medium text-gray-800">{selected?.name ?? '—'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery</span>
              <span className="font-medium text-gray-800">{service.sla}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">Total</span>
              <span className="font-display font-bold text-2xl text-brand-teal">
                {selected ? `₹${selected.price}` : '—'}
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Pay only at next step · No hidden fees</p>
          </div>

          <button
            onClick={onNext}
            disabled={!selected}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all
              ${selected
                ? 'bg-brand-teal text-white hover:bg-brand-teal2 shadow-md shadow-brand-teal/20 hover:-translate-y-0.5'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            Continue to Documents
            <ChevronRight size={16} />
          </button>

          <div className="mt-4 space-y-2">
            {[
              { icon: Shield, text: 'Secure 256-bit encryption' },
              { icon: Clock,  text: `Delivered in ${service.sla}` },
              { icon: Star,   text: '4.8★ avg customer rating' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-[11px] text-gray-400">
                <Icon size={12} className="text-brand-green flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Agent comparison pill */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
          <p className="text-xs font-semibold text-amber-800 mb-1">vs. Local Agent</p>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-amber-700 line-through">{service.agentPrice}</div>
              <div className="text-xs text-amber-700">Agent charges</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-brand-green text-sm">Save 60–80%</div>
              <div className="text-xs text-gray-500">with JanSamaadhan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
