// ── Session cookie helpers ──────────────────────────────────────────
//
// DEMO IMPLEMENTATION — replace with a signed JWT (e.g. jose) or
// Iron Session before going to production. The cookie is httpOnly so
// it can't be read/forged from client JS, but it is NOT cryptographically
// signed, so a user could still tamper with it via browser dev tools /
// direct cookie edits. Fine for a prototype, not for real auth.
//
// Cookie value format: "<role>:<phone>"   e.g. "customer:9876543210"
//                                               "ca:9876543210"

export type UserRole = 'customer' | 'ca'

export interface SessionData {
  role:  UserRole
  phone: string
}

const COOKIE_NAME = 'js_session'

export function encodeSession(role: UserRole, phone: string): string {
  return `${role}:${phone}`
}

export function decodeSession(value: string | undefined | null): SessionData | null {
  if (!value) return null
  const [role, phone] = value.split(':')
  if (role !== 'customer' && role !== 'ca') return null
  if (!phone) return null
  return { role, phone }
}

export { COOKIE_NAME }
