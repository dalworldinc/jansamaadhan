import { NextResponse } from 'next/server'
import { COOKIE_NAME } from '@/lib/session'

// POST /api/auth/logout
// Clears the session cookie and redirects to home.

export async function POST() {
  const res = NextResponse.json({ success: true })
  res.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    path:     '/',
    maxAge:   0,
  })
  return res
}
