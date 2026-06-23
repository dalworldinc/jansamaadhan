import { NextRequest, NextResponse } from 'next/server'
import { sendOtp } from '@/lib/otp'

// POST /api/auth/send-otp
// Body: { phone: string }   — 10-digit Indian mobile, no country code
//
// Rate limiting is handled server-side by Msg91 (per-number and per-IP).
// For additional application-level rate limiting, add an upstash/redis
// check here before the sendOtp() call.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const phone: string = (body.phone ?? '').toString().replace(/\D/g, '').slice(-10)

    if (phone.length !== 10) {
      return NextResponse.json({ error: 'Invalid phone number.' }, { status: 400 })
    }

    await sendOtp(phone)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[send-otp]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to send OTP.' },
      { status: 500 },
    )
  }
}
