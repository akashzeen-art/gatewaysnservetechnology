import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PATH_STEPS } from '../data/pathSteps';

const ease = [0.22, 1, 0.36, 1];

function TimelineCard({ step, index }) {
  const isLeft = step.side === 'left';

  return (
    <li className="relative md:grid md:grid-cols-2 md:gap-0">
      {/* Center rail dot */}
      <motion.span
        className="absolute left-7 md:left-1/2 top-8 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: 0.05, ease }}
      >
        <span
          className="absolute h-4 w-4 rounded-full"
          style={{
            backgroundColor: step.color,
            boxShadow: `0 0 0 6px ${step.color}33`,
          }}
        />
      </motion.span>

      {isLeft ? (
        <>
          <div className="md:col-start-1 pl-14 md:pl-0">
            <Card step={step} index={index} align="left" />
          </div>
          <div className="hidden md:block" />
        </>
      ) : (
        <>
          <div className="hidden md:block" />
          <div className="md:col-start-2 pl-14 md:pl-0">
            <Card step={step} index={index} align="right" />
          </div>
        </>
      )}
    </li>
  );
}

function Card({ step, index, align }) {
  const fromX = align === 'left' ? -56 : 56;

  return (
    <motion.article
      className={`relative w-full max-w-md ${
        align === 'left' ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
      }`}
      initial={{ opacity: 0, x: fromX, y: 28 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.06, ease }}
    >
      <span
        className={`hidden md:block absolute top-10 h-px w-12 ${
          align === 'left' ? 'right-0' : 'left-0'
        }`}
        aria-hidden="true"
        style={{
          background:
            align === 'left'
              ? `linear-gradient(90deg, transparent, ${step.color})`
              : `linear-gradient(270deg, transparent, ${step.color})`,
        }}
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-sm p-5 sm:p-6 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.55)]">
        <div
          className="absolute inset-x-0 top-0 h-1"
          aria-hidden="true"
          style={{
            background: `linear-gradient(90deg, ${step.color}, transparent)`,
          }}
        />
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-30 blur-2xl"
          aria-hidden="true"
          style={{ backgroundColor: step.color }}
        />

        <div className="relative flex items-start gap-4">
          <motion.span
            className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white font-display text-sm font-bold"
            style={{
              backgroundColor: step.color,
              boxShadow: `0 10px 28px ${step.color}66`,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 + index * 0.05, ease }}
          >
            <span
              className="absolute inset-0 rounded-full rollout-pulse-ring"
              aria-hidden="true"
              style={{
                backgroundColor: step.color,
                animationDelay: `${index * 0.35}s`,
              }}
            />
            <span className="relative z-10">{step.badge}</span>
          </motion.span>

          <div className="min-w-0 pt-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-200/90 mb-1">
              {step.phase}
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
              {step.title}
            </h3>
            <p className="text-sm sm:text-[15px] text-sky-100/85 leading-relaxed">
              {step.body}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function PathSection() {
  const railRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 0.7', 'end 0.35'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="path"
      className="relative overflow-hidden scroll-mt-20 py-20 lg:py-28"
      aria-label="nSERVE India launch rollout timeline"
    >
      <div className="absolute inset-0 bg-[#053c50]" />
      <div
        className="absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(at 20% 20%, rgba(50, 175, 234, 0.35), transparent 45%), radial-gradient(at 80% 80%, rgba(158, 196, 0, 0.2), transparent 40%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-12 lg:mb-16 max-w-xl">
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300 mb-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            A simple path to market
          </motion.p>
          <motion.h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            {/* The rollout timeline */}
          </motion.h2>
          <motion.p
            className="text-sky-200/90 text-lg"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08, ease }}
          >
            Steps to know — how nSERVE takes you from first conversation to go-live in India.
          </motion.p>
        </div>

        <div className="relative" ref={railRef}>
          <div
            className="absolute left-7 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-sky-300/80 via-white/40 to-orange-400/70"
              style={{ scaleY: lineScale }}
            />
          </div>

          <ol className="relative space-y-8 sm:space-y-10 md:space-y-12">
            {PATH_STEPS.map((step, index) => (
              <TimelineCard key={step.id} step={step} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
