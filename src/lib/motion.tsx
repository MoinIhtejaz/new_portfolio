import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
  type HTMLMotionProps,
} from "framer-motion";
import type { ReactNode } from "react";

/* ----------------------------------------------------------------------------
   Easing & shared variants
   ease-out cubic for entrances (per UX guidelines: enter = ease-out)
---------------------------------------------------------------------------- */
const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

export const fadeUpReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};

export const container = (stagger = 0.1, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/* ----------------------------------------------------------------------------
   <Reveal>: fade-up on scroll into view (fires once)
---------------------------------------------------------------------------- */
type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  y?: number;
};

export function Reveal({ children, delay = 0, y = 32, ...rest }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      variants={
        reduce
          ? fadeUpReduced
          : {
              hidden: { opacity: 0, y, filter: "blur(6px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.7, ease: EASE, delay },
              },
            }
      }
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------------------------------------
   <Stagger> / <StaggerItem>: children animate in sequence on scroll
---------------------------------------------------------------------------- */
type StaggerProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  stagger?: number;
  delay?: number;
};

export function Stagger({
  children,
  stagger = 0.1,
  delay = 0,
  ...rest
}: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      variants={container(stagger, delay)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  y = 28,
  ...rest
}: HTMLMotionProps<"div"> & { children: ReactNode; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={
        reduce
          ? fadeUpReduced
          : {
              hidden: { opacity: 0, y, filter: "blur(6px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.6, ease: EASE },
              },
            }
      }
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------------------------------------
   <ScrollProgress>: thin gradient bar tracking page scroll
---------------------------------------------------------------------------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent-soft via-accent to-signal"
    />
  );
}

export { motion };
