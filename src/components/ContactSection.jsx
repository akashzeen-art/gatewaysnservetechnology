import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Mail,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  MessageSquare,
  Building2,
  Globe2,
  Sparkles,
} from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];
const CONTACT_EMAIL = 'andy@nservetech.com';

const fields = [
  {
    name: 'company',
    label: 'Company Name',
    type: 'text',
    required: true,
    placeholder: 'Acme Digital Ltd',
    group: 'business',
  },
  {
    name: 'website',
    label: 'Website / App',
    type: 'text',
    required: true,
    placeholder: 'https://',
    group: 'business',
    span: 2,
  },
  {
    name: 'country',
    label: 'Country of Incorporation',
    type: 'text',
    required: true,
    placeholder: 'United Arab Emirates',
    group: 'business',
  },
  {
    name: 'category',
    label: 'Business Category',
    type: 'text',
    required: true,
    placeholder: 'SaaS / OTT / Education…',
    group: 'business',
  },
  {
    name: 'contactName',
    label: 'Contact Name',
    type: 'text',
    required: true,
    placeholder: 'Your name',
    group: 'contact',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'you@company.com',
    group: 'contact',
  },
  {
    name: 'phone',
    label: 'Phone / WhatsApp',
    type: 'tel',
    required: true,
    placeholder: '+971…',
    group: 'contact',
  },
  {
    name: 'volume',
    label: 'Expected Monthly Transaction Volume',
    type: 'text',
    required: false,
    placeholder: 'Optional',
    group: 'contact',
    span: 2,
  },
];

const emptyForm = Object.fromEntries(fields.map((f) => [f.name, '']));

const nextSteps = [
  {
    icon: MessageSquare,
    title: 'Share your plans',
    text: 'We review your business model and India launch goals.',
  },
  {
    icon: ShieldCheck,
    title: 'Map the fit',
    text: 'We outline onboarding, compliance and payment setup.',
  },
  {
    icon: Clock3,
    title: 'Get next steps',
    text: 'You receive a clear recommendation to move forward.',
  },
];

const trust = [
  { icon: Building2, label: 'Merchant onboarding' },
  { icon: Globe2, label: 'India payment rails' },
  { icon: Sparkles, label: 'Launch support' },
];

function Field({ field, value, onChange }) {
  return (
    <label className={`contact-field ${field.span === 2 ? 'contact-field--span' : ''}`}>
      <span className="contact-field-label">
        {field.label}
        {field.required ? <span className="contact-req">*</span> : null}
      </span>
      <input
        name={field.name}
        type={field.type}
        required={field.required}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
        className="contact-input"
        autoComplete="off"
      />
    </label>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const lines = fields.map((f) => `${f.label}: ${form[f.name] || '—'}`).join('\n');
    const subject = encodeURIComponent(
      `India Launch Enquiry — ${form.company || 'New Partner'}`,
    );
    const body = encodeURIComponent(
      `Hello nSERVE team,\n\nI'd like to explore launching in India.\n\n${lines}\n\nThank you.`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const businessFields = fields.filter((f) => f.group === 'business');
  const contactFields = fields.filter((f) => f.group === 'contact');

  return (
    <section id="contact" className="contact-section relative py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#F5F7FB]" />
      <div className="absolute inset-0 grid-bg opacity-25" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 15% 0%, rgba(234,88,12,0.12), transparent 42%), radial-gradient(ellipse at 92% 70%, rgba(14,165,233,0.1), transparent 40%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="contact-layout">
          <motion.div
            className="contact-intro"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="contact-eyebrow">Start the conversation</p>
            <h2 className="contact-heading">
              Have a service you want to launch in India?
            </h2>
            <p className="contact-lede">
              Whether you&apos;re an established international business or an emerging digital
              platform, tell us what you&apos;re building and your India plans.
            </p>

            <div className="contact-trust">
              {trust.map(({ icon: Icon, label }) => (
                <span key={label} className="contact-trust-chip">
                  <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                  {label}
                </span>
              ))}
            </div>

            <ol className="contact-steps">
              {nextSteps.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="contact-step">
                  <span className="contact-step-rail" aria-hidden="true">
                    <span className="contact-step-dot">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {i < nextSteps.length - 1 ? <span className="contact-step-line" /> : null}
                  </span>
                  <div>
                    <p className="contact-step-phase">Step {String(i + 1).padStart(2, '0')}</p>
                    <p className="contact-step-title">{title}</p>
                    <p className="contact-step-text">{text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <a href={`mailto:${CONTACT_EMAIL}`} className="contact-email-card">
              <span className="contact-email-icon">
                <Mail className="h-5 w-5" />
              </span>
              <span className="contact-email-copy">
                <span className="contact-email-label">Prefer email?</span>
                <span className="contact-email-value">{CONTACT_EMAIL}</span>
              </span>
              <ArrowRight className="contact-email-arrow h-4 w-4" />
            </a>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            className="contact-form"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
          >
            <div className="contact-form-accent" aria-hidden="true" />
            <div className="contact-form-header">
              <div>
                <p className="contact-form-title">Partner enquiry</p>
                <p className="contact-form-sub">
                  Takes about 2 minutes. We&apos;ll follow up with next steps.
                </p>
              </div>
              <span className="contact-form-badge">
                <Clock3 className="h-3.5 w-3.5" />
                ~2 min
              </span>
            </div>

            <div className="contact-form-block">
              <p className="contact-form-block-label">Business details</p>
              <div className="contact-form-grid">
                {businessFields.map((field) => (
                  <Field
                    key={field.name}
                    field={field}
                    value={form[field.name]}
                    onChange={onChange}
                  />
                ))}
              </div>
            </div>

            <div className="contact-form-block">
              <p className="contact-form-block-label">Your contact</p>
              <div className="contact-form-grid">
                {contactFields.map((field) => (
                  <Field
                    key={field.name}
                    field={field}
                    value={form[field.name]}
                    onChange={onChange}
                  />
                ))}
              </div>
            </div>

            <button type="submit" className="contact-submit">
              <span>Send India launch enquiry</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {submitted && (
              <motion.p
                className="contact-success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  Opening your email client — if it doesn&apos;t appear, write to us at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </span>
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
