'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FileText, CreditCard, Fingerprint, Building2, Briefcase,
  BookOpen, Scale, PiggyBank, Shield, ArrowRight, Zap, Star
} from 'lucide-react'

const CATEGORIES = [
  { id: 'all', label: 'All Services' },
  { id: 'income-tax', label: 'Income Tax' },
  { id: 'gst', label: 'GST' },
  { id: 'identity', label: 'PAN & Aadhaar' },
  { id: 'govt', label: 'Govt Certificates' },
  { id: 'business', label: 'Business' },
  { id: 'accounting', label: 'Accounting' },
  { id: 'legal', label: 'Legal' },
  { id: 'loans', label: 'Loans' },
]

const SERVICES = [
  {
    id: 's1', cat: 'income-tax', icon: FileText,
    title: 'ITR-1 Filing', hindi: 'सैलरी ITR',
    desc: 'For salaried employees with single Form-16',
    price: '₹99', agentPrice: '₹500–₹1,500',
    badge: 'Most Popular', badgeColor: 'bg-amber-100 text-amber-700',
    time: '24 hrs', href: '/services/itr-1',
    highlight: true,
  },
  {
    id: 's2', cat: 'gst', icon: Building2,
    title: 'GST Registration', hindi: 'GST पंजीकरण',
    desc: 'New GSTIN for your business, ARN tracking',
    price: '₹499', agentPrice: '₹1,500–₹3,000',
    badge: 'High Demand', badgeColor: 'bg-blue-100 text-blue-700',
    time: '6 hrs', href: '/services/gst-registration',
  },
  {
    id: 's3', cat: 'identity', icon: CreditCard,
    title: 'PAN Application', hindi: 'नया PAN कार्ड',
    desc: 'New PAN card or correction / reprint',
    price: '₹149', agentPrice: '₹300–₹800',
    badge: 'Easy', badgeColor: 'bg-green-100 text-green-700',
    time: 'Same day', href: '/services/pan',
  },
  {
    id: 's4', cat: 'identity', icon: Fingerprint,
    title: 'PAN–Aadhaar Linking', hindi: 'PAN-Aadhaar लिंक',
    desc: 'Link PAN with Aadhaar, resolve mismatches',
    price: '₹49', agentPrice: '₹150–₹400',
    badge: 'Deadline', badgeColor: 'bg-red-100 text-red-700',
    time: '1 hr', href: '/services/pan-aadhaar-link',
  },
  {
    id: 's5', cat: 'identity', icon: Fingerprint,
    title: 'Aadhaar Update', hindi: 'आधार अपडेट',
    desc: 'Name, address, DOB, mobile update guidance',
    price: '₹99', agentPrice: '₹200–₹500',
    badge: 'Popular', badgeColor: 'bg-purple-100 text-purple-700',
    time: '2 hrs', href: '/services/aadhaar-update',
  },
  {
    id: 's6', cat: 'income-tax', icon: FileText,
    title: 'ITR-2 Filing', hindi: 'कैपिटल गेन्स ITR',
    desc: 'Capital gains, multiple properties, FD income',
    price: '₹299', agentPrice: '₹999–₹2,000',
    badge: 'CA Verified', badgeColor: 'bg-indigo-100 text-indigo-700',
    time: '48 hrs', href: '/services/itr-2',
  },
  {
    id: 's7', cat: 'govt', icon: Shield,
    title: 'EPF / PF Services', hindi: 'PF सेवाएं',
    desc: 'Withdrawal, transfer, UAN activation',
    price: '₹199', agentPrice: '₹400–₹1,000',
    badge: 'High Demand', badgeColor: 'bg-blue-100 text-blue-700',
    time: '48 hrs', href: '/services/epf',
  },
  {
    id: 's8', cat: 'govt', icon: Shield,
    title: 'Passport Assistance', hindi: 'पासपोर्ट सहायता',
    desc: 'Apply, renew, Tatkal — document guidance',
    price: '₹349', agentPrice: '₹700–₹2,000',
    badge: 'Popular', badgeColor: 'bg-purple-100 text-purple-700',
    time: '24 hrs', href: '/services/passport',
  },
  {
    id: 's9', cat: 'business', icon: Briefcase,
    title: 'MSME / Udyam Reg.', hindi: 'उद्यम पंजीकरण',
    desc: 'Certificate for small businesses',
    price: '₹299', agentPrice: '₹500–₹1,500',
    badge: 'Easy', badgeColor: 'bg-green-100 text-green-700',
    time: '2 hrs', href: '/services/msme',
  },
  {
    id: 's10', cat: 'legal', icon: Scale,
    title: 'Rent Agreement', hindi: 'किराया समझौता',
    desc: '11-month or long-term rent agreement drafting',
    price: '₹299', agentPrice: '₹500–₹1,500',
    badge: 'Templated', badgeColor: 'bg-teal-100 text-teal-700',
    time: '2 hrs', href: '/services/rent-agreement',
  },
  {
    id: 's11', cat: 'loans', icon: PiggyBank,
    title: 'CIBIL Score Review', hindi: 'क्रेडिट स्कोर',
    desc: 'Fetch, explain & dispute CIBIL errors',
    price: '₹199', agentPrice: '₹400–₹1,000',
    badge: 'Popular', badgeColor: 'bg-purple-100 text-purple-700',
    time: 'Same day', href: '/services/cibil',
  },
  {
    id: 's12', cat: 'income-tax', icon: FileText,
    title: 'Tax Notice Reply', hindi: 'टैक्स नोटिस',
    desc: '143(1), 148, 139(9) notice response',
    price: '₹599', agentPrice: '₹2,000–₹5,000',
    badge: 'CA Required', badgeColor: 'bg-orange-100 text-orange-700',
    time: '5 days', href: '/services/notice-reply',
  },
]

