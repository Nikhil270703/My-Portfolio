// ─────────────────────────────────────────────────────────────
//  SEO: at build time this writes real, crawlable HTML into
//  index.html (title, meta tags, structured data and a text
//  version of the page) from src/data/portfolio.js.
//  React replaces the text version as soon as the app loads.
// ─────────────────────────────────────────────────────────────
import { profile, about, projects, experience, education, certifications, skills } from './src/data/portfolio.js'

export const SITE_URL = 'https://nikhilraghuwanshi.live/'

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const title = 'Nikhil Raghuwanshi | AI/ML Engineer & Full-Stack Developer · Portfolio'
const description =
  'Nikhil Raghuwanshi is a B.Tech Computer Science & Engineering (AI) student at Nutan College of Engineering and Research, Pune. Portfolio of AI/ML and full-stack projects: legal judgment prediction with InLegalBERT, a college ERP, institute management and machine learning models.'

function jsonLd() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}#person`,
    name: profile.name,
    alternateName: ['Nikhil Gokul Raghuwanshi', 'Nikhil Raghuvanshi', 'Nikhil270703'],
    url: SITE_URL,
    image: `${SITE_URL}og-image.png`,
    email: `mailto:${profile.email}`,
    jobTitle: 'AI/ML Engineer & Full-Stack Developer',
    description,
    address: { '@type': 'PostalAddress', addressRegion: 'Maharashtra', addressCountry: 'IN' },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Nutan College of Engineering and Research, Pune',
    },
    award: ['Top 5 national ranking, VOIS Innovation Marathon 2.0', 'First place, inter-departmental speech competition'],
    hasCredential: certifications
      .filter((c) => c.featured)
      .map((c) => ({ '@type': 'EducationalOccupationalCredential', name: c.title, recognizedBy: { '@type': 'Organization', name: c.issuer } })),
    knowsAbout: [...new Set(skills.flatMap((g) => g.items.map((i) => i.name)))],
    sameAs: [profile.github, profile.linkedin, ...profile.coding.map((c) => c.href)],
  }
  const site = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    url: SITE_URL,
    name: 'Nikhil Raghuwanshi',
    alternateName: 'Nikhil Raghuwanshi Portfolio',
    author: { '@id': `${SITE_URL}#person` },
  }
  const page = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: SITE_URL,
    name: title,
    mainEntity: { '@id': `${SITE_URL}#person` },
    dateModified: new Date().toISOString().slice(0, 10),
  }
  return [person, site, page].map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n    ')
}

function headTags() {
  return `
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="author" content="${esc(profile.name)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <meta name="keywords" content="Nikhil Raghuwanshi, Nikhil Raghuvanshi, Nikhil270703, Nutan College of Engineering and Research Pune, AI ML engineer, full-stack developer, InLegalBERT, legal AI, Next.js, portfolio" />
    <link rel="canonical" href="${SITE_URL}" />
    <meta name="theme-color" content="#18181b" />

    <meta property="og:type" content="profile" />
    <meta property="og:site_name" content="Nikhil Raghuwanshi" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${SITE_URL}" />
    <meta property="og:image" content="${SITE_URL}og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Nikhil Raghuwanshi, AI/ML Engineer and Full-Stack Developer" />
    <meta property="profile:first_name" content="Nikhil" />
    <meta property="profile:last_name" content="Raghuwanshi" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${SITE_URL}og-image.png" />

    <link rel="apple-touch-icon" href="./apple-touch-icon.png" />
    <link rel="manifest" href="./site.webmanifest" />
    ${jsonLd()}`
}

// Plain, semantic HTML of the whole page for crawlers and no-JS visitors.
function staticBody() {
  const li = (items) => items.map((x) => `<li>${x}</li>`).join('')
  return `
      <main style="max-width:760px;margin:0 auto;padding:48px 20px;font-family:system-ui,sans-serif;line-height:1.6">
        <header>
          <h1>Nikhil Raghuwanshi</h1>
          <p><strong>AI/ML Engineer &amp; Full-Stack Developer</strong> · B.Tech Computer Science &amp; Engineering (AI), Nutan College of Engineering and Research, Pune</p>
          <p>${esc(profile.tagline)}</p>
          <p><a href="${profile.github}">GitHub</a> · <a href="${profile.linkedin}">LinkedIn</a> · <a href="mailto:${profile.email}">${esc(profile.email)}</a></p>
        </header>
        <section id="about-static"><h2>About Nikhil Raghuwanshi</h2>${about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}</section>
        <section id="projects-static"><h2>Projects</h2>
          ${projects.map((p) => `<article><h3>${esc(p.title)}: ${esc(p.subtitle)}</h3><p>${esc(p.summary)}</p><p>Tech: ${esc(p.stack.join(', '))}</p>${p.links.github ? `<p><a href="${p.links.github}">Source code</a>${p.links.live ? ` · <a href="${p.links.live}">Live demo</a>` : ''}</p>` : ''}</article>`).join('')}
        </section>
        <section id="experience-static"><h2>Experience</h2>
          ${experience.map((e) => `<article><h3>${esc(e.role)}, ${esc(e.org)}</h3><p>${esc(e.period)}</p><ul>${li(e.points.map(esc))}</ul></article>`).join('')}
        </section>
        <section id="skills-static"><h2>Skills</h2><ul>${li(skills.map((g) => `${esc(g.group)}: ${esc(g.items.map((i) => i.name).join(', '))}`))}</ul></section>
        <section id="education-static"><h2>Education</h2><ul>${li(education.map((e) => `${esc(e.title)}, ${esc(e.place)} (${esc(e.score)})`))}</ul></section>
        <section id="certifications-static"><h2>Certifications</h2><ul>${li(certifications.map((c) => `${esc(c.title)}, ${esc(c.issuer)} (${esc(c.date)})`))}</ul></section>
      </main>`
}

export default function seoPlugin() {
  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      return html
        .replace('<!--SEO_HEAD-->', headTags())
        .replace('<div id="root"></div>', `<div id="root">${staticBody()}</div>`)
    },
  }
}
