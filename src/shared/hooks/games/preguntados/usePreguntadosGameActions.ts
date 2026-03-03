import { useMemo } from "react";
import { formatTime } from "@/shared/utils/format";

export const usePreguntadosGameActions = () => {
  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }),
    [],
  );

  const getOptionLetter = (index: number) => {
    return String.fromCharCode(65 + index);
  };

  const getResultMessage = (isPassed: boolean) => {
    return isPassed ? "¡Felicitaciones!" : "Actividad Finalizada";
  };

  const getResultSubtitle = (isPreview: boolean) => {
    return isPreview
      ? `Haz click en "Jugar de nuevo" si deseas intentarlo de nuevo`
      : `Haz click en "Finalizar intento" para ver los resultados de la actividad`;
  };

  const getNextButtonText = (isLastQuestion: boolean) => {
    return isLastQuestion ? "Finalizar" : "Siguiente Pregunta";
  };

  return {
    itemVariants,
    getOptionLetter,
    formatTime,
    getResultMessage,
    getResultSubtitle,
    getNextButtonText,
  };
};
