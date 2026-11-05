import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LuArrowUpRight, LuMousePointerClick, LuUsers } from 'react-icons/lu'
import { SiGithub } from 'react-icons/si'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'
import Icon from './Icon'
import ProjectModal from './ProjectModal'
import { projects } from '../data/portfolio'

const filters = {
  All: () => true,
  'AI & ML': (p) => /AI|ML|NLP|Deep/.test(p.category),
  'Full-Stack': (p) => /Full-Stack/.test(p.category),
  Java: (p) => /Java/.test(p.category),
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const list = projects.filter(filters[filter])

  return (
    <section id="projects" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading icon="projects" eyebrow="Projects" title="Selected work">
          AI, machine-learning and full-stack projects I've built end to end. Click any card for the full story.
        </SectionHeading>

        <div className="mb-10 flex flex-wrap gap-2 md:ml-[220px]">
          {Object.keys(filters).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${filter === f ? 'text-white dark:text-zinc-900' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
            >
              {filter === f && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-white" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={p} onOpen={() => setSelected(p)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}

function ProjectCard({ project: p, onOpen }) {
  return (
    <TiltCard
      intensity={6}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen())}
      aria-label={`Open details for ${p.title}`}
      className="group h-full cursor-pointer overflow-hidden rounded-3xl border border-zinc-200 bg-white p-7 transition-shadow duration-500 hover:shadow-2xl hover:shadow-violet-900/10 dark:border-zinc-800 dark:bg-zinc-900/60"
    >
      <div className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${p.accent} blur-2xl transition-transform duration-700 group-hover:scale-150`} />

      <div className="relative flex items-start justify-between">
        <motion.div
          whileHover={{ rotate: -10, scale: 1.08 }}
          className="grid h-14 w-14 place-items-center rounded-2xl border border-zinc-200 bg-zinc-50 text-2xl text-accent dark:border-zinc-700 dark:bg-zinc-800"
        >
          <Icon name={p.icon} />
        </motion.div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${p.status === 'Completed' || p.status === 'Live' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'}`}>
          {p.status}
        </span>
      </div>

      <div className="relative mt-7">
        <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">{p.category}</div>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">{p.title}</h3>
        <p className="mt-1 font-serif text-lg italic text-zinc-500">{p.subtitle}</p>
        {p.team && (
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-500 dark:border-zinc-700">
            <LuUsers /> {p.team.label}
          </span>
        )}
        <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">{p.summary}</p>
      </div>

      <div className="relative mt-6 grid grid-cols-3 gap-3">
        {p.metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-zinc-100 bg-zinc-50/80 px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-800/40">
            <div className="font-semibold tabular-nums">{m.value}</div>
            <div className="text-xs text-zinc-500">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="relative mt-6 flex flex-wrap gap-1.5">
        {p.stack.slice(0, 5).map((s) => (
          <span key={s} className="rounded-md bg-accent-soft px-2 py-1 font-mono text-[11px] text-zinc-700 dark:text-zinc-300">{s}</span>
        ))}
      </div>

      <div className="relative mt-7 flex items-center justify-between border-t border-zinc-100 pt-5 text-sm dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 text-zinc-500 sm:flex"><LuMousePointerClick /> Case study</span>
          {p.links.github && (
            <a href={p.links.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} aria-label={`${p.title} source code on GitHub`}
              className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium transition hover:-translate-y-0.5 hover:border-zinc-900 dark:border-zinc-700 dark:hover:border-white">
              <SiGithub /> Code
            </a>
          )}
          {p.links.live && (
            <a href={p.links.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} aria-label={`${p.title} live demo`}
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/30">
              <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" /></span>
              Live demo
            </a>
          )}
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-zinc-900 text-white transition-transform duration-500 group-hover:rotate-45 dark:bg-white dark:text-zinc-900">
          <LuArrowUpRight />
        </span>
      </div>
    </TiltCard>
  )
}
