import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEye, FaPlay, FaUndo } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Tooltip from "../../../../shared/components/Tooltip/TooltipComponent";
import type { Sentence } from "../../../types/CompletarOracion.type";
import styles from "./CompletarOracionPreview.module.css";

interface CompletarOracionPreviewProps {
  sentences: Sentence[];
}

const CompletarOracionPreview: React.FC<CompletarOracionPreviewProps> = ({
  sentences,
}) => {
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [completeSentences, setCompleteSentences] = useState<string[]>([]);

  useEffect(() => {
    if (showAnswers) {
      const complete = sentences.map((sentence) =>
        sentence.words.map((word) => word.word).join(" ")
      );
      setCompleteSentences(complete);
    }
  }, [showAnswers, sentences]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleInputChange = (
    sentenceIndex: number,
    wordIndex: number,
    value: string
  ) => {
    const key = `${sentenceIndex}-${wordIndex}`;
    setUserAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowAnswers(false);
  };

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  const getTotalMissingWords = () => {
    return sentences.reduce((total, sentence) => {
      return total + sentence.words.filter((w) => w.isMissing).length;
    }, 0);
  };

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h4 className={styles.title}>
              <FaEye className={styles.headerIcon} />
              Vista Previa de Actividad
              <span className={styles.tooltip}>
                <Tooltip content="Puedes probar completando los espacios en blanco." />
              </span>
            </h4>
          </div>
          <p className={styles.description}>
            Esta es una simulación de cómo los estudiantes experimentarán la
            actividad
          </p>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statIcon}>📝</span>
            <div>
              <span className={styles.statLabel}>
                Oración{sentences.length !== 1 ? "es" : ""}
              </span>
              <span className={styles.statValue}>{sentences.length}</span>
            </div>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon}>🎯</span>
            <div>
              <span className={styles.statLabel}>
                Palabra{getTotalMissingWords() !== 1 ? "s" : ""} a completar
              </span>
              <span className={styles.statValue}>{getTotalMissingWords()}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.activityContainer}>
        <div className={styles.activityHeader}>
          <h4>Completa las siguientes oraciones:</h4>
        </div>

        {sentences.map((sentence, sentenceIndex) => (
          <motion.div
            key={sentenceIndex}
            variants={itemVariants}
            className={styles.sentenceContainer}
          >
            <div className={styles.sentenceNumber}>{sentenceIndex + 1}.</div>
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
                            ? userAnswers[
                                `${sentenceIndex}-${wordIndex}`
                              ]?.toLowerCase() === word.word.toLowerCase()
                              ? styles.correct
                              : styles.incorrect
                            : ""
                        }`}
                        placeholder="____"
                        disabled={showAnswers}
                      />
                      {showAnswers && (
                        <div className={styles.correctAnswer}>{word.word}</div>
                      )}
                    </div>
                  ) : (
                    <span className={styles.visibleWord}>{word.word}</span>
                  )}
                  {wordIndex < sentence.words.length - 1 && " "}
                </span>
              ))}
            </div>

            {showAnswers && (
              <div className={styles.completeSentence}>
                <strong>Respuesta completa:</strong>{" "}
                {completeSentences[sentenceIndex]}
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <div className={styles.previewControls}>
        <Button
          variant="secondary"
          onClick={handleReset}
          className={styles.resetButton}
        >
          <FaUndo /> Reiniciar Simulación
        </Button>
        <Button
          variant={showAnswers ? "danger" : "primary"}
          onClick={toggleAnswers}
          className={styles.resetButton}
        >
          <FaPlay />
          {showAnswers ? "Ocultar" : "Mostrar"} Respuestas
        </Button>
      </div>
    </motion.div>
  );
};

export default CompletarOracionPreview;
