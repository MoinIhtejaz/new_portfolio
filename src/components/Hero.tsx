import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Github, Linkedin, MapPin, FileDown } from "lucide-react";
import { profile, heroRoles } from "../data/portfolio";

// Skills shown in the scrolling ribbon. `core` items are highlighted.
const marqueeSkills: { label: string; core?: boolean }[] = [
  { label: "Python", core: true },
  { label: "C++", core: true },
  { label: "Java" },
  { label: "SQL" },
  { label: "R" },
  { label: "NumPy" },
  { label: "Pandas", core: true },
  { label: "SciPy" },
  { label: "XGBoost", core: true },
  { label: "ARMA–GARCH", core: true },
  { label: "HAR-RV", core: true },
  { label: "Monte Carlo" },
  { label: "Matplotlib" },
  { label: "Seaborn" },
  { label: "Streamlit" },
  { label: "React", core: true },
  { label: "Node.js" },
  { label: "Tailwind" },
  { label: "Docker", core: true },
  { label: "Kubernetes" },
  { label: "Git" },
  { label: "Vercel" },
  { label: "Supabase" },
  { label: "Pytest" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE },
  },
};

function MarqueeTrack({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 animate-marquee items-center gap-7 pr-7"
      aria-hidden={ariaHidden}
    >
      {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
        <span key={i} className="flex items-center gap-7 whitespace-nowrap">
          <span
            className={`font-mono text-sm uppercase tracking-widest transition-colors ${
              s.core
                ? "text-accent [text-shadow:0_0_18px_rgba(45,212,191,0.45)]"
                : "text-slate-600"
            }`}
          >
            {s.label}
          </span>
          <span className="text-slate-700">/</span>
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Hero content gently lifts and fades as it scrolls away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % heroRoles.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden pt-36 pb-16 sm:pt-44"
    >
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-px"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
          }}
          className="max-w-3xl"
        >
          <motion.div
            variants={itemVariants}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-xs text-slate-400">
              {profile.availability}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-balance text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="mt-5 flex h-8 items-center font-mono text-lg text-accent sm:text-xl"
          >
            <span className="mr-2 text-slate-600">~/</span>
            <span key={idx} className="animate-fade-up">
              {heroRoles[idx]}
            </span>
            <span className="ml-1 inline-block h-5 w-2 animate-pulse-slow bg-accent" />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink-950 shadow-[0_0_30px_-6px_rgba(45,212,191,0.5)] transition-colors hover:bg-accent-soft"
            >
              View Projects
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.a>
            <motion.a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-slate-200 backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-accent"
            >
              <FileDown size={16} />
              Download Résumé
            </motion.a>

            <div className="flex items-center gap-1 sm:ml-2">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="rounded-full p-2.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-accent"
              >
                <Github size={20} />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-full p-2.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-accent"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex items-center gap-2 font-mono text-xs text-slate-500"
          >
            <MapPin size={13} /> {profile.location}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Skills ribbon */}
      <div className="relative mt-20 border-y border-white/[0.06] bg-white/[0.015] py-5 backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-ink-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-ink-950 to-transparent" />
        <div className="flex overflow-hidden">
          <MarqueeTrack />
          <MarqueeTrack ariaHidden />
        </div>
      </div>
    </section>
  );
}
