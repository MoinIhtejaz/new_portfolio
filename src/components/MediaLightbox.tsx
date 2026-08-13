import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Maximize2, X } from "lucide-react";

type Props = {
  /** Thumbnail shown inline. For a still, this is also the full-size image. */
  poster: string;
  label: string;
  /** Video source. Omit to show `poster` as a still image instead. */
  src?: string;
  /** Optional line under the expanded media, e.g. what window it covers. */
  caption?: string;
};

// One shared motion signature so the open and close feel like the same object
// moving, not two separate animations.
const SPRING = { type: "spring" as const, stiffness: 280, damping: 32, mass: 0.9 };

/**
 * A compact "screen recording" window that morphs open into a centred player.
 * The same element expands and collapses (shared layout), so the modal reads as
 * the thumbnail growing rather than a new panel appearing. Clicking the blurred
 * backdrop minimises it back to its original spot and size.
 *
 * Pass `src` for a recording; omit it and the poster is presented as a still
 * (used for result charts and screenshots).
 */
export default function MediaLightbox({ poster, label, src, caption }: Props) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const uid = useId();
  const frameId = `lightbox-frame-${uid}`;
  const isVideo = Boolean(src);

  // Esc to close, and lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const chromeDots = (
    <>
      <span className="h-2 w-2 rounded-full bg-red-400/70" />
      <span className="h-2 w-2 rounded-full bg-amber-400/70" />
      <span className="h-2 w-2 rounded-full bg-green-400/70" />
    </>
  );

  return (
    <>
      {/* Compact inline window. Hidden while open so the morphing copy in the
          portal is the only one on screen. */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        layoutId={reduce ? undefined : frameId}
        transition={SPRING}
        whileHover={reduce ? undefined : { y: -3 }}
        whileTap={reduce ? undefined : { scale: 0.985 }}
        aria-label={
          isVideo ? `Play recording: ${label}` : `View full size: ${label}`
        }
        style={{ visibility: open && !reduce ? "hidden" : "visible" }}
        className="group relative w-full cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-ink-950/80 text-left shadow-lg shadow-black/40 transition-colors duration-300 hover:border-accent/40"
      >
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] px-3 py-2">
          {chromeDots}
          <span className="ml-1.5 truncate font-mono text-[10px] text-slate-500">
            {label}
          </span>
        </div>

        <div className="relative">
          <img src={poster} alt={`${label} preview`} className="w-full" loading="lazy" />
          <div className="pointer-events-none absolute inset-0 bg-ink-950/30 transition-opacity duration-300 group-hover:opacity-0" />
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 font-mono text-[10px] text-slate-100 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <Maximize2 size={11} />
              {isVideo ? "watch it run" : "view full size"}
            </span>
          </span>
        </div>
      </motion.button>

      {/* Portalled to <body>: escapes ancestors with transform/filter, which
          would otherwise become the containing block for position: fixed. */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={label}
              className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
            >
              {/* Blurred scrim over the rest of the site */}
              <motion.div
                className="absolute inset-0 bg-ink-950/75 backdrop-blur-xl"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.22 } }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />

              <motion.div
                layoutId={reduce ? undefined : frameId}
                transition={SPRING}
                initial={reduce ? { opacity: 0 } : undefined}
                animate={reduce ? { opacity: 1 } : undefined}
                exit={reduce ? { opacity: 0 } : undefined}
                className={`relative z-10 flex max-h-full w-full flex-col overflow-hidden rounded-lg border border-white/10 bg-ink-950 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85),0_0_70px_-25px_rgba(45,212,191,0.3)] ${
                  isVideo ? "max-w-3xl" : "max-w-6xl"
                }`}
              >
                <div className="flex shrink-0 items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    {chromeDots}
                    <span className="ml-1.5 font-mono text-[10px] text-slate-500">
                      {label}
                    </span>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-slate-400 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>

                {isVideo ? (
                  <video
                    src={src}
                    poster={poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    className="min-h-0 w-full object-contain"
                  />
                ) : (
                  <img
                    src={poster}
                    alt={label}
                    className="min-h-0 w-full object-contain"
                  />
                )}

                {caption && (
                  <p className="shrink-0 border-t border-white/[0.06] bg-white/[0.02] px-3 py-2 font-mono text-[10px] leading-relaxed text-slate-500">
                    {caption}
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
