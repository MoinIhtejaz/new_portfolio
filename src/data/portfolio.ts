// ============================================================================
//  SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO CONTENT
//  Add new projects, experience, or skills here; the UI updates automatically.
// ============================================================================

import algothonVideo from "../assets/media/algothon.mp4";
import algothonPoster from "../assets/media/algothon-poster.jpg";
import algojamResults from "../assets/media/algojam-results.png";

export const profile = {
  name: "Maheer Ihtejaz Moin",
  shortName: "Maheer",
  role: "Software Engineer",
  tagline: "Computational Data Science & Finance @ University of Sydney",
  location: "Sydney, NSW",
  email: "ihtejaz555@gmail.com",
  resumeUrl: "/Maheer_Ihtejaz_Moin_Resume.pdf",
  socials: {
    github: "https://github.com/MoinIhtejaz",
    linkedin: "https://www.linkedin.com/in/maheer-",
  },
  summary:
    "I build software end to end and like owning the whole stack. At 2A Marketing I shipped the company's first online sales platform: a React front end, a Supabase and Postgres backend with role-based access control and row-level security so non-technical staff could manage listings themselves, and a document tracking app with versioned files and live status updates. Outside of work I build systems that have to hold up under pressure: a dependency-free trading engine that ran 365 days without a risk-limit breach, a browser monitoring terminal in vanilla JavaScript and Canvas, a Bloom filter in C++. I am studying Advanced Computing (Honours) at the University of Sydney, double majoring in Computational Data Science and Finance.",
  availability: "Graduating 2028 · Seeking software engineering internships",
};

// Rotating words in the hero
export const heroRoles = [
  "Full-Stack Engineering",
  "Systems Architecture",
  "Distributed Computing",
  "Machine Learning & Data",
];

export const stats = [
  { value: "5+", label: "Projects shipped end to end" },
  { value: "2", label: "Double major: CompSci · Finance" },
  { value: "10", label: "Equities modelled (Optiver order-book)" },
  { value: "WAM", label: "Dalyell Scholar · VC Scholarship" },
];

export type Experience = {
  company: string;
  role?: string;
  location: string;
  period: string;
  bullets: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: "2A Marketing Pty Ltd",
    role: "Full-Stack Developer Intern",
    location: "Sydney, NSW",
    period: "Mar 2025 – Dec 2025",
    bullets: [
      "Built the company's first online sales platform: a React application with Vite, client-side routing and automatic deployments to Vercel through GitHub, routed through the company's domain.",
      "Built a Supabase and PostgreSQL backend that lets non-technical staff manage website listings themselves, including authentication, role-based access control and row-level security.",
      "Developed a document and shipping tracking app giving staff and customers versioned files and real-time updates.",
      "Built an admin dashboard for vehicle listings, including image uploads to object storage, public URL generation and database updates with optimistic UI interactions.",
      "Owned the stack end to end as the sole developer, from database and access-control design through deployment and post-launch maintenance.",
    ],
    tags: [
      "React",
      "Vite",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Vercel",
      "Full-Stack",
    ],
  },
];

export type Project = {
  title: string;
  subtitle: string;
  category: "Quant" | "Data Science" | "Systems" | "Full-Stack";
  featured?: boolean;
  description: string;
  highlights: string[];
  stack: string[];
  links?: { label: string; href: string }[];
  // Media auto-detection: drop a file named `<mediaKey>.<ext>` into
  // src/assets/media/ (e.g. volatility.mp4) and it appears automatically.
  mediaKey: string;
};

