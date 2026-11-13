// ============================================================================
//  SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO CONTENT
//  Add new projects, experience, or skills here; the UI updates automatically.
//  Wording follows the résumé in public/Maheer_Ihtejaz_Moin_Resume.pdf.
// ============================================================================

import algothonVideo from "../assets/media/algothon.mp4";
import algothonPoster from "../assets/media/algothon-poster.jpg";
import algojamResults from "../assets/media/algojam-results.png";
import algojamCertificate from "../assets/media/algojam-certificate.jpg";

export const profile = {
  name: "Maheer Ihtejaz Moin",
  firstName: "Maheer",
  shortName: "Maheer Moin",
  role: "Software engineer",
  location: "Sydney, NSW",
  timeZone: "Australia/Sydney",
  email: "ihtejaz555@gmail.com",
  resumeUrl: "/Maheer_Ihtejaz_Moin_Resume.pdf",
  socials: {
    github: "https://github.com/MoinIhtejaz",
    linkedin: "https://www.linkedin.com/in/maheer-",
  },
  // The hero headline, one entry per line.
  headline: ["I build software", "end to end."],
  // Under the headline.
  blurb:
    "I'm Maheer, a software engineer in Sydney. I was the sole developer on a company's first online sales platform, and I lead teams in algorithmic trading competitions.",
  studying: "Bachelor of Advanced Computing (Honours), University of Sydney",
  majors: ["Computational Data Science", "Finance"],
  openTo: ["Software engineering internships", "Quant internships"],
  graduating: "June 2028",
  // The highlighted note under the properties.
  recently:
    "led teams to a top 10 finish (9th of 40) at IMC Trading AlgoJam 2026 and the top 15% of the Susquehanna Algothon across Australia and New Zealand.",
};

// Tag colours available across the site (see the .tone-* rules in index.css).
export type Tone =
  | "gray"
  | "blue"
  | "green"
  | "pink"
  | "amber"
  | "purple"
  | "teal";

export type Highlight = { value: string; label: string };

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  /** The step headline in the story section. */
  headline: string;
  /** The opening words of `headline` to set in the accent colour. */
  accent?: string;
  /** The one thing to notice, shown large at the top of the step's card. */
  highlight?: Highlight;
  /** Short name, used as the label above the headline. */
  pill: string;
  /** One line under the headline. */
  summary: string;
  /** Two or three characters for the tile, e.g. "2A". */
  monogram: string;
  tone: Tone;
  bullets: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "2A Marketing Pty Ltd",
    role: "Software Engineering Intern",
    location: "Sydney, NSW",
    period: "Mar 2025 – Dec 2025",
    headline: "Software Engineering Intern at 2A Marketing.",
    accent: "Software Engineering Intern",
    highlight: {
      value: "Software Engineering Intern",
      label: "10 months as the sole developer on the company's first online sales platform.",
    },
    pill: "Professional experience",
    summary:
      "I designed, shipped and maintained the company's first online sales platform, from the database schema to the deploy.",
    monogram: "2A",
    tone: "blue",
    bullets: [
      "Designed and shipped the company's first online sales platform as sole developer, owning architecture, deployment and post-launch maintenance: a React and Vite app with client-side routing, auto-deployed from GitHub to Vercel on the company's domain.",
      "Let non-technical staff manage website listings without developer help by designing the data and access-control model: a Supabase PostgreSQL backend with authentication, role-based access control and row-level security policies.",
      "Gave staff and customers real-time shipping updates and versioned documents by developing a document and shipping tracking app.",
      "Made vehicle listing edits show instantly with an admin dashboard that handles optimistic UI updates, image uploads to object storage, public URL generation and database writes.",
    ],
    stack: ["React", "Vite", "Supabase", "PostgreSQL", "Vercel"],
  },
];

export type Competition = {
  name: string;
  /** Short name, used on the hero badge and above the headline. */
  tab: string;
  /** The step headline in the story section. */
  headline: string;
  /** The opening words of `headline` to set in the accent colour. */
  accent?: string;
  /** The one thing to notice, shown large at the top of the step's card. */
  highlight?: Highlight;
  /** Award certificate, shown beside the highlight; click to enlarge. */
  certificate?: { image: string; caption: string };
  /** One line under the headline. */
  summary: string;
  organisation: string;
  year: string;
  role?: string;
  result?: string;
  bullets: string[];
  stats?: { value: string; label: string }[];
  stack?: string[];
  // Organiser logo. Drop `<logoKey>.<ext>` into src/assets/logos/ and it is
  // picked up automatically; omit the file and the entry renders without one.
  logoKey?: string;
  logoAlt?: string;
  // Optional figure: click to enlarge. Omit `video` and `poster` is presented
  // as a still image.
  demo?: {
    poster: string;
    caption: string;
    video?: string;
    /** Seconds into the video to start playback. */
    startTime?: number;
  };
};

