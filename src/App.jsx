import { lazy, Suspense, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loader from './components/Loader'
import ScrollProgress from './components/ScrollProgress'
import CursorGlow from './components/CursorGlow'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
// Loaded after the page: it isn't needed for the first paint
const ChatBot = lazy(() => import('./components/ChatBot'))
import { ToastProvider } from './components/Toast'

export default function App() {
  // The intro plays once per visit; later page loads in the same tab skip it
  const [loading, setLoading] = useState(() => {
    try { return !sessionStorage.getItem('introSeen') } catch { return true }
  })
  const finishIntro = () => {
    try { sessionStorage.setItem('introSeen', '1') } catch { /* storage unavailable */ }
    setLoading(false)
  }

  return (
    <ToastProvider>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onDone={finishIntro} />}
      </AnimatePresence>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero ready={!loading} />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </ToastProvider>
  )
}
