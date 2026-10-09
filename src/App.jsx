import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TimedCards from './components/TimedCards';
import MarketSection from './components/MarketSection';
import PaymentsSection from './components/PaymentsSection';
import CapabilitiesSection from './components/CapabilitiesSection';
import PathSection from './components/PathSection';
import WhyPartnerSection from './components/WhyPartnerSection';
import BridgeCTA from './components/BridgeCTA';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

export default function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TimedCards />
        <MarketSection />
        <PaymentsSection />
        <CapabilitiesSection />
        <PathSection />
        <WhyPartnerSection />
        <BridgeCTA />
        <ContactSection />
      </main>
      <Footer />
      <Preloader />
    </>
  );
}
