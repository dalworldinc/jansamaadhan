import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

// POST /api/webhooks/razorpay
//
// Razorpay sends this server-to-server after every payment event.
// This is more reliable than the client-side verify call in Step4Pay.tsx
// because it fires even if the user closes their browser mid-payment.
//
// Setup in Razorpay Dashboard:
//   Settings → Webhooks → Add new webhook
//   URL: https://jansamaadhan.in/api/webhooks/razorpay
//   Secret: same value as RAZORPAY_WEBHOOK_SECRET in your env
//   Events to subscribe: payment.captured, payment.failed, refund.created
//
// Security: every request is verified with HMAC-SHA256 before processing.

// Note: unlike Pages Router API routes, App Router route handlers never
// auto-parse the request body — req.arrayBuffer() below already gives us
// the raw, unmodified bytes needed for HMAC signature verification.
// No bodyParser config needed here (that's a Pages Router-only concept).

async function getRawBody(req: NextRequest): Promise<string> {
  const buf = await req.arrayBuffer()
  return Buffer.from(buf).toString('utf-8')
}

export async function POST(req: NextRequest) {
  let rawBody: string

  try {
    rawBody = await getRawBody(req)
  } catch {
    return NextResponse.json({ error: 'Failed to read body.' }, { status: 400 })
  }

  // ── 1. Verify HMAC signature ───────────────────────────────────────
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('[webhook/razorpay] RAZORPAY_WEBHOOK_SECRET not set.')
    return NextResponse.json({ error: 'Webhook secret not configured.' }, { status: 500 })
  }

  const receivedSignature = req.headers.get('x-razorpay-signature') ?? ''
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex')

  if (!crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(receivedSignature),
  )) {
    console.warn('[webhook/razorpay] Invalid signature — possible spoofed request.')
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  // ── 2. Parse the verified payload ─────────────────────────────────
  let event: {
    event: string
    payload: {
      payment?: {
        entity: {
          id:       string
          order_id: string
          status:   string
          amount:   number
        }
      }
      refund?: {
        entity: {
          id:         string
          payment_id: string
          amount:     number
        }
      }
    }
  }

  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const eventType = event.event

  // ── 3. Handle events ───────────────────────────────────────────────
  try {
    if (eventType === 'payment.captured') {
      const payment = event.payload.payment?.entity
      if (!payment) {
        return NextResponse.json({ error: 'No payment entity.' }, { status: 400 })
      }

      const { id: razorpayPaymentId, order_id: razorpayOrderId } = payment

      const paymentRow = await prisma.payment.findUnique({
        where: { razorpayOrderId },
      })

      if (!paymentRow) {
        console.warn('[webhook/razorpay] No payment row for order:', razorpayOrderId)
        return NextResponse.json({ received: true })
      }

      if (paymentRow.status === 'PAID') {
        return NextResponse.json({ received: true, alreadyProcessed: true })
      }

      await prisma.$transaction([
        prisma.payment.update({
          where: { id: paymentRow.id },
          data: {
            razorpayPaymentId,
            status: 'PAID',
            paidAt: new Date(),
          },
        }),
        prisma.order.update({
          where: { id: paymentRow.orderId },
          data:  { status: 'NEW' },
        }),
        prisma.orderEvent.create({
          data: {
            orderId: paymentRow.orderId,
            actor:   'SYSTEM',
            message: `Payment captured via webhook — ₹${payment.amount / 100}. Razorpay payment ID: ${razorpayPaymentId}.`,
          },
        }),
      ])

      console.log('[webhook/razorpay] payment.captured processed:', razorpayOrderId)
    }

    else if (eventType === 'payment.failed') {
      const payment = event.payload.payment?.entity
      if (!payment) return NextResponse.json({ received: true })

      const paymentRow = await prisma.payment.findUnique({
        where: { razorpayOrderId: payment.order_id },
      })

      if (paymentRow && paymentRow.status === 'CREATED') {
        await prisma.$transaction([
          prisma.payment.update({
            where: { id: paymentRow.id },
            data:  { status: 'FAILED' },
          }),
          prisma.orderEvent.create({
            data: {
              orderId: paymentRow.orderId,
              actor:   'SYSTEM',
              message: `Payment failed. Razorpay payment ID: ${payment.id}.`,
            },
          }),
        ])
      }

      console.log('[webhook/razorpay] payment.failed processed:', payment.order_id)
    }

    else if (eventType === 'refund.created') {
      const refund = event.payload.refund?.entity
      if (!refund) return NextResponse.json({ received: true })

      const paymentRow = await prisma.payment.findFirst({
        where: { razorpayPaymentId: refund.payment_id },
      })

      if (paymentRow) {
        await prisma.$transaction([
          prisma.payment.update({
            where: { id: paymentRow.id },
            data:  { status: 'REFUNDED', refundedAt: new Date() },
          }),
          prisma.order.update({
            where: { id: paymentRow.orderId },
            data:  { status: 'REFUNDED' },
          }),
          prisma.orderEvent.create({
            data: {
              orderId: paymentRow.orderId,
              actor:   'SYSTEM',
              message: `Refund of ₹${refund.amount / 100} processed. Refund ID: ${refund.id}.`,
            },
          }),
        ])
      }

      console.log('[webhook/razorpay] refund.created processed:', refund.payment_id)
    }

    else {
      console.log('[webhook/razorpay] Unhandled event type:', eventType)
    }

    return NextResponse.json({ received: true })

  } catch (err) {
    console.error('[webhook/razorpay] Processing error:', err)
    return NextResponse.json(
      { error: 'Internal processing error.' },
      { status: 500 },
    )
  }
}