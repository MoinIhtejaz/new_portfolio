import Bullets from "./Bullets";
import MediaLightbox from "./MediaLightbox";
import Tag from "./Tag";
import {
  competitions,
  education,
  experience,
  type Competition,
  type Highlight,
} from "../data/portfolio";
import { BlurIn, Reveal } from "../lib/motion";

type Step = {
  /** Element id, so the nav and old links can land on it. */
  anchor: string;
  pill: string;
  headline: string;
  accent?: string;
  highlight?: Highlight;
  certificate?: Competition["certificate"];
  summary: string;
  org: string;
  when: string;
  result?: string;
  stats?: { value: string; label: string }[];
  bullets?: string[];
  stack?: string[];
  demo?: Competition["demo"];
  honors?: { name: string; note?: string }[];
};

// The story, in the order it reads best: the job, the competitions, the degree.
const steps: Step[] = [
  ...experience.map((job, i) => ({
    anchor: `work-${i + 1}`,
    pill: job.pill,
    headline: job.headline,
    accent: job.accent,
    highlight: job.highlight,
    summary: job.summary,
    org: job.company,
    when: job.period,
    bullets: job.bullets,
    stack: job.stack,
  })),
  ...competitions.map((c, i) => ({
    anchor: i === 0 ? "awards" : `competition-${i + 1}`,
    pill: c.tab,
    headline: c.headline,
    accent: c.accent,
    highlight: c.highlight,
    certificate: c.certificate,
    summary: c.summary,
    org: c.organisation,
    when: c.year,
    result: c.result,
    stats: c.stats,
    bullets: c.bullets,
    stack: c.stack,
    demo: c.demo,
  })),
  {
    anchor: "education",
    pill: education.pill,
    headline: education.headline,
    summary: education.summary,
    org: education.school,
    when: education.period,
    honors: education.honors,
  },
];

/** The headline, with its opening words in the accent colour when asked. */
function Headline({ step }: { step: Step }) {
  const { headline, accent } = step;
  if (!accent || !headline.startsWith(accent)) return <>{headline}</>;
  return (
    <>
      <span className="text-accent-display">{accent}</span>
      {headline.slice(accent.length)}
    </>
  );
}

/** The one thing to notice about a step, with its certificate when there is one. */
function HighlightPanel({ step }: { step: Step }) {
  if (!step.highlight) return null;
  return (
    <div className="mb-2 flex items-center gap-4 rounded-2xl border border-accent/40 bg-accent/10 p-4 sm:gap-5 sm:p-5">
      {step.certificate && (
        <div className="w-24 shrink-0 sm:w-32">
          <MediaLightbox
            poster={step.certificate.image}
            caption={step.certificate.caption}
            portrait
            hideCaption
          />
        </div>
      )}
      <div className="min-w-0">
        <p className="display text-[clamp(1.75rem,3.6vw,2.5rem)] !leading-[1.04] text-ink">
          {step.highlight.value}
        </p>
        <p className="mt-2 text-[0.9688rem] leading-snug text-muted">{step.highlight.label}</p>
        {step.certificate && (
          <p className="label mt-3 text-accent-ink">Certificate of Achievement</p>
        )}
      </div>
    </div>
  );
}

/** The detail card for each step, laid out like a small product panel. */
function StepCard({ step }: { step: Step }) {
  return (
    <div className="rounded-[24px] border border-rule bg-fill/70 p-2.5 shadow-lift sm:p-3.5">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-2 pb-3 pt-1.5">
        <p className="label text-faint">{step.org}</p>
        <div className="flex items-center gap-2">
          {step.result && (
            <Tag tone="teal" dot>
              {step.result}
            </Tag>
          )}
          <span className="rounded-lg border border-rule bg-card px-2.5 py-1 text-[0.8125rem] font-medium tabular-nums text-ink">
            {step.when}
          </span>
        </div>
      </div>

      <HighlightPanel step={step} />

      {step.stats && (
        <dl className="mb-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {step.stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col-reverse justify-end rounded-2xl border border-rule bg-card px-3.5 py-3"
            >
              <dt className="mt-1.5 text-[0.8125rem] leading-snug text-muted">{s.label}</dt>
              <dd className="numeral text-[1.5rem] text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {step.bullets && (
        <div className="rounded-2xl border border-rule bg-card p-4 sm:p-5">
          <Bullets items={step.bullets} />
          {step.stack && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {step.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          )}
        </div>
      )}

      {step.honors && (
        <dl className="grid gap-2 sm:grid-cols-2">
          {step.honors.map((h) => (
            <div key={h.name} className="rounded-2xl border border-rule bg-card px-4 py-3.5">
              <dt className="text-[1.0313rem] font-semibold tracking-[-0.02em] text-ink">
                {h.name}
              </dt>
              <dd className="mt-0.5 text-[0.875rem] text-muted">
                {h.note ?? "Scholarship"}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {step.demo && (
        <div className="mt-2 rounded-2xl border border-rule bg-card p-3">
          <MediaLightbox
            src={step.demo.video}
            poster={step.demo.poster}
            caption={step.demo.caption}
            startTime={step.demo.startTime}
          />
        </div>
      )}
    </div>
  );
}

export default function Story() {
  return (
    <section id="experience" aria-labelledby="story-title" className="scroll-mt-24 py-16 sm:py-24">
      <div className="container-page">
        <BlurIn className="text-center">
          <h2 id="story-title" className="display text-[clamp(2.4rem,6vw,3.875rem)]">
            The work so far
          </h2>
        </BlurIn>

        <div className="mt-8 lg:mt-14">
          {steps.map((step) => (
            <article
              key={step.anchor}
              id={step.anchor}
              className="scroll-mt-28 grid gap-x-14 gap-y-7 py-9 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:py-12 xl:gap-x-20"
            >
              {/* The headline stays in view while its card scrolls past. */}
              <Reveal className="lg:sticky lg:top-28 lg:self-start">
                <p className="label mb-3 text-accent-ink">{step.pill}</p>
                <h3 className="display text-[clamp(1.875rem,3.6vw,2.75rem)] !leading-[1.05] !tracking-[-0.038em] text-ink">
                  <Headline step={step} />
                </h3>
                <p className="mt-4 max-w-[35rem] text-[1.0625rem] leading-[1.55] text-muted">
                  {step.summary}
                </p>
              </Reveal>
              <Reveal>
                <StepCard step={step} />
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
