import Section from "./Section";
import { competitions } from "../data/portfolio";
import { getCompetitionLogo } from "../lib/competitionLogo";
import { Reveal, Stagger, StaggerItem } from "../lib/motion";
import MediaLightbox from "./MediaLightbox";

export default function Competitions() {
  return (
    <Section
      id="awards"
      label="// competitions_and_awards"
      title="Competitions & Awards"
    >
      <div className="border-t border-white/[0.08]">
        {competitions.map((c, i) => {
          const logo = c.logoKey ? getCompetitionLogo(c.logoKey) : null;

          return (
          <Reveal key={c.name} delay={i * 0.06}>
            <div className="grid grid-cols-1 gap-x-12 gap-y-6 border-b border-white/[0.08] py-10 md:grid-cols-[240px_1fr]">
              {/* Left rail: when + role */}
              <div>
                <p className="font-mono text-sm text-slate-400">{c.year}</p>
                <p className="mt-1.5 font-mono text-xs text-slate-600">
                  {c.role}
                </p>
              </div>

              {/* Right: the result */}
              <div>
                {/* Title block, with the recording sitting alongside it */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    {logo && (
                      <img
                        src={logo}
                        alt={c.logoAlt ?? c.organisation}
                        className="mb-5 w-20 rounded-md sm:w-24"
                        loading="lazy"
                      />
                    )}

                    <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {c.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-500">
                      {c.organisation}
                    </p>

                    <p className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {c.result}
                    </p>
                  </div>

                  {c.demo && (
                    <div className="w-full shrink-0 sm:max-w-sm lg:w-80">
                      <MediaLightbox
                        src={c.demo.video}
                        poster={c.demo.poster}
                        label={c.demo.label}
                        caption={c.demo.caption}
                      />
                    </div>
                  )}
                </div>

                <ul className="mt-7 max-w-2xl space-y-3">
                  {c.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-sm leading-relaxed text-slate-400 sm:text-base"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Headline numbers */}
                {c.stats && (
                  <Stagger
                    className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
                    stagger={0.07}
                  >
                    {c.stats.map((s) => (
                      <StaggerItem key={s.label}>
                        <p className="font-mono text-xl font-semibold tabular-nums text-white sm:text-2xl">
                          {s.value}
                        </p>
                        <p className="mt-1 text-xs leading-snug text-slate-500">
                          {s.label}
                        </p>
                      </StaggerItem>
                    ))}
                  </Stagger>
                )}

                {c.tags && (
                  <p className="mt-7 font-mono text-xs tracking-wide text-slate-500">
                    {c.tags.join("  ·  ")}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
