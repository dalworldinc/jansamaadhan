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

const RECENT = [
  { name: 'Ramesh K.',    service: 'ITR-1 Filed',       time: '2 min ago',  color: 'bg-green-400' },
  { name: 'Priya S.',     service: 'PAN Linked',         time: '8 min ago',  color: 'bg-blue-400' },
  { name: 'Mohan V.',     service: 'GST Registered',     time: '14 min ago', color: 'bg-purple-400' },
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">

      {/* ── Left panel — brand + social proof ── */}
      <div className="hidden lg:flex lg:w-[44%] xl:w-[42%] flex-col justify-between bg-brand-teal relative overflow-hidden p-10 xl:p-14">

        {/* Background texture */}
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

        {/* Top: logo */}
        <Link href="/" className="relative z-10 flex items-center gap-3 group w-fit">
          <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center group-hover:bg-white/25 transition-colors">
            <span className="text-white font-display font-bold text-xl leading-none">ज</span>
          </div>
          <div>
            <div className="font-display font-bold text-white text-xl leading-none">
              Jan<span className="text-brand-amber">Samaadhan</span>
            </div>
            <div className="text-[11px] text-white/40 mt-0.5">जन समाधान</div>
          </div>
        </Link>

        {/* Middle: headline */}
        <div className="relative z-10 my-auto py-10">
          <p className="text-white/50 text-sm font-medium mb-4 uppercase tracking-widest">
            Trusted by 10,000+ Indians
          </p>
          <h2 className="font-display text-3xl xl:text-4xl font-bold text-white leading-snug mb-6">
            आपकी सेवा,<br />
            <span className="text-brand-amber">आपका हक।</span>
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-10">
            Tax filing, PAN, Aadhaar, GST and 90+ government services — all at 70% less than local agents.
          </p>

          {/* Trust bullets */}
          <div className="space-y-3">
            {TRUST_POINTS.map(({ emoji, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="text-base">{emoji}</span>
                <span className="text-white/70 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: live activity feed */}
        <div className="relative z-10">
          <p className="text-white/30 text-[11px] uppercase tracking-widest mb-3">Live activity</p>
          <div className="space-y-2">
            {RECENT.map(({ name, service, time, color }) => (
              <div key={name} className="flex items-center gap-3 bg-white/8 border border-white/10 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                <div className={`w-2 h-2 rounded-full ${color} flex-shrink-0 animate-pulse`} />
                <span className="text-white/80 text-xs font-medium">{name}</span>
                <span className="text-white/40 text-xs">·</span>
                <span className="text-white/60 text-xs">{service}</span>
                <span className="ml-auto text-white/30 text-[11px]">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex flex-col min-h-screen bg-[#FAFBFC]">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-teal flex items-center justify-center">
              <span className="text-white font-display font-bold text-base leading-none">ज</span>
            </div>
            <span className="font-display font-bold text-brand-teal">Jan<span className="text-brand-amber">Samaadhan</span></span>
          </Link>
        </div>

        {/* Form content */}
        <div className="flex-1 flex items-center justify-center px-5 py-10">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-5 border-t border-gray-100 text-center">
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
