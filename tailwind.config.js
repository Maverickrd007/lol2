/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: "#050807",
          panel: "#07110d",
          panelSoft: "#0a1812",
          line: "#1cf48c",
          muted: "#7ccfa2",
          danger: "#ff4d7a",
          gold: "#f6d66d",
        },
      },
      boxShadow: {
        terminal: "0 0 36px rgba(28, 244, 140, 0.14), inset 0 0 0 1px rgba(28, 244, 140, 0.18)",
        glow: "0 0 22px rgba(28, 244, 140, 0.36)",
        blush: "0 0 36px rgba(255, 77, 122, 0.32)",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "Consolas", "monospace"],
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "12%, 88%": { opacity: "0.8" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        blink: {
          "0%, 45%": { opacity: "1" },
          "46%, 100%": { opacity: "0" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 1px)" },
          "40%": { transform: "translate(2px, -1px)" },
          "60%": { transform: "translate(-1px, -1px)" },
          "80%": { transform: "translate(1px, 2px)" },
        },
      },
      animation: {
        scan: "scan 4.5s linear infinite",
        blink: "blink 1s step-end infinite",
        glitch: "glitch 650ms steps(2, end) infinite",
      },
    },
  },
  plugins: [],
};
