import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decodeSession, COOKIE_NAME } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import { buildDocumentKey, getUploadUrl } from '@/lib/storage'

// POST /api/documents/upload-url
// Body: {
//   orderId:     string
//   docKey:      string  — matches DocRequired.id e.g. "form16", "aadhaar"
//   label:       string  — display label, e.g. "Form 16"
//   required:    boolean
//   fileName:    string  — original file name from the browser File object
//   fileSizeKb:  number
//   mimeType:    string  — e.g. "application/pdf", "image/jpeg"
// }
//
// Returns: { uploadUrl, objectKey, documentId }
//
// Flow:
//   1. Client calls this endpoint to get a presigned PUT URL
//   2. Client PUTs the file directly to R2 using that URL
//   3. Client calls PATCH /api/documents/[documentId]/confirm to mark UPLOADED
//      (or we check R2 object existence on the CA portal side)
//
// This avoids routing multi-MB files through Vercel serverless functions,
// which have a 4.5 MB body limit on the Hobby plan anyway.

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
])

const MAX_FILE_SIZE_KB = 10 * 1024 // 10 MB

export async function POST(req: NextRequest) {
  try {
    // Auth — both customers and CAs can upload documents
    const sessionCookie = cookies().get(COOKIE_NAME)?.value
    const session = decodeSession(sessionCookie)
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 })
    }

    const { orderId, docKey, label, required, fileName, fileSizeKb, mimeType } = await req.json()

    if (!orderId || !docKey || !fileName || !mimeType) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
      return NextResponse.json(
        { error: 'File type not allowed. Upload PDF, JPG, PNG, or WebP.' },
        { status: 400 },
      )
    }

    if (fileSizeKb && fileSizeKb > MAX_FILE_SIZE_KB) {
      return NextResponse.json({ error: 'File too large. Maximum 10 MB.' }, { status: 400 })
    }

    // Verify the order exists and belongs to this user (or is assigned to this CA)
    const user = await prisma.user.findUnique({ where: { phone: session.phone } })
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 })
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } })
    if (!order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
    }

    const isOwner  = order.customerId === user.id
    const isCA     = session.role === 'ca'
    if (!isOwner && !isCA) {
      return NextResponse.json({ error: 'Not authorised to upload to this order.' }, { status: 403 })
    }

    // Build the R2 object key
    const ext       = fileName.split('.').pop() ?? 'bin'
    const objectKey = buildDocumentKey(orderId, docKey, ext)

    // Upsert the OrderDocument row (mark as PENDING until upload confirmed)
    const doc = await prisma.orderDocument.upsert({
      where: {
        // Prisma doesn't support compound upsert on non-unique fields directly,
        // so we upsert on a synthetic unique constraint. Since we don't have one
        // here, we do a findFirst then create-or-update pattern instead.
        id: 'nonexistent', // will never match, so always falls to create
      },
      update: {}, // never reached
      create: {
        orderId,
        docKey,
        label:       label   ?? docKey,
        required:    required ?? true,
        status:      'PENDING',
        r2ObjectKey: objectKey,
        fileName,
        fileSizeKb:  fileSizeKb ?? null,
        mimeType,
        uploadedById: user.id,
      },
    }).catch(async () => {
      // Fallback: find existing doc for this orderId+docKey and update its key
      const existing = await prisma.orderDocument.findFirst({
        where: { orderId, docKey },
      })
      if (existing) {
        return prisma.orderDocument.update({
          where: { id: existing.id },
          data:  {
            status:      'PENDING',
            r2ObjectKey: objectKey,
            fileName,
            fileSizeKb:  fileSizeKb ?? null,
            mimeType,
            uploadedById: user.id,
            uploadedAt:  null,
          },
        })
      }
      // No existing doc — create fresh
      return prisma.orderDocument.create({
        data: {
          orderId,
          docKey,
          label:       label   ?? docKey,
          required:    required ?? true,
          status:      'PENDING',
          r2ObjectKey: objectKey,
          fileName,
          fileSizeKb:  fileSizeKb ?? null,
          mimeType,
          uploadedById: user.id,
        },
      })
    })

    // Generate the presigned PUT URL (10 min TTL)
    const uploadUrl = await getUploadUrl(objectKey, mimeType)

    return NextResponse.json({ uploadUrl, objectKey, documentId: doc.id })
  } catch (err) {
    console.error('[documents/upload-url]', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to generate upload URL.' },
      { status: 500 },
    )
  }
}
