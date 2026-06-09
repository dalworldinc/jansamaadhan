'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'

const NAV_ITEMS = [
  {
    label: 'Services',
    children: [
      { label: 'Income Tax (ITR)', href: '/services/income-tax' },
      { label: 'GST Services', href: '/services/gst' },
      { label: 'PAN & Aadhaar', href: '/services/identity' },
      { label: 'Govt Certificates', href: '/services/government' },
      { label: 'Business Setup', href: '/services/business' },
      { label: 'Accounting', href: '/services/accounting' },
      { label: 'Legal Documents', href: '/services/legal' },
      { label: 'Loans & Insurance', href: '/services/financial' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-blur
        ${scrolled
          ? 'bg-white/90 shadow-sm border-b border-brand-teal/10'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-brand-teal flex items-center justify-center shadow-sm group-hover:bg-brand-teal2 transition-colors">
              <span className="text-white font-display font-bold text-lg leading-none">ज</span>
            </div>
            <div>
              <div className="font-display font-bold text-brand-teal text-lg leading-none">
                Jan<span className="text-brand-amber">Samaadhan</span>
              </div>
              <div className="text-[10px] text-gray-400 leading-none mt-0.5 font-body">जन समाधान</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-brand-teal transition-colors rounded-lg hover:bg-brand-surface"
                    onMouseEnter={() => setDropOpen(true)}
                    onMouseLeave={() => setDropOpen(false)}
                  >
                    {item.label}
                    <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                  </button>
                  <div
                    className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                    onMouseEnter={() => setDropOpen(true)}
                    onMouseLeave={() => setDropOpen(false)}
                  >
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 w-56 grid grid-cols-1 gap-0.5">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="px-3 py-2 text-sm text-gray-600 hover:text-brand-teal hover:bg-brand-surface rounded-xl transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <Link
                          href="/services"
                          className="px-3 py-2 text-sm font-medium text-brand-teal hover:bg-brand-surface rounded-xl transition-colors flex items-center justify-between"
                        >
                          View all 95 services
                          <span className="text-xs bg-brand-amber/20 text-brand-amber px-1.5 py-0.5 rounded-md font-semibold">95+</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-brand-teal transition-colors rounded-lg hover:bg-brand-surface"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+918000000000" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-teal transition-colors">
              <Phone size={14} />
              <span>1800-XXX-XXXX</span>
            </a>
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-brand-teal border border-brand-teal/30 rounded-xl hover:bg-brand-surface transition-colors">
              Login
            </Link>
            <Link
              href="/register"
              className="px-5 py-2 text-sm font-semibold text-white bg-brand-teal rounded-xl hover:bg-brand-teal2 transition-all shadow-sm hover:shadow-md"
            >
              Register Free →
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-brand-surface transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden
          ${mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-white/95 nav-blur border-t border-gray-100 px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div key={item.label}>
                <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.label}</div>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-brand-teal rounded-xl hover:bg-brand-surface"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className="block px-4 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-brand-surface hover:text-brand-teal"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
          <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
            <Link href="/login" className="py-2.5 text-center text-sm font-medium text-brand-teal border border-brand-teal/30 rounded-xl hover:bg-brand-surface">
              Login
            </Link>
            <Link href="/register" className="py-2.5 text-center text-sm font-semibold text-white bg-brand-teal rounded-xl hover:bg-brand-teal2">
              Register Free
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
