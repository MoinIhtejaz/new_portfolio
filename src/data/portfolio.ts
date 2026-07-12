// ============================================================================
//  SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO CONTENT
//  Add new projects, experience, or skills here; the UI updates automatically.
// ============================================================================

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
