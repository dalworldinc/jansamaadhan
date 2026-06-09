'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'Kya mera data safe rahega? (Is my data safe?)',
    a: 'Haan, bilkul. Aapke sabhi documents AES-256 encryption se protect hain. Hum kabhi Aadhaar number store nahi karte — sirf OTP verification hota hai. India ke DPDPA 2025 norms ke saath hum fully compliant hain.',
  },
  {
    q: 'ITR filing ke liye kya documents chahiye?',
    a: 'ITR-1 ke liye: Form 16 (employer se), Aadhaar, PAN, bank account number aur IFSC. Aur kuch nahi. Hum aapko ek guided checklist denge jo WhatsApp pe bhi share kar sakte hain.',
  },
  {
    q: 'Agar ITR galat file hua toh kya hoga?',
    a: 'Hum ₹199 mein revised ITR filing bhi karte hain. Aur hamari 48-hour SLA guarantee hai — agar koi galti humari wajah se hui, toh revision free hogi.',
  },
  {
    q: 'CA kaun hoga mera? Verified hai kya?',
    a: 'Sab CAs ICAI registered hain, unka membership number verify hota hai onboarding pe. Har CA ko star rating milti hai customers se. Aapko assigned CA ka naam, rating aur experience pehle dikhaaya jaata hai.',
  },
  {
    q: 'Payment kab karna hai? Pehle ya baad mein?',
    a: 'Payment sirf quote confirm hone ke baad. Pehle CA case dekhta hai, quote deta hai, aap accept karo tab pay karo. Razorpay se UPI, card, net banking sab accepted hai.',
  },
  {
    q: 'Agar service deliver na ho toh? (Refund policy)',
    a: 'Agar SLA miss hoti hai ya service deliver nahi hoti, toh full refund. No questions asked. Hamara SLA: ITR 48 hrs, PAN/Aadhaar same day, GST 24 hrs, Notice reply 5 business days.',
  },
  {
    q: 'Kya mobile se sab ho sakta hai?',
    a: 'Haan. Platform mobile-optimized hai. Documents WhatsApp pe bhi bhej sakte hain. Android app Phase 2 mein aayega. Abhi browser se seamlessly kaam karta hai.',
  },
  {
    q: 'Mere gaon / chhote shehar mein bhi service milegi?',
    a: 'Bilkul. JanSamaadhan poore India ke liye hai, khaaske Tier 2 aur Tier 3 cities ke liye. Sirf internet chahiye — baki sab hum karte hain.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-20 lg:py-28 bg-brand-surface/30" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-ink mb-4">
            Aapke Sawaal —{' '}
            <span className="text-brand-teal">Hamare Jawaab</span>
          </h2>
          <p className="text-gray-500 text-base">Frequently Asked Questions</p>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden
                ${open === i
                  ? 'border-brand-teal/30 bg-white shadow-sm'
                  : 'border-gray-200 bg-white hover:border-brand-teal/20'
                }`}
            >
              <button
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`text-sm font-semibold leading-snug ${open === i ? 'text-brand-teal' : 'text-brand-ink'}`}>
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${open === i ? 'rotate-180 text-brand-teal' : ''}`}
                />
              </button>
              <div
                className={`transition-all duration-200 overflow-hidden
                  ${open === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm mb-3">Aur koi sawaal hai?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://wa.me/918000000000" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-colors shadow-sm">
              <span>💬</span> WhatsApp pe poochho
            </a>
            <a href="tel:18001234567" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:border-brand-teal hover:text-brand-teal transition-colors">
              📞 Call 1800-XXX-XXXX
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