export const competitions: Competition[] = [
  {
    name: "IMC Trading AlgoJam 2026",
    tab: "IMC AlgoJam",
    headline: "Top 10 at IMC Trading AlgoJam.",
    accent: "Top 10",
    highlight: {
      value: "Top 10",
      label: "9th place winners out of 40 teams, as team lead.",
    },
    certificate: {
      image: algojamCertificate,
      caption:
        "Certificate of Achievement: 9th place winners, UQ Fintech AlgoJam 2026 with IMC.",
    },
    summary:
      "I led the team that placed 9th of 40 at IMC Trading's algorithmic trading competition, with a system that prices 9 instruments separately.",
    organisation: "IMC Trading",
    year: "2026",
    role: "Team Lead",
    result: "Top 10 · 9th of 40",
    logoKey: "imc",
    logoAlt: "IMC Trading",
    demo: {
      poster: algojamResults,
      caption:
        "Full simulation across both years: the visible development year and the hidden scoring year revealed at marking.",
    },
    bullets: [
      "Earned $568,609 backtest PnL (14.85 Sharpe, $4,898 max drawdown) by leading development of a dependency-free system that models 9 instruments separately (peg reversion, cost-based fair value, momentum, seasonality) and greedily allocates a $600,000 notional limit.",
      "Raised mean PnL on the game-theoretic instrument 4.4x to $588,237 over 300 held-out simulations by modeling the room's previous-day positioning and trading only on statistically meaningful edge, then cut 2 strategy layers costing $152,800 a year.",
      "Held zero risk-limit breaches, type errors or invalid positions over 365 days, 1,056 Monte Carlo scenarios and adversarial price paths by rebuilding the book to exchange rules, and retired 3 noise-fitted signals with 200-shuffle permutation tests (Bonferroni).",
    ],
    stats: [
      { value: "9th/40", label: "Final placing" },
      { value: "$568,609", label: "Backtest PnL" },
      { value: "14.85", label: "Sharpe ratio" },
      { value: "$4,898", label: "Max drawdown" },
    ],
    stack: ["Python", "NumPy", "Pandas"],
  },
  {
    name: "Susquehanna Algothon",
    tab: "Susquehanna Algothon",
    headline: "Top 15% across Australia and New Zealand.",
    accent: "Top 15%",
    highlight: {
      value: "Top 15%",
      label: "Of all teams across Australia and New Zealand, as team lead.",
    },
    summary:
      "I led a team at the Susquehanna Algothon, building a market-neutral engine for 51 instruments and the browser terminal we used to monitor it.",
    organisation: "Susquehanna International Group",
    year: "2026",
    role: "Team Lead",
    result: "Top 15% in Australia and NZ",
    logoKey: "susquehanna",
    logoAlt: "Susquehanna International Group",
    demo: {
      video: algothonVideo,
      poster: algothonPoster,
      caption:
        "The browser monitoring terminal built for the Algothon, stepping through held-out trading days.",
    },
    bullets: [
      "Posted $262,508 PnL (6.43 Sharpe) on 250 held-out days at 29ms median latency by leading development of a market-neutral engine for 51 instruments that blends ridge vector autoregression, cointegration pairs and PCA cross-sectional reversals, reweighted daily.",
      "Narrowed more than 100 candidate signals, including LSTMs, Kalman filters and multi-asset cointegration models, to the 3 that held up out of sample, using separate training and holdout datasets and pre-registered tests.",
      "Matched the official grader's PnL, Sharpe and score exactly in a browser monitoring terminal (vanilla JavaScript, HTML Canvas, CSS) for alpha signals, drawdown and hit rate, using reconciliation checks that fail the build on mismatch and headless Node.js smoke tests.",
    ],
    stats: [
      { value: "$262,508", label: "PnL on 250 held-out days" },
      { value: "6.43", label: "Sharpe ratio" },
      { value: "29ms", label: "Median latency" },
      { value: "51", label: "Instruments traded" },
    ],
    stack: ["Python", "NumPy", "JavaScript", "HTML/CSS"],
  },
  {
    name: "Accenture Datathon",
    tab: "Accenture",
    headline: "Explained 153 regrettable exits at the Accenture Datathon.",
    summary:
      "Joined 4 HR datasets, found who was leaving and why, and built the dashboard that explained it to executives.",
    organisation: "Accenture",
    year: "2026",
    bullets: [
      "Found that the 9% of 13,403 staff flagged high potential made up half of all regrettable exits and that skipping engagement surveys more than doubled resignation odds (odds ratio 2.33), by joining 4 HR datasets and running about 250 Bonferroni-corrected tests.",
      "Built a React and Recharts dashboard that explains 153 regrettable exits to non-technical executives, as part of the team's recommendation for a capped retention pilot worth $2.13M in base-case net value (427% ROI).",
    ],
    stats: [
      { value: "13,403", label: "Staff records analysed" },
      { value: "2.33", label: "Odds ratio, skipped surveys" },
      { value: "~250", label: "Bonferroni-corrected tests" },
      { value: "$2.13M", label: "Base-case net value of the pilot" },
    ],
    stack: ["Python", "Pandas", "SciPy", "statsmodels", "React", "Recharts"],
  },
];

