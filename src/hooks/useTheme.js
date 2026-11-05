import { useEffect, useState } from 'react'

export default function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch (e) { /* storage unavailable */ }
  }, [dark])

  return [dark, () => setDark((d) => !d)]
}
