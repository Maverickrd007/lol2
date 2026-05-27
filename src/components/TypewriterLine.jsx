import { useEffect, useState } from "react";

export default function TypewriterLine({ text, speed = 28, onDone, onTick }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      onTick?.();

      if (index >= text.length) {
        window.clearInterval(interval);
        window.setTimeout(() => onDone?.(), 260);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [onDone, onTick, speed, text]);

  return (
    <span className="break-words text-[#eafff4]">
      {displayed}
      <span className="ml-1 inline-block h-5 w-2 translate-y-1 animate-blink bg-terminal-line shadow-glow" />
    </span>
  );
}
