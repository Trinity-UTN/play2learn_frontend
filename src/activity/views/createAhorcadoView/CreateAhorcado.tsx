import { useEffect } from "react";
import { FaGamepad } from "react-icons/fa";
import ActivityStepHeader from "../../components/common/ActivityStepHeader/ActivityStepHeader";
import ActivityErrorContainer from "../../components/common/ActivityErrorContainer/ActivityErrorContainer";
import ActivityFooter from "../../components/common/ActivityFooter/ActivityFooter";
import GeneralConfiguration from "../../components/createAhorcado/generalConfig/GeneralConfiguration";
import AhorcadoPreview from "../../components/createAhorcado/ahorcadoPreview/AhorcadoPreview";
import { useCreateAhorcado } from "../../hooks/useCreateAhorcado";
import styles from "./CreateAhorcado.module.css";

const CreateAhorcado = () => {
  const {
    currentStep,
    errors,
    loading,
    handleSubmit,
    handleBack,
    handleNext,
    handleReset,
    getStepTitle,
    getCurrentStepNumber,
  } = useCreateAhorcado();

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
        icon={<FaGamepad />}
        title="Crear Actividad: Ahorcado"
        subtitle={`${getStepTitle()} - Paso ${getCurrentStepNumber()} de 2`}
        currentStep={getCurrentStepNumber()}
        totalSteps={2}
        itemVariants={itemVariants}
      />

      <div className={styles.content}>
        {currentStep === "config" && <GeneralConfiguration />}
        {currentStep === "preview" && <AhorcadoPreview />}
      </div>

      <ActivityErrorContainer errors={errors} itemVariants={itemVariants} />

      <ActivityFooter
        currentStep={getCurrentStepNumber()}
        totalSteps={2}
        loading={loading}
        onReset={handleReset}
        onBack={currentStep !== "config" ? handleBack : undefined}
        onNext={currentStep === "config" ? handleNext : undefined}
        onSubmit={currentStep === "preview" ? handleSubmit : undefined}
        nextButtonText="Siguiente"
        submitButtonText="Crear Juego"
        itemVariants={itemVariants}
      />
    </>
  );
};

export default CreateAhorcado;
