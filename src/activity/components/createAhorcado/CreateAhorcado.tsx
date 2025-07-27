import styles from "./CreateAhorcado.module.css";
import { motion } from "framer-motion";
import { FaGamepad, FaEye, FaEdit, FaSave, FaUndo } from "react-icons/fa";
import Button from "../../../shared/components/Button/ButtonComponent";
import AhorcadoWordConfig from "./components/ahorcadoWordConfig/AhorcadoWordConfig";
import AhorcadoDificultySelector from "./components/ahorcadoDifficultySelector/AhorcadoDificultySelector";
import AhorcadoAttemptsSelector from "./components/ahorcadoAttemptsSelector/AhorcadoAttemptsSelector";
import AhorcadoPreview from "./components/ahorcadoPreview/AhorcadoPreview";
import { useEffect, useState } from "react";
import { useCreateAhorcado } from "./CreateAhorcadoContext";

const CreateAhorcado = () => {
  const {
    ahorcadoData,
    errors,
    isPreviewMode,
    setIsPreviewMode,
    handleSave,
    handleReset,
    itemVariants,
  } = useCreateAhorcado();

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const formValid = !!ahorcadoData.word && Object.keys(errors).length === 0;
    setIsFormValid(formValid);
  }, [ahorcadoData.word, errors, isPreviewMode]);

  return (
    <>
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.titleSection}>
          <FaGamepad className={styles.titleIcon} />
          <div>
            <h1 className={styles.title}>Crear Juego del Ahorcado</h1>
            <p className={styles.subtitle}>
              Configura una nueva actividad de ahorcado para tus estudiantes
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            variant={isPreviewMode ? "secondary" : "primary"}
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={styles.toggleButton}
          >
            {isPreviewMode ? <FaEdit /> : <FaEye />}
            {isPreviewMode ? "Editar" : "Vista Previa"}
          </Button>
        </div>
      </motion.div>

      <div className={styles.content}>
        {!isPreviewMode ? (
          <>
            {/* Configuración del Juego */}
            <AhorcadoWordConfig />
            {/* Configuración de Dificultad */}
            <AhorcadoDificultySelector />
            {/* Configuración de Intentos */}
            <AhorcadoAttemptsSelector />
          </>
        ) : (
          /* Vista Previa del Juego */
          <AhorcadoPreview />
        )}
      </div>

      {/* Botones de Acción */}
      <motion.div variants={itemVariants} className={styles.footer}>
        <div className={styles.footerActions}>
          <Button
            variant="secondary"
            onClick={handleReset}
            className={styles.resetButton}
          >
            <FaUndo />
            Reiniciar
          </Button>

          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!isFormValid}
            className={styles.saveButton}
          >
            <FaSave />
            Guardar Juego
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default CreateAhorcado;
