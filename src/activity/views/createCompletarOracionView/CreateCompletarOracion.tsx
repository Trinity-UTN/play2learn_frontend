import { useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import ActivityStepHeader from "../../components/common/ActivityStepHeader/ActivityStepHeader";
import ActivityFooter from "../../components/common/ActivityFooter/ActivityFooter";
import GeneralConfiguration from "../../components/createCompletarOracion/generalConfig/GeneralConfiguration";
import WordSelector from "../../components/createCompletarOracion/wordSelector/WordSelector";
import CompletarOracionPreview from "../../components/createCompletarOracion/completarOracionPreview/CompletarOracionPreview";
import { useCreateCompletarOracion } from "../../hooks/useCreateCompletarOracion";
import styles from "./CreateCompletarOracion.module.css";

const CreateCompletarOracion = () => {
  const {
    loading,
    currentStep,
    sentences,
    handleSubmit,
    handleBack,
    handleNext,
    handleReset,
    getStepTitle,
    getCurrentStepNumber,
  } = useCreateCompletarOracion();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  return (
    <>
      <ActivityStepHeader
        icon={<FaPencilAlt />}
        title="Crear Actividad: Completar Oración"
        subtitle={`${getStepTitle()} - Paso ${getCurrentStepNumber()} de 3`}
        currentStep={getCurrentStepNumber()}
        totalSteps={3}
        itemVariants={itemVariants}
      />

      <div className={styles.content}>
        {currentStep === "config" && <GeneralConfiguration />}
        {currentStep === "words" && <WordSelector />}
        {currentStep === "preview" && (
          <CompletarOracionPreview sentences={sentences} />
        )}
      </div>

      <ActivityFooter
        currentStep={getCurrentStepNumber()}
        totalSteps={3}
        loading={loading}
        onReset={handleReset}
        onBack={currentStep !== "config" ? handleBack : undefined}
        onNext={currentStep !== "preview" ? handleNext : undefined}
        onSubmit={currentStep === "preview" ? handleSubmit : undefined}
        nextButtonText={
          currentStep === "config" ? "Configurar Oraciones" : "Siguiente"
        }
        submitButtonText="Crear Actividad"
        itemVariants={itemVariants}
      />
    </>
  );
};

export default CreateCompletarOracion;
