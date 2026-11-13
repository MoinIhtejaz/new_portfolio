import type { ReactNode } from "react";
import { BlurIn } from "../lib/motion";

type Props = {
  id: string;
  title: string;
  /** One short line of context under the title. */
  note?: string;
  /** Controls that sit under the heading. */
  aside?: ReactNode;
  children: ReactNode;
};

/** A page section: a large centred heading that sharpens into view. */
export default function Section({ id, title, note, aside, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 py-16 sm:py-24">
      <div className="container-page">
        <BlurIn className="mx-auto max-w-[44rem] text-center">
          <h2 id={`${id}-title`} className="display text-[clamp(2.4rem,6vw,3.875rem)]">
            {title}
          </h2>
          {note && (
            <p className="mt-4 text-[1.0625rem] leading-[1.55] text-muted">{note}</p>
          )}
          {aside && <div className="mt-6 flex justify-center">{aside}</div>}
        </BlurIn>
        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}
