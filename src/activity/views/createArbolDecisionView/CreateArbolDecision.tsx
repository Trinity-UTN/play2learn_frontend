import { FaTree } from "react-icons/fa";
import ActivityStepHeader from "../../components/common/ActivityStepHeader/ActivityStepHeader";
import ActivityErrorContainer from "../../components/common/ActivityErrorContainer/ActivityErrorContainer";
import ActivityFooter from "../../components/common/ActivityFooter/ActivityFooter";
import GeneralConfiguration from "../../components/createArbolDecision/generalConfig/GeneralConfiguration";
import ArbolDecisionPreview from "../../components/createArbolDecision/arbolDecisionPreview/ArbolDecisionPreview";
import { useCreateArbolDecision } from "../../hooks/useCreateArbolDecision";
import styles from "./CreateArbolDecision.module.css";

const CreateArbolDecision = () => {
  const {
    loading,
    currentStep,
    errors,
    isFormValid,
    handleSubmit,
    handleBack,
    handleNext,
    handleReset,
    getStepTitle,
    getCurrentStepNumber,
  } = useCreateArbolDecision();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <ActivityStepHeader
        icon={<FaTree />}
        title="Crear Actividad: Árbol de Decisión"
        subtitle={`${getStepTitle()} - Paso ${getCurrentStepNumber()} de 2`}
        currentStep={getCurrentStepNumber()}
        totalSteps={2}
        itemVariants={itemVariants}
      />

      <div className={styles.content}>
        {currentStep === "config" && <GeneralConfiguration />}
        {currentStep === "preview" && <ArbolDecisionPreview />}
      </div>

      <ActivityErrorContainer errors={errors} itemVariants={itemVariants} />

      <ActivityFooter
        loading={loading}
        currentStep={getCurrentStepNumber()}
        totalSteps={2}
        isFormValid={isFormValid}
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

export default CreateArbolDecision;
