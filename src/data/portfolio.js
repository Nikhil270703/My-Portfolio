// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update
//  the site; components read from it and never hard-code text.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Nikhil Raghuwanshi',
  shortName: 'Nikhil',
  initials: 'NR',
  roles: ['AI/ML Engineer', 'Full-Stack Developer', 'LegalTech Builder'],
  tagline:
    'I build AI and full-stack products for real users: from predicting Indian court outcomes with InLegalBERT to a bilingual order-and-dues app for a local flour mill.',
  location: 'Pune, Maharashtra, India',
  status: 'Open to AI/ML & software roles · 2026 graduate',
  email: 'nraghuvanshi100@gmail.com',
  github: 'https://github.com/Nikhil270703',
  linkedin: 'https://www.linkedin.com/in/nikhil-raghuvanshi-8a7704259/',
  linkedinLabel: 'Nikhil Raghuwanshi',
  // Coding profiles shown in the Contact section
  coding: [
    { label: 'LeetCode', handle: 'nick_27', href: 'https://leetcode.com/u/nick_27/', icon: 'leetcode' },
    { label: 'HackerRank', handle: 'nraghuvanshi100', href: 'https://www.hackerrank.com/profile/nraghuvanshi100', icon: 'hackerrank' },
    { label: 'CodeChef', handle: 'nick_1011', href: 'https://www.codechef.com/users/nick_1011', icon: 'codechef' },
  ],
  photo: '', // e.g. 'nikhil-raghuwanshi.jpg' in public/. Empty = animated "NR" monogram
  photoSmall: '', // e.g. 'nikhil-raghuwanshi-sm.jpg' (about 96×96)
  resume: '', // paste a public link to the resume PDF to show a "Resume" button
}

export const about = {
  paragraphs: [
    "I'm a final-year B.Tech Computer Science & Engineering (Artificial Intelligence) student at Nutan College of Engineering and Research, Pune. I like problems where AI or software meets a real person: a lawyer working through a long judgment, a mill owner tracking who owes what, an institute running admissions and exams.",
    'I started with Java, building a desktop clinic system during my internship at MRND Lab, then moved into machine learning (the 300-hour freeCodeCamp ML certification and NPTEL from IIT Madras) and NLP. Today I work across the stack, from fine-tuning transformers in Python to shipping Next.js and Express apps with secure auth and MongoDB. Off the keyboard, I anchor college events and enjoy public speaking.',
  ],
  highlights: [
    { value: 6, decimals: 0, suffix: '', label: 'Projects shipped or in progress' },
    { value: 19, decimals: 0, suffix: '', label: 'Certificates earned' },
    { value: 85.2, decimals: 1, suffix: '%', label: 'Legal AI model accuracy' },
    { value: 500, decimals: 0, suffix: '+', label: 'Audience at the fest I anchored' },
  ],
}

