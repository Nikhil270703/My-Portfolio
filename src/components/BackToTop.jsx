import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LuArrowUp } from 'react-icons/lu'

export default function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#top"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-24 right-7 z-40 grid h-11 w-11 place-items-center rounded-full bg-zinc-900 text-white shadow-xl dark:bg-white dark:text-zinc-900"
        >
          <LuArrowUp />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
