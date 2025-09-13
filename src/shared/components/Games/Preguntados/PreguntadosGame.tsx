import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaGamepad,
  FaBomb,
  FaQuestionCircle,
  FaCheck,
  FaTimes,
  FaPlay,
  FaArrowRight,
  FaRedo,
  FaTrophy,
  FaExclamationTriangle,
} from "react-icons/fa";
import Button from "../../Button/ButtonComponent";
import { usePreguntadosGame } from "../../../hooks/games/usePreguntadosGame";
import styles from "./PreguntadosGame.module.css";

interface PreguntadosGameProps {
  mode?: "preview" | "student";
}

const PreguntadosGame: React.FC<PreguntadosGameProps> = ({
  mode = "student",
}) => {
  const {
    gameConfig,
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    timeRemaining,
    isCountingDown,
    countdownValue,
    gamePhase,
    results,
    correctAnswers,
    totalQuestions,
    isLastQuestion,
    canSelectAnswer,
    showCorrectAnswer,
    startGame,
    selectAnswer,
    nextQuestion,
    resetGame,
  } = usePreguntadosGame();

  const [showExplosion, setShowExplosion] = useState(false);

  const getMaxTimePerQuestion = () => {
    if (!gameConfig) return 30;
    if ("questions" in gameConfig) {
      return gameConfig.maxTimePerQuestionInSeconds;
    } else {
      return gameConfig.maxTimePerQuestionInSeconds;
    }
  };

  const maxTime = getMaxTimePerQuestion();
  const progress = ((maxTime - timeRemaining) / maxTime) * 100;
  const circumference = 2 * Math.PI * 35; // radio de 35
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (timeRemaining === 0 && gamePhase === "question") {
      setShowExplosion(true);
      const timer = setTimeout(() => {
        setShowExplosion(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, gamePhase]);

  const getTimerClass = () => {
    if (timeRemaining <= 3) return "danger";
    if (timeRemaining <= 5) return "warning";
    return "";
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerClass =
    mode === "student"
      ? `${styles.activityContainer} ${styles.studentMode}`
      : styles.activityContainer;

  const isPreviewRoute =
    typeof window !== "undefined" &&
    window.location.pathname.includes(
      "/dashboard/teacher/actividad/configuration/preguntados"
    );

  if (gamePhase === "waiting") {
    return (
      <motion.div variants={itemVariants} className={containerClass}>
        {mode === "preview" && (
          <div className={styles.activityHeader}>
            <div className={styles.activityTitle}>
              <FaGamepad className={styles.activityIcon} />
              <h4>Preguntados</h4>
            </div>
            <div className={styles.gameInfo}>
              <span>{totalQuestions} preguntas</span>
              <span>
                {gameConfig?.maxTimePerQuestionInSeconds}s por pregunta
              </span>
            </div>
          </div>
        )}

        <div className={styles.gameCard}>
          <div className={styles.startScreen}>
            <div className={styles.startContent}>
              <FaQuestionCircle className={styles.startIcon} />
              <h3 className={styles.startTitle}>¡Listo para comenzar!</h3>
              <p className={styles.startDescription}>
                Responde {totalQuestions} preguntas. Tienes{" "}
                {gameConfig?.maxTimePerQuestionInSeconds} segundos para cada
                una.
              </p>
              <Button
                onClick={startGame}
                className={styles.startButton}
                size="lg"
              >
                <FaPlay />
                Comenzar Juego
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (gamePhase === "countdown" && isCountingDown) {
    return (
      <motion.div variants={itemVariants} className={containerClass}>
        {mode === "preview" && (
          <div className={styles.activityHeader}>
            <div className={styles.activityTitle}>
              <FaGamepad className={styles.activityIcon} />
              <h4>Preguntados</h4>
            </div>
            <div className={styles.questionCounter}>
              Pregunta {currentQuestionIndex + 1} de {totalQuestions}
            </div>
          </div>
        )}

        <div className={styles.gameCard}>
          <div className={styles.countdownScreen}>
            <div className={styles.countdownContent}>
              <div className={styles.countdownNumber}>{countdownValue}</div>
              <p className={styles.countdownText}>Prepárate...</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (gamePhase === "question" || gamePhase === "answered") {
    const correctAnswerIndex =
      currentQuestion?.options.findIndex((opt) => opt.isCorrect) ?? -1;

    return (
      <motion.div variants={itemVariants} className={containerClass}>
        {mode === "preview" && (
          <div className={styles.activityHeader}>
            <div className={styles.activityTitle}>
              <FaGamepad className={styles.activityIcon} />
              <h4>Preguntados</h4>
            </div>
            <div className={styles.gameStats}>
              <div className={styles.questionCounter}>
                Pregunta {currentQuestionIndex + 1} de {totalQuestions}
              </div>
              <div className={styles.scoreDisplay}>
                Correctas: {correctAnswers}/{results.length}
              </div>
            </div>
          </div>
        )}

        <div className={styles.gameCard}>
          <div className={styles.questionHeader}>
            <div className={styles.questionProgress}>
              {currentQuestionIndex + 1} de {totalQuestions}
            </div>

            <div className={styles.circularTimer}>
              <svg className={styles.timerSvg}>
                <circle
                  className={styles.timerCircleBackground}
                  cx="40"
                  cy="40"
                  r="35"
                />
                <circle
                  className={`${styles.timerCircleProgress} ${
                    getTimerClass() ? styles[getTimerClass()] : ""
                  }`}
                  cx="40"
                  cy="40"
                  r="35"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              {showExplosion ? (
                <FaBomb className={styles.timerExplosion} />
              ) : (
                <span
                  className={`${styles.timerText} ${
                    getTimerClass() ? styles[getTimerClass()] : ""
                  }`}
                >
                  {gamePhase === "question" ? timeRemaining : 0}
                </span>
              )}
            </div>
          </div>

          <div className={styles.questionContent}>
            <div className={styles.questionText}>
              <h3>{currentQuestion?.question}</h3>
            </div>

            <div className={styles.optionsContainer}>
              {currentQuestion?.options.map((option, index) => {
                let optionClass = styles.optionButton;

                if (selectedAnswer === index) {
                  optionClass += ` ${styles.selected}`;
                }

                if (showCorrectAnswer) {
                  if (index === correctAnswerIndex) {
                    optionClass += ` ${styles.correct}`;
                  } else if (
                    selectedAnswer === index &&
                    index !== correctAnswerIndex
                  ) {
                    optionClass += ` ${styles.incorrect}`;
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    disabled={!canSelectAnswer}
                    className={optionClass}
                  >
                    <span className={styles.optionLetter}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className={styles.optionText}>{option.option}</span>
                    {showCorrectAnswer && index === correctAnswerIndex && (
                      <FaCheck className={styles.correctIcon} />
                    )}
                    {showCorrectAnswer &&
                      selectedAnswer === index &&
                      index !== correctAnswerIndex && (
                        <FaTimes className={styles.incorrectIcon} />
                      )}
                  </button>
                );
              })}
            </div>

            {gamePhase === "answered" && (
              <div className={styles.answerFeedback}>
                {showCorrectAnswer && (
                  <div className={styles.correctAnswerInfo}>
                    <FaCheck className={styles.feedbackIcon} />
                    <span>
                      Respuesta correcta:{" "}
                      <strong>
                        {String.fromCharCode(65 + correctAnswerIndex)}){" "}
                        {currentQuestion?.options[correctAnswerIndex]?.option}
                      </strong>
                    </span>
                  </div>
                )}

                <div className={styles.nextButtonContainer}>
                  <Button onClick={nextQuestion} className={styles.nextButton}>
                    {isLastQuestion ? (
                      <>
                        <FaTrophy />
                        Ver Resultados
                      </>
                    ) : (
                      <>
                        Siguiente Pregunta
                        <FaArrowRight />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  if (gamePhase === "finished") {
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const isPassed = percentage >= 60;

    return (
      <motion.div variants={itemVariants} className={containerClass}>
        {mode === "preview" && (
          <div className={styles.activityHeader}>
            <div className={styles.activityTitle}>
              <FaGamepad className={styles.activityIcon} />
              <h4>Preguntados - Resultados</h4>
            </div>
          </div>
        )}

        <div className={styles.gameCard}>
          <div className={styles.resultsScreen}>
            <div className={styles.resultsHeader}>
              {isPassed ? (
                <FaTrophy
                  className={`${styles.resultIcon} ${styles.success}`}
                />
              ) : (
                <FaExclamationTriangle
                  className={`${styles.resultIcon} ${styles.warning}`}
                />
              )}
              <h3 className={styles.resultTitle}>
                {isPassed ? "¡Felicitaciones!" : "Juego Terminado"}
              </h3>
            </div>

            <div className={styles.scoreCard}>
              <div className={styles.finalScore}>
                <span className={styles.scoreNumber}>{correctAnswers}</span>
                <span className={styles.scoreTotal}>/ {totalQuestions}</span>
              </div>
              <div className={styles.scorePercentage}>
                {percentage}% correctas
              </div>
            </div>

            {mode === "preview" && (
              <div className={styles.detailedResults}>
                <h4 className={styles.detailsTitle}>
                  Resultados por pregunta:
                </h4>
                <div className={styles.resultsList}>
                  {results.map((result, index) => (
                    <div key={index} className={styles.resultItem}>
                      <span className={styles.resultNumber}>#{index + 1}</span>
                      <span
                        className={`${styles.resultStatus} ${
                          result.isCorrect ? styles.correct : styles.incorrect
                        }`}
                      >
                        {result.isCorrect ? <FaCheck /> : <FaTimes />}
                      </span>
                      <span className={styles.resultTime}>
                        {result.timeSpent}s
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isPreviewRoute && (
              <div className={styles.actionButtons}>
                <Button
                  variant="secondary"
                  onClick={resetGame}
                  className={styles.restartButton}
                >
                  <FaRedo />
                  Jugar de Nuevo
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
};

export default PreguntadosGame;
