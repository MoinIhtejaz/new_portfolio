import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

/* ----------------------------------------------------------------------------
   One motion signature for the whole site: an ease-out with no overshoot,
   opacity and transform only, plus a blur-to-focus for headlines.
---------------------------------------------------------------------------- */
export const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  y?: number;
};

/** Fades content up a few pixels the first time it scrolls into view. */
export function Reveal({ children, delay = 0, y = 16, ...rest }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -64px 0px" }}
      transition={{ duration: reduce ? 0.25 : 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Headlines arrive out of focus and sharpen as they come into view. */
export function BlurIn({ children, delay = 0, ...rest }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={
        reduce ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(14px)" }
      }
      whileInView={
        reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: reduce ? 0.25 : 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export { motion };
