import { motion } from "framer-motion";
import { FaFileAlt, FaArrowRight, FaUndo } from "react-icons/fa";
import Button from "../../../shared/components/Button/ButtonComponent";
import GeneralConfiguration from "../../components/createNoLudica/generalConfig/GeneralConfiguration";
import NoLudicaPreview from "../../components/createNoLudica/noLudicaPreview/NoLudicaPreview";
import { useCreateNoLudica } from "../../hooks/useCreateNoLudica";
import styles from "./CreateNoLudica.module.css";

const CreateNoLudica = () => {
  const {
    currentStep,
    errors,
    loading,
    isFormValid,
    handleSubmit,
    handleBack,
    handleReset,
    getStepTitle,
  } = useCreateNoLudica();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.titleSection}>
          <FaFileAlt className={styles.titleIcon} />
          <div>
            <h1 className={styles.title}>Crear Actividad: No Lúdica</h1>
            <p className={styles.subtitle}>
              {getStepTitle()} - Paso {currentStep === "config" ? "1" : "2"} de
              2
            </p>
          </div>
        </div>

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
              currentStep === "preview" ? styles.active : ""
            }`}
          >
            2
          </div>
        </div>
      </motion.div>

      {errors.length > 0 && (
        <motion.div variants={itemVariants} className={styles.errorContainer}>
          <div className={styles.errorHeader}>
            <h4>⚠️ Errores encontrados ({errors.length})</h4>
            <p>Debes corregir los siguientes problemas antes de continuar:</p>
          </div>
          {errors.map((error, index) => (
            <div key={index} className={styles.errorMessage}>
              • {error}
            </div>
          ))}
        </motion.div>
      )}

      <div className={styles.content}>
        {currentStep === "config" && <GeneralConfiguration />}

        {currentStep === "preview" && <NoLudicaPreview />}
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
      </motion.div>
    </>
  );
};

export default CreateNoLudica;
