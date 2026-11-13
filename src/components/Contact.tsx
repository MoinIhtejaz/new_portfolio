import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Copy } from "lucide-react";
import { profile } from "../data/portfolio";
import { BlurIn, Reveal } from "../lib/motion";
import HeroEmblem from "./HeroEmblem";

/** The closing call to action, on the dark section. */
export default function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      // Clipboard blocked: fall back to opening the mail client.
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const links = [
    { label: "GitHub", href: profile.socials.github },
    { label: "LinkedIn", href: profile.socials.linkedin },
    { label: "Résumé", href: profile.resumeUrl },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 pb-20 pt-6 sm:pb-28">
      <div className="container-page flex flex-col items-center text-center">
        <HeroEmblem color="244,245,246" className="w-40 sm:w-52" />

        <BlurIn>
          <h2 id="contact-title" className="display mt-4 text-[clamp(3.25rem,10vw,7rem)]">
            Let's talk.
          </h2>
        </BlurIn>

        <Reveal className="flex flex-col items-center">
          <p className="mt-6 max-w-[33rem] text-[1.0938rem] leading-[1.55] text-white/65 sm:text-[1.1875rem]">
            I'm looking for software engineering and quant internships. Email is
            the quickest way to reach me.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${profile.email}`} className="btn-accent">
              Email me
              <ArrowRight size={20} strokeWidth={2.2} aria-hidden />
            </a>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-14 cursor-pointer items-center gap-2.5 rounded-[14px] border border-white/15 px-6 text-[1.0313rem] font-semibold text-white transition-[border-color,transform] duration-200 hover:border-white/40 active:scale-[0.98]"
            >
              {copied ? (
                <Check size={17} strokeWidth={2.2} aria-hidden />
              ) : (
                <Copy size={16} strokeWidth={2} aria-hidden />
              )}
              <span aria-live="polite">{copied ? "Copied" : profile.email}</span>
            </button>
          </div>

          <ul className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-2 text-[1rem] text-white/70">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 py-1.5 transition-colors duration-200 hover:text-white"
                >
                  {l.label}
                  <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
