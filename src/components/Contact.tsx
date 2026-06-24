import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { profile } from "../data/portfolio";
import { Reveal } from "../lib/motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="container-px scroll-mt-20 py-24 sm:py-32"
    >
      <Reveal className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/60 px-6 py-16 text-center sm:px-12">
        <div className="grid-bg absolute inset-0 -z-10 opacity-50" />
        <div className="absolute left-1/2 top-0 -z-10 h-64 w-96 -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

        <div className="section-label mb-4">// get_in_touch</div>
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Let's build something that{" "}
          <span className="text-gradient">moves markets.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400">
          I'm actively looking for quantitative and software engineering
          internships. Whether it's trading research, infrastructure, or data —
          I'd love to talk.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink-950 transition-all hover:bg-accent-soft"
          >
            <Mail size={16} />
            {profile.email}
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-slate-200 transition-all hover:border-accent/40 hover:text-accent"
          >
            <Github size={16} /> GitHub <ArrowUpRight size={14} />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-slate-200 transition-all hover:border-accent/40 hover:text-accent"
          >
            <Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
