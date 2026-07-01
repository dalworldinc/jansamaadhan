'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, ArrowLeft } from 'lucide-react'

const INDIA_CODE = '+91'

const COPY = {
  eyebrow:   'Free account — no credit card',
  heading:   'Create your account',
  subHindi:  'अपना मोबाइल नंबर दर्ज करें',
  subEng:    "We'll send a 6-digit OTP to verify your number.",
  label:     'Mobile number',
  placeholder: '98765 43210',
  btn:       'Send OTP →',
  login:     'Already have an account?',
  loginLink: 'Log in',
  terms:     'By registering you agree to our',
  termsLink: 'Terms & Privacy Policy',
  errors: {
    empty:   'Please enter your mobile number.',
    invalid: 'Enter a valid 10-digit mobile number.',
  },
}

export default function RegisterPage() {
  const router   = useRouter()
  const [phone,  setPhone]   = useState('')
  const [name,   setName]    = useState('')
  const [error,  setError]   = useState('')
  const [loading,setLoading] = useState(false)

  function formatPhone(raw: string) {
    return raw.replace(/\D/g, '').slice(0, 10)
  }

  function validate() {
    if (!phone) { setError(COPY.errors.empty);   return false }
    if (phone.length !== 10) { setError(COPY.errors.invalid); return false }
    if (!/^[6-9]/.test(phone)) { setError('Enter a valid Indian mobile number (starts with 6–9).'); return false }
    setError('')
    return true
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)

    try {
      const res = await fetch('/api/auth/send-otp', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Failed to send OTP. Please try again.')
        setLoading(false)
        return
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    setLoading(false)
    const params = new URLSearchParams({ phone, role: 'customer', ...(name ? { name } : {}) })
    router.push(`/register/verify?${params.toString()}`)
  }

  return (
    <div>
      {/* Back to home */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-gray-400 hover:text-brand-teal text-sm mb-5 transition-colors group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to home
      </Link>

      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 bg-brand-surface border border-brand-teal/20 px-3 py-1.5 rounded-full mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
        <span className="text-xs font-medium text-brand-teal">{COPY.eyebrow}</span>
      </div>

      {/* Heading */}
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-brand-ink mb-1">
        {COPY.heading}
      </h1>
      <p className="text-gray-400 text-sm mb-1">{COPY.subHindi}</p>
      <p className="text-gray-500 text-sm mb-5">{COPY.subEng}</p>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate>

        {/* Phone field */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            {COPY.label}
          </label>
          <div className={`flex items-center rounded-2xl border-2 bg-white transition-all duration-150 overflow-hidden
            ${error
              ? 'border-red-300 shadow-sm shadow-red-100'
              : 'border-gray-200 focus-within:border-brand-teal focus-within:shadow-sm focus-within:shadow-brand-teal/10'
            }`}
          >
            <div className="flex items-center gap-2 px-4 py-3.5 border-r border-gray-100 bg-gray-50 flex-shrink-0">
              <span className="text-base leading-none">🇮🇳</span>
              <span className="text-sm font-medium text-gray-600">{INDIA_CODE}</span>
            </div>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              autoFocus
              placeholder={COPY.placeholder}
              value={phone}
              onChange={e => { setPhone(formatPhone(e.target.value)); setError('') }}
              className="flex-1 px-4 py-3.5 text-base text-brand-ink bg-transparent outline-none placeholder-gray-300 font-body tracking-wide"
            />
            {phone.length > 0 && (
              <div className={`px-4 text-xs font-medium flex-shrink-0 ${phone.length === 10 ? 'text-brand-green' : 'text-gray-400'}`}>
                {phone.length}/10
              </div>
            )}
          </div>
          {error && (
            <p className="mt-2 text-xs text-red-500 flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-red-100 flex items-center justify-center text-[9px] font-bold flex-shrink-0">!</span>
              {error}
            </p>
          )}
        </div>

        {/* Full name field */}
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Ramesh Kumar"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-brand-teal focus:shadow-sm focus:shadow-brand-teal/10 outline-none text-sm text-brand-ink bg-white placeholder-gray-300 transition-all"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-base transition-all duration-200
            ${loading
              ? 'bg-brand-teal/60 text-white cursor-not-allowed'
              : 'bg-brand-teal text-white hover:bg-brand-teal2 shadow-md shadow-brand-teal/20 hover:shadow-lg hover:shadow-brand-teal/30 hover:-translate-y-0.5 active:translate-y-0'
            }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending OTP…
            </>
          ) : (
            <>
              {COPY.btn}
              <ChevronRight size={18} />
            </>
          )}
        </button>
      </form>

      {/* Login link */}
      <p className="text-center text-sm text-gray-500 mt-5">
        {COPY.login}{' '}
        <Link href="/login" className="text-brand-teal font-semibold hover:underline">
          {COPY.loginLink}
        </Link>
      </p>

      {/* Terms */}
      <p className="text-center text-xs text-gray-400 mt-3 leading-relaxed">
        {COPY.terms}{' '}
        <Link href="/terms" className="text-brand-teal hover:underline">{COPY.termsLink}</Link>.
        <br />
        We never share your data with third parties.
      </p>
    </div>
  )
}
