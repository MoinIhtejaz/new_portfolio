import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import { competitions, education, profile } from "../data/portfolio";
import { getCompetitionLogo } from "../lib/competitionLogo";
import { EASE } from "../lib/motion";

// The splash is still fading out when the page mounts, so the hero waits a
// beat before its own entrance.
const START = 0.25;

function Badge({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-accent-ink/35 bg-card/70 py-2 pl-2.5 pr-5 text-left backdrop-blur-sm">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-fill text-accent-ink">
        {icon}
      </span>
      <span>
        <span className="label block text-accent-ink">{label}</span>
        <span className="block text-[1.0313rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
          {value}
        </span>
      </span>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(10px)" },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.9, ease: EASE, delay: START + delay },
  });

  // The two trading competitions lead the badges; the scholarship follows.
  const badges = competitions
    .filter((c) => c.result)
    .map((c) => ({
      label: c.tab,
      value: c.result as string,
      logo: c.logoKey ? getCompetitionLogo(c.logoKey) : null,
      alt: c.logoAlt ?? c.organisation,
    }));

  const terminal = competitions.find((c) => c.demo?.video)?.demo;

  return (
    <section id="top" className="relative isolate overflow-hidden pb-10 pt-32 sm:pt-40">
      <div className="hero-glow" aria-hidden />

      <div className="container-page flex flex-col items-center text-center">
        <motion.h1
          {...rise(0)}
          className="display text-[clamp(2.9rem,8.2vw,6.25rem)]"
        >
          {profile.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </motion.h1>

        <motion.p
          {...rise(0.1)}
          className="mt-7 max-w-[36rem] text-[1.0938rem] leading-[1.55] text-muted sm:text-[1.1875rem]"
        >
          {profile.blurb}
        </motion.p>

        <motion.div {...rise(0.2)} className="mt-9">
          <a href={`mailto:${profile.email}`} className="btn-accent">
            Get in touch
            <ArrowRight size={20} strokeWidth={2.2} aria-hidden />
          </a>
        </motion.div>

        <motion.div
          {...rise(0.3)}
          className="mt-8 flex flex-wrap items-stretch justify-center gap-3"
        >
          {badges.map((b) => (
            <Badge
              key={b.label}
              label={b.label}
              value={b.value}
              icon={
                b.logo ? (
                  <img src={b.logo} alt={b.alt} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-sm font-semibold">{b.label.slice(0, 2)}</span>
                )
              }
            />
          ))}
          <Badge
            label="University of Sydney"
            value={education.honors[0].name}
            icon={<GraduationCap size={21} strokeWidth={1.8} aria-hidden />}
          />
        </motion.div>

        {/* The monitoring terminal built for the Algothon, running. */}
        {terminal?.video && (
          <motion.figure
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 36, scale: 0.97 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: START + 0.42 }}
            className="mt-14 w-full max-w-[60rem] sm:mt-16"
          >
            <div className="relative overflow-hidden rounded-[22px] border border-rule bg-black shadow-[0_50px_110px_-40px_rgb(var(--accent)/0.75),0_24px_50px_-28px_rgb(10_11_13/0.5)] sm:rounded-[30px]">
              <video
                src={terminal.video}
                poster={terminal.poster}
                autoPlay={!reduce}
                controls={reduce ?? false}
                muted
                loop
                playsInline
                aria-label={terminal.caption}
                className="block aspect-[15/8] w-full object-cover"
              />
              <span className="label pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1.5 text-white backdrop-blur-sm sm:bottom-4 sm:left-4">
                Monitoring terminal
              </span>
            </div>
            <figcaption className="mt-4 text-[0.9375rem] text-muted">
              {terminal.caption}
            </figcaption>
          </motion.figure>
        )}
      </div>
    </section>
  );
}
