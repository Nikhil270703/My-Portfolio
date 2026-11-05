import { motion } from 'framer-motion'
import { SiGithub, SiLinkedin } from 'react-icons/si'
import { LuArrowRight, LuMail, LuMapPin, LuFileText } from 'react-icons/lu'
import Typewriter from './Typewriter'
import Magnetic from './Magnetic'
import TiltCard from './TiltCard'
import Avatar from './Avatar'
import { profile } from '../data/portfolio'

const ease = [0.22, 1, 0.36, 1]
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }
const word = { hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.9, ease } } }
const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }

const rows = [
  ['name', `"${profile.name}"`, 's'],
  ['degree', 'B.Tech CSE (AI), 2022–26', 'v'],
  ['college', 'NCER, Pune', 'v'],
  ['internship', 'MRND Lab · Java', 'v'],
  ['certs', '19', 'n'],
  ['best_model', '85.2% (InLegalBERT)', 'n'],
  ['stack', '["Python","Java","Next.js"]', 's'],
  ['open_to', 'AI/ML · SDE roles', 'v'],
]
const tone = { s: 'text-accent', v: 'text-zinc-800 dark:text-zinc-200', n: 'text-amber-600 dark:text-amber-400' }

export default function Hero({ ready }) {
  const state = ready ? 'show' : 'hidden'
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-24 pt-36 md:pt-44">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div aria-hidden className="absolute -right-32 top-20 -z-10 h-[420px] w-[420px] animate-float rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-500/15" />
      <div aria-hidden className="absolute -left-40 bottom-0 -z-10 h-[360px] w-[360px] animate-float rounded-full bg-cyan-300/20 blur-3xl [animation-delay:-3s] dark:bg-cyan-500/10" />

      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.3fr_1fr]">
        <motion.div variants={container} initial="hidden" animate={state}>
          <motion.div variants={fade} className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-white/70 py-1 pl-1 pr-4 text-xs font-medium text-zinc-600 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300">
            <Avatar src={profile.photoSmall} className="h-8 w-8 rounded-full text-sm ring-2 ring-white dark:ring-zinc-900" />
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {profile.status}
          </motion.div>

          <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            {['Hi, I’m', profile.shortName + '.'].map((line, li) => (
              <span key={li} className="block overflow-hidden pb-1">
                <motion.span variants={word} className={`inline-block ${li === 1 ? 'font-serif font-normal italic text-accent' : ''}`}>
                  {line}
                </motion.span>
                {li === 1 && <span className="sr-only"> Raghuwanshi</span>}
              </span>
            ))}
            <span className="block overflow-hidden pb-2 text-zinc-400 dark:text-zinc-500">
              <motion.span variants={word} className="inline-block">
                <Typewriter words={profile.roles} />
              </motion.span>
            </span>
          </h1>

          <motion.p variants={fade} className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {profile.tagline}
          </motion.p>

          <motion.div variants={fade} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-zinc-900/20 transition dark:bg-white dark:text-zinc-900">
                View my work
                <LuArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            {profile.resume && (
              <Magnetic>
                <a href={profile.resume} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3.5 text-sm font-medium transition hover:border-zinc-900 dark:border-zinc-700 dark:hover:border-white">
                  <LuFileText /> Resume
                </a>
              </Magnetic>
            )}
            <div className="flex items-center gap-1">
              {[
                [profile.github, SiGithub, 'GitHub'],
                [profile.linkedin, SiLinkedin, 'LinkedIn'],
                ['#contact', LuMail, 'Contact'],
              ].map(([href, I, label]) => (
                <Magnetic key={label} strength={0.4}>
                  <a href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                    className="grid h-12 w-12 place-items-center rounded-full text-lg text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white">
                    <I />
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          <motion.p variants={fade} className="mt-8 flex items-center gap-2 text-sm text-zinc-500">
            <LuMapPin /> {profile.location}
          </motion.p>
        </motion.div>

        {/* notebook-style profile card */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={ready ? { opacity: 1, y: 0, rotate: 0 } : {}}
          transition={{ duration: 1, delay: 0.5, ease }}
        >
          <TiltCard intensity={10} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 shadow-2xl shadow-violet-900/10 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/80">
            <div className="flex items-center gap-2 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="ml-3 font-mono text-xs text-zinc-500">portfolio.ipynb</span>
            </div>
            <div className="p-5 font-mono text-[13px] leading-7">
              <div className="mb-3 text-zinc-500">
                <span className="text-accent">In [1]:</span> nikhil.describe()
              </div>
              {rows.map(([k, v, t], i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, x: -12 }}
                  animate={ready ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1 + i * 0.08, duration: 0.4 }}
                  className="grid grid-cols-[100px_1fr] gap-2"
                >
                  <span className="text-zinc-400">{k}</span>
                  <span className={tone[t]}>{v}</span>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.8 }} className="mt-3 text-zinc-400">
                dtype: <span className="text-zinc-700 dark:text-zinc-300">builder</span>
              </motion.div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-zinc-300 pt-2 dark:border-zinc-700">
          <motion.span animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} className="h-2 w-1 rounded-full bg-zinc-400" />
        </span>
      </motion.a>
    </section>
  )
}