export type Project = {
  title: string;
  kind: string;
  tone: Tone;
  /** One line for the card. */
  summary: string;
  /** The headline result, shown large on the card cover. */
  metric: { value: string; label: string };
  bullets: string[];
  stack: string[];
  links?: { label: string; href: string }[];
  // Media auto-detection: drop a file named `<mediaKey>.<ext>` into
  // src/assets/media/ (e.g. volatility.mp4) and it appears automatically.
  mediaKey: string;
};

export const projects: Project[] = [
  {
    title: "Multi-Agent AI Software Development System",
    kind: "AI systems",
    tone: "purple",
    summary:
      "An LLM orchestrator that writes versioned contracts, then runs 5 layer agents in parallel to build a full-stack app.",
    metric: { value: "450", label: "passing tests, shipped in 2 days" },
    bullets: [
      "Shipped a full-stack catalog site in 2 days (450 passing tests, 0 known vulnerabilities) by prompt-engineering an LLM orchestrator that writes versioned contracts (OpenAPI spec, SQL schema, module interfaces), then runs 5 layer agents in parallel.",
      "Split the app into contract-bound layers joined at one composition root, with forward-only migrations, all-or-nothing seeding, hashed session tokens, scrypt passwords, CSRF and CSP defenses, and a static site plus serverless API on Vercel.",
      "Caught 4 integration defects before release, including a CSP rule that blanked pages over HTTP and a rate limit shared by every user behind a proxy, by gating agent output on contract checks, browser tests and a threat-model security review.",
    ],
    stack: ["Claude Code", "TypeScript", "React", "Express", "SQLite", "Vercel"],
    mediaKey: "agents",
  },
  {
    title: "Equitask",
    kind: "Team workload app",
    tone: "blue",
    summary:
      "Turns planning-poker votes into availability-aware assignments and a workload fairness score.",
    metric: { value: "AES-GCM", label: "comments encrypted in the browser" },
    bullets: [
      "Launched a Next.js and Supabase app that turns planning-poker votes into availability-aware assignments and a workload fairness score, with a swappable data-provider layer and AES-GCM comment encryption in the browser so the server never sees comment text.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
    mediaKey: "equitask",
  },
  {
    title: "Efficient Email Filtering System",
    kind: "Bloom filter",
    tone: "amber",
    summary:
      "Duplicate email detection with a Bloom filter built from scratch in C++.",
    metric: { value: "0.8%", label: "false positives, 0 false negatives" },
    bullets: [
      "Flagged duplicate emails with 0 false negatives and 0.8% false positives on 1,485 items using a Bloom filter built from scratch (7 hash functions, 15,000-bit array) and a CLI with file and live ingestion, ADD, CHECK and SHOW commands and Base64 serialization.",
    ],
    stack: ["C++"],
    mediaKey: "bloom",
  },
  {
    title: "Intraday Volatility Forecasting",
    kind: "Optiver industry project",
    tone: "green",
    summary:
      "GJR-GARCH volatility forecasts on 9 months of Optiver limit order book data.",
    metric: { value: "38%", label: "lower forecast error than HAR-X" },
    bullets: [
      "Cut QLIKE forecast error 38% against the HAR-X baseline across 48,600 out-of-sample forecasts on 10 US equities by fitting GJR-GARCH models that won 33 of 40 stock-horizon cells, with zero failed fits across 360 backtests on 9 months of Optiver limit order book data.",
    ],
    stack: ["R", "rugarch"],
    mediaKey: "volatility",
  },
];

export type SkillGroup = {
  name: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    name: "Languages",
    items: ["Python", "Java", "C++", "TypeScript", "SQL", "R"],
  },
  {
    name: "Databases",
    items: [
      "PostgreSQL",
      "MongoDB (NoSQL)",
      "Supabase",
      "SQLite",
      "Relational schema design",
    ],
  },
  {
    name: "Systems design and architecture",
    items: [
      "Systems architecture",
      "Distributed computing",
      "Contract-first REST API design (OpenAPI)",
      "Layered architecture and design patterns (repository, adapter, dependency injection)",
      "Load balancing",
      "Rate limiting",
      "Database partitioning and sharding",
      "Schema migrations",
      "Concurrency",
      "High-performance and low-latency systems",
      "Hashing and probabilistic data structures",
    ],
  },
  {
    name: "AI and automation",
    items: [
      "LLM APIs and tools (OpenAI GPT-4 API, Claude Code)",
      "Prompt engineering",
      "Multi-agent orchestration",
      "Guardrails and evaluation gates for AI output",
      "Workflow automation",
      "Python scripting",
      "Streamlit",
    ],
  },
  {
    name: "Cloud and DevOps",
    items: [
      "AWS (EC2, Lambda)",
      "Cloudflare",
      "Vercel (serverless functions)",
      "Docker",
      "Kubernetes",
      "Linux",
      "CI/CD (GitHub Actions)",
      "Git/GitHub",
      "DNS and custom domains",
      "Object storage",
      "Real-time monitoring and observability dashboards",
    ],
  },
  {
    name: "Security",
    items: [
      "RBAC",
      "Row-level security",
      "Session management",
      "Threat modeling",
      "CSRF and CSP defenses",
      "AES-GCM end-to-end encryption",
    ],
  },
  {
    name: "Web and visualization",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "Data visualization (Recharts, Matplotlib, Seaborn)",
    ],
  },
  {
    name: "Software engineering",
    items: [
      "Object-oriented programming",
      "Data structures and algorithms",
      "Code review and refactoring",
      "Debugging, troubleshooting and profiling",
      "Pytest",
      "Vitest",
      "Unit, regression and reconciliation testing",
      "Technical documentation",
      "Agile",
    ],
  },
  {
    name: "Quantitative and machine learning",
    items: [
      "NumPy",
      "Pandas",
      "SciPy",
      "Time-series forecasting (vector autoregression, GJR-GARCH, HAR-RV)",
      "Ridge and elastic-net regularization",
      "Kalman filters",
      "LSTM",
      "XGBoost",
      "Monte Carlo simulation",
      "Hypothesis and permutation testing",
      "Backtesting",
    ],
  },
];

