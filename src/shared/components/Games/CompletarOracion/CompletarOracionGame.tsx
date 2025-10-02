import { motion } from "framer-motion";
import { FaBookOpen, FaCheckCircle, FaUndo, FaEye } from "react-icons/fa";
import Button from "../../Button/ButtonComponent";
import { useCompletarOracionGame } from "../../../hooks/games/useCompletarOracionGame";
import styles from "./CompletarOracionGame.module.css";

interface CompletarOracionGameProps {
  mode?: "preview" | "student";
}

const CompletarOracionGame: React.FC<CompletarOracionGameProps> = ({
  mode = "student",
}) => {
  const {
    gameConfig,
    userAnswers,
    showAnswers,
    completeSentences,
    totalMissingWords,
    completedWords,
    correctAnswers,
    resetGame,
    toggleAnswers,
    handleInputChange,
  } = useCompletarOracionGame();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerClass =
    mode === "student"
      ? `${styles.activityContainer} ${styles.studentMode}`
      : styles.activityContainer;

  if (!gameConfig?.sentences) {
    return null;
  }

  return (
    <motion.div variants={itemVariants} className={containerClass}>
      {mode === "preview" && (
        <div className={styles.activityHeader}>
          <div className={styles.activityTitle}>
            <FaBookOpen className={styles.activityIcon} />
            <h4>Completar Oraciones</h4>
          </div>
          <div className={styles.deliveryType}>
            <FaCheckCircle />
            <span>
              {totalMissingWords} palabra
              {totalMissingWords !== 1 ? "s" : ""} a completar
            </span>
          </div>
        </div>
      )}

      <div className={styles.gameCard}>
        <div className={styles.gameContent}>
          <div className={styles.instructions}>
            <h5 className={styles.instructionsTitle}>
              Completa las siguientes oraciones:
            </h5>
          </div>

          <div className={styles.sentencesContainer}>
            {gameConfig.sentences.map((sentence, sentenceIndex) => (
              <motion.div
                key={sentenceIndex}
                variants={itemVariants}
                className={styles.sentenceContainer}
              >
                <div className={styles.sentenceNumber}>
                  {sentenceIndex + 1}.
                </div>
                <div className={styles.sentenceContent}>
                  {sentence.words.map((word, wordIndex) => (
                    <span key={wordIndex} className={styles.wordContainer}>
                      {word.isMissing ? (
                        <div className={styles.blankContainer}>
                          <input
                            type="text"
                            value={
                              userAnswers[`${sentenceIndex}-${wordIndex}`] || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                sentenceIndex,
                                wordIndex,
                                e.target.value
                              )
                            }
                            className={`${styles.blankInput} ${
                              showAnswers
                                ? userAnswers[`${sentenceIndex}-${wordIndex}`]
                                    ?.toLowerCase()
                                    .trim() === word.word.toLowerCase().trim()
                                  ? styles.correct
                                  : styles.incorrect
                                : ""
                            }`}
                            placeholder="____"
                            disabled={showAnswers}
                          />
                          {showAnswers && (
                            <div className={styles.correctAnswer}>
                              {word.word}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className={styles.visibleWord}>{word.word}</span>
                      )}
                      {wordIndex < sentence.words.length - 1 && " "}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {showAnswers && (
            <div className={styles.completeSentencesSection}>
              <div className={styles.completeSentencesHeader}>
                <h6 className={styles.completeSentencesTitle}>
                  Respuestas completas:
                </h6>
              </div>
              <div className={styles.completeSentencesList}>
                {gameConfig.sentences.map((sentence, sentenceIndex) => (
                  <div
                    key={sentenceIndex}
                    className={styles.completeSentenceItem}
                  >
                    <div className={styles.completeSentenceNumber}>
                      {sentenceIndex + 1}.
                    </div>
                    <div className={styles.completeSentenceText}>
                      {completeSentences[sentenceIndex]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mode === "preview" && (
            <div className={styles.previewActions}>
              <Button
                variant="secondary"
                onClick={resetGame}
                className={styles.actionButton}
              >
                <FaUndo />
                Reiniciar
              </Button>
              <Button
                variant={showAnswers ? "danger" : "primary"}
                onClick={toggleAnswers}
                className={styles.actionButton}
              >
                <FaEye />
                {showAnswers ? "Ocultar" : "Mostrar"} Respuestas
              </Button>
            </div>
          )}

          {mode === "preview" && showAnswers && (
            <div className={styles.previewResults}>
              <div className={styles.resultsCard}>
                <div className={styles.resultsHeader}>
                  <FaCheckCircle className={styles.resultsIcon} />
                  <h6 className={styles.resultsTitle}>
                    Información de verificación
                  </h6>
                </div>
                <div className={styles.resultsContent}>
                  <div className={styles.statsSummary}>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Completadas:</span>
                      <span className={styles.statValue}>
                        {completedWords} / {totalMissingWords}
                      </span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>✅ Correctas:</span>
                      <span className={styles.statValue}>{correctAnswers}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>❌ Incorrectas:</span>
                      <span className={styles.statValue}>
                        {completedWords - correctAnswers}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.resultsFooter}>
                  <span className={styles.infoText}>
                    Esta información no será visualizada por el estudiante
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CompletarOracionGame;
