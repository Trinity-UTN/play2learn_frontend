import { useState, useEffect, useCallback, useRef } from "react";

interface UseActivityTimerProps {
  maxTimeInMinutes: number;
  isActive: boolean;
  onTimeUp?: () => void;
}

export const useActivityTimer = ({
  maxTimeInMinutes,
  isActive,
  onTimeUp,
}: UseActivityTimerProps) => {
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Inicializar el timer cuando se activa
  useEffect(() => {
    if (isActive && maxTimeInMinutes > 0) {
      setTimeLeftInSeconds(maxTimeInMinutes * 60);
    }
  }, [isActive, maxTimeInMinutes]);

  // Cuenta regresiva
  useEffect(() => {
    if (!isActive || timeLeftInSeconds <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeftInSeconds((prev) => {
        if (prev <= 1) {
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, timeLeftInSeconds, onTimeUp]);

  const formatTime = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeftInSeconds(maxTimeInMinutes * 60);
  }, [maxTimeInMinutes]);

  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resumeTimer = useCallback(() => {
    if (isActive && timeLeftInSeconds > 0 && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimeLeftInSeconds((prev) => {
          if (prev <= 1) {
            onTimeUp?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [isActive, timeLeftInSeconds, onTimeUp]);

  return {
    timeLeftInSeconds,
    formattedTime: formatTime(timeLeftInSeconds),
    isTimeUp: timeLeftInSeconds === 0,
    resetTimer,
    pauseTimer,
    resumeTimer,
  };
};
