import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, ArrowRight, MapPin } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];
const CONTACT_EMAIL = 'andy@nservetech.com';

const navLinks = [
  { label: 'Showcase', href: '#showcase' },
  { label: 'Market', href: '#market' },
  { label: 'Payments', href: '#payments' },
  { label: 'Path', href: '#path' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="absolute inset-0 bg-[#0b2a38]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 0% 0%, rgba(234,88,12,0.28), transparent 42%), radial-gradient(ellipse at 100% 40%, rgba(14,165,233,0.18), transparent 40%), radial-gradient(ellipse at 50% 100%, rgba(5,150,105,0.1), transparent 45%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff9933] via-white to-[#138808]" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-14 pb-8 lg:pt-16 lg:pb-10">
        <motion.div
          className="footer-top"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease }}
        >
          <div className="footer-brand">
            <a href="#top" className="footer-logo" aria-label="nSERVE Home">
              <img
                src="/nservelogo.png"
                alt=""
                className="footer-logo-img"
                aria-hidden="true"
              />
              <span className="footer-logo-text">nSERVE</span>
            </a>
            <p className="footer-tagline">
              Payment gateway &amp; merchant enablement for international businesses entering
              India.
            </p>
            <p className="footer-slogan">Your Business. Our Market. One Seamless Launch.</p>

            <a href="#contact" className="footer-cta">
              Start India Launch
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="footer-cols">
            <div>
              <p className="footer-col-label">Explore</p>
              <nav className="footer-nav" aria-label="Footer navigation">
                {navLinks.map(({ label, href }) => (
                  <a key={label} href={href} className="footer-nav-link">
                    {label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <p className="footer-col-label">Contact</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="footer-email-card">
                <span className="footer-email-icon">
                  <Mail className="h-4 w-4" />
                </span>
                <span>
                  <span className="footer-email-kicker">Write to us</span>
                  <span className="footer-email-value">{CONTACT_EMAIL}</span>
                </span>
              </a>
              <p className="footer-note">
                <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                {/* <span>
                  On the same domain, FX and PSP loaders help visitors choose their path — Know
                  More routes users to the right nSERVE experience.
                </span> */}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} nSERVE. All rights reserved.</p>
          <p className="footer-bottom-tag">Global Services. Local Possibilities.</p>
        </div>
      </div>
    </footer>
  );
}
