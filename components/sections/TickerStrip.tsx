'use client'

const TICKER_ITEMS = [
  { emoji: '✅', text: 'Ramesh Kumar filed ITR-1 · Saved ₹1,200 vs agent' },
  { emoji: '🎉', text: 'Priya Shah got GST Registration · Delivered in 6 hours' },
  { emoji: '✅', text: 'Mohan Verma linked PAN-Aadhaar · Done in 10 minutes' },
  { emoji: '⭐', text: 'Sunita Patel — "Best service, bilkul sahi price!"' },
  { emoji: '✅', text: 'Rakesh Traders — Udyam Registration in 2 hours' },
  { emoji: '🎉', text: 'Anita Joshi — Passport docs sorted · Saved ₹800' },
  { emoji: '✅', text: 'Vijay Mehta filed ITR-2 with capital gains · ₹299' },
  { emoji: '⭐', text: 'Geeta Ben — "CA ne sab samjhaya, bahut acha laga"' },
  { emoji: '✅', text: 'Suresh Auto Parts — GSTR-3B filed on time every month' },
  { emoji: '🎉', text: 'Deepak Sharma — EPF withdrawal processed in 3 days' },
]

export default function TickerStrip() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div className="bg-brand-teal py-3 overflow-hidden relative">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-brand-teal to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-brand-teal to-transparent z-10 pointer-events-none" />

      <div className="marquee-track gap-0">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-6 whitespace-nowrap">
            <span className="text-sm">{item.emoji}</span>
            <span className="text-white/90 text-xs font-medium">{item.text}</span>
            <span className="text-white/30 ml-4">•</span>
          </div>
        ))}
      </div>
    </div>
  )
}
