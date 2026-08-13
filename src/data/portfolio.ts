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
  role: "Quantitative & Software Engineer",
  tagline: "Computational Data Science & Finance @ University of Sydney",
  location: "Sydney, NSW",
  email: "ihtejaz555@gmail.com",
  resumeUrl: "/Maheer_Ihtejaz_Moin_Resume.pdf",
  socials: {
    github: "https://github.com/MoinIhtejaz",
    linkedin: "https://www.linkedin.com/in/maheer-",
  },
  summary:
    "Advanced Computing (Honours) student at the University of Sydney, double majoring in Computational Data Science & Finance. I build high-performance systems, large-scale data research pipelines, and quantitative models (volatility forecasting, options pricing, portfolio optimisation), and I ship full-stack software end to end. Seeking software engineering and quantitative internships where hard problems meet production-grade technology.",
  availability: "Graduating 2028 · Seeking SWE & quant internships",
};

// Rotating words in the hero
export const heroRoles = [
  "Quantitative Modelling",
  "High-Performance Systems",
  "Machine Learning & NLP",
  "Full-Stack Engineering",
];

export const stats = [
  { value: "5+", label: "Quant & data projects shipped" },
  { value: "2", label: "Double major: CompSci · Finance" },
  { value: "10", label: "Equities modelled (Optiver order-book)" },
  { value: "WAM", label: "Dalyell Scholar · VC Scholarship" },
];

export type Experience = {
  company: string;
  location: string;
  period: string;
  bullets: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: "2A Marketing",
    location: "Sydney, NSW",
    period: "Mar 2023 – Dec 2023",
    bullets: [
      "Built and deployed a full-stack website for company information, communications, and online sales, featuring a splash screen and Framer Motion animations for a polished, responsive user experience, hosted on the company domain.",
      "Architected the backend on Supabase for data storage, authentication, and live content management.",
      "Built a shipment-tracking portal emulating a version-control-style environment to manage shipping documents, with live shipment status updates.",
    ],
    tags: ["React", "Node.js", "Supabase", "Framer Motion", "Full-Stack"],
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
    title: "Future Volatility Forecasting",
    subtitle: "Optiver Industry Project",
    category: "Quant",
    featured: true,
    description:
      "An end-to-end research pipeline that forecasts realised volatility from large-scale Optiver order-book data and drives an options-pricing engine.",
    highlights: [
      "Engineered features from large-scale order-book data across 10 technology equities: realised volatility, log returns, bid–ask spread, and weighted average price (WAP).",
      "Fitted HAR-RV and ARMA–GARCH models and trained an XGBoost regressor to forecast future stock volatility.",
      "Built a trading-engine application that uses the fitted and trained models to predict future volatility and drive an options-pricing engine.",
    ],
    stack: ["Python", "XGBoost", "ARMA–GARCH", "HAR-RV", "NumPy", "Pandas"],
    mediaKey: "volatility",
  },
  {
    title: "Stock Portfolio Optimisation",
    subtitle: "Markowitz Mean-Variance Model",
    category: "Quant",
    featured: true,
    description:
      "A Modern Portfolio Theory engine, wrapped in an interactive application: end-to-end software engineering from quantitative model to deployable tool.",
    highlights: [
      "Implemented Modern Portfolio Theory with quadratic optimisation (SciPy) to derive the efficient frontier and the maximum-Sharpe-ratio and minimum-variance portfolios.",
      "Validated the optimiser with Monte Carlo simulation across thousands of random portfolios.",
      "Built an interactive application around the optimiser, taking the quantitative model all the way to a usable, deployable tool.",
    ],
    stack: ["Python", "SciPy", "NumPy", "Monte Carlo", "Matplotlib"],
    mediaKey: "optimiser",
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
  {
    title: "Efficient Email Filtering System",
    subtitle: "Bloom Filter · C++",
    category: "Systems",
    description:
      "A space-efficient email-filtering system in C++ using a Bloom filter for rapid, low-memory duplicate detection with zero false negatives.",
    highlights: [
      "Engineered a 7-hash Bloom filter over a 15,000-bit array with custom polynomial rolling hashes for fast membership checks under tight memory constraints.",
      "Implemented Base64 bit-array serialisation, CLI command parsing, and email ingestion from file and live input.",
      "Supported real-time ADD, CHECK, and SHOW operations.",
    ],
    stack: ["C++", "Bloom Filter", "Hashing", "CLI", "Data Structures"],
    mediaKey: "bloom",
  },
];

