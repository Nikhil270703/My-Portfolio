import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LuMenu, LuX, LuSun, LuMoon, LuMessageSquare } from 'react-icons/lu'
import useTheme from '../hooks/useTheme'
import useActiveSection from '../hooks/useActiveSection'
import { profile } from '../data/portfolio'

const links = [
  ['about', 'About'],
  ['projects', 'Projects'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['education', 'Education'],
  ['certifications', 'Certificates'],
  ['contact', 'Contact'],
]
const ids = links.map(([id]) => id)

export default function Navbar() {
  const [dark, toggle] = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(ids)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ${
          scrolled
            ? 'border border-zinc-200/70 bg-white/70 shadow-lg shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/70'
            : 'border border-transparent'
        }`}
      >
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 font-serif text-lg italic text-violet-200 transition-transform duration-300 group-hover:rotate-[-8deg] dark:bg-white dark:text-violet-600">
            {profile.initials.toLowerCase()}
          </span>
          <span className="hidden text-sm font-semibold sm:block">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map(([id, label]) => (
            <li key={id} className="relative">
              <a
                href={`#${id}`}
                className={`relative z-10 block rounded-lg px-3.5 py-2 text-sm transition-colors ${
                  active === id ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {label}
              </a>
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-lg bg-zinc-100 dark:bg-zinc-800/80"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={dark ? 'moon' : 'sun'}
                initial={{ y: 20, rotate: -90, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                exit={{ y: -20, rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {dark ? <LuMoon /> : <LuSun />}
              </motion.span>
            </AnimatePresence>
          </button>
          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg sm:flex dark:bg-white dark:text-zinc-900"
          >
            <LuMessageSquare className="transition-transform duration-300 group-hover:-rotate-12" />
            Let's talk
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Open menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-xl border border-zinc-200 lg:hidden dark:border-zinc-800"
          >
            {open ? <LuX /> : <LuMenu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-zinc-200 bg-white/95 p-2 shadow-xl backdrop-blur-xl lg:hidden dark:border-zinc-800 dark:bg-zinc-950/95"
          >
            {links.map(([id, label], i) => (
              <motion.li key={id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                <a href={`#${id}`} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900">
                  {label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
