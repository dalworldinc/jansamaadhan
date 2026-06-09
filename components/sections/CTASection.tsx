import Link from 'next/link'
import { ArrowRight, FileText, CreditCard, Fingerprint, Building2 } from 'lucide-react'

const QUICK_STARTS = [
  { icon: FileText,    label: 'File ITR-1',    price: '₹99',  href: '/services/itr-1',             color: 'bg-blue-100 text-blue-600' },
  { icon: CreditCard,  label: 'New PAN Card',  price: '₹149', href: '/services/pan',               color: 'bg-green-100 text-green-600' },
  { icon: Fingerprint, label: 'Link PAN+Aadhaar', price: '₹49', href: '/services/pan-aadhaar-link', color: 'bg-purple-100 text-purple-600' },
  { icon: Building2,   label: 'GST Register',  price: '₹499', href: '/services/gst-registration',  color: 'bg-amber-100 text-amber-600' },
]

export default function CTASection() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main CTA box */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-teal via-brand-teal2 to-[#0D3345] px-6 py-14 sm:px-12 sm:py-20 text-center">

          {/* Decorative blobs */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand-amber/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-white/10">
              🇮🇳 &nbsp; Trusted by 10,000+ Indians across 28 states
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Apna Kaam Shuru Karein
              <br />
              <span className="text-brand-amber">— Aaj, Abhi, ₹99 Mein</span>
            </h2>

            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8">
              Registration free hai. Service ke liye pay karo sirf jab aap ready ho.
              No subscription. No hidden charges. Ever.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
              <Link
                href="/register"
                className="group flex items-center gap-2 px-8 py-4 bg-brand-amber text-white font-bold text-base rounded-2xl hover:bg-brand-amber2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Register Free — शुरू करें
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold text-base rounded-2xl border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                Browse All 95 Services
              </Link>
            </div>

            {/* Quick start buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <p className="w-full text-white/50 text-xs mb-1">Quick start →</p>
              {QUICK_STARTS.map(({ icon: Icon, label, price, href, color }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-4 py-2.5 rounded-xl border border-white/10 transition-all hover:-translate-y-0.5 backdrop-blur-sm"
                >
                  <div className={`w-6 h-6 rounded-lg ${color} flex items-center justify-center`}>
                    <Icon size={12} />
                  </div>
                  {label} — {price}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