// The scrolling wall of results under the hero. Every figure is from the résumé.
export const wall: { value: string; label: string; source: string }[][] = [
  [
    { value: "Top 10", label: "9th of 40 teams, as team lead", source: "IMC AlgoJam" },
    { value: "14.85", label: "Sharpe ratio on $568,609 of backtest PnL", source: "IMC AlgoJam" },
    { value: "$4,898", label: "Max drawdown on that backtest", source: "IMC AlgoJam" },
    { value: "4.4x", label: "Mean PnL lift on the game-theoretic instrument", source: "IMC AlgoJam" },
    { value: "1,056", label: "Monte Carlo scenarios with zero risk-limit breaches", source: "IMC AlgoJam" },
    { value: "450", label: "Passing tests on a site shipped in 2 days", source: "Multi-agent system" },
    { value: "0.8%", label: "False positives, with 0 false negatives", source: "Bloom filter" },
  ],
  [
    { value: "Top 15%", label: "Of all teams across Australia and New Zealand", source: "Susquehanna Algothon" },
    { value: "$262,508", label: "PnL on 250 held-out days", source: "Susquehanna Algothon" },
    { value: "29ms", label: "Median latency across 51 instruments", source: "Susquehanna Algothon" },
    { value: "100+", label: "Candidate signals, narrowed to the 3 that held up", source: "Susquehanna Algothon" },
    { value: "38%", label: "Lower QLIKE forecast error than the HAR-X baseline", source: "Optiver project" },
    { value: "2.33", label: "Odds ratio: skipped surveys and resignations", source: "Accenture Datathon" },
    { value: "$2.13M", label: "Base-case net value of the retention pilot", source: "Accenture Datathon" },
  ],
];

export const education = {
  headline: "Studying Advanced Computing at Sydney.",
  pill: "Education",
  summary:
    "Bachelor of Advanced Computing (Honours) at the University of Sydney, majoring in Computational Data Science and Finance.",
  school: "The University of Sydney",
  location: "Sydney, NSW",
  period: "Feb 2024 – Jun 2028 (expected)",
  degree: "Bachelor of Advanced Computing (Honours)",
  majors: "Majors in Computational Data Science and Finance",
  honors: [
    {
      name: "Dalyell Scholar",
      note: "University of Sydney high achievers program",
    },
    { name: "Vice Chancellor's Scholarship" },
  ],
};
