export default function GlitchText({ children }) {
  return (
    <h2 className="relative text-lg font-bold uppercase tracking-[0.2em] text-[#eafff4] sm:text-xl">
      <span className="glitch-shadow relative z-10">{children}</span>
      <span className="absolute left-0 top-0 -z-0 animate-glitch text-terminal-danger/70" aria-hidden="true">
        {children}
      </span>
    </h2>
  );
}
