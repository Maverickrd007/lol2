import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Power, RotateCcw, Volume2, VolumeX } from "lucide-react";
import ActionButtons from "./components/ActionButtons.jsx";
import BootScreen from "./components/BootScreen.jsx";
import Confetti from "./components/Confetti.jsx";
import ParticleBackground from "./components/ParticleBackground.jsx";
import TerminalWindow from "./components/TerminalWindow.jsx";
import { useTerminalSound } from "./hooks/useTerminalSound.js";

const terminalLines = [
  { label: "Subject has a cute smile", status: "verified", tone: "success" },
  { label: "Detected elite music taste", status: "verified", tone: "success" },
  { label: "Warning: excessive attractiveness", status: "unstable", tone: "danger" },
  {
    label: "High probability of stealing my attention",
    status: "99.7%",
    tone: "gold",
  },
  { label: "Heart firewall integrity", status: "failing", tone: "danger" },
  { label: "Conclusion", status: "major crush detected", tone: "gold" },
];

export default function App() {
  const [phase, setPhase] = useState("boot");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [eggActive, setEggActive] = useState(false);
  const { playBoot, playKey, playSuccess, unlock } = useTerminalSound(soundEnabled);

  useEffect(() => {
    let buffer = "";

    const handleKeyDown = (event) => {
      buffer = `${buffer}${event.key.toLowerCase()}`.slice(-8);
      if (buffer === "love.exe") {
        setEggActive(true);
        playSuccess();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playSuccess]);

  const reset = useCallback(() => {
    setAccepted(false);
    setEggActive(false);
    setPhase("boot");
  }, []);

  const handleAccept = useCallback(() => {
    setAccepted(true);
    playSuccess();
  }, [playSuccess]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((current) => {
      if (!current) {
        unlock();
      }
      return !current;
    });
  }, [unlock]);

  const handleBootDone = useCallback(() => {
    setPhase("scan");
    playBoot();
  }, [playBoot]);

  const handleScanDone = useCallback(() => {
    setPhase("reveal");
    playSuccess();
  }, [playSuccess]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-terminal-bg px-4 py-6 text-terminal-line sm:px-6 lg:px-8">
      <ParticleBackground />
      <div className="terminal-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="scanlines pointer-events-none absolute inset-0 opacity-20 mix-blend-screen" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 animate-scan bg-gradient-to-b from-transparent via-terminal-line/10 to-transparent" />

      <motion.div
        className="relative z-10 flex w-full max-w-5xl flex-col gap-4"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <header className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.28em] text-terminal-muted sm:text-sm">
          <div className="flex min-w-0 items-center gap-2">
            <Power className="size-4 shrink-0 text-terminal-line" aria-hidden="true" />
            <span className="truncate">Crush Scanner OS</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={soundEnabled ? "Mute terminal sounds" : "Enable terminal sounds"}
              title={soundEnabled ? "Mute terminal sounds" : "Enable terminal sounds"}
              className="grid size-9 place-items-center rounded border border-terminal-line/25 bg-terminal-panel/80 text-terminal-line shadow-glow transition hover:-translate-y-0.5 hover:border-terminal-line/60 hover:bg-terminal-line/10"
              onClick={toggleSound}
            >
              {soundEnabled ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
            </button>
            <button
              type="button"
              aria-label="Restart scan"
              title="Restart scan"
              className="grid size-9 place-items-center rounded border border-terminal-line/25 bg-terminal-panel/80 text-terminal-line shadow-glow transition hover:-translate-y-0.5 hover:border-terminal-line/60 hover:bg-terminal-line/10"
              onClick={reset}
            >
              <RotateCcw className="size-4" />
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {phase === "boot" && (
            <BootScreen
              key="boot"
              onComplete={handleBootDone}
              onTick={playKey}
            />
          )}

          {phase !== "boot" && (
            <TerminalWindow
              key="terminal"
              lines={terminalLines}
              phase={phase}
              eggActive={eggActive}
              onLineTick={playKey}
              onComplete={handleScanDone}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === "reveal" && (
            <motion.section
              className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-6 bg-terminal-bg/72 px-4 py-8 text-center backdrop-blur-sm"
              initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(12px)" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.h1
                className="glitch-shadow max-w-4xl text-balance text-4xl font-black leading-tight text-[#eafff4] sm:text-6xl lg:text-7xl"
                initial={{ scale: 0.96 }}
                animate={{ scale: [0.96, 1.02, 1] }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              >
                So... can I take you out sometime?
              </motion.h1>

              <ActionButtons onAccept={handleAccept} accepted={accepted} />
            </motion.section>
          )}
        </AnimatePresence>
      </motion.div>

      <Confetti active={accepted} />

      <AnimatePresence>
        {eggActive && (
          <motion.div
            className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded border border-terminal-danger/50 bg-terminal-panel/95 px-4 py-3 text-center text-sm text-[#ffd7e2] shadow-blush backdrop-blur sm:text-base"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
          >
            love.exe executed: vulnerability found in both hearts.
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
