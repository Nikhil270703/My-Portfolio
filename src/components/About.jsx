import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import Counter from './Counter'
import TiltCard from './TiltCard'
import { motion } from 'framer-motion'
import Avatar from './Avatar'
import { about, profile } from '../data/portfolio'

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading icon="about" eyebrow="About" title="A little about me" />
        <div className="grid gap-12 md:grid-cols-[180px_1fr] md:gap-10">
          <Reveal className="self-start md:sticky md:top-28">
            <TiltCard intensity={10} className="group mx-auto w-48 md:mx-0 md:w-full">
              <div className="relative">
                <div className="absolute -inset-1.5 rounded-[1.75rem] bg-gradient-to-br from-violet-500 via-cyan-300 to-fuchsia-400 opacity-60 blur-md transition-opacity duration-500 group-hover:opacity-90" />
                <motion.div whileHover={{ scale: 1.02 }} className="relative">
                  <Avatar src={profile.photo} large alt={`${profile.name}, AI/ML engineer and full-stack developer`}
                    className="aspect-square w-full rounded-3xl border-4 border-white shadow-xl dark:border-zinc-900" />
                </motion.div>
              </div>
              <div className="relative mt-5 text-center md:text-left">
                <div className="font-semibold text-zinc-900 dark:text-white">{profile.name}</div>
                <div className="mt-0.5 text-sm font-medium text-zinc-600 dark:text-zinc-300">AI/ML · Full-Stack · Anchor</div>
              </div>
            </TiltCard>
          </Reveal>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}><p>{p}</p></Reveal>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {about.highlights.map((h, i) => (
                <Reveal key={h.label} delay={i * 0.08}>
                  <TiltCard className="h-full rounded-2xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/60">
                    <div className="text-3xl font-semibold tracking-tight md:text-4xl">
                      <Counter value={h.value} decimals={h.decimals} suffix={h.suffix} />
                    </div>
                    <div className="mt-2 text-sm text-zinc-500">{h.label}</div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
