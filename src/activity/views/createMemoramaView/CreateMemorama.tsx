import { motion } from "framer-motion";
import { FaPuzzlePiece, FaArrowRight, FaUndo } from "react-icons/fa";
import Button from "../../../shared/components/Button/ButtonComponent";
import Card from "../../../shared/components/Card/CardComponent";
import GeneralConfiguration from "../../components/createMemorama/generalConfig/GeneralConfiguration";
import PairCreator from "../../components/createMemorama/pairCreator/PairCreator";
import MemoramaPreview from "../../components/createMemorama/memoramaPreview/MemoramaPreview";
import { useCreateMemorama } from "../../hooks/useCreateMemorama";
import styles from "./CreateMemorama.module.css";

const CreateMemorama = () => {
  const {
    loading,
    currentStep,
    config,
    errors,
    isFormValid,
    handleSubmit,
    handleBack,
    handleReset,
    getStepTitle,
    getCompletedPairs,
    getIncompletePairs,
    getEmptyPairs,
  } = useCreateMemorama();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <motion.div variants={itemVariants} className={styles.header}>
          <div className={styles.titleSection}>
            <FaPuzzlePiece className={styles.titleIcon} />
            <div>
              <h1 className={styles.title}>Crear Actividad: Memorama</h1>
              <p className={styles.subtitle}>
                {getStepTitle()} - Paso{" "}
                {currentStep === "config"
                  ? "1"
                  : currentStep === "pairs"
                  ? "2"
                  : "3"}{" "}
                de 3
              </p>
            </div>
          </div>

          {/* Indicador de pasos */}
          <div className={styles.stepIndicator}>
            <div
              className={`${styles.step} ${
                currentStep === "config" ? styles.active : styles.completed
              }`}
            >
              1
            </div>
            <div className={styles.stepLine}></div>
            <div
              className={`${styles.step} ${
                currentStep === "pairs"
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

        {/* Barra de progreso para el paso de parejas */}
        {currentStep === "pairs" && (
          <motion.div variants={itemVariants}>
            <Card className={styles.progressSection}>
              <div className={styles.progressInfo}>
                <span className={styles.progressText}>
                  Parejas completadas: {getCompletedPairs()} de{" "}
                  {config.totalPairs}
                  {getIncompletePairs() > 0 && (
                    <span className={styles.incompleteText}>
                      {" "}
                      • {getIncompletePairs()} incompleta
                      {getIncompletePairs() !== 1 ? "s" : ""}
                    </span>
                  )}
                  {getEmptyPairs() > 0 && (
                    <span className={styles.emptyText}>
                      {" "}
                      • {getEmptyPairs()} vacía
                      {getEmptyPairs() !== 1 ? "s" : ""}
                    </span>
                  )}
                </span>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${
                        (getCompletedPairs() / config.totalPairs) * 100
                      }%`,
                    }}
                  />
                  <div
                    className={styles.progressIncomplete}
                    style={{
                      width: `${
                        (getIncompletePairs() / config.totalPairs) * 100
                      }%`,
                      left: `${
                        (getCompletedPairs() / config.totalPairs) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Errores */}
        {errors.length > 0 && (
          <motion.div variants={itemVariants}>
            <Card className={styles.errorContainer}>
              <div className={styles.errorHeader}>
                <h4>⚠️ Errores encontrados ({errors.length})</h4>
                <p>
                  Debes corregir los siguientes problemas antes de continuar:
                </p>
              </div>
              {errors.map((error, index) => (
                <div key={index} className={styles.errorMessage}>
                  • {error}
                </div>
              ))}
            </Card>
          </motion.div>
        )}

        {/* Contenido principal */}
        <div className={styles.mainContent}>
          {currentStep === "config" && <GeneralConfiguration />}
          {currentStep === "pairs" && <PairCreator />}
          {currentStep === "preview" && <MemoramaPreview />}
        </div>

        {/* Footer */}
        <motion.div variants={itemVariants}>
          <Card className={styles.footer}>
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
                {currentStep !== "config" && (
                  <Button
                    variant="secondary"
                    onClick={handleBack}
                    disabled={loading}
                  >
                    Atrás
                  </Button>
                )}
                {currentStep === "preview" && (
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
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateMemorama;
