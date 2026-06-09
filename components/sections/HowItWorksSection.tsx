import { UserPlus, LayoutGrid, Upload, CreditCard, CheckCircle } from 'lucide-react'

const STEPS = [
  {
    num: '01',
    icon: UserPlus,
    title: 'Register Free',
    hindi: 'मुफ्त रजिस्टर करें',
    desc: 'Sign up with your mobile number. No documents needed, no credit card, no commitment.',
    color: 'from-teal-500 to-teal-600',
    bg: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
  {
    num: '02',
    icon: LayoutGrid,
    title: 'Select Your Service',
    hindi: 'सेवा चुनें',
    desc: 'Browse 95+ services. See exact pricing before you decide — no surprises.',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    num: '03',
    icon: Upload,
    title: 'Upload Documents',
    hindi: 'दस्तावेज़ अपलोड करें',
    desc: 'Upload via app or WhatsApp. Our guided checklist tells you exactly what\'s needed.',
    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    num: '04',
    icon: CreditCard,
    title: 'Pay & Relax',
    hindi: 'भुगतान करें',
    desc: 'Pay only after your quote is confirmed. UPI, card, net banking — all accepted.',
    color: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    num: '05',
    icon: CheckCircle,
    title: 'Done — Delivered!',
    hindi: 'काम पूरा!',
    desc: 'Get acknowledgement, documents, and filing proof. Saved to your dashboard forever.',
    color: 'from-green-500 to-green-600',
    bg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden" id="how-it-works">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-surface opacity-40 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-teal" />
            <span className="text-sm font-semibold text-brand-teal uppercase tracking-widest">Simple Process</span>
            <span className="w-2 h-2 rounded-full bg-brand-teal" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-ink mb-4">
            From ₹99 to Filed —{' '}
            <span className="text-brand-teal">5 Easy Steps</span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-lg mx-auto">
            सब कुछ ऑनलाइन। No office visit. No waiting in line. Just upload and relax.
          </p>
        </div>

        {/* Steps — Desktop: horizontal timeline, Mobile: vertical */}
        <div className="hidden lg:block">
          {/* Connector line */}
          <div className="relative flex items-start justify-between gap-0 mb-0">
            <div className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-brand-teal via-brand-amber to-brand-green z-0" />

            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.num} className="relative z-10 flex flex-col items-center text-center w-1/5 px-3">
                  {/* Circle */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-5 relative`}>
                    <Icon size={28} className="text-white" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-brand-ink text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-brand-teal font-medium mb-2">{step.hindi}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile: vertical steps */}
        <div className="lg:hidden space-y-0">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            const isLast = i === STEPS.length - 1
            return (
              <div key={step.num} className="flex gap-4 relative">
                {/* Left col: icon + line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-md flex-shrink-0`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  {!isLast && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-brand-teal/30 to-transparent my-2" />
                  )}
                </div>
                {/* Right col: content */}
                <div className="pb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-300">STEP {step.num}</span>
                  </div>
                  <h3 className="font-semibold text-brand-ink text-sm mb-0.5">{step.title}</h3>
                  <p className="text-xs text-brand-teal font-medium mb-1.5">{step.hindi}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-brand-teal to-brand-teal2 p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Bg decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-brand-amber/10 translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <p className="text-white/70 text-sm font-medium mb-2">Ready to start?</p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              Register Free — Takes 30 Seconds
            </h3>
            <p className="text-white/70 text-sm mb-6">
              कोई hidden charge नहीं। No credit card. Unsubscribe karo kabhi bhi.
            </p>
            <a
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-amber text-white font-semibold rounded-2xl hover:bg-brand-amber2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
            >
              शुरू करें — Start Now →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
