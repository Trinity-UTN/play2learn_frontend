import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaRedo,
  FaClock,
  FaQuestionCircle,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import Button from "../../../../../shared/components/Button/ButtonComponent";
import type {
  Question,
  PreguntadosConfig,
} from "../../../../types/Preguntados.type";
import styles from "./PreguntadosPreview.module.css";

interface PreguntadosPreviewProps {
  questions: Question[];
  config: PreguntadosConfig;
}

const PreguntadosPreview: React.FC<PreguntadosPreviewProps> = ({
  questions,
  config,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (!showAnswers) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: optionIndex,
      }));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const resetPreview = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowAnswers(false);
    setIsPlaying(false);
  };

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  const startPreview = () => {
    setIsPlaying(true);
    resetPreview();
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];
  const correctAnswerIndex =
    currentQuestion?.options.findIndex((opt) => opt.isCorrect) ?? -1;

  const getAnswerStatus = (optionIndex: number) => {
    if (!showAnswers) return "default";

    const isCorrect = optionIndex === correctAnswerIndex;
    const wasSelected = optionIndex === selectedAnswer;

    if (isCorrect) return "correct";
    if (wasSelected && !isCorrect) return "incorrect";
    return "default";
  };

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.previewHeader}>
        <h3 className={styles.sectionTitle}>Vista Previa de la Actividad</h3>
        <p className={styles.description}>
          Así es como verán la actividad tus estudiantes. Puedes probar
          respondiendo las preguntas.
        </p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{questions.length}</span>
            <span className={styles.statLabel}>
              Pregunta{questions.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>
              {config.maxTimePerQuestionInSeconds}
            </span>
            <span className={styles.statLabel}>Segundos por pregunta</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>
              {Math.ceil(
                (questions.length * config.maxTimePerQuestionInSeconds) / 60
              )}
            </span>
            <span className={styles.statLabel}>Minutos totales</span>
          </div>
        </div>
      </div>

      <div className={styles.previewControls}>
        <Button variant="secondary" onClick={resetPreview} size="sm">
          <FaRedo />
          Reiniciar
        </Button>
        <Button
          variant={showAnswers ? "danger" : "primary"}
          onClick={toggleAnswers}
          size="sm"
        >
          {showAnswers ? <FaTimes /> : <FaCheck />}
          {showAnswers ? "Ocultar" : "Mostrar"} Respuestas
        </Button>
        {!isPlaying && (
          <Button variant="primary" onClick={startPreview} size="sm">
            <FaPlay />
            Iniciar Preview
          </Button>
        )}
      </div>

      {questions.length > 0 && (
        <div className={styles.gameContainer}>
          <div className={styles.gameHeader}>
            <div className={styles.questionCounter}>
              Pregunta {currentQuestionIndex + 1} de {questions.length}
            </div>
            <div className={styles.timeIndicator}>
              <FaClock className={styles.timeIcon} />
              {config.maxTimePerQuestionInSeconds}s
            </div>
          </div>

          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`,
              }}
            />
          </div>

          <motion.div
            key={currentQuestionIndex}
            variants={itemVariants}
            className={styles.questionCard}
          >
            <div className={styles.questionHeader}>
              <FaQuestionCircle className={styles.questionIcon} />
              <h4 className={styles.questionText}>
                {currentQuestion.question}
              </h4>
            </div>

            <div className={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => {
                const answerStatus = getAnswerStatus(index);
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`${styles.optionButton} ${
                      selectedAnswer === index ? styles.selected : ""
                    } ${styles[answerStatus]}`}
                    disabled={showAnswers}
                  >
                    <span
                      className={`${styles.optionLetter} ${styles[answerStatus]}`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className={styles.optionText}>{option.option}</span>
                    {showAnswers && index === correctAnswerIndex && (
                      <FaCheck className={styles.correctIcon} />
                    )}
                    {showAnswers &&
                      index === selectedAnswer &&
                      index !== correctAnswerIndex && (
                        <FaTimes className={styles.incorrectIcon} />
                      )}
                  </button>
                );
              })}
            </div>

            {showAnswers && (
              <div className={styles.answerExplanation}>
                <div className={styles.correctAnswerInfo}>
                  <FaCheck className={styles.explanationIcon} />
                  <span>
                    Respuesta correcta:{" "}
                    <strong>
                      {String.fromCharCode(65 + correctAnswerIndex)}){" "}
                      {currentQuestion.options[correctAnswerIndex].option}
                    </strong>
                  </span>
                </div>
              </div>
            )}
          </motion.div>

          <div className={styles.navigationControls}>
            <Button
              variant="secondary"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              size="sm"
            >
              Anterior
            </Button>

            <div className={styles.questionDots}>
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`${styles.questionDot} ${
                    index === currentQuestionIndex ? styles.active : ""
                  } ${
                    selectedAnswers[index] !== undefined ? styles.answered : ""
                  }`}
                />
              ))}
            </div>

            <Button
              variant="secondary"
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              size="sm"
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}

      <div className={styles.previewFooter}>
        <div className={styles.instructions}>
          <h5>Instrucciones para los estudiantes:</h5>
          <ul>
            <li>Lee cada pregunta cuidadosamente</li>
            <li>
              Tienes {config.maxTimePerQuestionInSeconds} segundos para
              responder cada pregunta
            </li>
            <li>Selecciona la opción que consideres correcta</li>
            <li>Una vez seleccionada, no podrás cambiar tu respuesta</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default PreguntadosPreview;
