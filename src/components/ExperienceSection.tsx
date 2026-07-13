import Section from "./Section";
import { experience } from "../data/portfolio";
import { Reveal } from "../lib/motion";

export default function ExperienceSection() {
  return (
    <Section
      id="experience"
      label="// where_i_have_worked"
      title="Experience"
    >
      <div className="border-t border-white/[0.08]">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.06}>
            <div className="grid grid-cols-1 gap-x-12 gap-y-6 border-b border-white/[0.08] py-10 md:grid-cols-[240px_1fr]">
              {/* Left rail: when + where */}
              <div>
                <p className="font-mono text-sm text-slate-400">{job.period}</p>
                <p className="mt-1.5 font-mono text-xs text-slate-600">
                  {job.location}
                </p>
              </div>

              {/* Right: the work itself */}
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {job.company}
                </h3>

                <ul className="mt-6 max-w-2xl space-y-4">
                  {job.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-sm leading-relaxed text-slate-400 sm:text-base"
                    >
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 font-mono text-xs tracking-wide text-slate-500">
                  {job.tags.join("  ·  ")}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
