import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Handshake,
  Wallet,
  Code2,
  RefreshCw,
  Landmark,
  Headphones,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];
const AUTOPLAY_MS = 5000;

const capabilities = [
  {
    id: 'partner',
    icon: Handshake,
    kicker: 'Partnership',
    title: 'One Partner',
    body: 'Work with one India-focused payment and merchant enablement partner instead of navigating multiple touchpoints.',
    tags: ['Single desk', 'Coordinated onboarding', 'India-first'],
    accent: '#EA580C',
    glow: 'rgba(234, 88, 12, 0.4)',
  },
  {
    id: 'payments',
    icon: Wallet,
    kicker: 'Payments',
    title: 'Local Payment Access',
    body: 'Enable customers to pay through methods relevant to India, subject to your model and approved configuration.',
    tags: ['UPI-ready', 'Cards & wallets', 'Local rails'],
    accent: '#0EA5E9',
    glow: 'rgba(14, 165, 233, 0.4)',
  },
  {
    id: 'integration',
    icon: Code2,
    kicker: 'Engineering',
    title: 'Simple Integration',
    body: 'Connect through APIs, hosted checkout or other supported integration models.',
    tags: ['APIs', 'Hosted checkout', 'Flexible models'],
    accent: '#7856AF',
    glow: 'rgba(120, 86, 175, 0.4)',
  },
  {
    id: 'recurring',
    icon: RefreshCw,
    kicker: 'Billing',
    title: 'Subscriptions & Recurring',
    body: 'For eligible subscription businesses, support recurring billing around the Indian payment environment.',
    tags: ['Recurring', 'Subscriptions', 'Retention'],
    accent: '#059669',
    glow: 'rgba(5, 150, 105, 0.4)',
  },
  {
    id: 'settlement',
    icon: Landmark,
    kicker: 'Operations',
    title: 'Collections & Settlement',
    body: 'Manage payment collections and settlement through an integrated merchant relationship.',
    tags: ['Collections', 'Settlement', 'Reporting'],
    accent: '#D97706',
    glow: 'rgba(217, 119, 6, 0.4)',
  },
  {
    id: 'support',
    icon: Headphones,
    kicker: 'Success',
    title: 'Ongoing Support',
    body: 'Our team works with you through onboarding, integration, launch and ongoing operations.',
    tags: ['Launch help', 'Live ops', 'Dedicated care'],
    accent: '#C2410C',
    glow: 'rgba(194, 65, 12, 0.4)',
  },
];

