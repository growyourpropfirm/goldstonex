import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import './App.css'

function App() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [footerEmail, setFooterEmail] = useState('')
  // const [isBannerVisible, setIsBannerVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { scrollY } = useScroll()

  // Enhanced Parallax transform for background image - moves slower than scroll for parallax effect
  const backgroundY = useTransform(scrollY, [0, 3000], [0, 800])
  const backgroundOpacity = useTransform(scrollY, [0, 2000], [1, 0.2])
  const backgroundScale = useTransform(scrollY, [0, 2500], [1, 1.3])
  const backgroundBlur = useTransform(scrollY, [0, 1500], [0, 15])


  const handleSubmit = async (e, type) => {
    e.preventDefault()
    const emailValue = type === 'hero' ? email : footerEmail

    setIsLoading(true)

    try {
      // Get Brevo API key from environment variable
      const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY
      const BREVO_LIST_ID = import.meta.env.VITE_BREVO_LIST_ID

      if (!BREVO_API_KEY) {
        console.error('Brevo API key is not configured')
        throw new Error('Subscription service is not configured. Please contact support.')
      }

      // Prepare the request payload
      const payload = {
        email: emailValue,
        updateEnabled: false, // Don't update existing contacts
      }

      // Add list ID if provided and valid
      if (BREVO_LIST_ID && BREVO_LIST_ID.trim() !== '') {
        const listId = parseInt(BREVO_LIST_ID.trim())
        if (!isNaN(listId)) {
          payload.listIds = [listId]
        }
      }

      // Call Brevo API to add contact
      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      let data = {}
      try {
        data = await response.json()
      } catch (error) {
        // If response is not JSON, treat as error
        console.error('Failed to parse response:', error)
      }

      if (response.ok) {
        // Success - contact added
        // Reset form fields
        setEmail('')
        setFooterEmail('')
        
        // Navigate to thank you page with success status
        navigate('/thank-you', { 
          state: { 
            email: emailValue, 
            status: 'success' 
          } 
        })
      } else {
        // Check if contact already exists
        // Brevo returns 400 with message like "Contact already exist" or code "duplicate_parameter"
        const errorMessage = data.message || data.error || ''
        const errorCode = data.code || ''
        const errorText = (errorMessage + ' ' + errorCode).toLowerCase()

        let status = 'already_subscribed'
        if (response.status === 400 && (
          errorText.includes('already') ||
          errorText.includes('exists') ||
          errorText.includes('duplicate') ||
          errorCode === 'duplicate_parameter'
        )) {
          status = 'already_subscribed'
        } else {
          // Other errors - treat as already subscribed for user-friendly experience
          console.error('Brevo API error:', { status: response.status, data })
          status = 'already_subscribed'
        }
        
        // Reset form fields
        setEmail('')
        setFooterEmail('')
        
        // Navigate to thank you page with already subscribed status
        navigate('/thank-you', { 
          state: { 
            email: emailValue, 
            status: status 
          } 
        })
      }
    } catch (error) {
      console.error('Error subscribing:', error)
      // On network errors or other issues, treat as already subscribed for user-friendly experience
      
      // Reset form fields
      setEmail('')
      setFooterEmail('')
      
      // Navigate to thank you page with already subscribed status
      navigate('/thank-you', { 
        state: { 
          email: emailValue, 
          status: 'already_subscribed' 
        } 
      })
    } finally {
      setIsLoading(false)
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
            {/* <span className="brand-text">GoldStoneX</span> */}
            <img src="/GoldStoneX_Logo.svg" alt="GoldStoneX Logo" className="nav-logo" />
          </div>
          <div className="nav-links">
            <a href="#how-it-works">How It Works</a>
            <a href="#features">Features</a>
            {/* <a href="#testimonials">Testimonials</a> */}
            <a href='https://dashboard.goldstonex.com/login' target='_blank' className="nav-cta">
              <span className="text-black">START TRADING</span>
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
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
                Trade Without Pressure.<br />
                <span className="gradient-text">Grow Without Limits.</span>
              </motion.h1>
              <motion.p
                className="hero-subtitle"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                At GoldStoneX, you get funding up to $100,000 — with unlimited trading time,
                transparent rules, and payouts you can rely on.
              </motion.p>
              <motion.p
                className="hero-tagline"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Trade at your pace. Earn at your potential.
              </motion.p>

            </motion.div>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Subscribe Form Integrated in Hero */}
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
                  Get Your Funded Account Starter Pack
                </motion.h2>
                <motion.p
                  className="form-subtitle"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  Limited Early Access Spots Available This Week
                </motion.p>
              </motion.div>

              <motion.form
                className="hero-email-form"
                onSubmit={(e) => handleSubmit(e, 'hero')}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1, type: "spring", stiffness: 100 }}
              >
                <div className="hero-input-group">
                  <div className="input-wrapper">
                    {/* <span className="email-icon-input">📧</span> */}
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="hero-email-input"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="hero-cta-button"
                    disabled={isLoading}
                    whileHover={!isLoading ? { scale: 1.05, boxShadow: "0 10px 30px rgba(211, 174, 55, 0.5)" } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                  >
                    <span>{isLoading ? 'Processing...' : 'Get Access'}</span>
                    {!isLoading && <span className="button-arrow">→</span>}
                    {isLoading && <span className="button-arrow">⏳</span>}
                  </motion.button>
                </div>
                <motion.p
                  className="form-privacy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  🔒 We respect your privacy. Unsubscribe at any time.
                </motion.p>
              </motion.form>
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
                <span>Up to $100k</span>
              </motion.div>
              <motion.div
                className="badge-float"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <span className="badge-icon-small">⚡</span>
                <span>Instant Access</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
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
            How the Funding Evaluation Works
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
              <h3 className="step-title">Get Instant Access</h3>
              <p className="step-description">
                Sign up with your email to unlock your early access, pricing tiers, and early offers.
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
              <h3 className="step-title">Trade Under Real Conditions</h3>
              <p className="step-description">
                Use the GoldStoneX demo environment with real market data to test your
                consistency — under the same risk rules as real accounts.
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
              <h3 className="step-title">Unlock Funding & Withdraw Profits</h3>
              <p className="step-description">
                Complete the evaluation with discipline and get access to a funded account
                with up to 95% profit split and bi-weekly payouts.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="disclaimer-box"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="disclaimer-icon">💬</span>
            <p>All evaluations take place using simulated funds. No real capital traded during the evaluation.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* No Pressure Section */}
      <motion.section
        className="no-pressure"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-bg-pattern"></div>
        <div className="gradient-overlay gradient-bottom-right"></div>
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Made a Mistake?<br />
            <span className="gradient-text">You Don't Lose Everything.</span>
          </motion.h2>

          <motion.div
            className="no-pressure-content"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="highlight-box"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="highlight-icon">❗</span>
              <p><strong>No rush. No restart. No hidden penalties.</strong></p>
              <p>Just transparent evaluation — built to assess skill, not luck.</p>
            </motion.div>

            <motion.div
              className="features-list"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                className="feature-item"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                whileHover={{ x: 10 }}
              >
                <span className="check-icon">✔</span>
                <span>Unlimited Trading Period</span>
              </motion.div>
              <motion.div
                className="feature-item"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                whileHover={{ x: 10 }}
              >
                <span className="check-icon">✔</span>
                <span>No strict daily deadlines</span>
              </motion.div>
              <motion.div
                className="feature-item"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                whileHover={{ x: 10 }}
              >
                <span className="check-icon">✔</span>
                <span>Fair loss limits — 10% max, 5% daily</span>
              </motion.div>
              <motion.div
                className="feature-item"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 }}
                whileHover={{ x: 10 }}
              >
                <span className="check-icon">✔</span>
                <span>Trade at your pace, not against the clock</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      {/* <motion.section 
        className="testimonials" 
        id="testimonials"
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
            Trusted by Traders Worldwide
          </motion.h2>

          <div className="testimonials-grid">
            <motion.div 
              className="testimonial-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
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
            </motion.div>

            <motion.div 
              className="testimonial-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
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
            </motion.div>

            <motion.div 
              className="testimonial-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
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
            </motion.div>
          </div>
        </div>
      </motion.section> */}

      {/* Features Section */}
      <motion.section
        className="features"
        id="features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="gradient-overlay gradient-top-right"></div>
        <div className="container">
          <motion.div
            className="features-header"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              Designed for Serious Traders,<br />
              <span className="gradient-text">Not Risk-Takers</span>
            </h2>
            <p className="section-description">
              Discipline should be rewarded — not restricted.
            </p>
          </motion.div>

          <div className="features-grid">
            <motion.div
              className="feature-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -12, scale: 1.03 }}
            >
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">No Hidden Rules</h3>
              <p className="feature-description">No sudden resets</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -12, scale: 1.03 }}
            >
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">Bi-weekly Payouts</h3>
              <p className="feature-description">Receive profits every 2 weeks</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -12, scale: 1.03 }}
            >
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Transparent Risk Rules</h3>
              <p className="feature-description">10% max loss / 5% daily</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -12, scale: 1.03 }}
            >
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Trade Your Strategy</h3>
              <p className="feature-description">Trade under real execution</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -12, scale: 1.03 }}
            >
              <div className="feature-icon">🔄</div>
              <h3 className="feature-title">No Restart Penalty</h3>
              <p className="feature-description">Earn as you grow</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -12, scale: 1.03 }}
            >
              <div className="feature-icon">📈</div>
              <h3 className="feature-title">Freedom to Scale</h3>
              <p className="feature-description">No complex conditions</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Perfect For Section */}
      <motion.section
        className="perfect-for"
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
            Perfect for Traders Who
          </motion.h2>

          <div className="perfect-for-grid">
            <motion.div
              className="perfect-for-item"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ x: 10, scale: 1.02 }}
            >
              <span className="check-icon-large">✔</span>
              <p>Have traded demo or live accounts and want real funding</p>
            </motion.div>
            <motion.div
              className="perfect-for-item"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ x: 10, scale: 1.02 }}
            >
              <span className="check-icon-large">✔</span>
              <p>Prefer trading without strict time pressure or countdown clocks</p>
            </motion.div>
            <motion.div
              className="perfect-for-item"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ x: 10, scale: 1.02 }}
            >
              <span className="check-icon-large">✔</span>
              <p>Want payouts every two weeks, not every 30–45 days</p>
            </motion.div>
            <motion.div
              className="perfect-for-item"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ x: 10, scale: 1.02 }}
            >
              <span className="check-icon-large">✔</span>
              <p>Want transparency, trust, and real scaling potential</p>
            </motion.div>
            <motion.div
              className="perfect-for-item"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ x: 10, scale: 1.02 }}
            >
              <span className="check-icon-large">✔</span>
              <p>Want to trade with peace of mind — not anxiety</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* What Happens Next Section */}
      <motion.section
        className="what-next"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="gradient-overlay gradient-center"></div>
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What Happens Next
          </motion.h2>

          <div className="next-steps">
            <motion.div
              className="next-step"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ x: 10, scale: 1.02 }}
            >
              <div className="step-number">Step 1</div>
              <p>Register for exclusive access</p>
            </motion.div>
            <motion.div
              className="step-arrow-icon"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              whileHover={{ scale: 1.2, x: 5 }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 10L25 20L15 30" stroke="#D3AE37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <motion.div
              className="next-step"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ x: 10, scale: 1.02 }}
            >
              <div className="step-number">Step 2</div>
              <p>Get early access to our exclusive offers</p>
            </motion.div>
            <motion.div
              className="step-arrow-icon"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              whileHover={{ scale: 1.2, x: 5 }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 10L25 20L15 30" stroke="#D3AE37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <motion.div
              className="next-step"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ x: 10, scale: 1.02 }}
            >
              <div className="step-number">Step 3</div>
              <p>Start your journey to a funded account</p>
            </motion.div>
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
                <button type="submit" className="cta-button" disabled={isLoading}>
                  {isLoading ? 'Subscribing...' : 'Unlock Early Access'}
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
          </motion.div>
        </div>
      </motion.section>

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
