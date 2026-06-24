import type { ReactNode } from "react";
import { Reveal } from "../lib/motion";

type Props = {
  id: string;
  index: string;
  label: string;
  title: string;
  children: ReactNode;
};

export default function Section({ id, index, label, title, children }: Props) {
  return (
    <section id={id} className="container-px scroll-mt-20 py-20 sm:py-28">
      <Reveal className="mb-12 flex items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <div className="section-label mb-3">{label}</div>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
        </div>
        <span className="font-mono text-sm text-slate-700">{index}</span>
      </Reveal>
      {children}
    </section>
  );
}
