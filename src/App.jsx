import { useEffect, useState } from 'react';
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
  const [bootKey, setBootKey] = useState(0);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Pages restored from the back/forward cache keep their old state, so replay the preloader.
  useEffect(() => {
    const onPageShow = (event) => {
      if (event.persisted) setBootKey((key) => key + 1);
    };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
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
      <Preloader key={bootKey} />
    </>
  );
}
