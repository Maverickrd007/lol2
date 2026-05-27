import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import GlitchText from "./GlitchText.jsx";
import LoadingBar from "./LoadingBar.jsx";
import TypewriterLine from "./TypewriterLine.jsx";

export default function TerminalWindow({
  lines,
  phase,
  eggActive,
  onLineTick,
  onComplete,
}) {
  const [visibleLines, setVisibleLines] = useState(1);
  const [finishedLines, setFinishedLines] = useState([]);

  useEffect(() => {
    if (finishedLines.length === lines.length && phase === "scan") {
      const timeout = window.setTimeout(onComplete, 900);
      return () => window.clearTimeout(timeout);
    }

    return undefined;
  }, [finishedLines.length, lines.length, onComplete, phase]);

  const securityScore = useMemo(() => {
    return Math.min(99, 21 + finishedLines.length * 13);
  }, [finishedLines.length]);

  const completeLine = (index) => {
    setFinishedLines((current) => {
      if (current.includes(index)) {
        return current;
      }
      return [...current, index];
    });
    setVisibleLines((current) => Math.min(current + 1, lines.length));
  };

  return (
    <motion.section
      className="rounded-lg border border-terminal-line/25 bg-terminal-panel/85 shadow-terminal backdrop-blur-md"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -22 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-terminal-line/15 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-terminal-danger shadow-blush" />
          <span className="size-3 rounded-full bg-terminal-gold shadow-[0_0_16px_rgba(246,214,109,0.35)]" />
          <span className="size-3 rounded-full bg-terminal-line shadow-glow" />
        </div>
        <p className="text-xs uppercase tracking-[0.24em] text-terminal-muted">
          case-file://attention_theft
        </p>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[1fr_280px] lg:p-6">
        <div className="min-h-[390px] rounded border border-terminal-line/15 bg-black/30 p-4 sm:p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <GlitchText>Target Investigation Log</GlitchText>
            <span className="rounded border border-terminal-line/25 px-2.5 py-1 text-xs uppercase tracking-[0.2em] text-terminal-muted">
              live
            </span>
          </div>

          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {lines.slice(0, visibleLines).map((line, index) => {
                const complete = finishedLines.includes(index);

                return (
                  <motion.div
                    key={line.label}
                    className="grid gap-2 border-l border-terminal-line/30 pl-4"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between sm:text-base">
                      <div className="flex min-w-0 items-start gap-2">
                        <span className="mt-0.5 text-terminal-muted">&gt;</span>
                        {complete ? (
                          <span className="text-[#eafff4]">{line.label}</span>
                        ) : (
                          <TypewriterLine
                            text={line.label}
                            speed={24}
                            onTick={onLineTick}
                            onDone={() => completeLine(index)}
                          />
                        )}
                      </div>

                      <span
                        className={[
                          "w-fit rounded px-2 py-1 text-xs uppercase tracking-[0.16em]",
                          line.tone === "danger"
                            ? "border border-terminal-danger/40 text-terminal-danger"
                            : "",
                          line.tone === "gold"
                            ? "border border-terminal-gold/40 text-terminal-gold"
                            : "",
                          line.tone === "success"
                            ? "border border-terminal-line/35 text-terminal-line"
                            : "",
                        ].join(" ")}
                      >
                        {line.status}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <aside className="rounded border border-terminal-line/15 bg-black/25 p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.24em] text-terminal-muted">scan telemetry</p>
          <div className="space-y-5">
            <Metric label="Attention capture" value={`${securityScore}%`} />
            <LoadingBar active={phase === "scan"} complete={phase === "reveal"} />
            <Metric label="Smile hazard" value="critical" accent="danger" />
            <Metric label="Date request confidence" value={phase === "reveal" ? "unlocked" : "pending"} />
          </div>

          <motion.div
            className="mt-6 rounded border border-terminal-danger/25 bg-terminal-danger/5 p-3 text-xs leading-relaxed text-[#ffd7e2]"
            animate={eggActive ? { borderColor: "rgba(255, 77, 122, 0.8)" } : {}}
          >
            Hint packet: try typing <span className="text-terminal-danger">love.exe</span>
          </motion.div>
        </aside>
      </div>
    </motion.section>
  );
}

function Metric({ label, value, accent = "line" }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.18em] text-terminal-muted">
        <span>{label}</span>
        <span className={accent === "danger" ? "text-terminal-danger" : "text-terminal-line"}>
          {value}
        </span>
      </div>
    </div>
  );
}
