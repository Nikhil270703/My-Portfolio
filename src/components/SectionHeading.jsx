import { motion } from 'framer-motion'
import {
  LuUser, LuLayers, LuBriefcase, LuWrench, LuGraduationCap, LuAward, LuSend,
} from 'react-icons/lu'
import Reveal from './Reveal'

const icons = {
  about: LuUser,
  projects: LuLayers,
  experience: LuBriefcase,
  skills: LuWrench,
  education: LuGraduationCap,
  certifications: LuAward,
  contact: LuSend,
}

// Section label: an icon badge + name in a pill, instead of numbers.
export default function SectionHeading({ icon, eyebrow, title, children }) {
  const I = icons[icon] || LuUser
  return (
    <div className="mb-14 grid gap-4 md:grid-cols-[180px_1fr] md:gap-10">
      <Reveal>
        <div className="group inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white/70 py-1 pl-1 pr-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
          <motion.span
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 }}
            className="grid h-7 w-7 place-items-center rounded-full bg-accent text-sm text-white dark:text-zinc-900"
          >
            <I />
          </motion.span>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-300">{eyebrow}</span>
        </div>
      </Reveal>
      <div>
        <Reveal delay={0.08}>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h2>
        </Reveal>
        {children && (
          <Reveal delay={0.16}>
            <p className="mt-4 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">{children}</p>
          </Reveal>
        )}
      </div>
    </div>
  )
}
