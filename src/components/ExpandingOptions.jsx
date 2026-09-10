import { useState } from 'react';
import {
  Wallet,
  Handshake,
  Code2,
  RefreshCw,
  Rocket,
} from 'lucide-react';

const options = [
  {
    id: 'payments',
    title: 'Local Payments',
    sub: 'UPI, cards, wallets & net banking for Indian customers',
    icon: Wallet,
    image: '/expand/payments.jpg',
    accent: '#EA580C',
  },
  {
    id: 'partner',
    title: 'One Partner',
    sub: 'India-focused merchant enablement — one coordinated team',
    icon: Handshake,
    image: '/expand/support.jpg',
    accent: '#F59E0B',
  },
  {
    id: 'integration',
    title: 'Simple Integration',
    sub: 'APIs, hosted checkout & supported connection models',
    icon: Code2,
    image: '/expand/dashboard.jpg',
    accent: '#0EA5E9',
  },
  {
    id: 'recurring',
    title: 'Recurring Billing',
    sub: 'Subscription journeys built for the Indian market',
    icon: RefreshCw,
    image: '/expand/checkout.jpg',
    accent: '#059669',
  },
  {
    id: 'golive',
    title: 'Go Live in India',
    sub: 'From onboarding to launch — a clear path to market',
    icon: Rocket,
    image: '/expand/india.jpg',
    accent: '#C2410C',
  },
];

export default function ExpandingOptions() {
  const [active, setActive] = useState(0);

  return (
    <div className="expand-options" role="listbox" aria-label="What we enable">
      {options.map((item, index) => {
        const Icon = item.icon;
        const isActive = active === index;

        return (
          <button
            key={item.id}
            type="button"
            role="option"
            aria-selected={isActive}
            className={`expand-option ${isActive ? 'is-active' : ''}`}
            style={{
              '--optionBackground': `url(${item.image})`,
              '--optionAccent': item.accent,
            }}
            onClick={() => setActive(index)}
            onFocus={() => setActive(index)}
          >
            <span className="expand-shadow" aria-hidden="true" />
            <span className="expand-label">
              <span className="expand-icon">
                <Icon className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="expand-info">
                <span className="expand-main">{item.title}</span>
                <span className="expand-sub">{item.sub}</span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
