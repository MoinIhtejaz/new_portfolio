import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Section from "./Section";
import { projects, type Project } from "../data/portfolio";
import { getProjectMedia } from "../lib/projectMedia";
import { Reveal } from "../lib/motion";

const categoryColor: Record<Project["category"], { dot: string; text: string }> =
  {
    Quant: { dot: "bg-accent", text: "text-accent" },
    "Data Science": { dot: "bg-sky-300", text: "text-sky-300" },
    Systems: { dot: "bg-signal", text: "text-signal" },
    "Full-Stack": { dot: "bg-fuchsia-300", text: "text-fuchsia-300" },
  };

// Slide choreography: cards swing in and out around the Y axis so the
// carousel reads as a physical object turning in space.
const slideVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? 420 : -420,
    opacity: 0,
    rotateY: dir >= 0 ? 26 : -26,
    scale: 0.94,
  }),
  center: {
    x: 0,
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? -420 : 420,
    opacity: 0,
    rotateY: dir >= 0 ? -26 : 26,
    scale: 0.94,
    transition: { duration: 0.32, ease: [0.4, 0, 1, 1] },
  }),
};

const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

function SlideContent({ project, reduce }: { project: Project; reduce: boolean }) {
  const colors = categoryColor[project.category];
  const media = getProjectMedia(project.mediaKey);

  // Pointer-tracking tilt: the panel leans toward the cursor.
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [5, -5]), {
    stiffness: 160,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), {
    stiffness: 160,
    damping: 22,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={reduce ? undefined : onLeave}
      style={
        reduce
          ? undefined
          : { rotateX, rotateY, transformStyle: "preserve-3d" }
      }
      className={`grid items-center gap-10 lg:gap-14 ${
        media ? "lg:grid-cols-[1fr_1.05fr]" : "mx-auto max-w-3xl"
      }`}
    >
      {/* Text */}
      <div style={reduce ? undefined : { transform: "translateZ(24px)" }}>
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
          <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
          <span className={colors.text}>{project.category}</span>
          {project.featured && <span className="ml-1 text-slate-600">★</span>}
        </div>

        <h3 className="mt-4 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-2 font-mono text-xs text-accent">{project.subtitle}</p>

        <p className="mt-6 text-pretty text-sm leading-relaxed text-slate-400 sm:text-base">
          {project.description}
        </p>

        <ul className="mt-6 space-y-3">
          {project.highlights.map((h, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm leading-relaxed text-slate-400"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>

        <p className="mt-6 font-mono text-xs leading-relaxed text-slate-500">
          {project.stack.join("  ·  ")}
        </p>

        {project.links && project.links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-4">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
              >
                {l.label}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Media: rendered only when the project has it */}
      {media && (
        <div
          style={reduce ? undefined : { transform: "translateZ(52px)" }}
          className="relative"
        >
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-accent/[0.07] blur-2xl" />
          {media.type === "video" ? (
            <video
              src={media.src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full rounded-2xl border border-white/10 shadow-2xl shadow-black/50"
            />
          ) : (
            <img
              src={media.src}
              alt={`${project.title} preview`}
              className="w-full rounded-2xl border border-white/10 shadow-2xl shadow-black/50"
              loading="lazy"
            />
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function Projects() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useRef(false);

  const paginate = useCallback((dir: number) => {
    setState(([i]) => [(i + dir + projects.length) % projects.length, dir]);
  }, []);

  // Arrow keys navigate, but only while the showcase is on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { threshold: 0.25 }
    );
    observer.observe(el);

    const onKey = (e: KeyboardEvent) => {
      if (!inView.current) return;
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [paginate]);

  const project = projects[index];

  return (
    <Section id="projects" label="// selected_work" title="Projects">
      <Reveal>
        <div
          ref={sectionRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Project showcase"
          className="relative"
          style={{ perspective: 1400 }}
        >
          <div className="min-h-[420px] sm:min-h-[380px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={project.title}
                custom={direction}
                variants={reduce ? fadeVariants : slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -90) paginate(1);
                  else if (info.offset.x > 90) paginate(-1);
                }}
                aria-label={`Project ${index + 1} of ${projects.length}`}
                className="cursor-grab active:cursor-grabbing"
              >
                <SlideContent project={project} reduce={reduce} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-5 flex items-center justify-center gap-6">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous project"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors duration-200 hover:border-accent/50 hover:text-accent"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="flex items-center gap-2.5">
              {projects.map((p, i) => (
                <button
                  key={p.title}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Go to project ${i + 1}: ${p.title}`}
                  aria-current={i === index ? "true" : undefined}
                  className={`h-1 cursor-pointer rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-8 bg-accent"
                      : "w-4 bg-slate-700 hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              aria-label="Next project"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors duration-200 hover:border-accent/50 hover:text-accent"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="mt-3 text-center font-mono text-xs text-slate-600">
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
