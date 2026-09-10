import { motion } from 'framer-motion';
import {
  CreditCard,
  Building2,
  Wallet,
  RefreshCw,
  Smartphone,
} from 'lucide-react';
import AnimatedDebitCard from './AnimatedDebitCard';

const ease = [0.22, 1, 0.36, 1];

const methods = [
  {
    icon: Smartphone,
    title: 'UPI',
    body: 'Instant account-to-account payments preferred by millions of Indian consumers.',
  },
  {
    icon: CreditCard,
    title: 'Cards',
    body: 'Accept domestic and international card payments through supported configurations.',
  },
  {
    icon: Building2,
    title: 'Net Banking',
    body: 'Bank-led checkout journeys familiar to customers across India.',
  },
  {
    icon: Wallet,
    title: 'Wallets',
    body: 'Reach users who prefer digital wallet balances for everyday online spend.',
  },
  {
    icon: RefreshCw,
    title: 'Recurring',
    body: 'Subscription-friendly billing journeys designed for the Indian payment environment.',
  },
];

export default function PaymentsSection() {
  return (
    <section id="payments" className="relative py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#F8F4EE]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 85% 40%, rgba(249,189,66,0.18), transparent 42%), radial-gradient(ellipse at 10% 80%, rgba(67,73,157,0.1), transparent 40%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-300/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_minmax(280px,1.05fr)] gap-12 lg:gap-14 items-center">
          <div>
            <motion.div
              className="max-w-xl mb-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-orange-600 mb-3">
                Local payment access
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Let Indian customers pay the way they already prefer
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                Enable payment methods relevant to the Indian market — subject to your business
                model and approved payment configuration.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6 lg:gap-7">
              {methods.map(({ icon: Icon, title, body }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.05, ease }}
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-600 border border-slate-200/80 shadow-sm">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-base font-semibold text-slate-900 mb-1.5">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease }}
          >
            <AnimatedDebitCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
