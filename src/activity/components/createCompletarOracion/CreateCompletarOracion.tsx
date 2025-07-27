import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPencilAlt, FaArrowRight, FaUndo } from "react-icons/fa";
import Button from "../../../shared/components/Button/ButtonComponent";
import SentenceConfig from "./components/sentenceConfig/SentenceConfig";
import WordSelector from "./components/wordSelector/WordSelector";
import CompletarOracionPreview from "./components/completarOracionPreview/CompletarOracionPreview";
import { useCompletarOracion } from "../../hooks/useCompletarOracion";
import type { Sentence } from "../../types/CompletarOracion.type";
import styles from "./CreateCompletarOracion.module.css";

const CreateCompletarOracion = () => {
  const { loading, registrarCompletarOracion } = useCompletarOracion();
  const navigate = useNavigate();
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [currentStep, setCurrentStep] = useState<
    "sentences" | "words" | "preview"
  >("sentences");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Validación del formulario
  useEffect(() => {
    const newErrors: string[] = [];

    // Validar cada oración
    sentences.forEach((sentence, index) => {
      const totalWords = sentence.words.length;
      const missingWords = sentence.words.filter((w) => w.isMissing).length;
      const visibleWords = totalWords - missingWords;

      // Validar cantidad de palabras (3-100)
      if (totalWords < 3) {
        newErrors.push(
          `La oración ${index + 1} debe tener al menos 3 palabras`
        );
      }
      if (totalWords > 100) {
        newErrors.push(
          `La oración ${index + 1} no puede tener más de 100 palabras`
        );
      }

      // Validar que hay al menos una palabra faltante (solo en vista previa)
      if (missingWords === 0 && currentStep === "preview") {
        newErrors.push(
          `Debe seleccionar al menos una palabra para ocultar en la oración ${
            index + 1
          }`
        );
      }

      // Validar que hay al menos una palabra visible
      if (visibleWords === 0 && currentStep !== "sentences") {
        newErrors.push(
          `Debe dejar al menos una palabra visible en la oración ${index + 1}`
        );
      }

      // Validar longitud de palabras (1-30 caracteres)
      sentence.words.forEach((word) => {
        if (word.word.length < 1 || word.word.length > 30) {
          newErrors.push(
            `La palabra "${word.word}" en la oración ${
              index + 1
            } debe tener entre 1 y 30 caracteres`
          );
        }
      });
    });

    setErrors(newErrors);
    setIsFormValid(newErrors.length === 0 && sentences.length > 0);
  }, [sentences, currentStep]);

  const handleAddSentence = (sentenceText: string) => {
    const words = sentenceText
      .trim()
      .split(/\s+/)
      .map((word, index) => ({
        word: word,
        wordOrder: index,
        isMissing: false,
      }));

    const newSentence: Sentence = { words };
    setSentences([...sentences, newSentence]);
  };

  const handleRemoveSentence = (index: number) => {
    setSentences(sentences.filter((_, i) => i !== index));
  };

  const handleEditSentence = (index: number, sentenceText: string) => {
    const words = sentenceText
      .trim()
      .split(/\s+/)
      .map((word, wordIndex) => ({
        word: word,
        wordOrder: wordIndex,
        isMissing: false,
      }));

    const updatedSentences = [...sentences];
    updatedSentences[index] = { words };
    setSentences(updatedSentences);
  };

  const handleToggleWordMissing = (
    sentenceIndex: number,
    wordIndex: number
  ) => {
    const updatedSentences = [...sentences];
    updatedSentences[sentenceIndex].words[wordIndex].isMissing =
      !updatedSentences[sentenceIndex].words[wordIndex].isMissing;
    setSentences(updatedSentences);
  };

  const handleNext = () => {
    if (currentStep === "sentences" && sentences.length > 0) {
      setCurrentStep("words");
    } else if (currentStep === "words" && isFormValid) {
      setCurrentStep("preview");
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      console.log("Oraciones a enviar:", sentences);
      // Crear solo los datos específicos del juego (CompletarOracionInterface)
      const gameData = {
        attempts: 5, // TODO: Cambiar interfaz de configurationActivity para que tenga attempts.
        sentences: sentences.map((sentence) => ({
          words: sentence.words.map((word) => ({
            word: word.word,
            wordOrder: word.wordOrder,
            isMissing: word.isMissing,
          })),
        })),
      };
      console.log("Datos del juego preparados:", gameData);
      await registrarCompletarOracion(gameData);
      alert("Actividad creada exitosamente");
      navigate("/dashboard/teacher/actividades/list");
    } catch (error) {
      console.error("Error al crear la actividad:", error);
      alert("Hubo un error al crear la actividad");
    }
  };

  const handleBack = () => {
    if (currentStep === "preview") {
      setCurrentStep("words");
    } else if (currentStep === "words") {
      setCurrentStep("sentences");
    }
  };

  const handleReset = () => {
    setSentences([]);
    setCurrentStep("sentences");
    setErrors([]);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case "sentences":
        return "Agregar Oraciones";
      case "words":
        return "Seleccionar Palabras a Ocultar";
      case "preview":
        return "Vista Previa";
      default:
        return "Crear Actividad";
    }
  };

  return (
    <>
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.titleSection}>
          <FaPencilAlt className={styles.titleIcon} />
          <div>
            <h1 className={styles.title}>Crear Actividad: Completar Oración</h1>
            <p className={styles.subtitle}>
              {getStepTitle()} - Paso{" "}
              {currentStep === "sentences"
                ? "1"
                : currentStep === "words"
                ? "2"
                : "3"}{" "}
              de 3
            </p>
          </div>
        </div>

        <div className={styles.stepIndicator}>
          <div
            className={`${styles.step} ${
              currentStep === "sentences" ? styles.active : styles.completed
            }`}
          >
            1
          </div>
          <div className={styles.stepLine}></div>
          <div
            className={`${styles.step} ${
              currentStep === "words"
                ? styles.active
                : currentStep === "preview"
                ? styles.completed
                : ""
            }`}
          >
            2
          </div>
          <div className={styles.stepLine}></div>
          <div
            className={`${styles.step} ${
              currentStep === "preview" ? styles.active : ""
            }`}
          >
            3
          </div>
        </div>
      </motion.div>

      {errors.length > 0 && (
        <motion.div variants={itemVariants} className={styles.errorContainer}>
          {errors.map((error, index) => (
            <div key={index} className={styles.errorMessage}>
              {error}
            </div>
          ))}
        </motion.div>
      )}

      <div className={styles.content}>
        {currentStep === "sentences" && (
          <SentenceConfig
            sentences={sentences}
            onAddSentence={handleAddSentence}
            onRemoveSentence={handleRemoveSentence}
            onEditSentence={handleEditSentence}
          />
        )}

        {currentStep === "words" && (
          <WordSelector
            sentences={sentences}
            onToggleWordMissing={handleToggleWordMissing}
          />
        )}

        {currentStep === "preview" && (
          <CompletarOracionPreview sentences={sentences} />
        )}
      </div>

      <motion.div variants={itemVariants} className={styles.footer}>
        <div className={styles.footerActions}>
          <Button
            variant="secondary"
            onClick={handleReset}
            className={styles.resetButton}
            disabled={loading}
          >
            <FaUndo />
            Reiniciar
          </Button>

          <div className={styles.navigationButtons}>
            {currentStep !== "sentences" && (
              <Button
                variant="secondary"
                onClick={handleBack}
                disabled={loading}
              >
                Atrás
              </Button>
            )}

            {currentStep !== "preview" ? (
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={
                  !sentences.length || (currentStep === "words" && !isFormValid)
                }
                className={styles.nextButton}
              >
                <FaArrowRight />
                {currentStep === "sentences"
                  ? "Seleccionar Palabras"
                  : "Vista Previa"}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={!isFormValid || loading}
                className={styles.nextButton}
              >
                <FaArrowRight />
                {loading ? "Creando..." : "Crear Actividad"}
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CreateCompletarOracion;
