import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import TiltCard from './TiltCard'
import Icon from './Icon'
import { skills } from '../data/portfolio'

const all = skills.flatMap((g) => g.items)

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading icon="skills" eyebrow="Skills" title="My toolkit" />
      </div>

      {/* infinite marquee, pauses on hover */}
      <div className="mask-fade-x group mb-16 flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee gap-4 pr-4 group-hover:[animation-play-state:paused]">
          {[...all, ...all].map((s, i) => (
            <div key={i} className="flex shrink-0 items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium dark:border-zinc-800 dark:bg-zinc-900">
              <Icon name={s.icon} className="text-lg text-accent" />
              {s.name}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((g, gi) => (
          <Reveal key={g.group} delay={gi * 0.08}>
            <TiltCard className="h-full rounded-3xl border border-zinc-200 bg-white p-6 transition-shadow duration-500 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60">
              <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-zinc-500">{g.group}</h3>
              <ul className="space-y-1">
                {g.items.map((s, i) => (
                  <motion.li
                    key={s.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-lg text-accent">
                      <Icon name={s.icon} />
                    </span>
                    <span className="text-sm font-medium">{s.name}</span>
                  </motion.li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
