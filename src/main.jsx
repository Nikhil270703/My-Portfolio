import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import './index.css'

// The #boot cover (index.html) stays up until React has painted the real
// page, so the crawler-only text version never flashes on screen.
function removeBoot() {
  const boot = document.getElementById('boot')
  if (!boot) return
  boot.style.transition = 'opacity .25s ease'
  boot.style.opacity = '0'
  setTimeout(() => boot.remove(), 260)
}

const root = document.getElementById('root')
// drop the static text before React mounts so it can't show underneath
root.replaceChildren()

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    {/* reducedMotion="user" respects the visitor's OS setting */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </React.StrictMode>,
)

requestAnimationFrame(() => requestAnimationFrame(removeBoot))
