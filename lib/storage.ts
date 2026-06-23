import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'crypto'

function getClient(): S3Client {
  const accountId = process.env.R2_ACCOUNT_ID
  if (!accountId || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    throw new Error('R2 credentials missing — set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY.')
  }
  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId:     process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  })
}

export function buildDocumentKey(orderId: string, docKey: string, fileExt: string): string {
  const cleanExt = fileExt.replace(/[^a-z0-9]/gi, '').toLowerCase() || 'bin'
  return `orders/${orderId}/${docKey}-${randomUUID()}.${cleanExt}`
}

export async function getUploadUrl(objectKey: string, contentType: string): Promise<string> {
  const bucket = process.env.R2_BUCKET
  if (!bucket) throw new Error('R2_BUCKET not set.')
  const client = getClient()
  return getSignedUrl(
    client,
    new PutObjectCommand({ Bucket: bucket, Key: objectKey, ContentType: contentType }),
    { expiresIn: 600 },
  )
}

export async function getDownloadUrl(objectKey: string): Promise<string> {
  const bucket = process.env.R2_BUCKET
  if (!bucket) throw new Error('R2_BUCKET not set.')
  const client = getClient()
  return getSignedUrl(
    client,
    new GetObjectCommand({ Bucket: bucket, Key: objectKey }),
    { expiresIn: 300 },
  )
}

export async function deleteDocument(objectKey: string): Promise<void> {
  const bucket = process.env.R2_BUCKET
  if (!bucket) throw new Error('R2_BUCKET not set.')
  const client = getClient()
  await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: objectKey }))
}
