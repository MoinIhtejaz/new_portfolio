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
    linkedin: "https://linkedin.com/in/maheer",
  },
  summary:
    "Advanced Computing (Honours) student at the University of Sydney, double majoring in Computational Data Science & Finance. I build quantitative models (volatility forecasting, portfolio optimisation, statistical pipelines) and ship full-stack software end to end. I'm drawn to problems where rigorous data-driven thinking meets real-world impact, especially in tech-driven trading.",
  availability: "Graduating 2028 · Open to Summer 2026/27 internships",
};

// Rotating words in the hero
export const heroRoles = [
  "Quantitative Modelling",
  "Volatility Forecasting",
  "Statistical Inference",
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
  role: string;
  location: string;
  period: string;
  bullets: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: "2A Marketing",
    role: "Business Analyst Intern",
    location: "Sydney, NSW",
    period: "Mar 2023 – Dec 2023",
    bullets: [
      "Extracted, cleaned, and joined marketing-campaign data with Python (Pandas) and built Seaborn visualisations that surfaced actionable insights and cut manual reporting effort.",
      "Developed forecasting models to identify budget-reallocation opportunities, lifting return on investment (ROI) across key channels.",
      "Built and deployed a full-stack website (React, Node.js, Supabase) for product marketing and online sales, plus a shipment-tracking portal, hosted on the company domain.",
      "Gathered requirements directly from clients and translated technical data into plain-language, objective-driven recommendations.",
    ],
    tags: ["Python", "Pandas", "React", "Node.js", "Supabase", "Forecasting"],
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
};

export const projects: Project[] = [
  {
    title: "Future Volatility Forecasting",
    subtitle: "Optiver Industry Project",
    category: "Quant",
    featured: true,
    description:
      "An end-to-end research pipeline that forecasts realised volatility from raw Optiver order-book data and prices options off the predictions.",
    highlights: [
      "Engineered features across 10 technology equities: realised volatility, log returns, bid–ask spread, weighted average price (WAP), and lagged volatility.",
      "Fitted a HAR-RV model to capture the long-memory structure of volatility.",
      "Built an ARMA–GARCH model on log returns to forecast volatility for option-pricing applications.",
      "Trained an XGBoost regressor on engineered predictors, benchmarking against HAR-RV and ARMA–GARCH.",
      "Built a trading engine that combines all fitted models to predict future volatility for options pricing.",
    ],
    stack: ["Python", "XGBoost", "ARMA–GARCH", "HAR-RV", "NumPy", "Pandas"],
  },
  {
    title: "Stock Portfolio Optimisation",
    subtitle: "Markowitz Mean-Variance Model",
    category: "Quant",
    featured: true,
    description:
      "A Modern Portfolio Theory engine that constructs optimal portfolios from expected returns and the covariance matrix of historical equity prices.",
    highlights: [
      "Implemented Markowitz mean-variance optimisation in Python to build optimal portfolios under weight constraints.",
      "Applied quadratic optimisation (SciPy) to derive the efficient frontier and solve max-Sharpe and minimum-variance portfolios.",
      "Ran Monte Carlo simulations over thousands of random portfolios to validate the frontier and visualise the risk–return trade-off.",
      "Computed annualised return, volatility, and Sharpe ratio per portfolio; charted the frontier, capital market line, and optimal allocations.",
    ],
    stack: ["Python", "SciPy", "NumPy", "Monte Carlo", "Matplotlib"],
  },
  {
    title: "End-to-End Automated Data Pipeline",
    subtitle: "CSV → Insight, Zero Manual Steps",
    category: "Data Science",
    featured: true,
    description:
      "A fully automated analysis pipeline that turns a raw CSV upload into clean data, statistical tests, charts, and human-readable insights.",
    highlights: [
      "Built a pipeline from CSV upload to insight generation: cleaning data, running statistical tests, and generating charts with no manual steps.",
      "Wrote custom Python (Pandas, SciPy) to handle outliers and missing values and run inferential tests including t-tests and Levene's test across grouped data.",
      "Integrated the GPT-4 API to translate raw statistical results into clear, human-readable summaries.",
      "Delivered the whole experience through an interactive Streamlit web app.",
    ],
    stack: ["Python", "Pandas", "SciPy", "Streamlit", "GPT-4 API"],
  },
  {
    title: "Efficient Email Filtering System",
    subtitle: "Bloom Filter · Space-Optimised",
    category: "Systems",
    description:
      "A space-efficient email-filtering system using a Bloom filter for rapid, low-memory duplicate detection with zero false negatives.",
    highlights: [
      "Designed to scale to thousands of new entries per semester under tight memory constraints.",
      "Engineered a 7-hash Bloom filter over a 15,000-bit array with custom polynomial rolling hashes for fast membership checks.",
      "Implemented Base64 bit-array serialisation, CLI command parsing, and email ingestion from file and live input.",
      "Supported real-time ADD, CHECK, and SHOW operations.",
    ],
    stack: ["Java", "Bloom Filter", "Hashing", "CLI", "Data Structures"],
  },
];

export type SkillGroup = {
  name: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    name: "Languages",
    items: ["Python", "Java", "SQL", "R", "C++"],
  },
  {
    name: "Data Science & Quant",
    items: [
      "NumPy",
      "Pandas",
      "SciPy",
      "XGBoost",
      "Matplotlib",
      "Seaborn",
      "Streamlit",
      "Statistical Modelling",
      "Time-Series (ARMA–GARCH, HAR-RV)",
      "Hypothesis Testing",
    ],
  },
  {
    name: "Web Development",
    items: ["React", "Node.js", "Tailwind CSS"],
  },
  {
    name: "Tools & Workflow",
    items: [
      "Git",
      "GitHub",
      "Gradle",
      "Maven",
      "Pytest",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Vercel",
      "Supabase",
    ],
  },
  {
    name: "CS Foundations",
    items: ["Data Structures", "Algorithms"],
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
