import { profile } from "../data/portfolio";
import { useLocalTime } from "../lib/useLocalTime";

/** Sits at the bottom of the dark section. */
export default function Footer() {
  const time = useLocalTime(profile.timeZone);

  return (
    <footer className="pb-9">
      <div className="container-page">
        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="tabular-nums">Sydney, {time}</p>
          <a
            href="#top"
            className="self-start text-white/70 transition-colors duration-200 hover:text-white sm:self-auto"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
