import type { ReactNode } from "react";
import type { Tone } from "../data/portfolio";

type Props = {
  tone?: Tone;
  /** Show a small status dot before the label. */
  dot?: boolean;
  /** Allow long labels to wrap instead of staying on one line. */
  wrap?: boolean;
  children: ReactNode;
};

export default function Tag({ tone = "gray", dot, wrap, children }: Props) {
  return (
    <span className={`tag tone-${tone} ${wrap ? "tag-wrap" : ""}`}>
      {dot && (
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden />
      )}
      {children}
    </span>
  );
}
