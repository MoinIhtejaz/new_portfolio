import { skills } from "../data/portfolio";
import { BlurIn, Reveal } from "../lib/motion";

/** Sits on the dark closing section. */
export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-24 pb-20 pt-4 sm:pb-28">
      <div className="container-page">
        <BlurIn className="text-center">
          <p className="label mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            Toolbox
          </p>
          <h2 id="skills-title" className="display text-[clamp(2.4rem,6vw,3.875rem)]">
            What I work with
          </h2>
        </BlurIn>

        <Reveal className="mx-auto mt-10 max-w-[62rem] sm:mt-12">
          <dl className="overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.035]">
            {skills.map((group) => (
              <div
                key={group.name}
                className="grid gap-x-6 gap-y-2.5 border-b border-white/10 px-4 py-4 last:border-b-0 sm:grid-cols-[14.5rem_minmax(0,1fr)] sm:px-6 sm:py-[1.125rem]"
              >
                <dt className="text-[0.9688rem] font-semibold tracking-[-0.01em] text-white">
                  {group.name}
                </dt>
                <dd className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/[0.13] px-2.5 py-0.5 text-[0.8125rem] leading-[1.5] text-white/75"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
