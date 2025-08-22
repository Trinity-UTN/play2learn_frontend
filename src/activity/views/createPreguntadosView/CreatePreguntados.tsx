import { FaQuestionCircle } from "react-icons/fa";
import ActivityStepHeader from "../../components/common/ActivityStepHeader/ActivityStepHeader";
import ActivityErrorContainer from "../../components/common/ActivityErrorContainer/ActivityErrorContainer";
import ActivityFooter from "../../components/common/ActivityFooter/ActivityFooter";
import GeneralConfiguration from "../../components/createPreguntados/generalConfig/GeneralConfiguration";
import QuestionCreator from "../../components/createPreguntados/questionCreator/QuestionCreator";
import QuestionProgress from "../../components/createPreguntados/questionProgress/QuestionProgress";
import PreguntadosPreview from "../../components/createPreguntados/preguntadosPreview/PreguntadosPreview";
import { useCreatePreguntados } from "../../hooks/useCreatePreguntados";
import styles from "./CreatePreguntados.module.css";

const CreatePreguntados = () => {
  const {
    loading,
    currentStep,
    errors,
    isFormValid,
    handleNextQuestion,
    handleSubmit,
    handleBack,
    handleNext,
    handleReset,
    getStepTitle,
    getCurrentStepNumber,
  } = useCreatePreguntados();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getCurrentStep = () => {
    if (currentStep === "config") return 1;
    if (currentStep === "questions") return 2;
    return 3;
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ActivityStepHeader
          icon={<FaQuestionCircle />}
          title="Crear Actividad: Preguntados"
          subtitle={`${getStepTitle()} - Paso ${getCurrentStep()} de 3`}
          currentStep={getCurrentStep()}
          totalSteps={3}
          itemVariants={itemVariants}
        />

        {currentStep === "questions" && (
          <QuestionProgress itemVariants={itemVariants} />
        )}

        <ActivityErrorContainer errors={errors} itemVariants={itemVariants} />

        <div className={styles.mainContent}>
          {currentStep === "config" && <GeneralConfiguration />}
          {currentStep === "questions" && <QuestionCreator />}
          {currentStep === "preview" && <PreguntadosPreview />}
        </div>

        <ActivityFooter
          loading={loading}
          currentStep={getCurrentStepNumber()}
          totalSteps={3}
          isFormValid={isFormValid}
          onReset={handleReset}
          onBack={currentStep !== "config" ? handleBack : undefined}
          onNext={currentStep !== "questions" ? handleNext : handleNextQuestion}
          onSubmit={currentStep === "preview" ? handleSubmit : undefined}
          nextButtonText={
            currentStep === "config"
              ? "Comenzar a Crear Preguntas"
              : "Siguiente"
          }
          submitButtonText="Crear Actividad"
          itemVariants={itemVariants}
        />
      </div>
    </div>
  );
};

export default CreatePreguntados;
