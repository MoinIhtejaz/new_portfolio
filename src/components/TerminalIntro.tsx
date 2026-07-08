import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const CMD_1 = "cd MoinIhtejaz/Downloads";
const CMD_2 = "cat portfolio";
const LAUNCH_LINE = "launching portfolio …";

function Prompt({ path }: { path: string }) {
  return (
    <>
      <span className="text-accent">➜</span>{" "}
      <span className="text-sky-300">{path}</span>{" "}
    </>
  );
}

function Cursor() {
  return (
    <span className="cursor-blink ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[3px] bg-accent" />
  );
}

export default function TerminalIntro({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [typed1, setTyped1] = useState("");
  const [typed2, setTyped2] = useState("");
  const [stage, setStage] = useState<"cmd1" | "cmd2" | "launch">("cmd1");
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

  // Silent skip on any interaction.
  useEffect(() => {
    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The typing timeline.
  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) =>
      new Promise<void>((r) => setTimeout(r, ms));

    (async () => {
      if (reduce) {
        // No typing theatrics: show the finished state briefly, then enter.
        setTyped1(CMD_1);
        setTyped2(CMD_2);
        setStage("launch");
        await sleep(600);
        if (!cancelled) finish();
        return;
      }

      await sleep(200);
      for (let i = 1; i <= CMD_1.length; i++) {
        if (cancelled) return;
        setTyped1(CMD_1.slice(0, i));
        await sleep(13 + Math.random() * 9);
      }
      await sleep(140);
      if (cancelled) return;
      setStage("cmd2");

      await sleep(100);
      for (let i = 1; i <= CMD_2.length; i++) {
        if (cancelled) return;
        setTyped2(CMD_2.slice(0, i));
        await sleep(15 + Math.random() * 9);
      }
      await sleep(150);
      if (cancelled) return;
      setStage("launch");

      await sleep(750);
      if (!cancelled) finish();
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950 px-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* backdrop */}
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(7,10,18,0.9)_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-[120px]" />

      {/* terminal window */}
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 1.03 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-[#0c1018]/95 shadow-[0_24px_80px_-16px_rgba(0,0,0,0.8),0_0_60px_-24px_rgba(45,212,191,0.35)] backdrop-blur-md"
      >
        {/* title bar */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-slate-500">
            maheer@moin: ~/Downloads
          </span>
        </div>

        {/* body */}
        <div className="h-[180px] p-5 font-mono text-[13px] leading-7 text-slate-200 sm:h-[200px] sm:text-sm">
          {/* line 1 */}
          <div>
            <Prompt path="~" />
            <span>{typed1}</span>
            {stage === "cmd1" && <Cursor />}
          </div>

          {/* line 2 */}
          {stage !== "cmd1" && (
            <div>
              <Prompt path="~/MoinIhtejaz/Downloads" />
              <span>{typed2}</span>
              {stage === "cmd2" && <Cursor />}
            </div>
          )}

          {/* launch line */}
          {stage === "launch" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-3 text-accent"
            >
              {LAUNCH_LINE}
              <Cursor />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
