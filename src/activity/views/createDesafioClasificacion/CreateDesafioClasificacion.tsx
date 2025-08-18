import { FaLayerGroup } from "react-icons/fa";
import ActivityStepHeader from "../../components/common/ActivityStepHeader/ActivityStepHeader";
import ActivityErrorContainer from "../../components/common/ActivityErrorContainer/ActivityErrorContainer";
import ActivityFooter from "../../components/common/ActivityFooter/ActivityFooter";
import GeneralConfiguration from "../../components/createDesafioClasificacion/generalConfig/GeneralConfiguration";
import ClasificacionPreview from "../../components/createDesafioClasificacion/clasificacionPreview/ClasificacionPreview";
import { useCreateDesafioClasificacion } from "../../hooks/useCreateDesafioClasificacion";
import styles from "./CreateDesafioClasificacion.module.css";

const CreateDesafioClasificacion = () => {
  const {
    loading,
    currentStep,
    errors,
    handleSubmit,
    handleBack,
    handleNext,
    handleReset,
    getStepTitle,
    getCurrentStepNumber,
  } = useCreateDesafioClasificacion();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <>
      <ActivityStepHeader
        icon={<FaLayerGroup />}
        title="Crear Actividad: Desafío de Clasificación"
        subtitle={`${getStepTitle()} - Paso ${getCurrentStepNumber()} de 2`}
        currentStep={getCurrentStepNumber()}
        totalSteps={2}
        itemVariants={itemVariants}
      />

      <div className={styles.content}>
        {currentStep === "config" && (
          <GeneralConfiguration itemVariants={itemVariants} />
        )}
        {currentStep === "preview" && <ClasificacionPreview />}
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
        submitButtonText="Crear Actividad"
        itemVariants={itemVariants}
      />
    </>
  );
};

export default CreateDesafioClasificacion;
