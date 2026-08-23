import { useEffect } from "react";
import { FaFileAlt } from "react-icons/fa";
import ActivityStepHeader from "../../components/common/ActivityStepHeader/ActivityStepHeader";
import ActivityFooter from "../../components/common/ActivityFooter/ActivityFooter";
import GeneralConfiguration from "../../components/createNoLudica/generalConfig/GeneralConfiguration";
import NoLudicaPreview from "../../components/createNoLudica/noLudicaPreview/NoLudicaPreview";
import { useCreateNoLudica } from "../../hooks/useCreateNoLudica";
import styles from "./CreateNoLudica.module.css";

const CreateNoLudica = () => {
  const {
    currentStep,
    loading,
    handleSubmit,
    handleBack,
    handleNext,
    handleReset,
    getStepTitle,
    getCurrentStepNumber,
  } = useCreateNoLudica();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  return (
    <div className={styles.page}>
      <ActivityStepHeader
        icon={<FaFileAlt />}
        title="Crear Actividad: No Lúdica"
        subtitle={`${getStepTitle()} - Paso ${getCurrentStepNumber()} de 2`}
        currentStep={getCurrentStepNumber()}
        totalSteps={2}
        itemVariants={itemVariants}
      />

      <div
        className={`${styles.content} ${
          currentStep === "config" ? styles.contentFill : ""
        }`}
      >
        {currentStep === "config" && <GeneralConfiguration />}
        {currentStep === "preview" && <NoLudicaPreview />}
      </div>

      <ActivityFooter
        currentStep={getCurrentStepNumber()}
        totalSteps={2}
        loading={loading}
        onReset={handleReset}
        onBack={currentStep !== "config" ? handleBack : undefined}
        onNext={currentStep === "config" ? handleNext : undefined}
        onSubmit={currentStep === "preview" ? handleSubmit : undefined}
        nextButtonText="Siguiente"
        submitButtonText="Crear Actividad"
        itemVariants={itemVariants}
      />
    </div>
  );
};

export default CreateNoLudica;
