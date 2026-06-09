import Link from 'next/link'

const FOOTER_LINKS = {
  'Income Tax': [
    { label: 'ITR-1 Filing — ₹99', href: '/services/itr-1' },
    { label: 'ITR-2 Filing — ₹299', href: '/services/itr-2' },
    { label: 'ITR-3/4 Filing', href: '/services/itr-3' },
    { label: 'Tax Notice Reply', href: '/services/notice-reply' },
    { label: 'Refund Tracking', href: '/services/refund' },
  ],
  'PAN & Aadhaar': [
    { label: 'New PAN — ₹149', href: '/services/pan' },
    { label: 'PAN–Aadhaar Link — ₹49', href: '/services/pan-aadhaar-link' },
    { label: 'Aadhaar Update — ₹99', href: '/services/aadhaar-update' },
    { label: 'ePAN Download', href: '/services/epan' },
    { label: 'DigiLocker Setup', href: '/services/digilocker' },
  ],
  'GST & Business': [
    { label: 'GST Registration — ₹499', href: '/services/gst-registration' },
    { label: 'GSTR-1 Filing', href: '/services/gstr-1' },
    { label: 'GSTR-3B Filing', href: '/services/gstr-3b' },
    { label: 'MSME / Udyam Reg.', href: '/services/msme' },
    { label: 'Company Registration', href: '/services/company' },
  ],
  'Company': [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Partner / CA Portal', href: '/ca-portal' },
    { label: 'Contact Us', href: '/contact' },
  ],
  'Legal': [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Disclaimer', href: '/disclaimer' },
  ],
}

const LANGUAGES = ['हिंदी', 'ગુજરાતી', 'मराठी', 'বাংলা', 'English']

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-white">

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-brand-teal flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg leading-none">ज</span>
              </div>
              <div>
                <div className="font-display font-bold text-white text-lg leading-none">
                  Jan<span className="text-brand-amber">Samaadhan</span>
                </div>
                <div className="text-[10px] text-white/40 leading-none mt-0.5">जन समाधान</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              India's most affordable platform for tax filing, PAN, Aadhaar, GST and 95+ government services.
              <br /><br />
              <em className="text-white/60">आपकी सेवा, आपका हक।</em>
            </p>

            {/* Language switcher */}
            <div>
              <p className="text-white/30 text-xs mb-2 uppercase tracking-wider">Language</p>
              <div className="flex flex-wrap gap-1.5">
                {LANGUAGES.map(lang => (
                  <button key={lang} className="text-xs px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors">
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {Object.entries(FOOTER_LINKS).map(([cat, links]) => (
              <div key={cat}>
                <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">{cat}</h4>
                <ul className="space-y-2.5">
                  {links.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="text-white/60 hover:text-white text-xs transition-colors leading-relaxed">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © 2026 JanSamaadhan. All rights reserved. GST No.: XXXXXXXXXXXX | CIN: UXXXXXXXX
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/20 text-xs">Secured by</span>
            <div className="flex items-center gap-3">
              {['Razorpay', 'SSL 256-bit', 'DPDPA Compliant'].map(b => (
                <span key={b} className="text-[10px] bg-white/10 px-2 py-1 rounded text-white/50">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