export type SkillGroup = {
  name: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    name: "Languages",
    items: ["Python", "C++", "Java", "SQL", "R"],
  },
  {
    name: "Software Engineering",
    items: [
      "Systems Architecture",
      "High-Performance & Low-Latency Systems",
      "Distributed Computing",
      "Concurrency",
      "Data Structures & Algorithms",
      "OOP",
      "Linux",
      "Git & GitHub",
      "Docker",
      "Kubernetes",
      "CI/CD (GitHub Actions)",
      "Pytest",
      "Agile",
    ],
  },
  {
    name: "Web & Platforms",
    items: [
      "React",
      "Node.js",
      "Tailwind CSS",
      "Supabase",
      "Streamlit",
      "REST APIs",
      "Full-Stack Development",
    ],
  },
  {
    name: "Machine Learning & Data",
    items: [
      "Machine Learning",
      "Natural Language Processing",
      "GPT-4 API Integration",
      "XGBoost",
      "NumPy",
      "Pandas",
      "SciPy",
      "Statistical Modelling",
      "Large-Scale Data Platforms",
    ],
  },
  {
    name: "Quantitative & Finance",
    items: [
      "Probability & Statistics",
      "Time-Series (ARMA–GARCH, HAR-RV)",
      "Monte Carlo Simulation",
      "Hypothesis Testing",
      "Mathematical Modelling",
      "Options Pricing",
      "Portfolio Optimisation",
      "Market Microstructure",
      "Risk Management",
      "Quantitative Research",
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
  demo?: { poster: string; label: string; video?: string; caption?: string };
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
      "Led a four-stage research cycle from signal generation to frozen submission, finishing in the top 15% of entrants drawn from every university in Australia and New Zealand.",
      "Produced $1,050 mean daily PnL at 6.43 annualised Sharpe across 51 instruments and $114.9M of traded volume, by building a market-neutral book in pure NumPy from a ridge vector autoregression ensemble, cointegration pairs and reversal signals.",
      "Generated +$262,508 cumulative PnL over a 250-day held-out test at 29 ms median decision latency, by validating the frozen model on post-freeze synthetic markets and tracking PnL attribution in a real-time monitoring terminal I built.",
      "Cut 100+ candidate signals to the three that shipped, by benchmarking LSTMs, Kalman filters and multi-asset cointegration against pre-registered train and holdout splits and deriving blend weights statistically.",
    ],
    stats: [
      { value: "6.43", label: "annualised Sharpe" },
      { value: "+$262.5K", label: "cumulative PnL, 250-day holdout" },
      { value: "$114.9M", label: "traded volume" },
      { value: "29 ms", label: "median decision latency" },
    ],
    tags: ["Python", "NumPy", "Statistical Arbitrage"],
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
        "Full simulation across both years — the visible development year and the hidden scoring year revealed at marking.",
    },
    bullets: [
      "Led signal research, out-of-sample validation and release of the final trading system to a top 10 finish, scored on a hidden second year of market data no entrant saw before submission.",
      "Delivered $568,609 of backtest PnL at 14.85 Sharpe and $4,898 maximum drawdown across nine instruments over the 365-day visible year, by reverse-engineering each price process from its stated mechanism and pricing it in a dependency-free Python system that runs on a stock CPython interpreter with no third-party packages.",
      "Raised mean PnL on the game-theoretic instrument to $588,237 across 300 held-out opponent simulations, 4.4x the pooled baseline at a third of the loss probability, by fading the room's prior-day lean and discounting the estimate two standard errors so the system abstains when the edge is unmeasurable.",
      "Held zero risk-limit breaches, invalid positions or type errors across 365 days, 1,056 Monte Carlo scenarios and adversarial price paths, by replacing a static 3% margin with exact greedy allocation against the $600,000 notional limit and an enforcement pass that rebuilds the book the exchange's way.",
      "Retired three signals fitted to noise and two strategy layers worth $152,800 a year, by split-half testing every information coefficient, running a 200-shuffle permutation null against a Bonferroni threshold, and re-testing candidates on pre-registered seed streams.",
    ],
    stats: [
      { value: "$990,714", label: "total simulated P&L" },
      { value: "9th / 40", label: "final placing" },
      { value: "9", label: "instruments traded" },
      { value: "~90%", label: "of $600K notional deployed" },
    ],
    tags: ["Python", "NumPy", "Pandas"],
  },
];

export const education = {
  school: "The University of Sydney",
  location: "Sydney, NSW",
  period: "2024 – 2028",
  degree: "Bachelor of Advanced Computing (Honours)",
  majors: "Computational Data Science & Finance (Double Major)",
  honors: [
    "Dalyell Scholar",
    "Vice Chancellor's Scholarship",
  ],
};
