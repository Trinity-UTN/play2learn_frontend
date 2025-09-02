import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCog,
  FaPlus,
  FaPlusCircle,
  FaTrash,
  FaQuestionCircle,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Tooltip from "../../../../shared/components/Tooltip/TooltipComponent";
import { useCreateCompletarOracion } from "../../../hooks/useCreateCompletarOracion";
import ActivityFormError from "../../common/ActivityFormError/ActivityFormError";
import styles from "./GeneralConfiguration.module.css";

const GeneralConfiguration = () => {
  const {
    sentences,
    handleConfigSubmit,
    handleAddSentence,
    handleEditSentence,
    handleRemoveSentence,
  } = useCreateCompletarOracion();

  const [currentSentence, setCurrentSentence] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (sentences.length < 1 || sentences.length > 20) {
      newErrors.sentences = "Debes agregar entre 1 y 20 oraciones";
    }

    sentences.forEach((sentence, index) => {
      if (sentence.words.length < 3 || sentence.words.length > 300) {
        newErrors[`sentence_${index}`] =
          "Cada oración debe tener entre 3 y 300 palabras";
      }

      sentence.words.forEach((word, wordIndex) => {
        if (!word.word || word.word.trim().length === 0) {
          newErrors[
            `word_${index}_${wordIndex}`
          ] = `En la oración ${index}, la palabra ${word} no puede estar vacía`;
        }
        if (word.word && word.word.length >= 30) {
          newErrors[`word_${index}_${wordIndex}`] = `En la oración ${
            index + 1
          }, la palabra ${word.word} no puede tener más de 30 caracteres`;
        }
      });
    });

    const validSentences = sentences.filter((s) => s.words.length >= 3);
    if (validSentences.length === 0) {
      newErrors.general = "Debe agregar al menos una oración válida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addSentence = () => {
    if (currentSentence.trim()) {
      const words = currentSentence
        .trim()
        .split(/\s+/)
        .map((word, index) => ({
          word: word.trim(),
          wordOrder: index,
          isMissing: false,
        }));

      if (words.length >= 3 && words.length <= 300) {
        handleAddSentence(currentSentence.trim());
        setCurrentSentence("");
        setErrors((prev) => ({ ...prev, currentSentence: "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          currentSentence: "La oración debe tener entre 3 y 300 palabras",
        }));
      }
    }
  };

  const startEdit = (index: number) => {
    const sentence = sentences[index].words.map((w) => w.word).join(" ");
    setEditingText(sentence);
    setEditingIndex(index);
  };

  const saveEdit = () => {
    if (editingIndex !== null && editingText.trim()) {
      handleEditSentence(editingIndex, editingText.trim());
      setEditingIndex(null);
      setEditingText("");
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingText("");
  };

  const removeSentence = (index: number) => {
    handleRemoveSentence(index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const validSentences = sentences.filter((s) => s.words.length >= 3);
      handleConfigSubmit(validSentences);
    }
  };

  const handleDismissError = (key: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.header}>
        <FaCog className={styles.headerIcon} />
        <div className={styles.headerContent}>
          <h3 className={styles.title}>Configuración de Actividad</h3>
          <p className={styles.description}>
            Escribe las oraciones que los estudiantes deberán completar
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h4 className={styles.sectionTitle}>
                <FaPlusCircle className={styles.sectionIcon} />
                Agregar oración
                <span className={styles.sectionTooltip}>
                  <Tooltip content="El proceso de esconder palabras se realiza en el próximo paso" />
                </span>
              </h4>
            </div>
            <p className={styles.sectionDescription}>
              Cada oración debe tener entre 3 y 300 palabras
            </p>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              id="currentSentence"
              value={currentSentence}
              onChange={(e) => setCurrentSentence(e.target.value)}
              placeholder="Escribe una oración..."
              className={`${styles.input} ${
                errors.currentSentence ? styles.inputError : ""
              }`}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addSentence())
              }
            />
            <Button
              type="button"
              onClick={addSentence}
              variant="primary"
              className={styles.addButton}
            >
              <FaPlus />
            </Button>
          </div>
          {errors.currentSentence && (
            <span className={styles.errorText}>{errors.currentSentence}</span>
          )}
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h4 className={styles.sectionTitle}>
                <FaQuestionCircle className={styles.sectionIcon} />
                Oraciones agregadas ({sentences.length} / 20)
                <span className={styles.sectionTooltip}>
                  <Tooltip content="Puedes agregar entre 1 y 20 oraciones" />
                </span>
              </h4>
            </div>
          </div>
          <div className={styles.sentencesList}>
            {sentences.map((sentence, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={styles.sentenceItem}
              >
                {editingIndex === index ? (
                  <div className={styles.editMode}>
                    <textarea
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className={styles.editInput}
                      rows={2}
                      placeholder="Edita la oración..."
                    />
                    <div className={styles.editActions}>
                      <Button
                        type="button"
                        onClick={saveEdit}
                        variant="primary"
                        className={styles.saveButton}
                        disabled={!editingText.trim()}
                      >
                        <FaSave />
                      </Button>
                      <Button
                        type="button"
                        onClick={cancelEdit}
                        variant="secondary"
                        className={styles.cancelButton}
                      >
                        <FaTimes />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={styles.sentenceContent}>
                      <span className={styles.sentenceNumber}>{index + 1}</span>
                      <span className={styles.sentenceText}>
                        {sentence.words.map((w) => w.word).join(" ")}
                      </span>
                      <span className={styles.wordCount}>
                        ({sentence.words.length} palabras)
                      </span>
                    </div>
                    <div className={styles.sentenceActions}>
                      <Button
                        type="button"
                        onClick={() => startEdit(index)}
                        variant="primary"
                        className={styles.editButton}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        type="button"
                        onClick={() => removeSentence(index)}
                        variant="danger"
                        className={styles.removeButton}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}

            {sentences.length === 0 && (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📝</div>
                <p>No hay oraciones agregadas aún</p>
              </div>
            )}
          </div>
        </div>

        <ActivityFormError
          errors={errors}
          onDismiss={handleDismissError}
          showToaster
        />
      </form>
    </motion.div>
  );
};

export default GeneralConfiguration;
