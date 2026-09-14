import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

const HERO_VIDEO_DESKTOP =
  'https://vz-7fee017a-811.b-cdn.net/b155e413-dae6-4a70-bbcc-3a3e71f791eb/play_480p.mp4';
const HERO_VIDEO_MOBILE =
  'https://vz-7fee017a-811.b-cdn.net/c994af8a-b534-4767-96e0-2823699275b2/play_480p.mp4';

/**
 * Full-bleed video hero, then intro section below.
 */
export default function Hero() {
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
      ? HERO_VIDEO_MOBILE
      : HERO_VIDEO_DESKTOP,
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const sync = () => {
      setVideoSrc(mq.matches ? HERO_VIDEO_MOBILE : HERO_VIDEO_DESKTOP);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, [videoSrc]);

  return (
    <>
      <section id="top" className="parallax-top" aria-label="Hero">
        <video
          ref={videoRef}
          key={videoSrc}
          id="hero-video"
          className="parallax-hero-video"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="parallax-hero-scrim" aria-hidden="true" />
      </section>

      <section id="sec" className="parallax-sec" aria-label="nSERVE introduction">
        <div className="parallax-sec-bg" aria-hidden="true" />
        <div className="parallax-sec-grid" aria-hidden="true" />

        <div className="parallax-sec-inner">
          <div className="parallax-sec-main">
            <div className="parallax-sec-copy">
              <p className="parallax-eyebrow">
                <span className="parallax-eyebrow-dot" aria-hidden="true" />
                nSERVE · Payment Gateway
              </p>
              <h2>
                Namaste India!
                <span className="parallax-sec-accent">Your Business. Our Market.</span>
              </h2>
              <p className="parallax-sec-lede">
                You bring the service. We help you bring it to India — merchant onboarding, local
                payment access, simple integration, and a clear path to go live with one
                India-focused partner.
              </p>

              <div className="parallax-cta">
                <a href="#contact" className="parallax-btn-primary">
                  Start India Launch
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#showcase" className="parallax-btn-ghost">
                  Explore showcase
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>

              <div className="parallax-sec-tricolor" aria-hidden="true" />
            </div>

            <aside className="parallax-sec-aside" aria-label="Launch highlights">
              <p className="parallax-aside-kicker">India launch kit</p>
              <p className="parallax-aside-title">Everything you need to go live locally</p>
              <ul className="parallax-aside-list">
                <li>Merchant onboarding &amp; KYC</li>
                <li>Local payment methods</li>
                <li>API or hosted checkout</li>
                <li>Testing through go-live</li>
              </ul>
              <a href="#path" className="parallax-aside-link">
                See the 6-step path
                <ChevronRight className="h-4 w-4" />
              </a>
            </aside>
          </div>

          <div className="parallax-points">
            {[
              {
                title: 'One partner',
                desc: 'End-to-end India enablement',
                num: '01',
                accent: '#EA580C',
              },
              {
                title: 'Local payments',
                desc: 'UPI, cards, wallets & more',
                num: '02',
                accent: '#0EA5E9',
              },
              {
                title: 'Faster launch',
                desc: 'Coordinated onboarding',
                num: '03',
                accent: '#059669',
              },
              {
                title: 'Ongoing support',
                desc: 'From KYC to go-live',
                num: '04',
                accent: '#D97706',
              },
            ].map(({ title, desc, num, accent }) => (
              <article
                key={title}
                className="parallax-point"
                style={{ '--point-accent': accent }}
              >
                <span className="parallax-point-num">{num}</span>
                <p className="parallax-point-title">{title}</p>
                <p className="parallax-point-desc">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
