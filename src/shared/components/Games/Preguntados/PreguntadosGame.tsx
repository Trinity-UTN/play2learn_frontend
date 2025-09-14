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
import { usePreguntadosGameActions } from "../../../hooks/games/preguntados/usePreguntadosGameActions";
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
    showExplosion,
    startGame,
    selectAnswer,
    nextQuestion,
    resetGame,
    getTimerClass,
    getTimerProgress,
    getFinalScore,
    getCorrectAnswerIndex,
    isPreviewRoute,
  } = usePreguntadosGame();

  const { itemVariants, getOptionLetter, getResultMessage, getNextButtonText } =
    usePreguntadosGameActions();

  const containerClass =
    mode === "student"
      ? `${styles.activityContainer} ${styles.studentMode}`
      : styles.activityContainer;

  const { circumference, strokeDashoffset } = getTimerProgress();
  const correctAnswerIndex = getCorrectAnswerIndex();

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
              <div className={styles.gameDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>
                    Preguntas a responder
                  </span>
                  <span className={styles.detailValue}>{totalQuestions}</span>
                </div>

                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>
                    Tiempo máximo por pregunta
                  </span>
                  <span className={styles.detailValue}>
                    {gameConfig?.maxTimePerQuestionInSeconds} segundos
                  </span>
                </div>
              </div>

              <div className={styles.importantNote}>
                <FaExclamationTriangle className={styles.noteIcon} />
                <p className={styles.noteText}>
                  Al seleccionar una opción, estarás confirmando tu respuesta
                  final.
                </p>
              </div>
              <Button
                onClick={startGame}
                className={styles.startButton}
                size="lg"
                variant="secondary"
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

        <div className={styles.gameCardCountdown}>
          <div className={styles.countdownScreen}>
            <div className={styles.countdownContent}>
              <div className={styles.countdownNumber}>{countdownValue}</div>
              <p className={styles.countdownText}>Prepárate</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (gamePhase === "question" || gamePhase === "answered") {
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
                  <Button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    disabled={!canSelectAnswer}
                    variant="ghost"
                    className={optionClass}
                  >
                    <span className={styles.optionLetter}>
                      {getOptionLetter(index)}
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
                  </Button>
                );
              })}
            </div>

            {(gamePhase === "answered" || timeRemaining === 0) && (
              <div className={styles.answerFeedback}>
                {showCorrectAnswer && (
                  <div className={styles.correctAnswerInfo}>
                    <FaCheck className={styles.feedbackIcon} />
                    <span>
                      Respuesta correcta:{" "}
                      <strong>
                        {getOptionLetter(correctAnswerIndex)}){" "}
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
                        {getNextButtonText(isLastQuestion)}
                      </>
                    ) : (
                      <>
                        {getNextButtonText(isLastQuestion)}
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
    const { percentage, isPassed } = getFinalScore();

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
              {mode === "preview" ? (
                isPassed ? (
                  <FaTrophy
                    className={`${styles.resultIcon} ${styles.success}`}
                  />
                ) : (
                  <FaExclamationTriangle
                    className={`${styles.resultIcon} ${styles.warning}`}
                  />
                )
              ) : (
                <FaCheck
                  className={`${styles.resultIcon} ${styles.completed}`}
                />
              )}
              <h3 className={styles.resultTitle}>
                {mode === "preview"
                  ? getResultMessage(isPassed)
                  : getResultMessage(false)}
              </h3>
              <div className={styles.resultSubtitle}>
                Haz click en "Finalizar intento" para ver los resultados de la
                actividad
              </div>
            </div>

            {mode === "preview" ? (
              <div className={styles.scoreCard}>
                <div className={styles.finalScore}>
                  <span className={styles.scoreNumber}>{correctAnswers}</span>
                  <span className={styles.scoreTotal}> / {totalQuestions}</span>
                </div>
                <div className={styles.scorePercentage}>
                  {percentage}% correctas
                </div>
              </div>
            ) : (
              <div className={styles.scoreCard}>
                <div className={styles.finalScore}>
                  <span className={styles.scoreNumber}>{results.length}</span>
                  <span className={styles.scoreSlash}> / </span>
                  <span className={styles.scoreTotal}>{totalQuestions}</span>
                </div>
                <div className={styles.finalScoreLabel}>
                  preguntas respondidas
                </div>
              </div>
            )}

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

            {isPreviewRoute() && (
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
