import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Section from "./Section";
import { projects, type Project } from "../data/portfolio";
import { Stagger, StaggerItem } from "../lib/motion";

const categoryColor: Record<Project["category"], string> = {
  Quant: "text-accent border-accent/30 bg-accent/5",
  "Data Science": "text-sky-300 border-sky-400/30 bg-sky-400/5",
  Systems: "text-signal border-signal/30 bg-signal/5",
  "Full-Stack": "text-fuchsia-300 border-fuchsia-400/30 bg-fuchsia-400/5",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <StaggerItem
      className="card group overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span
              className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider ${
                categoryColor[project.category]
              }`}
            >
              {project.category}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-white">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-accent">{project.subtitle}</p>
          </div>
          {project.featured && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
              ★ featured
            </span>
          )}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          {project.description}
        </p>

        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-4 inline-flex cursor-pointer items-center gap-1.5 font-mono text-xs text-slate-400 transition-colors hover:text-accent"
        >
          {open ? "Hide details" : "Show details"}
          <ChevronDown
            size={14}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ${
            open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="space-y-2.5 border-l border-white/[0.06] pl-4">
              {project.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 text-sm leading-relaxed text-slate-400"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-md bg-ink-800/80 px-2 py-1 font-mono text-[11px] text-slate-400"
            >
              {s}
            </span>
          ))}
        </div>

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
    </StaggerItem>
  );
}

export default function Projects() {
  return (
    <Section id="projects" index="04" label="// selected_work" title="Projects">
      <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.12}>
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </Stagger>
    </Section>
  );
}
