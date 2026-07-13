import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../data/portfolio";

// Original ctOS-style boot, recreated from the reference footage:
//   0.0s  darkness, sparse dust
//   0.2s  particles burst radially from centre, leaving motion trails
//   0.4s  a grayscale "circuit city" of component blocks flickers in
//   0.5s  teal wireframe webs draw between nodes
//   0.95s the burst is captured into three counter-rotating rings
//   1.6s  the core ignites: a dense glowing iris with a sweeping crescent
//   1.6s  the name resolves over the emblem
//   3.3s  hand-off to the site
// Pure canvas + trail rendering. No third-party footage.

const TOTAL_MS = 1650;
const NAME_DELAY = 0.75;

const easeOut = (p: number) => 1 - Math.pow(1 - Math.min(Math.max(p, 0), 1), 3);
const rand = (a: number, b: number) => a + Math.random() * (b - a);

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  born: number;
  ring: number; // target orbit radius as a fraction of minDim
  dir: 1 | -1; // orbit direction
  size: number;
  twinkle: number;
  phase: number;
  core: boolean;
};

type BlockCluster = {
  x: number;
  y: number;
  reveal: number;
  flicker: number;
  phase: number;
  alpha: number;
  rects: { dx: number; dy: number; w: number; h: number; a: number }[];
};

type Web = {
  nodes: { x: number; y: number }[];
  edges: [number, number][];
  start: number;
};

