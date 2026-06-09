# JanSamaadhan — जन समाधान
## India's Most Affordable Citizen Services Platform

### Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# → Open http://localhost:3000

# Build for production
npm run build
npm start
```

---

### Project Structure

```
jansamaadhan/
├── app/
│   ├── layout.tsx          ← Root layout (fonts, metadata, global CSS)
│   ├── globals.css         ← Brand tokens, animations, utilities
│   └── page.tsx            ← Homepage (assembles all sections)
│
├── components/
│   ├── Navbar.tsx          ← Sticky glassmorphic nav with mobile drawer
│   ├── Footer.tsx          ← Full footer with links, language switcher
│   └── sections/
│       ├── HeroSection.tsx       ← Full-screen hero, bilingual, animated
│       ├── TickerStrip.tsx       ← Live social proof marquee
│       ├── ServicesSection.tsx   ← Top 12 services with category filter
│       ├── HowItWorksSection.tsx ← 5-step visual flow
│       ├── TrustSection.tsx      ← Stats, testimonials, trust logos
│       ├── ComparisonSection.tsx ← vs Agent / ClearTax / JioFinance
│       ├── FAQSection.tsx        ← Accordion FAQ in Hinglish
│       └── CTASection.tsx        ← Final conversion section
│
├── tailwind.config.js      ← Brand colors, fonts, animations
├── tsconfig.json
└── package.json
```

---

### Brand Tokens (tailwind.config.js)

| Token              | Value     | Usage                          |
|--------------------|-----------|-------------------------------|
| `brand-teal`       | `#1A5F7A` | Primary brand, buttons, nav   |
| `brand-teal2`      | `#14495E` | Hover states                  |
| `brand-amber`      | `#F4A300` | CTAs, highlights, badges      |
| `brand-surface`    | `#E8F4F8` | Page backgrounds, hovers      |
| `brand-green`      | `#2D7A3A` | Success states, savings       |
| `brand-ink`        | `#1A1A2E` | Body text                     |

---

### Next Pages to Build

| Page                | Route              | Priority |
|---------------------|--------------------|----------|
| Services listing    | `/services`        | P1 next  |
| User dashboard      | `/dashboard`       | P1       |
| Order flow          | `/order/[service]` | P1       |
| CA portal           | `/ca-portal`       | P2       |
| Login / Register    | `/login`, `/register` | P1    |

---

### Environment Variables (create `.env.local`)

```env
NEXT_PUBLIC_RAZORPAY_KEY=rzp_live_xxxx
NEXT_PUBLIC_WA_NUMBER=918000000000
NEXT_PUBLIC_TOLL_FREE=18001234567
NEXT_PUBLIC_SITE_URL=https://jansamaadhan.in
```

---

### Deployment

**Vercel (recommended)**
```bash
vercel deploy
```

**Self-hosted**
```bash
npm run build
npm start   # runs on port 3000
```

Use NGINX reverse proxy on port 80/443 with SSL.

---

*Built for 1.4 billion Indians — आपकी सेवा, आपका हक*
