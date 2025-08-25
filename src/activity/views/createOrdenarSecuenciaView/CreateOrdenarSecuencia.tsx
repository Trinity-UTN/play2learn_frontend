import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaListOl } from "react-icons/fa";
import ActivityStepHeader from "../../components/common/ActivityStepHeader/ActivityStepHeader";
import ActivityErrorContainer from "../../components/common/ActivityErrorContainer/ActivityErrorContainer";
import ActivityFooter from "../../components/common/ActivityFooter/ActivityFooter";
import GeneralConfiguration from "../../components/createOrdenarSecuencia/generalConfig/GeneralConfiguration";
import EventForm from "../../components/createOrdenarSecuencia/eventForm/EventForm";
import EventList from "../../components/createOrdenarSecuencia/eventList/EventList";
import EventProgress from "../../components/createOrdenarSecuencia/eventProgress/EventProgress";
import OrdenarSecuenciaPreview from "../../components/createOrdenarSecuencia/ordenarSecuenciaPreview/OrdenarSecuenciaPreview";
import { useCreateOrdenarSecuencia } from "../../hooks/useCreateOrdenarSecuencia";
import styles from "./CreateOrdenarSecuencia.module.css";

const CreateOrdenarSecuencia = () => {
  const {
    loading,
    currentStep,
    config,
    events,
    errors,
    isFormValid,
    handleSubmit,
    handleBack,
    handleNext,
    handleReset,
    getStepTitle,
    getCurrentStepNumber,
    handleAddEvent,
    handleUpdateEvent,
    handleDeleteEvent,
    handleReorderEvents,
  } = useCreateOrdenarSecuencia();

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
        icon={<FaListOl />}
        title="Crear Actividad: Ordenar Secuencia"
        subtitle={`${getStepTitle()} - Paso ${getCurrentStepNumber()} de 3`}
        currentStep={getCurrentStepNumber()}
        totalSteps={3}
        itemVariants={itemVariants}
      />

      {currentStep === "sequence" && (
        <EventProgress itemVariants={itemVariants} />
      )}

      <ActivityErrorContainer errors={errors} itemVariants={itemVariants} />

      <div className={styles.content}>
        {currentStep === "config" && <GeneralConfiguration />}
        {currentStep === "sequence" && (
          <>
            <motion.div variants={itemVariants}>
              <EventForm
                onAddEvent={handleAddEvent}
                disabled={events.length >= config.cantEvents}
                cantEvents={config.cantEvents}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <EventList
                events={events}
                onUpdateEvent={handleUpdateEvent}
                onDeleteEvent={handleDeleteEvent}
                onReorderEvents={handleReorderEvents}
                cantEvents={config.cantEvents}
              />
            </motion.div>
          </>
        )}
        {currentStep === "preview" && (
          <OrdenarSecuenciaPreview events={events} />
        )}
      </div>

      <ActivityFooter
        currentStep={getCurrentStepNumber()}
        totalSteps={3}
        loading={loading}
        isFormValid={isFormValid}
        onReset={handleReset}
        onBack={currentStep !== "config" ? handleBack : undefined}
        onNext={currentStep !== "sequence" ? handleNext : handleNext}
        onSubmit={currentStep === "preview" ? handleSubmit : undefined}
        nextButtonText={
          currentStep === "config" ? "Comenzar a Crear Secuencia" : "Siguiente"
        }
        submitButtonText="Crear Actividad"
        itemVariants={itemVariants}
      />
    </>
  );
};

export default CreateOrdenarSecuencia;
