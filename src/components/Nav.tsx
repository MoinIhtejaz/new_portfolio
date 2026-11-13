import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { profile } from "../data/portfolio";
import EmblemMark from "./EmblemMark";
import ThemeToggle from "./ThemeToggle";

const links = [
  { id: "experience", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

/**
 * A full-width bar at the top of the page that tightens into a floating
 * capsule once the page scrolls.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (window.scrollY < 300) setActive(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mark the section currently crossing the middle of the viewport.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:pt-4">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto mx-auto flex h-[3.75rem] items-center justify-between rounded-full border transition-[max-width,background-color,border-color,box-shadow,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "max-w-[44rem] border-rule bg-card/80 pl-5 pr-2 shadow-capsule backdrop-blur-xl backdrop-saturate-150"
            : "max-w-[1180px] border-transparent bg-transparent pl-2 pr-0 sm:pl-5 sm:pr-3"
        }`}
      >
        <a
          href="#top"
          className="flex items-center gap-2 text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink"
        >
          <EmblemMark className="h-6 w-6" />
          {profile.shortName}
        </a>

        <div className="hidden items-center gap-0.5 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={active === l.id ? "true" : undefined}
              className={`rounded-full px-3 py-1.5 text-[0.9063rem] font-medium transition-colors duration-200 hover:text-ink ${
                active === l.id ? "text-ink" : "text-muted"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-pill"
          >
            Résumé
            <span className="badge" aria-hidden>
              <ArrowRight size={15} strokeWidth={2.2} />
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}
