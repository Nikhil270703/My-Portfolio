import { SiGithub, SiLinkedin } from 'react-icons/si'
import { LuMail } from 'react-icons/lu'
import { profile } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-zinc-500 sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}. Designed &amp; built with React.</p>
        <div className="flex items-center gap-2">
          {[
            [profile.github, SiGithub, 'GitHub'],
            [profile.linkedin, SiLinkedin, 'LinkedIn'],
            [`mailto:${profile.email}`, LuMail, 'Email'],
          ].map(([href, I, label]) => (
            <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-lg transition hover:-translate-y-0.5 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-white">
              <I />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
