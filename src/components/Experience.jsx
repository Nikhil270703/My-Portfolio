import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import TiltCard from './TiltCard'
import Icon from './Icon'
import { experience } from '../data/portfolio'

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })

  return (
    <section id="experience" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading icon="experience" eyebrow="Experience" title="Where I've worked" />

        <div ref={ref} className="relative md:ml-[220px]">
          {/* timeline line that draws itself as you scroll */}
          <div className="absolute bottom-0 left-[23px] top-0 w-px bg-zinc-200 dark:bg-zinc-800" />
          <motion.div style={{ scaleY }} className="absolute bottom-0 left-[23px] top-0 w-px origin-top bg-accent" />

          <div className="space-y-10">
            {experience.map((e, i) => (
              <Reveal key={e.role} delay={i * 0.1} className="relative pl-20">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 }}
                  className="absolute left-0 top-6 grid h-12 w-12 place-items-center rounded-2xl border border-zinc-200 bg-white text-xl text-accent shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
                >
                  <Icon name={e.icon} />
                </motion.div>

                <TiltCard intensity={4} className="rounded-3xl border border-zinc-200 bg-white p-7 transition-shadow duration-500 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold">{e.role}</h3>
                      <p className="mt-0.5 text-zinc-500">
                        {e.link ? (
                          <a href={e.link} target="_blank" rel="noreferrer" className="underline decoration-zinc-300 underline-offset-4 transition hover:text-accent hover:decoration-current dark:decoration-zinc-700">{e.org} ↗</a>
                        ) : e.org}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-zinc-200 px-3 py-1 font-mono text-xs text-zinc-500 dark:border-zinc-700">{e.period}</span>
                      <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">{e.type}</span>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {e.points.map((pt, j) => (
                      <li key={j} className="flex gap-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  {e.tools.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {e.tools.map((t) => (
                        <span key={t} className="rounded-md bg-zinc-100 px-2.5 py-1 font-mono text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">{t}</span>
                      ))}
                    </div>
                  )}
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
