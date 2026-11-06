// ─────────────────────────────────────────────────────────────
//  FAQ knowledge base for the portfolio chatbot.
//  It runs entirely in the browser: no API key, no server.
//  Each intent has keywords; the reply with the most keyword
//  matches wins. Edit the replies here to change what it says.
// ─────────────────────────────────────────────────────────────
import { profile, projects, certifications } from './portfolio'

const byId = Object.fromEntries(projects.map((p) => [p.id, p]))
const gh = (id) => byId[id]?.links?.github
const live = (id) => byId[id]?.links?.live

export const starterChips = [
  'Who is Nikhil?',
  'What are his skills?',
  'Show me his projects',
  'Legal AI project',
  'How can I contact him?',
]

const intents = [
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'namaste', 'hii', 'good morning', 'good evening'],
    reply: () => ({
      text: `Hi there! 👋 I'm Nikhil's portfolio assistant. Ask me about his projects, skills, experience, certificates or how to reach him.`,
      chips: starterChips,
    }),
  },
  {
    id: 'about',
    keywords: ['who', 'about', 'yourself', 'introduce', 'introduction', 'nikhil', 'himself', 'summary', 'background'],
    reply: () => ({
      text: `Nikhil Raghuwanshi is a final-year B.Tech Computer Science & Engineering (Artificial Intelligence) student at Nutan College of Engineering and Research, Pune (2022–2026).\n\nHe builds AI and full-stack products: a legal-judgment predictor with InLegalBERT, the live Tammewar Pharmacy system, the AuraEdu institution suite and a bilingual flour-mill app. He interned as a Java developer at MRND Lab and is looking for AI/ML and software roles.`,
      chips: ['What are his skills?', 'Show me his projects', 'Is he available?'],
    }),
  },
  {
    id: 'skills',
    keywords: ['skill', 'skills', 'tech', 'stack', 'tools', 'language', 'languages', 'know', 'python', 'java', 'technologies', 'expertise', 'good at'],
    reply: () => ({
      text: `Here's his toolkit:\n\n• Languages: Python, Java, C/C++, SQL, JavaScript, TypeScript\n• AI & ML: TensorFlow, Keras, PyTorch, scikit-learn, Hugging Face (InLegalBERT), OpenCV, Pandas, NumPy\n• Web & backend: React, Next.js, Node.js, Express, Tailwind CSS, Streamlit, Java Swing\n• Data & cloud: MongoDB, MySQL, Supabase, Power BI, IBM Watson Studio, Vercel, Git`,
      links: [{ label: 'See the Skills section', href: '#skills' }],
      chips: ['Show me his projects', 'Does he have AI experience?'],
    }),
  },
  {
    id: 'projects',
    keywords: ['project', 'projects', 'built', 'build', 'portfolio', 'made', 'work samples', 'show'],
    reply: () => ({
      text: `His main projects:\n\n1. AI for Legal Case Outcome Prediction: InLegalBERT, 85.2% accuracy, IPC→BNS translation\n2. Tammewar Pharmacy: live stock, billing & delivery system\n3. AuraEdu: live institution management suite\n4. Flour Mill Manager: bilingual orders & dues app (Next.js, MongoDB)\n5. Machine Learning Projects: CNN, NLP, regression, recommender\n6. Dental Clinic Appointment System: Java Swing + MySQL\n\nAsk about any one for details.`,
      links: [{ label: 'Open the Projects section', href: '#projects' }],
      chips: ['Legal AI project', 'Tammewar Pharmacy', 'AuraEdu', 'Flour Mill app'],
    }),
  },
  {
    id: 'legal',
    keywords: ['legal', 'law', 'court', 'case', 'judgment', 'judgement', 'inlegalbert', 'bert', 'ipc', 'bns', 'nlp', 'legaltech'],
    reply: () => ({
      text: `AI for Legal Case Outcome Prediction reads Indian court judgment PDFs and uses fine-tuned InLegalBERT models to predict the appellate outcome.\n\nIt reached 85.2% accuracy (F1 83.7%), 23.2 points above a TF-IDF + SVM baseline. It also translates old IPC sections to the new BNS code (80+ mappings), and has Supabase login with four roles: Student, Lawyer, Judge and Admin.`,
      links: [{ label: 'Source code', href: gh('legal') }],
      chips: ['Flour Mill app', 'Does he have AI experience?'],
    }),
  },
  {
    id: 'flourmill',
    keywords: ['flour', 'mill', 'feed', 'grain', 'udhari', 'dues', 'marathi', 'bilingual', 'pwa', 'upi'],
    reply: () => ({
      text: `Flour Mill Manager is a मराठी / English app for a small flour mill. The owner records grain orders, moves them through a queue, takes cash or UPI payments and tracks who owes what. Customers log in with a PIN on their phone to see their dues, pay by UPI QR and track orders.\n\nIt's built with Next.js 16, TypeScript and MongoDB, with Argon2id hashing, CSRF protection, rate limits, an audit log and optional 2FA.`,
      links: [{ label: 'Source code', href: gh('flourmill') }],
      chips: ['Tammewar Pharmacy', 'AuraEdu'],
    }),
  },
  {
    id: 'pharmacy',
    keywords: ['pharmacy', 'tammewar', 'medical', 'medicine', 'stock', 'inventory', 'billing', 'bill', 'delivery', 'razorpay', 'whatsapp', 'erp'],
    reply: () => ({
      text: `Tammewar Pharmacy is a live back-office system for a pharmacy: medicine stock, supplier purchases, PDF bills, customer dues, home deliveries and WhatsApp payment reminders in English and Marathi. It has 14 modules and separate portals for admin, staff, delivery drivers and customers.\n\nIt's React + Vite on Cloudflare Pages with an Express + MongoDB API, JWT auth and scheduled backups.`,
      links: [
        { label: 'Live site', href: live('pharmacy') },
        { label: 'Source code', href: gh('pharmacy') },
      ],
      chips: ['AuraEdu', 'Show me his projects'],
    }),
  },
  {
    id: 'auraedu',
    keywords: ['auraedu', 'aura', 'myedou', 'coaching', 'institute', 'institution', 'school', 'college erp', 'lms', 'attendance', 'admission', 'admissions', 'mcq', 'payroll'],
    reply: () => ({
      text: `AuraEdu is an institution management suite for coaching centres, schools and colleges: admissions, lead conversion, batches, timetables, attendance (biometric, manual or QR), proctored tests, certificates, fees, accounts and payroll.\n\nIt comes as AuraEdu Academy (22 modules) and AuraEdu ERP (47 modules), and the live demo has 25+ working modules across two branches.`,
      links: [
        { label: 'Live demo', href: live('auraedu') },
        { label: 'Source code', href: gh('auraedu') },
      ],
      chips: ['Tammewar Pharmacy', 'Legal AI project'],
    }),
  },
  {
    id: 'ml',
    keywords: ['cnn', 'cat', 'dog', 'spam', 'sms', 'health cost', 'insurance', 'book', 'recommendation', 'knn', 'freecodecamp', 'tensorflow', 'keras'],
    reply: () => ({
      text: `His Machine Learning Projects repo has four models from the freeCodeCamp ML with Python certification: a Cat vs Dog CNN, an SMS spam classifier, a health-insurance cost regressor and a KNN book recommender, all in TensorFlow / Keras and scikit-learn.`,
      links: [{ label: 'Source code', href: gh('ml') }],
      chips: ['Certifications', 'Legal AI project'],
    }),
  },
  {
    id: 'java',
    keywords: ['dental', 'clinic', 'swing', 'awt', 'desktop', 'mrnd', 'intern', 'internship'],
    reply: () => ({
      text: `Nikhil was a Java Application Developer Intern at MRND Lab Pvt. Ltd. (Jan–Mar 2024). He built features for a Java Swing desktop app, fixed bugs with a senior developer and connected the app to MySQL.\n\nHe also built a Dental Clinic Appointment System in Java Swing + MySQL with patient registration and scheduling.`,
      links: [{ label: 'See Experience', href: '#experience' }],
      chips: ['Leadership', 'Show me his projects'],
    }),
  },
  {
    id: 'leadership',
    keywords: ['leadership', 'anchor', 'anchoring', 'host', 'speech', 'speaking', 'committee', 'event', 'events', 'fest', 'aagaz', 'award', 'awards', 'achievement', 'achievements', 'vois', 'marathon', 'competition'],
    reply: () => ({
      text: `Beyond code:\n\n• Main anchor for Aagaz 2k25, the college fest (500+ audience)\n• Core committee for an IBM AI & Gen-AI campus event (500+ attendees) and Aagaz 2k24 (attendance up 20%)\n• Led a team to a Top 5 national ranking at the VOIS Innovation Marathon 2.0\n• First place in the inter-departmental speech competition and in storytelling competitions\n• Competed at RoboRashtra '24 and volunteered at ATVC 2024`,
      links: [{ label: 'See Experience', href: '#experience' }],
      chips: ['Why should we hire him?', 'Certifications'],
    }),
  },
  {
    id: 'education',
    keywords: ['education', 'college', 'university', 'cgpa', 'gpa', 'degree', 'marks', 'nutan', 'ncer', 'batu', '12th', '10th', 'hsc', 'ssc', 'study', 'studying', 'btech', 'b.tech', 'graduate', 'graduation'],
    reply: () => ({
      text: `• B.Tech, Computer Science & Engineering (AI), Nutan College of Engineering and Research, Pune (BATU), 2022–2026\n• HSC (12th), Computer Science, Shivaji College of Arts, Commerce and Science\n• SSC (10th), GD Platinum Jubilee English School, Akola: 88.80%`,
      links: [{ label: 'See Education', href: '#education' }],
      chips: ['Certifications', 'Show me his projects'],
    }),
  },
  {
    id: 'certifications',
    keywords: ['certificate', 'certificates', 'certification', 'certifications', 'course', 'courses', 'nptel', 'hackerrank', 'codechef', 'ibm', 'sql'],
    reply: () => ({
      text: `He has ${certifications.length} certificates, including:\n\n• Machine Learning with Python, freeCodeCamp (300 hours)\n• Introduction to Machine Learning, NPTEL · IIT Madras\n• SQL (Advanced), HackerRank\n• Core Java Programming (60 hours)\n• Intro to LLMs and Ethics of Generative AI, IBM SkillsBuild\n• Cyber Security, Blockchain, Smart Contracts and Power BI, VOIS\n\nOpen the Certificates section to view any of them.`,
      links: [{ label: 'See Certificates', href: '#certifications' }],
      chips: ['Does he have AI experience?', 'Show me his projects'],
    }),
  },
  {
    id: 'ai',
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning', 'transformer', 'model', 'models', 'llm', 'genai', 'generative'],
    reply: () => ({
      text: `Yes. He's specialising in AI in his B.Tech. He fine-tuned InLegalBERT transformers for legal-outcome prediction (85.2% accuracy), built CNN, NLP and recommender models in TensorFlow and scikit-learn, and holds ML certificates from freeCodeCamp, NPTEL (IIT Madras), IBM and VOIS. On IBM Cloud he worked with Watson Studio, AutoAI and generative AI models.`,
      chips: ['Legal AI project', 'Certifications'],
    }),
  },
  {
    id: 'availability',
    keywords: ['available', 'availability', 'open', 'looking', 'role', 'roles', 'opportunity', 'opportunities', 'hiring', 'placement', 'job', 'full-time', 'fulltime', 'join'],
    reply: () => ({
      text: `Yes! Nikhil graduates in 2026 and is open to AI/ML engineer, software developer and full-stack roles. Email ${profile.email} to start a conversation.`,
      links: [{ label: 'Email him', href: `mailto:${profile.email}` }],
      copy: profile.email,
    }),
  },
  {
    id: 'whyhire',
    keywords: ['why', 'hire', 'strength', 'strengths', 'best', 'stand out', 'unique', 'fit', 'good candidate'],
    reply: () => ({
      text: `A few reasons:\n\n• He ships complete products end to end, from a fine-tuned transformer to secure Next.js and Express apps, and two of them are live.\n• He builds for real users, like the stock and billing system for Tammewar Pharmacy.\n• Industry exposure from his Java internship at MRND Lab.\n• Strong communicator: main anchor for a 500+ audience and first place in speech competitions.`,
      chips: ['Show me his projects', 'How can I contact him?'],
    }),
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'mail', 'reach', 'connect', 'message', 'talk', 'phone', 'call', 'get in touch'],
    reply: () => ({
      text: `The best way is email: ${profile.email}\n\nYou can also connect on LinkedIn or use the contact form on this page.`,
      links: [
        { label: 'Send an email', href: `mailto:${profile.email}` },
        { label: 'LinkedIn', href: profile.linkedin },
        { label: 'Contact form', href: '#contact' },
      ],
      copy: profile.email,
    }),
  },
  {
    id: 'links',
    keywords: ['github', 'linkedin', 'leetcode', 'social', 'profile', 'profiles', 'code', 'repo', 'repository', 'source', 'coding'],
    reply: () => ({
      text: `Here are his profiles:`,
      links: [
        { label: 'GitHub', href: profile.github },
        { label: 'LinkedIn', href: profile.linkedin },
        ...profile.coding.map((c) => ({ label: c.label, href: c.href })),
      ],
      chips: ['Show me his projects'],
    }),
  },
  {
    id: 'resume',
    keywords: ['resume', 'cv', 'biodata'],
    reply: () =>
      profile.resume
        ? { text: `Here's his resume:`, links: [{ label: 'Open resume', href: profile.resume }] }
        : { text: `You can request his resume by email at ${profile.email}. He'll be happy to share it.`, links: [{ label: 'Email him', href: `mailto:${profile.email}` }], copy: profile.email },
  },
  {
    id: 'location',
    keywords: ['where', 'location', 'city', 'based', 'live', 'from', 'relocate', 'relocation', 'remote'],
    reply: () => ({
      text: `He's based in ${profile.location}. For questions about relocation or remote work, email him directly.`,
      chips: ['How can I contact him?'],
    }),
  },
  {
    id: 'thanks',
    keywords: ['thanks', 'thank', 'thank you', 'bye', 'goodbye', 'great', 'awesome', 'cool', 'nice'],
    reply: () => ({
      text: `You're welcome! 😊 If you'd like to talk to Nikhil directly, email him at ${profile.email}.`,
      chips: ['Show me his projects', 'How can I contact him?'],
    }),
  },
]

