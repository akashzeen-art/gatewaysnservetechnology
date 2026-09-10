import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useScroll } from '../hooks/useScroll';

const navLinks = [
  { label: 'Showcase', href: '#showcase' },
  { label: 'Market', href: '#market' },
  { label: 'Payments', href: '#payments' },
  { label: 'Path', href: '#path' },
  { label: 'Contact', href: '#contact' },
];

const ease = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const { scrolled } = useScroll(24);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.55, ease }}
    >
      <div
        className={`transition-all duration-500 ${
          scrolled || mobileOpen
            ? 'mx-3 sm:mx-4 mt-3 rounded-2xl border border-slate-200/80 bg-white/85 backdrop-blur-xl shadow-[0_12px_40px_-18px_rgba(15,23,42,0.25)]'
            : 'mx-0 mt-0 rounded-none border-transparent bg-transparent shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[4.25rem] flex items-center justify-between gap-4">
          <a
            href="#top"
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="nSERVE Home"
            onClick={() => setMobileOpen(false)}
          >
            <img
              src="/nservelogo.png"
              alt=""
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              aria-hidden="true"
            />
            <div className="leading-tight">
              <span
                className={`font-display text-lg sm:text-xl font-extrabold tracking-tight block ${
                  scrolled || mobileOpen ? 'nav-tricolor-scrolled' : 'nav-tricolor'
                }`}
              >
                nSERVE
              </span>
              <span
                className={`hidden sm:block text-[10px] tracking-[0.14em] uppercase font-bold ${
                  scrolled || mobileOpen ? 'nav-tricolor-scrolled' : 'nav-tricolor'
                }`}
              >
                Global Services. Local Possibilities.
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`relative px-3.5 py-2 text-sm font-extrabold tracking-wide transition-opacity duration-200 group hover:opacity-80 ${
                  scrolled || mobileOpen ? 'nav-tricolor-scrolled' : 'nav-tricolor'
                }`}
              >
                {label}
                <span className="absolute left-3.5 right-3.5 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-[#ff9933] via-white to-[#138808] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-full text-sm font-extrabold px-4 py-2.5 transition-colors duration-300 ${
                scrolled || mobileOpen
                  ? 'bg-gradient-to-r from-[#ff9933] via-orange-500 to-[#138808] text-white'
                  : 'bg-white/95 text-slate-900 hover:bg-white'
              }`}
            >
              Start India Launch
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              className={`md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl transition-colors ${
                scrolled || mobileOpen
                  ? 'text-slate-700 hover:bg-slate-100'
                  : 'text-white hover:bg-white/15'
              }`}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              className="md:hidden border-t border-slate-200/70 px-4 pb-4 pt-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              aria-label="Mobile navigation"
            >
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="block py-3 text-base font-extrabold nav-tricolor-scrolled border-b border-slate-100 last:border-0"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#ff9933] via-orange-500 to-[#138808] text-white text-sm font-extrabold px-4 py-3"
                onClick={() => setMobileOpen(false)}
              >
                Start India Launch
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
