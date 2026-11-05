import { useEffect, useState } from 'react'

// Types each word, pauses, deletes it, then moves to the next one.
export default function Typewriter({ words, typeMs = 80, deleteMs = 40, pauseMs = 1600 }) {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[i % words.length]
    let t
    if (!deleting && text === word) t = setTimeout(() => setDeleting(true), pauseMs)
    else if (deleting && text === '') { setDeleting(false); setI((n) => n + 1) }
    else t = setTimeout(() => setText(word.slice(0, text.length + (deleting ? -1 : 1))), deleting ? deleteMs : typeMs)
    return () => clearTimeout(t)
  }, [text, deleting, i, words, typeMs, deleteMs, pauseMs])

  return (
    <span>
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-blink bg-accent align-middle" style={{ height: '0.9em' }} />
    </span>
  )
}
