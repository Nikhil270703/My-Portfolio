// ─────────────────────────────────────────────────────────────
//  SEO: at build time this writes real, crawlable HTML into
//  index.html (title, meta tags, structured data and a text
//  version of the page) from src/data/portfolio.js, and
//  generates sitemap.xml with today's date.
//  React replaces the text version as soon as the app loads.
// ─────────────────────────────────────────────────────────────
import { profile, about, projects, experience, education, certifications, skills } from './src/data/portfolio.js'

export const SITE_URL = 'https://nikhilraghuwanshi.live/'

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const today = () => new Date().toISOString().slice(0, 10)
const abs = (path) => `${SITE_URL}${path}`

const PHOTO = abs(profile.photo || 'og-image.png')
const OG_IMAGE = abs('og-image.png')

// ~55 characters: fits in Google's title width
const title = 'Nikhil Raghuwanshi | AI/ML & Full-Stack Developer, Pune'
// ~155 characters: fits in Google's snippet
const description =
  'Nikhil Raghuwanshi: AI/ML engineer, full-stack developer and founder of Nexvhira, Pune. Legal AI (InLegalBERT), Tammewar Pharmacy, AuraEdu and Flour Mill apps.'

const keywords = [
  'Nikhil Raghuwanshi', 'Nikhil Raghuvanshi', 'Nikhil Gokul Raghuwanshi', 'Nikhil270703',
  'Nikhil Raghuwanshi portfolio', 'AI ML engineer Pune', 'full-stack developer Pune',
  'Nutan College of Engineering and Research', 'InLegalBERT', 'legal AI', 'Tammewar Pharmacy',
  'AuraEdu', 'Nexvhira', 'Nexvhira founder', 'Flour Mill app', 'Next.js developer', 'React developer', 'machine learning', 'fresher 2026',
].join(', ')

function jsonLd() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}#person`,
    name: profile.name,
    givenName: 'Nikhil',
    familyName: 'Raghuwanshi',
    alternateName: ['Nikhil Gokul Raghuwanshi', 'Nikhil Raghuvanshi', 'Nikhil270703'],
    url: SITE_URL,
    image: { '@type': 'ImageObject', url: PHOTO, width: 800, height: 800, caption: profile.name },
    email: `mailto:${profile.email}`,
    jobTitle: ['AI/ML Engineer & Full-Stack Developer', 'Founder, Nexvhira'],
    ...(profile.company ? { worksFor: { '@type': 'Organization', name: profile.company.name, url: profile.company.url, founder: { '@id': `${SITE_URL}#person` }, address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressCountry: 'IN' } } } : {}),
    description,
    address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressRegion: 'Maharashtra', addressCountry: 'IN' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Nutan College of Engineering and Research, Pune' },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'AI/ML Engineer',
      occupationLocation: { '@type': 'City', name: 'Pune' },
      skills: skills.flatMap((g) => g.items.map((i) => i.name)).join(', '),
    },
    award: ['Top 5 national ranking, VOIS Innovation Marathon 2.0', 'First place, inter-departmental speech competition'],
    hasCredential: certifications.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.title,
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'Organization', name: c.issuer },
      ...(c.verify ? { url: c.verify } : {}),
    })),
    knowsAbout: [...new Set(skills.flatMap((g) => g.items.map((i) => i.name)))],
    sameAs: [profile.github, profile.linkedin, ...profile.coding.map((c) => c.href), ...(profile.company ? [profile.company.url] : [])],
  }

  const site = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    url: SITE_URL,
    name: 'Nikhil Raghuwanshi',
    alternateName: ['Nikhil Raghuwanshi Portfolio', 'nikhilraghuwanshi.live'],
    inLanguage: 'en-IN',
    author: { '@id': `${SITE_URL}#person` },
  }

  const page = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}#profile`,
    url: SITE_URL,
    name: title,
    description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${SITE_URL}#website` },
    primaryImageOfPage: { '@type': 'ImageObject', url: PHOTO },
    mainEntity: { '@id': `${SITE_URL}#person` },
    dateModified: today(),
  }

  // Each project as software he authored: helps Google connect the
  // projects (and their live sites / repos) to his name.
  const work = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Projects by ${profile.name}`,
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': p.links.live ? 'WebApplication' : 'SoftwareSourceCode',
        name: p.title,
        description: p.summary,
        author: { '@id': `${SITE_URL}#person` },
        keywords: p.stack.join(', '),
        ...(p.links.live
          ? { url: p.links.live, applicationCategory: p.category.includes('ML') || p.category.includes('NLP') ? 'AI application' : 'BusinessApplication', operatingSystem: 'Web' }
          : {}),
        ...(p.links.github ? (p.links.live ? { sameAs: p.links.github } : { codeRepository: p.links.github, url: p.links.github }) : {}),
        ...(p.links.github && !p.links.live ? { programmingLanguage: p.stack[0] } : {}),
      },
    })),
  }

  return [person, site, page, work].map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n    ')
}

