import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPuzzlePiece,
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaTrash,
  FaEdit,
  FaExclamationTriangle,
  FaImage,
  FaUpload,
} from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Input from "../../../../shared/components/Input/InputComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import type { MemoramaPair } from "../../../types/Memorama.type";
import { useCreateMemorama } from "../../../hooks/useCreateMemorama";
import styles from "./PairCreator.module.css";

const PairCreator: React.FC = () => {
  const {
    pairs,
    currentPairIndex,
    config,
    pairErrors,
    handlePairSave,
    handleNextPair,
    handlePreviousPair,
    handleGoToPair,
    handleDeletePair,
    getPairStatus,
    setPairErrors,
    clearPairErrors,
  } = useCreateMemorama();

  const [formData, setFormData] = useState<MemoramaPair>(
    pairs[currentPairIndex]
  );

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Función para validar la pareja actual
  const validateCurrentPair = (
    pairData: MemoramaPair
  ): { [key: string]: string } => {
    const validationErrors: { [key: string]: string } = {};

    // Validar concepto
    if (!pairData.concept.trim()) {
      validationErrors.concept = "El concepto es obligatorio";
    } else if (pairData.concept.length > 50) {
      validationErrors.concept =
        "El concepto no puede tener más de 50 caracteres";
    } else {
      // Validate concept pattern (only letters, spaces, accents)
      const conceptPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      if (!conceptPattern.test(pairData.concept)) {
        validationErrors.concept =
          "El concepto solo puede contener letras y espacios";
      }
    }

    // Validar imagen
    if (!pairData.image) {
      validationErrors.image = "La imagen es obligatoria";
    }

    return validationErrors;
  };

  // Actualizar formData cuando cambie la pareja
  useEffect(() => {
    setFormData(pairs[currentPairIndex]);
  }, [pairs, currentPairIndex]);

  const handleConceptChange = (value: string) => {
    setFormData((prev) => ({ ...prev, concept: value }));
  };

  const handleImageChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSave = () => {
    handlePairSave(formData);
    // Validar y guardar errores
    const currentErrors = validateCurrentPair(formData);
    if (Object.keys(currentErrors).length > 0) {
      setPairErrors(currentPairIndex, currentErrors);
    } else {
      clearPairErrors(currentPairIndex);
    }
  };

  const handleSaveAndNext = () => {
    handleSave();
    // Si es la última pareja, validar antes de continuar
    if (currentPairIndex === config.totalPairs - 1) {
      const incompletePairs = pairs
        .map((pair, index) => ({
          pair,
          index,
          status: getPairStatus(pair),
        }))
        .filter((item) => item.status !== "complete");

      if (incompletePairs.length > 0) {
        const incompleteNumbers = incompletePairs
          .map((item) => item.index + 1)
          .join(", ");
        alert(
          `No puedes finalizar hasta completar todas las parejas. Parejas incompletas: ${incompleteNumbers}`
        );
        return;
      }
    }
    handleNextPair();
  };

  const handleSaveAndPrevious = () => {
    handleSave();
    handlePreviousPair();
  };

  const handleSaveAndGoToPair = (index: number) => {
    if (index !== currentPairIndex) {
      handleSave();
      handleGoToPair(index);
    }
  };

  // Función debug para llenar automáticamente
  const handleDebugFill = async () => {
    try {
      const response = await fetch("/preview.png");
      const blob = await response.blob();
      const file = new File([blob], "preview.png", {
        type: blob.type || "image/png",
      });

      const debugPair: MemoramaPair = {
        concept: `Concepto`,
        image: file,
      };
      setFormData(debugPair);
    } catch (error) {
      const debugPair: MemoramaPair = {
        concept: `Concepto`,
        image: null,
      };
      setFormData(debugPair);
    }
  };

  const currentErrors = pairErrors[currentPairIndex] || {};
  const hasErrors = Object.keys(currentErrors).length > 0;
  const currentStatus = getPairStatus(formData);

  return (
    <motion.div variants={itemVariants} className={styles.container}>
      {/* Navegador de parejas */}
      <Card className={styles.navigatorCard}>
        <div className={styles.navigatorHeader}>
          <h4 className={styles.navigatorTitle}>Navegador de Parejas</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDebugFill}
            className={styles.debugButton}
          >
            DEBUG
          </Button>
        </div>
        <div className={styles.questionTabs}>
          {pairs.map((pair, index) => {
            const status = getPairStatus(pair);
            const hasTabErrors =
              pairErrors[index] && Object.keys(pairErrors[index]).length > 0;

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleSaveAndGoToPair(index)}
                className={`${styles.questionTab} ${
                  index === currentPairIndex ? styles.active : ""
                } ${styles[status]} ${hasTabErrors ? styles.hasErrors : ""}`}
                title={
                  hasTabErrors
                    ? `Pareja ${index + 1} tiene errores`
                    : `Pareja ${index + 1}`
                }
              >
                <span className={styles.tabNumber}>{index + 1}</span>
                {status === "complete" && !hasTabErrors && (
                  <FaCheck className={styles.tabCheck} />
                )}
                {(status === "incomplete" || hasTabErrors) && (
                  <FaExclamationTriangle className={styles.tabWarning} />
                )}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Indicador de estado */}
      {hasErrors && (
        <Card className={styles.statusIndicator}>
          <div className={styles.statusHeader}>
            <FaExclamationTriangle className={styles.statusIcon} />
            <h4 className={styles.statusTitle}>
              Errores encontrados en esta pareja
            </h4>
          </div>
          <div className={styles.statusMessage}>
            Corrige los siguientes errores para completar esta pareja:
          </div>
          <ul className={styles.errorList}>
            {Object.entries(currentErrors).map(([field, error]) => (
              <li key={field} className={styles.errorItem}>
                {error}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {currentStatus === "complete" && !hasErrors && (
        <Card className={styles.successIndicator}>
          <div className={styles.successHeader}>
            <FaCheck className={styles.successIcon} />
            <h4 className={styles.successTitle}>Pareja completa</h4>
          </div>
          <div className={styles.successMessage}>
            Esta pareja está correctamente configurada y lista para usar.
          </div>
        </Card>
      )}

      {/* Formulario de pareja */}
      <Card className={styles.questionForm}>
        <div className={styles.questionHeader}>
          <div className={styles.questionInfo}>
            <FaPuzzlePiece className={styles.questionIcon} />
            <div>
              <h3 className={styles.questionTitle}>
                Pareja {currentPairIndex + 1} de {config.totalPairs}
              </h3>
            </div>
          </div>
          {pairs.length > 4 && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDeletePair(currentPairIndex)}
              className={styles.deleteButton}
            >
              <FaTrash />
              Eliminar
            </Button>
          )}
        </div>

        <div className={styles.formContent}>
          {/* Campo de concepto */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Concepto *
              <span className={styles.labelHint}>Máximo 50 caracteres</span>
            </label>
            <Input
              value={formData.concept}
              onChange={(e) => handleConceptChange(e.target.value)}
              error={currentErrors.concept}
              placeholder="Escribe el concepto aquí..."
              maxLength={50}
              className={styles.input}
            />
            <div className={styles.charCount}>
              {formData.concept.length}/50 caracteres
            </div>
          </div>

          {/* Campo de imagen */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Imagen *
              <span className={styles.labelHint}>
                Sube una imagen desde tu computadora
              </span>
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                handleImageChange(file);
              }}
              error={currentErrors.image}
              className={styles.input}
            />

            {/* Preview de imagen */}
            {formData.image && (
              <div className={styles.imagePreview}>
                <div className={styles.previewHeader}>
                  <FaImage className={styles.previewIcon} />
                  <span className={styles.previewLabel}>Vista previa:</span>
                  <span className={styles.fileName}>{formData.image.name}</span>
                </div>
                <div className={styles.previewContainer}>
                  <img
                    src={
                      URL.createObjectURL(formData.image) || "/placeholder.svg"
                    }
                    alt={formData.concept || "Vista previa"}
                    className={styles.previewImage}
                  />
                </div>
              </div>
            )}

            <div className={styles.fileHint}>
              <FaUpload />
              <span>Formatos soportados: JPG, PNG, GIF (máximo 5MB)</span>
            </div>
          </div>
        </div>

        {/* Botones de navegación */}
        <div className={styles.navigationButtons}>
          <Button
            variant="secondary"
            onClick={handleSaveAndPrevious}
            disabled={currentPairIndex === 0}
            className={styles.navButton}
          >
            <FaArrowLeft />
            Anterior
          </Button>

          <Button
            variant="outline"
            onClick={handleSave}
            className={styles.saveButton}
          >
            <FaEdit />
            Guardar
          </Button>

          <Button
            variant="primary"
            onClick={handleSaveAndNext}
            className={styles.navButton}
            disabled={
              currentPairIndex === config.totalPairs - 1 &&
              pairs.some((pair) => getPairStatus(pair) !== "complete")
            }
          >
            {currentPairIndex === config.totalPairs - 1
              ? "Finalizar"
              : "Siguiente"}
            <FaArrowRight />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default PairCreator;