export const projects = [
  {
    id: 'legal',
    title: 'AI for Legal Case Outcome Prediction',
    subtitle: 'InLegalBERT + IPC→BNS translation',
    category: 'NLP · LegalTech',
    status: 'Completed',
    icon: 'scale',
    accent: 'from-amber-500/20 to-orange-500/10',
    summary:
      'A legal decision-support system that reads Indian court judgments, predicts the appellate outcome with fine-tuned InLegalBERT, and translates old IPC sections to the new BNS code.',
    metrics: [
      { value: '85.2%', label: 'accuracy' },
      { value: '+23.2%', label: 'vs. baseline' },
      { value: '80+', label: 'IPC→BNS maps' },
    ],
    problem:
      'Court judgments are long, unstructured PDFs, and the 2023 switch from the Indian Penal Code (IPC) to the Bharatiya Nyaya Sanhita (BNS) left students and lawyers cross-referencing sections by hand.',
    approach: [
      'Parses judgment PDFs and cleans the text before passing it to fine-tuned InLegalBERT transformer models that predict the appellate outcome with a confidence score.',
      'Translates legacy IPC sections to their BNS equivalents in real time from a curated mapping of 80+ sections.',
      'Secures the app with Supabase Auth and role-based access for four roles (Student, Lawyer, Judge, Admin); each role sees only its own modules.',
      'Adds a case vault that saves analysed cases to Supabase, and a conversational assistant for IPC and BNS questions.',
    ],
    results: [
      '85.2% accuracy, 84.1% precision and 83.7% F1 on outcome prediction.',
      '+23.2 points of accuracy over a TF-IDF + SVM baseline (62.0%).',
      'Streamlit dashboard with a predictor, case vault and IPC-BNS lab, backed by PostgreSQL on Supabase.',
    ],
    pipeline: ['Judgment PDF', 'Parse & clean', 'InLegalBERT', 'IPC → BNS', 'Dashboard'],
    stack: ['Python', 'PyTorch', 'InLegalBERT', 'Hugging Face', 'Streamlit', 'Supabase'],
    links: { github: 'https://github.com/Nikhil270703/AI-For-legal-case-outcome-prediction' },
  },
  {
    id: 'flourmill',
    title: 'Flour Mill Manager',
    subtitle: 'Bilingual orders & dues app',
    category: 'Full-Stack · PWA',
    status: 'In progress',
    icon: 'factory',
    accent: 'from-emerald-500/20 to-teal-500/10',
    summary:
      'A मराठी / English order, payment and outstanding-dues (उधारी) manager for a small flour mill, with an owner console and a mobile-first customer portal that installs like an app.',
    metrics: [
      { value: '2', label: 'languages' },
      { value: 'PWA', label: 'installable' },
      { value: 'v0.12', label: 'current release' },
    ],
    problem:
      'A local flour mill tracked grain bags, grinding status and customer credit on paper, so nobody knew what was ready or who owed how much.',
    approach: [
      'Owner console: multi-line order intake (up to 20 grain bags per customer) with an optional cash/UPI advance, and a forward-only queue from pending to collected.',
      'Payments hub, outstanding-dues view per customer, period reports (grain breakdown, cash vs UPI) and CSV / print exports.',
      'Customer portal with PIN login: what you owe, a UPI QR pay panel, an order tracker and a notifications inbox, designed for phones first.',
      'Printable one-page receipts (पावती) and broadcast notifications to every active customer.',
    ],
    results: [
      'Security built in: Argon2id hashing, revocable DB-backed sessions, CSRF protection, Zod validation, rate limits and an append-only audit log.',
      'Optional TOTP two-factor login for the owner, and strict headers (CSP, HSTS).',
      'Every customer endpoint is session-scoped, so one customer can never read another\'s data.',
    ],
    pipeline: ['Order intake', 'Queue', 'Payments', 'Dues', 'Customer portal'],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'MongoDB', 'Mongoose', 'Zod', 'Tailwind CSS'],
    links: { github: 'https://github.com/Nikhil270703/Feed-Mill-Management-System' },
  },
  {
    id: 'erp',
    title: 'College ERP & Stock Suite',
    subtitle: 'Modular ERP, live on Vercel',
    category: 'Full-Stack · ERP',
    status: 'Live',
    icon: 'layers',
    accent: 'from-sky-500/20 to-indigo-500/10',
    summary:
      'A modular ERP covering admissions, faculty, documents, exams, billing and stock, built as an independently deployed micro-frontend with its own Express API.',
    metrics: [
      { value: '50', label: 'screens' },
      { value: '53', label: 'data models' },
      { value: 'Live', label: 'on Vercel' },
    ],
    problem:
      'Institutes juggle admissions, documents, exams, fees and inventory across spreadsheets and registers that never stay in sync.',
    approach: [
      'Student side: admissions, profiles, promotions, attendance, hall tickets, roll calls and certificates.',
      'Operations side: products, purchases, vendors, quotations, bills, payments, expenses and a financial dashboard.',
      'Express + MongoDB backend with JWT auth, Zod validation, Helmet and rate limiting; scheduled jobs with node-cron for backups and reminders.',
      'Loaded into a larger ERP core through Module Federation, so each module builds and deploys on its own.',
    ],
    results: [
      'Generates PDFs and Excel exports, QR codes, and sends WhatsApp notifications.',
      'Online payments through Razorpay and an audit log of every action.',
      'Deployed live on Vercel.',
    ],
    pipeline: ['React + Vite', 'Module Federation', 'Express API', 'MongoDB'],
    stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Recharts', 'Razorpay'],
    links: {
      github: 'https://github.com/Nikhil270703/medical_stock_system',
      live: 'https://medical-stock-system.vercel.app',
    },
  },
  {
    id: 'myedou',
    title: 'MyEdou',
    subtitle: 'Institution management platform',
    category: 'Full-Stack · SaaS',
    status: 'In progress',
    icon: 'grad',
    accent: 'from-violet-500/20 to-fuchsia-500/10',
    summary:
      'A coaching-institute platform with an admin dashboard and student portal: admissions, batches, attendance, online tests, finance and notices, with one-click demo logins.',
    metrics: [
      { value: '25', label: 'modules' },
      { value: '2', label: 'portals' },
      { value: 'RBAC', label: 'admin roles' },
    ],
    problem:
      'Coaching institutes want to see a working product before choosing which modules to pay for, so the demo has to feel real.',
    approach: [
      'Working modules on a live database: attendance register, assignments, batches, online admissions and lead-to-student conversion.',
      'Test management with timed, auto-graded MCQs and manual grading for written answers.',
      'A 10-tab finance module (payments, invoices, refunds, waivers, expenses, approvals) with an append-only audit trail.',
      'Notices and calendar, a certificate generator with print-to-PDF, and a multi-branch switcher.',
    ],
    results: [
      'Seeded demo data with one-click "Explore as Admin / Student" logins and a reset button.',
      'Server-side validation with Zod and session checks in a single data-access layer.',
    ],
    pipeline: ['Landing', 'Login', 'Admin dashboard', 'Student portal'],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Zod'],
    links: { github: 'https://github.com/Nikhil270703/CoachingPOC' },
  },
  {
    id: 'ml',
    title: 'Machine Learning Projects',
    subtitle: 'freeCodeCamp ML certification',
    category: 'ML · Deep Learning',
    status: 'Completed',
    icon: 'brain',
    accent: 'from-pink-500/20 to-rose-500/10',
    summary:
      'Four end-to-end models from the 300-hour freeCodeCamp Machine Learning with Python certification: a CNN, an NLP classifier, a regression model and a recommender.',
    metrics: [
      { value: '4', label: 'models' },
      { value: '300h', label: 'certification' },
      { value: 'TF', label: 'Keras' },
    ],
    problem:
      'Each project is a different kind of ML problem: images, text, numbers and user ratings.',
    approach: [
      'Cat vs Dog classifier: a three-block convolutional neural network with image augmentation (ImageDataGenerator) in TensorFlow / Keras.',
      'SMS spam classifier: Keras TextVectorization + word embeddings feeding a dense network that labels messages as ham or spam.',
      'Health insurance cost prediction: a Keras neural-network regressor on patient data (age, BMI, smoking and more).',
      'Book recommender: K-Nearest Neighbours (cosine distance) over a sparse book-user ratings matrix to suggest similar books.',
    ],
    results: [
      'All four notebooks are in one repo and contributed to the freeCodeCamp certification (Nov 2024).',
    ],
    pipeline: ['Data', 'Preprocess', 'Train', 'Evaluate'],
    stack: ['Python', 'TensorFlow', 'Keras', 'scikit-learn', 'Pandas', 'NumPy', 'Jupyter'],
    links: { github: 'https://github.com/Nikhil270703/Machine-Learning-Projects' },
  },
  {
    id: 'dental',
    title: 'Dental Clinic Appointment System',
    subtitle: 'Java desktop app',
    category: 'Java · Desktop',
    status: 'Completed',
    icon: 'java',
    accent: 'from-cyan-500/20 to-sky-500/10',
    summary:
      'A full desktop application for a dental clinic: patient registration, appointment scheduling and records stored in MySQL.',
    metrics: [
      { value: 'Swing', label: 'desktop UI' },
      { value: 'MySQL', label: 'database' },
      { value: 'Java', label: 'core' },
    ],
    problem: 'The clinic managed patients and appointments on paper, which made scheduling slow and records easy to lose.',
    approach: [
      'Built the interface in Java Swing and AWT.',
      'Implemented patient registration and appointment scheduling.',
      'Persisted all data in a MySQL database over JDBC.',
    ],
    results: ['A streamlined clinic workflow in a single desktop app.'],
    stack: ['Java', 'Swing', 'AWT', 'MySQL'],
    links: {},
  },
]

