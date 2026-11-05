import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { LuX, LuCheck, LuArrowRight, LuExternalLink, LuUsers } from 'react-icons/lu'
import { SiGithub } from 'react-icons/si'
import Icon from './Icon'

export default function ProjectModal({ project: p, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }
  const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md" onClick={onClose} />

      <motion.div
        initial={{ y: 80, scale: 0.94, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 60, scale: 0.96, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className="thin-scroll relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-zinc-200 bg-white shadow-2xl sm:rounded-3xl dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className={`relative overflow-hidden border-b border-zinc-100 bg-gradient-to-br ${p.accent} px-8 pb-8 pt-10 dark:border-zinc-800`}>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-zinc-700 backdrop-blur transition hover:rotate-90 hover:bg-white dark:bg-zinc-800/80 dark:text-zinc-200"
          >
            <LuX />
          </button>
          <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', delay: 0.15 }}
            className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-3xl text-accent shadow-lg dark:bg-zinc-800">
            <Icon name={p.icon} />
          </motion.div>
          <div className="mt-6 font-mono text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400">{p.category} · {p.status}</div>
          <h3 id="modal-title" className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{p.title}</h3>
          <p className="mt-1 font-serif text-xl italic text-zinc-600 dark:text-zinc-400">{p.subtitle}</p>
        </div>

        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-9 px-8 py-8">
          {p.team && (
            <motion.div variants={item} className="flex gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/40">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent"><LuUsers /></span>
              <div className="text-sm leading-relaxed">
                <div className="font-semibold">{p.team.label}</div>
                <div className="text-zinc-600 dark:text-zinc-400">Team: {p.team.members}</div>
                <div className="text-zinc-600 dark:text-zinc-400">Guide: {p.team.guide}</div>
                <div className="text-zinc-500">{p.team.place}</div>
              </div>
            </motion.div>
          )}

          <motion.div variants={item}>
            <h4 className="mb-2 font-mono text-xs uppercase tracking-widest text-zinc-500">The problem</h4>
            <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">{p.problem}</p>
          </motion.div>

          {p.pipeline && (
            <motion.div variants={item}>
              <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-zinc-500">Pipeline</h4>
              <div className="flex flex-wrap items-center gap-2">
                {p.pipeline.map((step, i) => (
                  <motion.div key={step} className="flex items-center gap-2" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.1 }}>
                    <span className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-800">{step}</span>
                    {i < p.pipeline.length - 1 && <LuArrowRight className="text-zinc-400" />}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div variants={item}>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-zinc-500">Approach</h4>
            <ol className="space-y-3">
              {p.approach.map((a, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft font-mono text-xs text-accent">{i + 1}</span>
                  <span className="leading-relaxed text-zinc-700 dark:text-zinc-300">{a}</span>
                </li>
              ))}
            </ol>
          </motion.div>

          {p.weights && (
            <motion.div variants={item}>
              <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-zinc-500">Customer Value Score weights</h4>
              <div className="space-y-2.5">
                {p.weights.map(([label, w], i) => (
                  <div key={label} className="grid grid-cols-[130px_1fr_40px] items-center gap-3 text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">{label}</span>
                    <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <motion.div className="h-full rounded-full bg-accent" initial={{ width: 0 }} animate={{ width: `${(w / 25) * 100}%` }} transition={{ delay: 0.5 + i * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} />
                    </div>
                    <span className="text-right font-mono text-xs tabular-nums text-zinc-500">{w}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div variants={item}>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-zinc-500">Results</h4>
            <ul className="space-y-2.5">
              {p.results.map((r, i) => (
                <li key={i} className="flex gap-3">
                  <LuCheck className="mt-1 shrink-0 text-emerald-500" />
                  <span className="leading-relaxed text-zinc-700 dark:text-zinc-300">{r}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item}>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-zinc-500">Tech stack</h4>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="rounded-lg bg-accent-soft px-3 py-1.5 font-mono text-xs text-zinc-700 dark:text-zinc-300">{s}</span>
              ))}
            </div>
          </motion.div>

          {(p.links.github || p.links.live) && (
            <motion.div variants={item} className="flex flex-wrap gap-3 border-t border-zinc-100 pt-6 dark:border-zinc-800">
              {p.links.live && (
                <a href={p.links.live} target="_blank" rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/30">
                  <LuExternalLink /> Try the live demo
                </a>
              )}
              {p.links.github && <a href={p.links.github} target="_blank" rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-white dark:text-zinc-900">
                <SiGithub /> View code on GitHub
                <LuArrowRight className="transition-transform group-hover:translate-x-1" />
              </a>}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
