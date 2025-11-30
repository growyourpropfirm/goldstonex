import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [footerEmail, setFooterEmail] = useState('')
  const [showSubscribePage, setShowSubscribePage] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    })
  }, [])

  const handleSubmit = (e, type) => {
    e.preventDefault()
    const emailValue = type === 'hero' ? email : footerEmail
    console.log('Email submitted:', emailValue)

    // Store submitted email and show subscribe page
    setSubmittedEmail(emailValue)
    setShowSubscribePage(true)

    // Reset form fields
    setEmail('')
    setFooterEmail('')

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Subscribe Success Page Component
  const SubscribePage = () => (
    <div className="subscribe-page">
      <div className="subscribe-bg-effect"></div>
      <div className="container">
        <div className="subscribe-content" data-aos="zoom-in">
          <div className="success-icon-wrapper">
            <div className="success-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="40" fill="url(#goldGradient)" />
                <path d="M25 40L35 50L55 30" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="80" y2="80">
                    <stop offset="0%" stopColor="#D3AE37" />
                    <stop offset="100%" stopColor="#F4E6AB" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <h1 className="subscribe-title">Success! You're In</h1>
          <p className="subscribe-subtitle">
            We've sent your early access details to<br />
            <strong className="email-highlight">{submittedEmail}</strong>
          </p>

          <div className="subscribe-message">
            <div className="message-box">
              <h3>What's Next?</h3>
              <ul className="next-steps-list">
                <li>
                  <span className="list-icon">📧</span>
                  <span>Check your email for the starter guide and pricing tiers</span>
                </li>
                <li>
                  <span className="list-icon">🎯</span>
                  <span>Review the evaluation rules and account options</span>
                </li>
                <li>
                  <span className="list-icon">🚀</span>
                  <span>Start your journey to a funded account</span>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => setShowSubscribePage(false)}
            className="back-button"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  )

  // Show subscribe page if form was submitted
  if (showSubscribePage) {
    return <SubscribePage />
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar" data-aos="fade-down">
        <div className="container">
          <div className="nav-brand">
            {/* <span className="brand-text">GoldStoneX</span> */}
            <img src="/GoldStoneX_Logo.svg" alt="GoldStoneX Logo" className="nav-logo" />
          </div>
          <div className="nav-links">
            <a href="#how-it-works">How It Works</a>
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
            <button className="nav-cta">START TRADING</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-background">
          <div className="gradient-overlay"></div>
          <div className="grid-pattern"></div>
        </div>
        <div className="container">
          <div className="hero-content" data-aos="fade-up">
            <h1 className="hero-title">
              Trade Without Pressure.<br />
              <span className="gradient-text">Grow Without Limits.</span>
            </h1>
            <p className="hero-subtitle">
              At GoldStoneX, you get funding up to $100,000 — with unlimited trading time,
              transparent rules, and payouts you can rely on.
            </p>
            <p className="hero-tagline">Trade at your pace. Earn at your potential.</p>
            <form className="email-form" onSubmit={(e) => handleSubmit(e, 'hero')} data-aos="fade-up" data-aos-delay="300">
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="email-input"
                />
                <button type="submit" className="cta-button">
                  Get Early Access & Starter Guide
                </button>
              </div>
            </form>
            <br />
            <div className="early-access-badge" data-aos="fade-up" data-aos-delay="200">
              <span className="badge-icon">⚡</span>
              <span>Limited Early Access Spots — Get Your Funded Account Starter Pack</span>
            </div>

          </div>

          <div className="hero-visual" data-aos="fade-left" data-aos-delay="400">
            <div className="trading-card">
              <div className="card-header">
                <div className="card-dot"></div>
                <div className="card-dot"></div>
                <div className="card-dot"></div>
                <span className="card-title">Trading Dashboard</span>
              </div>
              <div className="card-content">
                <div className="price-ticker">
                  <span className="ticker-label">EUR/USD</span>
                  <span className="ticker-price">1.0856</span>
                  <span className="ticker-change positive">+0.24%</span>
                </div>
                <div className="chart-visual">
                  <div className="chart-line"></div>
                  <div className="chart-line"></div>
                  <div className="chart-line"></div>
                  <div className="chart-line"></div>
                  <div className="chart-line"></div>
                  <div className="chart-line"></div>
                </div>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Account Size</span>
                    <span className="stat-value">$100,000</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Profit Split</span>
                    <span className="stat-value">95%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Leverage</span>
                    <span className="stat-value">1:50</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Payout</span>
                    <span className="stat-value">Bi-Weekly</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="floating-badges">
              <div className="badge-float" data-aos="fade-up" data-aos-delay="600">
                <span className="badge-icon-small">💰</span>
                <span>Up to $100k</span>
              </div>
              <div className="badge-float" data-aos="fade-up" data-aos-delay="700">
                <span className="badge-icon-small">⚡</span>
                <span>Instant Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="how-it-works">
        <div className="gradient-overlay gradient-top-left"></div>
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            How the Funding Evaluation Works
          </h2>

          <div className="steps-container">
            <div className="step-card" data-aos="fade-up" data-aos-delay="100">
              <div className="step-number-badge">
                <span className="step-number-text">1</span>
              </div>
              <h3 className="step-title">Get Instant Access</h3>
              <p className="step-description">
                Sign up with your email to unlock your free evaluation starter guide,
                pricing tiers, and early offers.
              </p>
            </div>

            <div className="step-card" data-aos="fade-up" data-aos-delay="200">
              <div className="step-number-badge">
                <span className="step-number-text">2</span>
              </div>
              <h3 className="step-title">Trade Under Real Conditions</h3>
              <p className="step-description">
                Use the GoldStoneX demo environment with real market data to test your
                consistency — under the same risk rules as real accounts.
              </p>
            </div>

            <div className="step-card" data-aos="fade-up" data-aos-delay="300">
              <div className="step-number-badge">
                <span className="step-number-text">3</span>
              </div>
              <h3 className="step-title">Unlock Funding & Withdraw Profits</h3>
              <p className="step-description">
                Complete the evaluation with discipline and get access to a funded account
                with up to 95% profit split and bi-weekly payouts.
              </p>
            </div>
          </div>

          <div className="disclaimer-box" data-aos="fade-up" data-aos-delay="400">
            <span className="disclaimer-icon">💬</span>
            <p>All evaluations take place using simulated funds. No real capital traded during the evaluation.</p>
          </div>
        </div>
      </section>

      {/* No Pressure Section */}
      <section className="no-pressure">
        <div className="section-bg-pattern"></div>
        <div className="gradient-overlay gradient-bottom-right"></div>
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Made a Mistake?<br />
            <span className="gradient-text">You Don't Lose Everything.</span>
          </h2>

          <p className="section-description">
            We know real traders need time, discipline, and flexibility — not pressure.
            <br />
            That’s why GoldStoneX removes countdown timers, harsh restarts, and hidden trap
          </p>

          <div className="no-pressure-content">
            <div className="highlight-box" data-aos="fade-up" data-aos-delay="100">
              <span className="highlight-icon">❗</span>
              <p><strong>No rush. No restart. No hidden penalties.</strong></p>
              <p>Just transparent evaluation — built to assess skill, not luck.</p>
            </div>

            <div className="features-list" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-item">
                <span className="check-icon">✔</span>
                <span>Unlimited Trading Period</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✔</span>
                <span>No strict daily deadlines</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✔</span>
                <span>Fair loss limits — 10% max, 5% daily</span>
              </div>
              <div className="feature-item">
                <span className="check-icon">✔</span>
                <span>Trade at your pace, not against the clock</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <div className="gradient-overlay gradient-bottom-left"></div>
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Trusted by Traders Worldwide
          </h2>

          <div className="testimonials-grid">
            <div className="testimonial-card" data-aos="fade-up" data-aos-delay="100">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">
                Finally, a prop firm that actually gives traders time to grow. No rush, no trick rules.
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">DR</div>
                <div className="author-info">
                  <span className="author-name">Daniel R.</span>
                  <span className="author-role">Futures Trader</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card" data-aos="fade-up" data-aos-delay="200">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">
                I passed without stress because there was no countdown. That changes everything.
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">EK</div>
                <div className="author-info">
                  <span className="author-name">Emily K.</span>
                  <span className="author-role">Forex Trader</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card" data-aos="fade-up" data-aos-delay="300">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">
                Bi-weekly payouts with 90% split made it feel like a real income stream.
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">MC</div>
                <div className="author-info">
                  <span className="author-name">Michael C.</span>
                  <span className="author-role">Funded Trader</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="gradient-overlay gradient-top-right"></div>
        <div className="container">
          <div className="features-header" data-aos="fade-up">
            <h2 className="section-title">
              Designed for Serious Traders,<br />
              <span className="gradient-text">Not Risk-Takers</span>
            </h2>
            <p className="section-description">
              Discipline should be rewarded — not restricted.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">No Hidden Rules</h3>
              <p className="feature-description">No sudden resets</p>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">Bi-weekly Payouts</h3>
              <p className="feature-description">Receive profits every 2 weeks</p>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Transparent Risk Rules</h3>
              <p className="feature-description">10% max loss / 5% daily</p>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Trade Your Strategy</h3>
              <p className="feature-description">Trade under real execution</p>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="500">
              <div className="feature-icon">🔄</div>
              <h3 className="feature-title">No Restart Penalty</h3>
              <p className="feature-description">Earn as you grow</p>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="600">
              <div className="feature-icon">📈</div>
              <h3 className="feature-title">Freedom to Scale</h3>
              <p className="feature-description">No complex conditions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="perfect-for">
        <div className="gradient-overlay gradient-center-left"></div>
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Perfect for Traders Who
          </h2>

          <div className="perfect-for-grid">
            <div className="perfect-for-item" data-aos="fade-up" data-aos-delay="100">
              <span className="check-icon-large">✔</span>
              <p>Have traded demo or live accounts and want real funding</p>
            </div>
            <div className="perfect-for-item" data-aos="fade-up" data-aos-delay="200">
              <span className="check-icon-large">✔</span>
              <p>Prefer trading without strict time pressure or countdown clocks</p>
            </div>
            <div className="perfect-for-item" data-aos="fade-up" data-aos-delay="300">
              <span className="check-icon-large">✔</span>
              <p>Want payouts every two weeks, not every 30–45 days</p>
            </div>
            <div className="perfect-for-item" data-aos="fade-up" data-aos-delay="400">
              <span className="check-icon-large">✔</span>
              <p>Want transparency, trust, and real scaling potential</p>
            </div>
            <div className="perfect-for-item" data-aos="fade-up" data-aos-delay="500">
              <span className="check-icon-large">✔</span>
              <p>Want to trade with peace of mind — not anxiety</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next Section */}
      <section className="what-next">
        <div className="gradient-overlay gradient-center"></div>
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            What Happens Next
          </h2>

          <div className="next-steps">
            <div className="next-step" data-aos="fade-up" data-aos-delay="100">
              <div className="step-number">Step 1</div>
              <p>Register for exclusive access</p>
            </div>
            <div className="step-arrow-icon" data-aos="fade-up" data-aos-delay="150">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 10L25 20L15 30" stroke="#D3AE37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="next-step" data-aos="fade-up" data-aos-delay="200">
              <div className="step-number">Step 2</div>
              <p>Receive your funded strategy guide & offers</p>
            </div>
            <div className="step-arrow-icon" data-aos="fade-up" data-aos-delay="250">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 10L25 20L15 30" stroke="#D3AE37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="next-step" data-aos="fade-up" data-aos-delay="300">
              <div className="step-number">Step 3</div>
              <p>Start your journey to a funded account</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta">
        <div className="gradient-overlay gradient-cta-top"></div>
        <div className="gradient-overlay gradient-cta-bottom"></div>
        <div className="container">
          <div className="cta-content" data-aos="fade-up">
            <h2 className="cta-title">
              Ready to Trade Without Pressure?
            </h2>
            <p className="cta-subtitle">
              Limited spots available this week for early funding access.
            </p>

            <form className="email-form" onSubmit={(e) => handleSubmit(e, 'footer')}>
              <div className="input-group">
                <span className="email-icon">📩</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  required
                  className="email-input"
                />
                <button type="submit" className="cta-button">
                  Unlock Early Access & Starter Pack
                </button>
              </div>
            </form>

            <div className="trust-badge">
              <span>Trusted by traders worldwide</span>
              <div className="d-flex justify-content-center mt-3">
                <img src='/customers.png' width={"auto"} height={"40px"} />
              </div>
              <div className="stars">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>
      </section>

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

          <div className="footer-bottom">
            <p>&copy; 2025 GoldStoneX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
