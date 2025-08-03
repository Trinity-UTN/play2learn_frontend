import { motion } from "framer-motion";
import { FaEye, FaSave } from "react-icons/fa";

import Button from "../../../shared/components/Button/ButtonComponent";
import Card from "../../../shared/components/Card/CardComponent";
import EventForm from "../../components/ordenarSecuencia/eventForm/EventForm";
import EventList from "../../components/ordenarSecuencia/eventList/EventList";
import SequencePreview from "../../components/ordenarSecuencia/sequencePreview/SequencePreview";
import styles from "./CreateSequenceView.module.css";
import { useCreateOrdenarSecuencia } from "../../hooks/useOrdenarSecuencia";

const CreateSequenceView = () => {
  const {
    events,
    attempts,
    cantEvents,
    showPreview,
    isSubmitting,
    setAttempts,
    setCantEvents,
    setShowPreview,
    addEvent,
    updateEvent,
    deleteEvent,
    reorderEvents,
    handleSubmit,
  } = useCreateOrdenarSecuencia();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Crear Actividad: Ordenar Secuencia</h1>
          <p className={styles.subtitle}>
            Crea una actividad donde los estudiantes deben ordenar eventos en
            secuencia
          </p>
        </div>
        <div className={styles.headerActions}>
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className={styles.previewButton}
          >
            <FaEye />
            {showPreview ? "Ocultar Vista Previa" : "Vista Previa"}
          </Button>
        </div>
      </motion.div>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <motion.div variants={itemVariants}>
            <Card className={styles.configCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Configuración General</h3>
              </div>
              <div className={styles.configSection}>
                <div className={styles.inputGroup}>
                  <label htmlFor="attempts" className={styles.label}>
                    Número de Intentos
                  </label>
                  <select
                    id="attempts"
                    value={attempts}
                    onChange={(e) => setAttempts(Number(e.target.value))}
                    className={styles.select}
                  >
                    {[...Array(5)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} intento{i + 1 > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="events" className={styles.label}>
                    Número de eventos
                  </label>
                  <select
                    id="events"
                    value={cantEvents}
                    onChange={(e) => setCantEvents(Number(e.target.value))}
                    className={styles.select}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} intento{i + 1 > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.statsInfo}>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Eventos:</span>
                    <span className={styles.statValue}>
                      {events.length}/{cantEvents}
                    </span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Intentos:</span>
                    <span className={styles.statValue}>{attempts}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <EventForm
              onAddEvent={addEvent}
              disabled={events.length >= cantEvents}
              cantEvents={cantEvents}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <EventList
              events={events}
              onUpdateEvent={updateEvent}
              onDeleteEvent={deleteEvent}
              onReorderEvents={reorderEvents}
              cantEvents={cantEvents}
            />
          </motion.div>

          <motion.div variants={itemVariants} className={styles.actions}>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={events.length < 2 || isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? (
                <>
                  <div className={styles.spinner} />
                  Creando Secuencia...
                </>
              ) : (
                <>
                  <FaSave />
                  Crear Secuencia
                </>
              )}
            </Button>

            {events.length < 2 && (
              <p className={styles.helpText}>
                Agregue al menos 2 eventos para crear la secuencia
              </p>
            )}
          </motion.div>
        </div>

        {showPreview && (
          <motion.div variants={itemVariants} className={styles.previewSection}>
            <SequencePreview events={events} attempts={attempts} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CreateSequenceView;
