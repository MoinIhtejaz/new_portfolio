import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// The emblem the entry splash resolves into, kept alive on the page: three
// counter-rotating rings of particles around a dense core, with two sweeping
// arcs. It leans a little toward the pointer. Colours come from the theme
// tokens, so it follows light and dark.

type Particle = {
  angle: number;
  radius: number; // fraction of the canvas size
  speed: number; // radians per second, signed
  size: number;
  twinkle: number;
  phase: number;
  core: boolean;
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const RINGS = [0.2, 0.3, 0.41];

type Props = {
  className?: string;
  /** Fixed particle colour as "r,g,b". Omit to follow the theme's ink. */
  color?: string;
};

export default function HeroEmblem({ className = "", color }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let size = 0;
    const resize = () => {
      size = canvas.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Theme colours, re-read whenever <html data-theme> changes.
    let ink = "38,37,33";
    let accent = "13,122,104";
    const readColours = () => {
      const styles = getComputedStyle(document.documentElement);
      const read = (name: string, fallback: string) =>
        styles.getPropertyValue(name).trim().split(/\s+/).join(",") || fallback;
      ink = color ?? read("--ink", ink);
      accent = read("--accent", accent);
    };
    readColours();
    const themeObserver = new MutationObserver(readColours);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const particles: Particle[] = Array.from({ length: 300 }, (_, i) => {
      const core = i < 70;
      const ring = i % 3;
      return {
        angle: rand(0, Math.PI * 2),
        radius: core ? rand(0.005, 0.085) : RINGS[ring] + rand(-0.013, 0.013),
        speed: core
          ? rand(-1.5, 1.5)
          : (ring === 1 ? -1 : 1) * rand(0.16, 0.4),
        size: rand(1, core ? 1.8 : 2.4),
        twinkle: rand(1.5, 6),
        phase: rand(0, Math.PI * 2),
        core,
      };
    });

    // The emblem drifts a few pixels toward the pointer.
    let targetX = 0;
    let targetY = 0;
    let offsetX = 0;
    let offsetY = 0;
    const onPointerMove = (e: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      targetX = ((e.clientX - (box.left + box.width / 2)) / window.innerWidth) * 26;
      targetY = ((e.clientY - (box.top + box.height / 2)) / window.innerHeight) * 26;
    };
    if (!reduce) window.addEventListener("pointermove", onPointerMove, { passive: true });

    let t = 0;
    const draw = (dt: number, trails: boolean) => {
      t += dt;
      offsetX += (targetX - offsetX) * 0.06;
      offsetY += (targetY - offsetY) * 0.06;

      if (trails) {
        // Fade the previous frame toward transparent so motion leaves a trail.
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0,0,0,0.26)";
        ctx.fillRect(0, 0, size, size);
        ctx.globalCompositeOperation = "source-over";
      } else {
        ctx.clearRect(0, 0, size, size);
      }

      const scale = Math.max(size / 320, 0.6);
      const cx = size / 2 + offsetX;
      const cy = size / 2 + offsetY;

      for (const p of particles) {
        p.angle += p.speed * dt;
        const r = p.radius * size;
        const tw = 0.5 + 0.5 * Math.sin(t * p.twinkle + p.phase);
        const alpha = p.core ? 0.5 + 0.5 * tw : 0.22 + 0.55 * tw;
        const s = Math.max(p.size * scale, 1);
        ctx.fillStyle = `rgba(${ink},${alpha})`;
        ctx.fillRect(cx + Math.cos(p.angle) * r, cy + Math.sin(p.angle) * r, s, s);
      }

      ctx.lineCap = "round";
      const rotation = t * 0.9;
      for (const [radius, width, sweep, offset] of [
        [0.125, 3.6, 1.7, 0],
        [0.165, 2.3, 1.1, 2.4],
      ] as const) {
        ctx.strokeStyle = `rgba(${accent},0.95)`;
        ctx.lineWidth = Math.max(width * scale, 1.5);
        ctx.beginPath();
        ctx.arc(cx, cy, radius * size, rotation + offset, rotation + offset + sweep);
        ctx.stroke();
      }
    };

    if (reduce) {
      // One still frame, redrawn if the theme or size changes.
      const still = () => draw(0, false);
      still();
      const stillTheme = new MutationObserver(still);
      stillTheme.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
      const stillResize = new ResizeObserver(still);
      stillResize.observe(canvas);
      return () => {
        stillTheme.disconnect();
        stillResize.disconnect();
        themeObserver.disconnect();
        resizeObserver.disconnect();
      };
    }

    // Animate only while the emblem is on screen.
    let raf = 0;
    let last = performance.now();
    let visible = true;
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      draw(dt, true);
      if (visible) raf = requestAnimationFrame(frame);
    };
    const viewObserver = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    viewObserver.observe(canvas);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      viewObserver.disconnect();
      themeObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [reduce, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`aspect-square ${className}`}
    />
  );
}
