import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LuX, LuSend, LuArrowUpRight, LuCopy, LuSparkles } from 'react-icons/lu'
import { getReply, starterChips } from '../data/chatbot'
import { useToast } from './Toast'
import { profile } from '../data/portfolio'
import Avatar from './Avatar'

const welcome = {
  from: 'bot',
  text: `Hi! 👋 I'm Nikhil's assistant. Ask me anything about his projects, skills, experience or certificates.`,
  chips: starterChips,
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([welcome])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [nudge, setNudge] = useState(false)
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const toast = useToast()

  // show a small "Ask me" bubble once, a few seconds after the page loads
  useEffect(() => {
    const show = setTimeout(() => setNudge(true), 5000)
    const hide = setTimeout(() => setNudge(false), 13000)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (!open) return
    setNudge(false)
    setTimeout(() => inputRef.current?.focus(), 300)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  function ask(text) {
    const q = text.trim()
    if (!q || typing) return
    setMessages((m) => [...m.map((x) => ({ ...x, chips: undefined })), { from: 'user', text: q }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', ...getReply(q) }])
      setTyping(false)
    }, 550 + Math.random() * 450)
  }

  async function copy(text) {
    try { await navigator.clipboard.writeText(text); toast('Copied to clipboard') } catch { toast(text) }
  }

  return (
    <>
      {/* launcher */}
      <div className="fixed bottom-6 right-6 z-[65] flex items-end gap-3">
        <motion.button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close chat' : 'Ask about Nikhil'}
          aria-expanded={open}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.94 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 18 }}
          className={`relative flex items-center gap-2.5 rounded-full bg-zinc-900 text-white shadow-2xl shadow-violet-900/30 ring-4 ring-accent/20 dark:bg-white dark:text-zinc-900 ${open ? 'h-14 w-14 justify-center' : 'h-14 py-1.5 pl-1.5 pr-1.5 sm:pr-5'}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }} transition={{ duration: 0.2 }} className="text-2xl">
                <LuX />
              </motion.span>
            ) : (
              <motion.span key="ask" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }} className="flex items-center gap-2.5">
                <span className="relative">
                  <Avatar src={profile.photoSmall} alt="" className="h-11 w-11 rounded-full text-base ring-2 ring-white/20 dark:ring-zinc-900/10" />
                  <motion.span
                    animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.5 }}
                    className="absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full bg-accent text-[11px] text-white ring-2 ring-zinc-900 dark:text-zinc-900 dark:ring-white"
                  >
                    <LuSparkles />
                  </motion.span>
                </span>
                <span className="hidden text-sm font-medium sm:block">Ask about me</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with Nikhil's assistant"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            style={{ transformOrigin: 'bottom right' }}
            className="fixed inset-x-3 bottom-24 z-[65] flex h-[min(600px,calc(100dvh-8rem))] flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-900/20 sm:inset-x-auto sm:right-6 sm:w-[390px] dark:border-zinc-800 dark:bg-zinc-950"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-zinc-100 bg-gradient-to-br from-violet-500/10 to-cyan-500/5 px-5 py-4 dark:border-zinc-800">
              <div className="relative">
                <Avatar src={profile.photoSmall} className="h-10 w-10 rounded-full text-base" />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-zinc-950" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">Ask about Nikhil</div>
                <div className="flex items-center gap-1 text-xs text-zinc-500"><LuSparkles /> Automated assistant · replies instantly</div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="grid h-8 w-8 place-items-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <LuX />
              </button>
            </div>

            {/* messages */}
            <div ref={listRef} className="thin-scroll flex-1 space-y-4 overflow-y-auto px-4 py-5">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`flex flex-col ${m.from === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'rounded-br-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                        : 'rounded-bl-md bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200'
                    }`}
                  >
                    {m.text}
                  </div>

                  {(m.links?.length > 0 || m.copy) && (
                    <div className="mt-2 flex max-w-[88%] flex-wrap gap-1.5">
                      {m.links?.filter((l) => l.href).map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          target={l.href.startsWith('#') ? undefined : '_blank'}
                          rel="noreferrer"
                          onClick={() => l.href.startsWith('#') && window.innerWidth < 640 && setOpen(false)}
                          className="inline-flex items-center gap-1 rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-accent transition hover:-translate-y-0.5 hover:border-accent dark:border-zinc-700"
                        >
                          {l.label} <LuArrowUpRight />
                        </a>
                      ))}
                      {m.copy && (
                        <button onClick={() => copy(m.copy)} className="inline-flex items-center gap-1 rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium transition hover:-translate-y-0.5 hover:border-zinc-900 dark:border-zinc-700 dark:hover:border-white">
                          <LuCopy /> Copy email
                        </button>
                      )}
                    </div>
                  )}

                  {m.chips && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {m.chips.map((c, ci) => (
                        <motion.button
                          key={c}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 + ci * 0.05 }}
                          onClick={() => ask(c)}
                          className="rounded-full bg-accent-soft px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:-translate-y-0.5 hover:bg-accent hover:text-white dark:text-zinc-200"
                        >
                          {c}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-zinc-100 px-4 py-3.5 dark:bg-zinc-900" aria-label="Assistant is typing">
                  {[0, 1, 2].map((d) => (
                    <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-zinc-400" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.12 }} />
                  ))}
                </motion.div>
              )}
            </div>

            {/* input */}
            <form onSubmit={(e) => { e.preventDefault(); ask(input) }} className="flex items-center gap-2 border-t border-zinc-100 p-3 dark:border-zinc-800">
              <label htmlFor="chat-input" className="sr-only">Type your question</label>
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, skills, certificates…"
                autoComplete="off"
                className="flex-1 rounded-xl bg-zinc-100 px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-accent/40 dark:bg-zinc-900"
              />
              <motion.button
                type="submit"
                whileTap={{ scale: 0.9 }}
                disabled={!input.trim() || typing}
                aria-label="Send"
                className="grid h-10 w-10 place-items-center rounded-xl bg-zinc-900 text-white transition disabled:opacity-30 dark:bg-white dark:text-zinc-900"
              >
                <LuSend />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
