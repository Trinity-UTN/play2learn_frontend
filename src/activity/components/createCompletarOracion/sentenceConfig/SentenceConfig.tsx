import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import type { Sentence } from "../../../types/CompletarOracion.type";
import styles from "./SentenceConfig.module.css";

interface SentenceConfigProps {
  sentences: Sentence[];
  onAddSentence: (sentence: string) => void;
  onRemoveSentence: (index: number) => void;
  onEditSentence: (index: number, sentence: string) => void;
}

const SentenceConfig: React.FC<SentenceConfigProps> = ({
  sentences,
  onAddSentence,
  onRemoveSentence,
  onEditSentence,
}) => {
  const [newSentence, setNewSentence] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [newSentenceError, setNewSentenceError] = useState("");

  const handleAddSentence = () => {
    if (!newSentence.trim()) return;

    // Validar la oración antes de agregarla
    const words = newSentence.trim().split(/\s+/);
    const wordCount = words.length;

    // Validar cantidad de palabras
    if (wordCount < 3) {
      setNewSentenceError("La oración debe tener al menos 3 palabras");
      return;
    }
    if (wordCount > 100) {
      setNewSentenceError("La oración no puede tener más de 100 palabras");
      return;
    }

    // Validar longitud de palabras
    const invalidWord = words.find(
      (word) => word.length < 1 || word.length > 30
    );
    if (invalidWord) {
      setNewSentenceError(
        `La palabra "${invalidWord}" debe tener entre 1 y 30 caracteres`
      );
      return;
    }

    // Si pasa todas las validaciones, agregar la oración
    onAddSentence(newSentence.trim());
    setNewSentence("");
    setNewSentenceError("");
  };

  const handleStartEdit = (index: number) => {
    const sentence = sentences[index].words.map((w) => w.word).join(" ");
    setEditingText(sentence);
    setEditingIndex(index);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editingText.trim()) {
      onEditSentence(editingIndex, editingText.trim());
      setEditingIndex(null);
      setEditingText("");
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingText("");
  };

  const getWordCount = (sentence: Sentence) => {
    return sentence.words.length;
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddSentence();
    }
  };

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      <div className={styles.addSection}>
        <h3 className={styles.sectionTitle}>Agregar Nueva Oración</h3>
        <div className={styles.inputGroup}>
          <textarea
            value={newSentence}
            onChange={(e) => {
              setNewSentence(e.target.value);
              if (newSentenceError) setNewSentenceError("");
            }}
            onKeyPress={handleKeyPress}
            placeholder="Escribe una oración que los estudiantes deberán completar... (Presiona Enter para agregar)"
            className={`${styles.sentenceInput} ${
              newSentenceError ? styles.error : ""
            }`}
            rows={3}
          />
          {newSentenceError && (
            <div className={styles.errorMessage}>{newSentenceError}</div>
          )}
          <Button
            variant="primary"
            onClick={handleAddSentence}
            disabled={!newSentence.trim()}
            className={styles.addButton}
          >
            <FaPlus />
            Agregar Oración
          </Button>
        </div>
        <p className={styles.hint}>
          Las oraciones deben tener entre 3 y 100 palabras. Las palabras deben
          tener entre 1 y 30 caracteres.
        </p>
      </div>

      {sentences.length > 0 && (
        <div className={styles.sentencesList}>
          <h3 className={styles.sectionTitle}>
            Oraciones Agregadas ({sentences.length})
          </h3>

          {sentences.map((sentence, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={styles.sentenceCardCompact}
            >
              <div className={styles.sentenceHeaderCompact}>
                <span className={styles.sentenceNumber}>#{index + 1}</span>
                <div className={styles.sentenceActions}>
                  <Button
                    variant="secondary"
                    onClick={() => handleStartEdit(index)}
                    size="sm"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onRemoveSentence(index)}
                    size="sm"
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>

              {editingIndex === index ? (
                <div className={styles.editMode}>
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className={styles.editInput}
                    rows={2}
                  />
                  <div className={styles.editActions}>
                    <Button
                      variant="primary"
                      onClick={handleSaveEdit}
                      disabled={!editingText.trim()}
                      size="sm"
                    >
                      <FaSave />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleCancelEdit}
                      size="sm"
                    >
                      <FaTimes />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className={styles.sentenceTextCompact}>
                  {sentence.words.map((w) => w.word).join(" ")}
                  <span
                    className={`${styles.wordCountBadge} ${
                      getWordCount(sentence) < 3 || getWordCount(sentence) > 100
                        ? styles.invalid
                        : styles.valid
                    }`}
                  >
                    {getWordCount(sentence)} palabras
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {sentences.length === 0 && (
        <div className={styles.emptyState}>
          <FaPlus className={styles.emptyIcon} />
          <h4>No hay oraciones agregadas</h4>
          <p>
            Agrega al menos una oración para continuar con la configuración.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default SentenceConfig;
