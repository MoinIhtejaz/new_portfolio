import Section from "./Section";
import { Reveal } from "../lib/motion";

export default function About() {
  return (
    <Section id="about" index="02" label="// who_i_am" title="About">
      <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[0.9fr_1.4fr]">
        <Reveal>
          <p className="text-pretty text-2xl font-light leading-snug tracking-tight text-white sm:text-3xl">
            I build <span className="text-gradient">quantitative models</span>{" "}
            and the software that puts them to work.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="space-y-5 text-base leading-relaxed text-slate-400 sm:text-lg">
          <p>
            I'm an{" "}
            <span className="text-slate-200">Advanced Computing (Honours)</span>{" "}
            student at the University of Sydney, double majoring in{" "}
            <span className="text-accent">Computational Data Science</span> and{" "}
            <span className="text-accent">Finance</span>. My work sits where
            rigorous statistics meets production engineering.
          </p>
          <p>
            On the quant side I've engineered features from Optiver order-book
            data, fitted long-memory volatility models, and built trading engines
            for options pricing. On the engineering side I've shipped full-stack
            products and memory-efficient systems from the ground up.
          </p>
          <p>
            I'm drawn to problems where{" "}
            <span className="text-slate-200">
              data-driven thinking translates directly into impact
            </span>{" "}
            — especially in tech-driven trading.
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2 font-mono text-xs uppercase tracking-wider text-slate-500">
            <span>
              <span className="text-accent">→</span> Volatility forecasting
            </span>
            <span>
              <span className="text-accent">→</span> Portfolio optimisation
            </span>
            <span>
              <span className="text-accent">→</span> Full-stack delivery
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
