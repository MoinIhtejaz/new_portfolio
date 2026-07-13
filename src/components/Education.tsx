import { Award } from "lucide-react";
import Section from "./Section";
import { education } from "../data/portfolio";
import { Reveal } from "../lib/motion";

export default function Education() {
  return (
    <Section id="education" label="// background" title="Education">
      <div className="border-t border-white/[0.08]">
        <Reveal>
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 border-b border-white/[0.08] py-10 md:grid-cols-[240px_1fr]">
            {/* Left rail: when + where */}
            <div>
              <p className="font-mono text-sm text-slate-400">
                {education.period}
              </p>
              <p className="mt-1.5 font-mono text-xs text-slate-600">
                {education.location}
              </p>
            </div>

            {/* Right: the degree */}
            <div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {education.school}
              </h3>
              <p className="mt-3 text-base text-accent sm:text-lg">
                {education.degree}
              </p>
              <p className="mt-1 text-sm text-slate-400">{education.majors}</p>

              <div className="mt-8 space-y-3.5">
                {education.honors.map((h) => (
                  <div key={h} className="flex items-center gap-3">
                    <Award
                      size={16}
                      className="shrink-0 text-signal [filter:drop-shadow(0_0_8px_rgba(251,191,36,0.55))]"
                    />
                    <span className="text-base font-medium tracking-wide text-amber-200 [text-shadow:0_0_10px_rgba(251,191,36,0.6),0_0_28px_rgba(251,191,36,0.35),0_0_56px_rgba(251,191,36,0.18)]">
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
