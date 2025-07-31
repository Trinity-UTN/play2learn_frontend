import { motion } from "framer-motion";
import { FaQuestionCircle, FaArrowRight, FaUndo } from "react-icons/fa";
import Button from "../../../shared/components/Button/ButtonComponent";
import GeneralConfiguration from "../../components/preguntados/generalConfig/GeneralConfiguration";
import QuestionCreator from "../../components/preguntados/questionCreator/QuestionCreator";
import PreguntadosPreview from "../../components/preguntados/preguntadosPreview/PreguntadosPreview";
import { useCreatePreguntados } from "../../hooks/useCreatePreguntados";
import styles from "./CreatePreguntados.module.css";

const CreatePreguntados = () => {
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
    getCompletedQuestions,
    getIncompleteQuestions,
    getEmptyQuestions,
  } = useCreatePreguntados();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.titleSection}>
          <FaQuestionCircle className={styles.titleIcon} />
          <div>
            <h1 className={styles.title}>Crear Actividad: Preguntados</h1>
            <p className={styles.subtitle}>
              {getStepTitle()} - Paso{" "}
              {currentStep === "config"
                ? "1"
                : currentStep === "questions"
                ? "2"
                : "3"}{" "}
              de 3
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
              currentStep === "questions"
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

      {currentStep === "questions" && (
        <motion.div variants={itemVariants} className={styles.progressSection}>
          <div className={styles.progressInfo}>
            <span className={styles.progressText}>
              Preguntas completadas: {getCompletedQuestions()} de{" "}
              {config.totalQuestions}
              {getIncompleteQuestions() > 0 && (
                <span className={styles.incompleteText}>
                  {" "}
                  • {getIncompleteQuestions()} incompleta
                  {getIncompleteQuestions() !== 1 ? "s" : ""}
                </span>
              )}
              {getEmptyQuestions() > 0 && (
                <span className={styles.emptyText}>
                  {" "}
                  • {getEmptyQuestions()} vacía
                  {getEmptyQuestions() !== 1 ? "s" : ""}
                </span>
              )}
            </span>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${
                    (getCompletedQuestions() / config.totalQuestions) * 100
                  }%`,
                }}
              />
              <div
                className={styles.progressIncomplete}
                style={{
                  width: `${
                    (getIncompleteQuestions() / config.totalQuestions) * 100
                  }%`,
                  left: `${
                    (getCompletedQuestions() / config.totalQuestions) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}

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

        {currentStep === "questions" && <QuestionCreator />}

        {currentStep === "preview" && <PreguntadosPreview />}
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

export default CreatePreguntados;
