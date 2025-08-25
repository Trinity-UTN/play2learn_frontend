import { useEffect } from "react";
import { FaPuzzlePiece } from "react-icons/fa";
import ActivityStepHeader from "../../components/common/ActivityStepHeader/ActivityStepHeader";
import ActivityFooter from "../../components/common/ActivityFooter/ActivityFooter";
import GeneralConfiguration from "../../components/createMemorama/generalConfig/GeneralConfiguration";
import PairCreator from "../../components/createMemorama/pairCreator/PairCreator";
import PairProgress from "../../components/createMemorama/pairProgress/PairProgress";
import MemoramaPreview from "../../components/createMemorama/memoramaPreview/MemoramaPreview";
import { useCreateMemorama } from "../../hooks/useCreateMemorama";
import styles from "./CreateMemorama.module.css";

const CreateMemorama = () => {
  const {
    loading,
    currentStep,
    isFormValid,
    handleNextPair,
    handleSubmit,
    handleBack,
    handleNext,
    handleReset,
    getStepTitle,
    getCurrentStepNumber,
  } = useCreateMemorama();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ActivityStepHeader
          icon={<FaPuzzlePiece />}
          title="Crear Actividad: Memorama"
          subtitle={`${getStepTitle()} - Paso ${getCurrentStepNumber()} de 3`}
          currentStep={getCurrentStepNumber()}
          totalSteps={3}
          itemVariants={itemVariants}
        />

        {/* Barra de progreso para el paso de parejas */}
        {currentStep === "pairs" && (
          <PairProgress itemVariants={itemVariants} />
        )}

        {/* Contenido principal */}
        <div className={styles.mainContent}>
          {currentStep === "config" && <GeneralConfiguration />}
          {currentStep === "pairs" && <PairCreator />}
          {currentStep === "preview" && <MemoramaPreview />}
        </div>

        <ActivityFooter
          currentStep={getCurrentStepNumber()}
          totalSteps={3}
          loading={loading}
          isFormValid={isFormValid}
          onReset={handleReset}
          onBack={currentStep !== "config" ? handleBack : undefined}
          onNext={currentStep !== "pairs" ? handleNext : handleNextPair}
          onSubmit={currentStep === "preview" ? handleSubmit : undefined}
          nextButtonText={
            currentStep === "config" ? "Comenzar a Crear Parejas" : "Siguiente"
          }
          submitButtonText="Crear Actividad"
          itemVariants={itemVariants}
        />
      </div>
    </div>
  );
};

export default CreateMemorama;