export default function CtosIntro({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    onDone();
  };

  // Lock scroll while the intro is up.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Silent skip + timed exit.
  useEffect(() => {
    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    const t = window.setTimeout(finish, reduce ? 900 : TOTAL_MS);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#040508";
      ctx.fillRect(0, 0, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    // --- Particles: born at the centre, thrown outward, then captured ----
    const particles: Particle[] = Array.from({ length: 340 }, (_, i) => {
      const a = rand(0, Math.PI * 2);
      const core = i < 90;
      return {
        x: 0,
        y: 0,
        vx: Math.cos(a),
        vy: Math.sin(a),
        born: core ? rand(0.1, 0.3) : rand(0.06, 0.28),
        ring: core ? 0.045 : [0.1, 0.15, 0.205][(Math.random() * 3) | 0],
        dir: Math.random() > 0.5 ? 1 : -1,
        size: rand(0.8, core ? 1.8 : 2.4),
        twinkle: rand(2, 8),
        phase: rand(0, Math.PI * 2),
        core,
      };
    });
    let spawned = false;

    // --- Circuit city: clusters of component-like rects ------------------
    const clusters: BlockCluster[] = Array.from({ length: 44 }, () => {
      const rects = Array.from({ length: (rand(6, 14) | 0) }, () => ({
        dx: rand(-70, 70),
        dy: rand(-45, 45),
        w: rand(3, 26),
        h: rand(2, 14),
        a: rand(0.05, 0.32),
      }));
      return {
        x: rand(0.03, 0.97),
        y: rand(0.05, 0.95),
        reveal: rand(0.12, 0.6),
        flicker: rand(0.8, 3),
        phase: rand(0, Math.PI * 2),
        alpha: rand(0.5, 1),
        rects,
      };
    });

    // --- Teal wireframe webs ---------------------------------------------
    const webs: Web[] = Array.from({ length: 4 }, (_, i) => {
      const cx = rand(0.18, 0.82);
      const cy = rand(0.2, 0.8);
      const nodes = Array.from({ length: (rand(5, 9) | 0) }, () => ({
        x: cx + rand(-0.09, 0.09),
        y: cy + rand(-0.12, 0.12),
      }));
      const edges: [number, number][] = [];
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          if (Math.random() < 0.42) edges.push([a, b]);
        }
      }
      return { nodes, edges, start: 0.2 + i * 0.1 };
    });

    const t0 = performance.now();
    let last = t0;
    let raf = 0;

    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const minDim = Math.min(w, h);
      const cx = w / 2;
      const cy = h / 2;

      // Trail rendering: fade the previous frame instead of clearing it.
      ctx.fillStyle = "rgba(4,5,8,0.30)";
      ctx.fillRect(0, 0, w, h);

      // 1 — circuit city (kept clear of the emblem zone)
      for (const c of clusters) {
        if (t < c.reveal) continue;
        const bx = c.x * w;
        const by = c.y * h;
        const d = Math.hypot(bx - cx, by - cy);
        if (d < minDim * 0.2) continue;
        const flick = 0.75 + 0.25 * Math.sin(t * c.flicker * 2 + c.phase);
        const born = easeOut((t - c.reveal) / 0.35);
        for (const r of c.rects) {
          ctx.fillStyle = `rgba(215,225,235,${r.a * c.alpha * flick * born})`;
          ctx.fillRect(bx + r.dx, by + r.dy, r.w, r.h);
        }
      }

      // 2 — teal webs, drawn edge by edge
      for (const web of webs) {
        const prog = easeOut((t - web.start) / 0.7);
        if (prog <= 0) continue;
        const shown = Math.ceil(web.edges.length * prog);
        ctx.strokeStyle = "rgba(45,212,191,0.4)";
        ctx.lineWidth = 0.8;
        for (let e = 0; e < shown; e++) {
          const [a, b] = web.edges[e];
          ctx.beginPath();
          ctx.moveTo(web.nodes[a].x * w, web.nodes[a].y * h);
          ctx.lineTo(web.nodes[b].x * w, web.nodes[b].y * h);
          ctx.stroke();
        }
        ctx.fillStyle = "rgba(94,234,212,0.85)";
        for (const n of web.nodes.slice(0, Math.ceil(web.nodes.length * prog))) {
          ctx.fillRect(n.x * w - 1, n.y * h - 1, 2, 2);
        }
      }

      // 3 — the particle storm
      if (!spawned) {
        spawned = true;
        for (const p of particles) {
          p.x = cx + rand(-6, 6);
          p.y = cy + rand(-6, 6);
          const speed = rand(0.35, 0.85) * minDim;
          p.vx *= speed;
          p.vy *= speed;
        }
      }

      for (const p of particles) {
        if (t < p.born) continue;

        // Capture phase: steer the burst onto an orbit.
        const capture = p.core ? 0.65 : 0.42;
        if (t > capture) {
          const dx = p.x - cx;
          const dy = p.y - cy;
          const r = Math.hypot(dx, dy) || 1;
          const R = p.ring * minDim;
          // Desired velocity: orbit tangent + spring toward the target ring.
          const orbit = (p.core ? 0.5 : 0.32) * minDim * p.dir;
          const dvx = (-dy / r) * orbit + (dx / r) * (R - r) * 2.2;
          const dvy = (dx / r) * orbit + (dy / r) * (R - r) * 2.2;
          const s = p.core ? 0.14 : 0.075;
          p.vx += (dvx - p.vx) * s;
          p.vy += (dvy - p.vy) * s;
        } else {
          // Burst phase: decelerating outward flight.
          p.vx *= 0.965;
          p.vy *= 0.965;
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const tw = 0.5 + 0.5 * Math.sin(t * p.twinkle + p.phase);
        if (p.core && t > 0.72) {
          ctx.shadowColor = "rgba(255,255,255,0.9)";
          ctx.shadowBlur = 7;
          ctx.fillStyle = `rgba(255,255,255,${0.75 + 0.25 * tw})`;
        } else {
          ctx.fillStyle = `rgba(235,242,250,${0.35 + 0.55 * tw})`;
        }
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.shadowBlur = 0;
      }

      // 4 — the crescent sweep that reads as the emblem igniting
      const ignite = easeOut((t - 0.8) / 0.4);
      if (ignite > 0) {
        const rot = t * 1.4;
        ctx.lineCap = "round";
        for (const [radius, width, sweep, off] of [
          [0.062, 4, 1.7, 0],
          [0.085, 2.5, 1.1, 2.4],
        ] as const) {
          ctx.strokeStyle = `rgba(255,255,255,${0.85 * ignite})`;
          ctx.shadowColor = "rgba(160,255,240,0.8)";
          ctx.shadowBlur = 16 * ignite;
          ctx.lineWidth = width;
          ctx.beginPath();
          ctx.arc(cx, cy, radius * minDim, rot + off, rot + off + sweep);
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {!reduce && (
        <motion.div
          initial={{ scale: 1.07 }}
          animate={{ scale: 1 }}
          transition={{ duration: TOTAL_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        </motion.div>
      )}

      {/* Vignette keeps the frame composed and the edges black */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.5)_75%,rgba(0,0,0,0.9)_100%)]" />

      {/* Name resolves as the emblem ignites */}
      <motion.h1
        initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: reduce ? 0.1 : NAME_DELAY,
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative px-6 text-center font-display text-3xl font-bold tracking-tight text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.9),0_0_40px_rgba(45,212,191,0.3)] sm:text-5xl"
      >
        {profile.name}
      </motion.h1>
    </motion.div>
  );
}
