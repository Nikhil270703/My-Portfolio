import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LuEye, LuChevronDown, LuBadgeCheck, LuAward, LuShieldCheck } from 'react-icons/lu'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import TiltCard from './TiltCard'
import Icon from './Icon'
import CertificateModal from './CertificateModal'
import Counter from './Counter'
import { certifications, certificationCategories } from '../data/portfolio'

const INITIAL = 9

export default function Certifications() {
  const [filter, setFilter] = useState('All')
  const [expanded, setExpanded] = useState(false)
  const [preview, setPreview] = useState(null)

  const featured = certifications.filter((c) => c.featured)
  const rest = certifications.filter((c) => !c.featured)
  const list = useMemo(() => (filter === 'All' ? rest : rest.filter((c) => c.category === filter)), [filter, rest])
  const visible = expanded ? list : list.slice(0, INITIAL)
  const counts = Object.fromEntries(certificationCategories.map((c) => [c, rest.filter((x) => x.category === c).length]))

  return (
    <section id="certifications" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading icon="certifications" eyebrow="Certifications" title="Always learning">
          <Counter value={certifications.length} /> certificates from freeCodeCamp, NPTEL (IIT Madras), HackerRank, IBM, CodeChef, VOIS and more, across AI, coding, security and soft skills. Click any certificate to view it.
        </SectionHeading>

        <div className="md:ml-[220px]">
          {/* featured */}
          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <TiltCard
                  role={c.file ? 'button' : undefined}
                  tabIndex={c.file ? 0 : undefined}
                  onClick={c.file ? () => setPreview(c) : undefined}
                  onKeyDown={(e) => c.file && (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setPreview(c))}
                  aria-label={c.file ? `View certificate: ${c.title}` : undefined}
                  className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-violet-500/10 via-white to-cyan-500/5 p-6 transition-shadow duration-300 hover:shadow-xl dark:border-zinc-800 dark:from-violet-500/15 dark:via-zinc-900 dark:to-cyan-500/5 ${c.file ? 'cursor-pointer' : ''}`}
                >
                  <LuAward className="pointer-events-none absolute -right-4 -top-4 text-8xl text-accent opacity-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl text-accent shadow-sm dark:bg-zinc-800"><Icon name={c.icon} /></span>
                  <div className="mt-4 font-mono text-[11px] uppercase tracking-widest text-accent">{c.detail}</div>
                  <h3 className="mt-1 flex-1 font-semibold leading-snug">{c.title}</h3>
                  <p className="mt-2 text-sm text-zinc-500">{c.issuer} · {c.date}</p>
                  {(c.file || c.verify) && (
                    <div className="mt-4 flex items-center gap-3 border-t border-zinc-200/70 pt-3 text-xs font-medium dark:border-zinc-700/60">
                      {c.file && <span className="flex items-center gap-1 text-accent"><LuEye /> View</span>}
                      {c.verify && (
                        <a href={c.verify} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 text-emerald-600 hover:underline dark:text-emerald-400">
                          <LuShieldCheck /> Verify
                        </a>
                      )}
                    </div>
                  )}
                </TiltCard>
              </Reveal>
            ))}
          </div>

          {/* filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            {['All', ...certificationCategories].map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setExpanded(false) }}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${filter === f ? 'text-white dark:text-zinc-900' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
              >
                {filter === f && <motion.span layoutId="cert-pill" className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-white" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                <span className="relative">
                  {f} <span className="ml-1 font-mono text-xs opacity-60">{f === 'All' ? rest.length : counts[f]}</span>
                </span>
              </button>
            ))}
          </div>

          {/* grid */}
          <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((c, i) => (
                <motion.div
                  key={c.title}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.4, delay: (i % INITIAL) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CertCard cert={c} onOpen={() => setPreview(c)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {list.length > INITIAL && (
            <div className="mt-8 flex justify-center">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setExpanded((e) => !e)}
                className="group inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium transition hover:border-zinc-900 dark:border-zinc-700 dark:hover:border-white"
              >
                {expanded ? 'Show less' : `Show all ${list.length} certificates`}
                <LuChevronDown className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>{preview && <CertificateModal cert={preview} onClose={() => setPreview(null)} />}</AnimatePresence>
    </section>
  )
}

function CertCard({ cert: c, onOpen }) {
  const clickable = Boolean(c.file)
  return (
    <TiltCard
      intensity={5}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? onOpen : undefined}
      onKeyDown={(e) => clickable && (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen())}
      aria-label={clickable ? `View certificate: ${c.title}` : undefined}
      className={`group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-5 transition-shadow duration-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60 ${clickable ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <motion.span whileHover={{ rotate: -10, scale: 1.1 }} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-lg text-accent">
          <Icon name={c.icon} />
        </motion.span>
        <span className="rounded-full border border-zinc-200 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:border-zinc-700">{c.category}</span>
      </div>
      <h3 className="mt-4 flex-1 font-semibold leading-snug">{c.title}</h3>
      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs text-zinc-500 dark:border-zinc-800">
        <span className="flex items-center gap-1.5"><LuBadgeCheck className="text-emerald-500" /> {c.issuer} · {c.date}</span>
        {clickable && (
          <span className="flex items-center gap-1 font-medium text-accent opacity-70 transition group-hover:translate-x-0.5 group-hover:opacity-100">
            <LuEye /> View
          </span>
        )}
      </div>
    </TiltCard>
  )
}
