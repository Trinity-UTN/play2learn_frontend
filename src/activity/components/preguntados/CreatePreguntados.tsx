import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaQuestionCircle, FaArrowRight, FaUndo } from "react-icons/fa";
import Button from "../../../shared/components/Button/ButtonComponent";
import ConfirmationModal from "../../../shared/components/ConfirmationModal/ConfirmationModal";
import GeneralConfiguration from "./components/generalConfig/GeneralConfiguration";
import QuestionCreator from "./components/questionCreator/QuestionCreator";
import PreguntadosPreview from "./components/preguntadosPreview/PreguntadosPreview";
import { usePreguntados } from "../../hooks/usePreguntados";
import type {
  Question,
  PreguntadosConfig,
  PreguntadosInterface,
} from "../../types/Preguntados.type";
import styles from "./CreatePreguntados.module.css";

const CreatePreguntados = () => {
  const { loading, registrarPreguntados } = usePreguntados();
  const navigate = useNavigate();

  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    type: "warning" as "warning" | "danger",
    isOpen: false,
    showDoubleConfirmation: false,
    onConfirm: () => {},
  });
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getQuestionStatus = (
    q: Question
  ): "complete" | "incomplete" | "empty" => {
    // Si no hay nada escrito, es empty
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

  const areAllQuestionsComplete = (): boolean => {
    return questions.every((q) => getQuestionStatus(q) === "complete");
  };

  useEffect(() => {
    if (currentStep === "preview") {
      const validationErrors = validateAllQuestions();
      setErrors(validationErrors);
    } else {
      setErrors([]);
    }
  }, [currentStep, questions]);

  const handleConfigSubmit = (newConfig: PreguntadosConfig) => {
    setConfig(newConfig);
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
        alert(
          `Debes completar todas las preguntas antes de continuar. Preguntas incompletas o vacías: ${incompleteNumbers}`
        );
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

  const handleSubmit = async () => {
    const finalValidationErrors = validateAllQuestions();
    if (finalValidationErrors.length > 0) {
      setErrors(finalValidationErrors);
      return;
    }

    try {
      const gameData: PreguntadosInterface = {
        attempts: 5, // TODO: ATTEMPTS REMOVAL
        maxTimePerQuestionInSeconds: config.maxTimePerQuestionInSeconds,
        questions: questions,
      };

      await registrarPreguntados(gameData);
      alert("Actividad creada exitosamente");
      navigate("/dashboard/teacher/actividades/list");
    } catch (error) {
      console.error("Error al crear la actividad (preguntados):", error);
      alert("Hubo un error al crear la actividad");
    }
  };

  const handleBack = () => {
    if (currentStep === "preview") {
      setCurrentStep("questions");
    } else if (currentStep === "questions") {
      setCurrentStep("config");
    }
  };

  const handleReset = () => {
    setAlertConfig({
      title: "Reiniciar Actividad",
      message: "¿Está seguro que desea reiniciar la creación de la actividad?",
      type: "warning",
      isOpen: true,
      showDoubleConfirmation: false,
      onConfirm: () => {
        setConfig({ totalQuestions: 5, maxTimePerQuestionInSeconds: 30 });
        setQuestions([]);
        setCurrentStep("config");
        setCurrentQuestionIndex(0);
        setErrors([]);
        setAlertConfig((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

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

  const isFormValid = errors.length === 0 && areAllQuestionsComplete();

  return (
    <>
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.titleSection}>
          <FaQuestionCircle className={styles.titleIcon} />
          <div>
            <h1 className={styles.title}>Crear Actividad: Preguntados</h1>
            <p className={styles.subtitle}>
              {getStepTitle()} - Paso{" "}
              {currentStep === "config"
                ? "1"
                : currentStep === "questions"
                ? "2"
                : "3"}{" "}
              de 3
            </p>
          </div>
        </div>

        <div className={styles.stepIndicator}>
          <div
            className={`${styles.step} ${
              currentStep === "config" ? styles.active : styles.completed
            }`}
          >
            1
          </div>
          <div className={styles.stepLine}></div>
          <div
            className={`${styles.step} ${
              currentStep === "questions"
                ? styles.active
                : currentStep === "preview"
                ? styles.completed
                : ""
            }`}
          >
            2
          </div>
          <div className={styles.stepLine}></div>
          <div
            className={`${styles.step} ${
              currentStep === "preview" ? styles.active : ""
            }`}
          >
            3
          </div>
        </div>
      </motion.div>

      {currentStep === "questions" && (
        <motion.div variants={itemVariants} className={styles.progressSection}>
          <div className={styles.progressInfo}>
            <span className={styles.progressText}>
              Preguntas completadas: {getCompletedQuestions()} de{" "}
              {config.totalQuestions}
              {getIncompleteQuestions() > 0 && (
                <span className={styles.incompleteText}>
                  {" "}
                  • {getIncompleteQuestions()} incompleta
                  {getIncompleteQuestions() !== 1 ? "s" : ""}
                </span>
              )}
              {getEmptyQuestions() > 0 && (
                <span className={styles.emptyText}>
                  {" "}
                  • {getEmptyQuestions()} vacía
                  {getEmptyQuestions() !== 1 ? "s" : ""}
                </span>
              )}
            </span>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${
                    (getCompletedQuestions() / config.totalQuestions) * 100
                  }%`,
                }}
              />
              <div
                className={styles.progressIncomplete}
                style={{
                  width: `${
                    (getIncompleteQuestions() / config.totalQuestions) * 100
                  }%`,
                  left: `${
                    (getCompletedQuestions() / config.totalQuestions) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {errors.length > 0 && (
        <motion.div variants={itemVariants} className={styles.errorContainer}>
          <div className={styles.errorHeader}>
            <h4>⚠️ Errores encontrados ({errors.length})</h4>
            <p>Debes corregir los siguientes problemas antes de continuar:</p>
          </div>
          {errors.map((error, index) => (
            <div key={index} className={styles.errorMessage}>
              • {error}
            </div>
          ))}
        </motion.div>
      )}

      <div className={styles.content}>
        {currentStep === "config" && (
          <GeneralConfiguration config={config} onSubmit={handleConfigSubmit} />
        )}

        {currentStep === "questions" && (
          <QuestionCreator
            question={questions[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={config.totalQuestions}
            timePerQuestion={config.maxTimePerQuestionInSeconds}
            questions={questions}
            onSave={handleQuestionSave}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
            onGoToQuestion={handleGoToQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            canDelete={questions.length > 5}
            getQuestionStatus={getQuestionStatus}
          />
        )}

        {currentStep === "preview" && (
          <PreguntadosPreview questions={questions} config={config} />
        )}
      </div>

      <motion.div variants={itemVariants} className={styles.footer}>
        <div className={styles.footerActions}>
          <Button
            variant="secondary"
            onClick={handleReset}
            className={styles.resetButton}
            disabled={loading}
          >
            <FaUndo />
            Reiniciar
          </Button>

          <div className={styles.navigationButtons}>
            {currentStep !== "config" && (
              <Button
                variant="secondary"
                onClick={handleBack}
                disabled={loading}
              >
                Atrás
              </Button>
            )}

            {currentStep === "preview" && (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={!isFormValid || loading}
                className={styles.nextButton}
              >
                <FaArrowRight />
                {loading ? "Creando..." : "Crear Actividad"}
              </Button>
            )}
          </div>
        </div>

        <ConfirmationModal
          title={alertConfig.title}
          message={alertConfig.message}
          type={alertConfig.type}
          isOpen={alertConfig.isOpen}
          showDoubleConfirmation={alertConfig.showDoubleConfirmation}
          doubleConfirmationText=""
          onConfirm={alertConfig.onConfirm}
          onClose={() => setAlertConfig((prev) => ({ ...prev, isOpen: false }))}
        />
      </motion.div>
    </>
  );
};

export default CreatePreguntados;
