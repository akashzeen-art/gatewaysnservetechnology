import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

/**
 * Mountains parallax hero — same structure & scroll math as
 * https://aryan-tayal.github.io/Mountains-Parallax/
 */
export default function Hero() {
  const mountainLeftRef = useRef(null);
  const mountainRightRef = useRef(null);
  const clouds1Ref = useRef(null);
  const clouds2Ref = useRef(null);
  const textRef = useRef(null);
  const manRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const value = window.scrollY;
      const mountainLeft = mountainLeftRef.current;
      const mountainRight = mountainRightRef.current;
      const cloud1 = clouds1Ref.current;
      const cloud2 = clouds2Ref.current;
      const text = textRef.current;
      const man = manRef.current;
      if (!mountainLeft || !mountainRight || !cloud1 || !cloud2 || !text || !man) return;

      mountainLeft.style.left = `-${value / 0.7}px`;
      cloud2.style.left = `-${value * 2}px`;
      mountainRight.style.left = `${value / 0.7}px`;
      cloud1.style.left = `${value * 2}px`;

      // Pin INDIA toward the top under the navbar while scrolling the hero
      const navOffset = 72;
      const startOffset =
        parseFloat(getComputedStyle(text).marginTop) || text.offsetTop || 96;
      const maxUp = Math.max(startOffset - navOffset, 0);
      const shift = Math.min(value * 1.15, maxUp);
      text.style.transform = `translateY(-${shift}px)`;
      text.style.zIndex = value > 8 ? '40' : '4';

      man.style.height = `${Math.max(window.innerHeight - value, 0)}px`;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <section id="top" className="parallax-top" aria-label="Hero">
        <img src="/parallax/bg.jpg" id="bg" alt="" />
        <h1 id="text" ref={textRef}>
          INDIA
        </h1>
        <img src="/parallax/man.png" id="man" ref={manRef} alt="" />
        <img src="/parallax/clouds_1.png" id="clouds_1" ref={clouds1Ref} alt="" />
        <img src="/parallax/clouds_2.png" id="clouds_2" ref={clouds2Ref} alt="" />
        <img
          src="/parallax/mountain_left.png"
          id="mountain_left"
          ref={mountainLeftRef}
          alt=""
        />
        <img
          src="/parallax/mountain_right.png"
          id="mountain_right"
          ref={mountainRightRef}
          alt=""
        />
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
