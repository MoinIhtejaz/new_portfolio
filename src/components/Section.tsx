import type { ReactNode } from "react";
import { Reveal } from "../lib/motion";

type Props = {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
};

export default function Section({ id, label, title, children }: Props) {
  return (
    <section id={id} className="container-px scroll-mt-20 py-14 sm:py-20">
      <Reveal className="mb-14 border-b border-white/[0.06] pb-7">
        <div className="section-label mb-3">{label}</div>
        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}
