import { GraduationCap, Award } from "lucide-react";
import Section from "./Section";
import { education } from "../data/portfolio";
import { Reveal } from "../lib/motion";

export default function Education() {
  return (
    <Section
      id="education"
      index="01"
      label="// background"
      title="Education"
    >
      <Reveal className="card p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 rounded-lg border border-white/10 bg-ink-800 p-2.5 text-accent">
              <GraduationCap size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {education.school}
              </h3>
              <p className="text-accent">{education.degree}</p>
              <p className="mt-1 text-sm text-slate-400">{education.majors}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                {education.location}
              </p>
            </div>
          </div>
          <span className="font-mono text-xs text-slate-500">
            {education.period}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-white/[0.06] pt-6">
          {education.honors.map((h) => (
            <span
              key={h}
              className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/5 px-3 py-1.5 text-xs text-signal"
            >
              <Award size={13} />
              {h}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
