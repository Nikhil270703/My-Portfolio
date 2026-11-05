import { useState } from 'react'
import { motion } from 'framer-motion'
import { SiGithub, SiLinkedin } from 'react-icons/si'
import { LuMail, LuCopy, LuSend, LuArrowUpRight } from 'react-icons/lu'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import Magnetic from './Magnetic'
import { useToast } from './Toast'
import { profile } from '../data/portfolio'
import Icon from './Icon'

export default function Contact() {
  const toast = useToast()
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      toast('Email copied to clipboard')
    } catch {
      toast(profile.email)
    }
  }

  function submit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    toast('Opening your email app…')
  }

  const field = 'w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15 dark:border-zinc-800 dark:bg-zinc-900'

  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading icon="contact" eyebrow="Contact" title="Let's build something together">
          I'm looking for AI/ML and software engineering roles. If you have an opportunity, a project or just want to talk AI, my inbox is open.
        </SectionHeading>

        <div className="grid grid-cols-1 gap-10 md:ml-[220px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] [&>*]:min-w-0">
          <div className="space-y-4">
            <Reveal>
              <div className="group flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
                <div className="flex min-w-0 items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-xl text-accent"><LuMail /></span>
                  <div className="min-w-0">
                    <div className="text-xs text-zinc-500">Email</div>
                    <a href={`mailto:${profile.email}`} className="block truncate text-sm font-medium hover:text-accent sm:text-base">{profile.email}</a>
                  </div>
                </div>
                <motion.button whileTap={{ scale: 0.85 }} onClick={copyEmail} aria-label="Copy email address"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-zinc-200 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
                  <LuCopy />
                </motion.button>
              </div>
            </Reveal>
            {[
              [profile.github, SiGithub, 'GitHub', profile.github.replace('https://', '')],
              [profile.linkedin, SiLinkedin, 'LinkedIn', profile.linkedinLabel],
            ].map(([href, I, label, text], i) => (
              <Reveal key={label} delay={0.08 * (i + 1)}>
                <a href={href} target="_blank" rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-xl text-accent"><I /></span>
                    <div>
                      <div className="text-xs text-zinc-500">{label}</div>
                      <div className="font-medium">{text}</div>
                    </div>
                  </div>
                  <LuArrowUpRight className="text-xl text-zinc-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                </a>
              </Reveal>
            ))}
            <Reveal delay={0.24}>
              <div className="grid grid-cols-3 gap-3">
                {profile.coding.map((c) => (
                  <a key={c.label} href={c.href} target="_blank" rel="noreferrer" aria-label={`${c.label} profile`}
                    className="group flex flex-col items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-4 text-center transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-lg text-accent transition-transform duration-300 group-hover:scale-110"><Icon name={c.icon} /></span>
                    <span className="text-sm font-medium">{c.label}</span>
                    <span className="max-w-full truncate font-mono text-[11px] text-zinc-500">@{c.handle}</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form onSubmit={submit} className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-900/60">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Your name</span>
                  <input id="contact-name" required className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Recruiter" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Your email</span>
                  <input id="contact-email" required type="email" className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@company.com" />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Message</span>
                <textarea id="contact-message" required rows={5} className={`${field} resize-none`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me about the role or project…" />
              </label>
              <Magnetic strength={0.15} className="w-full">
                <button type="submit" className="group flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3.5 text-sm font-medium text-white transition hover:shadow-xl dark:bg-white dark:text-zinc-900">
                  Send message
                  <LuSend className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                </button>
              </Magnetic>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