export const experience = [
  {
    role: 'Java Application Developer Intern',
    org: 'MRND Lab Pvt. Ltd.',
    period: 'Jan 2024 – Mar 2024',
    type: 'Internship',
    icon: 'briefcase',
    points: [
      'Developed and implemented key features for a desktop application using Java and Swing, improving the user workflow.',
      'Worked with a senior developer to debug and resolve software bugs, making the application more stable.',
      'Helped design and connect the application to a MySQL database for efficient data management.',
    ],
    tools: ['Java', 'Swing', 'AWT', 'MySQL', 'JDBC'],
  },
  {
    role: 'Main Anchor & Core Committee Member',
    org: 'Nutan College of Engineering and Research, Pune',
    period: '2024 – 2025',
    type: 'Leadership',
    icon: 'mic',
    points: [
      "Main anchor for Aagaz 2k25, the annual cultural festival, for an audience of 500+.",
      'Core committee for a one-day IBM campus event on AI and Generative AI that drew 500+ attendees.',
      'Core committee for Aagaz 2k24: worked with a team of 15; attendance grew 20% over the previous year.',
      "Team leader for a Shark Tank-style competition (team of 4): registrations, judging and logistics. Also anchored the departmental Teachers' Day.",
    ],
    tools: ['Public speaking', 'Event management', 'Team leadership'],
  },
  {
    role: 'Awards & Competitions',
    org: 'College and national events',
    period: '2023 – 2025',
    type: 'Achievements',
    icon: 'trophy',
    points: [
      'Led a team to a Top 5 national ranking at the VOIS Innovation Marathon 2.0.',
      'First place in the inter-departmental speech competition, and first place in storytelling competitions (college and Aspire Institute).',
      "Competed in ResQlympic at RoboRashtra '24, a national robotics competition at PCCOER, Pune.",
      'Volunteered at the Aravali Terrain Vehicle Championship (ATVC) 2024.',
    ],
    tools: [],
  },
]

