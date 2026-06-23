import { NextRequest, NextResponse } from 'next/server'
import { verifyOtp } from '@/lib/otp'
import { prisma } from '@/lib/prisma'
import { encodeSession, COOKIE_NAME, type UserRole } from '@/lib/session'

// POST /api/auth/verify-otp
// Body: { phone: string; code: string; role: 'customer' | 'ca'; icaiNumber?: string; name?: string }
//
// Flow:
//   1. Verify OTP against Msg91
//   2. Upsert user in Postgres (create on first login, update lastLoginAt on return)
//   3. For CA role: create or re-use CAProfile row (icaiNumber required)
//   4. Set httpOnly session cookie
//   5. Return { redirect } for the client to follow

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const phone: string      = (body.phone ?? '').toString().replace(/\D/g, '').slice(-10)
    const code: string       = (body.code  ?? '').toString().trim()
    const role: UserRole     = body.role === 'ca' ? 'ca' : 'customer'
    const icaiNumber: string = (body.icaiNumber ?? '').toString().trim().toUpperCase()
    const name: string       = (body.name ?? '').toString().trim()

    if (phone.length !== 10) {
      return NextResponse.json({ error: 'Invalid phone number.' }, { status: 400 })
    }
    if (!code) {
      return NextResponse.json({ error: 'OTP code is required.' }, { status: 400 })
    }
    if (role === 'ca' && !icaiNumber) {
      return NextResponse.json({ error: 'ICAI membership number is required for CA registration.' }, { status: 400 })
    }

    // 1. Verify against Msg91
    const valid = await verifyOtp(phone, code)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid or expired OTP. Please try again.' }, { status: 401 })
    }

    // 2. Upsert User row
    const dbRole = role === 'ca' ? 'CA' : 'CUSTOMER'
    const user = await prisma.user.upsert({
      where:  { phone },
      create: { phone, role: dbRole, name: name || null },
      update: { lastLoginAt: new Date(), ...(name ? { name } : {}) },
    })

    // 3. For CA: ensure CAProfile exists
    if (role === 'ca') {
      const existingProfile = await prisma.cAProfile.findUnique({ where: { userId: user.id } })
      if (!existingProfile) {
        // Check icaiNumber isn't already claimed by a different user
        const claimedByOther = await prisma.cAProfile.findUnique({ where: { icaiNumber } })
        if (claimedByOther) {
          return NextResponse.json(
            { error: 'This ICAI number is already registered. Contact support if this is an error.' },
            { status: 409 },
          )
        }
        await prisma.cAProfile.create({
          data: { userId: user.id, icaiNumber },
        })
      }
    }

    // 4. Set session cookie
    const sessionValue = encodeSession(role, phone)
    const res = NextResponse.json({
      success: true,
      redirect: role === 'ca' ? '/ca-portal' : '/dashboard',
    })
    res.cookies.set(COOKIE_NAME, sessionValue, {
      httpOnly: true,
      sameSite: 'lax',
      path:     '/',
      maxAge:   60 * 60 * 24 * 30,  // 30 days
      secure:   process.env.NODE_ENV === 'production',
    })

    return res
  } catch (err) {
    console.error('[verify-otp]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Verification failed.' },
      { status: 500 },
    )
  }
}
