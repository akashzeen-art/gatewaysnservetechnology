import { useState, lazy, Suspense } from 'react';
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

const MapPreloader = lazy(() => import('./components/MapPreloader'));

export default function App() {
  const [booting, setBooting] = useState(true);

  return (
    <>
      {booting && (
        <Suspense fallback={<div className="fixed inset-0 z-[100] bg-[#F5F7FB]" aria-hidden />}>
          <MapPreloader onDone={() => setBooting(false)} durationMs={5000} />
        </Suspense>
      )}

      <div className={booting ? 'invisible' : 'visible'} aria-hidden={booting}>
        <Navbar />
        <main>
          <Hero />
          {!booting && <TimedCards />}
          <MarketSection />
          <PaymentsSection />
          <CapabilitiesSection />
          <PathSection />
          <WhyPartnerSection />
          <BridgeCTA />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
