import { useMemo } from "react";

export const usePreguntadosGameActions = () => {
  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }),
    []
  );

  const getOptionLetter = (index: number) => {
    return String.fromCharCode(65 + index);
  };

  // TODO: Pasar a función utils para reusabilidad
  const formatTime = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  const getResultMessage = (isPassed: boolean) => {
    return isPassed ? "¡Felicitaciones!" : "Juego Terminado";
  };

  const getNextButtonText = (isLastQuestion: boolean) => {
    return isLastQuestion ? "Ver Resultados" : "Siguiente Pregunta";
  };

  return {
    itemVariants,
    getOptionLetter,
    formatTime,
    getResultMessage,
    getNextButtonText,
  };
};
