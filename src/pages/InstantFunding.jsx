import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import '../App.css'
import TopSiteBanner from '../components/TopSiteBanner'

function InstantFunding() {
  const [isStickyVisible, setIsStickyVisible] = useState(false)
  const { scrollY } = useScroll()

  // Enhanced Parallax transform for background image
  const backgroundY = useTransform(scrollY, [0, 3000], [0, 800])
  const backgroundOpacity = useTransform(scrollY, [0, 2000], [1, 0.2])
  const backgroundScale = useTransform(scrollY, [0, 2500], [1, 1.3])
  const backgroundBlur = useTransform(scrollY, [0, 1500], [0, 15])

  // Show sticky CTA after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8
      setIsStickyVisible(window.scrollY > heroHeight)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Initialize tracking scripts
  useEffect(() => {
    // Ensure dataLayer exists (GTM is already loaded in index.html)
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      
      // Track page view for GTM
      window.dataLayer.push({
        event: 'page_view',
        page_path: '/instant-funding'
      })
    }

    // Meta Pixel - Load script if not already loaded
    if (typeof window !== 'undefined' && !window.fbq) {
      const script = document.createElement('script')
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'YOUR_PIXEL_ID');
        fbq('track', 'PageView');
      `
      document.head.appendChild(script)
    } else if (window.fbq) {
      // If already loaded, just track page view
      window.fbq('track', 'PageView')
    }
  }, [])

  // Track conversion events
  const trackConversion = (eventName) => {
    // GTM event
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName
      })
    }
    // Meta Pixel event
    if (window.fbq) {
      window.fbq('track', eventName)
    }
    // GA4 event
    if (window.gtag) {
      window.gtag('event', eventName)
    }
  }

  // Parallax Background Component
  const ParallaxBackground = () => (
    <motion.div
      className="parallax-background"
      style={{
        y: backgroundY,
        opacity: backgroundOpacity,
        scale: backgroundScale
      }}
    >
      <motion.div
        className="parallax-image"
        style={{
          filter: `blur(${backgroundBlur}px) brightness(0.7) contrast(1.1)`
        }}
      ></motion.div>
      <div className="parallax-overlay"></div>
    </motion.div>
  )

  return (
    <div className="app">
      {/* Parallax Background */}
      <TopSiteBanner />
      <ParallaxBackground />

      {/* Navigation */}
      <motion.nav
        className="navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container">
          <div className="nav-brand">
          
          <a href='/'><img src="/GoldStoneX_Logo.svg" alt="GoldStoneX Logo" className="nav-logo" /></a>
          </div>
          <div className="nav-links">
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#comparison">Comparison</a>
            <a href="https://dashboard.goldstonex.com/login" target="_blank" className="nav-cta">
              <span className="text-black">GET FUNDED NOW</span>
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Block 1: Hero Screen */}
      <motion.section
        className="hero"
        id="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-background">
          <div className="gradient-overlay"></div>
          <div className="grid-pattern"></div>
        </div>
        <div className="container">
          <div className="hero-main-content">
            <motion.div
              className="hero-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className="hero-title"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Instant Funding. No Evaluation.<br />
                <span className="gradient-text">Trade Up to $200k Today</span>
              </motion.h1>
              <motion.p
                className="hero-subtitle"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Access live capital without months of testing. Request your first payout in as little as 24 hours.
              </motion.p>
            </motion.div>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="hero-form-container"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
            >
              <motion.div
                className="form-header"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <motion.h2
                  className="form-title"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Get Funded Now
                </motion.h2>
                <motion.p
                  className="form-subtitle"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  Start trading with live capital today
                </motion.p>
              </motion.div>

              <motion.a
                href="https://dashboard.goldstonex.com/login"
                target="_blank"
                className="hero-cta-button"
                style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                onClick={() => trackConversion('get_funded_now_click')}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(211, 174, 55, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Get Funded Now</span>
                <span className="button-arrow">→</span>
              </motion.a>
            </motion.div>
            <div className="floating-badges">
              <motion.div
                className="badge-float"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <span className="badge-icon-small">💰</span>
                <span>Up to $200k</span>
              </motion.div>
              <motion.div
                className="badge-float"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <span className="badge-icon-small">⚡</span>
                <span>24hr Payouts</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Block 2: Trust Bar */}
      <motion.section
        className="trust-bar"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="trust-bar-content">
            {/* Trustpilot Widget Placeholder */}
            <motion.div
              className="trustpilot-widget"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="trustpilot-rating">
                <span className="stars-large">⭐⭐⭐⭐⭐</span>
                <span className="rating-text">5/5 on Trustpilot</span>
              </div>
            </motion.div>

            {/* Payment Providers */}
            <motion.div
              className="payment-providers"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="payment-label">Secure Payments:</span>
              <div className="payment-logos">
                <span className="payment-logo">Visa</span>
                <span className="payment-logo">Mastercard</span>
                <span className="payment-logo">Crypto</span>
                <span className="payment-logo">Wise</span>
              </div>
            </motion.div>

            {/* Total Paid Out Ticker */}
            <motion.div
              className="payout-ticker"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="ticker-label">Total Paid Out</span>
              <span className="ticker-amount">$12,450,000+</span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Block 3: How It Works */}
      <motion.section
        className="how-it-works"
        id="how-it-works"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="gradient-overlay gradient-top-left"></div>
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.h2>

          <div className="steps-container">
            <motion.div
              className="step-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="step-number-badge">
                <span className="step-number-text">1</span>
              </div>
              <h3 className="step-title">Select Your Capital Level</h3>
              <p className="step-description">
                Choose from $10k to $200k account sizes. Pick the capital level that matches your trading style and experience.
              </p>
            </motion.div>

            <motion.div
              className="step-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="step-number-badge">
                <span className="step-number-text">2</span>
              </div>
              <h3 className="step-title">Complete Quick Security Check</h3>
              <p className="step-description">
                Verify your identity with a simple, fast security check. No lengthy evaluations or waiting periods.
              </p>
            </motion.div>

            <motion.div
              className="step-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="step-number-badge">
                <span className="step-number-text">3</span>
              </div>
              <h3 className="step-title">Start Trading Live</h3>
              <p className="step-description">
                Access your live trading account immediately. Start trading with real capital right away.
              </p>
            </motion.div>

            <motion.div
              className="step-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="step-number-badge">
                <span className="step-number-text">4</span>
              </div>
              <h3 className="step-title">Scale & Withdraw Profits</h3>
              <p className="step-description">
                Grow your account and request payouts. Scale up to multi-million dollar capital as you prove consistency.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Block 4: Pricing & Programs */}
      <motion.section
        className="pricing-section"
        id="pricing"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="gradient-overlay gradient-top-right"></div>
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Pricing & Programs
          </motion.h2>

          <div className="pricing-grid">
            {[
              { size: '$5,000', fee: '$79.90', split: '80/20', maxLoss: '5%', dailyLoss: '3%' },
              { size: '$10,000', fee: '$119.90', split: '80/20', maxLoss: '5%', dailyLoss: '3%' },
              { size: '$25,000', fee: '$239.90', split: '80/20', maxLoss: '5%', dailyLoss: '3%' },
              { size: '$50,000', fee: '$329.90', split: '80/20', maxLoss: '5%', dailyLoss: '3%' },
              { size: '$100,000', fee: '$549.90', split: '80/20', maxLoss: '5%', dailyLoss: '3%' }
            ].map((plan, index) => (
              <motion.div
                key={index}
                className="pricing-card"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.03 }}
              >
                <div className="pricing-header">
                  <h3 className="pricing-size">{plan.size}</h3>
                  <div className="pricing-fee">
                    <span className="fee-label">One-time Fee</span>
                    <span className="fee-amount">{plan.fee}</span>
                  </div>
                </div>
                <div className="pricing-details">
                  <div className="pricing-detail-item">
                    <span className="detail-label">Profit Split</span>
                    <span className="detail-value">{plan.split}</span>
                  </div>
                  <div className="pricing-detail-item">
                    <span className="detail-label">Max Loss</span>
                    <span className="detail-value">{plan.maxLoss}</span>
                  </div>
                  <div className="pricing-detail-item">
                    <span className="detail-label">Daily Loss</span>
                    <span className="detail-value">{plan.dailyLoss}</span>
                  </div>
                </div>
                <motion.a
                  href="https://dashboard.goldstonex.com/login"
                  target="_blank"
                  className="pricing-cta"
                  onClick={() => trackConversion(`pricing_${plan.size.replace(/\$|,/g, '')}_click`)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Block 5: Scaling Plan */}
      <motion.section
        className="scaling-plan"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="gradient-overlay gradient-center-left"></div>
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Scaling Plan: <span className="gradient-text">Grow Your Capital</span>
          </motion.h2>
          <motion.p
            className="section-description"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your capital doubles as you reach profit milestones. Scale from $10k to multi-million dollar accounts.
          </motion.p>

          <div className="scaling-ladder">
            {[
              { milestone: '10% Profit', capital: '$20,000', from: '$10,000' },
              { milestone: '10% Profit', capital: '$50,000', from: '$25,000' },
              { milestone: '10% Profit', capital: '$100,000', from: '$50,000' },
              { milestone: '10% Profit', capital: '$200,000', from: '$100,000' },
              { milestone: '10% Profit', capital: '$400,000', from: '$200,000' },
              { milestone: '10% Profit', capital: '$1,000,000', from: '$400,000' },
              { milestone: '10% Profit', capital: '$2,500,000', from: '$1,000,000' }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="scaling-step"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
              >
                <div className="scaling-milestone">
                  <span className="milestone-badge">{step.milestone}</span>
                </div>
                <div className="scaling-arrow">→</div>
                <div className="scaling-capital">
                  <span className="capital-from">{step.from}</span>
                  <span className="capital-to">{step.capital}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Block 6: Comparison */}
      <motion.section
        className="comparison-section"
        id="comparison"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="gradient-overlay gradient-bottom-right"></div>
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            GoldStoneX vs. Challenge-Based Firms
          </motion.h2>

          <div className="comparison-table">
            <div className="comparison-header">
              <div className="comparison-col feature-col">Feature</div>
              <div className="comparison-col us-col">GoldStoneX</div>
              <div className="comparison-col them-col">Challenge Firms</div>
            </div>
            {[
              { feature: 'Time to Start Trading', us: 'Instant', them: '30-60 days' },
              { feature: 'Evaluation Phase', us: 'None', them: 'Required' },
              { feature: 'Time Limits', us: 'None', them: 'Strict deadlines' },
              { feature: 'Profit Split', us: 'Up to 90%', them: '50-80%' },
              { feature: 'Payout Speed', us: '24 hours', them: '30-45 days' },
              { feature: 'Account Reset', us: 'No penalty', them: 'Must restart' },
              { feature: 'Scaling Potential', us: 'Unlimited', them: 'Limited' }
            ].map((row, index) => (
              <motion.div
                key={index}
                className="comparison-row"
                initial={{ x: index % 2 === 0 ? -30 : 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="comparison-col feature-col">{row.feature}</div>
                <div className="comparison-col us-col">
                  <span className="check-icon">✔</span> {row.us}
                </div>
                <div className="comparison-col them-col">
                  <span className="cross-icon">✗</span> {row.them}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Block 7: FAQ */}
      <motion.section
        className="faq-section"
        id="faq"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="gradient-overlay gradient-bottom-left"></div>
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="faq-container">
            {[
              {
                q: 'Can I trade news events?',
                a: 'Yes, news trading is allowed. You can trade during major economic announcements and news events without restrictions.'
              },
              {
                q: 'Can I hold positions over the weekend?',
                a: 'Yes, weekend holding is permitted. You have full flexibility to manage your positions as you see fit.'
              },
              {
                q: 'Is scalping allowed?',
                a: 'Absolutely. Scalping and high-frequency trading strategies are fully supported on our platform.'
              },
              {
                q: 'How fast are crypto payouts?',
                a: 'Crypto payouts are processed within 24 hours. We support Bitcoin, Ethereum, and other major cryptocurrencies.'
              },
              {
                q: 'What happens if I hit the max loss?',
                a: 'If you reach the maximum loss limit, your account will be paused. You can restart with a new account, but we also offer account reset options for qualified traders.'
              },
              {
                q: 'Do I need to pass an evaluation?',
                a: 'No evaluation is required. You get instant access to live capital after completing a quick security check.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="faq-question">{faq.q}</h3>
                <p className="faq-answer">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="final-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="gradient-overlay gradient-cta-top"></div>
        <div className="gradient-overlay gradient-cta-bottom"></div>
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="cta-title">
              Ready to Start Trading with Live Capital?
            </h2>
            <p className="cta-subtitle">
              Get instant access to up to $200k. No evaluation. No waiting.
            </p>

            <motion.a
              href="https://dashboard.goldstonex.com/login"
              target="_blank"
              className="cta-button"
              onClick={() => trackConversion('final_cta_click')}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(211, 174, 55, 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              Get Funded Now
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Mobile Sticky CTA */}
      {isStickyVisible && (
        <motion.div
          className="mobile-sticky-cta"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <a
            href="https://dashboard.goldstonex.com/login"
            target="_blank"
            className="sticky-cta-button"
            onClick={() => trackConversion('mobile_sticky_cta_click')}
          >
            Get Funded Now
          </a>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <img src="/GoldStoneX_Logo_yellow.svg" alt="GoldStoneX Logo" className="nav-logo" />
              <p>Trade Without Pressure. Grow Without Limits.</p>
            </div>

            <div className="footer-disclaimer">
              <h4>Disclaimer</h4>
              <p>
                GoldStoneX provides simulated accounts for trader evaluation and educational purposes only.
                No real capital is traded during evaluation. Participation does not involve real-money investment,
                and past results are not indicative of future performance. GoldStoneX is not a broker, financial
                advisor, or investment service provider.
              </p>
            </div>
          </div>

          <div className="footer-links">
            <ul className="footer-link-list">
              <li className="footer-link-item">
                <a target='_blank' href="https://goldstonex.com/privacy-policy/">
                  <span className="footer-link-text">Privacy Policy</span>
                </a>
              </li>
              <li className="footer-link-item">
                <a target='_blank' href="https://goldstonex.com/terms-conditions/">
                  <span className="footer-link-text">Terms &amp; Conditions</span>
                </a>
              </li>
              <li className="footer-link-item">
                <a target='_blank' href="https://goldstonex.com/terms-of-use/">
                  <span className="footer-link-text">Terms of Use</span>
                </a>
              </li>
              <li className="footer-link-item">
                <a target='_blank' href="https://goldstonex.com/faq/">
                  <span className="footer-link-text">FAQ</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 GoldStoneX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default InstantFunding
