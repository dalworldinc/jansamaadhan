import Navbar from '@/components/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import TickerStrip from '@/components/sections/TickerStrip'
import ServicesSection from '@/components/sections/ServicesSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import TrustSection from '@/components/sections/TrustSection'
import ComparisonSection from '@/components/sections/ComparisonSection'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TickerStrip />
        <ServicesSection />
        <HowItWorksSection />
        <TrustSection />
        <ComparisonSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
