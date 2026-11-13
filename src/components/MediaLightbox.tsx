import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Maximize2, Play, X } from "lucide-react";

type Props = {
  /** Thumbnail shown inline. For a still, this is also the full-size image. */
  poster: string;
  /** Optional short label shown before the caption, e.g. "Demo". */
  label?: string;
  /** What the figure shows. Used as the caption and the accessible name. */
  caption: string;
  /** Video source. Omit to show `poster` as a still image instead. */
  src?: string;
  /** Seconds into the video to start (and loop back to). Defaults to 0. */
  startTime?: number;
  /** A tall still (a certificate, say): the viewer opens narrower. */
  portrait?: boolean;
  /** Leave the caption off under the thumbnail; the viewer still shows it. */
  hideCaption?: boolean;
};

// Critically damped: the figure was opened with a click, not thrown, so it
// should settle without overshoot.
const SPRING = { type: "spring" as const, bounce: 0, duration: 0.5 };

/**
 * A captioned figure that grows into a centred viewer when clicked. The
 * expanded panel starts from the thumbnail's own box (a manual FLIP), so it
 * reads as the same object enlarging rather than a new window appearing, and
 * it returns to that spot when dismissed.
 */
export default function MediaLightbox({
  poster,
  label,
  caption,
  src,
  startTime = 0,
  portrait = false,
  hideCaption = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const isVideo = Boolean(src);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [flip, setFlip] = useState<{
    x: number;
    y: number;
    scale: number;
  } | null>(null);

  // The panel always lands dead centre of the viewport, so its resting box is
  // known without measuring it. Computing the offset at click time keeps this
  // a plain initial -> animate transition with nothing to race.
  const openLightbox = () => {
    const b = buttonRef.current?.getBoundingClientRect();
    if (b && !reduce) {
      const pad = window.innerWidth >= 640 ? 32 : 16;
      const maxW = portrait ? 544 : isVideo ? 896 : 1152; // 34rem / max-w-4xl / max-w-6xl
      const finalW = Math.min(window.innerWidth - pad * 2, maxW);
      setFlip({
        x: b.left + b.width / 2 - window.innerWidth / 2,
        y: b.top + b.height / 2 - window.innerHeight / 2,
        scale: finalW > 0 ? b.width / finalW : 1,
      });
    } else {
      setFlip(null);
    }
    setOpen(true);
  };

  // Esc to close, lock page scroll, and hand focus to the close button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const trigger = buttonRef.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <figure>
      <button
        ref={buttonRef}
        type="button"
        onClick={openLightbox}
        aria-label={`${isVideo ? "Play recording" : "View full size"}: ${caption}`}
        style={{ visibility: open && !reduce ? "hidden" : "visible" }}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-rule bg-card transition-[border-color,transform,box-shadow] duration-300 hover:border-ink/25 hover:shadow-lift active:scale-[0.99]"
      >
        {/* Not lazy-loaded: the frame has no reserved height, so a poster
            that has not loaded yet would collapse it. */}
        <img
          src={poster}
          alt=""
          decoding="async"
          className="block w-full transition-transform duration-500 ease-out group-hover:scale-[1.025]"
        />
        <span className="pointer-events-none absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full bg-black/75 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {isVideo ? (
            <Play size={10} fill="currentColor" strokeWidth={0} aria-hidden />
          ) : (
            <Maximize2 size={11} strokeWidth={2} aria-hidden />
          )}
          {isVideo ? "Play recording" : "Enlarge"}
        </span>
      </button>

      {!hideCaption && (
        <figcaption className="mt-2.5 text-[0.8125rem] leading-snug text-faint">
          {label && <span className="mr-1.5 font-medium text-muted">{label}</span>}
          {caption}
        </figcaption>
      )}

      {/* Portalled to <body>: escapes ancestors with a transform, which would
          otherwise become the containing block for position: fixed. */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={caption}
              className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
            >
              {/* Dimming scrim: this is a modal task, so the page steps back. */}
              <motion.div
                className="absolute inset-0 cursor-zoom-out bg-black/70 backdrop-blur-md"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />

              <motion.div
                initial={reduce || !flip ? { opacity: 0 } : { ...flip, opacity: 1 }}
                animate={{
                  x: 0,
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  transition: reduce ? { duration: 0.2 } : SPRING,
                }}
                exit={
                  reduce || !flip
                    ? { opacity: 0, transition: { duration: 0.2 } }
                    : {
                        ...flip,
                        opacity: 0,
                        transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
                      }
                }
                className={`relative z-10 flex max-h-full w-full flex-col overflow-hidden rounded-2xl bg-card shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] ${
                  portrait ? "max-w-[34rem]" : isVideo ? "max-w-4xl" : "max-w-6xl"
                }`}
              >
                {isVideo ? (
                  <video
                    src={src}
                    poster={poster}
                    autoPlay
                    muted
                    // Native looping restarts at 0, so a trimmed start loops
                    // manually via onEnded instead.
                    loop={startTime === 0}
                    playsInline
                    controls
                    onLoadedMetadata={(e) => {
                      if (startTime > 0) e.currentTarget.currentTime = startTime;
                    }}
                    // autoPlay alone can be refused once the element is
                    // re-parented; ask again when there is data to show.
                    onLoadedData={(e) => {
                      void e.currentTarget.play().catch(() => {});
                    }}
                    onEnded={(e) => {
                      if (startTime === 0) return;
                      e.currentTarget.currentTime = startTime;
                      void e.currentTarget.play();
                    }}
                    className="min-h-0 w-full bg-black object-contain"
                  />
                ) : (
                  <img
                    src={poster}
                    alt={caption}
                    className="min-h-0 w-full bg-white object-contain"
                  />
                )}

                <p className="shrink-0 border-t border-rule px-4 py-3 text-[0.8125rem] leading-snug text-muted">
                  {label && <span className="mr-1.5 font-medium text-ink">{label}</span>}
                  {caption}
                </p>
              </motion.div>

              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-3 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20 focus-visible:outline-white sm:right-5 sm:top-5"
              >
                <X size={18} strokeWidth={1.8} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </figure>
  );
}
