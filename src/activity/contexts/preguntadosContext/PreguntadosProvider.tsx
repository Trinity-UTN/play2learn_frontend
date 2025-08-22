import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { PreguntadosContext } from "./PreguntadosContext";
import type { PreguntadosContextType } from "./PreguntadosContext.type";
import { PreguntadosService } from "../../services/preguntados/PreguntadosService";
import type {
  Question,
  PreguntadosConfig,
  PreguntadosInterface,
} from "../../types/Preguntados.type";
import type { ConfigurationActivity } from "../../types/Configuration.type";
import { makeData } from "../../utils/MakeData";
import { useConfigurationActivity } from "../../hooks/useConfigurationActivity";
import { useConfirmation } from "../../../shared/hooks/useConfirmation";
import { useToaster } from "../../../shared/hooks/useToaster";

interface PreguntadosProviderProps {
  children: ReactNode;
}

export const PreguntadosProvider: React.FC<PreguntadosProviderProps> = ({
  children,
}) => {
  const { configurationActivity } = useConfigurationActivity();
  const { showConfirmation } = useConfirmation();
  const { showToast } = useToaster();
  const navigate = useNavigate();

  // Estados generales
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<
    "config" | "questions" | "preview"
  >("config");
  const [config, setConfig] = useState<PreguntadosConfig>({
    totalQuestions: 5,
    maxTimePerQuestionInSeconds: 30,
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [questionErrors, setQuestionErrorsState] = useState<{
    [questionIndex: number]: { [field: string]: string };
  }>({});

  // Validación del formulario cuando cambiamos al paso de preview
  useEffect(() => {
    if (currentStep === "preview") {
      const validationErrors = validateAllQuestions();
      setErrors(validationErrors);
    } else {
      setErrors([]);
    }
  }, [currentStep, questions]);

  // Función para reiniciar todos los estados
  const resetAllStates = () => {
    setConfig({ totalQuestions: 5, maxTimePerQuestionInSeconds: 30 });
    setQuestions([]);
    setCurrentStep("config");
    setCurrentQuestionIndex(0);
    setErrors([]);
    setQuestionErrorsState({});
  };

  // Función para determinar el estado de una pregunta
  const getQuestionStatus = (
    q: Question
  ): "complete" | "incomplete" | "empty" => {
    if (!q.question.trim() && q.options.every((opt) => !opt.option.trim())) {
      return "empty";
    }

    const hasQuestion = q.question.trim() && q.question.length <= 200;
    const hasAllOptions = q.options.every(
      (opt) => opt.option.trim() && opt.option.length <= 100
    );
    const hasCorrectAnswer =
      q.options.filter((opt) => opt.isCorrect).length === 1;

    if (hasQuestion && hasAllOptions && hasCorrectAnswer) {
      return "complete";
    }

    return "incomplete";
  };

  // Función para validar todas las preguntas
  const validateAllQuestions = (): string[] => {
    const validationErrors: string[] = [];

    if (questions.length < 5) {
      validationErrors.push("Debe crear al menos 5 preguntas");
    }

    questions.forEach((question, index) => {
      const status = getQuestionStatus(question);

      if (status === "empty") {
        validationErrors.push(`La pregunta ${index + 1} está vacía`);
      } else if (status === "incomplete") {
        // Validaciones específicas para preguntas incompletas
        if (!question.question.trim()) {
          validationErrors.push(
            `La pregunta ${index + 1} no puede estar vacía`
          );
        } else if (question.question.length > 200) {
          validationErrors.push(
            `La pregunta ${index + 1} no puede tener más de 200 caracteres`
          );
        }

        const validOptions = question.options.filter((opt) =>
          opt.option.trim()
        );
        if (validOptions.length < 4) {
          validationErrors.push(
            `La pregunta ${index + 1} debe tener 4 opciones completas`
          );
        }

        question.options.forEach((option, optIndex) => {
          if (option.option.length > 100) {
            validationErrors.push(
              `La opción ${optIndex + 1} de la pregunta ${
                index + 1
              } no puede tener más de 100 caracteres`
            );
          }
        });

        const correctAnswers = question.options.filter((opt) => opt.isCorrect);
        if (correctAnswers.length === 0) {
          validationErrors.push(
            `La pregunta ${index + 1} debe tener una respuesta correcta`
          );
        } else if (correctAnswers.length > 1) {
          validationErrors.push(
            `La pregunta ${index + 1} solo puede tener una respuesta correcta`
          );
        }
      }
    });

    return validationErrors;
  };

  // Función para verificar si todas las preguntas están completas
  const areAllQuestionsComplete = (): boolean => {
    return questions.every((q) => getQuestionStatus(q) === "complete");
  };

  // Determinar si el formulario es válido para envío
  const isFormValid = errors.length === 0 && areAllQuestionsComplete();

  const registrarPreguntados = async (
    data: PreguntadosInterface
  ): Promise<void> => {
    setLoading(true);

    // console.log("=== PREGUNTADOS DEBUG ===");
    // console.log("Datos del juego recibidos:", data);
    // console.log("Configuración de actividad:", configurationActivity);
    const dataMandar = makeData(
      data,
      configurationActivity as ConfigurationActivity
    );
    // console.log("Payload final a enviar:", dataMandar);
    // console.log("=== FIN DEBUG ===");

    try {
      await PreguntadosService.registerPreguntadosApi(dataMandar);
      clearAllQuestionErrors();
    } catch (error) {
      console.error("Error al crear la actividad (preguntados):", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Handlers principales
  const handleConfigSubmit = (newConfig: PreguntadosConfig) => {
    setConfig(newConfig);
    // Inicializar array de preguntas vacías
    const emptyQuestions: Question[] = Array(newConfig.totalQuestions)
      .fill(null)
      .map(() => ({
        question: "",
        options: [
          { option: "", isCorrect: false },
          { option: "", isCorrect: false },
          { option: "", isCorrect: false },
          { option: "", isCorrect: false },
        ],
      }));
    setQuestions(emptyQuestions);
    setCurrentStep("questions");
    setCurrentQuestionIndex(0);
  };

  const handleSubmit = async () => {
    const finalValidationErrors = validateAllQuestions();
    if (finalValidationErrors.length > 0) {
      setErrors(finalValidationErrors);
      return;
    }

    try {
      const gameData: PreguntadosInterface = {
        maxTimePerQuestionInSeconds: config.maxTimePerQuestionInSeconds,
        questions: questions,
      };

      await registrarPreguntados(gameData);
      showToast({
        title: "Actividad creada exitosamente",
        message: "La actividad ha sido creada exitosamente.",
        type: "success",
        position: "bottom-right",
      });
      resetAllStates();
      navigate("/dashboard/teacher/actividades/list");
    } catch (error) {
      showToast({
        title: "Error al crear la actividad",
        message: "Hubo un error al crear la actividad",
        type: "error",
        position: "bottom-right",
      });
      console.error("Error al crear la actividad (preguntados):", error); // TODO: REMOVE_DEBUG
    }
  };

  const handleBack = () => {
    if (currentStep === "preview") {
      setCurrentStep("questions");
    } else if (currentStep === "questions") {
      showConfirmation({
        title: "Ir a la configuración",
        message:
          "¿Está seguro que desea ir a la configuración de la actividad? Se perderán los cambios realizados.",
        type: "danger",
        showDoubleConfirmation: true,
        onConfirm: () => {
          setQuestions([]);
          setCurrentStep("config");
        },
      });
    }
  };

  const handleNext = () => {
    if (currentStep === "config") {
      const configForm = document.querySelector("form");
      if (configForm) {
        configForm.requestSubmit();
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
          type: "info",
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
        return "Configuración General";
      case "questions":
        return `Pregunta ${currentQuestionIndex + 1} de ${
          config.totalQuestions
        }`;
      case "preview":
        return "Vista Previa";
      default:
        return "Crear Actividad";
    }
  };

  const getCurrentStepNumber = () => {
    if (currentStep === "config") return 1;
    if (currentStep === "questions") return 2;
    return 3;
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case "config":
        return "Define la cantidad de preguntas y el tiempo que tendrán los estudiantes para responder cada una.";
      case "questions":
        return "Agrega las preguntas que deseas para el preguntados.";
      case "preview":
        return "Así es como verán la actividad tus estudiantes.";
      default:
        return "";
    }
  };

  // Handlers específicos de preguntados
  const handleQuestionSave = (questionData: Question) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = questionData;
    setQuestions(updatedQuestions);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (!areAllQuestionsComplete()) {
        const incompleteQuestions = questions
          .map((q, index) => ({
            index,
            status: getQuestionStatus(q),
          }))
          .filter((item) => item.status !== "complete");

        const incompleteNumbers = incompleteQuestions
          .map((item) => item.index + 1)
          .join(", ");

        showToast({
          title: "Preguntas incompletas",
          message: `Debes completar todas las preguntas antes de continuar. Preguntas incompletas o vacías: ${incompleteNumbers}`,
          type: "warning",
          position: "bottom-right",
        });
        return;
      }
      setCurrentStep("preview");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleGoToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleAddQuestion = () => {
    const updatedQuestions = [...questions, { question: "", options: [] }];
    setConfig((prev) => ({
      ...prev,
      totalQuestions: prev.totalQuestions + 1,
    }));
    setQuestions(updatedQuestions);
  };

  const handleDeleteQuestion = (index: number) => {
    if (questions.length > 5) {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      setQuestions(updatedQuestions);
      setConfig((prev) => ({
        ...prev,
        totalQuestions: prev.totalQuestions - 1,
      }));

      if (currentQuestionIndex >= updatedQuestions.length) {
        setCurrentQuestionIndex(updatedQuestions.length - 1);
      }
    }
  };

  // Funciones específicas de preguntados
  const getCompletedQuestions = () => {
    return questions.filter((q) => getQuestionStatus(q) === "complete").length;
  };

  const getIncompleteQuestions = () => {
    return questions.filter((q) => getQuestionStatus(q) === "incomplete")
      .length;
  };

  const getEmptyQuestions = () => {
    return questions.filter((q) => getQuestionStatus(q) === "empty").length;
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
    // Estados principales
    loading,
    currentStep,
    config,
    errors,
    isFormValid,
    questions,
    questionErrors,
    currentQuestionIndex,

    // Funciones principales
    registrarPreguntados,

    // Handlers principales
    handleConfigSubmit,
    handleSubmit,
    handleBack,
    handleNext,
    handleReset,

    // Funciones de utilidad
    getQuestionStatus,
    getCurrentStepNumber,
    getStepTitle,
    getStepDescription,

    // Handlers específicos de preguntados
    handleQuestionSave,
    handleNextQuestion,
    handlePreviousQuestion,
    handleGoToQuestion,
    handleAddQuestion,
    handleDeleteQuestion,

    // Funciones específicas de preguntados
    getCompletedQuestions,
    getIncompleteQuestions,
    getEmptyQuestions,
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
