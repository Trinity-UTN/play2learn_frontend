import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Button } from "@/shared";
import ConfigurationHeader from "../../components/configurationActivity/configurationHeader/ConfigurationHeader";
import ConfigurationForm from "../../components/configurationActivity/configurationForm/ConfigurationForm";
import ConfigurationPreview from "../../components/configurationActivity/configurationPreview/ConfigurationPreview";
import { useSubject } from "@/admin";
import { useConfigurationActivity } from "../../hooks/useConfigurationActivity";
import { useConfigurationForm } from "../../hooks/configuration/useConfigurationForm";
import styles from "./ConfigureActivityView.module.css";

const ConfigureActivityView: React.FC = () => {
  const { subjects, getSubjectByTeacher } = useSubject();
  const { registerConfigurationActivity } = useConfigurationActivity();
  const { code_game, id } = useParams();
  const navigate = useNavigate();

  const {
    configuration,
    handleChange,
    validateForm,
    errors,
    getSelectedSubject,
    getMaximumInitialBalance,
    isFormValid,
    setIsLoading,
  } = useConfigurationForm(code_game,id);

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isVerticalLayout, setIsVerticalLayout] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        await getSubjectByTeacher();
        window.scrollTo(0, 0);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  const getActivityName = (code: string) => {
    const activityNames: { [key: string]: string } = {
      ahorcado_educativo: "Ahorcado",
      arbol_decision: "Árbol de Decisión",
      completar_oraciones: "Completar Oraciones",
      desafio_clasificacion: "Desafío de Clasificación",
      memorama: "Memorama",
      no_ludica: "No Lúdica",
      ordenar_secuencia: "Ordenar Secuencia",
      preguntados: "Preguntados",
    };
    return activityNames[code] || "Actividad";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await registerConfigurationActivity(configuration);
        navigate(`/dashboard/teacher/actividad/configuration/${code_game}`);
      } catch (error) {
        console.error("Error al registrar la configuración:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleGoBack = () => {
    navigate("/dashboard/teacher/actividades/list");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      <ConfigurationHeader
        activityName={getActivityName(code_game || "")}
        isVerticalLayout={isVerticalLayout}
        isPreviewMode={isPreviewMode}
        onToggleLayout={() => setIsVerticalLayout(!isVerticalLayout)}
        onTogglePreview={() => setIsPreviewMode(!isPreviewMode)}
      />

      <div className={styles.content}>
        {!isPreviewMode ? (
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className={styles.form}
          >
            <ConfigurationForm
              configuration={configuration}
              errors={errors}
              subjects={subjects}
              isVerticalLayout={isVerticalLayout}
              onFieldChange={handleChange}
              getSelectedSubject={getSelectedSubject}
              getMaximumInitialBalance={getMaximumInitialBalance}
            />

            <motion.div
              variants={itemVariants}
              className={styles.submitSection}
            >
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={handleGoBack}
                className={styles.backButton}
                disabled={isSubmitting}
              >
                <FaArrowLeft />
                Volver
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                <FaArrowRight />
                {isSubmitting ? "Guardando..." : "Siguiente"}
              </Button>
            </motion.div>
          </motion.form>
        ) : (
          <motion.div variants={itemVariants} className={styles.preview}>
            <ConfigurationPreview
              configuration={configuration}
              selectedSubject={getSelectedSubject()}
            />

            <motion.div
              variants={itemVariants}
              className={styles.submitSection}
            >
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={handleGoBack}
                className={styles.backButton}
                disabled={isSubmitting}
              >
                <FaArrowLeft />
                Volver
              </Button>
              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={handleSubmit}
                className={styles.submitButton}
                disabled={!isFormValid() || isSubmitting}
              >
                <FaArrowRight />
                {isSubmitting ? "Guardando..." : "Crear Actividad"}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ConfigureActivityView;
