import { useState } from 'react'
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
import ChatBot from './components/ChatBot'
import { ToastProvider } from './components/Toast'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <ToastProvider>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
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
      <ChatBot />
    </ToastProvider>
  )
}
