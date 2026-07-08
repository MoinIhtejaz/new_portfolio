import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="container-px flex items-center justify-center py-8">
        <p className="font-mono text-xs text-slate-600">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
