import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="container-px flex flex-col items-center justify-between gap-3 py-8 sm:flex-row">
        <p className="font-mono text-xs text-slate-600">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs text-slate-600">
          Built with React · TypeScript · Tailwind
        </p>
      </div>
    </footer>
  );
}
