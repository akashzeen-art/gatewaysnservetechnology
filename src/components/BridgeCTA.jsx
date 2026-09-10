import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

export default function BridgeCTA() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden" aria-label="Call to action">
      <div className="absolute inset-0 bg-slate-900" />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 15% 50%, rgba(234,88,12,0.35), transparent 45%), radial-gradient(ellipse at 90% 30%, rgba(14,165,233,0.2), transparent 40%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 india-underline opacity-90" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease }}
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-orange-300 mb-3">
              Ready when you are
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Stop navigating multiple vendors. Launch India with one coordinated partner.
            </h2>
            <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
              Share your business model and India plans — we&apos;ll map the onboarding path,
              payment setup and integration approach.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_14px_34px_-12px_rgba(234,88,12,0.7)]"
          >
            Book a discovery call
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
