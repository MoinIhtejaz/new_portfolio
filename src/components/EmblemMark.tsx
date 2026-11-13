/**
 * The site's mark: the two sweeping arcs and core from the entry splash,
 * reduced to a glyph. Arcs take the accent colour, the core takes text colour.
 */
export default function EmblemMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeLinecap="round"
      aria-hidden
      className={className}
    >
      <g stroke="rgb(var(--accent))" strokeWidth="2.3">
        <path d="M13.48 3.63A8.5 8.5 0 0 1 20.37 13.48" />
        <path d="M8.46 16.21A5.5 5.5 0 0 1 8.46 7.79" />
      </g>
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}
