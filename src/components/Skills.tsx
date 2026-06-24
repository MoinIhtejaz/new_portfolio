import Section from "./Section";
import { skills } from "../data/portfolio";
import { Reveal } from "../lib/motion";

export default function Skills() {
  return (
    <Section id="skills" index="05" label="// toolbox" title="Technical Skills">
      <div className="border-t border-white/[0.08]">
        {skills.map((group, i) => (
          <Reveal key={group.name} delay={i * 0.06}>
            <div className="grid grid-cols-1 gap-x-12 gap-y-4 border-b border-white/[0.08] py-8 md:grid-cols-[260px_1fr]">
              {/* Category */}
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-accent/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-medium uppercase tracking-[0.22em] text-slate-300">
                  {group.name}
                </h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="cursor-default border-b border-transparent text-lg leading-none text-slate-400 transition-colors duration-200 hover:border-accent/60 hover:text-accent sm:text-xl"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
