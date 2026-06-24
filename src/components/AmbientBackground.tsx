import { motion } from "framer-motion";

/**
 * Site-wide ambient backdrop: a dark base, faint engineering grid, four
 * slowly-drifting aurora light sources, a vignette to keep edges grounded,
 * and a whisper of film grain. Fades up on first paint.
 */
export default function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950"
    >
      {/* faint grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* drifting aurora — fades in on entry */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="aurora aurora-4" />
      </motion.div>

      {/* vignette keeps the corners dark and the eye centred */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,transparent_0%,rgba(7,10,18,0.55)_70%,rgba(7,10,18,0.9)_100%)]" />

      {/* film grain */}
      <div className="grain absolute inset-0 opacity-[0.05] mix-blend-overlay" />
    </div>
  );
}
