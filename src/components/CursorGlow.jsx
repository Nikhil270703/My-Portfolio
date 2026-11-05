import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// A soft accent glow that trails the cursor on desktop.
export default function CursorGlow() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 90, damping: 20 })
  const sy = useSpring(y, { stiffness: 90, damping: 20 })

  useEffect(() => {
    const move = (e) => { x.set(e.clientX - 200); y.set(e.clientY - 200) }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[400px] w-[400px] rounded-full bg-accent opacity-[0.07] blur-3xl md:block dark:opacity-[0.09]"
    />
  )
}
