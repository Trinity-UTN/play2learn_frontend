import { useState, type ReactNode } from "react";
import { PreguntadosContext } from "./PreguntadosContext";
import type { PreguntadosContextType } from "./PreguntadosContext.type";
import { PreguntadosService } from "../../services/preguntados/PreguntadosService";
import type { PreguntadosInterface } from "../../types/Preguntados.type";
import type { ConfigurationActivity } from "../../types/Configuration.type";
import { useConfigurationActivity } from "../../hooks/useConfigurationActivity";
import { makeData } from "../../utils/MakeData";

interface PreguntadosProviderProps {
  children: ReactNode;
}

export const PreguntadosProvider: React.FC<PreguntadosProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questionErrors, setQuestionErrorsState] = useState<{
    [questionIndex: number]: { [field: string]: string };
  }>({});
  const { configurationActivity } = useConfigurationActivity();

  const registrarPreguntados = async (
    data: PreguntadosInterface
  ): Promise<void> => {
    setLoading(true);

    console.log("=== PREGUNTADOS DEBUG ===");
    console.log("Datos del juego recibidos:", data);
    console.log("Configuración de actividad:", configurationActivity);
    const dataMandar = makeData(
      data,
      configurationActivity as ConfigurationActivity
    );
    console.log("Payload final a enviar:", dataMandar);
    console.log("=== FIN DEBUG ===");

    try {
      await PreguntadosService.registerPreguntadosApi(dataMandar);
      clearAllQuestionErrors();
    } catch (error) {
      console.error("Error al crear la actividad (completar oración):", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const setQuestionErrors = (
    questionIndex: number,
    errors: { [field: string]: string }
  ) => {
    setQuestionErrorsState((prev) => ({
      ...prev,
      [questionIndex]: errors,
    }));
  };

  const clearQuestionErrors = (questionIndex: number) => {
    setQuestionErrorsState((prev) => {
      const newErrors = { ...prev };
      delete newErrors[questionIndex];
      return newErrors;
    });
  };

  const clearAllQuestionErrors = () => {
    setQuestionErrorsState({});
  };

  const contextValue: PreguntadosContextType = {
    loading,
    questionErrors,
    registrarPreguntados,
    setQuestionErrors,
    clearQuestionErrors,
    clearAllQuestionErrors,
  };

  return (
    <PreguntadosContext.Provider value={contextValue}>
      {children}
    </PreguntadosContext.Provider>
  );
};
