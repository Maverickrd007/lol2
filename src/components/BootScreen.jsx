import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingBar from "./LoadingBar.jsx";
import TypewriterLine from "./TypewriterLine.jsx";

const bootSteps = [
  "Initializing system...",
  "Accessing database...",
  "Scanning target...",
];

export default function BootScreen({ onComplete, onTick }) {
  const [activeStep, setActiveStep] = useState(0);
  const [doneSteps, setDoneSteps] = useState([]);

  useEffect(() => {
    if (doneSteps.length === bootSteps.length) {
      const timeout = window.setTimeout(onComplete, 650);
      return () => window.clearTimeout(timeout);
    }

    return undefined;
  }, [doneSteps.length, onComplete]);

  const completeStep = () => {
    setDoneSteps((current) => {
      if (current.includes(activeStep)) {
        return current;
      }
      return [...current, activeStep];
    });
    setActiveStep((current) => Math.min(current + 1, bootSteps.length));
  };

  return (
    <motion.section
      className="min-h-[560px] rounded-lg border border-terminal-line/25 bg-terminal-panel/80 p-4 shadow-terminal backdrop-blur-md sm:p-6 lg:p-8"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -22 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mb-6 flex items-center justify-between border-b border-terminal-line/15 pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-terminal-muted">secure terminal</p>
          <h2 className="mt-2 text-xl font-bold text-[#eafff4] sm:text-2xl">Boot Sequence</h2>
        </div>
        <div className="hidden rounded border border-terminal-line/30 px-3 py-1 text-xs uppercase tracking-[0.24em] text-terminal-line sm:block">
          armed
        </div>
      </div>

      <div className="space-y-6">
        <AnimatePresence initial={false}>
          {bootSteps.map((step, index) => {
            const visible = index <= activeStep;
            const complete = doneSteps.includes(index);

            return visible ? (
              <motion.div
                key={step}
                className="rounded border border-terminal-line/15 bg-black/20 p-4"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-3 flex items-center gap-3 text-sm sm:text-base">
                  <span className="text-terminal-muted">[{String(index + 1).padStart(2, "0")}]</span>
                  {complete ? (
                    <span>{step}</span>
                  ) : (
                    <TypewriterLine text={step} speed={34} onDone={completeStep} onTick={onTick} />
                  )}
                </div>
                <LoadingBar active={!complete} complete={complete} />
              </motion.div>
            ) : null;
          })}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
