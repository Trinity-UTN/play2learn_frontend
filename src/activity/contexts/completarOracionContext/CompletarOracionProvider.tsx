import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { CompletarOracionContext } from "./CompletarOracionContext";
import type { CompletarOracionContextType } from "./CompletarOracionContext.type";
import { CompletarOracionService } from "../../services/completarOracion/CompletarOracionService";
import type {
  CompletarOracionInterface,
  Sentence,
} from "../../types/CompletarOracion.type";
import type { ConfigurationActivity } from "../../types/Configuration.type";
import { makeData } from "../../utils/MakeData";
import { useConfigurationActivity } from "../../hooks/useConfigurationActivity";
import { useConfirmation } from "../../../shared/hooks/useConfirmation";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";
import { useToaster } from "../../../shared/hooks/useToaster";

interface CompletarOracionProviderProps {
  children: ReactNode;
}

export const CompletarOracionProvider: React.FC<
  CompletarOracionProviderProps
> = ({ children }) => {
  const { configurationActivity } = useConfigurationActivity();
  const { showConfirmation } = useConfirmation();
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();
  const navigate = useNavigate();

  // Estados generales
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<
    "config" | "words" | "preview"
  >("config");
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (currentStep === "preview") {
      const validationErrors = validateAllSentences();
      setErrors(validationErrors);
    } else {
      setErrors([]);
    }
  }, [currentStep, sentences]);

  // Funciones auxiliares del propio context
  const resetAllStates = () => {
    setLoading(false);
    setCurrentStep("config");
    setSentences([]);
    setErrors([]);
  };

  const validateAllSentences = (): string[] => {
    const validationErrors: string[] = [];

    if (sentences.length === 0) {
      validationErrors.push("Debe agregar al menos una oración");
      return validationErrors;
    }

    sentences.forEach((sentence, index) => {
      const totalWords = sentence.words.length;
      const missingWords = sentence.words.filter((w) => w.isMissing).length;
      const visibleWords = totalWords - missingWords;

      if (totalWords < 3) {
        validationErrors.push(
          `La oración ${index + 1} debe tener al menos 3 palabras`
        );
      }

      if (missingWords === 0) {
        validationErrors.push(
          `Debe seleccionar al menos una palabra para ocultar en la oración ${
            index + 1
          }`
        );
      }

      if (visibleWords === 0) {
        validationErrors.push(
          `Debe dejar al menos una palabra visible en la oración ${index + 1}`
        );
      }

      sentence.words.forEach((word) => {
        if (word.word.length < 1 || word.word.length > 30) {
          validationErrors.push(
            `La palabra "${word.word}" en la oración ${
              index + 1
            } debe tener entre 1 y 30 caracteres`
          );
        }
      });
    });

    return validationErrors;
  };

  const isFormValid = errors.length === 0 && sentences.length > 0;

  // Funciones Principales
  const registrarCompletarOracion = async (
    data: CompletarOracionInterface
  ): Promise<void> => {
    setLoading(true);

    const dataMandar = makeData(
      data,
      configurationActivity as ConfigurationActivity
    );

    try {
      await CompletarOracionService.registerCompletarOracionApi(dataMandar);
      resetAllStates();
    } catch (error) {
      handleApiError(error, "Error al crear la actividad");
    } finally {
      setLoading(false);
    }
  };

  // Handlers principales
  const handleConfigSubmit = (newSentences: Sentence[]) => {
    setSentences(newSentences);
    setCurrentStep("words");
  };

  const handleSubmit = async () => {
    const finalValidationErrors = validateAllSentences();
    if (finalValidationErrors.length > 0) {
      setErrors(finalValidationErrors);
      return;
    }

    try {
      const gameData: CompletarOracionInterface = {
        sentences: sentences.map((sentence) => ({
          words: sentence.words.map((word) => ({
            word: word.word,
            wordOrder: word.wordOrder,
            isMissing: word.isMissing,
          })),
        })),
      };

      await registrarCompletarOracion(gameData);
      showToast({
        title: "Actividad creada exitosamente",
        message: "La actividad ha sido creada exitosamente.",
        type: "success",
        position: "bottom-right",
      });
      resetAllStates();
      navigate("/dashboard/teacher/actividades/list");
    } catch (error) {
      handleApiError(error, "Error al crear la actividad");
    }
  };

  const handleBack = () => {
    if (currentStep === "preview") {
      setCurrentStep("words");
    } else if (currentStep === "words") {
      setCurrentStep("config");
    }
  };

  const handleNext = () => {
    if (currentStep === "config") {
      const configForm = document.querySelector("form");
      if (configForm) {
        configForm.requestSubmit();
      }
    } else if (currentStep === "words") {
      const validationErrors = validateAllSentences();
      setErrors(validationErrors);
      if (validateWords()) {
        setCurrentStep("preview");
      }
    }
  };

  const handleReset = () => {
    showConfirmation({
      title: "Reiniciar Actividad",
      message: "¿Está seguro que desea reiniciar la creación de la actividad?",
      type: "warning",
      onConfirm: () => {
        showToast({
          title: "Actividad reiniciada",
          type: "success",
          position: "bottom-right",
        });
        resetAllStates();
      },
    });
  };

  // Funciones de utilidad
  const getStepTitle = () => {
    switch (currentStep) {
      case "config":
        return "Agregar Oraciones";
      case "words":
        return "Seleccionar Palabras a Ocultar";
      case "preview":
        return "Vista Previa";
      default:
        return "Crear Actividad";
    }
  };

  const getCurrentStepNumber = () => {
    if (currentStep === "config") return 1;
    if (currentStep === "words") return 2;
    return 3;
  };

  const validateConfig = () => {
    return sentences.length >= 1 && sentences.length <= 20;
  };

  const validateWords = () => {
    return sentences.length > 0 && validateAllSentences().length === 0;
  };

  // Handlers específicos de completar oracion
  const handleAddSentence = (sentenceText: string) => {
    const words = sentenceText
      .trim()
      .split(/\s+/)
      .map((word, index) => ({
        word: word,
        wordOrder: index,
        isMissing: false,
      }));

    const newSentence: Sentence = { words };
    setSentences([...sentences, newSentence]);
  };

  const handleEditSentence = (index: number, sentenceText: string) => {
    const words = sentenceText
      .trim()
      .split(/\s+/)
      .map((word, wordIndex) => ({
        word: word,
        wordOrder: wordIndex,
        isMissing: false,
      }));

    const updatedSentences = [...sentences];
    updatedSentences[index] = { words };
    setSentences(updatedSentences);
  };

  const handleRemoveSentence = (index: number) => {
    setSentences(sentences.filter((_, i) => i !== index));
  };

  const handleWordToggle = (sentenceIndex: number, wordIndex: number) => {
    const updatedSentences = [...sentences];
    updatedSentences[sentenceIndex].words[wordIndex].isMissing =
      !updatedSentences[sentenceIndex].words[wordIndex].isMissing;
    setSentences(updatedSentences);
  };

  const contextValue: CompletarOracionContextType = {
    // Estados principales
    loading,
    currentStep,
    sentences,
    errors,
    isFormValid,

    // Funciones principales
    registrarCompletarOracion,

    // Handlers principales
    handleConfigSubmit,
    handleSubmit,
    handleBack,
    handleNext,
    handleReset,

    // Funciones de utilidad
    getStepTitle,
    getCurrentStepNumber,
    validateConfig,
    validateWords,

    // Handlers especificos de completar oración
    handleAddSentence,
    handleEditSentence,
    handleRemoveSentence,
    handleWordToggle,
  };

  return (
    <CompletarOracionContext.Provider value={contextValue}>
      {children}
    </CompletarOracionContext.Provider>
  );
};
