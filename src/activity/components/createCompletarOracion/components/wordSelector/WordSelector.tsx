import type React from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../../../../shared/components/Button/ButtonComponent";
import type { Sentence } from "../../../../types/CompletarOracion.type";
import styles from "./WordSelector.module.css";

interface WordSelectorProps {
  sentences: Sentence[];
  onToggleWordMissing: (sentenceIndex: number, wordIndex: number) => void;
}

const WordSelector: React.FC<WordSelectorProps> = ({
  sentences,
  onToggleWordMissing,
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getMissingWordsCount = (sentence: Sentence) => {
    return sentence.words.filter((w) => w.isMissing).length;
  };

  const handleToggleWord = (sentenceIndex: number, wordIndex: number) => {
    const sentence = sentences[sentenceIndex];
    const word = sentence.words[wordIndex];

    // Si está intentando ocultar una palabra visible
    if (!word.isMissing) {
      onToggleWordMissing(sentenceIndex, wordIndex);
    } else {
      // Si está intentando mostrar una palabra oculta, verificar que no sea la única visible
      const visibleWords = sentence.words.filter((w) => !w.isMissing).length;
      if (visibleWords > 1) {
        onToggleWordMissing(sentenceIndex, wordIndex);
      }
      // Si es la única palabra visible, no hacer nada (no permitir ocultarla)
    }
  };

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.instructions}>
        <h3 className={styles.sectionTitle}>Seleccionar Palabras a Ocultar</h3>
        <p className={styles.description}>
          Haz clic en las palabras que quieres que los estudiantes completen.
          Debes seleccionar al menos una palabra por oración y dejar al menos
          una palabra visible.
        </p>
      </div>

      <div className={styles.sentencesList}>
        {sentences.map((sentence, sentenceIndex) => (
          <motion.div
            key={sentenceIndex}
            variants={itemVariants}
            className={styles.sentenceCard}
          >
            <div className={styles.sentenceHeader}>
              <span className={styles.sentenceNumber}>
                Oración {sentenceIndex + 1}
              </span>
              <div className={styles.stats}>
                <span
                  className={`${styles.missingCount} ${
                    getMissingWordsCount(sentence) === 0
                      ? styles.warning
                      : styles.valid
                  }`}
                >
                  {getMissingWordsCount(sentence)} palabra
                  {getMissingWordsCount(sentence) !== 1 ? "s" : ""} oculta
                  {getMissingWordsCount(sentence) !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <div className={styles.wordsContainer}>
              {sentence.words.map((word, wordIndex) => (
                <Button
                  key={wordIndex}
                  variant={word.isMissing ? "primary" : "secondary"}
                  onClick={() => handleToggleWord(sentenceIndex, wordIndex)}
                  className={`${styles.wordButton} ${
                    word.isMissing ? styles.hiddenWord : styles.visibleWord
                  }`}
                  disabled={
                    !word.isMissing &&
                    sentence.words.filter((w) => !w.isMissing).length === 1
                  }
                >
                  <span className={styles.wordText}>{word.word}</span>
                  {word.isMissing ? (
                    <FaEyeSlash className={styles.wordIcon} />
                  ) : (
                    <FaEye className={styles.wordIcon} />
                  )}
                </Button>
              ))}
            </div>

            {getMissingWordsCount(sentence) === 0 && (
              <div className={styles.warningMessage}>
                ⚠️ Debes seleccionar al menos una palabra para ocultar en esta
                oración
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.visible}`}></div>
          <span>Palabra visible</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.hidden}`}></div>
          <span>Palabra oculta</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WordSelector;
