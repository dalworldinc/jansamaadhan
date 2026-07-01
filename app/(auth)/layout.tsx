import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'JanSamaadhan — Login / Register',
}

const TRUST_POINTS = [
  { emoji: '🔒', text: 'Bank-grade AES-256 encryption' },
  { emoji: '✅', text: 'ICAI verified CA experts' },
  { emoji: '⚡', text: 'Services delivered in 48 hours' },
  { emoji: '🇮🇳', text: 'DPDPA 2025 data privacy compliant' },
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    // h-screen + overflow-hidden on the outer shell, with each panel scrolling
    // independently — this guarantees the form panel is always reachable via
    // scroll on short viewports instead of being clipped below the fold.
    <div className="h-screen flex overflow-hidden">

      {/* ── Left panel — brand (scrolls independently if needed) ── */}
      <div className="hidden lg:flex lg:w-[40%] xl:w-[38%] flex-col justify-between bg-brand-teal relative overflow-y-auto p-8 xl:p-10">

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-brand-amber/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <Link href="/" className="relative z-10 flex items-center gap-3 group w-fit flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center group-hover:bg-white/25 transition-colors">
            <span className="text-white font-display font-bold text-lg leading-none">ज</span>
          </div>
          <div>
            <div className="font-display font-bold text-white text-lg leading-none">
              Jan<span className="text-brand-amber">Samaadhan</span>
            </div>
            <div className="text-[10px] text-white/40 mt-0.5">जन समाधान</div>
          </div>
        </Link>

        <div className="relative z-10 py-6">
          <p className="text-white/50 text-xs font-medium mb-3 uppercase tracking-widest">
            Trusted by 10,000+ Indians
          </p>
          <h2 className="font-display text-2xl xl:text-3xl font-bold text-white leading-snug mb-4">
            आपकी सेवा,<br />
            <span className="text-brand-amber">आपका हक।</span>
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
            Tax filing, PAN, Aadhaar, GST and 90+ government services — all at 70% less than local agents.
          </p>

          <div className="space-y-2.5">
            {TRUST_POINTS.map(({ emoji, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="text-sm">{emoji}</span>
                <span className="text-white/70 text-xs">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-white/25 text-[11px] flex-shrink-0">© 2026 JanSamaadhan</p>
      </div>

      {/* ── Right panel — form (always independently scrollable) ── */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto bg-[#FAFBFC]">
        {/* Mobile logo — sticky so it's always visible while scrolling on small screens */}
        <div className="lg:hidden flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-white flex-shrink-0 sticky top-0 z-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-teal flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm leading-none">ज</span>
            </div>
            <span className="font-display font-bold text-brand-teal text-sm">Jan<span className="text-brand-amber">Samaadhan</span></span>
          </Link>
        </div>

        {/* Form content */}
        <div className="flex-1 flex items-start lg:items-center justify-center px-5 py-6 lg:py-8">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 text-center flex-shrink-0">
          <p className="text-gray-400 text-xs">
            © 2026 JanSamaadhan &nbsp;·&nbsp;
            <Link href="/privacy" className="hover:text-brand-teal transition-colors">Privacy</Link>
            &nbsp;·&nbsp;
            <Link href="/terms" className="hover:text-brand-teal transition-colors">Terms</Link>
            &nbsp;·&nbsp;
            <Link href="/contact" className="hover:text-brand-teal transition-colors">Help</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
