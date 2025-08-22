import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Tooltip from "../../../../shared/components/Tooltip/TooltipComponent";
import type { Sentence } from "../../../types/CompletarOracion.type";
import ActivityErrorContainer from "../../common/ActivityErrorContainer/ActivityErrorContainer";
import { useCreateCompletarOracion } from "../../../hooks/useCreateCompletarOracion";
import styles from "./WordSelector.module.css";

const WordSelector: React.FC = () => {
  const { errors, sentences, handleWordToggle } = useCreateCompletarOracion();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getMissingWordsCount = (sentence: Sentence) => {
    return sentence.words.filter((w) => w.isMissing).length;
  };

  const getVisibleWordsCount = (sentence: Sentence) => {
    return sentence.words.filter((w) => !w.isMissing).length;
  };

  const handleToggleWord = (sentenceIndex: number, wordIndex: number) => {
    const sentence = sentences[sentenceIndex];
    const word = sentence.words[wordIndex];
    const visibleWordsCount = getVisibleWordsCount(sentence);

    if (word.isMissing) {
      handleWordToggle(sentenceIndex, wordIndex);
    } else {
      if (visibleWordsCount > 1) {
        handleWordToggle(sentenceIndex, wordIndex);
      }
    }
  };

  const canHideWord = (sentence: Sentence, wordIndex: number) => {
    const word = sentence.words[wordIndex];
    const visibleWordsCount = getVisibleWordsCount(sentence);

    return word.isMissing || visibleWordsCount > 1;
  };

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.header}>
        <FaEye className={styles.headerIcon} />
        <div className={styles.headerContent}>
          <h3 className={styles.title}>
            Configuración de Oraciones
            <span className={styles.headerTooltip}>
              <Tooltip content="Debes seleccionar al menos una palabra por oración y dejar al menos una palabra visible" />
            </span>
          </h3>
          <p className={styles.headerDescription}>
            Haz clic en las palabras que quieres que los estudiantes completen.
          </p>
        </div>
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
                <span className={styles.visibleCount}>
                  {getVisibleWordsCount(sentence)} visible
                  {getVisibleWordsCount(sentence) !== 1 ? "s" : ""}
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
                  disabled={!canHideWord(sentence, wordIndex)}
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

      <ActivityErrorContainer errors={errors} itemVariants={itemVariants} />
    </motion.div>
  );
};

export default WordSelector;
