import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ActionButtons({ onAccept, accepted }) {
  const [yesScale, setYesScale] = useState(1);
  const noX = useMotionValue(0);
  const noY = useMotionValue(0);
  const rotate = useTransform(noX, [-150, 150], [-9, 9]);
  const buttonAreaRef = useRef(null);

  useEffect(() => {
    if (accepted) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setYesScale((current) => Math.min(current + 0.035, 1.42));
    }, 1200);

    return () => window.clearInterval(interval);
  }, [accepted]);

  const dodge = () => {
    const area = buttonAreaRef.current?.getBoundingClientRect();
    const horizontalLimit = Math.min(160, (area?.width ?? 360) / 2 - 64);
    const verticalLimit = 58;
    const xDirection = Math.random() > 0.5 ? 1 : -1;
    const yDirection = Math.random() > 0.5 ? 1 : -1;

    noX.set(xDirection * (70 + Math.random() * horizontalLimit));
    noY.set(yDirection * (18 + Math.random() * verticalLimit));
  };

  return (
    <div ref={buttonAreaRef} className="relative flex min-h-[128px] w-full max-w-lg items-center justify-center gap-4 px-2 sm:gap-6">
      <motion.button
        type="button"
        onClick={onAccept}
        className="rounded border border-terminal-line/60 bg-terminal-line px-7 py-3 text-base font-black uppercase tracking-[0.16em] text-[#03100a] shadow-glow transition hover:-translate-y-1 hover:bg-[#eafff4] focus:outline-none focus:ring-2 focus:ring-terminal-line focus:ring-offset-2 focus:ring-offset-terminal-bg sm:px-9"
        animate={{
          scale: accepted ? [yesScale, 1.5, 1.22] : yesScale,
          boxShadow: accepted
            ? "0 0 44px rgba(28, 244, 140, 0.62)"
            : "0 0 22px rgba(28, 244, 140, 0.36)",
        }}
        transition={{ type: "spring", stiffness: 210, damping: 15 }}
      >
        {accepted ? "Date secured" : "Yes :)"}
      </motion.button>

      <motion.button
        type="button"
        onMouseEnter={dodge}
        onFocus={dodge}
        onPointerDown={dodge}
        style={{ x: noX, y: noY, rotate }}
        className="rounded border border-terminal-danger/55 bg-terminal-danger/10 px-7 py-3 text-base font-bold uppercase tracking-[0.16em] text-[#ffd7e2] shadow-blush transition hover:border-terminal-danger hover:bg-terminal-danger/20 focus:outline-none focus:ring-2 focus:ring-terminal-danger focus:ring-offset-2 focus:ring-offset-terminal-bg sm:px-9"
        whileTap={{ scale: 0.95 }}
      >
        No
      </motion.button>
    </div>
  );
}
