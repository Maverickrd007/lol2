import { AnimatePresence, motion } from "framer-motion";

const pieces = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 0.35,
  drift: Math.random() * 180 - 90,
  color: ["#1cf48c", "#ff4d7a", "#f6d66d", "#eafff4"][index % 4],
}));

export default function Confetti({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {pieces.map((piece) => (
            <motion.span
              key={piece.id}
              className="absolute top-[-20px] h-3 w-1.5 rounded-sm"
              style={{ left: piece.left, backgroundColor: piece.color }}
              initial={{ y: -40, x: 0, rotate: 0, opacity: 1 }}
              animate={{
                y: "110vh",
                x: piece.drift,
                rotate: 360 + piece.drift,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 2.8,
                delay: piece.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
