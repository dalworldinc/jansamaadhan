const MSG91_BASE = 'https://control.msg91.com/api/v5/otp'

interface Msg91Response {
  type: 'success' | 'error'
  message: string
}

export async function sendOtp(phone: string): Promise<void> {
  const authKey    = process.env.MSG91_AUTH_KEY
  const templateId = process.env.MSG91_OTP_TEMPLATE_ID
  if (!authKey || !templateId) {
    throw new Error('Msg91 not configured — set MSG91_AUTH_KEY and MSG91_OTP_TEMPLATE_ID.')
  }
  const url = `${MSG91_BASE}?template_id=${templateId}&mobile=91${phone}&authkey=${authKey}&otp_length=6&otp_expiry=10`
  const res  = await fetch(url, { method: 'POST' })
  const data: Msg91Response = await res.json()
  if (data.type !== 'success') throw new Error(data.message || 'Failed to send OTP.')
}

export async function verifyOtp(phone: string, code: string): Promise<boolean> {
  const authKey = process.env.MSG91_AUTH_KEY
  if (!authKey) throw new Error('MSG91_AUTH_KEY not set.')
  const url  = `${MSG91_BASE}/verify?mobile=91${phone}&otp=${code}`
  const res  = await fetch(url, { headers: { authkey: authKey } })
  const data: Msg91Response = await res.json()
  return data.type === 'success'
}

export async function resendOtp(phone: string): Promise<void> {
  const authKey = process.env.MSG91_AUTH_KEY
  if (!authKey) throw new Error('MSG91_AUTH_KEY not set.')
  const url  = `${MSG91_BASE}/retry?mobile=91${phone}&authkey=${authKey}&retrytype=text`
  const res  = await fetch(url, { method: 'POST' })
  const data: Msg91Response = await res.json()
  if (data.type !== 'success') throw new Error(data.message || 'Failed to resend OTP.')
}
