import { motion } from 'framer-motion';
import {
  Globe2,
  MapPin,
  Cpu,
  Zap,
  TrendingUp,
  Users,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

const reasons = [
  {
    icon: Globe2,
    title: 'Market Access',
    body: 'A structured route for international digital businesses looking to establish an India presence.',
    accent: '#EA580C',
    glow: 'rgba(234, 88, 12, 0.28)',
  },
  {
    icon: MapPin,
    title: 'Local Enablement',
    body: 'Payment and merchant infrastructure designed around the requirements of the Indian market.',
    accent: '#0EA5E9',
    glow: 'rgba(14, 165, 233, 0.28)',
  },
  {
    icon: Cpu,
    title: 'Technology Ready',
    body: 'API-led and hosted payment integration options to simplify technical deployment.',
    accent: '#7856AF',
    glow: 'rgba(120, 86, 175, 0.28)',
  },
  {
    icon: Zap,
    title: 'Faster Launch',
    body: 'A coordinated onboarding journey designed to reduce unnecessary complexity.',
    accent: '#D97706',
    glow: 'rgba(217, 119, 6, 0.28)',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Infrastructure',
    body: 'Build your India business today with the ability to scale as your customer base grows.',
    accent: '#059669',
    glow: 'rgba(5, 150, 105, 0.28)',
  },
  {
    icon: Users,
    title: 'One Point of Coordination',
    body: 'From assessment through integration and launch, our team remains your primary contact.',
    accent: '#C2410C',
    glow: 'rgba(194, 65, 12, 0.28)',
  },
];

export default function WhyPartnerSection() {
  return (
    <section id="why" className="why-section relative py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 grid-bg opacity-25" aria-hidden="true" />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 8% 0%, rgba(234,88,12,0.08), transparent 40%), radial-gradient(ellipse at 95% 60%, rgba(14,165,233,0.07), transparent 42%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="why-header">
          <motion.div
            className="why-header-copy"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="why-eyebrow">Why partner with us</p>
            <h2 className="why-heading">Enter India with confidence</h2>
            <p className="why-lede">
              One India-focused payment and merchant enablement partner — instead of navigating
              multiple touchpoints alone.
            </p>
          </motion.div>

          <motion.div
            className="why-header-badge"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
          >
            <span className="why-badge-icon">
              <ShieldCheck className="h-5 w-5" strokeWidth={1.85} />
            </span>
            <div>
              <p className="why-badge-title">Coordinated India desk</p>
              <p className="why-badge-text">Assessment → onboarding → integration → go-live</p>
            </div>
          </motion.div>
        </div>

        <div className="why-grid">
          {reasons.map(({ icon: Icon, title, body, accent, glow }, i) => (
            <motion.article
              key={title}
              className="why-card"
              style={{ '--why-accent': accent, '--why-glow': glow }}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.05, ease }}
            >
              <div className="why-card-top">
                <span className="why-card-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="why-card-icon">
                  <Icon className="h-5 w-5" strokeWidth={1.85} />
                </span>
              </div>
              <h3 className="why-card-title">{title}</h3>
              <p className="why-card-body">{body}</p>
              <span className="why-card-bar" aria-hidden="true" />
            </motion.article>
          ))}
        </div>

        <motion.div
          className="why-footer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
        >
          <p>
            Ready to map your India path? Share your model and we&apos;ll outline the next steps.
          </p>
          <a href="#contact" className="why-footer-link">
            Start a conversation
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
