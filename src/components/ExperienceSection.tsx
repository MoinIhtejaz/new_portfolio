import { Briefcase } from "lucide-react";
import Section from "./Section";
import { experience } from "../data/portfolio";
import { Stagger, StaggerItem } from "../lib/motion";

export default function ExperienceSection() {
  return (
    <Section
      id="experience"
      index="03"
      label="// where_i_have_worked"
      title="Experience"
    >
      <Stagger className="space-y-6">
        {experience.map((job) => (
          <StaggerItem key={job.company} className="card p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 rounded-lg border border-white/10 bg-ink-800 p-2.5 text-accent">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {job.role}
                  </h3>
                  <p className="text-accent">{job.company}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {job.location}
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs text-slate-500">
                {job.period}
              </span>
            </div>

            <ul className="mt-6 space-y-3">
              {job.bullets.map((b, j) => (
                <li key={j} className="flex gap-3 text-sm text-slate-400">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {job.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/[0.06] bg-ink-800/60 px-3 py-1 font-mono text-xs text-slate-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