function headTags() {
  return `
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="author" content="${esc(profile.name)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <meta name="googlebot" content="index, follow, max-image-preview:large" />
    <meta name="keywords" content="${esc(keywords)}" />
    <link rel="canonical" href="${SITE_URL}" />
    <link rel="alternate" hreflang="en-IN" href="${SITE_URL}" />
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}" />
    <meta name="theme-color" content="#18181b" />
    <meta name="geo.region" content="IN-MH" />
    <meta name="geo.placename" content="Pune" />

    <link rel="me" href="${profile.github}" />
    <link rel="me" href="${profile.linkedin}" />
    <link rel="me" href="mailto:${profile.email}" />

    <meta property="og:type" content="profile" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:site_name" content="Nikhil Raghuwanshi" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${SITE_URL}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:secure_url" content="${OG_IMAGE}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Nikhil Raghuwanshi, AI/ML Engineer and Full-Stack Developer" />
    <meta property="profile:first_name" content="Nikhil" />
    <meta property="profile:last_name" content="Raghuwanshi" />
    <meta property="profile:username" content="Nikhil270703" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    <meta name="twitter:image:alt" content="Nikhil Raghuwanshi, AI/ML Engineer and Full-Stack Developer" />

    <link rel="apple-touch-icon" href="./apple-touch-icon.png" />
    <link rel="manifest" href="./site.webmanifest" />
    ${profile.photoSmall ? `<link rel="preload" as="image" href="./${profile.photoSmall}" fetchpriority="high" />` : ''}
    ${jsonLd()}`
}

// Plain, semantic HTML of the whole page for crawlers and no-JS visitors.
function staticBody() {
  const li = (items) => items.map((x) => `<li>${x}</li>`).join('')
  const links = (p) => {
    const l = []
    if (p.links.live) l.push(`<a href="${p.links.live}">Live site: ${esc(p.title)}</a>`)
    if (p.links.github) l.push(`<a href="${p.links.github}">Source code on GitHub</a>`)
    return l.length ? `<p>${l.join(' · ')}</p>` : ''
  }
  return `
      <main id="seo-static" style="max-width:760px;margin:0 auto;padding:48px 20px;font-family:system-ui,sans-serif;line-height:1.6">
        <header>
          ${profile.photo ? `<img src="./${profile.photo}" alt="${esc(profile.name)}, AI/ML engineer and full-stack developer from Pune" width="160" height="160" style="border-radius:16px" />` : ''}
          <h1>Nikhil Raghuwanshi</h1>
          <p><strong>AI/ML Engineer &amp; Full-Stack Developer</strong> · Founder of <a href="${profile.company.url}">Nexvhira</a> · Pune, India · B.Tech Computer Science &amp; Engineering (AI), Nutan College of Engineering and Research</p>
          <p>${esc(profile.tagline)}</p>
          <p><a href="${profile.github}" rel="me">GitHub</a> · <a href="${profile.linkedin}" rel="me">LinkedIn</a> · <a href="mailto:${profile.email}">${esc(profile.email)}</a></p>
        </header>
        <section id="about-static"><h2>About Nikhil Raghuwanshi</h2>${about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}</section>
        <section id="projects-static"><h2>Projects by Nikhil Raghuwanshi</h2>
          ${projects.map((p) => `<article><h3>${esc(p.title)}: ${esc(p.subtitle)}</h3><p>${esc(p.summary)}</p><ul>${li(p.metrics.map((m) => `${esc(m.value)} ${esc(m.label)}`))}</ul><p>Tech: ${esc(p.stack.join(', '))}</p>${links(p)}</article>`).join('')}
        </section>
        <section id="experience-static"><h2>Experience</h2>
          ${experience.map((e) => `<article><h3>${esc(e.role)}, ${e.link ? `<a href="${e.link}">${esc(e.org)}</a>` : esc(e.org)}</h3><p>${esc(e.period)}</p><ul>${li(e.points.map(esc))}</ul></article>`).join('')}
        </section>
        <section id="skills-static"><h2>Skills</h2><ul>${li(skills.map((g) => `${esc(g.group)}: ${esc(g.items.map((i) => i.name).join(', '))}`))}</ul></section>
        <section id="education-static"><h2>Education</h2><ul>${li(education.map((e) => `${esc(e.title)}, ${esc(e.place)}, ${esc(e.period)} (${esc(e.score)})`))}</ul></section>
        <section id="certifications-static"><h2>Certifications</h2><ul>${li(certifications.map((c) => `${esc(c.title)}, ${esc(c.issuer)} (${esc(c.date)})`))}</ul></section>
      </main>`
}

function sitemap() {
  const images = [profile.photo, 'og-image.png']
    .filter(Boolean)
    .map((img) => `\n    <image:image><image:loc>${abs(img)}</image:loc><image:title>${esc(profile.name)}</image:title></image:image>`)
    .join('')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${today()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>${images}
  </url>
</urlset>
`
}

export default function seoPlugin() {
  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      return html
        .replace('<!--SEO_HEAD-->', headTags())
        .replace('<div id="root"></div>', `<div id="root">${staticBody()}</div>`)
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() })
    },
  }
}
