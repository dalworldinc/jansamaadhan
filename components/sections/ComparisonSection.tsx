import { Check, X, Minus } from 'lucide-react'

const ROWS = [
  { feature: 'ITR-1 filing price',        us: '₹99',          agent: '₹500–₹1,500',  cleartax: '₹499+',    jio: '₹24 (basic only)' },
  { feature: 'ITR-2 (capital gains)',      us: '₹299',         agent: '₹1,000–₹2,000', cleartax: '₹999+',   jio: '❌ N/A' },
  { feature: 'PAN + Aadhaar services',     us: '₹49–₹149',     agent: '₹150–₹800',    cleartax: '❌ None',   jio: 'Partial' },
  { feature: 'Government certificates',   us: '✓ All 16',      agent: 'Sometimes',    cleartax: '❌ None',   jio: '❌ None' },
  { feature: 'GST registration',          us: '₹499',         agent: '₹1,500–₹3,000', cleartax: '₹499+',   jio: '❌ None' },
  { feature: 'GSTR monthly filing',       us: '₹299/mo',      agent: '₹500–₹1,000',  cleartax: '₹599+',    jio: '❌ None' },
  { feature: 'Hindi / Hinglish support',  us: '✓ Full',        agent: '✓ Yes',         cleartax: 'Partial',  jio: '✓ Yes' },
  { feature: 'Tier 2/3 city focus',       us: '✓ Yes',         agent: '✓ Local',       cleartax: '❌ Urban',  jio: 'Partial' },
  { feature: 'CA ICAI verified',          us: '✓ Always',      agent: 'Unverified',   cleartax: '✓ Yes',    jio: '?' },
  { feature: 'Legal documents',          us: '✓ 9 services',  agent: 'Some',         cleartax: '❌ None',   jio: '❌ None' },
  { feature: 'Document vault',           us: '✓ Lifetime',    agent: '❌ None',        cleartax: 'Limited',  jio: 'Basic' },
  { feature: 'Free registration',        us: '✓ Always free', agent: 'N/A',          cleartax: '✓ Free',   jio: '✓ Free' },
]

function Cell({ value, isUs }: { value: string; isUs?: boolean }) {
  const isCheckmark = value.startsWith('✓')
  const isCross     = value.startsWith('❌')

  return (
    <td className={`px-4 py-3.5 text-sm border-b border-gray-50 text-center
      ${isUs ? 'bg-brand-teal/5 font-medium' : ''}`}>
      {isCheckmark ? (
        <span className="flex items-center justify-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-brand-green/15 flex items-center justify-center flex-shrink-0">
            <Check size={11} className="text-brand-green font-bold" />
          </span>
          {value.replace('✓ ', '') !== '' && value.replace('✓ ', '') !== 'Yes' && value.replace('✓ ', '') !== 'Always' && value.replace('✓ ', '') !== 'Full' && value.replace('✓ ', '') !== 'Always free' ? (
            <span className={isUs ? 'text-brand-teal' : 'text-gray-600'}>{value.replace('✓ ', '')}</span>
          ) : null}
        </span>
      ) : isCross ? (
        <span className="flex items-center justify-center">
          <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
            <X size={10} className="text-red-500" />
          </span>
        </span>
      ) : (
        <span className={isUs ? 'text-brand-teal' : 'text-gray-500'}>{value}</span>
      )}
    </td>
  )
}

export default function ComparisonSection() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden" id="comparison">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-amber" />
            <span className="text-sm font-semibold text-brand-amber uppercase tracking-widest">Why JanSamaadhan?</span>
            <span className="w-2 h-2 rounded-full bg-brand-amber" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-ink mb-4">
            We Beat Everyone —{' '}
            <span className="text-brand-teal">On Price & Coverage</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Other platforms do taxes. We do everything — taxes, PAN, Aadhaar, GST, govt certificates, legal docs, and more.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
          <table className="w-full min-w-[680px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-[28%]">
                  Feature
                </th>
                <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider bg-brand-teal/5 w-[18%]">
                  <div className="flex flex-col items-center gap-1">
                    <span className="w-7 h-7 rounded-lg bg-brand-teal flex items-center justify-center text-white font-bold text-sm font-display">ज</span>
                    <span className="text-brand-teal">JanSamaadhan</span>
                  </div>
                </th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider w-[18%]">
                  Local Agent
                </th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider w-[18%]">
                  ClearTax
                </th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider w-[18%]">
                  JioFinance
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-4 py-3.5 text-sm font-medium text-gray-700 border-b border-gray-50">
                    {row.feature}
                  </td>
                  <Cell value={row.us}       isUs />
                  <Cell value={row.agent} />
                  <Cell value={row.cleartax} />
                  <Cell value={row.jio} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom callout */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <div className="bg-brand-surface border border-brand-teal/20 rounded-2xl px-6 py-4">
            <span className="text-brand-teal font-semibold text-sm">
              🏆 JanSamaadhan has the most services of any Indian platform — at the lowest prices.
            </span>
          </div>
          <a href="/register" className="flex-shrink-0 px-6 py-3 bg-brand-teal text-white text-sm font-semibold rounded-2xl hover:bg-brand-teal2 transition-all shadow-sm hover:shadow-md">
            Register Free →
          </a>
        </div>
      </div>
    </section>
  )
}