export const skills = [
  {
    group: 'Languages',
    items: [
      { name: 'Python', icon: 'python' },
      { name: 'Java', icon: 'java' },
      { name: 'C / C++', icon: 'cpp' },
      { name: 'SQL', icon: 'sql' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
    ],
  },
  {
    group: 'AI & ML',
    items: [
      { name: 'TensorFlow', icon: 'tensorflow' },
      { name: 'Keras', icon: 'keras' },
      { name: 'PyTorch', icon: 'pytorch' },
      { name: 'scikit-learn', icon: 'sklearn' },
      { name: 'Hugging Face', icon: 'huggingface' },
      { name: 'InLegalBERT (NLP)', icon: 'scale' },
      { name: 'OpenCV', icon: 'opencv' },
      { name: 'Pandas & NumPy', icon: 'pandas' },
    ],
  },
  {
    group: 'Web & Backend',
    items: [
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Node.js', icon: 'node' },
      { name: 'Express', icon: 'express' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'Streamlit', icon: 'streamlit' },
      { name: 'Java Swing', icon: 'java' },
    ],
  },
  {
    group: 'Data, Cloud & Tools',
    items: [
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'Supabase', icon: 'supabase' },
      { name: 'Power BI', icon: 'powerbi' },
      { name: 'IBM Watson Studio', icon: 'ibm' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'Git & GitHub', icon: 'github' },
    ],
  },
]

export const education = [
  {
    title: 'B.Tech, Computer Science & Engineering (Artificial Intelligence)',
    place: 'Nutan College of Engineering and Research, Pune · BATU',
    period: '2022 – 2026',
    score: 'CGPA 6.49',
    icon: 'grad',
  },
  {
    title: 'Higher Secondary (HSC, 12th), Computer Science',
    place: 'Shivaji College of Arts, Commerce and Science',
    period: '2020 – 2022',
    score: '61.60%',
    icon: 'book',
  },
  {
    title: 'Secondary (SSC, 10th)',
    place: 'GD Platinum Jubilee English School, Akola',
    period: '2019 – 2020',
    score: '88.80%',
    icon: 'book',
  },
]

// Certificates: `file` is a PDF in public/certificates/ with a preview image in
// public/certificates/img/ (same name, .jpg). `category` must match one below.
export const certificationCategories = ['AI & ML', 'Data & Coding', 'Cyber & Blockchain', 'Events & Soft Skills']

