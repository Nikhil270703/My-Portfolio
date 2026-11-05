import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { LuX, LuExternalLink, LuBadgeCheck, LuShieldCheck } from 'react-icons/lu'
import { profile } from '../data/portfolio'

export const certUrl = (file) => `${import.meta.env.BASE_URL}certificates/${file}.pdf`
export const certImg = (file) => `${import.meta.env.BASE_URL}certificates/img/${file}.jpg`

export default function CertificateModal({ cert: c, onClose }) {
  const closeRef = useRef(null)
  const url = certUrl(c.file)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <motion.div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="cert-title">
      <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ y: 40, scale: 0.92, opacity: 0, rotateX: 8 }}
        animate={{ y: 0, scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ y: 30, scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400"><LuBadgeCheck /> {c.issuer} · {c.date}</div>
            <h3 id="cert-title" className="mt-1 font-semibold leading-snug">{c.title}</h3>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {c.verify && (
              <a href={c.verify} target="_blank" rel="noreferrer" className="hidden items-center gap-1.5 rounded-full bg-emerald-500 px-3.5 py-2 text-xs font-medium text-white transition hover:shadow-lg sm:inline-flex">
                <LuShieldCheck /> Verify
              </a>
            )}
            <a href={url} target="_blank" rel="noreferrer" className="hidden items-center gap-1.5 rounded-full border border-zinc-200 px-3.5 py-2 text-xs font-medium transition hover:border-zinc-900 sm:inline-flex dark:border-zinc-700 dark:hover:border-white">
              <LuExternalLink /> Open in new tab
            </a>
            <button ref={closeRef} onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full bg-zinc-100 transition hover:rotate-90 dark:bg-zinc-800">
              <LuX />
            </button>
          </div>
        </div>
        <div className="relative bg-zinc-100 p-3 sm:p-5 dark:bg-zinc-950">
          {!loaded && <div className="aspect-[1.414/1] w-full animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />}
          <motion.img
            src={certImg(c.file)}
            alt={`Certificate: ${c.title}, issued to ${profile.name} by ${c.issuer}`}
            onLoad={() => setLoaded(true)}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={loaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className={`mx-auto max-h-[70vh] w-auto rounded-xl shadow-lg ${loaded ? '' : 'absolute opacity-0'}`}
          />
        </div>
        <a href={url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 border-t border-zinc-100 py-3 text-sm font-medium text-accent sm:hidden dark:border-zinc-800">
          <LuExternalLink /> Open certificate
        </a>
      </motion.div>
    </motion.div>
  )
}
