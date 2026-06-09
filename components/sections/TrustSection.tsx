import { Star, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar',
    location: 'Ahmedabad, Gujarat',
    service: 'ITR-1 Filing',
    rating: 5,
    text: 'Pehle CA ko ₹1,200 deta tha. Yahan ₹99 mein hua aur CA ne call karke sab samjhaya. Bahut acha experience raha!',
    saved: '₹1,100 saved',
    avatar: 'R',
    color: 'bg-blue-500',
  },
  {
    name: 'Sunita Patel',
    location: 'Surat, Gujarat',
    service: 'PAN–Aadhaar Linking',
    rating: 5,
    text: 'Mujhe pata hi nahi tha kaise karte hain. Inke guide se 15 minute mein ho gaya. Bahut helpful platform hai.',
    saved: '₹250 saved',
    avatar: 'S',
    color: 'bg-purple-500',
  },
  {
    name: 'Mohan Verma',
    location: 'Pune, Maharashtra',
    service: 'GST Registration',
    rating: 5,
    text: 'GST register karna tha. Agent ne ₹2,500 manga. Yahan ₹499 mein 6 ghante mein ho gaya. Trust karke sahi kiya.',
    saved: '₹2,000 saved',
    avatar: 'M',
    color: 'bg-teal-500',
  },
  {
    name: 'Priya Sharma',
    location: 'Jaipur, Rajasthan',
    service: 'ITR-2 Filing',
    rating: 5,
    text: 'Capital gains tha isliye ITR-2 file karna tha. CA ne sab details explain kiye aur 2 din mein file ho gaya. Amazing!',
    saved: '₹1,500 saved',
    avatar: 'P',
    color: 'bg-green-500',
  },
  {
    name: 'Deepak Mehta',
    location: 'Vadodara, Gujarat',
    service: 'EPF Withdrawal',
    rating: 5,
    text: 'Job change ke baad PF withdraw karna tha. Inhe document diye, unhone sab portal pe submit kiya. Stress-free raha.',
    saved: '₹600 saved',
    avatar: 'D',
    color: 'bg-amber-500',
  },
  {
    name: 'Anita Joshi',
    location: 'Nagpur, Maharashtra',
    service: 'Rent Agreement',
    rating: 5,
    text: 'Rent agreement ₹299 mein ek ghante mein ready ho gaya. Draft dekha, approve kiya, download kiya. Perfect service!',
    saved: '₹700 saved',
    avatar: 'A',
    color: 'bg-red-500',
  },
]

const TRUST_STATS = [
  { num: '10,000+', label: 'Happy customers' },
  { num: '₹3.2Cr+', label: 'Saved vs agents' },
  { num: '4.8 ★', label: 'Average rating' },
  { num: '48 hrs', label: 'Avg delivery time' },
  { num: '100%', label: 'CA ICAI verified' },
  { num: '0', label: 'Hidden fees — ever' },
]

export default function TrustSection() {
  return (
    <section className="py-20 lg:py-28 bg-brand-surface/40" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-brand-amber fill-brand-amber" />
            ))}
            <span className="ml-2 text-sm font-semibold text-brand-amber">4.8 out of 5</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-ink mb-4">
            10,000+ Indians Trust Us
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-lg mx-auto">
            Real customers, real savings, real stories — from Tier 2 and Tier 3 cities across India.
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-14">
          {TRUST_STATS.map(({ num, label }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="font-display font-bold text-xl text-brand-teal mb-1">{num}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 relative"
            >
              {/* Quote icon */}
              <Quote size={24} className="text-brand-teal/20 absolute top-5 right-5" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={13} className="text-brand-amber fill-brand-amber" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-5 font-body">{t.text}</p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-xl ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-brand-ink">{t.name}</div>
                    <div className="text-[10px] text-gray-400">{t.location}</div>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 text-right">{t.service}</div>
                  <div className="text-xs font-semibold text-brand-green text-right">{t.saved}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logos trust bar */}
        <div className="mt-14 text-center">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-5">
            Integrated with India's official government systems
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            {['Income Tax Dept.', 'NSDL / UTIITSL', 'UIDAI Aadhaar', 'GSTN Portal', 'DigiLocker', 'EPFO'].map(logo => (
              <div key={logo} className="px-4 py-2 rounded-xl border border-gray-200 bg-white">
                <span className="text-xs font-semibold text-gray-400">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
