import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/portfolio'

// Short intro screen: initials draw in, then the panel slides up to reveal the page.
export default function Loader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 900)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 text-white"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex overflow-hidden font-serif text-7xl italic">
          {profile.initials.split('').map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch}
            </motion.span>
          ))}
        </div>
        <div className="h-px w-40 overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-violet-300"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