export default function CapabilitiesSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef(null);
  const pickRefs = useRef([]);
  const progressBarRef = useRef(null);
  const pickProgressRef = useRef(null);
  const [inView, setInView] = useState(false);
  const progressRef = useRef(0);
  const startedAtRef = useRef(Date.now());
  const activeRef = useRef(0);
  const current = capabilities[active];

  const applyProgress = useCallback((p) => {
    progressRef.current = p;
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${p})`;
    }
    if (pickProgressRef.current) {
      pickProgressRef.current.style.width = `${p * 100}%`;
    }
  }, []);

  const select = useCallback(
    (index) => {
      const next = (index + capabilities.length) % capabilities.length;
      activeRef.current = next;
      setActive(next);
      startedAtRef.current = Date.now();
      applyProgress(0);
    },
    [applyProgress],
  );

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.28 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused) return undefined;

    startedAtRef.current = Date.now() - progressRef.current * AUTOPLAY_MS;
    let raf = 0;

    const tick = () => {
      const elapsed = Date.now() - startedAtRef.current;
      const p = Math.min(elapsed / AUTOPLAY_MS, 1);
      applyProgress(p);

      if (p >= 1) {
        const next = (activeRef.current + 1) % capabilities.length;
        activeRef.current = next;
        setActive(next);
        startedAtRef.current = Date.now();
        applyProgress(0);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, paused, applyProgress]);

  useEffect(() => {
    const node = pickRefs.current[active];
    if (node) node.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    // Re-bind progress fill to the newly active picker row
    applyProgress(progressRef.current);
  }, [active, applyProgress]);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#F5F7FB]" />
      <div className="absolute inset-0 grid-bg opacity-25" aria-hidden="true" />
      <div
        className="absolute inset-0 transition-[background] duration-700"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(ellipse at 12% 10%, ${current.glow}, transparent 42%), radial-gradient(ellipse at 88% 85%, rgba(14,165,233,0.08), transparent 40%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 lg:mb-12">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-orange-600 mb-3">
              What we enable
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 leading-tight">
              Everything required to accept payments and grow in India
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl">
              Merchant onboarding, local payments, integration and support — one streamlined
              experience.
            </p>
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <span className="cap-counter">
              <span className="cap-counter-num" style={{ color: current.accent }}>
                {String(active + 1).padStart(2, '0')}
              </span>
              <span className="cap-counter-total">
                / {String(capabilities.length).padStart(2, '0')}
              </span>
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                className="cap-nav-btn"
                aria-label="Previous capability"
                onClick={() => select(active - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="cap-nav-btn"
                aria-label="Next capability"
                onClick={() => select(active + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>

        <div
          className="cap-stage-grid"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
          }}
        >
          <motion.article
            className="cap-stage"
            style={{
              '--cap-accent': current.accent,
              '--cap-glow': current.glow,
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="cap-stage-mesh" aria-hidden="true" />
            <div className="cap-stage-orb cap-stage-orb--a" aria-hidden="true" />
            <div className="cap-stage-orb cap-stage-orb--b" aria-hidden="true" />

            <div className="cap-stage-stack">
              {capabilities.map((item, index) => {
                const Icon = item.icon;
                const isActive = index === active;
                return (
                  <div
                    key={item.id}
                    className={`cap-stage-inner ${isActive ? 'is-active' : ''}`}
                    aria-hidden={!isActive}
                  >
                    <p className="cap-stage-kicker">{item.kicker}</p>
                    <div className="cap-stage-icon-wrap">
                      <Icon className="h-7 w-7" strokeWidth={1.75} />
                    </div>
                    <h3 className="cap-stage-title">{item.title}</h3>
                    <p className="cap-stage-body">{item.body}</p>
                    <ul className="cap-stage-tags">
                      {item.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    {isActive ? (
                      <a href="#contact" className="cap-stage-cta">
                        Talk to us
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <span className="cap-stage-cta cap-stage-cta--ghost" aria-hidden="true">
                        Talk to us
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <span className="cap-stage-watermark" aria-hidden="true">
              {String(active + 1).padStart(2, '0')}
            </span>

            <div className="cap-progress" aria-hidden="true">
              <div ref={progressBarRef} className="cap-progress-bar" />
            </div>
          </motion.article>

          <motion.div
            className="cap-picker"
            role="listbox"
            aria-label="Capabilities"
            aria-activedescendant={`cap-option-${current.id}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
          >
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              const isActive = active === index;

              return (
                <button
                  key={item.id}
                  id={`cap-option-${item.id}`}
                  ref={(el) => {
                    pickRefs.current[index] = el;
                  }}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  className={`cap-pick ${isActive ? 'is-active' : ''}`}
                  style={{
                    '--cap-accent': item.accent,
                    '--cap-glow': item.glow,
                  }}
                  onClick={() => select(index)}
                >
                  <span className="cap-pick-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="cap-pick-icon">
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="cap-pick-copy">
                    <span className="cap-pick-title">{item.title}</span>
                    <span className="cap-pick-kicker">{item.kicker}</span>
                  </span>
                  {isActive ? <span className="cap-pick-indicator" /> : null}
                  <span
                    className="cap-pick-progress"
                    aria-hidden="true"
                    ref={isActive ? pickProgressRef : undefined}
                  />
                </button>
              );
            })}
          </motion.div>
        </div>

        <div className="cap-dots md:hidden" role="tablist" aria-label="Capability pages">
          {capabilities.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`cap-dot ${active === index ? 'is-active' : ''}`}
              style={{ '--cap-accent': item.accent }}
              aria-label={item.title}
              aria-selected={active === index}
              onClick={() => select(index)}
            />
          ))}
        </div>

        <p className="cap-autoplay-hint">
          {paused ? 'Paused — move away to continue autoplay' : 'Auto-playing · hover to pause'}
        </p>
      </div>
    </section>
  );
}
