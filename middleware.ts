import { NextRequest, NextResponse } from 'next/server'
import { decodeSession, COOKIE_NAME } from '@/lib/session'

/**
 * Next.js middleware — runs on every matched route before rendering.
 *
 * Protected routes (require session cookie):
 *   Customer area: /dashboard, /order/*, /profile, /documents, /onboarding
 *   CA area:       /ca-portal
 *
 * Auth routes (redirect to home area if already logged in):
 *   /login, /register, /ca-register
 *
 * Role enforcement:
 *   - A logged-in 'customer' visiting /ca-portal is sent to /restricted?for=ca
 *   - A logged-in 'ca' visiting customer-only routes is sent to /restricted?for=customer
 */

const CUSTOMER_PROTECTED = ['/dashboard', '/order', '/profile', '/documents', '/onboarding']
const CA_PROTECTED        = ['/ca-portal']
const AUTH_ONLY            = ['/login', '/register', '/ca-register']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const session       = decodeSession(req.cookies.get(COOKIE_NAME)?.value)

  const isCustomerArea = CUSTOMER_PROTECTED.some(p => pathname.startsWith(p))
  const isCAArea        = CA_PROTECTED.some(p => pathname.startsWith(p))
  const isProtected     = isCustomerArea || isCAArea
  const isAuthOnly       = AUTH_ONLY.some(p => pathname.startsWith(p))

  // Unauthenticated → redirect to the appropriate login page
  if (isProtected && !session) {
    const url = req.nextUrl.clone()
    url.pathname = isCAArea ? '/ca-register' : '/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  // Logged in but wrong role for this area → restricted page
  if (session && isCAArea && session.role !== 'ca') {
    const url = req.nextUrl.clone()
    url.pathname = '/restricted'
    url.searchParams.set('for', 'ca')
    return NextResponse.redirect(url)
  }
  if (session && isCustomerArea && session.role !== 'customer') {
    const url = req.nextUrl.clone()
    url.pathname = '/restricted'
    url.searchParams.set('for', 'customer')
    return NextResponse.redirect(url)
  }

  // Already logged in → redirect away from auth pages to the right home area
  if (isAuthOnly && session) {
    const url = req.nextUrl.clone()
    url.pathname = session.role === 'ca' ? '/ca-portal' : '/dashboard'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/order/:path*',
    '/profile/:path*',
    '/documents/:path*',
    '/onboarding/:path*',
    '/ca-portal/:path*',
    '/login',
    '/register',
    '/ca-register',
  ],
}
