import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-ink-950/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between">
        <a
          href="#top"
          className="font-mono text-sm font-semibold tracking-tight text-white"
        >
          <span className="text-accent">{"{"}</span> MM{" "}
          <span className="text-accent">{"}"}</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-400 transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/Maheer_Ihtejaz_Moin_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-accent/40 px-4 py-1.5 text-sm font-medium text-accent transition-all hover:bg-accent/10"
          >
            Résumé
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="text-slate-300 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/[0.06] bg-ink-950/95 backdrop-blur-md md:hidden">
          <div className="container-px flex flex-col py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-slate-300 transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/Maheer_Ihtejaz_Moin_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-full border border-accent/40 px-4 py-2 text-center text-accent"
            >
              Résumé
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
