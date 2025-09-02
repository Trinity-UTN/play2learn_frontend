import { motion, type Variants } from "framer-motion";
import { useCreateOrdenarSecuencia } from "../../../hooks/useCreateOrdenarSecuencia";
import styles from "./EventProgress.module.css";

interface EventProgressProps {
  itemVariants: Variants;
}

const EventProgress: React.FC<EventProgressProps> = ({ itemVariants }) => {
  const { config, getCompletedEvents, getIncompleteEvents } =
    useCreateOrdenarSecuencia();

  return (
    <motion.div variants={itemVariants} className={styles.progressSection}>
      <div className={styles.progressInfo}>
        <span className={styles.progressText}>
          Eventos completados: {getCompletedEvents()} de {config.cantEvents}
          {getIncompleteEvents() > 0 && (
            <span className={styles.incompleteText}>
              {" "}
              • {getIncompleteEvents()} incompleto
              {getIncompleteEvents() !== 1 ? "s" : ""}
            </span>
          )}
        </span>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${(getCompletedEvents() / config.cantEvents) * 100}%`,
            }}
          />
          <div
            className={styles.progressIncomplete}
            style={{
              width: `${(getIncompleteEvents() / config.cantEvents) * 100}%`,
              left: `${(getCompletedEvents() / config.cantEvents) * 100}%`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default EventProgress;
