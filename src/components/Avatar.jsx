import { motion } from 'framer-motion'
import { profile } from '../data/portfolio'

// Shows the photo from public/ when one is set in portfolio.js; otherwise an
// animated initials monogram with a slowly rotating gradient ring.
export default function Avatar({ src, alt = profile.name, className = '', large = false }) {
  if (src) {
    const size = large ? 800 : 192
    return (
      <img
        src={`${import.meta.env.BASE_URL}${src}`}
        alt={alt}
        width={size}
        height={size}
        loading={large ? 'lazy' : 'eager'}
        decoding="async"
        className={`object-cover object-top ${className}`}
      />
    )
  }
  return (
    <span role="img" aria-label={alt} className={`relative grid place-items-center overflow-hidden bg-zinc-950 ${className}`}>
      <motion.span
        aria-hidden
        className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,#7c3aed,#06b6d4,#a78bfa,#22d3ee,#7c3aed)] opacity-90"
        animate={{ rotate: 360 }}
        transition={{ duration: large ? 14 : 8, repeat: Infinity, ease: 'linear' }}
      />
      <span aria-hidden className={`absolute bg-zinc-950 ${large ? 'inset-[6px] rounded-[1.35rem]' : 'inset-[2px] rounded-[inherit]'}`} />
      {large && <span aria-hidden className="bg-grid absolute inset-[6px] rounded-[1.35rem] opacity-40" />}
      <span
        aria-hidden
        className={`relative font-serif italic leading-none text-transparent bg-clip-text bg-gradient-to-br from-violet-300 via-white to-cyan-300 ${large ? 'text-7xl md:text-8xl' : 'text-[0.95em]'}`}
      >
        {profile.initials.toLowerCase()}
      </span>
    </span>
  )
}