// Chip labels that should map straight to an intent.
const chipMap = {
  'Legal AI project': 'legal',
  'Flour Mill app': 'flourmill',
  'Tammewar Pharmacy': 'pharmacy',
  AuraEdu: 'auraedu',
  Leadership: 'leadership',
  Education: 'education',
  Certifications: 'certifications',
  'Is he available?': 'availability',
  'Why should we hire him?': 'whyhire',
  'Does he have AI experience?': 'ai',
}

const normalize = (s) => ` ${s.toLowerCase().replace(/[^a-z0-9.+\- ]/g, ' ').replace(/\s+/g, ' ')} `

export function getReply(input) {
  if (chipMap[input]) return intents.find((i) => i.id === chipMap[input]).reply()

  const text = normalize(input)
  let best = null
  let bestScore = 0
  for (const intent of intents) {
    let score = 0
    for (const k of intent.keywords) {
      // whole-word match counts more than a partial one; longer phrases count more
      if (text.includes(` ${k} `)) score += 2 + k.split(' ').length
      else if (k.length > 4 && text.includes(k)) score += 1
    }
    if (score > bestScore) { bestScore = score; best = intent }
  }

  if (best) return best.reply()
  return {
    text: `I'm not sure about that one. I'm a simple assistant that knows about Nikhil's projects, skills, experience and certificates. For anything else, email him at ${profile.email}.`,
    chips: starterChips,
    copy: profile.email,
  }
}
