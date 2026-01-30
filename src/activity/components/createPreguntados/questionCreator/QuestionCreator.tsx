import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaQuestionCircle,
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaPlus,
  FaTrash,
  FaClock,
  FaEdit,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Button, Card, GameType, getGameTypeFromActivityName, Input, TextArea, Tooltip } from "@/shared";
import type { PreguntadosConfigQuestion, Question } from "../../../types/Preguntados.type";
import { useCreatePreguntados } from "../../../hooks/useCreatePreguntados";
import styles from "./QuestionCreator.module.css";
import { useActividadCreada } from "@/activity/hooks/useActividadCreada";

const QuestionCreator: React.FC = () => {
  const {
    questions,
    currentQuestionIndex,
    config,
    questionErrors,
    handleQuestionSave,
    handleNextQuestion,
    handlePreviousQuestion,
    handleGoToQuestion,
    handleAddQuestion,
    handleDeleteQuestion,
    getQuestionStatus,
    setQuestionErrors,
    clearQuestionErrors,
    setQuestions
  } = useCreatePreguntados();
  const { actividadCreada } = useActividadCreada()
  const [formData, setFormData] = useState<Question>(
    questions[currentQuestionIndex]
  );

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  //Carga las preguntas si se re-expone la actividad
  useEffect(() => {
    if (actividadCreada) {
      const gameType = getGameTypeFromActivityName(actividadCreada.name);
      if (gameType === GameType.PREGUNTADOS) {
        const createdConfig = actividadCreada.gameConfig as PreguntadosConfigQuestion;
        setQuestions(createdConfig.questions)
      }
    }
  }, [])
  // Actualizar formData cuando cambie la pregunta
  useEffect(() => {
    setFormData(questions[currentQuestionIndex]);
  }, [questions, currentQuestionIndex]);

  // Función para validar la pregunta actual y retornar errores específicos
  const validateCurrentQuestion = (
    questionData: Question
  ): { [key: string]: string } => {
    const validationErrors: { [key: string]: string } = {};

    // Validar pregunta
    if (!questionData.question.trim()) {
      validationErrors.question = "La pregunta es obligatoria";
    } else if (questionData.question.length > 200) {
      validationErrors.question =
        "La pregunta no puede tener más de 200 caracteres";
    }

    // Validar opciones
    questionData.options.forEach((option, index) => {
      if (!option.option.trim()) {
        validationErrors[`option${index}`] = `La opción ${index + 1
          } es obligatoria`;
      } else if (option.option.length > 100) {
        validationErrors[`option${index}`] = `La opción ${index + 1
          } no puede tener más de 100 caracteres`;
      }
    });

    // Validar respuesta correcta
    const correctAnswers = questionData.options.filter((opt) => opt.isCorrect);
    if (correctAnswers.length === 0) {
      validationErrors.correctAnswer =
        "Debe seleccionar una respuesta correcta";
    } else if (correctAnswers.length > 1) {
      validationErrors.correctAnswer =
        "Solo puede haber una respuesta correcta";
    }

    return validationErrors;
  };

  const handleQuestionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, question: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = { ...updatedOptions[index], option: value };
    setFormData((prev) => ({ ...prev, options: updatedOptions }));
  };

  const handleCorrectAnswerChange = (index: number) => {
    const updatedOptions = formData.options.map((option, i) => ({
      ...option,
      isCorrect: i === index,
    }));
    setFormData((prev) => ({ ...prev, options: updatedOptions }));
  };

  const handleSave = () => {
    handleQuestionSave(formData);
    // Validar y guardar errores
    const currentErrors = validateCurrentQuestion(formData);
    if (Object.keys(currentErrors).length > 0) {
      setQuestionErrors(currentQuestionIndex, currentErrors);
    } else {
      clearQuestionErrors(currentQuestionIndex);
    }
  };

  const handleSaveAndNext = () => {
    handleSave();
    // Si es la última pregunta (Finalizar), validar antes de continuar
    if (currentQuestionIndex === config.totalQuestions - 1) {
      const incompleteQuestions = questions
        .map((q, index) => ({
          question: q,
          index,
          status: getQuestionStatus(q),
        }))
        .filter((item) => item.status !== "complete");

      if (incompleteQuestions.length > 0) {
        const incompleteNumbers = incompleteQuestions
          .map((item) => item.index + 1)
          .join(", ");
        alert(
          `No puedes finalizar hasta completar todas las preguntas. Preguntas incompletas: ${incompleteNumbers}`
        );
        return;
      }
    }
    handleNextQuestion();
  };

  const handleSaveAndPrevious = () => {
    handleSave();
    handlePreviousQuestion();
  };

  const handleSaveAndGoToQuestion = (index: number) => {
    if (index !== currentQuestionIndex) {
      handleSave();
      handleGoToQuestion(index);
    }
  };

  // TODO: DELETE - Comentar o eliminar esta sección en producción
  // ========== INICIO SECCIÓN DEBUG ==========
  const handleDebugFill = () => {
    const debugQuestion: Question = {
      question: `Pregunta ${currentQuestionIndex + 1}`,
      options: [
        { option: "R1", isCorrect: true },
        { option: "R2", isCorrect: false },
        { option: "R3", isCorrect: false },
        { option: "R4", isCorrect: false },
      ],
    };
    setFormData(debugQuestion);
  };
  // ========== FIN SECCIÓN DEBUG ==========

  const currentErrors = questionErrors[currentQuestionIndex] || {};
  const hasErrors = Object.keys(currentErrors).length > 0;
  const currentStatus = getQuestionStatus(formData);

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      {/* Navegador de preguntas */}
      <div className={styles.questionNavigator}>
        <div className={styles.navigatorHeader}>
          <h4 className={styles.navigatorTitle}>Navegador de Preguntas</h4>
          {/* ========== INICIO BOTÓN DEBUG ========== */}
          {/* TODO: DELETE - Comentar o eliminar esta sección en producción */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDebugFill}
            className={styles.debugButton}
          >
            DEBUG
          </Button>
          {/* ========== FIN BOTÓN DEBUG ========== */}
        </div>
        <div className={styles.questionTabs}>
          {questions.map((q, index) => {
            const status = getQuestionStatus(q);
            const hasTabErrors =
              questionErrors[index] &&
              Object.keys(questionErrors[index]).length > 0;
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleSaveAndGoToQuestion(index)}
                className={`${styles.questionTab} ${index === currentQuestionIndex ? styles.active : ""
                  } ${styles[status]} ${hasTabErrors ? styles.hasErrors : ""}`}
                title={
                  hasTabErrors
                    ? `Pregunta ${index + 1} tiene errores`
                    : `Pregunta ${index + 1}`
                }
              >
                <span className={styles.tabNumber}>{index + 1}</span>
                {status === "complete" && !hasTabErrors && (
                  <FaCheck className={styles.tabCheck} />
                )}
                {(status === "incomplete" || hasTabErrors) && (
                  <FaExclamationTriangle className={styles.tabWarning} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Formulario de pregunta */}
      <Card className={styles.questionForm}>
        <div className={styles.questionHeader}>
          <div className={styles.questionInfo}>
            <FaQuestionCircle className={styles.questionIcon} />
            <div>
              <h3 className={styles.questionTitle}>
                Pregunta {currentQuestionIndex + 1} de {config.totalQuestions}
              </h3>
              <div className={styles.timeInfo}>
                <FaClock className={styles.timeIcon} />
                <span>
                  Tiempo: {config.maxTimePerQuestionInSeconds} segundos
                </span>
              </div>
            </div>
          </div>
          <div className={styles.buttonGroup}>
            {questions.length < 50 && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleAddQuestion()}
                className={styles.addButton}
              >
                <FaPlus />
                Agregar Pregunta
              </Button>
            )}
            {questions.length > 5 && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteQuestion(currentQuestionIndex)}
                className={styles.deleteButton}
              >
                <FaTrash />
                Eliminar
              </Button>
            )}
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h4 className={styles.sectionTitle}>
                <FaQuestionCircle className={styles.sectionIcon} />
                Pregunta
                <span className={styles.sectionTooltip}>
                  <Tooltip content="Máximo 200 caracteres" />
                </span>
              </h4>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <TextArea
              value={formData.question}
              onChange={(e) => handleQuestionChange(e.target.value)}
              rows={3}
              maxLength={200}
              showCharCount
              resize="vertical"
              className={`${styles.questionInput} ${currentErrors.question ? styles.error : ""
                }`}
            />
            {currentErrors.question && (
              <span className={styles.errorMessage}>
                {currentErrors.question}
              </span>
            )}
          </div>

          {/* Opciones de respuesta */}
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRowTwo}>
              <h4 className={styles.sectionTitle}>
                <FaQuestionCircle className={styles.sectionIcon} />
                Opciones de Respuesta
                <span className={styles.sectionTooltip}>
                  <Tooltip
                    content="Máximo 100 caracteres por opción. Selecciona la respuesta
                correcta"
                  />
                </span>
              </h4>
            </div>

            {currentErrors.correctAnswer && (
              <div className={styles.errorMessage}>
                {currentErrors.correctAnswer}
              </div>
            )}

            <div className={styles.optionsGrid}>
              {formData.options.map((option, index) => (
                <div key={index} className={styles.optionItem}>
                  <div className={styles.optionHeader}>
                    <span className={styles.optionLabel}>
                      Opción {index + 1}
                    </span>
                    <Button
                      variant="ghost"
                      onClick={() => handleCorrectAnswerChange(index)}
                      className={`${styles.correctButton} ${option.isCorrect ? styles.selected : ""
                        }`}
                      title={
                        option.isCorrect
                          ? "Respuesta correcta seleccionada"
                          : "Marcar como correcta"
                      }
                      disabled={option.isCorrect}
                    >
                      <FaCheck />
                      {option.isCorrect ? "Correcta" : "Marcar"}
                    </Button>
                  </div>
                  <Input
                    type="text"
                    value={option.option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className={`${styles.optionInput} ${currentErrors[`option${index}`] ? styles.error : ""
                      } ${option.isCorrect ? styles.correct : ""}`}
                  />
                  {currentErrors[`option${index}`] && (
                    <span className={styles.errorMessage}>
                      {currentErrors[`option${index}`]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botones de navegación */}
        <div className={styles.navigationButtons}>
          <Button
            variant="secondary"
            onClick={handleSaveAndPrevious}
            disabled={currentQuestionIndex === 0}
            className={styles.navButton}
          >
            <FaArrowLeft />
            Anterior
          </Button>

          <Button
            variant="ghost"
            onClick={handleSave}
            className={styles.saveButton}
          >
            <FaEdit />
            Guardar
          </Button>

          {currentQuestionIndex != config.totalQuestions - 1 && (
            <Button
              variant="primary"
              onClick={handleSaveAndNext}
              className={styles.navButton}
              disabled={
                currentQuestionIndex === config.totalQuestions - 1 &&
                questions.some((q) => getQuestionStatus(q) !== "complete")
              }
            >
              Siguiente
              <FaArrowRight />
            </Button>
          )}
        </div>
      </Card>

      {/* Indicador de estado de la pregunta actual */}
      {hasErrors && (
        <div className={styles.statusIndicator}>
          <div className={styles.statusHeader}>
            <FaExclamationTriangle className={styles.statusIcon} />
            <h4 className={styles.statusTitle}>
              Errores encontrados en esta pregunta
            </h4>
          </div>
          <div className={styles.statusMessage}>
            Corrige los siguientes errores para completar esta pregunta:
          </div>
          <ul className={styles.errorList}>
            {Object.entries(currentErrors).map(([field, error]) => (
              <li key={field} className={styles.errorItem}>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {currentStatus === "complete" && !hasErrors && (
        <div className={styles.successIndicator}>
          <div className={styles.successHeader}>
            <FaCheck className={styles.successIcon} />
            <h4 className={styles.successTitle}>Pregunta completa</h4>
          </div>
          <div className={styles.successMessage}>
            Esta pregunta está correctamente configurada y lista para usar.
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default QuestionCreator;
