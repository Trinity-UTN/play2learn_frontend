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

  return (
    <>
      <ActivityStepHeader
        icon={<FaFileAlt />}
        title="Crear Actividad: No Lúdica"
        subtitle={`${getStepTitle()} - Paso ${getCurrentStepNumber()} de 2`}
        currentStep={getCurrentStepNumber()}
        totalSteps={2}
        itemVariants={itemVariants}
      />

      <div className={styles.content}>
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
    </>
  );
};

export default CreateNoLudica;
