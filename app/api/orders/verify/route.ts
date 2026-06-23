import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

// POST /api/orders/verify
// Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
//
// Called by the frontend immediately after Razorpay checkout succeeds.
// NEVER trust the frontend alone to confirm payment — always verify the
// HMAC signature here server-side before marking the order as paid.
//
// Security note: this endpoint must not be callable without a valid
// razorpay_signature — an attacker who knows an order_id could otherwise
// mark any order as paid without paying. The HMAC check below is the guard.

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment fields.' }, { status: 400 })
    }

    // ── 1. Verify HMAC signature ───────────────────────────────────────
    const secret   = process.env.RAZORPAY_KEY_SECRET ?? ''
    const body     = `${razorpay_order_id}|${razorpay_payment_id}`
    const expected = crypto.createHmac('sha256', secret).update(body).digest('hex')

    if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature))) {
      console.warn('[orders/verify] Invalid Razorpay signature for', razorpay_order_id)
      return NextResponse.json({ error: 'Invalid payment signature.' }, { status: 400 })
    }

    // ── 2. Find the Payment row by razorpayOrderId ─────────────────────
    const payment = await prisma.payment.findUnique({
      where:   { razorpayOrderId: razorpay_order_id },
      include: { order: true },
    })

    if (!payment) {
      return NextResponse.json({ error: 'Payment record not found.' }, { status: 404 })
    }

    // Idempotency guard — if already processed (e.g. webhook fired twice), return success
    if (payment.status === 'PAID') {
      return NextResponse.json({ success: true, orderId: payment.orderId, alreadyProcessed: true })
    }

    // ── 3. Update Payment + Order atomically ───────────────────────────
    await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data:  {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status:            'PAID',
          paidAt:            new Date(),
        },
      }),
      prisma.order.update({
        where: { id: payment.orderId },
        data:  { status: 'NEW' },  // NEW = paid, ready to be picked up by a CA
      }),
      prisma.orderEvent.create({
        data: {
          orderId: payment.orderId,
          actor:   'SYSTEM',
          message: `Payment confirmed — ₹${payment.amountInPaise / 100} received. Razorpay payment ID: ${razorpay_payment_id}. Order is now active.`,
        },
      }),
    ])

    return NextResponse.json({ success: true, orderId: payment.orderId })
  } catch (err) {
    console.error('[orders/verify]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Payment verification failed.' },
      { status: 500 },
    )
  }
}
