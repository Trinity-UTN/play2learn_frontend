import { useState, useEffect } from "react";

export function useCountUp(
  target: number, // número final
  phase: number, // fase de animación (ej: animationPhase)
  options?: {
    steps?: number; // en cuántos pasos llegar (default 20)
    interval?: number; // ms entre pasos (default 50)
  }
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (phase < 1) return;

    const steps = options?.steps ?? 20;
    const interval = options?.interval ?? 50;
    const increment = Math.ceil(target / steps);

    const timer = setInterval(() => {
      setValue((prev) => {
        if (prev >= target) {
          clearInterval(timer);
          return target;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [phase, target, options?.steps, options?.interval]);

  return value;
}
