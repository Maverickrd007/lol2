import { motion } from "framer-motion";

export default function LoadingBar({ active, complete }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-terminal-line/10">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-terminal-line via-[#eafff4] to-terminal-gold shadow-glow"
        initial={{ width: "8%" }}
        animate={{
          width: complete ? "100%" : active ? ["12%", "76%", "48%", "92%"] : "42%",
        }}
        transition={{
          duration: complete ? 0.35 : 2.4,
          repeat: complete ? 0 : Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
