import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, LayoutGrid, Rows3, X } from "lucide-react";
import Section from "./Section";
import Bullets from "./Bullets";
import Tag from "./Tag";
import { projects, type Project } from "../data/portfolio";
import { getProjectMedia } from "../lib/projectMedia";
import { EASE, Reveal } from "../lib/motion";

type View = "gallery" | "table";

/** The cover of a project: its own media if a file exists, else its headline
    result set large on a tinted tile. */
function Cover({ project, tall = false }: { project: Project; tall?: boolean }) {
  const media = getProjectMedia(project.mediaKey);
  const height = tall ? "h-44 sm:h-52" : "h-40";

  if (media) {
    return media.type === "video" ? (
      <video
        src={media.src}
        autoPlay
        muted
        loop
        playsInline
        className={`${height} w-full object-cover`}
      />
    ) : (
      <img
        src={media.src}
        alt=""
        loading="lazy"
        className={`${height} w-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`tone-${project.tone} ${height} flex flex-col justify-end px-5 pb-4`}
      style={{ background: "rgb(var(--t-bg))", color: "rgb(var(--t-fg))" }}
    >
      <p className="numeral text-[2.75rem]">{project.metric.value}</p>
      <p className="mt-1.5 text-sm font-medium opacity-80">{project.metric.label}</p>
    </div>
  );
}

/** Full details for one project, opened from a card or a table row. */
function ProjectPeek({ project, onClose }: { project: Project; onClose: () => void }) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const returnTo = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      returnTo?.focus({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-8"
    >
      <motion.div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.18 } }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        exit={
          reduce
            ? { opacity: 0 }
            : { opacity: 0, y: 16, scale: 0.985, transition: { duration: 0.18 } }
        }
        transition={{ duration: 0.36, ease: EASE }}
        className="relative z-10 flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[28px] border border-rule bg-card shadow-lift sm:rounded-[28px]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/55"
        >
          <X size={18} strokeWidth={2} />
        </button>

        <div className="overflow-y-auto">
          <Cover project={project} tall />
          <div className="px-5 pb-7 pt-6 sm:px-8 sm:pb-8">
            <Tag tone={project.tone}>{project.kind}</Tag>
            <h3 className="mt-3 text-[1.75rem] font-semibold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[2.125rem]">
              {project.title}
            </h3>

            <div className="mt-6">
              <Bullets items={project.bullets} />
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>

            {project.links && project.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost h-9 px-4 text-sm"
                  >
                    {l.label}
                    <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [view, setView] = useState<View>("gallery");
  const [peek, setPeek] = useState<Project | null>(null);
  const closePeek = useCallback(() => setPeek(null), []);

  const switcher = (
    <div
      role="group"
      aria-label="Project layout"
      className="flex shrink-0 rounded-full bg-fill p-1"
    >
      {(
        [
          { id: "gallery", label: "Gallery", Icon: LayoutGrid },
          { id: "table", label: "Table", Icon: Rows3 },
        ] as const
      ).map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          aria-pressed={view === id}
          onClick={() => setView(id)}
          className={`flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-colors duration-200 ${
            view === id
              ? "bg-card text-ink shadow-[0_1px_2px_rgb(0_0_0/0.12)]"
              : "text-muted hover:text-ink"
          }`}
        >
          <Icon size={14} strokeWidth={2} aria-hidden />
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <Section
      id="projects"
      title="Projects"
      note="Personal and university work. Open one for the details."
      aside={switcher}
    >
      {view === "gallery" ? (
        <div className="mx-auto grid max-w-[62rem] gap-4 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.05}>
              <button
                type="button"
                onClick={() => setPeek(project)}
                className="card group flex h-full w-full cursor-pointer flex-col overflow-hidden text-left transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-lift active:translate-y-0 active:scale-[0.995]"
              >
                <Cover project={project} />
                <span className="flex flex-1 flex-col px-5 pb-5 pt-4">
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-[1.25rem] font-semibold leading-snug tracking-[-0.025em] text-ink">
                      {project.title}
                    </span>
                    <ArrowUpRight
                      size={17}
                      strokeWidth={2}
                      aria-hidden
                      className="mt-1 shrink-0 text-faint transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </span>
                  <span className="mt-2 block text-[0.9375rem] leading-[1.55] text-muted">
                    {project.summary}
                  </span>
                  <span className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    <Tag tone={project.tone}>{project.kind}</Tag>
                    {project.stack.slice(0, 3).map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal className="card mx-auto max-w-[62rem] overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left text-[0.9375rem]">
            <thead>
              <tr className="border-b border-rule text-sm text-faint">
                <th scope="col" className="px-4 py-2.5 font-medium sm:px-5">
                  Project
                </th>
                <th scope="col" className="px-4 py-2.5 font-medium">
                  Type
                </th>
                <th scope="col" className="px-4 py-2.5 font-medium">
                  Result
                </th>
                <th scope="col" className="hidden px-4 py-2.5 font-medium md:table-cell">
                  Built with
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.title}
                  onClick={() => setPeek(project)}
                  className="cursor-pointer border-b border-rule transition-colors duration-200 last:border-b-0 hover:bg-fill"
                >
                  <th scope="row" className="px-4 py-3.5 font-semibold text-ink sm:px-5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPeek(project);
                      }}
                      className="cursor-pointer text-left"
                    >
                      {project.title}
                    </button>
                  </th>
                  <td className="px-4 py-3.5">
                    <Tag tone={project.tone}>{project.kind}</Tag>
                  </td>
                  <td className="px-4 py-3.5 text-muted">
                    <span className="font-semibold tabular-nums text-ink">
                      {project.metric.value}
                    </span>{" "}
                    {project.metric.label}
                  </td>
                  <td className="hidden px-4 py-3.5 text-muted md:table-cell">
                    {project.stack.slice(0, 3).join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      )}

      {createPortal(
        <AnimatePresence>
          {peek && <ProjectPeek project={peek} onClose={closePeek} />}
        </AnimatePresence>,
        document.body
      )}
    </Section>
  );
}