export const projects: Project[] = [
  {
    title: "Efficient Email Filtering System",
    subtitle: "Bloom Filter · C++",
    category: "Systems",
    featured: true,
    description:
      "A Bloom filter built from scratch in C++ for duplicate email detection: constant-time membership checks with zero false negatives under tight memory constraints.",
    highlights: [
      "Detected duplicate emails with 0 false negatives and a 0.8% false positive rate on a 1,485 item workload.",
      "Implemented seven hash functions over a 15,000-bit array and added Base64 serialisation.",
      "Turned it into a usable command line tool with file and live ingestion, supporting real-time ADD, CHECK and SHOW operations.",
    ],
    stack: ["C++", "Bloom Filter", "Hashing", "CLI", "Data Structures"],
    mediaKey: "bloom",
  },
  {
    title: "Intraday Volatility Forecasting",
    subtitle: "Optiver Industry Project · R",
    category: "Quant",
    featured: true,
    description:
      "A forecasting pipeline over nine months of Optiver limit order book data, benchmarked against the HAR-X baseline across rolling and expanding windows.",
    highlights: [
      "Cut QLIKE forecast error 38% against the HAR-X baseline, by specifying a GJR-GARCH model that won 33 of 40 stock horizon cells across 10 US equities.",
      "Produced 48,600 out-of-sample forecasts with zero failed fits across 360 backtest simulations.",
      "Cut QLIKE from 1.38 to 0.181 between worst and best case, by caching period level features over nine months of limit order book data and rolling and expanding windows from 30 to 500 periods.",
    ],
    stack: ["R", "rugarch", "glmnet", "data.table", "GJR-GARCH"],
    mediaKey: "volatility",
  },
  {
    title: "End-to-End Automated Data Pipeline",
    subtitle: "CSV → Insight, Zero Manual Steps",
    category: "Data Science",
    featured: true,
    description:
      "A fully automated analysis pipeline that turns a raw CSV upload into clean data, statistical tests, and human-readable insights.",
    highlights: [
      "Built a fully automated pipeline from CSV upload to insight generation: cleaning data, handling outliers and missing values, and running inferential tests (t-tests, Levene's test) with no manual steps.",
      "Integrated the GPT-4 API (natural language processing) to translate statistical results into clear, human-readable summaries.",
      "Delivered the whole experience through an interactive Streamlit web app.",
    ],
    stack: ["Python", "Pandas", "SciPy", "Streamlit", "GPT-4 API"],
    mediaKey: "pipeline",
  },
];

export type SkillGroup = {
  name: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    name: "Languages",
    items: [
      "Java",
      "Python",
      "C++",
      "C",
      "JavaScript",
      "TypeScript",
      "SQL",
      "R",
    ],
  },
  {
    name: "Software Engineering",
    items: [
      "Object-Oriented Programming",
      "Data Structures & Algorithms",
      "Systems Architecture",
      "REST API Design",
      "Concurrency",
      "Distributed Computing",
      "High-Performance & Low-Latency Systems",
      "Hashing & Probabilistic Data Structures",
      "Code Review & Refactoring",
      "Debugging & Profiling",
      "Agile",
    ],
  },
  {
    name: "Cloud, Platforms & Tooling",
    items: [
      "Linux",
      "Git & GitHub",
      "Docker",
      "Kubernetes",
      "CI/CD (GitHub Actions)",
      "Vercel",
      "Monitoring & Observability Dashboards",
      "Pytest",
      "Unit, Regression & Reconciliation Testing",
    ],
  },
  {
    name: "Web & Data",
    items: [
      "React",
      "Node.js",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Relational Schema Design",
      "Row-Level Security",
      "Object Storage",
    ],
  },
  {
    name: "Quantitative & Machine Learning",
    items: [
      "NumPy",
      "Pandas",
      "SciPy",
      "Time-Series (VAR, GJR-GARCH, HAR-RV)",
      "Ridge & Elastic-Net Regularisation",
      "Kalman Filters",
      "LSTM",
      "XGBoost",
      "Monte Carlo Simulation",
      "Hypothesis & Permutation Testing",
      "Backtesting",
    ],
  },
];

export type Competition = {
  name: string;
  organisation: string;
  year: string;
  role: string;
  result: string;
  bullets: string[];
  // Headline numbers shown as a mono stat strip
  stats?: { value: string; label: string }[];
  tags?: string[];
  // Organiser logo. Drop `<logoKey>.<ext>` into src/assets/logos/ and it is
  // picked up automatically; omit the file and the entry renders without one.
  logoKey?: string;
  logoAlt?: string;
  // Optional demo: click-to-expand lightbox with a blurred backdrop.
  // Omit `video` and `poster` is presented as a still image.
  demo?: {
    poster: string;
    label: string;
    video?: string;
    caption?: string;
    /** Seconds into the video to start playback. */
    startTime?: number;
  };
};