export default function ServicesSection() {
  const [activeCat, setActiveCat] = useState('all')

  const filtered = activeCat === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.cat === activeCat)

  return (
    <section className="py-20 lg:py-28 bg-[#FAFBFC]" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Zap size={16} className="text-brand-amber" />
            <span className="text-sm font-semibold text-brand-amber uppercase tracking-widest">95+ Services</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-ink mb-4">
            Every Service You Need,
            <br />
            <span className="text-brand-teal">One Platform</span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
            From ₹49 PAN-Aadhaar linking to ₹5,999 company registration — all at 60–80% less than local agents.
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-200
                ${activeCat === cat.id
                  ? 'bg-brand-teal text-white border-brand-teal shadow-sm shadow-brand-teal/20'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-brand-teal/40 hover:text-brand-teal hover:bg-brand-surface'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.id}
                href={service.href}
                className={`service-card group rounded-2xl border p-5 block
                  ${service.highlight
                    ? 'bg-brand-teal border-brand-teal text-white shadow-lg shadow-brand-teal/20'
                    : 'bg-white border-gray-200 hover:shadow-lg'
                  }`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                    ${service.highlight ? 'bg-white/20' : 'bg-brand-surface'}`}>
                    <Icon size={20} className={service.highlight ? 'text-white' : 'text-brand-teal'} />
                  </div>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${service.highlight ? 'bg-brand-amber text-white' : service.badgeColor}`}>
                    {service.badge}
                  </span>
                </div>

                {/* Title */}
                <div className={`font-semibold text-sm leading-snug mb-0.5 ${service.highlight ? 'text-white' : 'text-brand-ink'}`}>
                  {service.title}
                </div>
                <div className={`text-xs mb-2 ${service.highlight ? 'text-white/70' : 'text-gray-400'}`}>
                  {service.hindi}
                </div>

                {/* Desc */}
                <p className={`text-xs leading-relaxed mb-4 ${service.highlight ? 'text-white/80' : 'text-gray-500'}`}>
                  {service.desc}
                </p>

                {/* Price row */}
                <div className="flex items-end justify-between mt-auto">
                  <div>
                    <div className={`font-display font-bold text-xl ${service.highlight ? 'text-white' : 'text-brand-teal'}`}>
                      {service.price}
                    </div>
                    <div className={`text-[10px] line-through ${service.highlight ? 'text-white/50' : 'text-gray-400'}`}>
                      Agent: {service.agentPrice}
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-lg
                    ${service.highlight ? 'bg-white/20 text-white' : 'bg-brand-surface text-brand-teal'}`}>
                    ⏱ {service.time}
                  </div>
                </div>

                {/* Arrow */}
                <div className={`flex items-center gap-1 text-xs font-medium mt-3 pt-3 border-t
                  ${service.highlight ? 'border-white/20 text-white/80 group-hover:text-white' : 'border-gray-100 text-brand-teal group-hover:text-brand-teal2'}`}>
                  Start this service
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl border-2 border-brand-teal text-brand-teal font-semibold hover:bg-brand-teal hover:text-white transition-all duration-200"
          >
            View All 95 Services
            <ArrowRight size={16} />
          </Link>
          <p className="text-gray-400 text-xs mt-3">Including GST returns, audits, legal notices, company registration & more</p>
        </div>
      </div>
    </section>
  )
}
