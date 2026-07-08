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
    <section id={id} className="container-px scroll-mt-20 py-20 sm:py-28">
      <Reveal className="mb-12 border-b border-white/[0.06] pb-6">
        <div className="section-label mb-3">{label}</div>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}
