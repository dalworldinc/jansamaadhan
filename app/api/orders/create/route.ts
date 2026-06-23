import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { cookies } from 'next/headers'
import { decodeSession, COOKIE_NAME } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { getServiceBySlug } from '@/lib/allServices'

// POST /api/orders/create
// Body: {
//   serviceSlug:   string     — matches lib/allServices.ts slug
//   planId:        string     — matches ServicePlan.id in lib/services.ts
//   planName:      string
//   price:         number     — rupees (int)
//   slaLabel:      string
//   caRequired:    boolean
//   customerNotes: string
//   name:          string     — customer name (update profile)
//   email:         string
// }
//
// Returns: { orderId, razorpayOrderId, amount (paise), currency, keyId }

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID     ?? '',
  key_secret: process.env.RAZORPAY_KEY_SECRET ?? '',
})

function generateOrderNumber(): string {
  const year = new Date().getFullYear()
  const rand = Math.floor(10000 + Math.random() * 90000)
  return `ORD-${year}-${rand}`
}

export async function POST(req: NextRequest) {
  try {
    // Auth guard
    const sessionCookie = cookies().get(COOKIE_NAME)?.value
    const session = decodeSession(sessionCookie)
    if (!session || session.role !== 'customer') {
      return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 })
    }

    const body = await req.json()
    const {
      serviceSlug,
      planId,
      planName,
      price,
      slaLabel,
      caRequired,
      customerNotes,
      name,
      email,
    } = body

    // Validate service exists in catalog
    const catalogService = getServiceBySlug(serviceSlug)
    if (!catalogService) {
      return NextResponse.json({ error: 'Unknown service.' }, { status: 400 })
    }

    // Validate price is a sensible positive integer
    const priceInt = parseInt(price, 10)
    if (!priceInt || priceInt < 1) {
      return NextResponse.json({ error: 'Invalid price.' }, { status: 400 })
    }

    // Fetch user
    const user = await prisma.user.findUnique({ where: { phone: session.phone } })
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 })
    }

    // Update user profile fields if provided
    if (name || email) {
      await prisma.user.update({
        where: { id: user.id },
        data:  { ...(name ? { name } : {}), ...(email ? { email } : {}) },
      })
    }

    // Create ServiceSnapshot (so price/SLA is locked at order time)
    const snapshot = await prisma.serviceSnapshot.create({
      data: {
        slug:       serviceSlug,
        planId:     planId     ?? 'default',
        name:       catalogService.name,
        planName:   planName   ?? catalogService.name,
        price:      priceInt,
        slaLabel:   slaLabel   ?? catalogService.sla,
        caRequired: caRequired ?? catalogService.caRequired,
      },
    })

    // Create Order row
    const order = await prisma.order.create({
      data: {
        orderNumber:        generateOrderNumber(),
        customerId:         user.id,
        serviceSnapshotId:  snapshot.id,
        customerNotes:      customerNotes || null,
        status:             'PENDING_PAYMENT',
        dueBy:              new Date(Date.now() + parseSla(slaLabel ?? catalogService.sla)),
      },
    })

    // Create Razorpay order
    const amountInPaise = priceInt * 100
    const rzpOrder = await razorpay.orders.create({
      amount:   amountInPaise,
      currency: 'INR',
      receipt:  order.id,
      notes:    { orderNumber: order.orderNumber, serviceSlug },
    })

    // Persist Payment row (status=CREATED, payment not yet made)
    await prisma.payment.create({
      data: {
        orderId:          order.id,
        razorpayOrderId:  rzpOrder.id,
        amountInPaise,
        status:           'CREATED',
      },
    })

    // System event for audit trail
    await prisma.orderEvent.create({
      data: {
        orderId: order.id,
        actor:   'SYSTEM',
        message: `Order created — ${catalogService.name} (${planName ?? ''}). Awaiting payment.`,
      },
    })

    return NextResponse.json({
      orderId:         order.id,
      orderNumber:     order.orderNumber,
      razorpayOrderId: rzpOrder.id,
      amount:          amountInPaise,
      currency:        'INR',
      keyId:           process.env.RAZORPAY_KEY_ID,
    })
  } catch (err) {
    console.error('[orders/create]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to create order.' },
      { status: 500 },
    )
  }
}

// Convert SLA label to milliseconds for dueBy calculation
function parseSla(sla: string): number {
  const s = sla.toLowerCase()
  if (s.includes('same day')) return 8  * 60 * 60 * 1000
  if (s.includes('1 hr'))     return 1  * 60 * 60 * 1000
  if (s.includes('2 hr'))     return 2  * 60 * 60 * 1000
  if (s.includes('6 hr'))     return 6  * 60 * 60 * 1000
  if (s.includes('24 hr'))    return 24 * 60 * 60 * 1000
  if (s.includes('48 hr'))    return 48 * 60 * 60 * 1000
  const days = parseInt(s.match(/(\d+)\s*day/)?.[1] ?? '3', 10)
  return days * 24 * 60 * 60 * 1000
}
