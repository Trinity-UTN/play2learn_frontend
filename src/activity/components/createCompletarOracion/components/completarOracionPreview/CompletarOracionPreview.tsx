import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaRedo } from "react-icons/fa";
import Button from "../../../../../shared/components/Button/ButtonComponent";
import type { Sentence } from "../../../../types/CompletarOracion.type";
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

  // Generar oraciones completas cuando se muestran las respuestas
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

  const resetPreview = () => {
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
      <div className={styles.previewHeader}>
        <h3 className={styles.sectionTitle}>Vista Previa de la Actividad</h3>
        <p className={styles.description}>
          Así es como verán la actividad tus estudiantes. Puedes probar
          completando los espacios en blanco.
        </p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{sentences.length}</span>
            <span className={styles.statLabel}>
              Oración{sentences.length !== 1 ? "es" : ""}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{getTotalMissingWords()}</span>
            <span className={styles.statLabel}>
              Palabra{getTotalMissingWords() !== 1 ? "s" : ""} a completar
            </span>
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
          <FaPlay />
          {showAnswers ? "Ocultar" : "Mostrar"} Respuestas
        </Button>
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

      <div className={styles.previewFooter}>
        <div className={styles.instructions}>
          <h5>Instrucciones para los estudiantes:</h5>
          <ul>
            <li>Lee cada oración cuidadosamente</li>
            <li>Completa los espacios en blanco con las palabras correctas</li>
            <li>Asegúrate de que las oraciones tengan sentido completo</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default CompletarOracionPreview;
