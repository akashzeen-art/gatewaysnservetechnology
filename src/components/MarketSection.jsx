import { motion } from 'framer-motion';
import {
  ArrowRight,
  Clapperboard,
  FileText,
  Cloud,
  RefreshCw,
  GraduationCap,
  Zap,
  Sparkles,
  LayoutGrid,
  Users,
  Handshake,
  Route,
} from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

const audiences = [
  { label: 'Entertainment & OTT', icon: Clapperboard, accent: '#EA580C' },
  { label: 'Digital Content', icon: FileText, accent: '#0EA5E9' },
  { label: 'SaaS & Software', icon: Cloud, accent: '#7856AF' },
  { label: 'Subscriptions', icon: RefreshCw, accent: '#059669' },
  { label: 'Education', icon: GraduationCap, accent: '#D97706' },
  { label: 'Utilities', icon: Zap, accent: '#0284C7' },
  { label: 'Lifestyle Services', icon: Sparkles, accent: '#C2410C' },
  { label: 'Online Platforms', icon: LayoutGrid, accent: '#4F46E5' },
];

const proof = [
  {
    value: 'Millions',
    label: 'Digitally active consumers',
    detail: 'Ready for local digital services',
    icon: Users,
    accent: '#EA580C',
  },
  {
    value: 'One',
    label: 'India-focused partner',
    detail: 'One desk for the full journey',
    icon: Handshake,
    accent: '#0EA5E9',
  },
  {
    value: '6 steps',
    label: 'Clear path to go-live',
    detail: 'From first call to launch',
    icon: Route,
    accent: '#059669',
  },
];

export default function MarketSection() {
  return (
    <section id="market" className="market-section relative py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#F5F7FB]" />
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 0% 40%, rgba(245,158,11,0.1), transparent 45%), radial-gradient(ellipse at 100% 15%, rgba(14,165,233,0.1), transparent 40%), radial-gradient(ellipse at 60% 100%, rgba(5,150,105,0.06), transparent 42%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="market-hero">
          <motion.div
            className="market-hero-copy"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="market-eyebrow">Why India, why now</p>
            <h2 className="market-heading">
              Take your digital business to one of the world&apos;s fastest-growing markets
            </h2>
            <p className="market-lede">
              You bring the service. We help you bring it to India — with the payment and
              merchant infrastructure required to serve local customers.
            </p>
            <div className="market-tricolor" aria-hidden="true" />
          </motion.div>

          <motion.div
            className="market-proof"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
          >
            {proof.map(({ value, label, detail, icon: Icon, accent }, i) => (
              <motion.article
                key={label}
                className="market-stat"
                style={{ '--market-accent': accent }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease }}
              >
                <span className="market-stat-icon">
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </span>
                <p className="market-stat-value">{value}</p>
                <p className="market-stat-label">{label}</p>
                <p className="market-stat-detail">{detail}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="market-audiences"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, delay: 0.1, ease }}
        >
          <div className="market-audiences-head">
            <p className="market-audiences-title">Built for digital businesses like yours</p>
            <p className="market-audiences-sub">
              From media and SaaS to education and lifestyle — if your customers are digital,
              India is open.
            </p>
          </div>

          <ul className="market-chip-grid">
            {audiences.map(({ label, icon: Icon, accent }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03, ease }}
                className="market-chip"
                style={{ '--market-accent': accent }}
              >
                <span className="market-chip-icon">
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </span>
                <span>{label}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="market-cta"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="market-cta-copy">
            <p className="market-cta-kicker">Ready when you are</p>
            <p className="market-cta-text">
              If you&apos;re ready to enter India, we streamline merchant onboarding, local payment
              access, integration and ongoing support into one coordinated experience.
            </p>
          </div>
          <a href="#contact" className="market-cta-btn">
            Talk to our team
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
