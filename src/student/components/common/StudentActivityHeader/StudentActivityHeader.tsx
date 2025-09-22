import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { FaClock } from "react-icons/fa";
import { useActivityTimer } from "../../../hooks/activities/useActivityTimer";
import styles from "./StudentActivityHeader.module.css";

interface StudentActivityHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  maxTime?: number; // Tiempo máximo en minutos
  showTimer?: boolean; // Para controlar cuándo mostrar el timer
  onTimeUp?: () => void; // Callback cuando se acaba el tiempo
  itemVariants?: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number };
  };
}

const StudentActivityHeader = ({
  icon,
  title,
  subtitle,
  maxTime = 0,
  showTimer = false,
  onTimeUp,
  itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
}: StudentActivityHeaderProps) => {
  const { formattedTime } = useActivityTimer({
    maxTimeInMinutes: maxTime,
    isActive: showTimer,
    onTimeUp,
  });

  // Prevenir edición del timer
  const handleTimerInteraction = (
    e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return (
    <motion.div variants={itemVariants} className={styles.header}>
      <div className={styles.titleSection}>
        <div className={styles.titleIcon}>{icon}</div>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>

      {showTimer && maxTime > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={styles.timerSection}
          onMouseDown={handleTimerInteraction}
          onTouchStart={handleTimerInteraction}
          onContextMenu={handleTimerInteraction}
          onDragStart={handleTimerInteraction}
        >
          <div className={styles.timerIcon}>
            <FaClock />
          </div>
          <div className={styles.timerContent}>
            <div
              className={styles.timerValue}
              suppressContentEditableWarning={true}
              contentEditable={false}
              spellCheck={false}
            >
              {formattedTime}
            </div>
            <div className={styles.timerLabel}>Tiempo restante</div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StudentActivityHeader;