export const certifications = [
  // ── Featured (shown as large cards at the top) ──
  { title: 'Machine Learning with Python', issuer: 'freeCodeCamp', date: 'Nov 2024', category: 'AI & ML', icon: 'freecodecamp', featured: true, detail: 'Developer Certification · 300 hours', file: 'freecodecamp-ml-python', verify: 'https://freecodecamp.org/certification/Nikhil_Raghuwanshi/machine-learning-with-python-v7' },
  { title: 'Introduction to Machine Learning', issuer: 'NPTEL · IIT Madras', date: 'Jan–Mar 2025', category: 'AI & ML', icon: 'grad', featured: true, detail: '8-week course', file: 'nptel-intro-machine-learning' },
  { title: 'SQL (Advanced) Skill Certification', issuer: 'HackerRank', date: 'Nov 2024', category: 'Data & Coding', icon: 'hackerrank', featured: true, detail: 'Skill test passed', file: 'hackerrank-sql-advanced', verify: 'https://www.hackerrank.com/certificates/3c979ec7d4b3' },
  { title: 'Core Java Programming', issuer: 'Diamond Mindglance Institute, Pune', date: 'Aug–Dec 2023', category: 'Data & Coding', icon: 'java', featured: true, detail: '60 hours of training + exam', file: 'core-java-programming' },
  { title: 'Performance Evaluation with Machine Learning', issuer: 'VOIS · Vodafone Idea Foundation', date: 'May 2024', category: 'AI & ML', icon: 'chart', featured: true, detail: 'Course completion', file: 'vois-performance-evaluation-ml' },
  { title: 'All practice problems, 500 difficulty rating', issuer: 'CodeChef', date: 'Oct 2024', category: 'Data & Coding', icon: 'codechef', featured: true, detail: 'Pro certificate', file: 'codechef-500-difficulty', verify: 'https://www.codechef.com/certificates/verify' },

  // ── AI & ML ──
  { title: 'Introduction to Large Language Models', issuer: 'IBM SkillsBuild', date: 'Aug 2025', category: 'AI & ML', icon: 'ibm', file: 'ibm-intro-llms' },
  { title: 'Ethical Considerations for Generative AI', issuer: 'IBM SkillsBuild', date: 'Aug 2025', category: 'AI & ML', icon: 'ibm', file: 'ibm-ethics-generative-ai' },
  { title: 'Python Programming Course', issuer: 'AI Adventures, Pune', date: 'Completed', category: 'AI & ML', icon: 'python', file: 'ai-adventures-python' },

  // ── Data & Coding ──
  { title: 'Build Reports and Dashboards in Power BI', issuer: 'VOIS · Vodafone Idea Foundation', date: 'Sep 2025', category: 'Data & Coding', icon: 'powerbi', file: 'power-bi-reports-dashboards' },
  { title: 'CS Fundamentals Guided Path', issuer: 'Coding Ninjas Studio', date: 'Mar 2023', category: 'Data & Coding', icon: 'codingninjas', file: 'coding-ninjas-cs-fundamentals' },
  { title: 'CodeCrush Online Coding Contest (TechFusion 2.0)', issuer: "Students' Association of Information Technology", date: 'Oct 2023', category: 'Data & Coding', icon: 'code', file: 'codecrush-techfusion' },

  // ── Cyber & Blockchain ──
  { title: 'Introduction to Cyber Security', issuer: 'VOIS · Vodafone Idea Foundation', date: 'Sep 2025', category: 'Cyber & Blockchain', icon: 'shield', file: 'vois-intro-cyber-security' },
  { title: 'Structure of Blockchain', issuer: 'VOIS · Vodafone Idea Foundation', date: 'Sep 2025', category: 'Cyber & Blockchain', icon: 'blocks', file: 'structure-of-blockchain' },
  { title: 'Smart Contract', issuer: 'VOIS · Vodafone Idea Foundation', date: 'Sep 2025', category: 'Cyber & Blockchain', icon: 'blocks', file: 'smart-contract' },
  { title: 'Cyber Security Stage-1', issuer: 'Inflow Technologies', date: 'Sep 2023', category: 'Cyber & Blockchain', icon: 'shield', file: 'cyber-security-stage-1' },

  // ── Events & Soft Skills ──
  { title: 'Effective Communication in the Workplace', issuer: 'The Open University (OpenLearn)', date: 'Nov 2024', category: 'Events & Soft Skills', icon: 'mic', file: 'openlearn-effective-communication' },
  { title: "RoboRashtra '24, ResQlympic", issuer: 'PCCOER Pune × DIAT (DU), DRDO', date: 'Mar 2024', category: 'Events & Soft Skills', icon: 'bot', file: 'roborashtra-2024' },
  { title: 'Volunteer, ATVC 2024', issuer: 'Infi League Motorsports', date: '2024', category: 'Events & Soft Skills', icon: 'trophy', file: 'atvc-2024-volunteer' },
]