export const competitions: Competition[] = [
  {
    name: "Susquehanna Algothon",
    organisation: "Susquehanna International Group (SIG)",
    year: "2026",
    role: "Team Lead",
    result: "Top 15% · Australia & New Zealand",
    logoKey: "susquehanna",
    logoAlt: "Susquehanna International Group",
    demo: {
      video: algothonVideo,
      poster: algothonPoster,
      label: "monitoring_terminal.rec",
    },
    bullets: [
      "Led development of a market-neutral trading engine that achieved $262,508 cumulative PnL on 250 held-out trading days, with 29 ms median decision latency across 51 instruments.",
      "Combined several quantitative strategies: vector autoregression, cointegration pairs, and PCA-based cross-sectional reversals, with daily portfolio weight re-estimation.",
      "Built a lightweight browser-based monitoring terminal using vanilla JavaScript, HTML Canvas and CSS, so the team could step through individual trading days and inspect alpha signals, drawdown, Sharpe and hit rate.",
      "Added automated reconciliation checks so the dashboard matched the competition grader exactly, along with headless Node.js smoke tests covering the main charting paths.",
      "Tested more than 100 candidate signals, including LSTMs, Kalman filters and multi-asset cointegration models, and narrowed them down using separate training and holdout datasets.",
    ],
    stats: [
      { value: "+$262.5K", label: "cumulative PnL, 250-day holdout" },
      { value: "29 ms", label: "median decision latency" },
      { value: "51", label: "instruments traded" },
      { value: "100+", label: "candidate signals tested" },
    ],
    tags: ["Python", "NumPy", "JavaScript", "HTML Canvas"],
  },
  {
    name: "IMC AlgoJam 2026",
    organisation: "IMC Trading",
    year: "2026",
    role: "Team Lead",
    result: "9th of 40 teams · Top 10 finish",
    logoKey: "imc",
    logoAlt: "IMC Trading",
    demo: {
      poster: algojamResults,
      label: "algojam_2026_results.png",
      caption:
        "Full simulation across both years: the visible development year and the hidden scoring year revealed at marking.",
    },
    bullets: [
      "Led signal research, out-of-sample validation and release of the final trading system to a top 10 finish, scored on a hidden second year of market data no entrant saw before submission.",
      "Delivered $568,609 of backtest PnL at 14.85 Sharpe and $4,898 maximum drawdown across nine instruments over the 365-day visible year, by reverse-engineering each price process from its stated mechanism and pricing it in a dependency-free Python system that runs on a stock CPython interpreter with no third-party packages.",
      "Raised mean PnL on the game-theoretic instrument to $588,237 across 300 held-out opponent simulations, 4.4x the pooled baseline at a third of the loss probability, by fading the room's prior-day lean and discounting the estimate two standard errors so the system abstains when the edge is unmeasurable.",
      "Held zero risk-limit breaches, invalid positions or type errors across 365 days, 1,056 Monte Carlo scenarios and adversarial price paths, by replacing a static 3% margin with exact greedy allocation against the $600,000 notional limit and an enforcement pass that rebuilds the book the exchange's way.",
      "Retired three signals fitted to noise and two strategy layers worth $152,800 a year, by split-half testing every information coefficient, running a 200-shuffle permutation null against a Bonferroni threshold, and re-testing candidates on pre-registered seed streams.",
    ],
    stats: [
      { value: "9th / 40", label: "final placing" },
      { value: "$568,609", label: "backtest PnL, 365-day visible year" },
      { value: "14.85", label: "Sharpe ratio" },
      { value: "$4,898", label: "maximum drawdown" },
    ],
    tags: ["Python", "NumPy", "Pandas"],
  },
];

export const education = {
  school: "The University of Sydney",
  location: "Sydney, NSW",
  period: "Feb 2024 – Jun 2028",
  degree: "Bachelor of Advanced Computing (Honours)",
  majors: "Computational Data Science & Finance (Double Major)",
  honors: [
    "Dalyell Scholar",
    "Vice Chancellor's Scholarship",
  ],
};
