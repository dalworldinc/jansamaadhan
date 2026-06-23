import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decodeSession, COOKIE_NAME } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { getDownloadUrl } from '@/lib/storage'

// POST /api/documents/download-url
// Body: { documentId: string }
//
// Returns: { downloadUrl }   — presigned R2 GET URL, expires in 5 minutes
//
// Access control:
//   - The document's order's customerId must match the authenticated customer, OR
//   - The authenticated user must be the CA assigned to that order

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = cookies().get(COOKIE_NAME)?.value
    const session = decodeSession(sessionCookie)
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 })
    }

    const { documentId } = await req.json()
    if (!documentId) {
      return NextResponse.json({ error: 'documentId is required.' }, { status: 400 })
    }

    // Fetch document with its order and CA info
    const doc = await prisma.orderDocument.findUnique({
      where:   { id: documentId },
      include: {
        order: {
          include: { ca: { include: { user: true } } },
        },
      },
    })

    if (!doc) {
      return NextResponse.json({ error: 'Document not found.' }, { status: 404 })
    }

    if (!doc.r2ObjectKey) {
      return NextResponse.json({ error: 'Document has not been uploaded yet.' }, { status: 400 })
    }

    // Access control
    const requestingUser = await prisma.user.findUnique({ where: { phone: session.phone } })
    if (!requestingUser) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 })
    }

    const isOrderOwner  = doc.order.customerId === requestingUser.id
    const isAssignedCA  = doc.order.ca?.user.id === requestingUser.id

    if (!isOrderOwner && !isAssignedCA) {
      return NextResponse.json({ error: 'Not authorised to access this document.' }, { status: 403 })
    }

    const downloadUrl = await getDownloadUrl(doc.r2ObjectKey)

    return NextResponse.json({ downloadUrl, fileName: doc.fileName })
  } catch (err) {
    console.error('[documents/download-url]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to generate download URL.' },
      { status: 500 },
    )
  }
}
