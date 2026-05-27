import { useCallback, useRef } from "react";

export function useTerminalSound(enabled) {
  const contextRef = useRef(null);

  const getContext = useCallback(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      return null;
    }

    if (!contextRef.current) {
      contextRef.current = new AudioContext();
    }

    return contextRef.current;
  }, []);

  const unlock = useCallback(() => {
    const context = getContext();
    context?.resume?.();
  }, [getContext]);

  const play = useCallback(
    (frequency = 520, duration = 0.045, volume = 0.025) => {
      if (!enabled) {
        return;
      }

      const context = getContext();
      if (!context) {
        return;
      }
      context.resume?.();

      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = "square";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(volume, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + duration);
    },
    [enabled, getContext],
  );

  return {
    playKey: useCallback(() => play(620 + Math.random() * 80, 0.025, 0.012), [play]),
    playBoot: useCallback(() => play(320, 0.12, 0.03), [play]),
    playSuccess: useCallback(() => {
      play(660, 0.08, 0.035);
      window.setTimeout(() => play(880, 0.1, 0.028), 90);
    }, [play]),
    unlock,
  };
}
