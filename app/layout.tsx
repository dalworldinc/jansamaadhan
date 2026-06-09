import type { Metadata } from 'next'
import { Noto_Serif, Noto_Sans } from 'next/font/google'
import './globals.css'

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700'],
  display: 'swap',
})

const notoSans = Noto_Sans({
  subsets: ['latin', 'devanagari'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'JanSamaadhan — जन समाधान | Tax, PAN, Aadhaar & Government Services',
  description: 'India\'s most affordable platform for ITR filing, PAN, Aadhaar, GST, and 95+ government services. Expert CAs. Transparent pricing. Delivered in 48 hours.',
  keywords: 'ITR filing, income tax return, PAN card, Aadhaar update, GST registration, tax filing India',
  openGraph: {
    title: 'JanSamaadhan — आपकी सेवा, आपका हक',
    description: 'Tax filing ₹99 से शुरू। Verified CAs. 48 घंटे में delivery.',
    locale: 'hi_IN',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi" className={`${notoSerif.variable} ${notoSans.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
