import { ChevronRight } from "lucide-react";

/** Body list used across experience, competitions and projects. */
export default function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-2.5 text-[0.9688rem] leading-[1.65] text-muted"
        >
          <ChevronRight
            size={15}
            strokeWidth={2.2}
            aria-hidden
            className="mt-[0.3rem] shrink-0 text-accent"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
