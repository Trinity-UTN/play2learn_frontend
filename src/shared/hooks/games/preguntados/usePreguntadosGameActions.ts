import { useMemo } from "react";

export const usePreguntadosGameActions = () => {
  // Variantes de animación para motion components
  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }),
    []
  );

  // Función para generar las letras de las opciones (A, B, C, D)
  const getOptionLetter = (index: number) => {
    return String.fromCharCode(65 + index);
  };

  // Función para formatear tiempo
  const formatTime = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Función para obtener mensaje de resultado
  const getResultMessage = (isPassed: boolean) => {
    return isPassed ? "¡Felicitaciones!" : "Juego Terminado";
  };

  // Función para obtener texto del botón siguiente
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
