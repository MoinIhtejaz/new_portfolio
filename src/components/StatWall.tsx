import { wall } from "../data/portfolio";
import { BlurIn } from "../lib/motion";

type Stat = (typeof wall)[number][number];

function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="card flex h-[11.5rem] w-[15.5rem] shrink-0 flex-col p-5 sm:w-[17rem]">
      <p className="numeral text-[2.5rem] text-ink">{stat.value}</p>
      <p className="mt-3 text-[0.9375rem] leading-snug text-muted">{stat.label}</p>
      <p className="label mt-auto w-fit rounded-md bg-ink px-2 py-1 text-paper">
        {stat.source}
      </p>
    </div>
  );
}

function Row({ stats, reverse }: { stats: Stat[]; reverse?: boolean }) {
  return (
    <div
      className="marquee"
      data-reverse={reverse ? "true" : undefined}
      style={{ ["--marquee-duration" as string]: reverse ? "84s" : "72s" }}
    >
      {/* Two copies of the track make the loop seamless. */}
      {[false, true].map((copy) => (
        <div key={String(copy)} className="marquee-track" aria-hidden={copy || undefined}>
          {stats.map((stat) => (
            <StatCard key={stat.value + stat.source} stat={stat} />
          ))}
        </div>
      ))}
    </div>
  );
}

/** A slow wall of results, each one a number from the résumé. */
export default function StatWall() {
  return (
    <section aria-labelledby="results-title" className="py-16 sm:py-24">
      <BlurIn className="container-page text-center">
        <h2
          id="results-title"
          className="display mx-auto max-w-[15ch] text-[clamp(2.25rem,5.6vw,3.875rem)] !leading-[1.02]"
        >
          Results I can <span className="text-accent-display">put a number on.</span>
        </h2>
      </BlurIn>

      <div className="mt-12 space-y-4 sm:mt-14">
        <Row stats={wall[0]} />
        <Row stats={wall[1]} reverse />
      </div>
    </section>
  );
}
