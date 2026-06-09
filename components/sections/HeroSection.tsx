'use client'

import Link from 'next/link'
import { ArrowRight, Shield, Clock, Star, Users } from 'lucide-react'

const TRUST_BADGES = [
  { icon: Shield, text: 'CA Verified Experts' },
  { icon: Clock, text: '48 Hour Delivery' },
  { icon: Star, text: '4.8★ Rating' },
  { icon: Users, text: '10,000+ Served' },
]

const FLOATING_PILLS = [
  { label: 'ITR Filed ✓', sub: 'Rajesh, Ahmedabad', color: 'bg-green-50 border-green-200 text-green-800', pos: 'top-[18%] left-[6%] lg:left-[3%]', delay: '0ms' },
  { label: 'PAN Linked ✓', sub: 'Priya, Surat', color: 'bg-blue-50 border-blue-200 text-blue-800', pos: 'top-[30%] right-[5%] lg:right-[2%]', delay: '400ms' },
  { label: 'GST Registered ✓', sub: 'Mohan, Pune', color: 'bg-amber-50 border-amber-200 text-amber-800', pos: 'bottom-[28%] left-[5%]', delay: '800ms' },
  { label: 'Saved ₹2,400 ✓', sub: 'vs local agent', color: 'bg-teal-50 border-teal-200 text-teal-800', pos: 'bottom-[18%] right-[5%]', delay: '1200ms' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-hero-mesh pt-16">

      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-teal/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-amber/5 blur-3xl" />
        {/* Grid dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, #1A5F7A 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        {/* Diagonal accent bar */}
        <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-brand-teal/20 via-brand-amber/10 to-transparent" />
      </div>

      {/* Floating notification pills */}
      {FLOATING_PILLS.map((pill) => (
        <div
          key={pill.label}
          className={`hidden lg:flex absolute items-center gap-2.5 ${pill.pos} animate-float`}
          style={{ animationDelay: pill.delay }}
        >
          <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border shadow-lg ${pill.color} backdrop-blur-sm`}>
            <div>
              <div className="text-xs font-semibold leading-none">{pill.label}</div>
              <div className="text-[10px] opacity-70 mt-0.5">{pill.sub}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Hindi eyebrow */}
        <div className="anim-init animate-fade-up delay-100 inline-flex items-center gap-2 mb-6">
          <span className="text-2xl">🇮🇳</span>
          <span className="text-sm font-medium text-brand-teal bg-brand-surface px-4 py-1.5 rounded-full border border-brand-teal/20">
            आपकी सेवा, आपका हक — India's Trusted Compliance Partner
          </span>
        </div>

        {/* Main headline */}
        <h1 className="anim-init animate-fade-up delay-200 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-ink leading-tight mb-4 tracking-tight">
          Tax Filing, PAN, Aadhaar &{' '}
          <br className="hidden sm:block" />
          Government Services
          <br />
          <span className="price-shimmer">at India's Lowest Prices</span>
        </h1>

        {/* Hindi sub */}
        <p className="anim-init animate-fade-up delay-300 font-display text-xl sm:text-2xl text-brand-teal/80 mb-3 font-normal">
          इनकम टैक्स, PAN, आधार — सब कुछ{' '}
          <span className="font-bold text-brand-amber">₹49 से शुरू</span>
        </p>

        {/* English sub */}
        <p className="anim-init animate-fade-up delay-400 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Expert CAs handle your filings while you relax. No hidden fees, no jargon, no stress.
          95+ services covering every compliance need of every Indian.
        </p>

        {/* CTA buttons */}
        <div className="anim-init animate-fade-up delay-500 flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <Link
            href="/register"
            className="cta-glow group flex items-center gap-2 px-8 py-4 bg-brand-amber text-white font-semibold text-base rounded-2xl hover:bg-brand-amber2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          >
            Start for Free — Register Now
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/services"
            className="flex items-center gap-2 px-8 py-4 text-brand-teal font-semibold text-base rounded-2xl border-2 border-brand-teal/30 hover:border-brand-teal hover:bg-brand-surface transition-all"
          >
            See All 95 Services & Prices
          </Link>
        </div>

        {/* Trust badges row */}
        <div className="anim-init animate-fade-up delay-600 flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-16">
          {TRUST_BADGES.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-gray-500">
              <div className="w-7 h-7 rounded-lg bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
                <Icon size={14} className="text-brand-teal" />
              </div>
              <span className="text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>

        {/* Stat cards */}
        <div className="anim-init animate-fade-up delay-700 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {[
            { num: '₹99', label: 'ITR-1 filing starts at', accent: true },
            { num: '48hrs', label: 'Max delivery time' },
            { num: '95+', label: 'Services available' },
            { num: '70%', label: 'Cheaper than agents' },
          ].map(({ num, label, accent }) => (
            <div
              key={label}
              className={`rounded-2xl border p-4 text-center transition-all hover:-translate-y-1
                ${accent
                  ? 'bg-brand-teal text-white border-brand-teal shadow-lg shadow-brand-teal/20'
                  : 'bg-white border-gray-200 shadow-sm hover:border-brand-teal/30'
                }`}
            >
              <div className={`font-display font-bold text-2xl sm:text-3xl ${accent ? 'text-white' : 'text-brand-teal'}`}>
                {num}
              </div>
              <div className={`text-xs mt-1 ${accent ? 'text-white/80' : 'text-gray-500'}`}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="#FAFBFC" />
        </svg>
      </div>
    </section>
  )
}
