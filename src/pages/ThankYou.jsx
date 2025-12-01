import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../App.css'

function ThankYou() {
  const location = useLocation()
  const { email, status } = location.state || {}
  
  const isSuccess = status === 'success'
  const isAlreadySubscribed = status === 'already_subscribed'

  // Redirect to home if no data
  if (!email || !status) {
    return (
      <div className="subscribe-page">
        <div className="subscribe-bg-effect"></div>
        <div className="container">
          <motion.div
            className="subscribe-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <h1 className="subscribe-title">Invalid Access</h1>
            <p className="subscribe-subtitle">Please submit the form to access this page.</p>
            <Link to="/" className="back-button" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Back to Homepage
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="subscribe-page">
      <div className="subscribe-bg-effect"></div>
      <div className="container">
        <motion.div
          className="subscribe-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          {isSuccess ? (
            <>
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

              <h1 className="subscribe-title">You're In! Check your inbox!</h1>
              <p className="subscribe-subtitle">
                We've sent your early access details to<br />
                <strong className="email-highlight">{email}</strong>
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
            </>
          ) : isAlreadySubscribed ? (
            <>
              <div className="success-icon-wrapper">
                <div className="success-icon" style={{ background: 'rgba(211, 174, 55, 0.2)' }}>
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="40" fill="rgba(211, 174, 55, 0.2)" />
                    <path d="M30 40L50 40" stroke="#D3AE37" strokeWidth="5" strokeLinecap="round" />
                    <path d="M40 30L40 50" stroke="#D3AE37" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <h1 className="subscribe-title">Already Subscribed</h1>
              <p className="subscribe-subtitle">
                It seems you already subscribed with<br />
                <strong className="email-highlight">{email}</strong>
              </p>

              <div className="subscribe-message">
                <div className="message-box">
                  <h3>You're All Set!</h3>
                  <ul className="next-steps-list">
                    <li>
                      <span className="list-icon">📧</span>
                      <span>Check your email inbox for your early access details</span>
                    </li>
                    <li>
                      <span className="list-icon">📂</span>
                      <span>Don't forget to check your spam folder</span>
                    </li>
                    <li>
                      <span className="list-icon">🚀</span>
                      <span>You're ready to start your journey to a funded account</span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : null}

          <Link to="/" className="back-button" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Back to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default ThankYou

